import CrossIcon from '@/icons/CrossIcon';
import Link from 'next/link';
import React from 'react';
// eslint-disable-next-line import/no-relative-packages
import { MosqueDTO } from '../../../../back-end/src/db/models/mosques';

type Props = {
  mosque: MosqueDTO;
  setIsModalShown: React.Dispatch<React.SetStateAction<boolean>>;
};

const MosqueModalHeader = ({ mosque, setIsModalShown }: Props) => (
  <div className="flex items-start p-3">
    {/* TODO: Figure out how to get and store image */}
    <img
      src="https://res.cloudinary.com/londonmosques/image/upload/v1641449688/londonmosques-image/vi1syif3sx0dqvtnfays.png"
      alt=""
      width={95}
      className="mr-3 rounded"
    />
    <div className="mosque-details">
      <h2 className=" text-xl font-bold">{mosque.name}</h2>
      <p>{mosque.address}</p>
      <Link href={mosque.googleUrl} target="_blank" className="text-gradient-gold font-bold">
        ↳ Get Directions
      </Link>
    </div>
    <button type="button" className="w-5 stroke-black hover:stroke-accent-600 ml-auto" onClick={() => setIsModalShown(false)}>
      <CrossIcon />
    </button>
  </div>
);

export default MosqueModalHeader;
