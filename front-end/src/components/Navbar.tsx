/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import './Navbar.css';
import { CSSTransition } from 'react-transition-group';

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      <div className="navbar-pattern">
        <div className="navbar-container text-white flex flex-row">
          {/* Add href to home page once done routes */}
          <a href="/" className="text-xl cursor-pointer hover:text-accent-600 p-3">
            <span className=" font-bold">TOWER HAMLETS</span> MOSQUES
          </a>

          <nav>
            <button
              type="button"
              onClick={handleClick}
              className="hamburger-btn"
              aria-controls="navigation-panel"
              aria-expanded={isExpanded}>
              <svg className="hamburger" viewBox="0 0 100 100" width={35}>
                <line className="line top " x1={20} x2={80} y1={25} y2={25} strokeWidth="10" strokeLinecap="round" />
                <line className="line middle" x1={20} x2={80} y1={50} y2={50} strokeWidth="10" strokeLinecap="round" />
                <line className="line bottom" x1={20} x2={80} y1={75} y2={75} strokeWidth="10" strokeLinecap="round" />
              </svg>
              {/* <span> Menu </span> */}
            </button>
            <CSSTransition in={isExpanded} timeout={200} classNames="navigation-panel">
              <ul id="navigation-panel" className="navigation-panel text-slate-900 font-semibold">
                {/* // TODO: Can Map through array so classes are same for all - https://tailwindcss.com/docs/reusing-styles */}
                <li className=" hover:text-accent-600">
                  <a href="/">Home</a>
                </li>
                <li className=" hover:text-accent-600">
                  <a href="/">About Us</a>
                </li>
                <li className=" hover:text-accent-600">
                  <a href="/">Jumu'ah Times</a>
                </li>
                <li className=" hover:text-accent-600">
                  <a href="/">Contact Us</a>
                </li>
                <li className=" hover:text-accent-600">
                  <a href="/">Support Us</a>
                </li>
              </ul>
            </CSSTransition>
          </nav>
        </div>
      </div>
      <div className="dark-overlay" data-visible={isExpanded} onClick={() => setIsExpanded(false)} aria-hidden="true" />
    </>
  );
};

export default Navbar;
