'use client';

import ControlPanel from '@/components/ControlPanel';
import React, { useState } from 'react';

export default function Home() {
  const [isMapVisible, setisMapVisible] = useState(false);
  return (
    <main className="flex">
      <ControlPanel isMapVisible={isMapVisible} setIsMapVisible={setisMapVisible} />
    </main>
  );
}
