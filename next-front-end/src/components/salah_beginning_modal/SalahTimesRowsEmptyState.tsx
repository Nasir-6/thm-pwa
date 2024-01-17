import React from 'react';

type Props = {
  isSixRows: boolean;
};
const SalahTimesRowsEmptyState = ({ isSixRows = false }: Props) => (
  <div className={`${isSixRows ? 'h-[455px]' : 'h-[325px]'} flex flex-col justify-center items-center border-t`}>
    <div className="w-24 fill-gray-400">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 4a8 8 0 1 0 0 16 1 1 0 1 1 0 2 10 10 0 1 1 10-10 1 1 0 1 1-2 0 8 8 0 0 0-8-8Zm0 1c.6 0 1 .4 1 1v5.6l.7.7a1 1 0 0 1-1.4 1.4l-1-1a1 1 0 0 1-.3-.7V6c0-.6.4-1 1-1Zm4.7 10.3a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 0 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L20.4 19l2.3-2.3a1 1 0 0 0-1.4-1.4L19 17.6l-2.3-2.3Z" />
      </svg>
    </div>
    <h2 className="font-bold text-gray-500 pt-2">No times available for this date</h2>
    <p className="text-sm font-light">Please choose another date.</p>
  </div>
);

export default SalahTimesRowsEmptyState;
