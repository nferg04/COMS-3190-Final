import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const Dishes = ({savedDishes, setSavedDishes, user, setUser}) => {
    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const response = await fetch("http://localhost:8081/saved");
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