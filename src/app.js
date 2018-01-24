import React, { Component } from 'react';

import './theme/vendor/vendors.bundle.css';
import './theme/style.bundle.css';
import './app.css';
import './styles/responsive.css';

import { translate } from 'react-i18next';
import { Provider } from 'react-redux';
import { Router } from "react-router";

import Routes from './configs/routes';
import configureStore from './redux/store';
import createHistory from 'history/createBrowserHistory'

import ApiClient from "./services/ApiClient";
import LiveService from "./services/LiveService";

const history = createHistory();
const apiClient = new ApiClient();
const liveService = new LiveService();
const store = configureStore(history, apiClient);

class App extends Component {

  render() {
    return (
      <Router history={history}>
        <Provider store={store}>
          <Routes />
        </Provider>
      </Router>
    );
  }
}

export default translate('translations')(App);

