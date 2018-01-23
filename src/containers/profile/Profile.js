import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import Info from "./sections/Info";
import Details from "./sections/Details";
import Summery from "./sections/Summery";
import { selectGetUserRequest, selectUserData } from "../../redux/user/selectors";
import { getUser } from "../../redux/user/actions";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }

  componentDidMount () {
    const { getUser } = this.props;

    getUser();
  }

  render() {
    const { userRequest, userData } = this.props;

    return (
      <div className="row">
        <div className="col-lg-3">
          {userRequest.get('success') && <Info user={userData}/>}
        </div>
        <div className="col-lg-6">
          {userRequest.get('success') && <Details user={userData}/>}
        </div>
        <div className="col-lg-3">
          {userRequest.get('success') && <Summery user={userData}/>}
        </div>
      </div>
    );
  }
}

Profile = connect(
  (state) => ({
    userData: selectUserData(state),
    userRequest: selectGetUserRequest(state),
  }),
  (dispatch) => ({
    getUser: () => { dispatch(getUser()) },
  })
)(Profile);

export default translate('profile')(Profile);