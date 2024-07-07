import React, { useState } from "react";
import Card from "./Card";
import axios from "axios";
import "./style.css"; // Assuming you have a CSS file for Main component styling

const Main = () => {
    const [search, setSearch] = useState("");
    const [bookData, setBookData] = useState([]);
    const [error, setError] = useState(null);

    const searchBook = () => {
                 axios.get('https://www.googleapis.com/books/v1/volumes?q='+search+'&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU'+'&maxResults=40')

            .then(res => {
                console.log("API Response:", res.data); // Log API response
                setBookData(res.data.items);
                setError(null); // Clear any previous errors
            })
            .catch(err => {
                console.error("Error fetching books:", err); // Log detailed error
                setError("Error fetching books. Please try again later."); // Set error state
            });
    };

    const handleInputChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div className="main-container">
            <div className="header">
                <div className="row1">
                </div>
                <div className="row2">
                    <h2>Find Your Book</h2>
                    <div className="search">
                        <input 
                            type="text" 
                            placeholder="Enter Your Book Name"
                            value={search} 
                            onChange={handleInputChange}
                        />
                        <button onClick={searchBook}>
                            <i className="fas fa-search"></i> Search
                        </button>
                    </div>
                    <img src="./images/bg2.png" alt="" />
                </div>
            </div>

            <div className="container">
                {error && <p>{error}</p>}
                {bookData.length > 0 && <Card book={bookData} />}
            </div>
        </div>
    );
};

export default Main;
