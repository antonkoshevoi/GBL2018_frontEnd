import React from 'react';
import {Switch, Redirect} from 'react-router';

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
import ClassroomSchedule from "../containers/classrooms/ClassroomSchedule";
import StudentsBulkUpload from '../containers/students/StudentsBulkUpload';
import Courses from '../containers/courses/Courses';
import SignUpIndex from '../containers/auth/SignUpIndex';
import SignUpParent from '../containers/auth/SignUpParent';
import SignUpPrincipal from '../containers/auth/SignUpPrincipal';
import NotFoundPage from '../containers/errors/404';
import Route from '../containers/routing/Route';
import Profile from "../containers/profile/Profile";
import SchoolProfile from "../containers/profile/SchoolProfile";
import StudentReports from "../containers/pages/reports/Students";
import Store from "../containers/pages/store/Store";
import Details from "../containers/pages/store/Details";
import Products from "../containers/pages/store/Products";
import OpenInvoices from "../containers/pages/store/open-invoices/OpenInvoices";
import Messages from '../containers/messages/Messages';
import Checkout from "../containers/pages/store/checkout/Checkout";
import PayPalReturnContainer from '../containers/pages/store/payments/PayPalReturnContainer';
import PaymentFailedContainer from '../containers/pages/store/payments/PaymentFailedContainer';
import PaymentSuccessContainer from '../containers/pages/store/payments/PaymentSuccessContainer';
import PaymentPendingContainer from '../containers/pages/store/payments/PaymentPendingContainer';
import RestoreLogin from "../containers/auth/RestoreLogin";
import TransactionsContainer from "../containers/pages/store/payments/TransactionsContainer";
import UnassignedCredits from "../containers/unassigned-credits/UnassignedCredits";
import PaymentCanceledContainer from '../containers/pages/store/payments/PaymentCanceledContainer';

import Subscriptions from "../containers/subscriptions/Subscriptions";
import Subscribe from "../containers/subscriptions/Subscribe";

import ReportsDashboard from "../containers/pages/reports/Dashboard";
import ClassRoomReportDashboard from "../containers/pages/reports/classroom/Dashboard";
import HomeRoomReportDashboard from "../containers/pages/reports/homeroom/Dashboard";
import InvitationDetails from '../containers/invitations/InvitationDetails';
import ShoppingCart from "../containers/pages/store/shopping-cart/ShoppingCart";
import OnlyHeadLayout from "../containers/layouts/OnlyHeadLayout";
import AutoCreate from "../containers/classrooms/AutoCreate";
import ProfileEdit from "../containers/profile/ProfileEdit";
import SplashContainer from "../containers/pages/Splash";
import PrivacyPolicy from "../containers/pages/Static/PrivacyPolicy";
import About from "../containers/pages/Static/About";
import Disclaimer from "../containers/pages/Static/Disclaimer";
import ParentStudent from "../containers/pages/Static/ParentStudent";
import Publisher from "../containers/pages/Static/Publisher";
import SchoolTeacher from "../containers/pages/Static/SchoolTeacher";
import TermsService from "../containers/pages/Static/TermsService";

export default () => (
  <AppContainer>
    <Switch>
      <Route exact path='/about' name='splash' component={About} />
      <Route exact path='/disclaimer' name='splash' component={Disclaimer} />
      <Route exact path='/parents' name='splash' component={ParentStudent} />
      <Route exact path='/publishers' name='splash' component={Publisher} />
      <Route exact path='/schools' name='splash' component={SchoolTeacher} />
      <Route exact path='/terms' name='splash' component={TermsService} />
      <Route exact path='/splash' name='splash' component={SplashContainer} />
      <Route exact path='/privacy-policy.html' name='login' component={PrivacyPolicy} />


      <Route exact path='/login' name='login' component={Login} />
      <Route exact path='/restore-login' name='restore-login' component={RestoreLogin} />
      <Route exact path='/signUp' name='signUp' component={SignUpIndex} />
      <Route exact path='/signUp/parent' name='signUpParent' component={SignUpParent} />
      <Route exact path='/signUp/principal' name='signUpPrincipal' component={SignUpPrincipal} />
      
      <Route exact layout={MainLayout} path='/store' name='Store' component={Store}/>
      <Route exact layout={MainLayout} path='/store/details/:id' name='Details' component={Details}/>
      <Route exact layout={MainLayout} path='/store/category/:category' name='Store' component={Products}/>
      <Route exact layout={MainLayout} path='/store/category/:category/:subCategory' name='Store' component={Store}/>
      <Route exact layout={MainLayout} path='/store/category/:category/:subCategory/:type' name='Store' component={Store}/>
      <Route exact layout={MainLayout} path='/store/products/:category/:type' name='Store' component={Products}/>       

      <Route exact path='/' render={() => (
        <Redirect to='/splash'/>
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
      <AuthenticatedRoute exact layout={MainLayout} path='/classrooms/schedule/:id' name='ClassroomSchedule' component={ClassroomSchedule} />
      <AuthenticatedRoute exact layout={MainLayout} path='/classrooms/auto' name='AutoCreation'  component={AutoCreate}/>
      
      <AuthenticatedRoute exact layout={MainLayout} path='/courses' component={Courses}/>
      
      <AuthenticatedRoute exact layout={MainLayout} path='/subscriptions' name='Subscriptions' component={Subscriptions} />
      <AuthenticatedRoute exact layout={MainLayout} path='/subscribe/:id' name='Subscribe' component={Subscribe} />
      

      <AuthenticatedRoute exact layout={MainLayout} path='/reports' component={ReportsDashboard}/>
      <AuthenticatedRoute exact layout={MainLayout} path='/reports/classrooms/:id' name='Classroom' component={ClassRoomReportDashboard}/>
      <AuthenticatedRoute exact layout={MainLayout} path='/reports/homerooms/:id' name='Homeroom' component={HomeRoomReportDashboard}/>
      <AuthenticatedRoute exact layout={MainLayout} path='/reports/students/:id' name='Student' component={StudentReports}/>
      <AuthenticatedRoute exact layout={MainLayout} path='/reports/students/:id/edit' name='Student' component={ProfileEdit}/>      

      {/*Store*/}    
      <AuthenticatedRoute exact layout={MainLayout} path='/store/shopping-cart' name='Details' component={ShoppingCart}/>
      <AuthenticatedRoute exact layout={OnlyHeadLayout} path='/shopping/checkout/:step?' name='Checkout' component={Checkout}/>

      {/*User*/}
      <AuthenticatedRoute exact layout={MainLayout} path='/messages/:threadId?' name='Messages' component={Messages} />
      <AuthenticatedRoute exact layout={MainLayout} path='/profile' name='Profile' component={Profile} />
      <AuthenticatedRoute exact layout={MainLayout} path='/school-profile' name='School Profile' component={SchoolProfile} />

      {/*Open Invoices*/}
      <AuthenticatedRoute exact layout={MainLayout} path='/accounts/invoices' name='OpenInvoices' component={OpenInvoices}/>
      {/*Unassigned Credits*/}
      <AuthenticatedRoute exact layout={MainLayout} path='/accounts/unassigned_credits' name='Unassigned Credits' component={UnassignedCredits} />

      {/*Payments*/}
      <Route exact path='/payments/paypal/return' component={PayPalReturnContainer} />
      <Route exact layout={MainLayout} path='/payments/success' component={PaymentSuccessContainer} />
      <Route exact layout={MainLayout} path='/payments/fail' component={PaymentFailedContainer} />
      <Route exact layout={MainLayout} path='/payments/pending' component={PaymentPendingContainer} />
      <Route exact layout={MainLayout} path='/payments/canceled' component={PaymentCanceledContainer} />

      <Route exact layout={MainLayout} path='/accounts/transactions' component={TransactionsContainer} />

      <Route exact path='/invitations/details/:id/:hash' component={InvitationDetails}/>

      <Route layout={MainLayout} component={NotFoundPage} />
    </Switch>
  </AppContainer>
);