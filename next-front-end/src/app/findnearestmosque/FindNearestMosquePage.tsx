'use client';

import { useState, useEffect } from 'react';
// import { getAllMosques } from '@/lib/mosques';
import SalahBeginningBtn from '@/components/salah_beginning_modal/SalahBeginningBtn';
import Map from '@/components/Map';
import UseLocationBtn from '@/components/UseLocationBtn';
import ShowMapBtn from '@/components/ShowMapBtn';
import '../Home.css';
import { useQuery } from '@tanstack/react-query';
import { getAllMosques } from '@/lib/mosques';
import SearchBar from '@/components/SearchBar';

export default function FindNearestMosquePage() {
  // Abstract the HomeClientComp so can fetch mosques on server
  // TODO: setup useQuery with hydration! - so can use the same getAllMosques list when page is changed!!
  // const mosques = await getAllMosques();

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

  const { data: mosques } = useQuery({
    queryKey: ['mosques'],
    queryFn: getAllMosques,
  });

  if (!mosques) return null;

  const mosqueNamesList = mosques?.map((mosque) => <h2>{mosque.name}</h2>);

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
            {mosqueNamesList}
            {/* <MosqueResultsContainer /> */}
          </div>
          <div className={`map-div ${isMapVisible ? '' : 'map-div-hide'}`}>{isMapVisible && <Map mosques={mosques} />}</div>
        </>
      ) : (
        <>
          {controlPanel}
          <SalahBeginningBtn />
          <div className={`map-div ${isMapVisible ? '' : 'map-div-hide'}`}>{isMapVisible && <Map mosques={mosques} />}</div>
          {mosqueNamesList}
          {/* <MosqueResultsContainer /> */}
        </>
      )}
    </div>
  );
}
