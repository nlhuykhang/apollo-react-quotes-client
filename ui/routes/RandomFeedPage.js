import React from 'react';
import { graphql } from 'react-apollo';

import Loading from '../components/Loading';
import RandomFeed from '../components/RandomFeed';

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

const withData = graphql(RANDOMFEED, {
  options: props => ({
    variables: {
      skip: props.params && props.params.skip,
      limit: props.params && props.params.limit,
    },
  }),
  props: ({ data: { loading, randomFeed = [], refetch } }) => ({
    loading,
    quotes: randomFeed,
    refetch,
  }),
});

function getCurrentRandomFeedData(proxy) {
  return proxy.readQuery({
    query: RANDOMFEED,
  });
}

function setRandomFeedData(proxy, newData) {
  proxy.writeQuery({
    query: RANDOMFEED,
    data: newData,
  });
}

function removeAQuoteFromRandomFeedData(randomFeedData, quote) {
  const newRandomFeed = randomFeedData.randomFeed.filter(
    ({ content }) => content !== quote.content
  );

  return Object.assign({}, randomFeedData, {
    randomFeed: newRandomFeed,
  });
}

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
      update: (proxy, { data: { saveOneQuote: savedQuote } }) => {
        const currentRandomFeedData = getCurrentRandomFeedData(proxy);

        const newRandomFeedData = removeAQuoteFromRandomFeedData(
          currentRandomFeedData,
          savedQuote
        );

        setRandomFeedData(proxy, newRandomFeedData);
      },
    }),
  }),
});

export default withMutations(withData(RandomFeedPage));
