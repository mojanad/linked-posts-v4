export interface User {
  id: string;
  name: string;
  email: string;
  profilePhoto: string;
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
