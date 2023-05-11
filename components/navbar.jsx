import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

const Navbar = () => {
  const [copied, setCopied] = useState(false);

  const router = useRouter();

  function copyToClipboard() {
    navigator.clipboard
      .writeText('you copied this')
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  }

  return (
    <>
      <div className='p-6  text-center text-red-500 font-bold italic text-4xl'>
        <Link href='/'>
          <h1>CASTLE CASTELLO</h1>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
