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
      <div className='max-w-4xl mx-auto w-5/6'>
        <Link
          className='text-xl font-black border-2 border-black p-2 hover:shadow-offset-black'
          href='/'
        >
          &#x3c;&nbsp;🏰
        </Link>
        <div className='md:flex items-center mt-4 max-h-md'>
          <h1 className='text-4xl font-bold w-full md:w-1/2'>{recipe.title}</h1>

          <Image
            src={recipe.photo.url}
            width={recipe.photo.width}
            height={recipe.photo.height}
            alt='food'
            className='w-full md:w-1/2 max-h-64 object-cover order-first md:order-none mt-4 md:mt-0 border-2 border-black'
          />
        </div>
        {recipe?.description ? (
          <p className='mt-4 w-full border-2 border-black p-2 shadow-offset-black'>
            {recipe.description}
          </p>
        ) : null}
        <div className='sm:flex w-full'>
          <div className='w-full md:w-1/3 md:pr-4'>
            <div className='text-2xl font-bold w-full mt-8 mb-4 border-t-2 border-black'>
              INGREDIENTS
            </div>
            {
              <ul>
                {recipe.ingredients?.mainIngredients.map((ingredient) => (
                  <li key={ingredient}>
                    <span>🥄</span> {ingredient}
                  </li>
                ))}
              </ul>
            }
            <div className='font-bold mt-4'>
              {recipe.ingredients?.subIngredientsTitle}
            </div>

            <ul>
              {recipe.ingredients?.subIngredients.map((ingredient) => (
                <li key={ingredient}>
                  <span>🥄</span> {ingredient}
                </li>
              ))}
            </ul>
          </div>
          <div className='w-full md:w-2/3'>
            <div className='text-2xl font-bold justify-right w-full mt-8 mb-4 border-t-2 border-black'>
              DIRECTIONS
            </div>
            <ul>
              {recipe.instructions?.map((instruction, index) => (
                <li key={index} className='mb-4'>
                  <div className='font-bold'>Step {index + 1}</div>
                  {`${
                    instruction.charAt(0).toUpperCase() + instruction.slice(1)
                  }`}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {recipe.cookingNotes ? (
          <>
            <div className='text-2xl font-bold justify-left w-100 mt-8 mb-4 border-t-2 border-black'>
              COOKING NOTES
            </div>
            <div>{recipe.cookingNotes}</div>
          </>
        ) : null}
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

    return { paths, fallback: 'blocking' };
  } catch (error) {
    console.log('this is an error', error);
    return { paths: [], fallback: false };
  }
}
