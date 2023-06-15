// This is a serverComponent - as mosques should have been fetched on server
// Will use only CSS to make dropdown (eliminate need to make this a client component due to JS)
/* eslint-disable react/no-unescaped-entities */
// import Link from 'next/link';
// eslint-disable-next-line import/no-relative-packages
import { MosqueDTO } from '../../../back-end/src/db/models/mosques';

interface Props {
  mosques: MosqueDTO[];
}
const MosquesByArea = ({ mosques }: Props) => {
  const mosquesList = mosques?.map((mosque) => <h1>{mosque.name}</h1>);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{mosquesList}</>;
};

export default MosquesByArea;
