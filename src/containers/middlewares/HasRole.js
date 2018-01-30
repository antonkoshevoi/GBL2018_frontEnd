import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectUserRoles } from "../../redux/user/selectors";

class HasRole extends Component {
  static propTypes = {
    roles: PropTypes.array.isRequired
  };

  roles = [
    'Superintendent',
    'Parents',
    'Student',
    'Teacher',
    'Principal',
    'Administrator',
    'Superadministrator',
    'Affiliate',
  ]

  render () {
    const { userRoles } = this.props;

    let hasRole = false;

    userRoles.map(role => {
      if (this.props.roles.indexOf(role.get('name')) > -1) {
        hasRole = true;
      }
    })

    return hasRole ? this.props.children : null;
  }
}

HasRole = connect(
  (state) => ({
    userRoles: selectUserRoles(state),
  })
)(HasRole);

export default HasRole;