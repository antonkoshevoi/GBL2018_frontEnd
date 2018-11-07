import React, {Component} from 'react';
import {translate} from 'react-i18next';
import '../../../styles/store.css'
import { NavLink } from 'react-router-dom';

class PaymentStatusContainer extends Component {
  
    _renderServices()
    {
        const { t } = this.props;
        return (
            <div className="m-pricing-table-1 m-pricing-table-1--fixed payments-services-list">
                <div className="m-pricing-table-1__items row">
                    <div className="m-pricing-table-1__item col-lg-4">
                        <div className="m-pricing-table-1__visual">
                            <div className="m-pricing-table-1__hexagon1"></div>
                            <div className="m-pricing-table-1__hexagon2"></div>
                            <span className="m-pricing-table-1__icon m--font-brand"><i className="la la-money"></i></span>
                        </div>
                        <span className="m-pricing-table-1__price">{t('openInvoices')}</span>

                        <div className="m-pricing-table-1__btn">
                            <NavLink to="/accounts/invoices" ><button type="button" className="btn m-btn--pill  btn-brand m-btn--wide m-btn--uppercase m-btn--bolder m-btn--sm">{t('open')}</button></NavLink>
                        </div>
                    </div>
                    <div className="m-pricing-table-1__item col-lg-4">
                        <div className="m-pricing-table-1__visual">
                            <div className="m-pricing-table-1__hexagon1"></div>
                            <div className="m-pricing-table-1__hexagon2"></div>
                            <span className="m-pricing-table-1__icon m--font-brand"><i className="fa fa-question-circle-o"></i></span>
                        </div>
                        <span className="m-pricing-table-1__price">{t('unassignedCredits')}</span>

                        <div className="m-pricing-table-1__btn">
                            <NavLink to="/accounts/unassigned_credits" ><button type="button" className="btn m-btn--pill  btn-brand m-btn--wide m-btn--uppercase m-btn--bolder m-btn--sm">{t('open')}</button></NavLink>
                        </div>
                    </div>
                    <div className="m-pricing-table-1__item col-lg-4">
                        <div className="m-pricing-table-1__visual">
                            <div className="m-pricing-table-1__hexagon1"></div>
                            <div className="m-pricing-table-1__hexagon2"></div>
                            <span className="m-pricing-table-1__icon m--font-brand"><i className="fa fa-history"></i></span>
                        </div>
                        <span className="m-pricing-table-1__price">{t('transactions')}</span>
                        <div className="m-pricing-table-1__btn">
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
              <i className={`la ${(status === 'pending') ? 'la-check-circle' : 'la-times'} align-middle m--margin-right-20`} style={{
                color: (status === 'pending') ? '#FFD844' : '#D2322D',
                fontSize: '100px'
              }}/>
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