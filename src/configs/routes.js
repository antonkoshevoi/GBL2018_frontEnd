import React from 'react';

import AppContainer from '../containers/AppContainer';
import AuthenticatedRoute from '../containers/routing/AuthenticatedRoute';
import MainLayout from '../containers/layouts/MainLayout';

import Dashboard from '../containers/Dashboard';
import Login from '../containers/auth/Login';
import Students from '../containers/students/Students';
import Teachers from "../containers/teachers/Teachers";
import TeachersBulkUpload from '../containers/teachers/TeachersBulkUpload';
import Administration from "../containers/administration/Administration";
import Homerooms from "../containers/homerooms/Homerooms";
import HomeroomsBulkUpload from '../containers/homerooms/HomeroomsBulkUpload';
import Classrooms from "../containers/classrooms/Classrooms";
import StudentsBulkUpload from '../containers/students/StudentsBulkUpload';
import Courses from '../containers/pages/courses/Courses';
import {Switch, Redirect} from 'react-router';
import SignUpIndex from '../containers/auth/SignUpIndex';
import SignUpParent from '../containers/auth/SignUpParent';
import SignUpPrincipal from '../containers/auth/SignUpPrincipal';
import NotFoundPage from '../containers/errors/404';
import Route from '../containers/routing/Route';
import Profile from "../containers/profile/Profile";
import SchoolReports from "../containers/pages/reports/Schools";
import ClassRoomReports from "../containers/pages/reports/ClassRooms";
import StudentReports from "../containers/pages/reports/Students";
import TeacherReports from "../containers/pages/reports/Teachers";
import Store from "../containers/pages/store/Store";
import Details from "../containers/pages/store/Details";
import Products from "../containers/pages/store/Products";
import ShoppingCart from "../containers/pages/store/ShoppingCart/ShoppingCart";
import Messages from '../containers/messages/Messages';
import Checkout from "../containers/pages/store/checkout/Checkout";
import PayPalReturnContainer from '../containers/pages/store/payments/PayPalReturnContainer';
import PaymentFailedContainer from '../containers/pages/store/payments/PaymentFailedContainer';
import PaymentSuccessContainer from '../containers/pages/store/payments/PaymentSuccessContainer';
import PaymentPendingContainer from '../containers/pages/store/payments/PaymentPendingContainer';
import RestoreLogin from "../containers/auth/RestoreLogin";
import TransactionsContainer from "../containers/pages/store/payments/TransactionsContainer";
import UnassignedCredits from "../containers/unassigned-credits/UnassignedCredits";

export default () => (
  <AppContainer>
    <Switch>
      <Route exact path='/login' name='login' component={Login} />
      <Route exact path='/restore-login' name='restore-login' component={RestoreLogin} />
      <Route exact path='/signUp' name='signUp' component={SignUpIndex} />
      <Route exact path='/signUp/parent' name='signUpParent' component={SignUpParent} />
      <Route exact path='/signUp/principal' name='signUpPrincipal' component={SignUpPrincipal} />

      <Route exact path='/' render={() => (
        <Redirect to='/dashboard'/>
      )}/>
      <AuthenticatedRoute exact layout={MainLayout} path='/dashboard' name='Dashboard' component={Dashboard}/>
      <AuthenticatedRoute exact layout={MainLayout} path='/students/list' name='Students' component={Students} />
      <AuthenticatedRoute exact layout={MainLayout} path='/students/csv' component={StudentsBulkUpload}/>
      <AuthenticatedRoute exact layout={MainLayout} path='/teachers/list' name='Teachers' component={Teachers} />
      <AuthenticatedRoute exact layout={MainLayout} path='/teachers/csv' component={TeachersBulkUpload}/>
      <AuthenticatedRoute exact layout={MainLayout} path='/administration/list' name='Administration' component={Administration} />
      <AuthenticatedRoute exact layout={MainLayout} path='/homerooms/list' name='Homerooms' component={Homerooms} />
      <AuthenticatedRoute exact layout={MainLayout} path='/homerooms/csv' component={HomeroomsBulkUpload} />
      <AuthenticatedRoute exact layout={MainLayout} path='/classrooms/list' name='Classrooms' component={Classrooms} />

      <AuthenticatedRoute exact layout={MainLayout} path='/courses' component={Courses}/>

      <AuthenticatedRoute exact layout={MainLayout} path='/reports/schools' component={SchoolReports}/>
      <AuthenticatedRoute exact layout={MainLayout} path='/reports/classrooms/:id' name='Classroom' component={ClassRoomReports}/>
      <AuthenticatedRoute exact layout={MainLayout} path='/reports/students/:id' name='Student' component={StudentReports}/>
      <AuthenticatedRoute exact layout={MainLayout} path='/reports/teachers/:id' name='Student' component={TeacherReports}/>

      {/*Store*/}
      <AuthenticatedRoute exact layout={MainLayout} path='/store/category/:category' name='Store' component={Store}/>
      <AuthenticatedRoute exact layout={MainLayout} path='/store/category/:category/:subCategory' name='Store' component={Store}/>
      <AuthenticatedRoute exact layout={MainLayout} path='/store/category/:category/:subCategory/:type' name='Store' component={Store}/>
      <AuthenticatedRoute exact layout={MainLayout} path='/store/products/:type' name='Store' component={Products}/>
      <AuthenticatedRoute exact layout={MainLayout} path='/store/details/:id' name='Details' component={Details}/>

      {/*Shopping Cart*/}
      <AuthenticatedRoute exact layout={MainLayout} path='/shopping/cart' name='ShoppingCart' component={ShoppingCart}/>
      <AuthenticatedRoute exact layout={MainLayout} path='/shopping/checkout' name='Checkout' component={Checkout}/>

      {/*User*/}
      <AuthenticatedRoute exact layout={MainLayout} path='/messages' name='Messages' component={Messages} />
      <AuthenticatedRoute exact layout={MainLayout} path='/profile' name='Profile' component={Profile} />

      {/*Unassigned Credits*/}
      <AuthenticatedRoute exact layout={MainLayout} path='/accounts/unassigned_credits' name='Unassigned Credits' component={UnassignedCredits} />

      {/*Payments*/}
      <Route exact path='/payments/paypal/return' component={PayPalReturnContainer} />
      <Route exact layout={MainLayout} path='/payments/success' component={PaymentSuccessContainer} />
      <Route exact layout={MainLayout} path='/payments/fail' component={PaymentFailedContainer} />
      <Route exact layout={MainLayout} path='/payments/pending' component={PaymentPendingContainer} />

      <Route exact layout={MainLayout} path='/accounts/transactions' component={TransactionsContainer} />

      <Route layout={MainLayout} component={NotFoundPage} />
    </Switch>
  </AppContainer>
);