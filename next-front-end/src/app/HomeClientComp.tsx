'use client';

import ControlPanel from '@/components/ControlPanel';
import Skeleton from '@/components/skeletons/Skeleton';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import './Home.css';
import SalahBeginningBtn from '@/components/salah_beginning_modal/SalahBeginningBtn';
// eslint-disable-next-line import/no-relative-packages
import { MosqueDTO } from '../../../back-end/src/db/models/mosques';

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <Skeleton type="map" />,
});

interface Props {
  mosques: MosqueDTO[];
  children: React.ReactNode;
}

export default function HomeClientComp({ mosques, children: serverRenderedMosqueList }: Props) {
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
    <div className={`home-page-container flex ${isDesktopView ? 'flex-row' : 'flex-col items-center'} `}>
      {isDesktopView ? (
        <>
          <div className="flex-grow p-1 flex flex-col items-center">
            <ControlPanel mosques={mosques} isMapVisible={isMapVisible} setIsMapVisible={setIsMapVisible} />
            <SalahBeginningBtn />
            {serverRenderedMosqueList}
            {/* <MosqueResultsContainer /> */}
          </div>
          <div className={`map-div ${isMapVisible ? '' : 'map-div-hide'}`}>{isMapVisible && <Map mosques={mosques} />}</div>
        </>
      ) : (
        <>
          <ControlPanel mosques={mosques} isMapVisible={isMapVisible} setIsMapVisible={setIsMapVisible} />
          <SalahBeginningBtn />
          <div className={`map-div ${isMapVisible ? '' : 'map-div-hide'}`}>{isMapVisible && <Map mosques={mosques} />}</div>
          {serverRenderedMosqueList}
          {/* <MosqueResultsContainer /> */}
        </>
      )}
    </div>
  );
}
