import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Router from 'next/router';

import { getRecipes } from './api/getHeadless';

const inter = Inter({ subsets: ['latin'] });

export default function Home({ recipes }) {
  console.log('its here', recipes);

  return (
    <>
      <Head>
        <title>Recipes</title>
        <meta name='description' content='Recipes' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        <html data-theme='light'></html>
      </Head>
      <button class='btn'>Button</button>
      <div className='badge badge-outline'>default</div>
      <div className='badge badge-primary badge-outline'>primary</div>
      <div className='badge badge-secondary badge-outline'>secondary</div>
      <div className='badge badge-accent badge-outline'>accent</div>
      {/* You can open the modal using ID.showModal() method */}
      <button className='btn' onClick={() => window.my_modal_3.showModal()}>
        open modal
      </button>
      <dialog id='my_modal_3' className='modal'>
        <form method='dialog' className='modal-box'>
          <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
            ✕
          </button>
          <h3 className='font-bold text-lg'>Hello!</h3>
          <p className='py-4'>Press ESC key or click on ✕ button to close</p>
        </form>
      </dialog>

      <div className='flex flex-col justify-center items-center'>
        {recipes &&
          recipes.map((recipe) => (
            <>
              <div className='flex flex-col justify-center items-center mb-8 group hover:scale-105 w-[400px]'>
                <Link
                  key={recipe.id}
                  href={`/recipes/${recipe.slug}`}
                  className='w-full'
                >
                  <Image
                    src={recipe.photo.url}
                    width={200}
                    height={200}
                    alt='food'
                    className='h-[200px] w-full object-cover'
                  />
                  <h1 className='text-2xl text-center p-2 w-full border border-black'>
                    {recipe.title}
                  </h1>
                </Link>
              </div>
            </>
          ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const recipes = await getRecipes();

  return { props: { recipes }, revalidate: 10 };
}
