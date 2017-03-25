import React from 'react';
import { graphql } from 'react-apollo';

import Loading from '../components/Loading';
import SavedFeed from '../components/SavedFeed';

import SAVEDFEED from '../graphql/SavedFeed.graphql';

class RandomFeedPage extends React.Component {
  static propTypes = {
    loading: React.PropTypes.bool.isRequired,
    quotes: React.PropTypes.arrayOf(
      React.PropTypes.object
    ).isRequired,
    refetch: React.PropTypes.func,
  };
  state = {
    skip: 0,
    limit: 0,
  };


  render() {
    const { loading, quotes } = this.props;

    return (
      <div>
        {
          loading ?
            <Loading /> :
            <SavedFeed quotes={quotes} />
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

export default withData(RandomFeedPage);
