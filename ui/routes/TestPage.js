import React from 'react';
import { graphql } from 'react-apollo';

import Test from '../components/Test';
import Loading from '../components/Loading';

import TEST from '../graphql/Test.graphql';

class TestPage extends React.Component {
  constructor() {
    super();
    this.offset = 0;
  }

  render() {
    const { loading, test } = this.props;

    return (
      <div>
        {loading ? <Loading /> : <Test text={test} />}
      </div>
    );
  }
}

TestPage.propTypes = {
  loading: React.PropTypes.bool.isRequired,
  test: React.PropTypes.string.isRequired,
};

const withData = graphql(TEST, {
  options: props => ({
    variables: {
      text: props.params && props.params.text,
    },
  }),
  props: ({ data: { loading, test } }) => ({
    loading,
    test,
  }),
});

export default withData(TestPage);
