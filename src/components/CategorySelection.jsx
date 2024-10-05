import React, { useState } from 'react';
import { FaStar, FaShieldAlt, FaRobot, FaMobileAlt, FaLaptopCode, FaSearch } from 'react-icons/fa';

const CategorySelection = ({ onSelectCategory, activeCategory, onSearch }) => {
    const categories = [
        { name: "Startups", icon: <FaStar /> },
        { name: "Security", icon: <FaShieldAlt /> },
        { name: "AI", icon: <FaRobot /> },
        { name: "Apps", icon: <FaMobileAlt /> },
        { name: "Tech", icon: <FaLaptopCode /> }
    ];

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
    };

    const handleSearchClick = () => {
        onSearch(searchTerm); // Call the onSearch prop with the current search term
    };

    return (
        <div className="px-4 mb-8 py-5 flex justify-end"> {/* Changed to justify-end */}
            {/* Search Bar */}
            <div className="flex items-center bg-gray-800 rounded-lg overflow-hidden shadow-md mr-9">
                <input
                    type="text"
                    placeholder="Search Blogs..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="px-4 py-3 w-64 text-gray-300 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <button
                    onClick={handleSearchClick}
                    className="flex items-center justify-center px-4 py-3 text-purple-600 hover:text-purple-700 transition-colors duration-300"
                >
                    <FaSearch className="text-lg" />
                </button>
            </div>

            {/* Category Buttons */}
            <div className="flex items-center">
                <button
                    onClick={() => onSelectCategory(null)}
                    className={`mr-5 px-4 py-2 rounded-lg transition-all duration-300 ${
                        activeCategory ? "text-gray-400" : "bg-purple-600 text-white"
                    } shadow-md hover:shadow-xl`}
                    aria-pressed={activeCategory === null}
                >
                    All
                </button>
                {categories.map((category) => (
                    <button
                        onClick={() => onSelectCategory(category.name)}
                        className={`mr-5 px-4 py-2 rounded-lg transition-all duration-300 flex items-center ${
                            activeCategory === category.name
                                ? "bg-purple-600 text-white shadow-md hover:shadow-xl"
                                : "bg-gray-800 text-gray-300 hover:bg-purple-600 hover:text-white"
                        }`}
                        key={category.name}
                        aria-pressed={activeCategory === category.name}
                    >
                        {category.icon}
                        <span className="ml-2">{category.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategorySelection;
