import Navbar from './navbar';
import Footer from './footer';
import { Suspense } from 'react';
import Loading from './loading';

export default function Layout({ children }) {
  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <Navbar />
        <Suspense fallback={<Loading />}>
          <main className='flex-grow'>{children}</main>
        </Suspense>
        <Footer />
      </div>
    </>
  );
}
