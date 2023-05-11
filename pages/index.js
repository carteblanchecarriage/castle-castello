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
      </Head>

      <div className='flex flex-col justify-center items-center'>
        {recipes &&
          recipes.map((recipe) => (
            <>
              <div className='flex flex-col justify-center items-center mb-8 group hover:scale-105 w-[400px]'>
                <Link key={recipe.id} href={`/recipes/${recipe.slug}`}>
                  <Image
                    src={recipe.photo.url}
                    width={400}
                    height={200}
                    alt='food'
                  />
                  <h1 className='text-2xl text-center p-2 w-[400px] border border-black'>
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
