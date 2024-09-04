import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { AppDispatch, RootState } from "@/redux/store";
import { getPosts, removePost } from "@/redux/slices/postSlice";
import { MdEdit, MdDeleteOutline,MdAdd } from "react-icons/md";
import Modal from "@/components/Modal";

const PostList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector(
    (state: RootState) => state.posts
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
                                                                                                                                                                                                                                                                                        
  const handleDeleteClick = (id: number) => {
    setPostToDelete(id);
    setIsDeleteModalOpen(true);
  };
  const handleDeleteConfirm = () => {
    if (postToDelete !== null) {
      dispatch(removePost(postToDelete));
      setIsDeleteModalOpen(false);
      setPostToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setPostToDelete(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-0">Posts</h2>
        <Link
          href="/posts/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 h-10 flex items-center  space-x-2"
        >
         <MdAdd />
        <>Add New Post</>
        </Link>
      </div>
      <ul className="mt-4 space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded">
            <Link href={`/posts/${post.id}`} className="text-blue-500 hover:text-blue-700"><h2 className="text-xl font-semibold text-black hover:text-gray-500">{post.title}</h2></Link>
            <p className="mt-2">{post.body}</p>
            <div className="mt-4  flex space-x-4 ">
              <Link
                href={`/posts/edit/${post.id}`}
                className="text-blue-500 hover:text-blue-700 flex space-x-2 items-center"
              >
                <MdEdit />
                <label>Edit</label>
              </Link>
              <button
                onClick={() => handleDeleteClick(post.id)}
                className="text-red-500 hover:text-red-700 flex space-x-2 items-center"
              >
                <MdDeleteOutline />
                <label>Delete</label>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Confirm Delete"
        message="Are you sure you want to delete this post? This action cannot be undone."
      />     
    </div>
  );
};

export default PostList;
