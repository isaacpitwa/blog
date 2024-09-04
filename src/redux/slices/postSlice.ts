import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '@/types/post';
import { fetchPosts, fetchPost, createPost, updatePost, deletePost } from '@/utils/api';

interface PostState {
  posts: Post[];
  currentPost: Post | null;
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
};

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
  const response = await fetchPosts();
  return response;
});

export const getPost = createAsyncThunk('posts/getPost', async (id: number) => {
  const response = await fetchPost(id);
  return response;
});

export const addPost = createAsyncThunk('posts/addPost', async (post: Omit<Post, 'id'>) => {
  const response = await createPost(post);
  return response;
});

export const editPost = createAsyncThunk('posts/editPost', async (post: Post) => {
  const response = await updatePost(post);
  return response;
});

export const removePost = createAsyncThunk('posts/removePost', async (id: number) => {
  await deletePost(id);
  return id;
});

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      })
      .addCase(getPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.currentPost = action.payload;
      })
      .addCase(addPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.posts.push(action.payload);
      })
      .addCase(editPost.fulfilled, (state, action: PayloadAction<Post>) => {
        const index = state.posts.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(removePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      });
  },
});

export default postSlice.reducer;