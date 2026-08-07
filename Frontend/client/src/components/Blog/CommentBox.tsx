import { useState } from "react";

function CommentBox() {
    const [ comment, setComment ] = useState("");
    const [ comments , setComments ] = useState<string[]>([]);

    const addComment = () => {

        if(!comment) return;

        setComments([...comments, comment]);

        setComment("");
    }

    return (
        <div>
            <textarea className="textarea textarea-bordered w-full" 
            value={comment} 
            onChange={(e) => setComment(e.target.value)} />

            <button onClick={addComment} className="btn mt-2">
                Comment
            </button>

            <div className="mt-4">
                {comments.map(
                    (comment, index) => (
                        <p key={index}>
                            {comment}
                        </p>
                    )
                )}
            </div>
        </div>
    )
}

export default CommentBox;