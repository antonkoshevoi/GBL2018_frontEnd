import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import Info from "./sections/Info";
import Details from "./sections/Details";
import Summery from "./sections/Summery";
import { selectGetUserRequest, selectUserData } from "../../redux/user/selectors";
import { selectSchools } from "../../redux/schools/selectors";
import { getSchools } from "../../redux/schools/actions";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount () {
    const { getSchools } = this.props;

    getSchools();
  }

  render() {
    const { userData, schoolsData, getUserRequest } = this.props;

    const user = userData.toJS();
    const schools = schoolsData.toJS();

    return (
      <div className="row">
        <div className="col-lg-3">
          {getUserRequest.get('success') && <Info user={user}/>}
        </div>
        <div className="col-lg-6">
          {getUserRequest.get('success') && <Details user={user} schools={schools}/>}
        </div>
        <div className="col-lg-3">
          {getUserRequest.get('success') && <Summery user={user} schools={schools} homerooms={user.homerooms}/>}
        </div>
      </div>
    );
  }
}

Profile = connect(
  (state) => ({
    userData: selectUserData(state),
    schoolsData: selectSchools(state),
    getUserRequest: selectGetUserRequest(state),
  }),
  (dispatch) => ({
    getSchools: () => { dispatch(getSchools()) },
  })
)(Profile);

export default translate('profile')(Profile);