import React from 'react';
// import MosqueDetailsModal from '@/components/mosque_details_modal/MosqueDetailsModal';
// import { getAllMosques } from '@/lib/mosques';

export default async function MosqueModal({ params }: { params: { mosqueSlug: string } }) {
  // const mosque = (await getAllMosques())[0];
  return <p>{params.mosqueSlug}</p>;
}
