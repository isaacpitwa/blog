import React from "react";
import { render, screen } from "@testing-library/react";
import CommentList from "@/components/CommentList";
import { Comment } from "@/types/comment";

describe("CommentList", () => {
  const mockComments: Comment[] = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        body: "This is a comment.",
        postId: 0
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        body: "This is another comment.",
        postId: 0
    },
  ];

  it("renders correctly with comments", () => {
    render(<CommentList comments={mockComments} />);

    expect(screen.getByText("Comments")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("This is a comment.")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
    expect(screen.getByText("This is another comment.")).toBeInTheDocument();
  });

  it("renders correctly with no comments", () => {
    render(<CommentList comments={[]} />);

    expect(screen.getByText("Comments")).toBeInTheDocument();
    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    expect(screen.queryByText("This is a comment.")).not.toBeInTheDocument();
  });
});