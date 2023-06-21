// This is a serverComponent - as mosques should have been fetched on server
// Will use only CSS to make dropdown (eliminate need to make this a client component due to JS)
import Link from 'next/link';
// eslint-disable-next-line import/no-relative-packages
import { MosqueDTO } from '../../../back-end/src/db/models/mosques';
import './MosquesByArea.css';

interface Props {
  area: string;
  mosques: MosqueDTO[];
}
const AreaDropdown = ({ area, mosques }: Props) => {
  const mosqueLinks = mosques.map((mosque) => (
    <li className="hover:text-accent-600">
      <Link href={`https://www.towerhamletsmosques.co.uk/${mosque.urlSlug}`}>{mosque.name}</Link>
    </li>
  ));
  return (
    <div className="area-container p-5 min-w-[330px]">
      <label htmlFor={`${area}-area-toggle`} className="area-toggle-label text-3xl font-semibold cursor-pointer">
        {area}
      </label>
      <input type="checkbox" id={`${area}-area-toggle`} className="area-toggle" />
      <div className="wrapper mt-2">
        <ul className="pl-5 text-primary-500 font-medium max-h-[134px] overflow-scroll">{mosqueLinks}</ul>
      </div>
    </div>
  );
};
export default AreaDropdown;
