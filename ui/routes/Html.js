/* eslint-disable react/no-danger */

import React, { PropTypes } from 'react';

const Html = ({ content, state }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet" />
      <title>Apollo React Quotes Client</title>
    </head>
    <body style={{ margin: '0px' }}>
      <div id="content" dangerouslySetInnerHTML={{ __html: content }} />
      <script
        dangerouslySetInnerHTML={{ __html: `window.__APOLLO_STATE__=${JSON.stringify(state)};` }}
        charSet="UTF-8"
      />
      <script src="/static/bundle.js" charSet="UTF-8" />
    </body>
  </html>
);

Html.propTypes = {
  content: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Html;
