import React, {Component} from 'react';
import ParentDashboard from "./dashboard/ParentDashboard";
import UserDashboard from "./dashboard/UserDashboard";
import HasRole from "./middlewares/HasRole";

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <HasRole role="Superintendent">
          <UserDashboard/>
        </HasRole>
        <HasRole role="Parents">
          <ParentDashboard/>
        </HasRole>
      </div>
    );
  }
}

export default Dashboard;
