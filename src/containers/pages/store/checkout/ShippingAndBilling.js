import React, {Component} from 'react';
import '../../../../styles/widgets.css';
import Address from "./Address";
import ContactInfo from "./ContactInfo";
import {FormControlLabel} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';


export default class ShippingAndBilling extends Component {

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

    if (sameShipping && name === 'billingContact') {
      this._setSameShipping(form)
    }
  }


  _handleSameShipping = event => {
    const {checked} = event.target;
    this.setState({
      ...this.state,
      sameShipping: checked,
    });

    this._setSameShipping(this.state.billingContact)

  };

  _setSameShipping = (form) => {
    this.setState({
      shippingContact: form
    });
  };


  render() {
    const {billingAddress, shippingAddress, billingContact, shippingContact, sameShipping} = this.state;
    return (
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
            form={billingContact}
          />
        </div>
        <div className="col-6">
          <ContactInfo
            title='Shipping contact information'
            onChange={(form) => this._handleForm(form, 'shippingContact')}
            form={shippingContact}
            disabled={sameShipping}
          />
        </div>
        <div className="col-6">
          <Address
            title='Billing Address'
            onChange={(form) => this._handleForm(form, 'billingAddress')}
            form={billingAddress}/>
        </div>
        <div className="col-6">
          <Address
            title='Shipping Address'
            onChange={(form) => this._handleForm(form, 'shippingAddress')}
            form={shippingAddress}
          />
        </div>
      </div>
    );
  }
}
