import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={i === currentPage ? 'active' : ''}>
          <button onClick={() => onPageChange(i)}>{i}</button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <ul className='text-xl font-medium space-x-2 mb-5 mt-0 flex items-center justify-center'>
      <li>
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          &laquo; Previous
        </button>
      </li>
      {renderPageNumbers()}
      <li>
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next &raquo;
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
