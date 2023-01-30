import axios from 'axios';
// eslint-disable-next-line import/no-relative-packages
import { MosqueDTO } from '../../../back-end/src/db/models/mosques';
// import useStore from '../zustand';

const useMosqueApi = () => {
  //   const { authToken } = useStore(state => state)

  // NOTE: Why did I return res.data rather than just the axiosResponse?
  // I wanted the data from useQuery to be the MosqueDTO[] not the axios response
  // It also solved all the ts/eslint issues so must be the way
  // But how will useQuery deal with errors?
  // since this is all in a promise here - any errors thrown by axios (i.e any status != 2xx will throw)
  // This will get thrown to useQuery and dealt with there - otherwise will return the MosquesDTO[]!
  const getAllMosques = async (): Promise<MosqueDTO[]> => {
    const res = await axios.get<MosqueDTO[]>(`http://localhost:8000/api/v1/mosques/`);
    return res.data;
  };

  return {
    getAllMosques,
  };
};

export default useMosqueApi;
