import React from 'react';

type Props = {
  tabToShow: string;
  setTabToShow: React.Dispatch<React.SetStateAction<string>>;
};

const MosqueModalTabs = ({ tabToShow, setTabToShow }: Props) => (
  <div className="flex justify-around">
    <button className={tabToShow === 'Salah Times' ? 'font-bold' : ''} type="button" onClick={() => setTabToShow('Salah Times')}>
      Salah Times
    </button>
    <button type="button" className={tabToShow === "Jumu'ah Times" ? 'font-bold' : ''} onClick={() => setTabToShow("Jumu'ah Times")}>
      Jumu'ah Times
    </button>
  </div>
);

export default MosqueModalTabs;
