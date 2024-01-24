import MosquesByArea from '@/components/MosquesByArea';
import { getAllMosques } from '@/lib/mosques';
import HomeClientComp from '../HomeClientComp';

export default async function HomePageLayout({ children }: { children: React.ReactNode }) {
  // Abstract the HomeClientComp so can fetch mosques on server
  const mosques = await getAllMosques();
  return (
    <HomeClientComp mosques={mosques}>
      {/* Pass in MosquesByArea as a child so can utilise SSR for it */}
      {children}
      <MosquesByArea mosques={mosques} />
    </HomeClientComp>
  );
}
