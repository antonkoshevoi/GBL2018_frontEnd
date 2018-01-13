import React, { Component } from 'react';

import './App.css';
import './theme/vendor/vendors.bundle.css';
import './theme/style.bundle.css';
// import './theme/vendor/vendors.bundle';
// import './theme/scripts.bundle';
import { translate, Trans } from 'react-i18next';
import { Provider } from 'react-redux';

import Routing from './Routing';
import store from './store';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Trans i18nKey="translation">
          <div className="m-grid m-grid--hor m-grid--root m-page m--full-height">
              <Routing/>
          </div>
        </Trans>
      </Provider>
    );
  }
}

export default translate('translations')(App);

