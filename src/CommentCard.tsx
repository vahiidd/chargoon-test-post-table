import React from 'react';
import { Typography } from '@material-ui/core';

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
  return (
    <div
      style={{
        width: '70%',
        height: 'max-content',
        border: '1px solid black',
        margin: '10px auto',
        padding: '20px'
      }}
    >
      <div>
        <Typography variant='h5'>postId: </Typography>
        <p>{postId}</p>
      </div>
      <div>
        <Typography variant='h5'>id: </Typography>
        <p>{id}</p>
      </div>
      <div>
        <Typography variant='h5'>name: </Typography>
        <p>{name}</p>
      </div>
      <div>
        <Typography variant='h5'>email: </Typography>
        <p>{email}</p>
      </div>
      <div>
        <Typography variant='h5'>body: </Typography>
        <p>{body}</p>
      </div>
    </div>
  );
};

export default CommentCard;
