import React from 'react';
import "./navbar.css";

interface FooterProps {
  className?: string;
}

const getYear = () => {
  return new Date().getFullYear();
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <>
      <div id="footer" className={`footer ${className}`}>
        <img src="src/assets/images/thaylogo.png" alt="Company Logo" className="img-fluid logo" />
        <p className='footer-text'> © <span className='getYear'>{getYear()}</span> Thay Technologies Pvt. Ltd. All Rights Reserved.</p>
      </div>
    </>
  );
};

export default Footer;
