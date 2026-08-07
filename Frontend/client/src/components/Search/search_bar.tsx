interface Props {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

function SearchBar({
  search,
  setSearch,
}: Props) {
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search blogs..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="input input-bordered w-full"
      />
    </div>
  );
}

export default SearchBar;