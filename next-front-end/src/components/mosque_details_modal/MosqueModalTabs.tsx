import React from 'react';

// type Props = {};

const MosqueModalTabs = () => (
  <div className="flex justify-around">
    <button type="button" onClick={() => console.log('Salah Times')}>
      Salah Times
    </button>
    <button type="button" onClick={() => console.log("Jumu'ah Times")}>
      Jumu'ah Times
    </button>
  </div>
);

export default MosqueModalTabs;
