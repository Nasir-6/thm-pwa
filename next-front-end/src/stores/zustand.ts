import { create } from 'zustand';
// import { devtools } from 'zustand/middleware';

interface UserLocationState {
  userLocation: Position | undefined;
  setUserLocation: (userLocation: Position) => void;
}

const useStore = create<UserLocationState>()((set) => ({
  userLocation: undefined,
  //   setUserLocation: (userLocation: Position) => set((state) => ({ userLocation: userLocation })),
  setUserLocation: (userLocation: Position) => set(() => ({ userLocation })),
}));

// const useStore = process.env.REACT_APP_ENVIRONMENT == 'local' ? create(devtools(store)) : create(store);

export default useStore;
