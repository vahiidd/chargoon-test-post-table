export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface CommentCardType {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface Column {
  id: 'id' | 'userId' | 'title' | 'body';
  label: string;
  minWidth?: number;
}

export interface Post {
  id: string;
  userId: string;
  title: string;
  body: string;
}
