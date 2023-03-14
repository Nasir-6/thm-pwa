import React from 'react';
import ReactDOM from 'react-dom';

interface SalahBeginningModalProps {
  setIsModalShown: React.Dispatch<React.SetStateAction<boolean>>;
}

const SalahBeginningModal: React.FC<SalahBeginningModalProps> = ({ setIsModalShown }) => {
  setIsModalShown(true);
  //   TODO: Use ReactDom.createPortal instead - https://www.youtube.com/watch?v=LyLa7dU5tp8&ab_channel=WebDevSimplified
  return ReactDOM.createPortal(
    <div
      onClick={() => setIsModalShown(false)}
      aria-hidden="true"
      role="button"
      className="dark-overlay bg-slate-900 bg-opacity-25 fixed w-full h-full top-0 z-20 flex justify-center items-center overflow-hidden">
      <div className="salah-beginning-modal absolute bg-white max-w-lg w-full">
        <div className="header flex">
          <h2 className="">Salah Beginning Times</h2>
          <p>X</p>
        </div>
        <div className="current-info">
          <div className="next-salah">
            <p>Icon</p>
            <p>Time Now</p>
            <p>Time to Next Salaah</p>
          </div>
          <div className="date-picker">Date Picker Here</div>
        </div>

        <div className="fajr">
          <p>Icon</p>
          <p>Fajr</p>
          <p>Time</p>
        </div>
        <div className="fajr">
          <p>Icon</p>
          <p>Fajr</p>
          <p>Time</p>
        </div>
        <div className="fajr">
          <p>Icon</p>
          <p>Fajr</p>
          <p>Time</p>
        </div>
        <div className="fajr">
          <p>Icon</p>
          <p>Fajr</p>
          <p>Time</p>
        </div>
        <div className="fajr">
          <p>Icon</p>
          <p>Fajr</p>
          <p>Time</p>
        </div>
        <div className="fajr">
          <p>Icon</p>
          <p>Fajr</p>
          <p>Time</p>
        </div>
        <div className="fajr">
          <p>Icon</p>
          <p>Fajr</p>
          <p>Time</p>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SalahBeginningModal;
