import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Recycle, LogOut, Mail, Home, Info, Settings, ShoppingBasket, RecycleIcon } from 'lucide-react';

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-nav shadow-sm">
      <div className="container">
        {/* Brand Logo and Name */}
        <Link className="navbar-brand d-flex align-items-center text-white" to="/">
          <RecycleIcon className="me-2" size={24} />
          <span className="fw-bold">Recycl Connect</span>
        </Link>

        {/* Toggler Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <form className="d-flex mx-auto w-50">
            <input
              className="form-control navbar-search"
              type="search"
              placeholder="Search for products..."
              aria-label="Search"
            />
          </form>

          <ul className="navbar-nav ms-auto">
            {/* Home Link */}
            <li className="nav-item">
              <Link className="nav-link text-white d-flex align-items-center" to="/">
                <Home className="me-1" size={20} /> Home
              </Link>
            </li>

            {/* About Us Link */}
            <li className="nav-item">
              <Link className="nav-link text-white d-flex align-items-center" to="/about-us">
                <Info className="me-1" size={20} /> About Us
              </Link>
            </li>

            {/* Contact Us Link */}
            <li className="nav-item">
              <Link className="nav-link text-white d-flex align-items-center" to="/contact-us">
                <Mail className="me-1" size={20} /> Contact Us
              </Link>
            </li>

            {/* Conditional Rendering for Login/Logout */}
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/dealer-login">Dealer Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/customer-login">Customer Login</Link>
                </li>
              </>
            ) : (
              <>
                {/* Settings Dropdown */}
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-white d-flex align-items-center"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <Settings className="me-1" size={20} /> Settings
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <Link className="dropdown-item" to="/profile">Profile</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/settings">Account Settings</Link>
                    </li>
                  </ul>
                </li>

                {/* Logout Button */}
                <li className="nav-item ms-3">
                  <button
                    className="btn btn-outline-light d-flex align-items-center"
                    onClick={handleLogout}
                  >
                    <LogOut className="me-1" size={20} /> Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;