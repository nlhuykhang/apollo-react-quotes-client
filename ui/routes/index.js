import React from 'react';
import { Route, IndexRoute } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

// import FeedPage from './FeedPage';
import Layout from './Layout';
import TestPage from './TestPage';
import RandomFeedPage from './RandomFeedPage';
import SavedFeedPage from './SavedFeedPage';


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
      name="Test"
      path="/test/:text"
      component={TestPage}
    />
    <Route
      name="Random Quotes"
      path="/random"
      component={RandomFeedPage}
    />
    <Route
      name="Saved Quotes"
      path="/saved"
      component={SavedFeedPage}
    />
    {/* keep below route for references */}
    {/* <Route
      path="feed/:type"
      component={FeedPage}
    /> */}
  </Route>
);
