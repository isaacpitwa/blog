import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { AppDispatch, RootState } from "@/redux/store";
import { getPosts, removePost } from "@/redux/slices/postSlice";

const PostList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
                                                                                                                                                                                                                                                                                        
  const handleDelete = (id: number) => {
    dispatch(removePost(id));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-0">Posts</h2>
        <Link
          href="/posts/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 h-10 "
        >
          Add New Post
        </Link>
      </div>
      <ul className="mt-4 space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded">
            <Link href={`/posts/${post.id}`} className="text-blue-500 hover:text-blue-700"><h2 className="text-xl font-semibold text-black hover:text-gray-500">{post.title}</h2></Link>
            <p className="mt-2">{post.body}</p>
            <div className="mt-4 space-x-2">
              <Link
                href={`/posts/edit/${post.id}`}
                className="text-blue-500 hover:text-blue-700"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(post.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
