import React from 'react';

import Quote from './Quote';

const SavedFeed = ({ quotes, deleteQuote }) => (
  <div>
    {quotes.map((quote, i) =>
      <Quote
        key={i}
        quote={quote}
        deleteQuote={deleteQuote}
        isShowDeleteButton
      />
    )}
  </div>
);

SavedFeed.propTypes = {
  quotes: React.PropTypes.arrayOf(
    React.PropTypes.object
  ),
  deleteQuote: React.PropTypes.func,
};


export default SavedFeed;
