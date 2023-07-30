import React from 'react';
import './Footer.css'
const Footer = () => {
  return (
    <footer className="bg-secondary py-4 footer-class" >
      <div className="container text-center">
        <p className="mb-0 ">© {new Date().getFullYear()} Booking Services. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
