import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';

import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <App />
        </MuiPickersUtilsProvider>
    ),
    document.getElementById('root'));
registerServiceWorker();

//Check the hover capability
const canHover = !(matchMedia('(hover: none)').matches);
if(canHover) {
  document.body.classList.add('can-hover');
}