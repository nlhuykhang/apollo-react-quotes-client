import React from 'react';

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class Quote extends React.Component {
  static propTypes = {
    quote: React.PropTypes.object
  };

  state = {};

  render() {
    const {
      quote,
    } = this.props;

    const {
      content,
      author,
    } = quote;

    return (
      <Card style={{ margin: '10px' }}>
        <CardText style={{ fontStyle: 'italic' }}>
          {content}
        </CardText>
        <CardHeader
          subtitle={author.name}
          style={{
            textAlign: 'right',
            paddingTop: '0px',
          }}
          textStyle={{
            paddingRight: '0px',
          }}
        />
      </Card>
    );
  }
}
