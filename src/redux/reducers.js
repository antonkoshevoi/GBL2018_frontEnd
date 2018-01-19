import appReducer from './app/reducer';
import authReducer from './auth/reducer';
import userReducer from './user/reducer';
import signUpParentReducer from './signUpParent/reducer';
import studentsReducer from './students/reducer';
import teachersReducer from './teachers/reducer';
import administrationReducer from './administration/reducer';
import homeroomsReducer from './homerooms/reducer';

export default {
  app: appReducer,
  auth: authReducer,
  user: userReducer,
  signUpParent: signUpParentReducer,
  students: studentsReducer,
  teachers: teachersReducer,
  administration: administrationReducer,
  homerooms: homeroomsReducer,
};