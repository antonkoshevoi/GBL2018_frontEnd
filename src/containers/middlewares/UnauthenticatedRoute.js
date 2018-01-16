import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { Redirect, Route } from 'react-router';

class UnauthenticatedRoute extends Component {

  render () {
    const { component: Component, isLoggedIn, ...rest } = this.props;

    return <Route {...rest} render={(props) => (
      !isLoggedIn
        ? <Component {...props}/>
        : <Redirect to='/dashboard'/>
    )} />;
  }
}

UnauthenticatedRoute = connect(
  (state) => ({
    isLoggedIn: selectIsLoggedIn(state),
  }),
  (dispatch) => ({})
)(UnauthenticatedRoute);

export default UnauthenticatedRoute;