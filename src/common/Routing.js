import {  BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from '../containers/Dashboard';
import Reports from '../containers/Reports';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Sidebar from "../components/layouts/Header/Sidebar";
import Wrapper from "../components/layouts/Header/Wrapper";

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
                    </Switch>
                </Wrapper>
                </div>
            </Router>
        );
    }
}

Routing.propTypes = {};

export default Routing;


