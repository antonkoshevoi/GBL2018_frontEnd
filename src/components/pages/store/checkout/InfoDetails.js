import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from "../../../ui/Card";

class InfoDetails extends Component {
  render() {
    return (
      <Card title="Address" className="CheckoutInfoDetails" icon="fa fa-map-marker">
        <div className="form-group m-form__group row">
          <label className="col-form-label col-lg-2 col-sm-12">Address *</label>
          <div className="col-lg-4 col-md-9 col-sm-12">
            <input type="text" className="form-control m-input" name="address" placeholder="Enter your address" data-toggle="m-tooltip" title="address" data-original-title="Tooltip description" aria-invalid="true"/>
              <div id="email-error" className="form-control-feedback m--hide">This field is required.</div>
          </div>
        </div>
      </Card>
      );
    }
  }

export default InfoDetails;
