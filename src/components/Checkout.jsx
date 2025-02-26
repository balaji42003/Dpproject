import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Checkout = ({ cart, clearCart }) => {
  const [address, setAddress] = useState({
    name: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: '',
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { customerId, customerName } = location.state || {};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the order details to the backend
    console.log('Order placed:', { cart, address });
    clearCart();
    navigate('/customer-dashboard', { 
      state: { id: customerId, username: customerName }
    });
  };

  const handlePayment = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const options = {
        key: "rzp_live_kYGlb6Srm9dDRe", // Replace with your Razorpay Key ID
        amount: cart.reduce((total, item) => total + item.price * item.quantity, 0) * 100, // Amount in paise
        currency: "INR",
        name: "EasyBuy",
        description: "Purchase Description",
        handler: function (response) {
          alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
          handleSubmit();
        },
        prefill: {
          name: address.name,
          email: address.email,
          contact: address.phone,
        },
        notes: {
          address: `${address.addressLine1}, ${address.addressLine2}, ${address.city}, ${address.state}, ${address.zip}`,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    };
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container py-5">
      <h2 className="mb-4">Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={address.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={address.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            value={address.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address Line 1</label>
          <input
            type="text"
            className="form-control"
            name="addressLine1"
            value={address.addressLine1}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address Line 2</label>
          <input
            type="text"
            className="form-control"
            name="addressLine2"
            value={address.addressLine2}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={address.city}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">State</label>
          <input
            type="text"
            className="form-control"
            name="state"
            value={address.state}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Zip Code</label>
          <input
            type="text"
            className="form-control"
            name="zip"
            value={address.zip}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handlePayment}>
          Pay with Razorpay
        </button>
      </form>
    </div>
  );
};

export default Checkout;