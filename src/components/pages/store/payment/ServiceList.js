import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";

class ServiceList extends Component {
    render() {
        return (
            <div className="m-pricing-table-1 m-pricing-table-1--fixed payments-services-list">
                <div className="m-pricing-table-1__items row">
                    <div className="m-pricing-table-1__item col-lg-4">
                        <div className="m-pricing-table-1__visual">
                            <div className="m-pricing-table-1__hexagon1"></div>
                            <div className="m-pricing-table-1__hexagon2"></div>
                            <span className="m-pricing-table-1__icon m--font-brand"><i className="la la-money"></i></span>
                        </div>
                        <span className="m-pricing-table-1__price">Open Invoices</span>

                        <div className="m-pricing-table-1__btn">
                            <NavLink to="/accounts/invoices" ><button type="button" className="btn m-btn--pill  btn-brand m-btn--wide m-btn--uppercase m-btn--bolder m-btn--sm">Open</button></NavLink>
                        </div>
                    </div>

                    <div className="m-pricing-table-1__item col-lg-4">
                        <div className="m-pricing-table-1__visual">
                            <div className="m-pricing-table-1__hexagon1"></div>
                            <div className="m-pricing-table-1__hexagon2"></div>
                            <span className="m-pricing-table-1__icon m--font-brand"><i className="fa fa-question-circle-o"></i></span>
                        </div>
                        <span className="m-pricing-table-1__price">Unassigned Credits</span>

                        <div className="m-pricing-table-1__btn">
                            <NavLink to="/accounts/unassigned_credits" ><button type="button" className="btn m-btn--pill  btn-brand m-btn--wide m-btn--uppercase m-btn--bolder m-btn--sm">Open</button></NavLink>

                        </div>
                    </div>

                    <div className="m-pricing-table-1__item col-lg-4">
                        <div className="m-pricing-table-1__visual">
                            <div className="m-pricing-table-1__hexagon1"></div>
                            <div className="m-pricing-table-1__hexagon2"></div>
                            <span className="m-pricing-table-1__icon m--font-brand"><i className="fa fa-history"></i></span>
                        </div>
                        <span className="m-pricing-table-1__price">Transactions</span>

                        <div className="m-pricing-table-1__btn">
                            <NavLink to="/accounts/transactions" ><button type="button" className="btn m-btn--pill  btn-brand m-btn--wide m-btn--uppercase m-btn--bolder m-btn--sm">Open</button></NavLink>

                        </div>
                    </div>


                </div>
            </div>
        );
    }
}

ServiceList.propTypes = {};

export default ServiceList;
