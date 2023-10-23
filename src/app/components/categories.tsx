"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { BsPhone } from 'react-icons/bs';
import { HiMiniComputerDesktop } from 'react-icons/hi2';
import { MdOutlineComputer, MdStore } from 'react-icons/md';
import { AiTwotoneTablet } from 'react-icons/ai';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import Link from 'next/link';

const Categories = () => {

  const slideLeft = () => {
    const slider = document.getElementById('slider');
    if (slider) {
      slider.scrollLeft = slider.scrollLeft - 500;
    }
  };

  const slideRight = () => {
    const slider = document.getElementById('slider');
    if (slider) {
      slider.scrollLeft = slider?.scrollLeft! + 500
    }
  };

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategories = async () => {
    const response = await fetch('https://api-fatec.onrender.com/api/v1/category');
    // console.log(response)
    const data = await response.json();
    // console.log(data);
    setCategories(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  return (

    <div className="container mx-auto mt-5">
      <h2 className="ml-5 font-semibold text-lg lg:hidden">Categories</h2>

      {isLoading && (
        <div className='flex items-center justify-center'>
          <div className="h-12 w-12 border-4 border-l-gray-200 border-r-gray-200 border-b-gray-200 border-t-primary animate-spin ease-linear rounded-full"></div>
        </div>
      )}

      {!isLoading && categories.length === 0 && (
        <div className='flex items-center justify-center'>
          <p>Não há categories disponíveis.</p>
        </div>
      )}

      {!isLoading && (
        <div className='relative flex items-center pt-3 lg:justify-center'>
          <SlArrowLeft className='opacity-50 cursor-pointer' onClick={slideLeft} size={40} />
          <div id='slider' className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide lg:flex lg:items-center lg:justify-center'>

            {categories.map((category: any) => {
              const textColor = getRandomColor();
              // console.log(categories)
              return (
                <div key={category.id} className='inline-block cursor-pointer pr-6'>
                  <Link href={`/product/category/${category.id}`}>
                    <div
                      className='flex flex-col items-center justify-center lg:mr-10'
                      style={{
                        // color: "primary",
                      }}
                    >
                      {/* <MdStore size={40} className='lg:h-20 lg:w-20' /> */}
                      <p className='font-semibold lg:text-lg'>{category.name}</p>
                    </div>
                  </Link>
                </div>
              );
            })}

          </div>
          <SlArrowRight className='opacity-50 cursor-pointer' onClick={slideRight} size={40} />
        </div>
      )
      }

    </div >

  );
}

export default Categories;
