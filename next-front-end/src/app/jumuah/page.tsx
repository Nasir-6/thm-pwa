import React from 'react';
import { getAllJumuahTimes } from '@/lib/mosques';
import JumuahTable from './JumuahTable';

const JumuahPage = async () => {
  // TODO: Read in all jumuah times and display them.
  // TODO: Have the ability to update rows in DB when changed all from this one page
  const jumuahTimes = await getAllJumuahTimes();

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-xl font-semibold">Jumu'ah Times</h1>
      <p className=" max-w-prose">
        *Please note the times stated are Khutbah times. If you notice any changes please contact us at:{' '}
        <a className=" font-medium" href="mailto:towerhamletsmosques@gmail.com">
          towerhamletsmosques@gmail.com
        </a>
      </p>
      {jumuahTimes && <JumuahTable jumuahTimes={jumuahTimes} />}
    </div>
  );
};

export default JumuahPage;
