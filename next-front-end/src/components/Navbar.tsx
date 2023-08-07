/* eslint-disable react/no-unescaped-entities */
import './Navbar.css';
import Link from 'next/link';
import HamburgerMenu from './HamburgerMenu';

const Navbar = () => (
  <div className="navbar-pattern">
    <div className="navbar-container text-white flex flex-row">
      {/* Add href to home page once done routes */}
      <Link prefetch={false} href="/" className="text-xl cursor-pointer hover:text-accent-600 p-3">
        <span className=" font-bold">TOWER HAMLETS</span> MOSQUES
      </Link>
      {/* seperate Hamburger menu to be client component - and place useState inside here */}
      <HamburgerMenu />
    </div>
  </div>
);

export default Navbar;
