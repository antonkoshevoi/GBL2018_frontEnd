import React, {Component} from 'react';
import '../../../../styles/widgets.css';
import Address from "./Address";
import ContactInfo from "./ContactInfo";


export default class ShippingAndBilling extends Component {

  state = {
    billingContact: {},
    shippingContact: {},
    billingAddress: {},
    shippingAddress: {},
  }

  _handleForm(form,name){
    // console.log(form);
    this.setState({
      [name]: {
        ...form
      }
    })
    console.log(this.state);
  }

  render() {
    const {billingAddress, shippingAddress} = this.state;
    return (
      <div className="row">
        <div className="col-6">
          <ContactInfo title='Billing contact information'/>
        </div>
        <div className="col-6">
          <ContactInfo title='Shipping contact information'/>
        </div>
        <div className="col-6">
          <Address title='Billing Address' onChange={(form) => this._handleForm(form,'billingAddress')} form={billingAddress}/>
        </div>
        <div className="col-6">
          <Address title='Shipping Address'  onChange={(form) => this._handleForm(form,'shippingAddress')} form={shippingAddress}/>
        </div>
      </div>
    );
  }
}
