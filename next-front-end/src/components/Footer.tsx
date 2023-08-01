import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => (
  <footer className="footer bg-gradient-to-r from-primary-600 to-primary-800 text-white p-4 flex flex-col sm:flex-row gap-2 justify-center items-center">
    {/* TODO: Add dua */}
    <p className="copyright-text text-xs font-bold">Copyright © 2016 Tower Hamlets Mosques, All rights reserved.</p>
    <div className="social-icons flex">
      <Link href="https://www.facebook.com/thmuslims">
        <FaFacebook className="w-8 hover:text-accent-600" />
      </Link>
      <Link href="https://twitter.com/thmuslims">
        <FaTwitter className="w-8 hover:text-accent-600" />
      </Link>
      <Link href="https://www.instagram.com/thmosques/">
        <FaInstagram className="w-8 hover:text-accent-600" />
      </Link>
    </div>
  </footer>
);

export default Footer;
