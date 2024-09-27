// Search.js
import React, { useState } from 'react';
import Filtered from './Filtered';
import "./Search.css";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div>
            {/* Slider Section */}
            <section>
                <div className="section-p">
                    <p className="main-heading">Find fundraisers</p>
                    <div className="search-box">
                        <input
                            className="search"
                            type="search"
                            placeholder="Find charities by name or charity numbers...."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
            </section>

            <Filtered searchQuery={searchQuery} />
        </div>
    );
};

export default Search;
