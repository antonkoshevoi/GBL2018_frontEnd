import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

class InvoiceDetail extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  _renderAddress(prefix) {
    const {data} = this.props;
    const address = ['address_1', 'address_2', 'country', 'region', 'city', 'zip'];
    return address.map((item, index) =>
      (
        <Typography key={index} variant="subheading" gutterBottom>
          {data.get(`${prefix}_${item}`)}
        </Typography>
      )
    );
  }

  render() {
    const {data} = this.props;

    return (
      <div className="m-portlet m-portlet--bordered-semi">
        <div className="m-portlet__body">
          <div className="m-widget4 col-md-10 m-auto">
            <div className="row">
              <div className="col-md-6">
                <div>
                </div>
                <h3 className="m-portlet__head-text">
                  Bill to
                </h3>
                {this._renderAddress('billing')}
              </div>
              <div className="col-md-6">
                <h3 className="m-portlet__head-text">
                  Ship to
                </h3>
                {this._renderAddress('shipping')}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default InvoiceDetail;
