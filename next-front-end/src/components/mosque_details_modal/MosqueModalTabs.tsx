import React from 'react';
import './MosqueModalTabs.css';

type Props = {
  tabToShow: string;
  setTabToShow: React.Dispatch<React.SetStateAction<string>>;
};

const MosqueModalTabs = ({ tabToShow, setTabToShow }: Props) => (
  <div className="flex justify-around font-semibold text-gray-400 hover:text-primary-600">
    <button
      className={`hover:text-primary-600 ${tabToShow === 'Salah Times' && 'tab-active'}`}
      type="button"
      onClick={() => setTabToShow('Salah Times')}>
      Salah Times
    </button>
    <button
      type="button"
      className={`hover:text-primary-600 ${tabToShow === "Jumu'ah Times" && 'tab-active'}`}
      onClick={() => setTabToShow("Jumu'ah Times")}>
      Jumu'ah Times
    </button>
  </div>
);

export default MosqueModalTabs;
