import { useState } from "react";
import {addBookmark,removeBookmark} from "../../api/bookmark";

interface Props {
  blogId: number;
  initialSaved?: boolean;
}

function BookMarkButton({
  blogId,
  initialSaved = false,
}: Props) {
  const [saved, setSaved] = useState(initialSaved);

  async function handleBookmark() {
    try {
      if (!saved) {
        await addBookmark(blogId);
        setSaved(true);
      } else {
        await removeBookmark(blogId);
        setSaved(false);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }

  return (
    <button
      className="btn btn-sm"
      onClick={handleBookmark}
    >
      {saved ? "🏷️ Saved" : "🏷️ Save"}
    </button>
  );
}

export default BookMarkButton;