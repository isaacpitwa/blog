import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import postReducer from "@/redux/slices/postSlice";
import Home from "@/pages/index";

const createMockStore = (initialState:any) => {
  return configureStore({
    reducer: {
      posts: postReducer,
    },
    // preloadedState: initialState
  });
};

describe("Home Page", () => {
  it("renders PostList component", () => {
    const store = createMockStore({
      posts: { posts: [], loading: false, error: null },
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders loading state in PostList", () => {
    const store = createMockStore({
      posts: { posts: [], loading: true, error: null },
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

});