import {  BrowserRouter as Router, Route, Switch, Redirect  } from 'react-router-dom';

import Dashboard from './containers/Dashboard';
import Reports from './containers/Reports';
import NotFoundRoute from './containers/errors/404';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Sidebar from "./components/layouts/Sidebar";
import Wrapper from "./components/layouts/Wrapper";
import Students from "./containers/Students";
import { createHashHistory } from 'history'

// create history

class Routing extends Component {
    render() {
        return (
            <Router>
                <div className="m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body">
                <Sidebar/>
                <Wrapper>
                    <Switch>
                        <Route exact path='/dashboard' name="Dashboard"  component={Dashboard} />
                        <Route  path='/reports' name="Reports" component={Reports} />
                        <Route  path='/students' name="Students" component={Students} />
                        <Route  path='/404' name="404" component={NotFoundRoute} />
                        <Redirect to="/dashboard"/>
                    </Switch>
                </Wrapper>
                </div>
            </Router>
        );
    }
}

Routing.propTypes = {};

export default Routing;


