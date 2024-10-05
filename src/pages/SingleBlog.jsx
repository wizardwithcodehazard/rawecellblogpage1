import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { FaUser, FaShareAlt } from "react-icons/fa";
import SideBar from '../components/SideBar';

const SingleBlog = () => {
    const data = useLoaderData();
    const { title, image, author, published_date, reading_time, content } = data[0];

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                alert("Blog link copied to clipboard!");
            })
            .catch(err => {
                console.error("Failed to copy: ", err);
            });
    };

    return (
        <div className="bg-gray-900 min-h-screen py-12">
            {/* Blog details */}
            <div className="max-w-7xl mx-auto my-12 flex flex-col md:flex-row gap-12">
                <div className="lg:w-3/4 mx-auto bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
                    <img src={image} alt={title} className="w-full h-fit object-cover rounded-lg mb-4" />
                    <h2 className="text-5xl mt-4 font-bold mb-2 text-purple-400">{title}</h2>
                    <div className="flex items-center justify-between mb-2 text-gray-400">
                        <p>
                            <FaUser className="inline-flex items-center mr-2" /> {author} | {published_date}
                        </p>
                        <button 
                            onClick={handleShare} 
                            className="text-gray-400 hover:text-purple-400 inline-flex items-center transition-all duration-300"
                        >
                            <FaShareAlt className="mr-1" /> Share
                        </button>
                    </div>
                    <p className="mb-4 text-gray-400">
                        <FaUser className="inline-flex items-center mr-2" /> {reading_time}
                    </p>
                    <p className="text-lg text-gray-300 mb-6">{content}</p>
                </div>

                <div className="lg:w-1/3">
                    <SideBar />
                </div>
            </div>
        </div>
    );
};

export default SingleBlog;
