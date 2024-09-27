# backend/urls.py
from django.urls import path
from .views import (
    sign_in, 
    sign_up, 
    create_campaign, 
    get_user_campaigns,
    get_user_data,
    get_all_campaigns,
    get_campaign,
    donate_to_campaign,
    get_donations_for_campaign,
    contact_us,
    get_contact_queries,
    send_email,
    edit_campaign,
)
urlpatterns = [
    path('sign_in/', sign_in),
    path('sign_up/', sign_up),
    path('create_campaign/', create_campaign),
    path('get_user_campaigns/', get_user_campaigns),
    path('get_user_data/', get_user_data),
    path('get_all_campaigns/', get_all_campaigns),
    path('get_campaign/', get_campaign),
    path('get_campaign/<str:campaign_id>/', get_campaign, name='get_campaign'),
    path('donations/<str:campaign_id>/', get_donations_for_campaign, name='get_donations_for_campaign'),
    path('donate/<str:campaign_id>/', donate_to_campaign, name='donate_to_campaign'),
    path("contact_us/", contact_us),
    path('get_contact_queries/',get_contact_queries),
    path('send_email/', send_email),
    path('edit_campaign/<str:campaign_id>/', edit_campaign, name='edit_campaign'),


    
]
