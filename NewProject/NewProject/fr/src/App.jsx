import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'

import Register from './compontent/Register'
import Login from './compontent/Login'
import Profile from './compontent/Profile'
import Home from './compontent/Home'
import Navbar from './compontent/Header/Navbar'
import Footer from './compontent/Header/Footer'
import Shop from './compontent/Shop/Shop'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import ProtectedRoute from './pages/PrivateRoutes'
import CreatedProduct from './compontent/Shop/CreatedProduct'
import ProductList from './compontent/Shop/ShowProduct'


function App() {


  return (
    <>
      <Navbar />
      <Routes >

        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />  
        <Route
          path='/createProduct'
          element={
            <ProtectedRoute>
              <CreatedProduct />
            </ProtectedRoute>
          }
        /> 
        <Route
          path='/getProduct'
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={<Register />}
        />
        <Route
          path='/login'
          element={<Login />}
        />
        <Route 
          path="/shop" 
          element={
            <ProtectedRoute>
              <Shop />
            </ProtectedRoute>
          } />
        <Route 
          path="/cart" 
          element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
          } />


        <Route 
          path="/checkout"
         element={
          <ProtectedRoute >
            <Checkout />
          </ProtectedRoute>
         } />
      </Routes>
      <Footer />
    </>
  )
}

export default App
