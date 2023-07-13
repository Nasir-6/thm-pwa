'use client';

import { useEffect, useRef, useState } from 'react';
import { FaSearchLocation } from 'react-icons/fa';
import dynamic from 'next/dynamic';
// eslint-disable-next-line import/no-relative-packages
import { MosqueDTO } from '../../../back-end/src/db/models/mosques';

const QueryResults = dynamic(() => import('./QueryResults'), {
  loading: () => (
    <div className="absolute mt-1 rounded-md bg-white divide-y shadow-md border w-full max-w-xl">
      <h1 className="p-4">Loading...</h1>
    </div>
  ),
});

type Props = {
  mosques: MosqueDTO[];
};

const SearchBar = ({ mosques }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // onClick event to replace onBlur which didn't take into account QueryResults as that was using position:absolute
  // https://stackoverflow.com/questions/71529999/how-to-prevent-child-with-position-absolute-from-triggering-onblur-event-of
  const inputAndResultsContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const focusHandler = (event: { target: any }) => {
      if (inputAndResultsContainer.current === null) return;
      if (!inputAndResultsContainer.current.contains(event.target)) setIsFocused(false);
    };
    document.addEventListener('click', focusHandler);
    return () => {
      document.removeEventListener('click', focusHandler);
    };
  }, []);

  // Code for handling ability to use keyboard for choosing queryResults
  const [selectedMosqueIndex, setSelectedMosqueIndex] = useState(-1);
  // Used queryResultsDiv so can access the number of results without requiring fuse being imported here, plus can access anchor tag and redirect to link
  const queryResultsDiv = useRef<HTMLDivElement>(null);
  const handleKeyDown = (event: { key: string }) => {
    if (!isFocused || queryResultsDiv.current === null) {
      setSelectedMosqueIndex(-1);
    } else if (event.key === 'ArrowUp' && selectedMosqueIndex >= 0) {
      setSelectedMosqueIndex((prev) => prev - 1);
    } else if (event.key === 'ArrowDown' && selectedMosqueIndex < queryResultsDiv.current.children.length - 1) {
      setSelectedMosqueIndex((prev) => prev + 1);
    } else if (event.key === 'Enter' && selectedMosqueIndex >= 0) {
      const aTag = queryResultsDiv.current.children[selectedMosqueIndex].children[0];
      const aTagHref = aTag.getAttribute('href');
      if (aTagHref !== null) window.open(aTagHref);
    }
  };

  return (
    <div className="relative w-full max-w-xl" ref={inputAndResultsContainer}>
      <div className="searchBox relative border-2 rounded-full flex gap-1 items-center w-full max-w-xl">
        <FaSearchLocation className="absolute left-2 text-slate-400" />
        <input
          type="text"
          name="location"
          id="location"
          placeholder="Search by Mosque, area or address"
          className=" pl-8 py-2 w-full rounded-full"
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {searchQuery.trim().length !== 0 && isFocused && (
        <div className="absolute mt-1 rounded-md bg-white shadow-md w-full max-w-xl" ref={queryResultsDiv}>
          <QueryResults mosques={mosques} searchQuery={searchQuery} selectedMosqueIndex={selectedMosqueIndex} />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
