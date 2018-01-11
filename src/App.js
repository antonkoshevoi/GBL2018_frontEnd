import React, { Component } from 'react';

import './App.css';
import './theme/vendor/vendors.bundle.css';
import './theme/style.bundle.css';
// import './theme/vendor/vendors.bundle';
// import './theme/scripts.bundle';
import { translate, Trans } from 'react-i18next';


import Routing from './Routing';

import Header from "./components/layouts/Header";

class App extends Component {

  render() {
    return (
        <Trans i18nKey="translation">
          <div className="m-grid m-grid--hor m-grid--root m-page m--full-height" >
              <Header/>
              <Routing/>
          </div>
        </Trans>
    );
  }
}

export default translate('translations')(App);

