'use client';

import ControlPanel from '@/components/ControlPanel';
import Skeleton from '@/components/skeletons/Skeleton';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import './Home.css';

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <Skeleton type="map" />,
});

export default function Home() {
  const [isMapVisible, setIsMapVisible] = useState(false);
  const screenBreakPoint = 1024;
  const [isDesktopView, setIsDesktopView] = useState(false);

  useEffect(() => {
    // Can only access window here in useEffect as this is run on client side on mount
    setIsDesktopView(window.innerWidth > screenBreakPoint);
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    mediaQuery.addEventListener('change', () => setIsDesktopView(mediaQuery.matches));
    // this is the cleanup function to remove the listener
    return () => mediaQuery.removeEventListener('change', () => setIsDesktopView(mediaQuery.matches));
  }, []);

  return (
    <div className={`home-page-container flex ${isDesktopView ? 'flex-row' : 'flex-col'}`}>
      {isDesktopView ? (
        <>
          <div className="flex-grow min-w-max p-1 flex flex-col items-center">
            <ControlPanel isMapVisible={isMapVisible} setIsMapVisible={setIsMapVisible} />
            <h1>MosqueResultsContainer would go here</h1>
            {/* <MosqueResultsContainer /> */}
          </div>
          <div className={`map-div ${isMapVisible ? '' : 'map-div-hide'}`}>{isMapVisible && <Map isMapVisible={isMapVisible} />}</div>
        </>
      ) : (
        <>
          <ControlPanel isMapVisible={isMapVisible} setIsMapVisible={setIsMapVisible} />
          <div className={`map-div ${isMapVisible ? '' : 'map-div-hide'}`}>{isMapVisible && <Map isMapVisible={isMapVisible} />}</div>
          <h1>MosqueResultsContainer would go here</h1>
          {/* <MosqueResultsContainer /> */}
        </>
      )}
    </div>
  );
}
