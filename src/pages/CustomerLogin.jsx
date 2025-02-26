import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import axios from 'axios';

function CustomerLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [credentials, setCredentials] = useState({ username: '', password: '', email: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    const url = isLogin ? 'http://localhost:8080/login' : 'http://localhost:8080/register';

    try {
      const response = await axios.post(url, credentials);

      if (isLogin) {
        const { id } = response.data; // Extract user ID

        // Navigate to dashboard with username and ID
        navigate('/customer-dashboard', { 
          state: { 
            username: credentials.username, 
            id: id 
          } 
        });

        console.log('Navigated with username:', credentials.username, 'and ID:', id);
      } else {
        alert('Registration successful! You can now log in.');
        setIsLogin(true);
      }
    } catch (error) {
      setError(error.response?.data || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow border-primary">
            <div className="card-body">
              <div className="text-center mb-4">
                <User size={48} className="text-primary" />
                <h2 className="mt-3">{isLogin ? 'Customer Login' : 'Register'}</h2>
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={credentials.email}
                      onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                      required
                    />
                  </div>
                )}
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  {isLogin ? 'Login' : 'Register'}
                </button>
              </form>
              <div className="text-center mt-3">
                <button className="btn btn-link" onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? 'New user? Register here' : 'Already have an account? Login here'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerLogin;
