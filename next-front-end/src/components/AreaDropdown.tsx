// This is a serverComponent - as mosques should have been fetched on server
// Will use only CSS to make dropdown (eliminate need to make this a client component due to JS)
import Link from 'next/link';
// eslint-disable-next-line import/no-relative-packages
import { MosqueDTO } from '../../../back-end/src/db/models/mosques';
import DropdownIcon from '../icons/DropdownIcon';
import FemaleIcon from '../icons/FemaleIcon';
import './MosquesByArea.css';
import WheelchairIcon from '../icons/WheelchairIcon';
// import { ReactComponent as DropdownIcon } from './dropdown-icon.svg';

interface Props {
  area: string;
  mosques: MosqueDTO[];
}
const AreaDropdown = ({ area, mosques }: Props) => {
  const mosqueLinks = mosques.map((mosque) => (
    <li className="hover:text-accent-600 flex gap-1">
      <Link href={`https://www.towerhamletsmosques.co.uk/${mosque.urlSlug}`}>{mosque.name}</Link>
      {mosque.hasFemaleFacilities ? <FemaleIcon /> : null}
      {mosque.hasWheelchairAccess ? <WheelchairIcon /> : null}
    </li>
  ));
  return (
    <div className="area-container px-3 py-2 min-w-[330px]">
      <label
        htmlFor={`${area}-area-toggle`}
        className="area-toggle-label text-3xl font-medium cursor-pointer flex flex-row items-center gap-1">
        <DropdownIcon />
        {area}
      </label>
      <input type="checkbox" id={`${area}-area-toggle`} className="area-toggle" />
      <div className="wrapper mt-2">
        <ul className="pl-5 text-primary-500 max-h-[134px] overflow-scroll">{mosqueLinks}</ul>
      </div>
    </div>
  );
};
export default AreaDropdown;
