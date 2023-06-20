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
  const areas: { [area: string]: MosqueDTO[] } = {};
  mosques.forEach((mosque) => {
    if (mosque.area in areas) {
      areas[mosque.area].push(mosque);
    } else {
      areas[mosque.area] = [mosque];
    }
  });

  const mosquesByAreaDropdowns = Object.keys(areas)
    .sort()
    .map((area) => <AreaDropdown area={area} mosques={areas[area]} />);

  return <div className="mosque-by-area-container">{mosquesByAreaDropdowns}</div>;
};

export default MosquesByArea;
