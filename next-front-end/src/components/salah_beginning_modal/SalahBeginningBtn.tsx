'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const SalahBeginningModal = dynamic(() => import('./SalahBeginningModal'));

const SalahBeginningBtn = () => {
  const [isModalShown, setIsModalShown] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalShown(!isModalShown)}
        className="hover:bg-gradient-to-r from-accent-600 to-accent-300 text-transparent bg-clip-text hover:bg-clip-border bg-gradient-to-r font-semibold hover:text-white py-2 px-16 border border-accent-600 hover:border-white rounded-full mb-3 mx-5 max-w-lg">
        Salah Beginning Times
      </button>
      {isModalShown && <SalahBeginningModal setIsModalShown={setIsModalShown} />}
    </>
  );
};

export default SalahBeginningBtn;
