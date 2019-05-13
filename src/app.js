import React, {Component} from 'react';

import './theme/vendor/vendors.bundle.css';
import './theme/style.bundle.css';
import './styles/app.css';
import './styles/responsive.css';

import {Provider} from 'react-redux';
import {Router} from "react-router";
import Routes from './configs/routes';
import configureStore from './redux/store';
import { createBrowserHistory } from 'history'
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core';
import blue from '@material-ui/core/es/colors/blue';
import MomentUtils from '@date-io/moment';
import ApiClient from "./services/ApiClient";

const history   = createBrowserHistory();
const apiClient = new ApiClient();
const store     = configureStore(history, apiClient);

class App extends Component {

  render() {
      
    console.log('NODE_ENV: ' + process.env.NODE_ENV);
      
    const theme = createMuiTheme({
        palette: {
            primary: blue
        },
        typography: {
            useNextVariants: true
        },
        overrides: {
            MuiFormHelperText: {
                root: {
                    fontSize: '0.9rem'
                }
            },
            MuiTab: {
                label: {
                    fontSize: '1rem',
                    color: '#575962'
                }
            }
        }
    });
    
    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <MuiThemeProvider theme={theme}>
                <Router history={history}>
                    <Provider store={store}>
                        <Routes />
                    </Provider>
                </Router>
            </MuiThemeProvider>
        </MuiPickersUtilsProvider>
    );
  }
}

export default App;

