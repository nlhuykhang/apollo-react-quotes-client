import React from 'react';
import { Link } from 'react-router';
import MenuItem from 'material-ui/MenuItem';

const NavbarLink = ({ title, href, active = false }) => (
  <Link
    to={href}
    style={{
      textDecoration: 'none',
    }}
  >
    <MenuItem
      primaryText={title}
      style={{
        background: active ? 'rgba(0, 0, 0, 0.2)' : 'none',
      }}
    />
  </Link>
);

NavbarLink.propTypes = {
  title: React.PropTypes.string,
  href: React.PropTypes.string,
  active: React.PropTypes.bool,
};

export default NavbarLink;
