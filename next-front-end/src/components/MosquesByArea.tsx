/* eslint-disable jsx-a11y/label-has-associated-control */
// This is a serverComponent - as mosques should have been fetched on server
// Will use only CSS to make dropdown (eliminate need to make this a client component due to JS)
// eslint-disable-next-line import/no-relative-packages
import { MosqueDTO } from '../../../back-end/src/db/models/mosques';
import AreaDropdown from './AreaDropdown';
import './MosquesByArea.css';

interface Props {
  mosques: MosqueDTO[];
}

const MosquesByArea = ({ mosques }: Props) => {
  const areaObj: { [area: string]: MosqueDTO[] } = {};
  mosques.forEach((mosque) => {
    if (mosque.area in areaObj) {
      areaObj[mosque.area].push(mosque);
    } else {
      areaObj[mosque.area] = [mosque];
    }
  });

  const mosquesByArea = Object.keys(areaObj)
    .sort()
    .map((area) => <AreaDropdown area={area} mosques={areaObj[area]} />);

  return <div className="mosque-by-area-container">{mosquesByArea}</div>;
};

export default MosquesByArea;
