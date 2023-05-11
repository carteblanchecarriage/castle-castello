import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect } from 'react';
import { useState } from 'react';

import { getRecipes } from '../api/getHeadless';

export default function Post({ recipe }) {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-4xl mb-4'>{recipe.title}</h1>

        <Image src={recipe.photo.url} width={400} height={200} alt='food' />
        <p className='mt-4 max-w-xl'>{recipe.description}</p>
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
