import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

/* REACT ICONS */
import { FaBars, FaLinkedin, FaXmark } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import Modal from './Modal';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Updated NavItems to be empty
    const NavItems = []; // No navigation items

    return (
        <header className='bg-black text-white fixed top-0 left-0 right-0 z-50'>
            <nav className='px-4 py-4 max-w-7xl mx-auto flex justify-between items-center'>
                <a href="/" className='text-xl font-bold text-white'>
                    E-CELL<span className='text-purple-500'> SAKEC</span>
                </a>

                {/* NavItems for larger screens */}
                <ul className='md:flex gap-12 text-lg hidden'>
                    {NavItems.map(({ path, link }) => (
                        <li className='text-white' key={path}>
                            <NavLink
                                className={({ isActive }) => (isActive ? "active" : "")}
                                to={path}
                            >
                                {link}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Social icons and Sign Up button */}
                <div className='text-white lg:flex gap-4 items-center hidden'>
                    <a href='https://www.linkedin.com/showcase/e-cell-sakec/' className='hover:text-purple-500'>
                        <FaLinkedin className='w-6 h-6' /> {/* Increased size */}
                    </a>
                    <a href='https://x.com/ecellsakec' className='hover:text-purple-500'>
                        <FaSquareXTwitter className='w-6 h-6' /> {/* Increased size */}
                    </a>
                    <a href='https://www.instagram.com/ecellsakec' className='hover:text-purple-500'>
                        <FaInstagram className='w-6 h-6' /> {/* Increased size */}
                    </a>
                    <button
                        onClick={openModal}
                        className='bg-purple-500 px-6 py-2 font-medium rounded hover:bg-white hover:text-purple-500 transition-all duration-200 ease-in'
                    >
                        Sign Up
                    </button>
                </div>

                {/* Mobile menu button */}
                <div className='md:hidden'>
                    <button onClick={toggleMenu} className='cursor-pointer'>
                        {isMenuOpen ? <FaXmark className='w-5 h-5' /> : <FaBars className='w-5 h-5' />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Items */}
            {isMenuOpen && (
                <ul className='md:hidden gap-12 text-lg block space-y-4 px-4 py-6 mt-14 bg-white fixed top-0 left-0 w-full transition-all ease-out duration-150 z-40'>
                    {NavItems.map(({ path, link }) => (
                        <li className='text-black' key={path}>
                            <NavLink onClick={toggleMenu} to={path}>
                                {link}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            )}

            {/* Modal Component */}
            {isModalOpen && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
                    <Modal isOpen={isModalOpen} onClose={closeModal} />
                </div>
            )}
        </header>
    );
};

export default Navbar;
