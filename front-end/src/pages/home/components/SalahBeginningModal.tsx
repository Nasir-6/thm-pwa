import React from 'react';

interface SalahBeginningModalProps {
  setIsModalShown: React.Dispatch<React.SetStateAction<boolean>>;
}

const SalahBeginningModal: React.FC<SalahBeginningModalProps> = ({ setIsModalShown }) => {
  setIsModalShown(true);
  return (
    <div
      onClick={() => setIsModalShown(false)}
      aria-hidden="true"
      role="button"
      className="dark-overlay bg-slate-900 bg-opacity-25 absolute w-full h-full top-0 z-20 flex justify-center items-center">
      <div className="salah-beginning-modal absolute bg-white">
        <h2>Salah Beginning Times</h2>
      </div>
    </div>
  );
};

export default SalahBeginningModal;
