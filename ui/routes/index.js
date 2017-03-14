import React from 'react';
import { Route, IndexRoute } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

// import FeedPage from './FeedPage';
import Layout from './Layout';
import TestPage from './TestPage';
import RandomFeedPage from './RandomFeedPage';


injectTapEventPlugin();

export default (
  <Route
    path="/"
    component={Layout}
  >
    <IndexRoute
      component={TestPage}
    />
    <Route
      path="/test/:text"
      component={TestPage}
    />
    <Route
      path="/random"
      component={RandomFeedPage}
    />
    {/* keep below route for references */}
    {/* <Route
      path="feed/:type"
      component={FeedPage}
    /> */}
  </Route>
);
