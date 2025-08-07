import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import React, { useRef } from "react";
import Home from "./pages/Home.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import './App.css';

function App() {
  const homeRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      homeRef.current?.refreshHome();
    } else {
      navigate("/");
    }
  };

  return (
    <ProductProvider>
      <nav className="p-4 bg-gray-100 mb-4">
        <a href="/" onClick={handleHomeClick} className="text-blue-600 font-bold cursor-pointer">Home</a>
      </nav>
      <Routes>
        <Route path="/" element={<Home ref={homeRef} />} />
        <Route path="/product/:barcode" element={<ProductDetail />} />
      </Routes>
    </ProductProvider>
  );
}

export default function AppWithRouter() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
