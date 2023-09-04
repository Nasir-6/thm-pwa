'use client';

import LeftChevronIcon from '@/icons/salah_times_icons/LeftChevronIcon';
import RightChevronIcon from '@/icons/salah_times_icons/RightChevronIcon';
import { getTimesForAMosqueOnAGivenDate } from '@/lib/mosques';
import { useQuery } from '@tanstack/react-query';
import { addDays } from 'date-fns';
// import { subDays } from 'date-fns';
import subDays from 'date-fns/subDays';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
// eslint-disable-next-line import/no-relative-packages
import { MosqueDTO } from '../../../../back-end/src/db/models/mosques';
import DatePickerBtn from '../salah_beginning_modal/DatePickerBtn';
import MosqueJumuahTimes from './MosqueJumuahTimes';
import MosqueModalHeader from './MosqueModalHeader';
import MosqueModalTabs from './MosqueModalTabs';
import MosqueSalahTimes from './MosqueSalahTimes';

type Props = {
  mosque: MosqueDTO;
  setIsModalShown: React.Dispatch<React.SetStateAction<boolean>>;
};

const MosqueDetailsModal = ({ mosque, setIsModalShown }: Props) => {
  const [tabToShow, setTabToShow] = useState('Salah Times');

  return createPortal(
    <div className="flex justify-center items-center">
      <div
        onClick={() => setIsModalShown(false)}
        aria-hidden="true"
        role="button"
        className="dark-overlay bg-slate-900 bg-opacity-25 fixed w-full h-full top-0 z-20 flex justify-center items-center"
      />
      <div className="salah-beginning-modal fixed top-4 bg-white max-w-lg w-11/12 z-30 rounded-t-md">
        <MosqueModalHeader mosque={mosque} setIsModalShown={setIsModalShown} />
        <MosqueModalTabs setTabToShow={setTabToShow} />
        {tabToShow === 'Salah Times' && <MosqueSalahTimes />}
        {tabToShow === "Jumu'ah Times" && <MosqueJumuahTimes />}
      </div>
    </div>,
    document.body
  );
};

export default MosqueDetailsModal;
