'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
// eslint-disable-next-line import/no-relative-packages
import { MosqueDTO } from '../../../../back-end/src/db/models/mosques';

const MosqueDetailsModal = dynamic(() => import('./MosqueDetailsModal'));

type Props = {
  mosque: MosqueDTO;
};

const MosqueDetailsBtn = ({ mosque }: Props) => {
  const [isModalShown, setIsModalShown] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalShown(!isModalShown)}
        className="text-gradient-gold view-details-btn font-semibold text-sm">
        View Details
      </button>
      {isModalShown && <MosqueDetailsModal mosque={mosque} />}
    </>
  );
};

export default MosqueDetailsBtn;
