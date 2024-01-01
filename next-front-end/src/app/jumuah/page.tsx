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
    <div className="flex flex-col items-center p-4">
      <h1 className="text-xl font-semibold">Jumu'ah Times</h1>
      <p className=" max-w-prose">
        *Please note the times stated are Khutbah times. If you notice any changes please contact us at:{' '}
        <a className=" font-medium" href="mailto:towerhamletsmosques@gmail.com">
          towerhamletsmosques@gmail.com
        </a>
      </p>
      <table className="jumuah-timetable text-sm my-4 shadow-sm overflow-hidden rounded">{jumuahByAreas}</table>
    </div>
  );
};

export default JumuahPage;
