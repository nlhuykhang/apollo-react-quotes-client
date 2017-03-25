import React from 'react';
import { graphql } from 'react-apollo';

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

const withData = graphql(SAVEDFEED, {
  options: props => ({
    variables: {
      skip: props.params && props.params.skip,
      limit: props.params && props.params.limit,
    },
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
    }),
  }),
});

export default withMutations(withData(SavedFeedPage));
