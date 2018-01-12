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
import Login from "./containers/auth/Login";
import * as AUTH from './services/AuthService';
import Header from "./components/layouts/Header";

// create history

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true
        setTimeout(cb, 100) // fake async
    },
    signout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100)
    }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        AUTH.isLodegIn() ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
        )
    )}/>
)

class Routing extends Component {



    render() {
        console.log(AUTH.isLodegIn());
        return (
            <Router>
                <div className="m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body">
                    <Header/>

                    <Sidebar/>
                <Wrapper>
                    <Switch>
                        <Route  path='/404' name="404" component={NotFoundRoute} />
                        <Route  path='/login' name="login" component={Login} />
                        <PrivateRoute path="/reports" component={Reports}/>
                        <PrivateRoute path="/dashboard"  name="Dashboard" component={Dashboard}/>
                        <PrivateRoute path="/students"  name="Students" component={Students}/>
                        <PrivateRoute path="/teachers"  name="Students" component={Students}/>
                        <PrivateRoute path="/administration"  name="Students" component={Students}/>

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


