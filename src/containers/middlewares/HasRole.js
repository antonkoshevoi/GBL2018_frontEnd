import { Component } from 'react';
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
    'Superadministrator'
  ]

  render () {
    let { userRoles, roles, onFail } = this.props;

    let hasRole = false;
    
    if (roles.indexOf('School') > -1) {
        roles.push('Superintendent', 'Principal', 'Administrator');
    }

    userRoles.map(role => {
        if (roles.indexOf(role.get('name')) > -1) {
            hasRole = true;
        }
        return null; 
    });

    return hasRole ? this.props.children : (onFail || null);
  }
}

export default  connect(
  (state) => ({
    userRoles: selectUserRoles(state),
  })
)(HasRole);