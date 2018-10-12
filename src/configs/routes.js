import React from 'react';
import {Switch, Redirect} from 'react-router';

import AppContainer from '../containers/AppContainer';
import AuthenticatedRoute from '../containers/routing/AuthenticatedRoute';
import MainLayout from '../containers/layouts/MainLayout';

import Dashboard from '../containers/Dashboard';
import Login from '../containers/auth/Login';
import Students from '../containers/students/Students';
import Teachers from "../containers/teachers/Teachers";
import Parents from "../containers/parents/Parents";
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
import Checkout from "../containers/pages/store/checkout/Checkout";
import PayPalReturnContainer from '../containers/pages/store/payments/PayPalReturnContainer';
import PaymentSuccessContainer from '../containers/pages/store/payments/PaymentSuccessContainer';
import PaymentStatusContainer from '../containers/pages/store/payments/PaymentStatusContainer';
import RestoreLogin from "../containers/auth/RestoreLogin";
import Transactions from "../containers/pages/store/Transactions";
import UnassignedCredits from "../containers/unassigned-credits/UnassignedCredits";

import Subscriptions from "../containers/subscriptions/Subscriptions";
import MySubscriptions from "../containers/subscriptions/MySubscriptions";
import Subscribe from "../containers/subscriptions/Subscribe";
import Subscribed from "../containers/subscriptions/Subscribed";
import Payments from "../containers/subscriptions/Payments";

import ReportsDashboard from "../containers/pages/reports/Dashboard";
import ClassRoomReportDashboard from "../containers/pages/reports/classroom/Dashboard";
import HomeRoomReportDashboard from "../containers/pages/reports/homeroom/Dashboard";
import InvitationDetails from '../containers/invitations/InvitationDetails';
import ShoppingCart from "../containers/pages/store/ShoppingCart";
import OnlyHeadLayout from "../containers/layouts/OnlyHeadLayout";
import AutoCreate from "../containers/classrooms/AutoCreate";
import SplashContainer from "../containers/static/Splash";
import PrivacyPolicy from "../containers/static/PrivacyPolicy";
import About from "../containers/static/About";
import Disclaimer from "../containers/static/Disclaimer";
import ParentStudent from "../containers/static/ParentStudent";
import Publisher from "../containers/static/Publisher";
import SchoolTeacher from "../containers/static/SchoolTeacher";
import TermsService from "../containers/static/TermsService";

import Scap from "../containers/scap/Scap";
import BuildTemplate from "../containers/scap/BuildTemplate";
import EditTemplate from "../containers/scap/EditTemplate";
import FillTemplate from "../containers/scap/FillTemplate";
import EditAnswers from "../containers/scap/EditAnswers";
import ScapResults from "../containers/scap/ScapResults";

import SentMessages from '../containers/messages/SentMessages';
import InboxMessages from '../containers/messages/InboxMessages';
import DraftMessages from '../containers/messages/DraftMessages';
import NewMessage from '../containers/messages/NewMessage';
import EditMessage from '../containers/messages/EditMessage';
import ViewMessage from '../containers/messages/ViewMessage';

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
      
      {/*Messages*/}
      <AuthenticatedRoute exact layout={MainLayout} path='/messages/drafts' name='Draft Messages' component={DraftMessages} />
      <AuthenticatedRoute exact layout={MainLayout} path='/messages/sent' name='Sent Messages' component={SentMessages} />
      <AuthenticatedRoute exact layout={MainLayout} path='/messages' name='Inbox Messages' component={InboxMessages} />
      <AuthenticatedRoute exact layout={MainLayout} path='/messages/view/:id' name='View Message' component={ViewMessage} />
      <AuthenticatedRoute exact layout={MainLayout} path='/messages/new' name='New Message' component={NewMessage} />
      <AuthenticatedRoute exact layout={MainLayout} path='/messages/draft/:id' name='Edit Draft' component={EditMessage} />
      
      <AuthenticatedRoute exact layout={MainLayout} path='/dashboard' name='Dashboard' component={Dashboard}/>
      
      {/*Users*/}
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School', 'Teacher']} path='/students/list' name='Students' component={Students} />
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School']} path='/students/csv' component={StudentsBulkUpload}/>
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School']} path='/teachers/list' name='Teachers' component={Teachers} />
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School']} path='/teachers/csv' component={TeachersBulkUpload}/>
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School']} path='/administration/list' name='Administration' component={Administration} />
            
      {/*Learning areas*/}
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School', 'Teacher']} path='/homerooms/list' name='Homerooms' component={Homerooms} />
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School', 'Teacher']} path='/classrooms/list' name='Classrooms' component={Classrooms} />
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School', 'Teacher']} path='/classrooms/schedule/:id' name='ClassroomSchedule' component={ClassroomSchedule} />
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School']} path='/homerooms/csv' component={HomeroomsBulkUpload} />
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School']} path='/courses' component={Courses}/>
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator']} path='/classrooms/auto' name='AutoCreation'  component={AutoCreate}/>      
      
      {/*Subscriptions*/}
      <AuthenticatedRoute exact layout={MainLayout}     roles={['Parents']} path='/my-subscriptions' name='MySubscriptions' component={MySubscriptions} />
      <AuthenticatedRoute exact layout={OnlyHeadLayout} roles={['Parents']} path='/subscriptions' name='Subscriptions' component={Subscriptions} />
      <AuthenticatedRoute exact layout={OnlyHeadLayout} roles={['Parents']} path='/subscribe/:id' name='Subscribe' component={Subscribe} />
      <AuthenticatedRoute exact layout={OnlyHeadLayout} roles={['Parents']} path='/subscribed/:id' name='Subscribed' component={Subscribed} />
      <AuthenticatedRoute exact layout={MainLayout}     roles={['Parents']} path='/subscriptions/payments' name='Payments' component={Payments} />      

      {/*Reports*/}
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School', 'Teacher']} path='/reports' component={ReportsDashboard}/>
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School', 'Teacher']} path='/reports/classrooms/:id' name='Classroom' component={ClassRoomReportDashboard}/>
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School', 'Teacher']} path='/reports/homerooms/:id' name='Homeroom' component={HomeRoomReportDashboard}/>
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School', 'Teacher', 'Parents']} path='/reports/students/:id' name='Student' component={StudentReports}/>
      <AuthenticatedRoute exact layout={MainLayout} path='/my-reports' name='Student' component={StudentReports}/>
      
      {/*S-Cap*/}
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School', 'Teacher']} path='/scap' name='S-Cap' component={Scap}/>
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School', 'Teacher']} path='/scap/build' name='S-Cap Build Template' component={BuildTemplate}/>
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School', 'Teacher']} path='/scap/update/:id' name='S-Cap Update Template' component={EditTemplate}/>
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School', 'Teacher']} path='/scap/fill/:id' name='S-Cap Fill Template' component={FillTemplate}/>
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School', 'Teacher']} path='/scap/edit-answers/:id' name='S-Cap Edit Answers' component={EditAnswers}/>
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School', 'Teacher']} path='/scap/results/:id' name='S-Cap Results' component={ScapResults}/>

      {/*Store*/}    
      <AuthenticatedRoute exact layout={MainLayout}     roles={['Superadministrator', 'School', 'Teacher', 'Parents']}  path='/store/shopping-cart' name='Details' component={ShoppingCart}/>
      <AuthenticatedRoute exact layout={OnlyHeadLayout} roles={['Superadministrator', 'School', 'Teacher', 'Parents']} path='/shopping/checkout/:step?' name='Checkout' component={Checkout}/>
            
      {/*User*/}
      <AuthenticatedRoute exact layout={MainLayout} path='/profile' name='Profile' component={Profile} />
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School']} path='/school-profile' name='School Profile' component={SchoolProfile} />
      <AuthenticatedRoute exact layout={MainLayout} roles={['Student']} path='/my-parents' name='Parent Profile' component={Parents} />
      
      {/*Open Invoices*/}
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School', 'Teacher', 'Parents']} path='/accounts/invoices' name='Open Invoices' component={ShoppingCart}/>
      {/*Unassigned Credits*/}
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School', 'Teacher', 'Parents']} path='/accounts/unassigned_credits' name='Unassigned Credits' component={UnassignedCredits} />
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School', 'Teacher', 'Parents']} path='/accounts/transactions' name='Transactions' component={Transactions} />

      {/*Payments*/}
      <Route exact path='/payments/paypal/return' component={PayPalReturnContainer} />
      <Route exact layout={MainLayout} path='/payments/success' component={PaymentSuccessContainer} />
      <Route exact layout={MainLayout} path='/payments/fail' render={(props) => <PaymentStatusContainer {...props} status="fail" /> } />
      <Route exact layout={MainLayout} path='/payments/pending' render={(props) => <PaymentStatusContainer {...props} status="pending" /> } />
      <Route exact layout={MainLayout} path='/payments/canceled' render={(props) => <PaymentStatusContainer {...props} status="canceled" /> } />

      <Route exact path='/invitations/details/:id/:hash' component={InvitationDetails}/>

      <Route layout={MainLayout} component={NotFoundPage} />
    </Switch>
  </AppContainer>
);