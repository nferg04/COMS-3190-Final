import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const Authentication = ({ setUserId }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            const response = await
            fetch("http://localhost:8081/login", {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({ username, password }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error);
                return;
            }
            const data  = await response.json();
            console.log(data[0]._id);
            setUserId(data[0]._id);
            
        }
        catch (err) {
            console.log("Failed to log in. Please try again."+err);
            setError("Failed to log in. Please try again. " + err);
        }  
    }
    
    return (
        <div className="container mt-4">
            <h2 className="text-center">Login to your Account</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" value={username}
                    onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" value={password}
                    onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default Authentication;