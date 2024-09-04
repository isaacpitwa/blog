import type { NextPage } from 'next';
import PostForm from '@/components/PostForm';

const NewPost: NextPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Create New Post</h1>
      <PostForm />
    </div>
  );
};

export default NewPost;