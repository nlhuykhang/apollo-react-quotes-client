import React from 'react';
import AppBar from 'material-ui/AppBar';

import IconButton from 'material-ui/IconButton';
import ActiveAutoRenew from 'material-ui/svg-icons/action/autorenew';

function renderReloadIconButton() {
  return (
    <IconButton tooltip="Reload">
      <ActiveAutoRenew />
    </IconButton>
  );
}

function getCurrentRouteName(routes) {
  return routes[routes.length - 1].name;
}

function renderRightIcon(location) {
  switch (location.pathname) {
    case '/random':
      return renderReloadIconButton();
    default:
      return null;
  }
}

const Header = props => (
  <AppBar
    title={getCurrentRouteName(props.routes)}
    iconElementRight={renderRightIcon(props.location)}
    onLeftIconButtonTouchTap={props.toggleNavBar}
    onRightIconButtonTouchTap={props.reloadRandomFeed}
  />
);

Header.propTypes = {
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string.isRequired,
  }).isRequired,
  routes: React.PropTypes.arrayOf(React.PropTypes.object),
  toggleNavBar: React.PropTypes.func,
  reloadRandomFeed: React.PropTypes.func,
};

export default Header;
