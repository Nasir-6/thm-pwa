import React from 'react';

interface PaginationProps {
  mosquesPerPage: number;
  totalMosques: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({ mosquesPerPage, totalMosques, currentPage, setCurrentPage }) => {
  // TODO: Deal with edge case when say go to last page (when mosquesPerPage is 5 but then change to 10 - reducing pages to half - but now current page doesn't exist)
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalMosques / mosquesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination flex">
      {pageNumbers.map((num) => (
        <button
          key={num}
          type="button"
          onClick={() => setCurrentPage(num)}
          className={`pagination-btn font-semibold py-1 px-2 rounded ${num === currentPage ? 'bg-primary-600 text-white' : ''}`}>
          {num}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
