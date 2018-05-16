import React, {Component} from 'react';
import HasRole from "./middlewares/HasRole";
import UserDashboard from "./dashboard/UserDashboard";
import ParentDashboard from "./dashboard/ParentDashboard";
import TeacherDashboard from "./dashboard/TeacherDashboard";

class Dashboard extends Component {


  constructor(props){
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
          <HasRole roles={[
            'Superintendent',
            'Student',
            'Principal',
            'Administrator',
            'Superadministrator'
          ]}>
              <UserDashboard/>
          </HasRole>
          <HasRole roles={["Parents"]}>
              <ParentDashboard/>
          </HasRole>
          <HasRole roles={["Teacher"]}>
              <TeacherDashboard/>
          </HasRole>
      </div>
    );
  }
}

Dashboard.propTypes = {};

export default Dashboard;
