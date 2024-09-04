import { configureStore } from '@reduxjs/toolkit';
import postReducer, {
  getPosts,
  getPost,
  addPost,
  editPost,
  removePost,
  getComments,
} from '../slices/postSlice';
import { Post } from '@/types/post';
import { Comment } from '@/types/comment';

describe('postSlice', () => {
  const initialState = {
    posts: [],
    currentPost: null,
    comments: [],
    loading: false,
    error: null,
  };

  const createMockStore = (preloadedState = {}) => {
    return configureStore({
      reducer: {
        posts: postReducer,
      },
      preloadedState,
    });
  };

  it('should handle initial state', () => {
    const store = createMockStore();
    expect(store.getState().posts).toEqual(initialState);
  });

  it('should handle getPosts.pending', () => {
    const store = createMockStore();
    store.dispatch({ type: getPosts.pending.type });
    expect(store.getState().posts.loading).toBe(true);
  });

  it('should handle getPosts.fulfilled', () => {
    const store = createMockStore();
    const payload: Post[] = [{ id: 1, title: 'Test Post', body: 'Test body', userId: 1 }];
    store.dispatch({ type: getPosts.fulfilled.type, payload });
    expect(store.getState().posts.loading).toBe(false);
    expect(store.getState().posts.posts).toEqual(payload);
  });

  it('should handle getPosts.rejected', () => {
    const store = createMockStore();
    store.dispatch({ type: getPosts.rejected.type, error: { message: 'Error message' } });
    expect(store.getState().posts.loading).toBe(false);
    expect(store.getState().posts.error).toBe('Error message');
  });

});