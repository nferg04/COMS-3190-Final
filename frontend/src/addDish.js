import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const AddDish = () => {
    const [dish, setDish] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('');
    const [restaurant, setRestaurant] = useState('');
    const [location, setLocation] = useState('');

    const [preview, setPreview] = useState(null);
    const [image, setImage] = useState(null);




    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file)); // Show preview
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // Call this function to fetch backend with method POST
        addOneDish();
        // Clean hooks to start again
        setDish('');
        setPrice('');
        setType('');
        setRestaurant('');
        setLocation('');

        setImage(null);
        setPreview(null);
    };


    const addOneDish = async () => {
        try {
            // Create a FormData object to hold the fields and the file
            const formData = new FormData();
            formData.append("dish", dish);
            formData.append("price", price);
            formData.append("type", type);
            formData.append("restaurant", restaurant);
            formData.append("location", location);
            formData.append("image", image); // Add the file to the form data
            // Send the FormData object to the backend
            const response = await fetch("http://localhost:8081/dish", {
                method: "POST",
                body: formData, // No need to set Content-Type; fetch will handle it
            });

            if (!response.ok) {
                // Handle errors (status code 4xx or 5xx)
                const errorData = await response.json(); // Parse JSON error response
                alert("Error: " + errorData.error);
            } 
            else {
                // Status code 201 indicates success
                const successMessage = await response.text(); // Handle plain text response
                alert(successMessage);
            }
        } 
        catch (err) {
            alert("An error occurred :"+err)
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Add New Dish</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Dish Name</label>
                    <input type="text" className="form-control" value={dish} onChange={(e) => setDish(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Dish price</label>
                    <input type="text" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                
                <div className="mb-3">
                    <label className="form-label">Dish type</label>
                    <input type="text" className="form-control" value={type} onChange={(e) => setType(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Restaurant</label>
                    <input type="text" className="form-control" value={restaurant} onChange={(e) => setRestaurant(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Location</label>
                    <input type="text" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Dish Image</label>
                    <input type="file" className="form-control" onChange={handleImageChange} />
                    {preview && (<img src={preview} alt="Preview" className="mt-3" style={{ width: '100px', height: '100px', objectFit: 'cover' }} /> )}
                </div>
                <button type="submit" className="btn btn-primary">
                    Add Dish
                </button>
            </form>
        </div>
    );
};

export default AddDish;