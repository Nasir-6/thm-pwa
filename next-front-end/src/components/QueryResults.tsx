import React, { useEffect, useRef, useState } from 'react';
import Fuse from 'fuse.js';
import Link from 'next/link';
// eslint-disable-next-line import/no-relative-packages
import { MosqueDTO } from '../../../back-end/src/db/models/mosques';
import FemaleIcon from './FemaleIcon';
import WheelchairIcon from './WheelchairIcon';

type Props = {
  mosques: MosqueDTO[];
  searchQuery: string;
  isFocused: boolean;
};

const fuseOptions = {
  // isCaseSensitive: false,
  // includeScore: false,
  // shouldSort: true,
  includeMatches: true,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  threshold: 0.3,
  // distance: 100,
  // useExtendedSearch: false,
  ignoreLocation: true,
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
  keys: ['name', 'area', 'address'],
};

const QueryResults = ({ mosques, searchQuery, isFocused }: Props) => {
  const fuse = new Fuse(mosques, fuseOptions);
  const selectedMosque = useRef(-1);

  const queryResults = fuse.search(searchQuery).slice(0, 5);
  const queryResultsRef = useRef(queryResults);

  const handleKeyDown = (event) => {
    if (!isFocused) {
      selectedMosque.current = -1;
    } else if (event.key === 'ArrowUp' && selectedMosque.current >= 0) {
      selectedMosque.current -= 1;
    } else if (event.key === 'ArrowDown' && selectedMosque.current < queryResultsRef.current.length) {
      selectedMosque.current += 1;
    } else if (event.key === 'Enter' && selectedMosque.current >= 0) {
      window.open(`https://www.towerhamletsmosques.co.uk/${queryResultsRef.current[selectedMosque.current].item.urlSlug}`);
      console.log('queryResults[selectedMosque].item.urlSlug :>> ', queryResultsRef.current[selectedMosque.current].item.urlSlug);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (queryResults !== undefined) {
      queryResultsRef.current = queryResults;
    }
  }, [queryResults]);

  const queryResultsElements = queryResults.map((result) => (
    <div key={result.item.name} className="flex z-20 border-y border-x hover:border-accent-400">
      <Link href={`https://www.towerhamletsmosques.co.uk/${result.item.urlSlug}`} className="p-4 w-full" target="_blank">
        <div className="flex justify-between">
          <div className="flex gap-1">
            <h1>{result.item.name}</h1>
            {result.item.hasFemaleFacilities && <FemaleIcon />}
            {result.item.hasWheelchairAccess && <WheelchairIcon />}
          </div>
          <p className=" text-gray-400">{result.item.area}</p>
        </div>
        <p className="text-gray-500 text-sm">{result.item.address}</p>
      </Link>
    </div>
  ));
  return (
    <div className="absolute mt-1 rounded-md bg-white shadow-md w-full max-w-xl">
      {queryResults.length !== 0 ? queryResultsElements : <h1 className="p-4">No results found</h1>}
    </div>
  );
};

export default QueryResults;
