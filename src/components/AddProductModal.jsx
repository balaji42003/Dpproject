import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function AddProductModal({ show, onClose, isDealer,setRefresh,customerId,customerName,dealerid ,setCrefresh}) {
  const [product, setProduct] = useState({
    name: '',
    type: '',
    expiryDate: '',
    price: '',       // For dealer only
    description: '',
    customerName: '', // For dealer only
    customerPhone: '', // For dealer only
    customerEmail: '' // For dealer only
  });

  const [error, setError] = useState(null);  // To handle errors
  const [loading, setLoading] = useState(false);  // To manage loading state
  const location = useLocation();  





  

  // Handle the form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);  // Reset error state on each submit
    setLoading(true);  // Start loading

    // Prepare the product object based on the user type
    let productData;

    if (isDealer) {
      // Dealer: include all attributes
      productData = {
        dealerId:dealerid,
        name: product.name,
        type: product.type,
        expiryDate: product.expiryDate,
        price: product.price,
        description: product.description,
        customerName: product.customerName,
        customerPhone: product.customerPhone,
        customerEmail: product.customerEmail
      };

      try {
        console.log(productData);
        // API call for dealer product
        const response = await axios.post('http://localhost:8080/addDealerProduct', productData, {
          headers: {
            'Content-Type': 'application/json',  // Ensure the backend expects JSON
          }
        });
        
        console.log('Dealer product added successfully:', response.data);
        setRefresh(true);

      } catch (err) {
        // Handle error
        console.error('Error adding dealer product:', err);
        setError('Error adding dealer product. Please try again later.');
      }
    } else {
      // Customer: only include 4 relevant attributes
      productData = {
        custid:customerId,
        custname:customerName,
        name: product.name,
        type: product.type,
        expiryDate: product.expiryDate,
        description: product.description
      };

      try {
        // API call for customer product
        const response = await axios.post('http://localhost:8080/addCustomerProduct', productData, {
          headers: {
            'Content-Type': 'application/json',  // Ensure the backend expects JSON
          }
        });
        console.log('Customer product added successfully:', response.data);
        setCrefresh(true);
      } catch (err) {
        // Handle error
        console.error('Error adding customer product:', err);
        setError('Error adding customer product. Please try again later.');
      }
    }

    // Reset the form and close modal
    setProduct({
      name: '',
      type: '',
      expiryDate: '',
      price: '',
      description: '',
      customerName: '',
      customerPhone: '',
      customerEmail: ''
    });
    setLoading(false);  // Stop loading
    onClose();  // Close the modal
    refreshProducts();
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{isDealer ? 'Add Product for Sale' : 'Add Product for Recycling'}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={product.name}
                  onChange={(e) => setProduct({ ...product, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Product Type</label>
                <select
                  className="form-select"
                  value={product.type}
                  onChange={(e) => setProduct({ ...product, type: e.target.value })}
                  required
                >
                  <option value="">Select type</option>
                  <option value="laptop">Laptop</option>
                  <option value="smartphone">Smartphone</option>
                  <option value="tablet">Tablet</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Expiry Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={product.expiryDate}
                  onChange={(e) => setProduct({ ...product, expiryDate: e.target.value })}
                  required
                />
              </div>
              {isDealer && (
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    value={product.price}
                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                    required
                  />
                </div>
              )}
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  value={product.description}
                  onChange={(e) => setProduct({ ...product, description: e.target.value })}
                  required
                ></textarea>
              </div>
              {isDealer && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Customer Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={product.customerName}
                      onChange={(e) => setProduct({ ...product, customerName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Customer Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={product.customerPhone}
                      onChange={(e) => setProduct({ ...product, customerPhone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Customer Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={product.customerEmail}
                      onChange={(e) => setProduct({ ...product, customerEmail: e.target.value })}
                      required
                    />
                  </div>
                </>
              )}
              <div className="modal-footer">
                {loading ? (
                  <button type="button" className="btn btn-primary" disabled>
                    Loading...
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary">
                    Add Product
                  </button>
                )}
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Close
                </button>
              </div>
            </form>
            {error && (
              <div className="alert alert-danger mt-3">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProductModal;
