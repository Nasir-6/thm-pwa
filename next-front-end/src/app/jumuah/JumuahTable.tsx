import React from 'react';
import { MosqueJumuahTimes } from '../../../../back-end/src/db/models/jumuahTimes';
import JumuahByArea from './JumuahByArea';

type Props = {
  jumuahTimes: MosqueJumuahTimes[];
};

const JumuahTable = ({ jumuahTimes }: Props) => {
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
  return <table className="jumuah-timetable text-sm my-4 shadow-sm overflow-hidden rounded">{jumuahByAreas}</table>;
};

export default JumuahTable;
