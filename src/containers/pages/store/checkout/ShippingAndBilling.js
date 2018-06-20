import React, {Component} from 'react';
import '../../../../styles/widgets.css';
import {connect} from 'react-redux';
import Address from "./Address";
import {withRouter} from 'react-router-dom';
import {translate} from 'react-i18next';
import {
  FormControl,
  FormHelperText,
  FormControlLabel,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Button,
  Checkbox,
  CircularProgress
} from '@material-ui/core';

import {selectGetCartRecordsRequest, setShippingAndBillingRequest} from "../../../../redux/store/selectors";
import {getShippingAndBilling, resetSetShippingAndBilling, setShippingAndBilling} from "../../../../redux/store/actions";
import Loader from "../../../../components/layouts/Loader";
import {getCountries} from "../../../../redux/countries/actions";
import {selectRecords} from "../../../../redux/countries/selectors";
import {selectPaymentMethod} from "../../../../redux/payments/selectors";


class ShippingAndBilling extends Component {

  state = {
    billingAddress: {},
    shippingAddress: {},
    sameShipping: false
  };

  componentWillMount() {
    this.props.countries();
    this.props.getShippingAndBillingData();
  }

  componentWillReceiveProps(nextProps){
    const {shippingAndBillingRequest} = nextProps;
    const record = shippingAndBillingRequest.get('records');
    if (record && record.size){
      this.setState({
        ...this.state,
        ...record.toJS(),
      })
    }
  }

  _handleForm(form, name) {
    const {sameShipping} = this.state;
    this.setState({
      ...this.state,
      [name]: {
        ...form
      }
    });

    if (sameShipping) {
        this._setSameShipping('shippingAddress', form);
    }
  }


  _handleSameShipping = event => {
    const {checked} = event.target;
    this.setState({
      ...this.state,
      sameShipping: checked
    });
    
    this._setSameShipping('shippingAddress', this.state.billingAddress);
  };

  _setSameShipping = (name, form) => {
    this.setState({
      [name]: form
    });
  };

  _submitShippingAndBilling = () => {
    this.props.setShippingAndBillingData(this.state);
  };

  _renderType() {
    const payMethod = this.props.payMethod;
    return (<div>{payMethod}</div>)
  }

  _renderSuccess() {
    return (
      <div style={{width: '100%', height: '270px'}}>
        <div className="alert m-alert m-alert--default">
          <h3 className="display-5 text-center">
            <i className="la la-check-circle align-middle m--margin-right-20" style={{
              color: '#7ac943',
              fontSize: '100px'
            }}/>
            Your shipping and billing info is saved. <br/> Creating {this._renderType()} request ...
          </h3>
        </div>
        <div className="row d-flex justify-content-center">
          <CircularProgress color="primary" size={80}/>
        </div>
      </div>)
  }

  render() {
    const {billingAddress, shippingAddress, sameShipping, successRequest} = this.state;
    const {shippingAndBillingRequest} = this.props;
    const loading = shippingAndBillingRequest.get('loading');
    const success = shippingAndBillingRequest.get('success');
    const errors = shippingAndBillingRequest.get('errors');

    if (success) {
      this.setState({
        ...this.state,
        successRequest: success
      });      
      this.props.resetShippingAndBillingRequest();
      this.props.onDataSaved({
          billingAddressId: shippingAndBillingRequest.get('billingAddressId'),
          shippingAddressId: shippingAndBillingRequest.get('shippingAddressId')
      });
    }

    return (
      <div>
        {successRequest && this._renderSuccess()}
        {loading ? <div style={{width: '100%', height: '500px'}}><Loader/></div> :

          <form action="">
            <div className="row">
              <div className="col-12">
                <div className="d-flex justify-content-center">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sameShipping}
                        onChange={this._handleSameShipping}
                      />
                    }
                    label="same shipping information"
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <Address
                  title='Billing'
                  onChange={(form) => this._handleForm(form, 'billingAddress')}
                  name={'billingAddress'}
                  errors={errors}
                  form={billingAddress}/>                
              </div>
              <div className="col-md-6 col-sm-12"> 
                <Address
                  title='Shipping'
                  onChange={(form) => this._handleForm(form, 'shippingAddress')}
                  name={'shippingAddress'}
                  errors={errors}
                  form={shippingAddress}
                  disabled={sameShipping}
                />
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <Button
                variant="raised"
                color="primary"
                disabled={successRequest}
                onClick={this._submitShippingAndBilling}
              >
                NEXT STEP
              </Button>
            </div>
          </form>
        }
      </div>
    );
  }
}

ShippingAndBilling = connect(
  (state) => ({
    shippingAndBillingRequest: setShippingAndBillingRequest(state),
    countriesRequest: selectRecords(state),
    payMethod: selectPaymentMethod(state)

  }),
  (dispatch) => ({
    setShippingAndBillingData: (data) => dispatch(setShippingAndBilling(data)),
    getShippingAndBillingData: () => dispatch(getShippingAndBilling()),
    resetShippingAndBillingRequest: () => dispatch(resetSetShippingAndBilling()),
    countries: () => dispatch(getCountries())
  }),
)(ShippingAndBilling);

export default withRouter(translate('ShippingAndBilling')(ShippingAndBilling));
