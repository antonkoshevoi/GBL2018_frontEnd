import React, {Component} from 'react';
import '../../../../styles/widgets.css';
import {connect} from 'react-redux';
import Address from "./Address";
import ContactInfo from "./ContactInfo";
import {FormControlLabel} from 'material-ui/Form';
import {withRouter} from 'react-router-dom';
import {translate} from 'react-i18next';
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Button,
  Checkbox,
  CircularProgress
} from 'material-ui';

import {selectGetCartRecordsRequest, setShippingAndBillingRequest} from "../../../../redux/store/selectors";
import {resetSetShippingAndBilling, setShippingAndBilling} from "../../../../redux/store/actions";
import Loader from "../../../../components/layouts/Loader";


class ShippingAndBilling extends Component {

  state = {
    billingContact: {},
    shippingContact: {},
    billingAddress: {},
    shippingAddress: {},
    sameShipping: false,
  };

  _handleForm(form, name) {
    const {sameShipping} = this.state;
    this.setState({
      ...this.state,
      [name]: {
        ...form
      }
    });

    if (sameShipping ) {
      switch (name){
        case 'billingContact':
          this._setSameShipping('shippingContact',form);
          break;

        case 'billingAddress':
          this._setSameShipping('shippingAddress',form);
          break;
      }
    }
  }


  _handleSameShipping = event => {
    const {checked} = event.target;
    this.setState({
      ...this.state,
      sameShipping: checked,
    });

    this._setSameShipping('shippingContact',this.state.billingContact);
    this._setSameShipping('shippingAddress',this.state.billingAddress);

  };

  _setSameShipping = (name,form) => {
    console.log('name',name);
    console.log('form',form);
    this.setState({
      [name]: form
    });
  };

  _submitShippingAndBilling = () => {
    this.props.setShippingAndBillingData(this.state);
  };

  _renderSuccess() {
    return (
      <div style={{width: '100%', height: '270px'}}>
        <div className="alert m-alert m-alert--default">
          <h3 className="display-5 text-center">
            <i className="la la-check-circle align-middle m--margin-right-20" style={{
              color: '#7ac943',
              fontSize: '100px'
            }}/>
            Your shipping and billing info is saved. <br/> Creating PayPal request ...
          </h3>
        </div>
        <div className="row d-flex justify-content-center">
          <CircularProgress color="primary" size={80}/>
        </div>
      </div>)

  }


  render() {
    const {billingAddress, shippingAddress, billingContact, shippingContact, sameShipping, successRequest} = this.state;
    const {shippingAndBillingRequest} = this.props;
    const loading = shippingAndBillingRequest.get('loading');
    const success = shippingAndBillingRequest.get('success');
    const errors = shippingAndBillingRequest.get('errors');

    if (success){
      this.setState({
        ...this.state,
        successRequest:success
      });
      this.props.resetShippingAndBillingRequest();
      this.props.onDataSaved();
    }

    return (
      <div>
        {successRequest && this._renderSuccess()}
        {loading ? <div style={{width: '100%', height: '500px'}}><Loader/></div> :

          <form action="">
            <div className="row">
              <div className="col-12">
                <div className="col-6 d-flex justify-content-end">
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
              <div className="col-6">
                <div className="row">
                </div>
                <ContactInfo
                  title='Billing contact information'
                  onChange={(form) => this._handleForm(form, 'billingContact')}
                  name={'billingContact'}
                  errors={errors}
                  form={billingContact}
                />
              </div>
              <div className="col-6">
                <ContactInfo
                  title='Shipping contact information'
                  onChange={(form) => this._handleForm(form, 'shippingContact')}
                  name={'shippingContact'}
                  form={shippingContact}
                  errors={errors}
                  disabled={sameShipping}
                />
              </div>
              <div className="col-6">
                <Address
                  title='Billing Address'
                  onChange={(form) => this._handleForm(form, 'billingAddress')}
                  name={'billingAddress'}
                  errors={errors}
                  form={billingAddress}/>
              </div>
              <div className="col-6">
                <Address
                  title='Shipping Address'
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

  }),
  (dispatch) => ({
    setShippingAndBillingData: (data) => dispatch(setShippingAndBilling(data)),
    resetShippingAndBillingRequest: () => dispatch(resetSetShippingAndBilling())
  }),
)(ShippingAndBilling);

export default withRouter(translate('ShippingAndBilling')(ShippingAndBilling));
