import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CommentsList from './components/CommentsList';
import PostsTable from './components/PostsTable';

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
