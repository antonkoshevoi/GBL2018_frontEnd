import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from "../components/layouts/Loader";
import { selectAppDomain } from '../redux/app/selectors';
import { load } from '../redux/app/actions';

class AppContainer extends Component {

  componentDidMount() {
    const { load } = this.props;
    load();
  }

  render () {
    const { appState } = this.props;
    const loaded = appState.get('loaded');

    if(loaded) {
      return this.props.children;
    }

    return (<Loader type="initial"/>);
  }
}

AppContainer = connect(
  (state, ownProps) => ({
    appState: selectAppDomain(state)
  }),
  (dispatch) => ({
    load: () => { dispatch(load()) }
  })
)(AppContainer);

export default AppContainer;