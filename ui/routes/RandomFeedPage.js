import React from 'react';
import { graphql } from 'react-apollo';

import Loading from '../components/Loading';
import RandomFeed from '../components/RandomFeed';

import RANDOMFEED from '../graphql/RandomFeed';

class RandomFeedPage extends React.Component {
  static propTypes = {
    loading: React.PropTypes.bool.isRequired,
    quotes: React.PropTypes.arrayOf(
      React.PropTypes.object
    ).isRequired,
  };
  state = {
    skip: 0,
    limit: 0,
  };
  render() {
    const { loading, quotes } = this.props;

    return (
      <div>
        {loading ? <Loading /> : <RandomFeed quotes={quotes} />}
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
  props: ({ data: { loading, quotes } }) => ({
    loading,
    quotes,
  }),
});

export default withData(RandomFeedPage);
