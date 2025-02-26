import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const Cart = ({ cart, updateQuantity, removeFromCart }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, username } = location.state || {};

  const handleCheckout = () => {
    navigate('/checkout', {
      state: {
        customerId: id,
        customerName: username,
        cartItems: cart
      }
    });
  };

  const cartTotal = cart.reduce((total, item) => 
    total + (item.price * item.quantity), 0
  );

  if (!cart || cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <ShoppingBag size={48} className="text-muted mb-3" />
        <h3>Your cart is empty</h3>
        <p className="text-muted mb-4">Add items to your cart to proceed</p>
        <Link 
          to="/view" 
          state={{ id, username }}
          className="btn btn-primary"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Shopping Cart</h2>
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              {cart.map((item) => (
                <div key={item.id} className="d-flex mb-4 align-items-center">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    className="rounded"
                  />
                  <div className="ms-3 flex-grow-1">
                    <h5 className="mb-1">{item.name}</h5>
                    <p className="text-muted mb-0">Price: ₹{item.price}</p>
                    <div className="d-flex align-items-center mt-2">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, e.target.value)}
                        className="form-control"
                        style={{ width: '80px' }}
                      />
                      <button
                        className="btn btn-outline-danger btn-sm ms-3"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="ms-auto">
                    <h5>₹{item.price * item.quantity}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Order Summary</h4>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <strong>Total</strong>
                <strong>₹{cartTotal}</strong>
              </div>
              <button 
                className="btn btn-primary w-100"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;