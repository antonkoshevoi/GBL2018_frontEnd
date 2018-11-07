import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import Info from "./sections/Info";
import Details from "./sections/Details";
import Summery from "./sections/Summery";
import HasRole from "../middlewares/HasRole";
import Alerts from "../dashboard/sections/Alerts";
import { selectGetUserRequest, selectUserData } from "../../redux/user/selectors";

class Profile extends Component {

    render() {
        const {userData, getUserRequest} = this.props;

        const user = userData.toJS();

        return (
            <div className="m--margin-15">
                <HasRole roles={['Student']}>
                    <Alerts />
                </HasRole>
                <div className="row">                        
                    <HasRole roles={['Superadministrator', 'School', 'Parents']}>
                        <div className="col-sm-12 col-md-12 col-lg-9 m-auto">
                            <div className="row">
                                <div className="col-sm-12 col-md-4 col-sm-12 col-lg-4">
                                    <Info user={user} />
                                </div>
                                <div className="col-sm-12 col-md-8 col-sm-12 col-lg-8">
                                    {getUserRequest.get('success') && <Details user={user} />}
                                </div>
                            </div>
                        </div>
                    </HasRole>
                    <HasRole roles={['Student', 'Teacher']}>
                        <div className="col-sm-12 col-md-3 col-lg-3">
                            <Info user={user}/>
                        </div>
                        <div className="col-sm-12 col-md-5 col-lg-6">
                            {getUserRequest.get('success') && <Details user={user} />}
                        </div>        
                        <div className="col-sm-12 col-md-4 col-lg-3">
                            <Summery user={user} />
                        </div>        
                    </HasRole>                
                </div>
            </div>);
    }
}

Profile = connect(
    (state) => ({
        userData: selectUserData(state),
        getUserRequest: selectGetUserRequest(state)
    })
)(Profile);

export default translate('translations')(Profile);