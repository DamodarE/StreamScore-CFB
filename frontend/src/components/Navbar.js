import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">ScoreStream CFB</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/highlights">Highlights</Link></li>
        <li><Link to="/matchups">Matchups</Link></li>
        {isAuthenticated ? (
          <>
            <li>Welcome, {user}!</li>
            <li><Link to="/profile">My Profile</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};
export default Navbar;
