import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className='footer bg-primary text-white p-4 flex flex-col sm:flex-row gap-2 justify-center items-center'>
        <p className='copyright-text text-xs font-bold'>Copyright © 2023 Tower Hamlets Mosques, All rights reserved.</p>
        <div className='social-icons flex'>
        <FaFacebook className='w-8'/>
        <FaTwitter className='w-8'/>
        <FaInstagram className='w-8' />
        </div>
    </footer>
  )
}

export default Footer