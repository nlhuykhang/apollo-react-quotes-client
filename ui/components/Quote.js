import React from 'react';

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ContentSave from 'material-ui/svg-icons/content/save';
import ActionDelete from 'material-ui/svg-icons/action/delete';

export default class Quote extends React.Component {
  static propTypes = {
    quote: React.PropTypes.object,
    saveQuote: React.PropTypes.func,
    deleteQuote: React.PropTypes.func,
    isShowSaveButton: React.PropTypes.bool,
    isShowDeleteButton: React.PropTypes.bool,
  };

  state = {};

  onTouchSaveQuote = () => {
    const {
      quote,
      saveQuote,
    } = this.props;

    const {
      content,
      author,
    } = quote;

    saveQuote({
      content,
      authorName: author.name,
    });
  }

  onTouchDeleteQuote = () => {
    const {
      quote,
      deleteQuote,
    } = this.props;

    deleteQuote(quote.id);
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

  renderDeleteButton() {
    if (this.props.isShowDeleteButton) {
      return (
        <IconButton
          onTouchTap={this.onTouchDeleteQuote}
          tooltip="Delete Quote"
          style={{
            padding: '0px',
          }}
        >
          <ActionDelete />
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
          {this.renderDeleteButton()}
        </CardActions>
      </Card>
    );
  }
}
