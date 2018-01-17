import React from 'react';

import AppContainer from '../containers/AppContainer';
import AuthenticatedRoute from '../containers/middlewares/AuthenticatedRoute';
import MainLayout from '../containers/layouts/MainLayout';

import Dashboard from '../containers/Dashboard';
import Login from '../containers/auth/Login';
import Reports from '../containers/Reports';
import Students from '../containers/students/Students';
import Teachers from "../containers/teachers/Teachers";
import StudentsBulkUpload from '../containers/students/StudentsBulkUpload';
import Courses from '../containers/pages/courses/Courses';
import {Route, Switch, Redirect} from 'react-router';
import SignUpIndex from '../containers/auth/SignUpIndex';
import SignUpParent from '../containers/auth/SignUpParent';
import SignUpPrincipal from '../containers/auth/SignUpPrincipal';

export default () => (
  <AppContainer>
    <Switch>
      <Route path='/login' name='login' component={Login} />
      <Route path='/signup/types' name='signup' component={SignUpIndex} />
      <Route path='/signup/parent' name='signup_parent' component={SignUpParent} />
      <Route path='/signup/principal' name='signup_principal' component={SignUpPrincipal} />

      <MainLayout>
        <Route exact path='/' render={() => {
          return <Redirect to='/dashboard'/>
        }}/>
        <AuthenticatedRoute path='/dashboard' name='Dashboard' component={Dashboard}/>
        <AuthenticatedRoute path='/students/list' name='Students' component={Students} />
        <AuthenticatedRoute path='/students/csv' component={StudentsBulkUpload}/>
        <AuthenticatedRoute path='/teachers/list' name='Teachers' component={Teachers} />
        <AuthenticatedRoute path='/reports' component={Reports}/>
        <AuthenticatedRoute path='/courses' component={Courses}/>
      </MainLayout>
    </Switch>
  </AppContainer>
);