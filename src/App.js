import React, { Component } from 'react';

import './App.css';
import './theme/vendor/vendors.bundle.css';
import './theme/style.bundle.css';
// import './theme/vendor/vendors.bundle';
// import './theme/scripts.bundle';
import { translate, Trans } from 'react-i18next';


import Routing from './Routing';

import Header from "./components/layouts/Header";
import {Scrollbars} from "react-custom-scrollbars";

class App extends Component {

  render() {
    return (
        <Trans i18nKey="translation">
          <Scrollbars         autoHide
                              autoHideTimeout={1000}
                              autoHideDuration={2000}
                              universal={true}
                              className="m-grid m-grid--hor m-grid--root m-page m--full-height" >
              <Routing/>
          </Scrollbars>
        </Trans>
    );
  }
}

export default translate('translations')(App);

