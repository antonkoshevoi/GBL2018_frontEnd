import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { Redirect, withRouter } from 'react-router-dom';
import Route from './Route';

class AuthenticatedRoute extends Component {

  render () {
    const { component: Component, isLoggedIn, location, ...rest } = this.props;

    return <Route {...rest} render={(props) => (
      isLoggedIn ? (
        <Component {...props}/>
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
    isLoggedIn: selectIsLoggedIn(state)
  }),
  (dispatch) => ({})
)(AuthenticatedRoute);

export default withRouter(AuthenticatedRoute);