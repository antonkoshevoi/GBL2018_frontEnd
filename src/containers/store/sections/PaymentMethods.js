import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import payPalImg from '../../../media/images/payments/paypal.png'
import creditCardImg from '../../../media/images/payments/credit_card.png'
import checkImg from '../../../media/images/payments/check.png'

const paymentMethods = [
    {                
        method: 'payPal',
        img: payPalImg
    },
    {
        method: 'creditCard',
        img: creditCardImg
    },
    {                
        method: 'check',
        img: checkImg
    }
];

class PaymentMethods extends Component {
  _renderMethods () {
    const { onSelect, t } = this.props;

    return paymentMethods.map((method, key) => (
      <div key={key} className='col-sm-12 col-md-6 col-lg-6 col-xl-6 m-auto' onClick={() => { onSelect(method.method) }}>        
          <div className='payment-method d-flex justify-content-center pointer align-items-center p-3 mb-3'>
            <div>
                <div className='paymentImg'>
                  <img alt={t(method.method)} src={method.img} width={80} className='img-responsive'/>
                </div>             
                <h4 className="mt-3">
                  {t(method.method)}
                </h4>
            </div>          
        </div>
      </div>
    ));
  }

  render() {
    const { t } = this.props;
  
    return (
        <div className="text-center">
            <legend className='mb-3'>{t('paymentMethod')}</legend>
            <div className='row m-row--no-padding'>
            { this._renderMethods() }
            </div>
        </div>
    );
  }
}

export default withTranslation('translations')(PaymentMethods);
