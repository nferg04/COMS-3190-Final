import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const CreateUser = ({ setUserId }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleCreate = async (e) => {
        try {
            e.preventDefault();

            const formData = new FormData();
            formData.append("username", username);
            formData.append("password", password);
            const response = await fetch("http://localhost:8081/user", {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({ username, password }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error);
                return;
            }
            const data = await response.json();
            setUserId(data.insertedId);

            setUsername('');
            setPassword('');
            setError('');
        }
        catch (err) {
            console.log("Failed to sign-up. Please try again."+err);
            setError("Failed to sign-up. Please try again. " + err);
        }  
    }
    
    return (
        <div className="container mt-4">
            <h2 className="text-center">Create A New User</h2>
            <p>Your username must be unique. If the username you want already exists you will not be able to create an account and be asked to try again.</p>
            <form onSubmit={handleCreate}>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" value={username}
                    onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="text" className="form-control" value={password}
                    onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-primary">Create Account</button>
            </form>
        </div>
    );
};

export default CreateUser;