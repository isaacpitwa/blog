import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { AppDispatch } from '@/redux/store';
import { addPost, editPost } from '@/redux/slices/postSlice';
import { Post } from '@/types/post';

interface PostFormProps {
  post?: Post;
}

const PostForm: React.FC<PostFormProps> = ({ post }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (post) {
      dispatch(editPost({ ...post, title, body }));
    } else {
      dispatch(addPost({ title, body, userId: 1 }));
    }
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 h-screen">
      <div>
        <label htmlFor="title" className="block mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="body" className="block mb-1">
          Body
        </label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
          rows={4}
        ></textarea>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        {post ? 'Update Post' : 'Create Post'}
      </button>
    </form>
  );
};

export default PostForm;