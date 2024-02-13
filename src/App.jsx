import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Auth/Register/Register";
import Login from "./components/Auth/Login/Login";
import Home from './components/Home/Home/Home';
import RequireAuth from "./components/Auth/RequireAuth/RequireAuth";

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      {/* private routes */}
      <Route element={<RequireAuth />}>
      <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
