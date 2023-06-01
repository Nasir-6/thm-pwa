'use client';

import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

const HamburgerMenu = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <nav>
      <button type="button" onClick={handleClick} className="hamburger-btn" aria-controls="navigation-panel" aria-expanded={isExpanded}>
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
            {/* eslint-disable-next-line react/no-unescaped-entities */}
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
      <div className="dark-overlay" data-visible={isExpanded} onClick={() => setIsExpanded(false)} aria-hidden="true" />
    </nav>
  );
};

export default HamburgerMenu;
