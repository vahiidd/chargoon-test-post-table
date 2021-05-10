import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CommentsList from './CommentsList';
import PostsTable from './PostsTable';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={PostsTable} />
        <Route exact path='/comment/:id' component={CommentsList} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
