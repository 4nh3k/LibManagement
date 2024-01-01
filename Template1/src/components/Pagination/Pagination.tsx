import classNames from 'classnames';
import React from 'react';

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange
}: {
  totalPages: number;
  currentPage: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={i === currentPage ? 'active' : ''}>
          <button
            onClick={() => onPageChange(i)}
            className={classNames('hover:underline', {
              underline: i === currentPage
            })}
          >
            {i}
          </button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <ul className='font-medium space-x-2 mb-5 mt-0 flex items-center justify-center text-sm'>
      <li>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className='hover:underline'
        >
          &laquo; Previous
        </button>
      </li>
      {renderPageNumbers()}
      <li>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className='hover:underline'
        >
          Next &raquo;
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
