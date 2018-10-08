import React, { Component } from 'react';
import { connect } from 'react-redux';
import {selectIsLoggedIn, SelectRestoreLoginFail} from '../../redux/auth/selectors';
import { Redirect, withRouter } from 'react-router-dom';
import Route from './Route';

class AuthenticatedRoute extends Component {

    redirect() {
        const { restoreLogin, location } = this.props;
        
        return <Redirect to={{pathname: (restoreLogin ? '/restore-login' : '/login'), state: { from: location } }}/>
    }    

    render () {
      const { component: Component, isLoggedIn, restoreLoginFail, location, ...rest } = this.props;      
      if (!isLoggedIn) {
          return <Route {...rest} render={() => (this.redirect())} />
      }
      return <Route {...rest} render={(props) => (<Component {...props}/>)} />
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