import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import Info from "./sections/Info";
import Details from "./sections/Details";
import Summery from "./sections/Summery";
import { selectGetUserRequest, selectUserData } from "../../redux/user/selectors";

class Profile extends Component {

  render() {
    const { userData, getUserRequest } = this.props;

    const user = userData.toJS();    

    return (
      <div className="row">
        <div className="col-lg-3">
          <Info user={user}/>
        </div>
        <div className="col-lg-6">
          {getUserRequest.get('success') && <Details user={user} />}
        </div>
        <div className="col-lg-3">
          <Summery user={user} />
        </div>
      </div>
    );
  }
}

Profile = connect(
  (state) => ({
    userData: selectUserData(state),    
    getUserRequest: selectGetUserRequest(state)
  })
)(Profile);

export default translate('profile')(Profile);