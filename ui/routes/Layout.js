import React from 'react';
import styled from 'styled-components';
import Drawer from 'material-ui/Drawer';

import NavbarLink from '../components/NavbarLink';
import Header from '../components/Header';

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
    randomFeedRefetchNumber: 0,
  };

  toggleNavBar = () => {
    this.setState(state => ({ isMenuOpen: !state.isMenuOpen }));
  }

  reloadRandomFeed = () => {
    this.setState(() => ({ randomFeedRefetchNumber: new Date().getTime() }));
  }

  isRandomFeed = component => component.props.location.pathname === '/random'

  isRouteActive = path => path === this.props.location.pathname

  renderChildren() {
    return React.Children.map(this.props.children, (child) => {
      if (this.isRandomFeed(child)) {
        return React.cloneElement(child, {
          randomFeedRefetchNumber: this.state.randomFeedRefetchNumber,
        });
      }

      return child;
    });
  }

  render() {
    const {
      routes,
      location,
    } = this.props;

    return (
      <Root>
        <Header
          location={location}
          routes={routes}
          toggleNavBar={this.toggleNavBar}
          reloadRandomFeed={this.reloadRandomFeed}
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
              active={this.isRouteActive('/random')}
            />
            <NavbarLink
              title="Saved Quotes"
              href="/saved"
              active={this.isRouteActive('/saved')}
            />
            <NavbarLink
              title="Collections"
              href="/collections"
              active={this.isRouteActive('/collections')}
            />
          </Drawer>
          <Content>
            {this.renderChildren()}
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
  routes: React.PropTypes.arrayOf(React.PropTypes.object),
};

export default Layout;
