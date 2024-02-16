import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Auth/Register/Register";
import Login from "./components/Auth/Login/Login";
import Home from './components/Home/Home/Home';
import RequireAuth from "./components/Auth/RequireAuth/RequireAuth";
import AddProduct from "./components/Product/AddProduct/AddProduct";
import ProductDetails from "./components/Product/ProductDetails/ProductDetails";

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/addproduct" element={<AddProduct />} />
      <Route path='/indProduct' element={<ProductDetails />} />
      {/* private routes */}
      <Route element={<RequireAuth />}>
      <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
