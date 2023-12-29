import React from 'react';
import { getAllJumuahTimes } from '@/lib/mosques';

const JumuahPage = async () => {
  // TODO: Read in all jumuah times and display them.
  // TODO: Have the ability to update rows in DB when changed all from this one page
  const jumuahTimes = await getAllJumuahTimes();
  const jumuahMosques = jumuahTimes?.map((mosque) => <p>{mosque.mosqueName}</p>);
  console.log(jumuahTimes);
  return (
    <div className="text-center">
      <h1>Jumu'ah page</h1>
      {jumuahMosques}
    </div>
  );
};

export default JumuahPage;
