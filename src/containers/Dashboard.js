import React, {Component} from 'react';
import HasRole from "./middlewares/HasRole";
import UserDashboard from "./dashboard/UserDashboard";
import ParentDashboard from "./dashboard/ParentDashboard";

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
            'Teacher',
            'Principal',
            'Administrator',
            'Superadministrator',
            'Affiliate',
          ]}>
              <UserDashboard/>
          </HasRole>
          <HasRole roles={["Parents"]}>
              <ParentDashboard/>
          </HasRole>
      </div>
    );
  }
}

Dashboard.propTypes = {};

export default Dashboard;
