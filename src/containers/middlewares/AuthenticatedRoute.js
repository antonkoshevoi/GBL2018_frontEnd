import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setRedirectUrl } from '../../redux/auth/actions';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { Redirect, Route } from 'react-router';

class AuthenticatedRoute extends Component {

  render () {
    const { component: Component, isLoggedIn, ...rest } = this.props;

    return <Route {...rest} render={(props) => (
      isLoggedIn
        ? <Component {...props}/>
        : <Redirect to='/login'/>
    )} />;
  }
}

AuthenticatedRoute = connect(
  (state, ownProps) => ({
    isLoggedIn: selectIsLoggedIn(state),
    currentURL: ownProps.path
  }),
  (dispatch) => ({
    setRedirectUrl: (uri) => { dispatch(setRedirectUrl(uri)); },
  })
)(AuthenticatedRoute);

export default AuthenticatedRoute;