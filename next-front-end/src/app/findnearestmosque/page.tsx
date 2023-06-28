import { getAllMosques } from '@/lib/mosques';

export default async function FindNearestMosquePage() {
  // Abstract the HomeClientComp so can fetch mosques on server
  const mosques = await getAllMosques();
  const mosqueNamesList = mosques.map((mosque) => <h2>{mosque.name}</h2>);
  return (
    <div>
      <h1>Find Nearest Mosque Page</h1>
      {mosqueNamesList}
    </div>
  );
}
