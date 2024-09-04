import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useRouter } from "next/router";
import postReducer from "@/redux/slices/postSlice";
import PostForm from "../PostForm";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const createMockStore = (initialState: any) => {
  return configureStore({
    reducer: {
      posts: postReducer,
    },
  });
};

describe("PostForm", () => {
  const mockPush = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

  it("renders form fields correctly", () => {
    const store = createMockStore({ posts: { posts: [], loading: false, error: null } });

    render(
      <Provider store={store}>
        <PostForm />
      </Provider>
    );

    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Body")).toBeInTheDocument();
    expect(screen.getByText("Create Post")).toBeInTheDocument();
  });

  it("dispatches addPost action on form submission", () => {
    const store = createMockStore({ posts: { posts: [], loading: false, error: null } });
    const dispatchSpy = jest.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <PostForm />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText("Title"), { target: { value: "New Post" } });
    fireEvent.change(screen.getByLabelText("Body"), { target: { value: "This is a new post." } });
    fireEvent.click(screen.getByText("Create Post"));

    expect(dispatchSpy).toHaveBeenCalledWith(expect.any(Function));
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("renders form with existing post data", () => {
    const store = createMockStore({ posts: { posts: [], loading: false, error: null } });
    const post = { id: 1, title: "Existing Post", body: "This is an existing post.", userId: 1 };

    render(
      <Provider store={store}>
        <PostForm post={post} />
      </Provider>
    );

    expect(screen.getByLabelText("Title")).toHaveValue("Existing Post");
    expect(screen.getByLabelText("Body")).toHaveValue("This is an existing post.");
    expect(screen.getByText("Update Post")).toBeInTheDocument();
  });

  it("dispatches editPost action on form submission with existing post", () => {
    const store = createMockStore({ posts: { posts: [], loading: false, error: null } });
    const dispatchSpy = jest.spyOn(store, "dispatch");
    const post = { id: 1, title: "Existing Post", body: "This is an existing post.", userId: 1 };

    render(
      <Provider store={store}>
        <PostForm post={post} />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText("Title"), { target: { value: "Updated Post" } });
    fireEvent.change(screen.getByLabelText("Body"), { target: { value: "This is an updated post." } });
    fireEvent.click(screen.getByText("Update Post"));

    expect(dispatchSpy).toHaveBeenCalledWith(expect.any(Function));
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("validates form fields", () => {
    const store = createMockStore({ posts: { posts: [], loading: false, error: null } });

    render(
      <Provider store={store}>
        <PostForm />
      </Provider>
    );

    fireEvent.click(screen.getByText("Create Post"));

    expect(screen.getByLabelText("Title")).toBeInvalid();
    expect(screen.getByLabelText("Body")).toBeInvalid();
  });
});