'use client';

import { useState } from 'react';
import { FaSearchLocation } from 'react-icons/fa';
import dynamic from 'next/dynamic';
// eslint-disable-next-line import/no-relative-packages
import { MosqueDTO } from '../../../back-end/src/db/models/mosques';

const QueryResultsDropdown = dynamic(() => import('./QueryResultsDropdown'), {
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

  return (
    // TODO: Add search functionality here - Do it for mosques only - for home page
    <div className="relative w-full max-w-xl">
      <div className="searchBox relative border-2 rounded-full flex gap-1 items-center w-full max-w-xl">
        <FaSearchLocation className=" absolute left-2 text-slate-400" />
        <input
          type="text"
          name="location"
          id="location"
          placeholder="Search by Mosque name"
          className=" pl-8 py-2 w-full rounded-full"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {searchQuery.trim().length !== 0 && <QueryResultsDropdown mosques={mosques} searchQuery={searchQuery} />}
    </div>
  );
};

export default SearchBar;
