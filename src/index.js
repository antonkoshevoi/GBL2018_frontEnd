import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import register from './registerServiceWorker';
    
ReactDOM.render((<App />), document.getElementById('root'));

register();

const canHover = !(matchMedia('(hover: none)').matches);

if (canHover) {
  document.body.classList.add('can-hover');
}