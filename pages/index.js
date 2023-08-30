import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Router from 'next/router';
import ConfettiExplosion from 'react-confetti-explosion';

import { getRecipes } from './api/getHeadless';

const inter = Inter({ subsets: ['latin'] });

export default function Home({ recipes }) {
  // we'll work on pagination later, for now put all the data into state
  const [allRecipes, setAllRecipes] = useState(recipes);
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [isExploding, setIsExploding] = useState(false);
  const categories = [
    'breakfast',
    'lunch',
    'dinner',
    'dessert',
    'winter',
    'spring',
    'summer',
    'fall',
  ];

  useEffect(() => {
    if (selectedCategory.length < 1) {
      setFilteredRecipes(allRecipes);
    } else {
      /*      const newR = allRecipes.filter((recipe) =>
        recipe.category.some((category) => selectedCategory.includes(category))
      ); */
      const newR = allRecipes.filter((recipe) =>
        selectedCategory.every((category) => recipe.category.includes(category))
      );
      setFilteredRecipes(newR);
    }
  }, [selectedCategory, allRecipes]);

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

  const brunching = () => {
    setIsExploding(true);
    setTimeout(() => {
      setIsExploding(false);
    }, 8000);
  };

  return (
    <>
      <div className='flex flex-col justify-between items-center align-middle'>
        <div className='grid grid-cols-3 gap-2 align-middle mb-6'>
          {categories.map((category) => (
            <button
              className={`border-2 border-black p-2 hover:bg-gray-200 ${
                selectedCategory.includes(category)
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'bg-none'
              }`}
              id={category}
              key={category}
              onClick={(e) => updateCategory(e)}
              onDoubleClick={brunching}
            >
              {category}
            </button>
          ))}
          {isExploding && <ConfettiExplosion />}

          <button
            className='border-2 border-black bg-red-100 hover:bg-red-400 hover:text-white'
            onClick={clearCategories}
          >
            Clear
          </button>
        </div>

        {filteredRecipes.length > 0 ? (
          <div className='md:grid md:grid-cols-3 md:gap-2 align-middle mb-6'>
            {filteredRecipes.map((recipe) => (
              <div key={recipe.id}>
                <Link href={`/recipes/${recipe.slug}`} className='group'>
                  <div className='card rounded-none w-96 h-72 bg-base-100 hover:shadow-offset-black m-2 border-2 border-black'>
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
                      <h2 className='card-title'>{recipe.title}</h2>
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
            ))}
          </div>
        ) : (
          <>
            <h2>nothing&apos;s in the kitchen</h2>
          </>
        )}
      </div>

      {/* You can open the modal using ID.showModal() method */}
      <button
        className='btn fixed bottom-0 left-0'
        onClick={() => window.my_modal_3.showModal()}
      >
        Ad Here
      </button>
      <dialog id='my_modal_3' className='modal'>
        <form method='dialog' className='modal-box'>
          <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
            ✕
          </button>
          <h3 className='font-bold text-lg'>Buy Calico Cut Pants</h3>

          <a href='https://getcalicocutpants.com/' className='text-blue-500'>
            Buy Pants here
          </a>
        </form>
      </dialog>
    </>
  );
}

export async function getStaticProps() {
  const recipes = await getRecipes();

  return { props: { recipes }, revalidate: 10 };
}
