import React, { Component } from 'react';
import { connect } from 'react-redux';
import { refreshLogin } from '../redux/auth/actions';
import { selectAuthDomain } from '../redux/auth/selectors';

class AppContainer extends Component {

  componentDidMount() {
    const { refreshLogin } = this.props;
    refreshLogin();
  }

  render () {
    const { auth } = this.props;
    const loading = !auth.get('initialLoad');

    console.log(loading);
    if(loading) {
      return (<div>loaaaaaaaaaaaaaaaaaaaaaaaading.........</div>);
    }

    return this.props.children;
  }
}

AppContainer = connect(
  (state, ownProps) => ({
    auth: selectAuthDomain(state)
  }),
  (dispatch) => ({
    refreshLogin: () => { dispatch(refreshLogin()) }
  })
)(AppContainer);

export default AppContainer;