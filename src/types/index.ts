
export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Post {
  id: number;
  content: string;
  userId: number;
  image?: string;
  imageUrl?: string;
  likeCount: number;
  user: User;
  createdAt?: string;
  liked?: boolean;
}

export interface Like {
  id: number;
  userId: number;
  postId: number;
  User: User;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginData {
  email: string;
  password: string;
}
