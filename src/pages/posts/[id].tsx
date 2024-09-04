import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { AppDispatch, RootState } from '@/redux/store';
import { getPost, getComments } from '@/redux/slices/postSlice';
import CommentList from '@/components/CommentList';

const PostDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch<AppDispatch>();
  const { currentPost, comments, loading, error } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    if (id && typeof id === 'string') {
      dispatch(getPost(Number(id)));
      dispatch(getComments(Number(id)));
    }
  }, [dispatch, id]);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
  if (!currentPost) return <div className="text-center mt-8">Post not found</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">{currentPost.title}</h1>
      <p className="mb-6">{currentPost.body}</p>
      <div className="flex space-x-4 mb-8">
        <Link href={`/posts/edit/${currentPost.id}`} className="btn">
          Edit Post
        </Link>
        <Link href="/" className="btn bg-gray-500 hover:bg-gray-600">
         Back to List
        </Link>
      </div>
      <CommentList comments={comments} />
    </div>
  );
};

export default PostDetails;