import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { getPost } from '@/redux/slices/postSlice';
import PostForm from '@/components/PostForm';

const EditPost: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch<AppDispatch>();
  const { currentPost, loading, error } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    if (id && typeof id === 'string') {
      dispatch(getPost(Number(id)));
    }
  }, [dispatch, id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!currentPost) return <div>Post not found</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Edit Post</h1>
      <PostForm post={currentPost} />
    </div>
  );
};

export default EditPost;