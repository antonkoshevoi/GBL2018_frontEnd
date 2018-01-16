import React from 'react';
import { Route, Switch } from 'react-router';

import AppContainer from "../containers/AppContainer";
import AuthenticatedRoute from "../containers/middlewares/AuthenticatedRoute";
import UnauthenticatedRoute from '../containers/middlewares/UnauthenticatedRoute';
import MainLayout from '../containers/layouts/MainLayout';

import Dashboard from '../containers/Dashboard';
import Login from '../containers/auth/Login';
import Reports from '../containers/Reports';
import Students from '../containers/students/Students';
import BulkCsv from "../containers/students/BulkCsv";
import Courses from "../containers/pages/courses/Courses";
import {Redirect} from "react-router-dom";
import SignUpIndex from "../containers/auth/SignUpIndex";
import SignUpParent from "../containers/auth/SignUpParent";
import SignUpPrincipal from "../containers/auth/SignUpPrincipal";

export default () => (
  <AppContainer>
    <Switch>
      <Route path='/login' name='login' component={Login} />
      <Route path='/signup/types' name='signup' component={SignUpIndex} />
      <Route path='/signup/parent' name='signup_parent' component={SignUpParent} />
      <Route path='/signup/principal' name='signup_principal' component={SignUpPrincipal} />

      <MainLayout>
        <Route exact path="/" render={() => {
          return <Redirect to="/dashboard"/>
        }} />
        <Route path='/dashboard' name='Dashboard' component={Dashboard}/>
        <Route path="/students/list" name="Students" component={Students} />
        <Route path="/students/csv" component={BulkCsv}/>
        <Route path='/reports' component={Reports}/>
        <Route path='/courses' component={Courses}/>
      </MainLayout>
    </Switch>
  </AppContainer>
);