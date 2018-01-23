import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';

class Info extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      changePasswordMode: false,
      passwordFields: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      }
    }
  }

  componentDidMount () {
    this.setState({
      ...this.state,
      user: this.props.user
    });
  }

  _handlePasswordModeSwitch(changePasswordMode) {
    this.setState({ changePasswordMode });
  }

  render() {
    const { user, changePasswordMode, passwordFields } = this.state;

    return (
      <div className="m-portlet ">
        <div className="m-portlet__body">
          <div className="m-card-profile">
            <div className="m-card-profile__title m--hide">
              Your Profile
            </div>
            <div className="m-card-profile__pic">
              <div className="m-card-profile__pic-wrapper">
                <img src="https://notednames.com/ImgProfile/lok_Kobe%20Bryant.jpg" alt=""/>
              </div>
            </div>
            <div className="m-card-profile__details">
              <span className="m-card-profile__name">{user.firstName} {user.lastName}</span>
              <a href="" className="m-card-profile__email m-link">{user.username}</a>
            </div>
          </div>

          <div className="m-portlet__body-separator"></div>
          <div className="text-center m--margin-top-15">
            {!changePasswordMode && <button onClick={() => {
              this._handlePasswordModeSwitch(true)
            }} className="m-btn btn m-btn--air m-btn--outline-2x btn-outline-success">Change Password</button>}
          </div>
          {changePasswordMode &&
            <div className="m-widget1 m-widget1--paddingless">
                <div className="m-widget1__item">
                  <div className="form-group m-form__group ">
                    <label className="form-control-label" htmlFor="oldPassword">Change Password</label>
                    <input type="password"
                           placeholder="Enter Old Password"
                           onChange={(e) => {this.handleChange(e, 'oldPassword')}}
                           value={passwordFields.oldPassword}
                           className="form-control  m-input--air form-control-danger m-input"
                           id="oldPassword"/>
                    <div className="form-control-feedback"></div>
                  </div>
                  <div className="form-group m-form__group">
                    <input type="password"
                           placeholder="Enter New Password"
                           onChange={(e) => {this.handleChange(e, 'newPassword')}}
                           value={passwordFields.newPassword}
                           className="form-control  m-input--air form-control-danger m-input"
                           id="newPassword"/>
                    <div className="form-control-feedback"></div>
                  </div>
                  <div className="form-group m-form__group has-danger">
                    <input type="password"
                           placeholder="Confirm Password"
                           onChange={(e) => {this.handleChange(e, 'confirmPassword')}}
                           value={passwordFields.confirmPassword}
                           className="form-control  m-input--air form-control-danger m-input"
                           id="confirmPassword"/>
                    <div className="form-control-feedback"></div>
                  </div>
                </div>

                <div className="text-center m--margin-top-15">
                    <button onClick={() => {
                      this._handlePasswordModeSwitch(false)
                    }} className="m-btn btn m-btn--air m-btn--outline-2x m--margin-right-10 btn-outline-danger">
                        Cancel
                    </button>
                    {passwordFields.oldPassword !== '' && passwordFields.newPassword !== '' && passwordFields.confirmPassword !== '' &&
                      <button className="m-btn btn m-btn--air m-btn--outline-2x btn-outline-success">
                          Change
                      </button>}
                </div>
            </div>}
          </div>
      </div>
    );
  }
}

export default Info;
