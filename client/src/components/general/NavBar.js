import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (    
    <nav className="navbar bg-main">      
      <h1>
        <Link to="">
          <i className="fas fa-store"></i> OneSpot
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="/register?role=merchant">Merchants</Link>
        </li>
        <li>
          <Link to="/register?role=customer">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
