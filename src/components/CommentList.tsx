import React from "react";
import { Comment } from "@/types/comment";

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div className="mt-6 pb-4">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>
      {comments.map((comment) => (
        <div key={comment.id} className="bg-white p-4 rounded-lg shadow mb-4">
          <h3 className="font-semibold">{comment.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{comment.email}</p>
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
