import React from 'react';

import Quote from './Quote';

const RandomFeed = ({ quotes, saveQuote }) => (
  <div>
    {quotes.map((quote, i) =>
      <Quote
        key={i}
        quote={quote}
        saveQuote={saveQuote}
        isShowSaveButton
      />
    )}
  </div>
);

RandomFeed.propTypes = {
  quotes: React.PropTypes.arrayOf(
    React.PropTypes.object
  ),
  saveQuote: React.PropTypes.func,
};


export default RandomFeed;
