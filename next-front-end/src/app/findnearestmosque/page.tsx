import { getAllMosques } from '@/lib/mosques';
import { dehydrate, Hydrate } from '@tanstack/react-query';
import getQueryClient from '../../lib/getQueryClient';
import FindNearestMosquePage from './FindNearestMosquePage';

export default async function HydratedFindNearestMosquePage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['mosques'], getAllMosques);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <FindNearestMosquePage />
    </Hydrate>
  );
}
