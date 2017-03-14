import React from 'react';
import AppBar from 'material-ui/AppBar';
import styled from 'styled-components';
import Drawer from 'material-ui/Drawer';

import NavbarLink from '../components/NavbarLink';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Body = styled.div`
  background-color: rgb(237, 236, 236);
  display: flex;
  flex: 1 1 0%;
  overflow: hidden;
`;

const Content = styled.div`
  flex: 1 1 0%; padding: 2em;
`;

const drawerInnerStyle = {
  position: 'initial',
};

class Layout extends React.Component {
  state = {
    isMenuOpen: false,
  };

  toggleNavBar = () => {
    this.setState(state => ({ isMenuOpen: !state.isMenuOpen }));
  }

  render() {
    return (
      <Root>
        <AppBar
          title="Title"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={this.toggleNavBar}
        />
        <Body>
          <Drawer
            open={this.state.isMenuOpen}
            containerStyle={drawerInnerStyle}
            style={{ position: this.state.isMenuOpen ? 'initial' : 'absolute' }}
          >
            <NavbarLink
              title="Random Quotes"
              href="/random"
              active={this.props.location.pathname === '/random'}
            />
            <NavbarLink
              title="Saved Quotes"
              href="/saved"
              active={this.props.location.pathname === '/saved'}
            />
            <NavbarLink
              title="Collections"
              href="/collections"
              active={this.props.location.pathname === '/collections'}
            />
          </Drawer>
          <Content>
            {this.props.children}
          </Content>
        </Body>
      </Root>

    );
  }
}

Layout.propTypes = {
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string.isRequired,
  }).isRequired,
  params: React.PropTypes.shape({
    type: React.PropTypes.string,
  }).isRequired,
  children: React.PropTypes.element,
};

export default Layout;
