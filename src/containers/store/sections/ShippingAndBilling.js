import React, {Component} from 'react';
import {connect} from 'react-redux';
import Address from "./Address";
import {withTranslation} from 'react-i18next';
import {FormControlLabel, Button, Checkbox} from '@material-ui/core';
import {setShippingAndBillingRequest} from "../../../redux/store/selectors";
import {getShippingAndBilling, resetSetShippingAndBilling, setShippingAndBilling} from "../../../redux/store/actions";
import Loader from "../../../components/layouts/Loader";
import {getCountries} from "../../../redux/countries/actions";
import {selectRecords} from "../../../redux/countries/selectors";
import {selectPaymentMethod} from "../../../redux/payments/selectors";

class ShippingAndBilling extends Component {

  state = {
    billingAddress: {},
    shippingAddress: {},
    sameShipping: false,
    addressesSaved: false
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
        ...this.state, ...record.toJS(),
      })
    }
    
    if (!this.props.shippingAndBillingRequest.get('success') && shippingAndBillingRequest.get('success')) {
        this.props.resetShippingAndBillingRequest();
        this.setState({addressesSaved: true})
        this.props.onDataSaved({
            billingAddressId: shippingAndBillingRequest.get('billingAddressId'),
            shippingAddressId: shippingAndBillingRequest.get('shippingAddressId')
        });
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

  _renderSuccess() {
    const {t} = this.props;
    return (
      <div>
        <Loader/>
        <div className="alert m-alert m-alert--default">
          <h3 className="display-5 text-center">
            <i className="la la-check-circle align-middle m--margin-right-20 display-2 text-success"/>
            {t('yourShippingAndBillingInfoSaved')}. <br/> 
            {t('creatingRequest', {paymentType: this.props.payMethod})}
          </h3>
        </div>
      </div>)
  }

  render() {
    const {billingAddress, shippingAddress, sameShipping, addressesSaved} = this.state;
    const {shippingAndBillingRequest, t} = this.props;
    
    const loading = shippingAndBillingRequest.get('loading');    
    const errors = shippingAndBillingRequest.get('errors');

    return (
      <div>
        {addressesSaved && this._renderSuccess()}
        {loading && <Loader/>}    
          <form action="">
            <div className="row">
              <div className="order-2 order-md-1 offset-md-6 col-md-6 col-sm-12">                
                  <FormControlLabel
                    label={t('sameBillingInformation')}
                    control={
                      <Checkbox
                        color="primary"
                        checked={sameShipping}
                        onChange={this._handleSameShipping}
                      />
                    }
                  />
              </div>
              <div className="order-1 order-md-2 col-md-6 col-sm-12">
                <Address
                  title={t('billing')}
                  onChange={(form) => this._handleForm(form, 'billingAddress')}
                  name={'billingAddress'}
                  errors={errors}
                  form={billingAddress}/>
              </div>
              <div className="order-3 order-md-3 col-md-6 col-sm-12"> 
                <Address
                  title={t('shipping')}
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
                variant="contained"
                color="primary"
                className='mt-btn-success pull-right btn btn-success mt-btn'
                disabled={loading}
                onClick={this._submitShippingAndBilling}
              >
                {t('nextStep')}
              </Button>
            </div>
          </form>
        
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

export default withTranslation('translations')(ShippingAndBilling);
