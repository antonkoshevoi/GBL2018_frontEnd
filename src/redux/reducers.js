import appReducer from './app/reducer';
import authReducer from './auth/reducer';
import studentsReducer from './pages/students/reducer';

export default {
  app: appReducer,
  auth: authReducer,
  students: studentsReducer
};