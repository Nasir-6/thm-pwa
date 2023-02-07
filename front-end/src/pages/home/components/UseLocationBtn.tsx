import { useState } from 'react';
import { MdOutlineMyLocation } from 'react-icons/md';

const UseLocationBtn = () => {
  const [isUsingLocation, setIsUsingLocation] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setIsUsingLocation(!isUsingLocation)}
      className={`use-location flex gap-1 items-center font-semibold ${isUsingLocation ? 'text-primary-500' : 'text-accent-700'} ${
        isUsingLocation ? 'hover:text-primary-700' : 'hover:text-accent-800'
      }`}>
      <MdOutlineMyLocation className="" />
      {isUsingLocation ? 'Using Location' : 'Use Location'}
    </button>
  );
};

export default UseLocationBtn;
