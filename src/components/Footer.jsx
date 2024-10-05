import React, { useState } from 'react';
import { FaDiscord, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageClass, setMessageClass] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const responseMessage = document.getElementById('responseMessage');

    if (email) {
      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbyl_sB3vNiOTq_J1tvldOqMGPlhwSBoIK44eba7E3QDO2ZvS4geqUn6apOgNacdGEK-VQ/exec', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({ email }),
        });

        if (response.ok) {
          const result = await response.json();
          setMessage(result.message || 'Email saved successfully!');
          setMessageClass('success');  // Set message style to success
          setEmail('');  // Clear the input field
        } else {
          const error = await response.json();
          setMessage(`Error: ${error.message || 'Unknown error occurred'}`);
          setMessageClass('error');  // Set message style to error
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setMessage('An error occurred. Please try again later.');
        setMessageClass('error');  // Set message style to error
      }
    } else {
      setMessage('Please enter a valid email address.');
      setMessageClass('error');  // Set message style to error
    }
  };

  return (
    <footer className='bg-gray-900'>
      <div className='px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-4'>
        <div className='grid mb-8 lg:grid-cols-6'>
          <div className='grid grid-cols-2 gap-5 lg:col-span-5 md:grid-cols-4'>
            {/* Category Links */}
            <div>
              <p className='font-medium tracking-wide text-gray-300'>Category</p>
              <ul className='mt-2 space-y-2'>
                {["News", "E-Commerce", "Games", "References"].map((item, index) => (
                  <li key={index}>
                    <a href="/" className='flex items-center text-gray-500 transition-colors duration-300 hover:text-purple-600'>
                      <span className="mr-1">📰</span> {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Subscription Form */}
            <div className='md:max-w-md lg:col-span-2 lg:mt-0 mt-5'>
              <p className='font-medium tracking-wide text-gray-300'>Subscribe to Newsletter!</p>
              <form onSubmit={handleSubscribe} className='mt-4 flex flex-col md:flex-row' id='emailForm'>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none hover:shadow-md'
                  placeholder='Enter your email'
                  required
                />
                <button
                  type='submit'
                  className='inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white duration-200 rounded shadow-md bg-purple-600 hover:bg-purple-500 focus:outline-none border transition transform hover:-translate-y-1'
                >
                  Subscribe
                </button>
              </form>
              {message && (
                <p id='responseMessage' className={`mt-4 text-sm ${messageClass === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-between pt-5 pb-10 border-t border-gray-800 sm:flex-row'>
          <p className='text-gray-200 text-sm'>© Copyright 2024 | All rights reserved.</p>
          <div className='flex items-center mt-4 space-x-4 sm:mt-0'>
            {[
              { icon: <FaTwitter />, link: "#" },
              { icon: <FaInstagram />, link: "#" },
              { icon: <FaLinkedin />, link: "#" },
              { icon: <FaDiscord />, link: "#" },
            ].map((social, index) => (
              <a key={index} href={social.link} className='text-gray-500 transition-all duration-300 hover:text-purple-400'>
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
