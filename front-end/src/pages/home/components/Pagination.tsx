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

  const maxPageNum = Math.ceil(totalMosques / mosquesPerPage);
  for (let i = 1; i <= maxPageNum; i++) {
    pageNumbers.push(i);
  }

  //   TODO: Add left and right buttons
  return (
    <div className="pagination flex font-semibold">
      <button
        type="button"
        onClick={() => {
          if (currentPage !== 1) setCurrentPage(currentPage - 1);
        }}
        className="pagination-btn py-1 px-2 rounded">
        {'<'}
      </button>
      {pageNumbers.map((num) => (
        <button
          key={num}
          type="button"
          onClick={() => setCurrentPage(num)}
          className={`pagination-btn py-1 px-2 rounded ${num === currentPage ? 'bg-primary-600 text-white' : ''}`}>
          {num}
        </button>
      ))}
      <button
        type="button"
        onClick={() => {
          if (currentPage !== maxPageNum) setCurrentPage(currentPage + 1);
        }}
        className="pagination-btn py-1 px-2 rounded">
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;
