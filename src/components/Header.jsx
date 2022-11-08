import SearchIcon from '../assets/icons_search.svg';

export const Header = ({ onChange, city }) => {
  return (
    <form className="flex pt-7 pb-6">
      <input
        className="border border-blue-800 rounded-full h-9 p-4 mr-2"
        type="text"
        placeholder={city}
        onChange={(event) => onChange(event.target.value)}
      />
      <button
        className="text-white bg-blue-800 hover:bg-blue-900 h-9 w-9 rounded-full"
        type="submit"
      >
        <img src={SearchIcon} alt="search" className="w-5 h-5 m-2" />
      </button>
    </form>
  );
};
