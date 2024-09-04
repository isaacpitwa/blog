import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import postReducer, { PostState } from "@/redux/slices/postSlice";
import PostList from "../PostList";

const createMockStore = (initialState:any) => {
  return configureStore({
    reducer: {
      posts: postReducer,
    },
    // preloadedState: initialState
  });
};

describe("PostList", () => {
  it("renders loading state", () => {
    const store = createMockStore({
      posts: { posts: [], loading: true, error: null },
    });

    render(
      <Provider store={store}>
        <PostList />
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
