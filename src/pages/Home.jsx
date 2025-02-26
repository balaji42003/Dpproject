import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, Battery, Cpu, Smartphone } from 'lucide-react';

function Home() {
  return (
    <div>
      <div className="hero-section text-white d-flex align-items-center">
        <div className="container text-center">
          <h1 className="display-4 mb-4">Welcome to Recycle Connect</h1>
          <p className="lead mb-4">
            Join the revolution in e-waste management. Connect with certified dealers
            and contribute to a sustainable future.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/customer-login" className="btn btn-primary btn-lg">
              Customer Portal
            </Link>
            <Link to="/dealer-login" className="btn btn-outline-light btn-lg">
              Dealer Portal
            </Link>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <h2 className="text-center mb-5">Why Choose Recycle Connect?</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <Battery size={48} className="mb-3 text-primary" />
                <h3 className="card-title">Responsible Disposal</h3>
                <p className="card-text">
                  Ensure your e-waste is handled responsibly with our network of
                  certified recycling partners.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <Cpu size={48} className="mb-3 text-primary" />
                <h3 className="card-title">Certified Dealers</h3>
                <p className="card-text">
                  Connect with verified dealers who follow strict environmental
                  guidelines.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <Smartphone size={48} className="mb-3 text-primary" />
                <h3 className="card-title">Easy Process</h3>
                <p className="card-text">
                  Simple and streamlined process to dispose of your electronic
                  waste.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-light py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2>Join the E-Waste Revolution</h2>
              <p className="lead">
                Every year, millions of electronic devices end up in landfills.
                Together, we can make a difference by properly recycling e-waste
                and contributing to a sustainable future.
              </p>
              <Link to="/customer-login" className="btn btn-primary">
                Get Started Today
              </Link>
            </div>
            <div className="col-md-6">
              <img
                src="https://images.unsplash.com/photo-1550376026-33cbee34f79e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                alt="E-waste recycling"
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;