import React, { Component } from 'react';
import { connect } from 'react-redux';
import {selectIsLoggedIn, SelectRestoreLoginFail} from '../../redux/auth/selectors';
import { Redirect, withRouter } from 'react-router-dom';
import Route from './Route';

class AuthenticatedRoute extends Component {

  render () {
        const { component: Component, isLoggedIn, restoreLoginFail, location, ...rest } = this.props;

      return <Route {...rest} render={(props) => (
      isLoggedIn ? (<Component {...props}/>) : restoreLoginFail ? (
        <Redirect to={{
          pathname: '/restore-login',
          state: { from: location }
        }}/>
      ) : (
          <Redirect to={{
              pathname: '/login',
              state: { from: location }
          }}/>
      )
    )}/>;
  }
}

AuthenticatedRoute = connect(
  (state, ownProps) => ({
        isLoggedIn: selectIsLoggedIn(state),
        restoreLoginFail: SelectRestoreLoginFail(state)
  }),
  (dispatch) => ({})
)(AuthenticatedRoute);

export default withRouter(AuthenticatedRoute);