import React, { useState } from 'react';

const Modal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbyl_sB3vNiOTq_J1tvldOqMGPlhwSBoIK44eba7E3QDO2ZvS4geqUn6apOgNacdGEK-VQ/exec',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({ email }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setResponseMessage(result.message || 'Email saved successfully!');
        setShowPopup(true);
        setEmail('');
      } else {
        const error = await response.json();
        setResponseMessage(`Error: ${error.message || 'Unknown error occurred'}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setResponseMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${isOpen ? '' : 'hidden'} transition-opacity duration-300 ease-in-out`}>
      <div className='modal-container bg-gradient-to-r from-purple-700 to-indigo-800 p-5 max-h-[400px] lg:w-[400px] w-full rounded-lg shadow-lg transform transition-all duration-300 ease-in-out'>
        {/* Modal Content */}
        <h2 className='text-lg font-semibold mb-4 uppercase text-white'>Signup Here!</h2>
        <form id='emailForm' className='px-4' onSubmit={handleSubmit}>
          {/* Email input */}
          <div className='mb-4'>
            <input
              type='email'
              name='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='ecell@gmail.com'
              className='w-full rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 outline-none focus:border-teal-400 focus:ring focus:ring-teal-200 transition duration-200'
              required
            />
          </div>

          {/* Buttons container: Signup and Close */}
          <div className='flex justify-between mt-4'>
            <button
              type='submit'
              className='hover:shadow-lg rounded-md bg-teal-500 hover:bg-teal-400 py-2 px-6 text-sm font-semibold text-white transition-all duration-200 transform hover:scale-105'
            >
              Sign Up
            </button>

            <button
              type='button'
              onClick={onClose}
              className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded text-sm transition duration-200'
            >
              Close
            </button>
          </div>
        </form>

        {/* Response message */}
        {responseMessage && (
          <div id='responseMessage' className={`mt-4 text-sm ${responseMessage.includes('Error') ? 'text-red-500' : 'text-green-500'}`} aria-live="assertive">
            {responseMessage}
          </div>
        )}
      </div>

      {/* Centered Success Popup */}
      {showPopup && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-50'>
          <div className='bg-purple-400 text-white py-4 px-8 rounded-lg shadow-lg text-center max-w-md transform transition-all duration-300 ease-in-out'>
            <h3 className='text-xl font-bold mb-2'>Congrats!</h3>
            <p className='text-sm'>You have successfully subscribed to our newsletter!</p>
            <button
              className='mt-4 bg-white text-purple-500 font-bold py-2 px-4 rounded hover:bg-gray-100 transition duration-200'
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
