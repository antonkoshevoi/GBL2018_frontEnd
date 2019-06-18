import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';

class PaymentMethods extends Component {
  static propTypes = {
    methods: PropTypes.array.isRequired
  };

  _renderMethods () {
    const { methods, onSelect, t } = this.props;

    return methods.map((method, key) => (
      <div key={key} className='col-sm-12 col-md-6 col-lg-6 col-xl-4 m-auto' onClick={() => { onSelect(method.method) }}>
        <div className='payments-widgets'>
          <div className='payment-item'>
            <span>
                <div className='paymentImg'>
                  <img alt={t(method.method)} src={method.img} width={80} className='img-responsive'/>
                </div>             
                <h4 className="m--margin-top-10">
                  {t(method.method)}
                </h4>
            </span>
          </div>
        </div>
      </div>
    ));
  }

  render() {
    const { t } = this.props;
  
    return (
        <div className="text-center">
            <legend className='m--margin-bottom-15'>{t('paymentMethod')}</legend>
            <div className='row m-row--no-padding'>
            { this._renderMethods() }
            </div>
        </div>
    );
  }
}

export default withTranslation('translations')(PaymentMethods);
