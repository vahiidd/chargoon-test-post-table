import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { findByLabelText } from '@testing-library/react';

const useStyles = makeStyles({
  root: {
    width: '70%',
    height: 'max-content',
    border: '1px solid lightgray',
    borderRadius: 10,
    boxShadow: '0 5px 15px gray',
    margin: '20px auto',
    padding: '20px',
  },
  card: {
    '& *': {
      display: 'inline',
    },
  },
});

interface CommentCardType {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const CommentCard: React.FC<CommentCardType> = ({
  postId,
  id,
  name,
  email,
  body,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.card}>
        <Typography variant='h5'>postId: </Typography>
        <Typography>{postId}</Typography>
      </div>
      <div className={classes.card}>
        <Typography variant='h5'>id: </Typography>
        <Typography>{id}</Typography>
      </div>
      <div className={classes.card}>
        <Typography variant='h5'>name: </Typography>
        <Typography>{name}</Typography>
      </div>
      <div className={classes.card}>
        <Typography variant='h5'>email: </Typography>
        <Typography>{email}</Typography>
      </div>
      <div className={classes.card}>
        <Typography variant='h5'>body: </Typography>
        <Typography>{body}</Typography>
      </div>
    </div>
  );
};

export default CommentCard;
