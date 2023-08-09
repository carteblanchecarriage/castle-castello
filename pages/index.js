import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Router from 'next/router';

import { getRecipes } from './api/getHeadless';

const inter = Inter({ subsets: ['latin'] });

export default function Home({ recipes }) {
  // we'll work on pagination later, for now put all the data into state
  const [allRecipes, setAllRecipes] = useState(recipes);
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const categories = [
    'breakfast',
    'lunch',
    'dinner',
    'winter',
    'spring',
    'summer',
    'fall',
  ];

  useEffect(() => {
    if (selectedCategory.length < 1) {
      setFilteredRecipes(allRecipes);
    } else {
      const newR = allRecipes.filter((recipe) =>
        recipe.category.some((category) => selectedCategory.includes(category))
      );
      setFilteredRecipes(newR);
    }
  }, [selectedCategory]);

  const updateCategory = (e) => {
    if (selectedCategory.includes(e.target.id)) {
      const newSelectedCategory = selectedCategory.filter(
        (category) => category !== e.target.id
      );
      setSelectedCategory(newSelectedCategory);
    } else {
      setSelectedCategory([...selectedCategory, e.target.id]);
    }
  };

  const clearCategories = () => {
    setSelectedCategory([]);
    setFilteredRecipes(allRecipes);
  };

  return (
    <>
      <div className='flex flex-col justify-between items-center align-middle'>
        <div className='grid grid-cols-3 gap-2 align-middle mb-6'>
          {categories.map((category) => (
            <button
              className={`btn btn-sm ${
                selectedCategory.includes(category)
                  ? 'btn-primary'
                  : 'btn-outline'
              }`}
              id={category}
              key={category}
              onClick={(e) => updateCategory(e)}
            >
              {category}
            </button>
          ))}
          <button
            className='btn btn-circle btn-outline'
            onClick={clearCategories}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div key={recipe.id}>
              <Link href={`/recipes/${recipe.slug}`} className='group'>
                <div className='card w-96 bg-base-100 shadow-xl m-2'>
                  <figure>
                    <Image
                      src={recipe.photo.url}
                      width={recipe.photo.width}
                      height={recipe.photo.height}
                      alt='food'
                      className='h-[200px] w-full object-cover'
                    />
                  </figure>
                  <div className='card-body'>
                    <h2 className='card-title group-hover:underline'>
                      {recipe.title}
                    </h2>
                    <ul>
                      {recipe.category?.map((category, index) => (
                        <li
                          key={index}
                          className='badge badge-nuetral bg-gray-50 mx-2'
                        >
                          {category}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <>
            <h2>nothing&apos;s in the kitchen</h2>
          </>
        )}
      </div>

      {/* You can open the modal using ID.showModal() method */}
      <button
        className='btn fixed top-0 left-0'
        onClick={() => window.my_modal_3.showModal()}
      >
        Ad Here
      </button>
      <dialog id='my_modal_3' className='modal'>
        <form method='dialog' className='modal-box'>
          <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
            ✕
          </button>
          <h3 className='font-bold text-lg'>Buy Vito&apos;s Salmon Chips!</h3>
          <p className='py-4'>They&apos;re delicious for humans and cats</p>
        </form>
      </dialog>
    </>
  );
}

export async function getStaticProps() {
  const recipes = await getRecipes();

  return { props: { recipes }, revalidate: 10 };
}
