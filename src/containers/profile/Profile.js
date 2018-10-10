import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import Info from "./sections/Info";
import Details from "./sections/Details";
import Summery from "./sections/Summery";
import HasRole from "../middlewares/HasRole";
import { selectGetUserRequest, selectUserData } from "../../redux/user/selectors";

class Profile extends Component {

    render() {
        const {userData, getUserRequest} = this.props;

        const user = userData.toJS();

        return (
            <div className="row m--margin-top-20">
                <HasRole roles={['Superadministrator', 'School', 'Parents']}>
                    <div className="col-md-12 col-lg-9 m-auto">
                        <div className="row">
                            <div className="col-lg-4">
                                <Info user={user}/>
                            </div>
                            <div className="col-lg-8">
                                {getUserRequest.get('success') && <Details user={user} />}
                            </div>
                        </div>
                    </div>
                </HasRole>
                <HasRole roles={['Student', 'Teacher']}>
                    <div className="col-lg-3">
                        <Info user={user}/>
                    </div>
                    <div className="col-lg-6">
                        {getUserRequest.get('success') && <Details user={user} />}
                    </div>        
                    <div className="col-lg-3">
                        <Summery user={user} />
                    </div>        
                </HasRole>                
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

export default translate('translations')(Profile);