import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';

const Banner = () => {
  return (
    <div className='relative px-4 py-32 bg-gradient-to-r from-purple-700 via-purple-900 to-black mx-auto overflow-hidden'>
      <div className='absolute inset-0 bg-opacity-60 backdrop-blur-md'></div> {/* Enhanced glassmorphism effect */}
      <div className='relative text-white text-center z-10'>
        <h1 className='text-5xl lg:text-7xl leading-snug font-bold mb-5 font-primary transition-transform transform hover:scale-105'>
          Welcome to E-Bytes
        </h1>
        <p className='text-gray-200 lg:w-3/5 mx-auto mb-5 font-secondary'>
          Start your blog reading journey & Join E-CELL SAKEC Newsletter!
        </p>
        <div>
          <Link
            to="/"
            className='font-medium text-lg bg-purple-600 hover:bg-purple-500 text-white inline-flex items-center py-2 px-4 rounded transition-all duration-300 shadow-lg transform hover:-translate-y-1'
          >
            Know More <FaArrowRight className='mt-1.5 ml-2' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
