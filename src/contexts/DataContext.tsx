import React, { createContext, useContext, useState, ReactNode } from "react";
import { Post, Comment, User } from "@/types";
import { mockPosts, mockComments, mockUsers } from "@/data/mockData";

interface DataContextType {
  posts: Post[];
  comments: Comment[];
  users: User[];
  addPost: (userId: string, content: string, image?: string) => void;
  updatePost: (postId: string, content: string) => void;
  deletePost: (postId: string) => void;
  addComment: (postId: string, userId: string, content: string) => void;
  updateComment: (commentId: string, content: string) => void;
  deleteComment: (commentId: string) => void;
  getPostsByUser: (userId: string) => Post[];
  getCommentsByPost: (postId: string) => Comment[];
  getUserById: (userId: string) => User | undefined;
  getPostById: (postId: string) => Post | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [users] = useState<User[]>(mockUsers);

  const addPost = (userId: string, content: string, image?: string) => {
    const newPost: Post = {
      id: String(Date.now()),
      userId,
      content,
      image,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  const updatePost = (postId: string, content: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, content, updatedAt: new Date().toISOString() }
          : post
      )
    );
  };

  const deletePost = (postId: string) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
    setComments((prev) => prev.filter((comment) => comment.postId !== postId));
  };

  const addComment = (postId: string, userId: string, content: string) => {
    const newComment: Comment = {
      id: String(Date.now()),
      postId,
      userId,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setComments((prev) => [...prev, newComment]);
  };

  const updateComment = (commentId: string, content: string) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? { ...comment, content, updatedAt: new Date().toISOString() }
          : comment
      )
    );
  };

  const deleteComment = (commentId: string) => {
    setComments((prev) => prev.filter((comment) => comment.id !== commentId));
  };

  const getPostsByUser = (userId: string) => {
    return posts.filter((post) => post.userId === userId);
  };

  const getCommentsByPost = (postId: string) => {
    return comments.filter((comment) => comment.postId === postId);
  };

  const getUserById = (userId: string) => {
    return users.find((user) => user.id === userId);
  };

  const getPostById = (postId: string) => {
    return posts.find((post) => post.id === postId);
  };

  return (
    <DataContext.Provider
      value={{
        posts,
        comments,
        users,
        addPost,
        updatePost,
        deletePost,
        addComment,
        updateComment,
        deleteComment,
        getPostsByUser,
        getCommentsByPost,
        getUserById,
        getPostById,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
