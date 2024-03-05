import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import CrossIcon from '@/icons/CrossIcon';
// eslint-disable-next-line import/no-relative-packages
import { MosqueDTO } from '../../../../back-end/src/db/models/mosques';

type Props = {
  mosque: MosqueDTO;
  url: string;
};

const stringToUrl = (str: string) => str.toLowerCase().replace(' ', '_');

const MosqueModalHeader = ({ mosque, url }: Props) => {
  const router = useRouter();
  return (
    <div className="flex items-start p-3">
      {/* TODO: Figure out how to get and store image */}
      <div className=" w-20 h-16 relative mr-2">
        <Image
          src={`https://ik.imagekit.io/9gcdrszdk/${stringToUrl(mosque.borough)}/${stringToUrl(mosque.area)}/${mosque.urlSlug}.jpg`}
          alt=""
          fill
          className="rounded object-cover"
        />
      </div>
      <div className="mosque-details">
        <h2 className=" text-xl font-bold">{mosque.name}</h2>
        <p>{mosque.address}</p>
        <Link href={mosque.googleUrl} target="_blank" className="text-gradient-gold font-bold">
          ↳ Get Directions
        </Link>
      </div>
      <button
        type="button"
        className="w-5 stroke-black hover:stroke-accent-600 ml-auto"
        onClick={() => router.push(url === '' ? '/' : url)}>
        <CrossIcon />
      </button>
    </div>
  );
};

export default MosqueModalHeader;
