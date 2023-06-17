/* eslint-disable jsx-a11y/label-has-associated-control */
// This is a serverComponent - as mosques should have been fetched on server
// Will use only CSS to make dropdown (eliminate need to make this a client component due to JS)
/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
// eslint-disable-next-line import/no-relative-packages
import { MosqueDTO } from '../../../back-end/src/db/models/mosques';
import './MosquesByArea.css';

interface Props {
  mosques: MosqueDTO[];
}
const MosquesByArea = ({ mosques }: Props) => {
  const mosquesList = mosques?.map((mosque) => (
    <div>
      <Link href={`https://www.towerhamletsmosques.co.uk/${mosque.urlSlug}`} target="_blank">
        <h1>{mosque.name}</h1>
      </Link>
    </div>
  ));

  const inputId = 'area-toggle';

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return (
    <>
      {mosquesList}
      <label htmlFor={inputId} className="area-toggle-label">
        Stepney
      </label>
      <input type="checkbox" id={inputId} className="area-toggle" />
      <div className="wrapper">
        <ul className="">
          <li>
            <Link href="https://www.towerhamletsmosques.co.uk/redcoatmasjid">Redcoat</Link>
          </li>
          <li>
            <Link href="https://www.towerhamletsmosques.co.uk/redcoatmasjid">Redcoat</Link>
          </li>
          <li>
            <Link href="https://www.towerhamletsmosques.co.uk/redcoatmasjid">Redcoat</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MosquesByArea;
