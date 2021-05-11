import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import CommentCard from './CommentCard';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  backButton: {
    position: 'fixed',
    top: '20px',
    left: '10px',
  },
});

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const CommentsList = () => {
  const classes = useStyles();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const history = useHistory();
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
      <Button
        onClick={() => {
          history.goBack();
        }}
        color='primary'
        variant='contained'
        className={classes.backButton}
      >
        Back To Posts
      </Button>
    </div>
  );
};

export default CommentsList;
