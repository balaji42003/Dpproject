import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DealerLogin from './pages/DealerLogin';
import CustomerLogin from './pages/CustomerLogin';
import DealerDashboard from './pages/DealerDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import Navbar from './components/Navbar';
import Sellitem from './SellItem';
import View from './View';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, parseInt(quantity) || 0) }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <Router>
      <div>
        <Navbar cart={cart} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dealer-login" element={<DealerLogin />} />
          <Route path="/customer-login" element={<CustomerLogin />} />
          <Route path="/dealer-dashboard" element={<DealerDashboard />} />
          <Route 
            path="/customer-dashboard" 
            element={
              <CustomerDashboard 
                cart={cart}
                addToCart={addToCart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
              />
            } 
          />
          <Route path="/sell" element={<Sellitem />} />
          <Route 
            path="/view" 
            element={
              <View 
                addToCart={addToCart} 
              />
            } 
          />
          <Route 
            path="/cart" 
            element={
              <Cart 
                cart={cart} 
                updateQuantity={updateQuantity} 
                removeFromCart={removeFromCart} 
              />
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <Checkout 
                cart={cart} 
                clearCart={clearCart} 
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
