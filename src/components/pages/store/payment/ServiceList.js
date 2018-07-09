import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {translate} from "react-i18next";

class ServiceList extends Component {
    
    render() {
        const {t} = this.props;
        
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
                            <NavLink to="/accounts/unassigned_credits" ><button type="button" className="btn m-btn--pill  btn-brand m-btn--wide m-btn--uppercase m-btn--bolder m-btn--sm">{t('')}</button></NavLink>
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
}

export default translate("translations")(ServiceList);
