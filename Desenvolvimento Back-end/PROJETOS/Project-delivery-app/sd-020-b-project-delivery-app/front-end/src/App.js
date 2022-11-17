import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import OrderDetails from './pages/OrderDetails';
import OrdersPage from './pages/Orders/costumerOrder';
import AuthProvider from './services/AuthProvider';
import ProtectedRoute from './services/ProtectedRoute';
import AdminPage from './pages/AdminPage';
import Seller from './pages/Orders/sellerOrder';
import SellerOrderDetails from './pages/SellerOrderDetail';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={ <Navigate to="/login" /> } />
          <Route exact path="/login" element={ <Login /> } />
          <Route exact path="/register" element={ <Register /> } />
          <Route
            exact
            path="/customer/products"
            element={ <ProtectedRoute><Products /></ProtectedRoute> }
          />
          <Route
            exact
            path="/customer/checkout"
            element={ <ProtectedRoute><Checkout /></ProtectedRoute> }
          />
          <Route
            exact
            path="/customer/orders/:id"
            element={ <ProtectedRoute><OrderDetails /></ProtectedRoute> }
          />
          <Route
            exact
            path="/customer/orders"
            element={ <ProtectedRoute><OrdersPage /></ProtectedRoute> }
          />
          <Route
            exact
            path="/admin/manage"
            element={ <ProtectedRoute><AdminPage /></ProtectedRoute> }
          />
          <Route
            exact
            path="/seller/orders"
            element={ <ProtectedRoute><Seller /></ProtectedRoute> }
          />
          <Route
            exact
            path="/seller/orders/:id"
            element={ <ProtectedRoute><SellerOrderDetails /></ProtectedRoute> }
          />

        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
