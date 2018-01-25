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
import storeReducer from './store/reducer';

export default {
  app: appReducer,
  auth: authReducer,
  user: userReducer,
  signUpParent: signUpParentReducer,
  signUpPrincipal: signUpPrincipalReducer,
  students: studentsReducer,
  teachers: teachersReducer,
  administration: administrationReducer,
  homerooms: homeroomsReducer,
  classrooms: classroomsReducer,
  schools: schoolsReducer,
  store: storeReducer,
};