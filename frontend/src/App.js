import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./NavBar.js";



function App() {
    return(
        <Router>
            <div className="d-flex">
                <NavBar />
                <div className="flex-grow-1 p-3">
                    <h1 className="text-center">Welcome To Food Finder</h1>
                    <Routes>
                        <Route path="/" element={<div>To use Food Finder you can start on our Find Dishes page. Here you will be able to all of the dishes that users have had before. If there is a new dish you find that is not on this page you can add it in the Add Dishes page. You can add a dish to your saved dishes to your user by clicking the save dish button in each card. The saved dishes page will allow users to view any dish that they have saved and remove them if they want.</div>} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;