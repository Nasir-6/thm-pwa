import axios from 'axios';
// eslint-disable-next-line import/no-relative-packages
import { MosqueDTO } from '../../../back-end/src/db/models/mosques';
// import useStore from '../zustand';

const useMosqueApi = () => {
  //   const { authToken } = useStore(state => state)

  const getAllMosques = () => axios.get<MosqueDTO[]>(`http://localhost:8000/api/v1/mosques/`);

  return {
    getAllMosques,
  };
};

export default useMosqueApi;