import React from 'react';
import Fuse from 'fuse.js';
import Link from 'next/link';
// eslint-disable-next-line import/no-relative-packages
import { MosqueDTO } from '../../../back-end/src/db/models/mosques';

type Props = {
  searchQuery: string;
  queryResults: Fuse.FuseResult<MosqueDTO>[];
};

const QueryResultsDropdown = ({ searchQuery, queryResults }: Props) => {
  console.log('queryResults :>> ', queryResults);
  const results = queryResults.map((result) => (
    <div className="flex">
      <Link href={`https://www.towerhamletsmosques.co.uk/${result.item.urlSlug}`} className="p-4 w-full" target="_blank">
        <div className="flex justify-between">
          <h1>{result.item.name}</h1>
          <p className=" text-gray-400">{result.item.area}</p>
        </div>
        <p className="text-gray-500 text-sm">{result.item.address}</p>
      </Link>
    </div>
  ));
  return searchQuery.trim().length !== 0 ? (
    <div className="absolute mt-1 rounded-md bg-white divide-y shadow-md border w-full max-w-xl">
      {queryResults.length !== 0 ? results : <h1 className="p-4">No results found</h1>}
    </div>
  ) : null;
};

export default QueryResultsDropdown;
