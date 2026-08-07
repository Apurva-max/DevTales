import { Blog_Categories } from "../../constants/categories";

interface Props {
  filter: string;
  setFilter: (value: string) => void;
}

function Filter({
  filter,
  setFilter,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {Blog_Categories.map((category) => (
        <button
          key={category}
          className={`btn btn-sm ${
            filter === category
              ? "btn-primary"
              : "btn-outline"
          }`}
          onClick={() => setFilter(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default Filter;