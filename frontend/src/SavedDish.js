import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const SavedDishes = ({savedDishes, setSavedDishes, userId, setUserId, dishIds, setDishIds}) => {
    
    useEffect(() => {
        const fetchDishIds = async () => {
            try {
                setDishIds([]);
                const response = await fetch(`http://localhost:8081/saved-dishes/${userId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch dishes");
                }
                const data = await response.json();
                console.log(data);
                for(let i = 0; i < data.length; i++) {
                    console.log(data[i]);
                    console.log(data[i].dishId);
                    setDishIds(prevDishIds => [...prevDishIds, data[i].dishId]);
                }
                console.log("Dish Ids: " + dishIds);
            } 
            catch (error) {
                alert("There was an Error loading saved dishes " + error);
            }
        };
        fetchDishIds();
        dishIds.map(async dishId  => {
            try {
                //setSavedDishes([]);
                const response = await fetch(`http://localhost:8081/dish/${dishId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch dishes");
                }
                const data = await response.json();
                setSavedDishes([...savedDishes, data]);
                console.log(savedDishes);
            } 
            catch (error) {
                alert("There was an Error loading saved dishes " + error);
            }
        });
    }, []);

    return ( <div className="container">
        <h2 className="text-center mt-4">Dish List</h2>
        {savedDishes.map((dish) => (
            <li key={dish._id} className="list-group-item d-flex align-items-center">
                {dish.url && (
                <img
                    src={`http://localhost:8081${dish.url}`}
                    alt={dish.dish}
                    style={{ width: '100px', height: '100px', marginRight: '15px', objectFit: 'cover' }}
                />
                )}
                <div>
                    <strong>{dish.dish}</strong> - {dish.price}
                    <p>{dish.type}</p>
                </div>
            </li>
        ))}
        <ul className="list-group">
        </ul> 
    </div>
    );
}

export default SavedDishes;