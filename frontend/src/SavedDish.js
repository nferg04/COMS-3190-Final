import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const SavedDishes = ({savedDishes, setSavedDishes, userId, setUserId}) => {
    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const response = await fetch("http://localhost:8081/saved-dishes/user");
                if (!response.ok) {
                    throw new Error("Failed to fetch dishes");
                }
                const data = await response.json();
                setSavedDishes(data);
            } 
            catch (error) {
                alert("There was an Error loading saved dishes " + error);
            }
        };
        fetchDishes();
    }, []);


    return ( <div className="container">
        <h2 className="text-center mt-4">Dish List</h2>
        {savedDishes.map((dish) => (
            <li key={dish._id} className="list-group-item d-flex align-items-center">
                <div>
                    Saved Dish Example
                </div>
            </li>
        ))}
        <ul className="list-group">
        </ul>
        </div> 
    );
}

export default SavedDishes;