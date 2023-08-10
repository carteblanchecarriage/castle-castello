import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect } from 'react';
import { useState } from 'react';
import Link from 'next/link';

import { getRecipes } from '../api/getHeadless';

export default function Post({ recipe }) {
  const router = useRouter();
  const { slug } = router.query;

  console.log(recipe);

  return (
    <>
      <div className='max-w-lg mx-auto w-5/6'>
        <Link className='text-xl font-black btn btn-sm mb-4' href='/'>
          &#x3c;&nbsp;🏰
        </Link>
        <div className=''>
          <h1 className='text-4xl mb-4 font-medium'>{recipe.title}</h1>

          <Image
            src={recipe.photo.url}
            width={recipe.photo.width}
            height={recipe.photo.height}
            alt='food'
            className='w-full'
          />
          <p className='mt-4 w-full'>{recipe.description}</p>
        </div>
        <div className='text-4xl justify-left w-100 mt-8 mb-4'>Ingredients</div>
        <ul>
          {recipe.ingredients?.map((ingredient) => (
            <li key={ingredient}>
              <span>🥄</span> {ingredient}
            </li>
          ))}
        </ul>
        <div className='text-4xl justify-left w-100 mt-8 mb-4'>
          Instructions
        </div>
        <ul>
          {recipe.instructions?.map((instruction, index) => (
            <li key={index}>{`${index + 1}. ${
              instruction.charAt(0).toUpperCase() + instruction.slice(1)
            }`}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

// GraphQL query
export async function getStaticProps(context) {
  const recipes = await getRecipes();

  const { params } = context;
  const slug = params.slug;

  const recipe = recipes.find((item) => item.slug === slug);

  return { props: { recipe }, revalidate: 10 };
}

export async function getStaticPaths() {
  try {
    const recipes = await getRecipes();

    const paths = recipes.map((recipe) => ({
      params: { slug: recipe.slug },
    }));
    console.log(paths);

    return { paths, fallback: false };
  } catch (error) {
    console.log('this is an error', error);
    return { paths: [], fallback: false };
  }
}
