import React from 'react';

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ContentSave from 'material-ui/svg-icons/content/save';

export default class Quote extends React.Component {
  static propTypes = {
    quote: React.PropTypes.object,
    saveQuote: React.PropTypes.func,
    isShowSaveButton: React.PropTypes.bool,
  };

  state = {};

  onTouchSaveQuote = () => {
    const {
      quote,
    } = this.props;

    const {
      content,
      author,
    } = quote;

    this.props.saveQuote({
      content,
      authorName: author.name,
    });
  }

  renderSaveButton() {
    if (this.props.isShowSaveButton) {
      return (
        <IconButton
          onTouchTap={this.onTouchSaveQuote}
          tooltip="Save Quote"
          style={{
            padding: '0px',
          }}
        >
          <ContentSave />
        </IconButton>
      );
    }

    return null;
  }

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
            paddingBottom: '5px',
          }}
          textStyle={{
            paddingRight: '0px',
          }}
        />
        <CardActions
          style={{
            padding: '0px',
          }}
        >
          {this.renderSaveButton()}
        </CardActions>
      </Card>
    );
  }
}
