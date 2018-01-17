import appReducer from './app/reducer';
import authReducer from './auth/reducer';
import userReducer from './user/reducer';
import studentsReducer from './students/reducer';
import teachersReducer from './teachers/reducer';

export default {
  app: appReducer,
  auth: authReducer,
  user: userReducer,
  students: studentsReducer,
  teachers: teachersReducer,
};