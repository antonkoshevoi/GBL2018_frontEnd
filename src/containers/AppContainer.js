import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Loader} from "../components/ui/Loader";
import { selectAppDomain } from '../redux/app/selectors';
import { load } from '../redux/app/actions';
import {env} from '../configs/.env'
import SessionStorage from '../services/SessionStorage';

class AppContainer extends Component {

  state = {
    setLocation: false
  }

  componentDidMount() {
    const { load } = this.props;
    
    if (navigator.geolocation && !SessionStorage.get('userCountry')) {
        navigator.geolocation.getCurrentPosition(({coords}) => {
            this.setState({setLocation: true});            
            fetch('/geolocation.php?lat=' + coords.latitude + '&lng=' + coords.longitude + '&username=' + env.GEOLOCATION_USER)
                .then(response => response.json())
                .then(data => {
                    SessionStorage.set('userCountry', data.countryCode);
                    window.location.reload();
                });
        });
    }

    load();
  }

  render () {
    const { appState } = this.props;
    const { setLocation } = this.state;

    if (!appState.get('loaded') || setLocation) {
      return (<Loader type="initial"/>);
    }
    return this.props.children;
  }
}

export default connect(
  (state) => ({
    appState: selectAppDomain(state)
  }),
  (dispatch) => ({
    load: () => { dispatch(load()) }
  })
)(AppContainer);