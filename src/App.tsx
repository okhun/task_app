import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Product from './pages/products';
const App=()=> {
  return  <BrowserRouter>
       <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Product />} />
          <Route path="/*" element={<Navigate to="/products" />} />
        </Routes>
    </BrowserRouter>
}

export default App;
