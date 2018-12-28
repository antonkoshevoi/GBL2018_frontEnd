import React from 'react';
import {Switch} from 'react-router';

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
import Courses from '../containers/demo-courses/Courses';
import SignUpIndex from '../containers/auth/SignUpIndex';
import SignUpParent from '../containers/auth/SignUpParent';
import SignUpPrincipal from '../containers/auth/SignUpPrincipal';
import NotFoundPage from '../containers/errors/404';
import Route from '../containers/routing/Route';
import Profile from "../containers/profile/Profile";
import SchoolProfile from "../containers/profile/SchoolProfile";
import StudentReports from "../containers/reports/Students";
import Store from "../containers/store/Store";
import Details from "../containers/store/Details";
import Products from "../containers/store/Products";
import Checkout from "../containers/store/checkout/Checkout";
import PayPalReturnContainer from '../containers/store/payments/PayPalReturnContainer';
import PaymentSuccessContainer from '../containers/store/payments/PaymentSuccessContainer';
import PaymentStatusContainer from '../containers/store/payments/PaymentStatusContainer';
import RestoreLogin from "../containers/auth/RestoreLogin";
import UnassignedCredits from "../containers/unassigned-credits/UnassignedCredits";
import Transactions from "../containers/transactions/Transactions";

import Subscriptions from "../containers/subscriptions/Subscriptions";
import MySubscriptions from "../containers/subscriptions/MySubscriptions";
import Subscribe from "../containers/subscriptions/Subscribe";
import Subscribed from "../containers/subscriptions/Subscribed";

import ReportsDashboard from "../containers/reports/Dashboard";
import ClassRoomReportDashboard from "../containers/reports/classroom/Dashboard";
import HomeRoomReportDashboard from "../containers/reports/homeroom/Dashboard";
import InvitationDetails from '../containers/demo-courses/InvitationDetails';
import ShoppingCart from "../containers/store/ShoppingCart";
import OnlyHeadLayout from "../containers/layouts/OnlyHeadLayout";
import AutoCreate from "../containers/classrooms/AutoCreate";
import SplashContainer from "../containers/static/Splash";
import Content from "../containers/static/Content";
import Gift from "../containers/static/Gift";

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

import AcceptStudent from '../containers/parents/AcceptStudent';
import AcceptConnection from '../containers/connections/AcceptConnection';
import CreateAccount from '../containers/connections/CreateAccount';
import Connections from '../containers/connections/Connections';
import Gifts from '../containers/gifts/Gifts';

export default () => (
  <AppContainer>
    <Switch>      
      <Route exact path='/about' title='about' render={(props) => <Content {...props} page="aboutContent" /> }  />
      
      <Route exact path='/schools' title='schoolsTeachers' render={(props) => <Content {...props} page="schoolsTeachersContent" /> }  />
      <Route exact path='/terms' title='termsAndConditions' render={(props) => <Content {...props} page="termsAndConditions" /> }  />
      <Route exact path='/methodology' title="methodology" render={(props) => <Content {...props} page="methodologyContent" /> }  />
      <Route exact path='/tech-specs' title="techSpecs" render={(props) => <Content {...props} page="techSpecsContent" /> }  />
      
      <Route exact path='/privacy-policy.html' title="privacyPolicy" render={(props) => <Content {...props} page="privacyPolicyContent" /> }  />
      <Route exact path='/' title="parents" component={SplashContainer} />       
      <Route exact path='/parents' title="parents" component={SplashContainer}  />
      <Route exact path='/splash' title="parents" component={SplashContainer} />
      <Route exact path='/login' title="login" component={Login} />
      <Route exact path='/restore-login' title='restoreLogin' component={RestoreLogin} />
      <Route exact path='/signUp' title='signUp' component={SignUpIndex} />
      <Route exact path='/gift' title='sentGift' component={Gift} />
      <Route exact layout={OnlyHeadLayout} path='/signUp/parent' title='signUpParent' component={SignUpParent} />
      <Route exact layout={OnlyHeadLayout} path='/signUp/principal' title='signUpPrincipal' component={SignUpPrincipal} />
      
      <Route exact layout={OnlyHeadLayout} path='/invitations/details/:id/:hash' title='InvitationDetails' component={InvitationDetails}/>
      
      <Route exact layout={MainLayout} path='/store' title='store' component={Store}/>
      <Route exact layout={MainLayout} path='/store/details/:id' title='storeDetails' component={Details}/>
      <Route exact layout={MainLayout} path='/store/category/:category' title='store' component={Products}/>
      <Route exact layout={MainLayout} path='/store/category/:category/:subCategory' title='store' component={Store}/>
      <Route exact layout={MainLayout} path='/store/category/:category/:subCategory/:type' title='store' component={Store}/>
      <Route exact layout={MainLayout} path='/store/products/:category/:type' title='store' component={Products}/>       
      
      <Route exact layout={MainLayout} path='/students/accept/:id/:hash' title='acceptStudentRequest' component={AcceptStudent}/>
      <Route exact layout={MainLayout} path='/connections/accept/:id/:hash' title='acceptConnectionRequest' component={AcceptConnection}/>
      <Route exact layout={OnlyHeadLayout} path='/create-account/:id/:hash' title='createAccount' component={CreateAccount}/>      
      
      {/*Messages*/}
      <AuthenticatedRoute exact layout={MainLayout} path='/messages/drafts' title='draftMessages' component={DraftMessages} />
      <AuthenticatedRoute exact layout={MainLayout} path='/messages/sent' title='sentMessages' component={SentMessages} />
      <AuthenticatedRoute exact layout={MainLayout} path='/messages' title='inboxMessages' component={InboxMessages} />
      <AuthenticatedRoute exact layout={MainLayout} path='/messages/view/:id' title='viewMessage' component={ViewMessage} />
      <AuthenticatedRoute exact layout={MainLayout} path='/messages/new' title='newMessage' component={NewMessage} />
      <AuthenticatedRoute exact layout={MainLayout} path='/messages/draft/:id' title='editDraft' component={EditMessage} />
      
      <AuthenticatedRoute exact layout={MainLayout} path='/dashboard' title='dashboard' component={Dashboard}/>
      
      {/*Users*/}
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School', 'Teacher']} path='/students/list' title='students' component={Students} />
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School']} path='/students/csv' title='studentsCsv' component={StudentsBulkUpload}/>
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School']} path='/teachers/list' title='teachers' component={Teachers} />
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School']} path='/teachers/csv' title='teachersCsv' component={TeachersBulkUpload}/>
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School']} path='/administration/list' title='administrations' component={Administration} />
            
      {/*Learning areas*/}
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School', 'Teacher']} path='/homerooms/list' title='homerooms' component={Homerooms} />
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School', 'Teacher']} path='/classrooms/list' title='Classrooms' component={Classrooms} />
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School', 'Teacher']} path='/classrooms/schedule/:id' title='classroomSchedule' component={ClassroomSchedule} />
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School']} path='/homerooms/csv' title='homeroomsCsv' component={HomeroomsBulkUpload} />
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School']} path='/courses' title='demoCourses' component={Courses}/>
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator']} path='/classrooms/auto' title='classroomsAutoCreation'  component={AutoCreate}/>      
      
      {/*Subscriptions*/}
      <AuthenticatedRoute exact layout={MainLayout}     roles={['Parents']} path='/my-subscriptions' title='mySubscriptions' component={MySubscriptions} />
      <AuthenticatedRoute exact layout={OnlyHeadLayout} roles={['Parents']} path='/subscriptions' title='subscriptions' component={Subscriptions} />
      <AuthenticatedRoute exact layout={OnlyHeadLayout} roles={['Parents']} path='/subscribe/:id' title='buySubscription' component={Subscribe} />
      <AuthenticatedRoute exact layout={OnlyHeadLayout} roles={['Parents']} path='/subscribed/:id' title='subscribed' component={Subscribed} />

      {/*Reports*/}
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School', 'Teacher']} path='/reports' title='reports' component={ReportsDashboard}/>
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School', 'Teacher']} path='/reports/classrooms/:id' title='reportsClassrooms' component={ClassRoomReportDashboard}/>
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School', 'Teacher']} path='/reports/homerooms/:id' title='reportsHomerooms' component={HomeRoomReportDashboard}/>
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School', 'Teacher', 'Parents']} path='/reports/students/:id' title='reportsStudent' component={StudentReports}/>
      <AuthenticatedRoute exact layout={MainLayout} path='/my-reports' title='myReport' component={StudentReports}/>
      
      {/*S-Cap*/}
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School', 'Teacher']} path='/scap' title='sCap' component={Scap}/>
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School', 'Teacher']} path='/scap/build' title='sCapBuildTemplate' component={BuildTemplate}/>
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School', 'Teacher']} path='/scap/update/:id' title='sCapUpdateTemplate' component={EditTemplate}/>
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School', 'Teacher']} path='/scap/fill/:id' title='sCapFillTemplate' component={FillTemplate}/>
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School', 'Teacher']} path='/scap/edit-answers/:id' title='sCapEditResults' component={EditAnswers}/>
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School', 'Teacher']} path='/scap/results/:id' title='sCapResults' component={ScapResults}/>

      {/*Store*/}    
      <AuthenticatedRoute exact layout={MainLayout}     roles={['Superadministrator', 'School', 'Teacher', 'Parents']}  path='/store/shopping-cart' title='shoppingCart' component={ShoppingCart}/>
      <AuthenticatedRoute exact layout={OnlyHeadLayout} roles={['Superadministrator', 'School', 'Teacher', 'Parents']} path='/shopping/checkout/:step?' title='checkout' component={Checkout}/>
            
      {/*User*/}
      <AuthenticatedRoute exact layout={MainLayout} path='/profile' title='myProfile' component={Profile} />
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School']} path='/school-profile' title='schoolProfile' component={SchoolProfile} />
      <AuthenticatedRoute exact layout={MainLayout} roles={['Student']} path='/my-parents' title='myParents' component={Parents} />
      
      {/*Open Invoices*/}
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School', 'Teacher', 'Parents']} path='/accounts/invoices' title='openInvoices' component={ShoppingCart}/>
      {/*Unassigned Credits*/}
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School', 'Teacher', 'Parents']} path='/accounts/unassigned_credits' title='unassignedCredits' component={UnassignedCredits} />
      <AuthenticatedRoute exact layout={MainLayout} roles={['Superadministrator', 'School', 'Teacher', 'Parents']} path='/accounts/transactions' title='transactions' component={Transactions} />

      {/*Connections*/}
      <AuthenticatedRoute exact layout={MainLayout} roles={['Parents']} path='/connections' title='myConnections' component={Connections} />
      
      {/*Gifts*/}
      <AuthenticatedRoute exact layout={MainLayout} roles={['Parents']} path='/gifts' title='myGifts' component={Gifts} />
      
      {/*Payments*/}
      <Route exact path='/payments/paypal/return' component={PayPalReturnContainer} />
      <Route exact layout={MainLayout} path='/payments/success' component={PaymentSuccessContainer} />
      <Route exact layout={MainLayout} path='/payments/fail' render={(props) => <PaymentStatusContainer {...props} status="fail" /> } />
      <Route exact layout={MainLayout} path='/payments/pending' render={(props) => <PaymentStatusContainer {...props} status="pending" /> } />
      <Route exact layout={MainLayout} path='/payments/canceled' render={(props) => <PaymentStatusContainer {...props} status="canceled" /> } />     

      <Route layout={MainLayout} component={NotFoundPage} title='notFound' />
    </Switch>
  </AppContainer>
);