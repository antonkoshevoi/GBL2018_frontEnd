import React, {Component} from 'react';
import HasRole from "./middlewares/HasRole";
import UserDashboard from "./dashboard/UserDashboard";
import ParentDashboard from "./dashboard/ParentDashboard";
import Profile from "./profile/Profile";

class Dashboard extends Component {
  render() {
    return (
      <div>
          <HasRole roles={[
            'Superintendent',            
            'Principal',
            'Administrator',
            'Superadministrator',
            'Teacher'
          ]}>
              <UserDashboard/>
          </HasRole>
          <HasRole roles={["Parents"]}>
              <ParentDashboard/>
          </HasRole>
          <HasRole roles={['Student']}>
              <Profile/>
          </HasRole>          
      </div>
    );
  }
}

export default Dashboard;
