import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {selectUserPermissions} from "../../redux/user/selectors";

class HasPermission extends Component {
  static propTypes = {
    permissions: PropTypes.string.isRequired
  };

  render () {
    const { permissions, userPermissions } = this.props;

    // let hasPermission = false; //TODO: For now give all permissions
    let hasPermission = true;

    userPermissions.map(userPermission => {
      permissions.map(permission => {
        if (userPermission.has(permission)) {
          hasPermission = true;
        }
      })
    });

    return hasPermission ? this.props.children : null;
  }
}


HasPermission = connect(
  (state) => ({
    userPermissions: selectUserPermissions(state),
  })
)(HasPermission);

export default HasPermission;