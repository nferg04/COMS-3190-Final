import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const Dishes = ({dishes, setDishes}) => {
    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const response = await fetch("http://localhost:8081/dishes");
                if (!response.ok) {
                    throw new Error("Failed to fetch dishes");
                }
                const data = await response.json();
                setDishes(data);
            } 
            catch (error) {
                alert("There was an Error loading contacts "+error);
            }
        };
        fetchDishes();
    }, []);


    return ( <div className="container">
        <h2 className="text-center mt-4">Dish List</h2>
        {dishes.map((dish) => (
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

export default Dishes;