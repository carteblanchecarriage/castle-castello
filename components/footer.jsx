import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

const Footer = () => {
  const router = useRouter();

  return (
    <>
      <footer className='footer footer-center p-10 bg-base-200 text-base-content rounded mt-12'>
        <div>
          <p>
            🏰 <i>Castle Castello</i> 🏰
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
