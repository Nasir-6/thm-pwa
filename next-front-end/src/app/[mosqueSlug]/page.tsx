'use client';
import React from 'react';
import { getMosqueBySlug } from '@/lib/mosques';
import MosqueDetailsModal from '@/components/mosque_details_modal/MosqueDetailsModal';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
// import MosqueDetailsModal from '@/components/mosque_details_modal/MosqueDetailsModal';
// import { getAllMosques } from '@/lib/mosques';

export default function MosqueModal() {
  const urlArr = usePathname().split('/');
  const mosqueSlug = urlArr.pop();
  const url = urlArr.join('/');

  const { data: mosque } = useQuery({
    queryKey: [mosqueSlug], // Give Date give e.g 15/02/23 - Now the time! - as time changes but date is const
    queryFn: () => getMosqueBySlug(mosqueSlug!),
    staleTime: 1000 * 60 * 10, // TODO: Change this to ms until midnight! - setup a Util function
  });
  return mosque ? <MosqueDetailsModal mosque={mosque} url={url} /> : <></>;
}
