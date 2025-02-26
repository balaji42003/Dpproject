import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, Plus, Recycle, ShoppingBasket, User, ShoppingCart } from 'lucide-react';
import AddProductModal from '../components/AddProductModal';
import { useLocation, useNavigate, Link } from 'react-router-dom';

function CustomerDashboard({ cart = [], addToCart, updateQuantity, removeFromCart, clearCart }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [crefresh, setCrefresh] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username;
  const id = location.state?.id;

  // Function to fetch customer products from backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/getcustomerproduct/${id}`);
      setProducts(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCartItems = async () => {
    if (!id) return;
    try {
      const response = await axios.get(`http://localhost:8080/api/cart/${id}`);
      if (response.data && Array.isArray(response.data)) {
        clearCart?.(); // Clear existing cart items first
        response.data.forEach(item => addToCart?.(item));
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const handleNavigate = () => {
    navigate("/view", { state: { id, username } });
  };

  // Check for authentication
  useEffect(() => {
    if (!username || !id) {
      navigate('/customer-login');
      return;
    }
  }, [username, id, navigate]);

  // Fetch data when the component loads
  useEffect(() => {
    if (username && id) {
      fetchProducts();
      fetchCartItems();
    }
  }, [username, id, crefresh]); // Added proper dependencies

  const handleAddProduct = (product) => {
    setProducts(prevProducts => [...prevProducts, { ...product, id: Date.now() }]);
  };

  if (loading) {
    return <div className="container py-5">Loading...</div>;
  }

  if (error) {
    return <div className="container py-5">Error: {error}</div>;
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-md-8">
          <User size={40} className="me-1" />
          <h2 className="mb-0">Welcome back, {username}!</h2>
          <p className="text-muted">Happy to see you!</p>
        </div>
        <div className="col-md-4 text-md-end">
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={18} className="me-1" />
            Resell 
          </button>
          <button className="btn btn-primary ms-5" onClick={handleNavigate}>
            <ShoppingBasket size={18} className="me-1" />
            Buy Products  
          </button>
          <Link 
            to="/cart" 
            state={{ id, username }} 
            className="btn btn-primary ms-3"
          >
            <ShoppingCart size={18} className="me-1" />
            Cart ({cart?.length || 0})
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <Package size={24} className="text-primary me-2" />
                <h3 className="card-title mb-0">Products Listed</h3>
              </div>
              <h4 className="display-4 mb-0">{products.length}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <Recycle size={24} className="text-success me-2" />
                <h3 className="card-title mb-0">Items Approved</h3>
              </div>
              <h4 className="display-4 mb-0">0</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="mb-0">My Products</h3>
        </div>
        <div className="card-body">
          {products.length === 0 ? (
            <div className="text-center py-5">
              <Package size={48} className="text-muted mb-3" />
              <h4>No products listed yet</h4>
              <p className="text-muted">
                Click the "Add Product" button to list your first product for recycling.
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Type</th>
                    <th>Expired Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.type}</td>
                      <td>{product.expiryDate}</td>
                      <td>
                        <span className="badge bg-warning">{product.status || 'Pending'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <AddProductModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddProduct}
        isDealer={false}
        customerId={id}
        customerName={username}
        setCrefresh={setCrefresh}
      />
    </div>
  );
}

export default CustomerDashboard;
