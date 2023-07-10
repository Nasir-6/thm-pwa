'use client';

import { useState } from 'react';
import { FaSearchLocation } from 'react-icons/fa';
// eslint-disable-next-line import/no-relative-packages
import { MosqueDTO } from '../../../back-end/src/db/models/mosques';

type Props = {
  mosques: MosqueDTO[];
};

const SearchBar = ({ mosques }: Props) => {
  const [input, setInput] = useState('');
  console.log('input :>> ', input);
  console.log('mosques', mosques);
  return (
    // TODO: Add search functionality here - Do it for mosques only - for home page
    <div className="searchBox relative border-2 rounded-full flex gap-1 items-center w-full max-w-xl">
      <FaSearchLocation className=" absolute left-2 text-slate-400" />
      <input
        type="text"
        name="location"
        id="location"
        placeholder="Search by Mosque name"
        className=" pl-8 py-2 w-full rounded-full"
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
