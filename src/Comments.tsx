import React from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const Comments = () => {
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
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {comments.map((comment) =>
        Object.entries(comment).map(([key, value]) => (
          <p>
            {key} === {value}
          </p>
        ))
      )}
    </div>
  );
};

export default Comments;
