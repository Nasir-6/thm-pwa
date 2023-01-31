// This is a copy of the original mosque API But - incase the requests need auth tokens - do it like below -
// otherwise do it like the current mosque.ts
// How to use it
// First import:
// import useAuthenticatedMosqueApi from '../../api/authApi'; -
// Then run the useAuthenticatedMosqueApi() and destructure the functions to use:
// const { getAllMosquesAuthenticated } = useMosqueApi();
// Now whenever a Header with the token is passed it will use the authToken - i.e will authenticate!

import axios from 'axios';
// eslint-disable-next-line import/no-relative-packages
import { MosqueDTO } from '../../../back-end/src/db/models/mosques';
// import useStore from '../zustand';

const useAuthenticatedMosqueApi = () => {
  //   const { authToken } = useStore(state => state)

  const getAllMosquesAuthenticated = async (): Promise<MosqueDTO[]> => {
    // If I wanted to use some bearer token! - can pass in header here! - but also pass into function!?
    const res = await axios.get<MosqueDTO[]>(`http://localhost:8000/api/v1/mosques/`);
    return res.data;
  };

  return {
    getAllMosquesAuthenticated,
  };
};

export default useAuthenticatedMosqueApi;
