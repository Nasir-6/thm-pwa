import React from 'react';
import { getMosqueBySlug } from '@/lib/mosques';
// import MosqueDetailsModal from '@/components/mosque_details_modal/MosqueDetailsModal';
// import { getAllMosques } from '@/lib/mosques';

export default async function MosqueModal({ params }: { params: { mosqueSlug: string } }) {
  const mosque = await getMosqueBySlug(params.mosqueSlug);
  console.log('mosque', mosque);
  return <p>{params.mosqueSlug}</p>;
}
