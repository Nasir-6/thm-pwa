import { FaSearchLocation } from 'react-icons/fa';

const SearchBar = () => (
  <div className="searchBox relative border-2 rounded-full flex gap-1 items-center w-full max-w-xl">
    <FaSearchLocation className=" absolute left-2 text-slate-400" />
    <input
      type="text"
      name="location"
      id="location"
      placeholder="Search by Mosque or Postcode"
      className=" pl-8 py-2 w-full rounded-full"
    />
  </div>
);

export default SearchBar;
