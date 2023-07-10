import React from 'react';
import Fuse from 'fuse.js';
// eslint-disable-next-line import/no-relative-packages
import { MosqueDTO } from '../../../back-end/src/db/models/mosques';
import Link from 'next/link';

type Props = {
  queryResults: Fuse.FuseResult<MosqueDTO>[];
};

const QueryResultsDropdown = ({ queryResults }: Props) => {
  console.log('queryResults :>> ', queryResults);
  const results = queryResults.map((result) => (
    <div className="flex">
      <Link href={`https://www.towerhamletsmosques.co.uk/${result.item.urlSlug}`} className="p-4 w-full">
        <div className="flex justify-between">
          <h1>{result.item.name}</h1>
          <p className=" text-gray-400">{result.item.area}</p>
        </div>
        <p className="text-gray-500 text-sm">{result.item.address}</p>
      </Link>
    </div>
  ));
  return (
    queryResults.length !== 0 && (
      <div className="absolute mt-1 rounded-md bg-white divide-y shadow-md border w-full max-w-xl">{results}</div>
    )
  );
};

export default QueryResultsDropdown;
