import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

const Footer = () => {
  const router = useRouter();

  return (
    <>
      <div className='p-6 text-center text-red-500 font-bold italic text-4xl'>
        <Link href='/'>
          <h1>CASTLE CASTELLO</h1>
        </Link>
        <Link href='/'>
          <h1>CASTLE CASTELLO</h1>
        </Link>
        <Link href='/'>
          <h1>CASTLE CASTELLO</h1>
        </Link>
      </div>
    </>
  );
};

export default Footer;
