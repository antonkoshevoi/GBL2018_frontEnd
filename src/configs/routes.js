import React from 'react';
import { Route, Switch } from 'react-router';

import AppContainer from "../containers/AppContainer";
import AuthenticatedMiddleware from "../containers/middlewares/AuthenticatedMiddleware";
import MainLayout from '../containers/layouts/MainLayout';

import Dashboard from '../containers/Dashboard';
import Login from '../containers/auth/Login';
import Reports from '../containers/Reports';
import Students from '../containers/students/Students';
import BulkCsv from "../containers/students/BulkCsv";

export default () => (
  <AppContainer>
    <Switch>
      <Route path='/login' name='login' component={Login} />

      <AuthenticatedMiddleware>
        <MainLayout>
          <Route exact={true} path='/' name='Dashboard' component={Dashboard}/>
          <Route path='/dashboard' name='Dashboard' component={Dashboard}/>
          <Route path="/students/list"  name="Students" component={Students} />
          <Route path="/students/csv" component={BulkCsv}/>
          <Route path='/reports' component={Reports}/>
        </MainLayout>
      </AuthenticatedMiddleware>
    </Switch>
  </AppContainer>
);