import React, {Component} from 'react';
import HasRole from "../middlewares/HasRole";
import SchoolDashboard from "./SchoolDashboard";
import ParentDashboard from "./ParentDashboard";
import Profile from "../profile/Profile";

class Dashboard extends Component {
  render() {
    return (
      <div>
          <HasRole roles={['Superadministrator', 'School', 'Teacher']}>
              <SchoolDashboard/>
          </HasRole>
          <HasRole roles={['Parents']}>
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
