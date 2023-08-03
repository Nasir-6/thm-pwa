'use client';

import { useState, useEffect } from 'react';
import SalahBeginningBtn from '@/components/salah_beginning_modal/SalahBeginningBtn';
import dynamic from 'next/dynamic';
import UseLocationBtn from '@/components/UseLocationBtn';
import ShowMapBtn from '@/components/ShowMapBtn';
import '../Home.css';
import SearchBar from '@/components/SearchBar';
import Skeleton from '@/components/skeletons/Skeleton';
// eslint-disable-next-line import/no-relative-packages
import { MosqueDTO } from '../../../../back-end/src/db/models/mosques';
import MosqueResultsContainer from './MosqueResultsContainer';

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <Skeleton type="map" />,
});

type Props = {
  mosques: MosqueDTO[];
};

export default function FindNearestMosquePage({ mosques }: Props) {
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

  const controlPanel = (
    <div className="control-panel w-full py-2 px-3 flex flex-col items-center">
      <SearchBar mosques={mosques} />
      <div className="bottom-options flex w-full max-w-xl justify-between py-1 px-2">
        <UseLocationBtn />
        <ShowMapBtn isMapVisible={isMapVisible} setIsMapVisible={setIsMapVisible} />
      </div>
    </div>
  );

  return (
    <div className={`home-page-container flex ${isDesktopView ? 'flex-row' : 'flex-col items-center'} `}>
      {isDesktopView ? (
        <>
          <div className="flex-grow p-1 flex flex-col items-center">
            {controlPanel}
            <SalahBeginningBtn />
            <MosqueResultsContainer />
          </div>
          <div className={`map-div ${isMapVisible ? '' : 'map-div-hide'}`}>{isMapVisible && <Map mosques={mosques} />}</div>
        </>
      ) : (
        <>
          {controlPanel}
          <SalahBeginningBtn />
          <div className={`map-div ${isMapVisible ? '' : 'map-div-hide'}`}>{isMapVisible && <Map mosques={mosques} />}</div>
          <MosqueResultsContainer />
        </>
      )}
    </div>
  );
}
