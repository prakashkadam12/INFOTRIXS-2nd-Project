import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header >
      <nav className="navbar navbar-light bg-secondary">
        <div className="container-fluid">
        <a className="navbar-brand text-center" href="/">
 <h1 class="reservation-heading text-white"><i className="fas fa-hotel"></i> Booking Services</h1>
</a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ml-auto text-uppercase">
              <li className="nav-item">
                <a className="nav-link active text-white" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/login">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/signup">
                  Signup
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
