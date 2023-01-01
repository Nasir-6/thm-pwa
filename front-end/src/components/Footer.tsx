import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className='footer bg-primary text-white p-3 flex '>
        <p className='copyright-text'>Copyright © 2023 Tower Hamlets Mosques, All rights reserved.</p>
        <FaFacebook className='w-8'/>
        <FaTwitter className='w-8'/>
        <FaInstagram className='w-8' />

    </footer>
  )
}

export default Footer