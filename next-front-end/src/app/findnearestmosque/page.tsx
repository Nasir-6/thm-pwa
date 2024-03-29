import { getAllMosques } from '@/lib/mosques';
import FindNearestMosquePage from './FindNearestMosquePage';

export default async function HydratedFindNearestMosquePage() {
  const mosques = await getAllMosques();
  return <FindNearestMosquePage mosques={mosques} />;
}
