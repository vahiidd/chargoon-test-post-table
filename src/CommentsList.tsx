import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import CommentCard from './CommentCard';

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const CommentsList = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id } = useParams() as { id: string };

  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );
    const data = await res.json();
    setComments(data);
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {comments.map((comment) => (
        <CommentCard key={comment.id} {...comment} />
      ))}
    </div>
  );
};

export default CommentsList;
