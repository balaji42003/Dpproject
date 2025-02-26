import React, { useState, useEffect } from 'react'; 
import { Briefcase, CheckCircle, Inbox, Package, ShoppingBag, UserCheck2Icon, LucideDelete, ArrowRightIcon } from 'lucide-react'; 
import AddProductModal from '../components/AddProductModal'; 
import axios from 'axios'; 
import { Link, useLocation, useNavigate } from 'react-router-dom'; 

function DealerDashboard() { 
  const [showAddModal, setShowAddModal] = useState(false); 
  const [sellitem, setSellitem] = useState(false); 
  const [products, setProducts] = useState([]); 
  const [recieved, setRecieved] = useState(0); 
  const [refresh, setRefresh] = useState(false); 
  const [viewCustomerProducts, setViewCustomerProducts] = useState(false); 
  const location = useLocation(); 
  const navigate = useNavigate();
  const username = location.state?.username; 
  const dealerid = location.state?.dealerid; 

  // Fetch products from the backend 
  const fetchProducts = async () => { 
    try { 
      setProducts([]); // Reset products to force re-fetching 
      const url = viewCustomerProducts
        ? 'http://localhost:8080/getcustomerproducts'
        : `http://localhost:8080/getdealerproduct/${dealerid}`;
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Fetch products when component mounts or when toggling between dealer and customer products
  useEffect(() => {
    fetchProducts();
  }, [refresh]);

  // Handle toggling between dealer and customer products
  const toggleView = () => {
    setViewCustomerProducts((prev) => !prev);
    setRefresh((prev) => !prev); // Force refresh
  };

  const increment=()=>{
    setRecieved(recieved + 1);
  };

  // Handle product deletion
  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/delete/${productId}`);
      setRefresh(!refresh); // Trigger refresh to update the product list
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Handle adding a new product (called from AddProductModal)
  const handleAddProduct = (newProduct) => {
    // Add the new product to the current list
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setShowAddModal(false); // Close the modal after successful product addition
    setRefresh((prev) => !prev); // Refresh the product list
  };

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-md-8">
          <h2 className="mb-0">Dealer Dashboard</h2>
          <UserCheck2Icon size={40} className="me-2" />
          <h4 className="text-muted">Welcome back, {username}</h4>
        </div>
        <div className="col-md-4 text-md-end">
          <button className="btn btn-primary me-2" onClick={toggleView}>
            <CheckCircle size={18} className="me-1" />
            {viewCustomerProducts ? "Show Dealer Products" : "Approve Requests"}
          </button>
          <Link to={{
            pathname: "/sell",
            state: { dealerid, username }
          }}>
            <button className="btn btn-success" onClick={() => setSellitem(true)}>
              <Package size={18} className="me-1" />
              Upload Product
            </button>
          </Link> 
          <button className="btn btn-info mt-4" onClick={() => setShowAddModal(true)}>
            <Package size={18} className="me-1" />
            Sell Item
          </button>
        </div>
      </div>
      <div className="row">
        {/* Card Display for Product Stats */}
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
                <Inbox size={24} className="text-success me-2" />
                <h3 className="card-title mb-0">Recovered From Customers</h3>
              </div>
              <h4 className="display-4 mb-0">{recieved}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <ShoppingBag size={24} className="text-success me-2" />
                <h3 className="card-title mb-0">Collected Items</h3>
              </div>
              <h4 className="display-4 mb-0">0</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <h3 className="mb-0">{viewCustomerProducts ? "Customer Product Requests" : "Product Inventory"}</h3>
        </div>
        <div className="card-body">
          {products.length === 0 ? (
            <div className="text-center py-5">
              <Package size={48} className="text-muted mb-3" />
              <h4>No products available</h4>
              <p className="text-muted">
                {viewCustomerProducts
                  ? "No customer requests at the moment."
                  : "Click the 'Sell Item' button to list your first product."}
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Type</th>
                    <th>{viewCustomerProducts ? "Description" : "Price"}</th>
                    <th>Expiry Date</th>
                    <th>{viewCustomerProducts ? "Customer Name" : "Description"}</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={product.id || index}>
                      <td>{product.name}</td>
                      <td>{product.type}</td>
                      <td>{viewCustomerProducts ? product.description : product.price}</td>
                      <td>{product.expiryDate}</td>
                      <td>{viewCustomerProducts ? product.custname : product.description}</td>
                      <td>
                        {!viewCustomerProducts ? (<button
                          className="btn btn-danger"
                          onClick={() => {handleDeleteProduct(product.id);
                            increment();
                          }}
                        >
                          <LucideDelete size={18} className="me-1" />
                          Delete
                        </button>) : (
                          <>
                          <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <LucideDelete size={18} className="me-1" />
                          Delete
                        </button>
                        <button
                          className="btn btn-success ms-2"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <ArrowRightIcon size={18} className="me-1" />
                          Accept
                        </button>

                          </>
                          )}
                      
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {showAddModal && (
        <AddProductModal
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAddProduct={handleAddProduct} // Passing the function to handle product addition
          isDealer={true}
          dealerid={dealerid}
          setRefresh={setRefresh}
        />
      )}
    </div>
  );
}

export default DealerDashboard;
