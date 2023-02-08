// eslint-disable-next-line import/no-relative-packages
import { MosqueDTO } from '../../../back-end/src/db/models/mosques';

export const getDistanceToMosqueFromUserLocation = (userLocation: Position, mosqueLatitude: number, mosqueLongitude: number): number => {
  console.log('Running distance calculator');
  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.
  const userLatitudeInRad = (userLocation.latitude * Math.PI) / 180;
  const mosqueLatitudeInRad = (mosqueLatitude * Math.PI) / 180;
  const userLongitudeInRad = (userLocation.longitude * Math.PI) / 180;
  const mosqueLongitudeInRad = (mosqueLongitude * Math.PI) / 180;

  // Haversine formula
  const dlon = mosqueLongitudeInRad - userLongitudeInRad;
  const dlat = mosqueLatitudeInRad - userLatitudeInRad;
  const a = Math.sin(dlat / 2) ** 2 + Math.cos(userLatitudeInRad) * Math.cos(mosqueLatitudeInRad) * Math.sin(dlon / 2) ** 2;

  const c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth - R.
  // Use R = 3956 for miles
  // use R = 6371 for kilometers;
  const R = 3956; // for miles

  // calculate the result
  return parseFloat((c * R).toFixed(2));
};

export const sortMosquesByDistanceFromLocation = (mosques: MosqueDTO[], location: Position) => {
  const updatedLocationMosques = mosques.map((mosque) => ({
    ...mosque,
    distanceToLocationInMiles: getDistanceToMosqueFromUserLocation(location, mosque.latitude, mosque.longitude),
  }));
  console.log('sorting mosques');
  return updatedLocationMosques.sort((a, b) => (a.distanceToLocationInMiles > b.distanceToLocationInMiles ? 1 : -1));
};
