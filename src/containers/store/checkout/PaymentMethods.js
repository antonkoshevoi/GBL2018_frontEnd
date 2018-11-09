import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';

class PaymentMethods extends Component {
  static propTypes = {
    methods: PropTypes.array.isRequired
  };

  _renderMethods () {
    const { methods } = this.props;

    return methods.map((method, key) => (
      <div key={key} className='col-sm-12 col-md-6 col-lg-6 col-xl-4' onClick={() => { method.onSelect() }}>
        <div className='m-widget24 payments-widgets'>
          <div className='m-widget24__item '>
            <span className='m--font-brand'>
              {method.loading ? (
                <CircularProgress style={{
                  width: '80px',
                  height: '80px',
                  right: '5px',
                  top: '18px',
                  color: 'inherit'
                }}/>
              ) : (
                <div className='paymentImg'>
                  <img alt={method.title} src={method.img} width={80} className='img-responsive'/>
                </div>
              )}
            </span>
            <h4 className="m--margin-left-20">
              {method.title}
            </h4>
          </div>
        </div>
      </div>
    ));
  }

  render() {
    return (
        <div className='row m-row--no-padding'>
            { this._renderMethods() }
        </div>
    );
  }
}

export default PaymentMethods;
