/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      <div className="navbar-container bg-gradient-to-r from-primary-light to-primary-dark text-white flex flex-row p-3">
        {/* Add href to home page once done routes */}
        <a href="/" className="text-xl cursor-pointer hover:text-accent-light">
          <span className=" font-bold">TOWER HAMLETS</span> MOSQUES
        </a>

        <nav>
          <button
            type="button"
            onClick={handleClick}
            className="hamburger-btn"
            aria-controls="primary-navigation"
            aria-expanded={isExpanded}>
            <svg className="hamburger" viewBox="0 0 100 100" width={35}>
              <line className="line top" x1={20} x2={80} y1={25} y2={25} stroke="black" strokeWidth="10" strokeLinecap="round" />
              <line className="line middle" x1={20} x2={80} y1={50} y2={50} stroke="black" strokeWidth="10" strokeLinecap="round" />
              <line className="line bottom" x1={20} x2={80} y1={75} y2={75} stroke="black" strokeWidth="10" strokeLinecap="round" />
            </svg>
            {/* <span> Menu </span> */}
          </button>
          <ul id="primary-navigation" className="primary-navigation text-primary-dark font-semibold" data-visible={isExpanded}>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/">About Us</a>
            </li>
            <li>
              <a href="/">Jumu'ah Times</a>
            </li>
            <li>
              <a href="/">Contact Us</a>
            </li>
            <li>
              <a href="/">Support Us</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="dark-overlay" data-visible={isExpanded} onClick={() => setIsExpanded(false)} aria-hidden="true" />
    </>
  );
};

export default Navbar;
