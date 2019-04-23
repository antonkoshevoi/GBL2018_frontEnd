import React, {Component} from 'react';
import {translate} from 'react-i18next';
import '../../../styles/store.css'
import { NavLink } from 'react-router-dom';

class PaymentStatusContainer extends Component {
  
    _renderServices()
    {
        const { t } = this.props;
        return (
            <div className="payments-services-list m-5">
                <div className="row">
                    <div className="col-md-4 col-lg-4 text-center">
                        <div className="my-5">      
                            <span className="m--font-brand display-1"><i className="la la-money display-1"></i></span>
                        </div>
                        <div className="display-5">{t('openInvoices')}</div>
                        <div className="my-5">
                            <NavLink to="/accounts/invoices" ><button type="button" className="btn m-btn--pill btn-brand m-btn--wide m-btn--uppercase m-btn--bolder m-btn--sm">{t('open')}</button></NavLink>
                        </div>
                    </div>
                    <div className="col-md-4 col-lg-4 text-center">
                        <div className="my-5">           
                            <span className="m--font-brand display-1"><i className="fa fa-question-circle-o display-1"></i></span>
                        </div>
                        <span className="display-5">{t('unassignedCredits')}</span>

                        <div className="my-5">
                            <NavLink to="/accounts/unassigned_credits" ><button type="button" className="btn m-btn--pill  btn-brand m-btn--wide m-btn--uppercase m-btn--bolder m-btn--sm">{t('open')}</button></NavLink>
                        </div>
                    </div>
                    <div className="col-md-4 col-lg-4 text-center">
                        <div className="my-5">            
                            <span className="m--font-brand display-1"><i className="fa fa-history display-1"></i></span>
                        </div>
                        <span className="display-5">{t('transactions')}</span>
                        <div className="my-5">
                            <NavLink to="/accounts/transactions" ><button type="button" className="btn m-btn--pill  btn-brand m-btn--wide m-btn--uppercase m-btn--bolder m-btn--sm">{t('open')}</button></NavLink>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _renderMessage()
    {        
        const { status, t } = this.props;
      
        return (
          <div className="alert m-alert m-alert--default">
            <h3 className="display-4 text-center">
              <i className={`display-2 la ${(status === 'pending') ? 'la-check-circle text-success' : 'la-times text-danger'} align-middle m--margin-right-20`} />
              {t(status + 'PaymentMessage')}
            </h3>
          </div>      
        );
    }

    render() {

        return (
            <div className="row">
                <div className="col-md-10 m-auto">
                  <div className="m-portlet m--margin-top-35">
                    <div className="m-portlet__body">
                      { this._renderMessage() }     
                      { this._renderServices() }
                    </div>
                  </div>
                </div>
            </div>
        );
    }
}

export default translate('translations')(PaymentStatusContainer);