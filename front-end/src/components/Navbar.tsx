import React from 'react';

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="navbar-container bg-primary text-white flex flex-row p-3">
      <a className="font-logo text-xl cursor-pointer hover:text-accent ">
        TOWER <span className=" font-semibold">HAMLETS </span>
        <span className="font-bold">MOSQUES</span>
      </a>

      <nav>
        <button aria-controls="primary-navigation" className="hamburger" aria-expanded="false">
          <span></span> Menu
        </button>
        <ul
          id="primary-navigation"
          className="primary-navigation text-primary font-semibold"
        >
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>About Us</a>
          </li>
          <li>
            <a>Jumu'ah Times</a>
          </li>
          <li>
            <a>Contact Us</a>
          </li>
          <li>
            <a>Support Us</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
