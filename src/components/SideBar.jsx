import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';

const SideBar = () => {
    const [popularBlogs, setPopularBlogs] = useState([]);

    useEffect(() => {
        fetch("/blogsData.json") // Ensure this path is correct and accessible
            .then(res => res.json())
            .then(data => setPopularBlogs(data.slice(0, 15)))
            .catch(error => console.error('Error fetching blog data:', error));
    }, []);

    return (
        <div className='sidebar p-4 bg-gray-800 shadow-md rounded-lg backdrop-blur-md bg-opacity-50 border border-gray-600'>
            {/* Latest Blogs Section */}
            <div className='latest-blogs mb-8'>
                <h3 className='text-xl font-semibold mb-4 text-purple-400'>Latest Blogs</h3>
                <div>
                    {popularBlogs.slice(0, 5).map(blog => (
                        <div key={blog.id} className='blog-item my-4 border-b border-gray-600 pb-3'>
                            <h4 className='font-medium mb-1 text-white'>{blog.title}</h4>
                            <Link to={`/blog/${blog.id}`} className='text-base text-gray-300 hover:text-purple-400 inline-flex items-center'>
                                Read More <FaArrowRight className='mt-1 ml-2' />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Popular Blogs Section */}
            <div className='popular-blogs'>
                <h3 className='text-xl font-semibold mb-4 text-purple-400'>Popular Blogs</h3>
                <div>
                    {popularBlogs.slice(5, 9).map(blog => (
                        <div key={blog.id} className='blog-item my-4 border-b border-gray-600 pb-3'>
                            <h4 className='font-medium mb-1 text-white'>{blog.title}</h4>
                            <Link to={`/blogs/${blog.id}`} className='text-base text-gray-300 hover:text-purple-400 inline-flex items-center'>
                                Read More <FaArrowRight className='mt-1 ml-2' />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SideBar;
