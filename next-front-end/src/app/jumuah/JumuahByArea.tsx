import './JumuahByArea.css';
import { MosqueJumuahTimes } from '../../../../back-end/src/db/models/jumuahTimes';

interface Props {
  area: string;
  mosques: MosqueJumuahTimes[];
}
const JumuahByArea = ({ area, mosques }: Props) => {
  const mosqueJumuahTimes = mosques.map((mosque, i) => (
    <tr className={`bg-slate-${i % 2 ? '200' : '100'}`}>
      <td>{mosque.mosqueName}</td>
      <td>{mosque.firstTime.slice(0, 5)}</td>
      <td>{mosque.secondTime ? mosque.secondTime.slice(0, 5) : '-'}</td>
    </tr>
  ));
  return (
    <>
      <thead className="bg-primary-500 text-white text-left">
        <tr>
          <th>{area}</th>
          <th>1st</th>
          <th>2nd</th>
        </tr>
      </thead>
      <tbody className="text-left">{mosqueJumuahTimes}</tbody>
    </>
  );
};
export default JumuahByArea;
