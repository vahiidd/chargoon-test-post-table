import React from 'react';
import PostsTable from './PostsTable';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Comments from './Comments';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={PostsTable} />
        <Route exact path='/comment/:id' component={Comments} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
