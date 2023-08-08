import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

const Navbar = () => {
  const [copied, setCopied] = useState(false);

  const router = useRouter();
  // this feels redundant with the href='/'
  const handleRefresh = () => {
    router.reload();
  };

  return (
    <>
      <div className='p-6 text-center text-black font-bold italic text-4xl'>
        <Link href='/'>
          <h1 onClick={handleRefresh}>CASTLE CASTELLO</h1>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
