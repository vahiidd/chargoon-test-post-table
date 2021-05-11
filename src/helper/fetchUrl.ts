export const postsUrl = () => 'https://jsonplaceholder.typicode.com/posts/';

export const commentsUrl = (id: string) =>
  `https://jsonplaceholder.typicode.com/posts/${id}/comments`;
