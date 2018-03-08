import React, {Component} from 'react';
import '../../../../styles/widgets.css';
import Address from "./Address";
import ContactInfo from "./ContactInfo";


export default class ShippingAndBilling extends Component {

  render() {
    return (
      <div className="row">
        <div className="col-6">
          <ContactInfo title='Billing contact information'/>
        </div>
        <div className="col-6">
          <ContactInfo title='Shipping contact information'/>
        </div>
        <div className="col-6">
          <Address title='Billing Address'/>
        </div>
        <div className="col-6">
          <Address title='Shipping Address'/>
        </div>
      </div>
    );
  }
}
