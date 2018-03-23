import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import '../../../../styles/store.css'
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import * as queryString from 'query-string';
import { executePayPalPayment } from '../../../../redux/payments/actions';
import Loader from '../../../../components/layouts/Loader';
import { selectExecutePayPalPaymentRequest } from '../../../../redux/payments/selectors';
import {Button, Checkbox, CircularProgress, FormControlLabel} from "material-ui";
import {selectLoginRequest} from "../../../../redux/auth/selectors";
import {login, setRedirectUrl} from "../../../../redux/auth/actions";
import ServiceList from "../../../../components/pages/store/payment/ServiceList";

class PaymentSuccessContainer extends Component {

    constructor (props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            remember: false
        };
    }


    componentDidMount(){
        const {history} = this.props;

        if (history.action !== "PUSH") {
            history.push('/login')
        }
    }

    _handleUsernameChange = (event) => { this.setState({username: event.target.value}); };
    _handlePasswordChange = (event) => { this.setState({password: event.target.value}); };
    _handleRememberChange = (event) => { this.setState({remember: !this.state.remember}); };

    _login() {
        const { setRedirectUrl, login } = this.props;
        const { username, password, remember } = this.state;
        let pathname = '/';
        try {
            pathname = this.props.location.pathname;
        } catch (e) {}

        setRedirectUrl(pathname);
        login(username, password, remember);
    }


    render() {

    const {auth, loginRequest,history} = this.props;
    const isLoggedIn = auth.get('isLoggedIn')
    const loading = loginRequest.get('loading');
    const errors = loginRequest.get('errors');

    return (
        <div className="row">
            <div className="col-md-10 m-auto">
                <div className="m-portlet m--margin-top-35">
                    <div className="m-portlet__body">
                        <div className="alert m-alert m-alert--default">
                            <h3 className="display-4 text-center">
                                <i className="la la-check-circle align-middle m--margin-right-20" style={{
                                    color: '#7ac943',
                                    fontSize: '100px'
                                }}/>
                                Your payment was successful
                            </h3>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
  }
}

PaymentSuccessContainer = connect(
  (state) => ({
      loginRequest: selectLoginRequest(state),
      auth: state.auth
  }),
  (dispatch) => ({
      login: (username, password, remember) => { dispatch(login(username, password, remember)); },
      setRedirectUrl: (uri) => { dispatch(setRedirectUrl(uri)); },
  })
)(PaymentSuccessContainer);

export default withRouter(translate('PaymentSuccessContainer')(PaymentSuccessContainer));