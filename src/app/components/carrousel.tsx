"use client"

import Image from 'next/image';
import { useState } from 'react';

import { BsArrowLeftCircle, BsArrowRightCircle, BsDot } from 'react-icons/bs';

const Carrousel = () => {

  const slides = [
    {
      slide: '/carrousel/banner1.png'
    },
    {
      slide: '/carrousel/banner2.png'
    },
    {
      slide: '/carrousel/banner3.png'
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="mx-auto mt-2 relative group">

      <div className='pt-1 flex lg:container lg:mx-auto lg:justify-center lg:bg-gray-100'>
        {slides.map((slide, index) => (
          <div key={index} className={`relative h-[186px] w-full transition-transform ease-in-out duration-500 transform ${index === currentIndex ? 'translate-x-0' : 'translate-x-full hidden'} lg:h-[400px] lg:w-[800px]`}>
            <Image src={slide.slide} alt='Slider' style={{ objectFit: 'cover' }} fill />
          </div>
        ))}
      </div>


      <div className='flex justify-between h-1'>
        <div className='hidden group-hover:block relative top-[-100px] left-3 -translate-x-0 translate-y-[-50%] text-2x1 cursor-pointer lg:top-[-200px] lg:left-16'>
          <BsArrowLeftCircle onClick={prevSlide} size={30} className='lg:h-50 lg:w-50' />
        </div>

        <div className='hidden group-hover:block relative top-[-100px] right-3 -translate-x-0 translate-y-[-50%] text-2x1 cursor-pointer lg:top-[-200px] lg:right-16'>
          <BsArrowRightCircle onClick={nextSlide} size={30} className='lg:h-50 lg:w-50' />
        </div>
      </div>

      <div className='flex top-4 justify-center'>
        {slides.map((slide, slideIndex) => (
          <div className='text-2xl cursor-pointer' onClick={() => goToSlide(slideIndex)} key={slideIndex}><BsDot size={30} /></div>
        ))}
      </div>

    </div >
  );
}

export default Carrousel;
