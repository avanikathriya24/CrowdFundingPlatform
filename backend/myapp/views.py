from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import re
import uuid
from pymongo import MongoClient
from datetime import datetime  # Import datetime to get the current date and time

client = MongoClient("mongodb://localhost:27017/")
db = client.my_database
user_collection = db.users
campaign_collection = db.campaigns  # New collection for campaigns
donation_collection = db.donations  
contact_collection = db.contact


# Sign In View
@csrf_exempt
def sign_in(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data["email"]
        password = data["password"]

        user = user_collection.find_one({"email": email})
        if user is not None:
            if password != user["password"]:
                return JsonResponse({"notMatch": "Password is invalid"})
        else:
            return JsonResponse({"notMatch": "No such user with this email found"})

        return JsonResponse({
            "message": f"Welcome {email}",
            "user_id": user["user_id"],
            "role": user["role"],  # Assuming you have a 'role' field in the user collection
            "success": True,
        }, status=200)

# Sign Up View
@csrf_exempt
def sign_up(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data["email"]
        password = data["password"]
        cpass = data["cpassword"]
        role = data["role"]
        re_email = r"^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"

        if not re.match(re_email, email):
            return JsonResponse(
                {"email": "Invalid Email, please enter a valid email address"}
            )

        re_password = r"^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$"

        if not re.match(re_password, password):
            return JsonResponse(
                {
                    "password": "Invalid Password, please use a password of 8 or more characters having at least 1 symbol, 1 capital letter & 1 number"
                }
            )

        if password != cpass:
            return JsonResponse({"cpassword": "Password does not match"})

        user_id = str(uuid.uuid4())
        data["user_id"] = user_id

        user = user_collection.find_one({"email": email})

        if user:
            return JsonResponse(
                {"accountFound": "An account with this email already exists"}
            )
        else:
            user_collection.insert_one(data)

            return JsonResponse(
                {
                    "message": f"Welcome {email}",
                    "user_id": data["user_id"],
                    "success": True,
                },
                status=200,
            )

# views.py

@csrf_exempt
def create_campaign(request):
    if request.method == "POST":
        data = json.loads(request.body)
        user_id = data.get("userId")
        title = data.get("step5")
        goal =int( data.get("step2",0))
        category = data.get("description")
        location = data.get("postcode")
        story = data.get("step4")
        cover_media = data.get("step3")

        if not all([title, goal, category, location, story, cover_media, user_id]):
            return JsonResponse({"error": "All fields are required"}, status=400)

        campaign_id = str(uuid.uuid4())
        created_date = datetime.utcnow()  # Get the current UTC time
        raised = 0
        campaign_data = {
            "campaign_id": campaign_id,
            "user_id": user_id,
            "title": title,
            "goal": goal,
            "category": category,
            "location": location,
            "story": story,
            "cover_media": cover_media,
            "created_date": created_date,# Add the created_date field
            "raised": raised
        }

        campaign_collection.insert_one(campaign_data)

        return JsonResponse({"message": "Campaign created successfully"}, status=200)

# Get User Campaigns View
@csrf_exempt
def get_user_campaigns(request):
    if request.method == "POST":
        data = json.loads(request.body)
        user_id = data.get("userId")

        if not user_id:
            return JsonResponse({"error": "User ID is required"}, status=400)

        campaigns = list(campaign_collection.find({"user_id": user_id}))

        for campaign in campaigns:
            campaign["_id"] = str(campaign["_id"])

        return JsonResponse({"campaigns": campaigns}, status=200)

@csrf_exempt
def get_user_data(request):
    if request.method == "POST":
        data = json.loads(request.body)
        user_id = data.get("userId")

        if not user_id:
            return JsonResponse({"error": "User ID is required"}, status=400)

        user = user_collection.find_one({"user_id": user_id})

        if not user:
            return JsonResponse({"error": "User not found"}, status=404)

        return JsonResponse({
            "first_name": user.get("fname", ""),
            "success": True
        }, status=200)
        
@csrf_exempt
def get_all_campaigns(request):
    if request.method == "GET":
        campaigns = list(campaign_collection.find())  # Fetch only 3 campaigns

        for campaign in campaigns:
            campaign["_id"] = str(campaign["_id"])
            campaign["created_date"] = campaign["created_date"].isoformat()  # Format date


        return JsonResponse({"campaigns": campaigns}, status=200)   
         
@csrf_exempt
def get_campaign(request, campaign_id):
    if request.method == "GET":
        campaign = campaign_collection.find_one({"campaign_id": campaign_id})

        if campaign:
            campaign["_id"] = str(campaign["_id"])
            campaign["created_date"] = campaign["created_date"].isoformat()  # Format date
            return JsonResponse({"campaign": campaign}, status=200)
        else:
            return JsonResponse({"error": "Campaign not found"}, status=404)
        
@csrf_exempt
def donate_to_campaign(request, campaign_id):
    if request.method == "POST":
        data = json.loads(request.body)
        try:
            amount = int(data.get("amount", 0))  # Ensure this is an integer
        except ValueError:
            return JsonResponse({"error": "Invalid amount"}, status=400)

        if amount <= 0:
            return JsonResponse({"error": "Donation amount must be greater than zero"}, status=400)

        # Fetch the campaign
        campaign = campaign_collection.find_one({"campaign_id": campaign_id})

        if not campaign:
            return JsonResponse({"error": "Campaign not found"}, status=404)

        # Update the raised amount
        new_raised = campaign.get("raised", 0) + amount
        campaign_collection.update_one(
            {"campaign_id": campaign_id},
            {"$set": {"raised": new_raised}}
        )

        # Create a donation record
        donation_data = {
            "campaign_id": campaign_id,
            "amount": amount,
            "timestamp": datetime.utcnow()
        }
        donation_collection.insert_one(donation_data)

        updated_campaign = campaign_collection.find_one({"campaign_id": campaign_id})
        updated_campaign["_id"] = str(updated_campaign["_id"])
        return JsonResponse({"campaign": updated_campaign}, status=200)


@csrf_exempt
def get_donations_for_campaign(request, campaign_id):
    if request.method == "GET":
        donations = list(donation_collection.find({"campaign_id": campaign_id}))
        
        # Format the donations for output
        for donation in donations:
            donation["_id"] = str(donation["_id"])  # Convert ObjectId to string
            donation["timestamp"] = donation["timestamp"].isoformat()  # Format the timestamp

        return JsonResponse({"donations": donations}, status=200)
    
# comtactus:



@csrf_exempt
def contact_us(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            name = data.get("fullName")
            email = data.get("email")
            message = data.get("message")

            # Perform some basic validation (optional)
            if not name or not email or not message:
                return JsonResponse({"error": "All fields are required"}, status=400)

            # Save the contact message to MongoDB with reply status set to false
            contact_id = contact_collection.insert_one(
                {
                    "fullName": name,
                    "email": email,
                    "message": message,
                    "reply_sent": False,  # Initially, no reply has been sent
                }
            ).inserted_id

            return JsonResponse(
                {
                    "message": "Thank you for contacting us!",
                    "contact_id": str(contact_id),
                },
                status=201,
            )
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def get_contact_queries(request):
    if request.method == "GET":
        try:
            # Fetch all the contact queries from MongoDB
            queries = list(contact_collection.find({}))

            # Convert ObjectId to string for JSON serialization
            for query in queries:
                query["_id"] = str(query["_id"])

            return JsonResponse({"queries": queries, "success": True}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def send_email(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            print(email)
            message = data.get("message")
            contact_id = data.get(
                "contact_id"
            )  # The ID of the contact message being replied to

            if not email or not message or not contact_id:
                return JsonResponse(
                    {"error": "Missing email, message, or contact_id"}, status=400
                )
            # Format the email message
            formatted_message = (
                f"Dear {data.get('fullName', 'Customer')},\n\n"
                f"Thank you for contacting us.\n\n"
                f"{message}\n\n"
                f"Best regards,\nInventoryIQ"
            )

            # Sending the email (adjust the subject, from email, and your SMTP settings)
            send_mail(
                subject="Reply to Your Contact Us Query",
                message=formatted_message,
                from_email="avanikathiriya24@gmail.com",  # Replace with your own email
                recipient_list=[email],
                fail_silently=False,
            )

            # Update the contact document to include the reply and indicate that a reply has been sent
            result = contact_collection.update_one(
                {"_id": ObjectId(contact_id)},
                {"$set": {"reply": message, "reply_sent": True}},
            )

            if result.matched_count > 0:
                return JsonResponse(
                    {"message": "Reply sent successfully", "success": True}, status=200
                )
            else:
                return JsonResponse({"error": "Contact not found"}, status=404)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def edit_campaign(request, campaign_id):
    if request.method == "PUT":
        data = json.loads(request.body)
        
        title = data.get("title")
        goal = data.get("goal")
        category = data.get("category")
        location = data.get("location")
        story = data.get("story")

        # Validate incoming data
        if not all([title, goal, category, location, story]):
            return JsonResponse({"error": "All fields are required"}, status=400)

        # Update the campaign in the database
        result = campaign_collection.update_one(
            {"campaign_id": campaign_id},
            {"$set": {
                "title": title,
                "goal": goal,
                "category": category,
                "location": location,
                "story": story,
            }}
        )

        if result.matched_count > 0:
            return JsonResponse({"message": "Campaign updated successfully"}, status=200)
        else:
            return JsonResponse({"error": "Campaign not found"}, status=404)

    return JsonResponse({"error": "Invalid request method"}, status=405)

    if request.method == "PUT":
        data = json.loads(request.body)
        print("Received data:", data)  # Log the incoming data for debugging

        title = data.get("title")
        goal = data.get("goal")
        category = data.get("category")
        location = data.get("location")
        story = data.get("story")
        cover_media = data.get("cover_media")

        # Check if all required fields are provided
        if not all([title, goal, category, location, story, cover_media]):
            return JsonResponse({"error": "All fields are required"}, status=400)

        # Update the campaign in the database
        result = campaign_collection.update_one(
            {"campaign_id": campaign_id},  # Find campaign by ID
            {"$set": {
                "title": title,
                "goal": goal,
                "category": category,
                "location": location,
                "story": story,
                "cover_media": cover_media,
                "updated_date": datetime.utcnow()  # Optional: Store the updated date
            }}
        )

        if result.modified_count == 0:
            return JsonResponse({"error": "Campaign not found or no changes made"}, status=404)

        return JsonResponse({"message": "Campaign updated successfully"}, status=200)

    return JsonResponse({"error": "Invalid request method"}, status=405)
