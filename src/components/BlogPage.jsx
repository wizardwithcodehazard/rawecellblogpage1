import React, { useEffect, useState, useMemo } from 'react';
import BlogCards from './BlogCards';
import Pagination from './Pagination';
import CategorySelection from './CategorySelection';
import SideBar from './SideBar';

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12; // blogs per page
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            setError(null); // Reset error state before fetching

            let url = `blogsData.json?page=${currentPage}&limit=${pageSize}`;

            // Filter by category if selected
            if (selectedCategory) {
                url += `&category=${selectedCategory}`;
            }

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBlogs(data);
            } catch (error) {
                console.error('Error fetching blog data:', error);
                setError('Could not fetch blog data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [currentPage, selectedCategory]);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handle category change
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1); // Reset to the first page on category change
        setActiveCategory(category);
    };

    // Handle search input change
    const handleSearchChange = (term) => {
        setSearchTerm(term);
        setCurrentPage(1); // Reset to first page on search
    };

    // Filter blogs based on search term and selected category
    const filteredBlogs = useMemo(() => {
        return blogs.filter(blog => {
            const matchesCategory = !selectedCategory || blog.category === selectedCategory;
            const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [blogs, selectedCategory, searchTerm]);

    return (
        <div className="container mx-auto p-6">
            {/* Category and Search Section */}
            <div className="mb-6 flex flex-col md:flex-row items-center justify-between">
                <CategorySelection 
                    onSelectCategory={handleCategoryChange} 
                    activeCategory={activeCategory} 
                    onSearch={handleSearchChange} 
                />
            </div>

            {/* Blog Cards and Sidebar */}
            <div className="flex flex-col lg:flex-row gap-12">
                <div className="flex-grow lg:w-3/4">
                    {loading ? (
                        <p className="text-center text-gray-500">Loading blogs...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : (
                        <BlogCards 
                            blogs={filteredBlogs} 
                            currentPage={currentPage} 
                            pageSize={pageSize} 
                        />
                    )}
                </div>

                {/* Sidebar Component */}
                <div className="hidden lg:block lg:w-1/4 lg:ml-4">
                    <SideBar />
                </div>
            </div>

            {/* Pagination Section */}
            <div className="mt-8 mb-4">
                <Pagination  
                    onPageChange={handlePageChange} 
                    currentPage={currentPage} 
                    blogs={filteredBlogs} 
                    pageSize={pageSize} 
                />
            </div>
        </div>
    );
};

export default BlogPage;
