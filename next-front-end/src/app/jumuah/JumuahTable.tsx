'use client';

import Fuse from 'fuse.js';
import React, { useState } from 'react';
import { FaSearchLocation } from 'react-icons/fa';
// eslint-disable-next-line import/no-relative-packages
import { MosqueJumuahTimes } from '../../../../back-end/src/db/models/jumuahTimes';
import JumuahByArea from './JumuahByArea';

type Props = {
  jumuahTimes: MosqueJumuahTimes[];
};

const JumuahTable = ({ jumuahTimes }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const fuseOptions = {
    threshold: 0.3,
    ignoreLocation: true,
    keys: ['mosqueName', 'area'],
  };
  const fuse = new Fuse(jumuahTimes, fuseOptions);
  const queryResults = fuse.search(searchQuery).map((res) => res.item);
  const areas: { [area: string]: MosqueJumuahTimes[] } = {};
  const jumuahTimesToShow = searchQuery ? queryResults : jumuahTimes;
  jumuahTimesToShow?.forEach((mosque) => {
    if (mosque.area in areas) {
      areas[mosque.area].push(mosque);
    } else {
      areas[mosque.area] = [mosque];
    }
  });

  const jumuahByAreas = Object.keys(areas)
    .sort()
    .map((area) => <JumuahByArea area={area} mosques={areas[area]} />);
  return (
    <>
      <div className="searchBox relative border-2 rounded-full flex gap-1 items-center w-full max-w-xl">
        <FaSearchLocation className="absolute left-2 text-slate-400" />
        <input
          type="text"
          name="location"
          id="location"
          placeholder="Search by Mosque or Area"
          className=" pl-8 py-2 w-full rounded-full"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <table className="jumuah-timetable text-sm my-4 shadow-sm overflow-hidden rounded w-full max-w-xl">{jumuahByAreas}</table>
      {searchQuery && queryResults.length === 0 && <h1 className="p-4">No results found</h1>}
    </>
  );
};

export default JumuahTable;
