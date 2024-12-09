// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
  
// );


import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useForm } from "react-hook-form";

import MyView from './information';
import AddDish from './addDish';

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <div>
      <AddDish />
    </div>
  );