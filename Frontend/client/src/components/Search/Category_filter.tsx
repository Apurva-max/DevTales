import { Blog_Categories } from "../../constants/categories";

interface Props {
  category: string;
  setCategory: React.Dispatch<
    React.SetStateAction<string>
  >;
}

function CategoryFilter({
  category,
  setCategory,
}: Props) {
  return (
    <select
      className="select select-bordered"
      value={category}
      onChange={(e) =>
        setCategory(e.target.value)
      }
    >
      <option value="All">
        All Categories
      </option>

      {Blog_Categories.map((item) => (
        <option
          key={item}
          value={item}
        >
          {item}
        </option>
      ))}
    </select>
  );
}

export default CategoryFilter;