import React from 'react';

const Pagination = ({ onPageChange, currentPage, blogs, pageSize }) => {
  const totalPages = Math.ceil(blogs.length / pageSize);

  const renderPaginationLinks = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
      <li key={pageNumber}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault(); // Prevent default anchor behavior
            onPageChange(pageNumber);
          }}
          className={`pagination-link px-4 py-2 rounded-md transition-all duration-300 ${
            pageNumber === currentPage
              ? 'bg-purple-600 text-white shadow-lg scale-105'
              : 'bg-gray-800 text-gray-300 hover:bg-purple-500 hover:text-white'
          }`}
          aria-current={pageNumber === currentPage ? 'page' : undefined}
        >
          {pageNumber}
        </a>
      </li>
    ));
  };

  return (
    <ul className="pagination-container flex items-center justify-center gap-6 my-8">
      <li>
        <button
          className={`pagination-button px-4 py-2 rounded-md text-white transition-all duration-300 ${
            currentPage === 1 ? 'bg-gray-600 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500'
          }`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous Page"
        >Prev</button>
      </li>
      <div className="pagination-links flex gap-1">{renderPaginationLinks()}</div>
      <li>
        <button
          className={`pagination-button px-4 py-2 rounded-md text-white transition-all duration-300 ${
            currentPage === totalPages ? 'bg-gray-600 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500'
          }`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
        >
          Next
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
