import React from 'react';

type Props = {
  setTabToShow: React.Dispatch<React.SetStateAction<string>>;
};

const MosqueModalTabs = ({ setTabToShow }: Props) => (
  <div className="flex justify-around">
    <button type="button" onClick={() => setTabToShow('Salah Times')}>
      Salah Times
    </button>
    <button type="button" onClick={() => setTabToShow("Jumu'ah Times")}>
      Jumu'ah Times
    </button>
  </div>
);

export default MosqueModalTabs;
