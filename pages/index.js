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
      <div className='w-full flex justify-center'>
        <div className='m-2 badge badge-default badge-outline hover:cursor-pointer hover:text-white hover:border-0 hover:bg-black'>
          breakfast
        </div>
        <div className='m-2 badge badge-default badge-outline hover:cursor-pointer hover:text-white hover:border-0 hover:bg-black'>
          lunch
        </div>
        <div className='m-2 badge badge-default badge-outline hover:cursor-pointer hover:text-white hover:border-0 hover:bg-black'>
          dinner
        </div>
      </div>

      {/* You can open the modal using ID.showModal() method */}
      <button className='btn' onClick={() => window.my_modal_3.showModal()}>
        Ad Here
      </button>
      <dialog id='my_modal_3' className='modal'>
        <form method='dialog' className='modal-box'>
          <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
            ✕
          </button>
          <h3 className='font-bold text-lg'>Buy Vito's Salmon Chips!</h3>
          <p className='py-4'>They're delicious for humans and cats</p>
        </form>
      </dialog>

      <div className='w-full flex flex-col justify-center items-center'>
        {recipes &&
          recipes.map((recipe) => (
            <>
              <Link
                key={recipe.id}
                href={`/recipes/${recipe.slug}`}
                className=''
              >
                <div className='card w-96 bg-base-100 shadow-xl border-black m-2 hover:border-2'>
                  <figure>
                    <Image
                      src={recipe.photo.url}
                      width={200}
                      height={200}
                      alt='food'
                      className='h-[200px] w-full object-cover'
                    />
                  </figure>
                  <div className='card-body'>
                    <h2 className='card-title'>{recipe.title}</h2>
                    <ul>
                      {recipe.category.map((category) => (
                        <li className='badge badge-primary mx-2'>{category}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Link>
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
