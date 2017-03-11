import React from 'react';
import { Route, IndexRoute } from 'react-router';

// import FeedPage from './FeedPage';
import Layout from './Layout';
import TestPage from './TestPage';

export default (
  <Route
    path="/"
    component={Layout}
  >
    <IndexRoute
      component={TestPage}
    />
    <Route
      path="/:text"
      component={TestPage}
    />
    {/* keep below route for references */}
    {/* <Route
      path="feed/:type"
      component={FeedPage}
    /> */}
  </Route>
);
