import React, { Component } from 'react';
import './App.css';
import './theme/vendor/vendors.bundle.css';
import './theme/style.bundle.css';
// import './theme/vendor/vendors.bundle';
// import './theme/scripts.bundle';

import Routing from './Routing';

import Header from "./components/layouts/Header";

class App extends Component {
  render() {
    return (
      <div className="m-grid m-grid--hor m-grid--root m-page m--full-height" >
          <Header/>
          <Routing/>
      </div>
    );
  }
}

export default App;
