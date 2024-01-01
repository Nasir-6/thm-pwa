import React from 'react';
import { getAllJumuahTimes } from '@/lib/mosques';
import { MosqueJumuahTimes } from '../../../../back-end/src/db/models/jumuahTimes';
import JumuahByArea from './JumuahByArea';

const JumuahPage = async () => {
  // TODO: Read in all jumuah times and display them.
  // TODO: Have the ability to update rows in DB when changed all from this one page
  const jumuahTimes = await getAllJumuahTimes();
  const areas: { [area: string]: MosqueJumuahTimes[] } = {};
  jumuahTimes?.forEach((mosque) => {
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
    <div className="mx-auto text-center">
      <h1>Jumu'ah page</h1>
      <table className="jumuah-timetable m-4 shadow-sm overflow-hidden rounded">{jumuahByAreas}</table>
    </div>
  );
};

export default JumuahPage;
