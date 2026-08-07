interface Props {
  sort: string;
  setSort: React.Dispatch<
    React.SetStateAction<string>
  >;
}

function Drop_down({
  sort,
  setSort,
}: Props) {
  return (
    <select
      className="select select-bordered"
      value={sort}
      onChange={(e) =>
        setSort(e.target.value)
      }
    >
      <option value="latest">
        Latest
      </option>

      <option value="oldest">
        Oldest
      </option>

      <option value="likes">
        Most Liked
      </option>

      <option value="views">
        Most Viewed
      </option>

      <option value="reading">
        Reading Time
      </option>
    </select>
  );
}

export default Drop_down;