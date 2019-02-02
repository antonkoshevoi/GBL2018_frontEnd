import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {selectUserPermissions} from "../../redux/user/selectors";

class HasPermission extends Component {
  static propTypes = {
    permissions: PropTypes.array.isRequired
  };

  render () {
    const { permissions, userPermissions } = this.props;

    let hasPermission = false;

    userPermissions.map(userPermission => {
      return permissions.map(permission => {
        if (userPermission.has(permission)) {
          hasPermission = true;
        }
        return hasPermission;
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