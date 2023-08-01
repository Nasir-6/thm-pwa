'use client';

import Link from 'next/link';
import React, { useState } from 'react';

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
      <ul id="navigation-panel" className="navigation-panel text-slate-900 font-semibold">
        {/* // TODO: Can Map through array so classes are same for all - https://tailwindcss.com/docs/reusing-styles */}
        <li className=" hover:text-accent-600">
          <Link href="/">Home</Link>
        </li>
        <li className=" hover:text-accent-600">
          <Link href="/">About Us</Link>
        </li>
        <li className=" hover:text-accent-600">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <Link href="/">Jumu'ah Times</Link>
        </li>
        <li className=" hover:text-accent-600">
          <Link href="/">Contact Us</Link>
        </li>
        <li className=" hover:text-accent-600">
          <Link href="/">Support Us</Link>
        </li>
      </ul>
      {/* TODO: Add donate button */}
      <div className="dark-overlay" data-visible={isExpanded} onClick={() => setIsExpanded(false)} aria-hidden="true" />
    </nav>
  );
};

export default HamburgerMenu;
