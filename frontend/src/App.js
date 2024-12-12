import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./NavBar.js";
import Dishes from "./Dishes.js";
import AddDish from "./addDish.js";
import Authentication from "./Login.js";
import CreateUser from "./CreateUser.js";
import SavedDishes from "./SavedDish.js";
import MyView from "./information.js";



function App() {

    const [dishes, setDishes] = useState([]);
    const [savedDishes, setSavedDishes] = useState([]);
    const [dishIds, setDishIds] = useState([]);
    const [userId, setUserId] = useState('');
    

    return(
        <Router>
            <div className="d-flex">
                <NavBar />
                <div className="flex-grow-1 p-3">
                    <h1 className="text-center">Welcome To Food Finder</h1>
                    <Routes>
                        <Route path="/" element={<div>To use Food Finder you can start on our Find Dishes page. Here you will be able to all of the dishes that users have had before. If there is a new dish you find that is not on this page you can add it in the Add Dishes page. You can add a dish to your saved dishes to your user by clicking the save dish button in each card. The saved dishes page will allow users to view any dish that they have saved and remove them if they want.</div>} />
                        <Route path="/login" element = {<Authentication
                            setUserId = {setUserId}
                         />}/>
                        <Route path="/create-user" element = {<CreateUser
                            setUserId = {setUserId}
                         />}/>
                        <Route path="/dishes" element = {<Dishes
                            userId = {userId}
                            setUserId = {setUserId}
                            dishes = {dishes}
                            setDishes = {setDishes}
                        />}/>
                        <Route path="/add-dish" element = {<AddDish
                            dishes = {dishes}
                            setDishes = {setDishes}
                         />}/>
                         <Route path="/saved-dish" element = {<SavedDishes
                            savedDishes = {savedDishes}
                            setSavedDishes = {setSavedDishes}
                            userId = {userId}
                            setUserId = {setUserId}
                            dishIds = {dishIds}
                            setDishIds = {setDishIds}
                         />}/>
                         <Route path="info" element = {<MyView />}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;