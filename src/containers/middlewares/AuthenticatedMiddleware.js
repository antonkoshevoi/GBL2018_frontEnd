import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { setRedirectUrl } from '../../redux/auth/actions';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

class AuthenticatedMiddleware extends Component {

  componentDidMount() {
    const { currentURL, isLoggedIn, setRedirectUrl, redirect } = this.props;

    if (!isLoggedIn) {
      // set the current url/path for future redirection
      // then redirect
      setRedirectUrl(currentURL);
      redirect();
    }
  }

  render () {
    const { isLoggedIn } = this.props;

    if (isLoggedIn) {
      return this.props.children;
    } else {
      return null;
    }
  }
}

AuthenticatedMiddleware = connect(
  (state, ownProps) => ({
    isLoggedIn: selectIsLoggedIn(state),
    currentURL: ownProps.location.pathname
  }),
  (dispatch) => ({
    setRedirectUrl: (uri) => { dispatch(setRedirectUrl(uri)); },
    redirect: () => { dispatch(push('/login')) }
  })
)(AuthenticatedMiddleware);

export default AuthenticatedMiddleware;