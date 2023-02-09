import React, { useEffect } from 'react';

interface PaginationProps {
  mosquesPerPage: number;
  totalMosques: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({ mosquesPerPage, totalMosques, currentPage, setCurrentPage }) => {
  const pageNumbers = [];

  const maxPageNum = Math.ceil(totalMosques / mosquesPerPage);
  for (let i = 1; i <= maxPageNum; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    if (currentPage > maxPageNum) setCurrentPage(maxPageNum);
  }, [mosquesPerPage, totalMosques]);

  return (
    <div className="pagination flex justify-center font-semibold border-t w-full max-w-xl py-2">
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
