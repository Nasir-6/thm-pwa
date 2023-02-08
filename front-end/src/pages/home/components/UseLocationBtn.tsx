/* eslint-disable no-nested-ternary */
/* eslint-disable no-alert */
import { useEffect, useState } from 'react';
import { MdOutlineMyLocation } from 'react-icons/md';
import useStore from '../../../stores/zustand';

const UseLocationBtn = () => {
  const [isUsingLocation, setIsUsingLocation] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const setUserLocation = useStore((state) => state.setUserLocation);

  const onSuccess: PositionCallback = (position) => {
    setIsLocating(false);
    setUserLocation({
      name: 'You',
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  };

  const onError: PositionErrorCallback = () => {
    setIsLocating(false);
    alert("Unable to retrieve your location. Please give the site access to your location if you haven't in order to use this feature.");
    setIsUsingLocation(false);
  };

  useEffect(() => {
    if (!isUsingLocation) return;
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      setIsUsingLocation(false);
    } else {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 5 * 60 * 1000 }); // cache location for 5 mins - reduce neeed to geolocate
    }
  }, [isUsingLocation]);

  return (
    <button
      type="button"
      onClick={() => setIsUsingLocation(!isUsingLocation)}
      className={`use-location flex gap-1 items-center font-semibold ${isUsingLocation ? 'text-primary-500' : 'text-accent-700'} ${
        isUsingLocation ? 'hover:text-primary-700' : 'hover:text-accent-800'
      }`}>
      <MdOutlineMyLocation className="" />
      {isLocating ? 'Locating...' : isUsingLocation ? 'Using Location' : 'Use Location'}
    </button>
  );
};

export default UseLocationBtn;
