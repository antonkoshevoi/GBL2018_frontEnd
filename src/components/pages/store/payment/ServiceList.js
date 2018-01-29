import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";

class ServiceList extends Component {
    render() {
        return (
            <div class="m-pricing-table-1 m-pricing-table-1--fixed payments-services-list">
                <div class="m-pricing-table-1__items row">
                    <div class="m-pricing-table-1__item col-lg-4">
                        <div class="m-pricing-table-1__visual">
                            <div class="m-pricing-table-1__hexagon1"></div>
                            <div class="m-pricing-table-1__hexagon2"></div>
                            <span class="m-pricing-table-1__icon m--font-brand"><i class="flaticon-piggy-bank"></i></span>
                        </div>
                        <span class="m-pricing-table-1__price">Open Invoices</span>

                        <div class="m-pricing-table-1__btn">
                            <NavLink to="/invoices" ><button type="button" class="btn m-btn--pill  btn-brand m-btn--wide m-btn--uppercase m-btn--bolder m-btn--sm">Open</button></NavLink>
                        </div>
                    </div>

                    <div class="m-pricing-table-1__item col-lg-4">
                        <div class="m-pricing-table-1__visual">
                            <div class="m-pricing-table-1__hexagon1"></div>
                            <div class="m-pricing-table-1__hexagon2"></div>
                            <span class="m-pricing-table-1__icon m--font-brand"><i class="fa fa-question-circle-o"></i></span>
                        </div>
                        <span class="m-pricing-table-1__price">Unassigned Credits</span>

                        <div class="m-pricing-table-1__btn">
                            <NavLink to="/unassigned/credits" ><button type="button" class="btn m-btn--pill  btn-brand m-btn--wide m-btn--uppercase m-btn--bolder m-btn--sm">Open</button></NavLink>

                        </div>
                    </div>

                    <div class="m-pricing-table-1__item col-lg-4">
                        <div class="m-pricing-table-1__visual">
                            <div class="m-pricing-table-1__hexagon1"></div>
                            <div class="m-pricing-table-1__hexagon2"></div>
                            <span class="m-pricing-table-1__icon m--font-brand"><i class="fa fa-history"></i></span>
                        </div>
                        <span class="m-pricing-table-1__price">Transactions</span>

                        <div class="m-pricing-table-1__btn">
                            <NavLink to="/transactions" ><button type="button" class="btn m-btn--pill  btn-brand m-btn--wide m-btn--uppercase m-btn--bolder m-btn--sm">Open</button></NavLink>

                        </div>
                    </div>


                </div>
            </div>
        );
    }
}

ServiceList.propTypes = {};

export default ServiceList;
