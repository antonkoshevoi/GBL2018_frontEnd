import appReducer from './app/reducer';
import authReducer from './auth/reducer';
import userReducer from './user/reducer';
import signUpParentReducer from './signUpParent/reducer';
import signUpPrincipalReducer from './signUpPrincipal/reducer';
import studentsReducer from './students/reducer';
import teachersReducer from './teachers/reducer';
import administrationReducer from './administration/reducer';
import homeroomsReducer from './homerooms/reducer';
import classroomsReducer from './classrooms/reducer';
import schoolsReducer from './schools/reducer';
import messagesReducer from './messages/reducer';
import storeReducer from './store/reducer';
import paymentsReducer from './payments/reducer';
import transactionsReducer from './transactions/reducer';
import invitationsReducer from './invitations/reducer';
import studentReportsReducer from './reports/students/reducer';
import reportsDashboardReducer from './reports/dashboard/reducer';
import classroomsReportReducer from './reports/classroom/reducer';
import homeroomsReportReducer from './reports/homerooms/reducer';
import countriesReducer from './countries/reducer';
import coursesReducer from './courses/reducer';
import subscriptionsReducer from './subscriptions/reducer';
import scapReducer from './scap/reducer';
import parentsReducer from './parents/reducer';

export default {
  app: appReducer,
  auth: authReducer,
  user: userReducer,
  signUpParent: signUpParentReducer,
  signUpPrincipal: signUpPrincipalReducer,
  students: studentsReducer,
  teachers: teachersReducer,
  parents: parentsReducer,
  administration: administrationReducer,
  homerooms: homeroomsReducer,
  classrooms: classroomsReducer,
  schools: schoolsReducer,  
  messages: messagesReducer,
  store: storeReducer,
  payments: paymentsReducer,
  transactions: transactionsReducer,
  studentReportsReducer: studentReportsReducer,
  reportsDashboardReducer: reportsDashboardReducer,
  invitations: invitationsReducer,
  classroomsReport: classroomsReportReducer,
  homeroomReport: homeroomsReportReducer,
  countries: countriesReducer,
  courses: coursesReducer,
  subscriptions: subscriptionsReducer,
  scap: scapReducer
};