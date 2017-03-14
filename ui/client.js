import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory, match } from 'react-router';
import { ApolloProvider } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import * as ReactGA from 'react-ga';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Polyfill fetch
import 'isomorphic-fetch';
import './style/index.css';

import routes from './routes';
import createApolloClient from './helpers/create-apollo-client';
import getNetworkInterface from './transport';

// const wsClient = new SubscriptionClient(process.env.NODE_ENV !== 'production' ? 'ws://localhost:3010' : 'ws://api.githunt.com', {
//   reconnect: true,
// });

// const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
//   getNetworkInterface(),
//   wsClient,
// );

// Initialize Analytics
// ReactGA.initialize('UA-74643563-4');

function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

const client = createApolloClient({
  // networkInterface: networkInterfaceWithSubscriptions,
  networkInterface: getNetworkInterface(),
  initialState: window.__APOLLO_STATE__, // eslint-disable-line no-underscore-dangle
  ssrForceFetchDelay: 100,
});

render((
  <MuiThemeProvider>
    <ApolloProvider client={client}>
      <Router history={browserHistory} onUpdate={logPageView}>
        {routes}
      </Router>
    </ApolloProvider>
  </MuiThemeProvider>
), document.getElementById('content'));
