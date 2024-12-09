import React from 'react';
import { Link } from 'react-router-dom';


const NavBar = ({ user }) => {
    return (
        <div className="d-flex flex-column vh-100 p-3 bg-light" style={{ width: '250px' }}>
            <h2 className="text-center">Navigation</h2>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link to="/" className="nav-link text-dark">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/dishes" className="nav-link text-dark">View Dishes</Link>
                </li>
                {user == null && (
                    <>
                        <li className="nav-item">
                            <Link to="/add-dish" className="nav-link text-dark">Add Dish</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link text-dark">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/create-user" className="nav-link text-dark">Sign Up</Link>
                        </li>
                    </>
                )}
                {user != null && (
                    <>

                    </>
                )}
            </ul>
        </div>
    );
}

export default NavBar;