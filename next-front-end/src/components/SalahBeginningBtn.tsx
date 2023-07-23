'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const SalahBeginningModal = dynamic(() => import('./SalahBeginningModal'), {
  loading: () => <p>Loading...</p>, // TODO: Update loading state
});

const SalahBeginningBtn = () => {
  const [isModalShown, setIsModalShown] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalShown(!isModalShown)}
        className="bg-transparent hover:bg-accent-600 text-accent-600 font-semibold hover:text-white py-2 px-16 border border-accent-600 hover:border-transparent rounded-full mb-3 mx-5 max-w-lg">
        Salah Beginning Times
      </button>
      {/* TODO: Use Lazy loading here! */}
      {isModalShown && <SalahBeginningModal setIsModalShown={setIsModalShown} />}
    </>
  );
};

export default SalahBeginningBtn;
