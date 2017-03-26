import React from 'react';
import { graphql } from 'react-apollo';
import update from 'immutability-helper';

import Loading from '../components/Loading';
import SavedFeed from '../components/SavedFeed';

import SAVEDFEED from '../graphql/SavedFeed.graphql';
import DELETE_QUOTE_MUTATION from '../graphql/DeleteQuote.graphql';

class SavedFeedPage extends React.Component {
  static propTypes = {
    loading: React.PropTypes.bool.isRequired,
    quotes: React.PropTypes.arrayOf(
      React.PropTypes.object
    ).isRequired,
    refetch: React.PropTypes.func,
    deleteQuote: React.PropTypes.func,
  };
  state = {
    skip: 0,
    limit: 0,
  };


  render() {
    const {
      loading,
      quotes,
      deleteQuote,
    } = this.props;

    return (
      <div>
        {
          loading ?
            <Loading /> :
            <SavedFeed quotes={quotes} deleteQuote={deleteQuote} />
        }
      </div>
    );
  }
}

function removeQuoteById(quotes, removeQuoteId) {
  return quotes.filter(({ id }) => id !== removeQuoteId);
}

function getStoreAfterDeleteQuote(prevResults, action) {
  const deleteQuoteById = action.result.data.deleteQuoteById;

  return update(prevResults, {
    getSavedQuotes: {
      $apply: savedQuotes => removeQuoteById(savedQuotes, deleteQuoteById),
    },
  });
}

function savedFeedMutationReducer(prevResults, action) {
  switch (action.operationName) {
    case 'DeleteQuote':
      return getStoreAfterDeleteQuote(prevResults, action);
    default:
      return prevResults;
  }
}

function savedFeedReducer(prevResults, action, variables) {
  let newResults = prevResults;

  switch (action.type) {
    case 'APOLLO_MUTATION_RESULT':
      newResults = savedFeedMutationReducer(prevResults, action, variables);
      break;
    default:
  }

  return newResults;
}

const withData = graphql(SAVEDFEED, {
  options: props => ({
    variables: {
      skip: props.params && props.params.skip,
      limit: props.params && props.params.limit,
    },
    reducer: savedFeedReducer,
  }),
  props: ({ data: { loading, getSavedQuotes = [], refetch } }) => ({
    loading,
    quotes: getSavedQuotes,
    refetch,
  }),
});

const withMutations = graphql(DELETE_QUOTE_MUTATION, {
  props: ({ mutate }) => ({
    deleteQuote: quoteId => mutate({
      variables: {
        quoteId,
      },
      optimisticResponse: {
        deleteQuoteById: quoteId,
      },
    }),
  }),
});

export default withMutations(withData(SavedFeedPage));
