import React, {Component} from 'react';
import * as AUTH from '../../../services/AuthService'

class InfoSection extends Component {

    state = {
        oldPassword:'',
        newPassword:'',
        confirmPassword:'',
        ...this.props.data
    };

    handleChange = (event, key) => {
        this.setState({ [key]:event.target.value });
    };


    render() {
        return (
            <div className="m-portlet m-portlet--full-height  ">
                <div className="m-portlet__body">
                    <div className="m-card-profile">
                        <div className="m-card-profile__title m--hide">
                            Your Profile
                        </div>
                        <div className="m-card-profile__pic">
                            <div className="m-card-profile__pic-wrapper">
                                <img src={AUTH.user().avatar} alt=""/>
                            </div>
                        </div>
                        <div className="m-card-profile__details">
                            <span className="m-card-profile__name">{AUTH.user().firstName + ' ' + AUTH.user().lastName}</span>
                            <a href="" className="m-card-profile__email m-link">username</a>
                        </div>
                    </div>
                   
                    <div className="m-portlet__body-separator"></div>

                    <div className="m-widget1 m-widget1--paddingless">
                        <div className="m-widget1__item">
                            <div className="form-group m-form__group ">
                                <label className="form-control-label" htmlFor="oldPassword">Change Password</label>
                                <input type="password" placeholder="Enter Old Password"  onChange={(e) => {this.handleChange(e,'oldPassword')}} value={this.state.oldPassword} className="form-control  m-input--air form-control-danger m-input" id="oldPassword"/>
                                <div className="form-control-feedback"></div>
                            </div>
                            <div className="form-group m-form__group">
                                <input type="password" placeholder="Enter New Password"   onChange={(e) => {this.handleChange(e,'newPassword')}}  value={this.state.newPassword} className="form-control  m-input--air form-control-danger m-input" id="newPassword"/>
                                <div className="form-control-feedback"></div>
                            </div>
                            <div className="form-group m-form__group has-danger">
                                <input type="password" placeholder="Confirm Password"   onChange={(e) => {this.handleChange(e,'confirmPassword')}}  value={this.state.confirmPassword} className="form-control  m-input--air form-control-danger m-input" id="confirmPassword"/>
                                <div className="form-control-feedback"></div>
                            </div>
                        </div>

                        <div className="text-center m--margin-top-15">
                            {this.state.oldPassword !== '' && this.state.newPassword !== '' && this.state.confirmPassword !== '' &&
                            <button className="m-btn btn m-btn--air m-btn--outline-2x btn-outline-success">Change</button> }
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

InfoSection.propTypes = {};

export default InfoSection;
