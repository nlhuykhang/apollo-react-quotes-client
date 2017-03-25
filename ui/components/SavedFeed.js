import React from 'react';

import Quote from './Quote';

const RandomFeed = ({ quotes }) => (
  <div>
    {quotes.map((quote, i) => <Quote key={i} quote={quote} />)}
  </div>
);

RandomFeed.propTypes = {
  quotes: React.PropTypes.arrayOf(
    React.PropTypes.object
  ),
};


export default RandomFeed;
