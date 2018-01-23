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

Dashboard.propTypes = {};

export default Dashboard;
