import { useEffect, useState } from "react";
import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";

const Search = ({
  value = "",
  onChange,
  onSearch,
  placeholder = "Search...",
  debounce = 500,
  className = "",
}) => {
  const [search, setSearch] = useState(value ?? "");

  
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange?.(search);
    }, debounce);

    return () => clearTimeout(timer);
  }, [search, debounce, onChange]);

  const handleClear = () => {
    setSearch("");
    onChange?.("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch?.(search);
    }
  };

  return (
    <div className={`relative w-full max-w-sm ${className}`}>
      <HiMagnifyingGlass
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        size={20}
      />

      <input
        type="text"
        value={search}
        placeholder={placeholder}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        className="
          w-full
          rounded-lg
          border
          border-gray-300
          py-2.5
          pl-10
          pr-10
          text-sm
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200
        "
      />

      {search && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <HiXMark size={18} />
        </button>
      )}
    </div>
  );
};

export default Search;

//usage
// const UsersPage = () => {
//   const [search, setSearch] = useState("");

//   return (
//     <>
//       <Search
//         value={search}
//         onChange={setSearch}
//       />

//       <p>Searching for: {search}</p>
//     </>
//   );
// };