import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const BlogCards = ({ blogs, currentPage, selectedCategory, pageSize }) => {
    const filteredBlogs = blogs
        .filter((blog) => !selectedCategory || blog.category === selectedCategory)
        .slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handleClick = () => {
        window.scrollTo(0, 0); // Scroll to the top of the page
    };

    if (filteredBlogs.length === 0) {
        return <p className="text-center text-gray-400">No blogs available in this category.</p>;
    }

    return (
        <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6'>
            {filteredBlogs.map((blog) => (
                <Link 
                    to={`/blog/${blog.id}`} 
                    key={blog.id} 
                    onClick={handleClick}  
                    className={`bg-gray-800 border border-gray-600 rounded-lg shadow-lg transition-shadow duration-300 overflow-hidden transform ${filteredBlogs.length > 0 ? 'hover:shadow-xl hover:scale-105' : ''}`}
                    aria-label={`Read ${blog.title}`} // Accessibility feature
                >
                    <div className="relative">
                        <img 
                            src={blog.image} 
                            alt={blog.title} 
                            loading="lazy" // Lazy loading for performance
                            onError={(e) => { e.target.onerror = null; e.target.src = 'path/to/fallback-image.jpg'; }} // Fallback image
                            className='w-full h-32 object-cover transition-transform duration-300 hover:scale-105' 
                        />
                        <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-md">
                            {blog.category}
                        </div>
                    </div>
                    <div className='p-3'>
                        <h3 className='mt-2 mb-1 text-md font-semibold text-white hover:text-purple-400'>{blog.title}</h3>
                        <p className='mb-1 text-xs text-gray-400'>
                            <FaUser className='inline-flex items-center mr-1 text-purple-400' />
                            {blog.author}
                        </p>
                        <p className='text-xs text-gray-500'>Published: {blog.published_date}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default BlogCards;
