// import React, {useState, useEffect} from 'react';
// import ReactDOM from 'react-dom/client';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Card, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
// import { useForm } from "react-hook-form";




// function SetView() {
//     const [catalog, setCatalog] = useState([]);
//     const [filteredCatalog, setFilteredCatalog] = useState([]);
//     const [dataF,setDataF] = useState({});
//     const [searchTerm, setSearchTerm] = useState('');
//     const [cart, setCart] = useState([]);
//     const [cartTotal, setCartTotal] = useState(0);
//     const [viewer,setViewer] = useState(0);
  
//     useEffect(()=>{
//       const fetchData = async () => {
//         const response = await fetch("/products.json");
//         const data = await response.json();
//         setCatalog(data);
//         setFilteredCatalog(data);
//         console.log(data);
//       };
  
//       fetchData();
//      },[]);
    
    
//     return (
//       <div>
//         {viewer === 0 && <DisplayProducts catalog = {catalog} setCatalog = {setCatalog} filteredCatalog = {filteredCatalog} setFilteredCatalog = {setFilteredCatalog} searchTerm = {searchTerm} setSearchTerm = {setSearchTerm} cart = {cart} setCart = {setCart} viewer = {setViewer} setViewer = {setViewer} />}
//         {viewer === 1 && <DisplayCheckout catalog = {catalog} setCatalog = {setCatalog} dataF = {dataF} setDataF = {setDataF} filteredCatalog = {filteredCatalog} setFilteredCatalog={setFilteredCatalog} cart = {cart} setCart = {setCart} cartTotal = {cartTotal} setCartTotal = {setCartTotal} viewer = {viewer} setViewer = {setViewer}/>}
  
  
//           {/* this will need edited to be only include the things needed for this method */}
//         {viewer === 2 && <ConfirmationVeiw catalog = {catalog} setCatalog = {setCatalog} dataF = {dataF} setDataF = {setDataF} filteredCatalog = {filteredCatalog} setFilteredCatalog={setFilteredCatalog} cart = {cart} setCart = {setCart} cartTotal = {cartTotal} setCartTotal = {setCartTotal} viewer = {viewer} setViewer = {setViewer}/>}
//       </div>
//     )
//   }
  
  
  
//   function DisplayProducts({catalog, setCatalog, filteredCatalog, setFilteredCatalog, searchTerm, setSearchTerm, cart, setCart, viewer, setViewer}){
//     const changeView = () => {
//       // update display
//       const results = catalog.filter(eachProduct =>  cart.includes(eachProduct))
//       setFilteredCatalog(results)
//       setViewer(1);
//     }  
  
//     const handleChange = (e) => {
//       setSearchTerm(e.target.value);
//       const results = catalog.filter(eachProduct => {
//         if (e.target.value === "") return catalog;
//         return eachProduct.title.toLowerCase().includes(e.target.value.toLowerCase())
//       });
//       setFilteredCatalog(results);
//     }
    
//     const clearSearch = () => {
//       setSearchTerm(""); // Clear the input
//       setFilteredCatalog(catalog); // Reset to full catalog
//     };
    
//     const addToCart = (el) => {
//       setCart([...cart, el]);
//     };
    
//     const removeFromCart = (el) => {
//       let itemFound = false;
//       const updatedCart = cart.filter((cartItem) => {
//         if (cartItem.id === el.id && !itemFound) {
//           itemFound = true;
//           return false;
//         }
//         return true;
//       });
//       if (itemFound) {
//         setCart(updatedCart);
//       }
//     };
    
//     function howManyofThis(id) {
//       let hmot = cart.filter((cartItem) => cartItem.id === id);
//       return hmot.length;
//     }
  
//     return (
//       <div>
//         <div className="mb-4">
//           <InputGroup>
//             <FormControl
//               placeholder="Search products..."
//               aria-label="Search products"
//               value={searchTerm}
//               onChange={handleChange}
//             />
//             <Button variant="outline-secondary" onClick={clearSearch}>
//               <i className="bi bi-x">Clear</i> {/* Bootstrap icon for clear */}
//             </Button>
//           </InputGroup>
  
//         </div>
  
//         <div className="row">
//           {filteredCatalog.map((product) => {
//             return (
//             <div key={product.id} className="col-md-4">
//               <div className="card mb-4">
//                 < img src={product.image} className="card-img-top" style={{ width: "150px", margin: "auto", paddingTop: "20px" }} alt={product.title} />
//                 <div className="card-body">
//                   <h5 className="card-title">{product.title}</h5>
//                   <p className="card-text">
//                     <strong>Price:</strong> ${product.price} <br />
//                     <strong>Description:</strong> {product.description} <br />
//                     <strong>Category:</strong> {product.category} <br />
//                     <strong>Rating:</strong> {product.rating.rate} ({product.rating.count} reviews)
//                     <button type="button" onClick={() => removeFromCart(product)}>-</button>{" "}
//                     <button type="button" variant="light" onClick={() => addToCart(product)}> + </button>
//                   </p>
//                   <div class="col">
//                     In Cart: {howManyofThis(product.id)}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             );
//           })}
//         </div>
//         <div style={{textAlign:"center"}}>
//           <Button style={{width:"300px", textAlign:"center", padding:"15px"}} onClick={changeView}>
//             Checkout
//           </Button>
//         </div>
  
//         <footer style={{textAlign:"center", padding:"15px", margin:"30px", backgroundColor:'beige'}}>
//           <p>Sticker Shop: Nate Ferguson & John Buttell</p>
//         </footer>
//       </div>
//     );
//   }
    
//   function DisplayCheckout({catalog, setCatalog, dataF, setDataF, filteredCatalog, setFilteredCatalog, cart, setCart, cartTotal, setCartTotal, viewer, setViewer}) {
  
//     const { register, handleSubmit, formState: { errors } } = useForm();
  
//     const changeViewBackwards = data => {
//       //update display to go back to the catalog page
//       setFilteredCatalog(catalog);
//       setViewer(0);
//     }
  
//     const onSubmit = data => {
//       // update display to go to submission
//       setDataF(data);
//       setViewer(2);
//     }
  
//     function howManyofThis(id) {
//       let hmot = cart.filter((cartItem) => cartItem.id === id);
//       return hmot.length;
//     }
  
//     const listItems = filteredCatalog.map((product) => (
//       <div class="row border-top border-bottom" key={product.id}>
//         <div class="row main align-items-center">
//           <div class="col-2">
//             <img class="img-fluid" src={product.image} />
//           </div>
//           <div class="col">
//             <div class="row text-muted">{product.title}</div>
//           </div>
//           <div class="col">
//             {howManyofThis(product.id)}
//           </div>
//           <div class="col">
//             ${product.price}
//           </div>
//         </div>
//       </div>
//     ));
  
//     useEffect(()=>{
//       const total = () => {
//         let totalAmount = 0;
//         for (let i=0; i<cart.length; i++){
//           totalAmount += cart[i].price;
//         }
        
//         setCartTotal(totalAmount);
//       };
      
//       total();
  
//     },[cart]);
  
//     return (
//       <div style={{margin:"5px"}}>
//         <Button class="btn btn-secondary" onClick={changeViewBackwards} style={{width:"100px", textAlign:"center", padding:"15px"}}>
//           Return
//         </Button>
//         <div class="card">
//           <div class="row">
//             <div class="col-md-8 cart">
//               <div class="title">
//                 <div class="row">
//                   <div class="col">
//                     <h4>
//                     <b>Items</b>
//                     </h4>
//                   </div>
//                   <div class="col align-self-center text-right text-muted">
//                     <h4>
//                       <b>Quantity:</b>
//                     </h4>
//                   </div>
//                   <div class ="col align-self-center text-right text-muted">
//                     <h4>
//                       <b>Price:</b>
//                     </h4>
//                   </div>
//                 </div>
//               </div>
//             <div>{listItems}</div>
//             <div><strong>Total:</strong> {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(cartTotal)}</div>
//             </div>
//             <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
//                   <div className="form-group">
//                       <input {...register("fullName", { required: true })} placeholder="Full Name" className="form-control" />
//                       {errors.fullName && <p className="text-danger">Full Name is required.</p>}
//                   </div>
  
//                   <div className="form-group">
//                       <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email" className="form-control" />
//                       {errors.email && <p className="text-danger">Email is required.</p>}
//                   </div>
  
//                   <div className="form-group">
//                       <input {...register("creditCard", { required: true, pattern: /^([0-9]{4}( )){3}[0-9]{4}$/ })} placeholder="Credit Card: XXXX XXXX XXXX XXXX" className="form-control" />
//                       {errors.creditCard && <p className="text-danger">Credit Card is required.</p>}
//                   </div>
  
//                   <div className="form-group">
//                       <input {...register("address", { required: true })} placeholder="Address" className="form-control" />
//                       {errors.address && <p className="text-danger">Address is required.</p>}
//                   </div>
  
//                   <div className="form-group">
//                       <input {...register("address2")} placeholder="Address 2" className="form-control" />
//                   </div>
  
//                   <div className="form-group">
//                       <input {...register("city", { required: true })} placeholder="City" className="form-control" />
//                       {errors.city && <p className="text-danger">City is required.</p>}
//                   </div>
  
//                   <div className="form-group">
//                       <input {...register("state", { required: true })} placeholder="State" className="form-control" />
//                       {errors.state && <p className="text-danger">State is required.</p>}
//                   </div>
  
//                   <div className="form-group">
//                       <input {...register("zip", { required: true, pattern: /^([0-9]){5}$/ })} placeholder="Zip" className="form-control" />
//                       {errors.zip && <p className="text-danger">Zip is required.</p>}
//                   </div>
  
//                   <button type="submit" className="btn btn-primary">Submit</button>
//               </form>
//           </div>
//         </div>
//       </div>
//     );
  
//   }
  
  
  
  
  
  
//   function ConfirmationVeiw({catalog, setCatalog ,dataF, setDataF, filteredCatalog, setFilteredCatalog, cart, setCart, cartTotal, setCartTotal, viewer, setViewer}){
  
//     function howManyofThis2(id) {
//       let hmot = cart.filter((cartItem) => cartItem.id === id);
//       return hmot.length;
//     }
  
//     const changeViewBackwardsReset = data => {
//       //update display to go back to the catalog page
  
  
//       //reset cart Object
//       setCart([])
//       setFilteredCatalog(catalog);
//       setViewer(0);
//     }
  
  
//     const listItems = filteredCatalog.map((product) => (
//       <div class="row border-top border-bottom" key={product.id}>
//         <div class="row main align-items-center">
//           <div class="col-2">
//             <img class="img-fluid" src={product.image} />
//           </div>
//           <div class="col">
//             <div class="row text-muted">{product.title}</div>
//           </div>
//           <div class="col">
//             {howManyofThis2(product.id)}
//           </div>
//           <div class="col">
//             ${product.price}
//           </div>
//         </div>
//       </div>
//     ));
  
//     const lastFourNum = dataF.creditCard.slice(-4);
  
//     return(
//       <div style={{margin:"5px"}}>
//         <Button class="btn btn-secondary" onClick={changeViewBackwardsReset} style={{width:"100px", textAlign:"center", padding:"15px"}}>
//           Return
//         </Button>
//         <div>{listItems}</div>
//         <div><h1><strong>Total:</strong> {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(cartTotal)}</h1></div>
//         <div>
        
//           <h3>User info</h3>
//           <h4>{dataF.fullName}</h4>
//           <p>{dataF.email}</p>
  
//           <p>XXXX XXXX XXXX {lastFourNum}</p>
//           <p>{dataF.city},{dataF.state} {dataF.zip} </p>
//         </div>
//       </div>
//     )
  
//   }
  
  
//   const root = ReactDOM.createRoot(document.getElementById('root'));
//   root.render(
//     <div>
//       <SetView />
//     </div>
//   );