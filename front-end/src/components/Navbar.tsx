import { useState } from 'react';

type Props = {};

const Navbar = (props: Props) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    }
  return (
    <>
    <div className="navbar-container bg-primary text-white flex flex-row p-3">
      <a className="font-logo text-xl cursor-pointer hover:text-accent ">
        TOWER <span className=" font-semibold">HAMLETS </span>
        <span className="font-bold">MOSQUES</span>
      </a>

      <nav>
        <button onClick={handleClick} aria-controls="primary-navigation" className="hamburger-btn" aria-expanded={isExpanded}>
            <svg className='hamburger' viewBox='0 0 100 100' width={35}>
                <line className='line top' x1={20} x2={80} y1={25} y2={25} stroke="black" strokeWidth="10" strokeLinecap='round'></line>
                <line className='line middle' x1={20} x2={80} y1={50} y2={50} stroke="black" strokeWidth="10" strokeLinecap='round'></line>
                <line className='line bottom' x1={20} x2={80} y1={75} y2={75} stroke="black" strokeWidth="10" strokeLinecap='round'></line>
            </svg>
          {/* <span> Menu </span> */}
        </button>
        <ul
          id="primary-navigation"
          className="primary-navigation text-primary font-semibold"
          data-visible={isExpanded}
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
    <div className='dark-overlay' data-visible={isExpanded} onClick={() => setIsExpanded(false)}></div>
    </>
  );
};

export default Navbar;
