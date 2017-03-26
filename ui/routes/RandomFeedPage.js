import React from 'react';
import { graphql } from 'react-apollo';
import update from 'immutability-helper';

import Loading from '../components/Loading';
import RandomFeed from '../components/RandomFeed';

import reducerFactory from '../helpers/reducerFactory';

import RANDOMFEED from '../graphql/RandomFeed.graphql';
import SAVE_QUOTE_MUTATION from '../graphql/SaveQuote.graphql';

class RandomFeedPage extends React.Component {
  static propTypes = {
    loading: React.PropTypes.bool.isRequired,
    quotes: React.PropTypes.arrayOf(
      React.PropTypes.object
    ).isRequired,
    refetch: React.PropTypes.func,
    randomFeedRefetchNumber: React.PropTypes.number,
    saveQuote: React.PropTypes.func,
  };
  state = {
    skip: 0,
    limit: 0,
  };

  componentWillReceiveProps(nextProps) {
    if (this.isRequiredRefetch(
      nextProps.randomFeedRefetchNumber
    )) {
      this.props.refetch();
    }
  }

  isRequiredRefetch = newFactor => this.props.randomFeedRefetchNumber !== newFactor

  render() {
    const {
      loading,
      quotes,
      saveQuote,
    } = this.props;

    return (
      <div>
        {
          loading ?
            <Loading /> :
            <RandomFeed quotes={quotes} saveQuote={saveQuote} />
        }
      </div>
    );
  }
}

function removeSavedQuoteFromRandomQuotes(randomQuotes, savedQuote) {
  return randomQuotes.filter(quote => quote.content !== savedQuote.content);
}

function getStoreAfterSaveOneQuote(prevResults, action) {
  const savedQuote = action.result.data.saveOneQuote;
  return update(prevResults, {
    randomFeed: {
      $apply: randomQuotes => removeSavedQuoteFromRandomQuotes(randomQuotes, savedQuote),
    },
  });
}

function randomFeedMutationReducer(prevResults, action) {
  switch (action.operationName) {
    case 'SaveOneQuote':
      return getStoreAfterSaveOneQuote(prevResults, action);
    default:
      return prevResults;
  }
}

const withData = graphql(RANDOMFEED, {
  options: props => ({
    variables: {
      skip: props.params && props.params.skip,
      limit: props.params && props.params.limit,
    },
    reducer: reducerFactory({
      mutationReducer: randomFeedMutationReducer,
    }),
  }),
  props: ({ data: { loading, randomFeed = [], refetch } }) => ({
    loading,
    quotes: randomFeed,
    refetch,
  }),
});

const withMutations = graphql(SAVE_QUOTE_MUTATION, {
  props: ({ mutate }) => ({
    saveQuote: quote => mutate({
      variables: {
        quote,
      },
      optimisticResponse: {
        saveOneQuote: {
          id: -1,
          content: quote.content,
          author: {
            name: quote.authorName,
          },
          votes: 0,
        },
      },
    }),
  }),
});

export default withMutations(withData(RandomFeedPage));
