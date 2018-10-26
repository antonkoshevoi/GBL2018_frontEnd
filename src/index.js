import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';

import registerServiceWorker from './registerServiceWorker';
    
ReactDOM.render((<App />), document.getElementById('root'));

registerServiceWorker();

//Check the hover capability
const canHover = !(matchMedia('(hover: none)').matches);
if(canHover) {
  document.body.classList.add('can-hover');
}