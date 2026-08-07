interface Props {
  search: string;
  setSearch: (value: string) => void;
}

function SearchBar({search,setSearch}: Props) {
  return (
    <input
      type="text"
      placeholder="Search blogs..."
      className="input input-bordered w-full"
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
    />
  );
}

export default SearchBar;