import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { AppDispatch, RootState } from "@/redux/store";
import { getPost, getComments } from "@/redux/slices/postSlice";
import CommentList from "@/components/CommentList";
import { MdEdit, MdOutlineKeyboardBackspace } from "react-icons/md";

const PostDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch<AppDispatch>();
  const { currentPost, comments, loading, error } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    if (id && typeof id === "string") {
      dispatch(getPost(Number(id)));
      dispatch(getComments(Number(id)));
    }
  }, [dispatch, id]);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
  if (!currentPost)
    return <div className="text-center mt-8">Post not found</div>;

  return (
    <div className="max-w-4xl mx-auto mt-4">
      <div className="flex space-x-4 mb-12 justify-between">
        <Link href="/" className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 flex items-center space-x-2 hover:cursor-pointer ">
        <MdOutlineKeyboardBackspace />
          <label >Back to List</label>
        </Link>
        <Link href={`/posts/edit/${currentPost.id}`} className="flex items-center rounded space-x-2 bg-blue-800 hover:bg-blue-400 px-4 py-2 text-white">
         <MdEdit />
          <label>Edit Post</label>
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-4">{currentPost.title}</h1>
      <p className="mb-6">{currentPost.body}</p>
      <CommentList comments={comments} />
    </div>
  );
};

export default PostDetails;
