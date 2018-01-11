import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {translate} from "react-i18next";

class StudentsList extends Component {
    render() {
        return (
            <div className="m-portlet m-portlet--mobile">
                <div className="m-portlet__head">
                    <div className="m-portlet__head-caption">
                        <div className="m-portlet__head-title">
                            <h3 className="m-portlet__head-text">
                                Students
                            </h3>
                        </div>
                    </div>
                    <div className="m-portlet__head-tools">
                        <ul className="m-portlet__nav">
                            <li className="m-portlet__nav-item">
                                <div className="m-dropdown m-dropdown--inline m-dropdown--arrow m-dropdown--align-right m-dropdown--align-push" data-dropdown-toggle="hover" aria-expanded="true">
                                    <a href="#" className="m-portlet__nav-link btn btn-lg btn-secondary  m-btn m-btn--icon m-btn--icon-only m-btn--pill  m-dropdown__toggle">
                                        <i className="la la-ellipsis-h m--font-brand"></i>
                                    </a>
                                    <div className="m-dropdown__wrapper">
                                        <span className="m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust" ></span>
                                        <div className="m-dropdown__inner">
                                            <div className="m-dropdown__body">
                                                <div className="m-dropdown__content">
                                                    <ul className="m-nav">
                                                        <li className="m-nav__section m-nav__section--first">
                                                            <span className="m-nav__section-text">Quick Actions</span>
                                                        </li>
                                                        <li className="m-nav__item">
                                                            <a href="" className="m-nav__link">
                                                                <i className="m-nav__link-icon flaticon-share"></i>
                                                                <span className="m-nav__link-text">Create Post</span>
                                                            </a>
                                                        </li>
                                                        <li className="m-nav__item">
                                                            <a href="" className="m-nav__link">
                                                                <i className="m-nav__link-icon flaticon-chat-1"></i>
                                                                <span className="m-nav__link-text">Send Messages</span>
                                                            </a>
                                                        </li>
                                                        <li className="m-nav__item">
                                                            <a href="" className="m-nav__link">
                                                                <i className="m-nav__link-icon flaticon-multimedia-2"></i>
                                                                <span className="m-nav__link-text">Upload File</span>
                                                            </a>
                                                        </li>
                                                        <li className="m-nav__section">
                                                            <span className="m-nav__section-text">Useful Links</span>
                                                        </li>
                                                        <li className="m-nav__item">
                                                            <a href="" className="m-nav__link">
                                                                <i className="m-nav__link-icon flaticon-info"></i>
                                                                <span className="m-nav__link-text">FAQ</span>
                                                            </a>
                                                        </li>
                                                        <li className="m-nav__item">
                                                            <a href="" className="m-nav__link">
                                                                <i className="m-nav__link-icon flaticon-lifebuoy"></i>
                                                                <span className="m-nav__link-text">Support</span>
                                                            </a>
                                                        </li>
                                                        <li className="m-nav__separator m-nav__separator--fit m--hide">
                                                        </li>
                                                        <li className="m-nav__item m--hide">
                                                            <a href="#" className="btn btn-outline-danger m-btn m-btn--pill m-btn--wide btn-sm">Submit</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>				</li>
                        </ul>
                    </div>
                </div>
                <div className="m-portlet__body">
                    <div className="m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30">
                        <div className="row align-items-center">
                            <div className="col-xl-8 order-2 order-xl-1">
                                <div className="form-group m-form__group row align-items-center">
                                    <div className="col-md-4">
                                        <div className="m-form__group m-form__group--inline">
                                            <div className="m-form__label">
                                                <label>Status:</label>
                                            </div>
                                            <div className="m-form__control">
                                                <div className="btn-group bootstrap-select form-control m-bootstrap-select"><button type="button" className="btn dropdown-toggle bs-placeholder btn-default" data-toggle="dropdown" role="button" data-id="m_form_status" title="All"><span className="filter-option pull-left">All</span>&nbsp;<span className="bs-caret"><span className="caret"></span></span></button><div className="dropdown-menu open" role="combobox"><ul className="dropdown-menu inner" role="listbox" aria-expanded="false"><li data-original-index="0" className="selected"><a tabIndex="0" className="" data-tokens="null" role="option" aria-disabled="false" aria-selected="true"><span className="text">All</span><span className="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="1"><a tabIndex="0" className="" data-tokens="null" role="option" aria-disabled="false" aria-selected="false"><span className="text">Pending</span><span className="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="2"><a tabIndex="0" className="" data-tokens="null" role="option" aria-disabled="false" aria-selected="false"><span className="text">Delivered</span><span className="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="3"><a tabIndex="0" className="" data-tokens="null" role="option" aria-disabled="false" aria-selected="false"><span className="text">Canceled</span><span className="glyphicon glyphicon-ok check-mark"></span></a></li></ul></div><select className="form-control m-bootstrap-select" id="m_form_status" tabIndex="-98">
                                                    <option value="">All</option>
                                                    <option value="1">Pending</option>
                                                    <option value="2">Delivered</option>
                                                    <option value="3">Canceled</option>
                                                </select></div>
                                            </div>
                                        </div>
                                        <div className="d-md-none m--margin-bottom-10"></div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="m-form__group m-form__group--inline">
                                            <div className="m-form__label">
                                                <label className="m-label m-label--single">Type:</label>
                                            </div>
                                            <div className="m-form__control">
                                                <div className="btn-group bootstrap-select form-control m-bootstrap-select"><button type="button" className="btn dropdown-toggle bs-placeholder btn-default" data-toggle="dropdown" role="button" data-id="m_form_type" title="All"><span className="filter-option pull-left">All</span>&nbsp;<span className="bs-caret"><span className="caret"></span></span></button><div className="dropdown-menu open" role="combobox"><ul className="dropdown-menu inner" role="listbox" aria-expanded="false"><li data-original-index="0" className="selected"><a tabIndex="0" className="" data-tokens="null" role="option" aria-disabled="false" aria-selected="true"><span className="text">All</span><span className="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="1"><a tabIndex="0" className="" data-tokens="null" role="option" aria-disabled="false" aria-selected="false"><span className="text">Online</span><span className="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="2"><a tabIndex="0" className="" data-tokens="null" role="option" aria-disabled="false" aria-selected="false"><span className="text">Retail</span><span className="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="3"><a tabIndex="0" className="" data-tokens="null" role="option" aria-disabled="false" aria-selected="false"><span className="text">Direct</span><span className="glyphicon glyphicon-ok check-mark"></span></a></li></ul></div><select className="form-control m-bootstrap-select" id="m_form_type" tabIndex="-98">
                                                    <option value="">All</option>
                                                    <option value="1">Online</option>
                                                    <option value="2">Retail</option>
                                                    <option value="3">Direct</option>
                                                </select></div>
                                            </div>
                                        </div>
                                        <div className="d-md-none m--margin-bottom-10"></div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="m-input-icon m-input-icon--left">
                                            <input type="text" className="form-control m-input" placeholder="Search..." id="generalSearch"/>
								<span className="m-input-icon__icon m-input-icon__icon--left">
									<span><i className="la la-search"></i></span>
								</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 order-1 order-xl-2 m--align-right">
                                <a href="#" className="btn btn-primary m-btn m-btn--custom m-btn--icon m-btn--air m-btn--pill">
						<span>
							<i className="la la-cart-plus"></i>
							<span>New Order</span>
						</span>
                                </a>
                                <div className="m-separator m-separator--dashed d-xl-none"></div>
                            </div>
                        </div>
                    </div>
                    <div className="m_datatable m-datatable m-datatable--default m-datatable--loaded" id="ajax_data" >
                        <table className="m-datatable__table" >
                            <thead className="m-datatable__head">
                            <tr className="m-datatable__row" style={{height: '56px'}}>
                                <th data-field="RecordID" className="m-datatable__cell--center m-datatable__cell m-datatable__cell--check"><span
                                   style={{width: '100px'}}><label
                                    className="m-checkbox m-checkbox--single m-checkbox--all m-checkbox--solid m-checkbox--brand"><input
                                    type="checkbox"/><span></span></label></span></th>
                                <th data-field="OrderID" className="m-datatable__cell"><span style={{width: '132px'}}>Order ID</span></th>
                                <th data-field="ShipName" className="m-datatable__cell"><span style={{width: '132px'}}>Ship Name</span></th>
                                <th data-field="Currency" className="m-datatable__cell"><span style={{width: '100px'}}>Currency</span></th>
                                <th data-field="ShipAddress" className="m-datatable__cell"><span style={{width: '132px'}}>Ship Address</span></th>
                                <th data-field="ShipDate" className="m-datatable__cell"><span style={{width: '132px'}}>Ship Date</span></th>
                                <th data-field="Latitude" className="m-datatable__cell">
                                    <span style={{width: '132px'}}>Latitude</span></th>
                                <th data-field="Status" className="m-datatable__cell"><span style={{width: '132px'}}>Status</span></th>
                                <th data-field="Type" className="m-datatable__cell"><span style={{width: '132px'}}>Type</span></th>
                                <th data-field="Actions" className="m-datatable__cell"><span style={{width: '100px'}}>Actions</span></th>
                            </tr>
                            </thead>
                            <tbody className="m-datatable__body" >
                            <tr data-row="0" className="m-datatable__row" style={{height: '64px'}}>
                                <td data-field="RecordID" className="m-datatable__cell--center m-datatable__cell m-datatable__cell--check"><span
                                   style={{width: '100px'}}><label
                                    className="m-checkbox m-checkbox--single m-checkbox--solid m-checkbox--brand"><input type="checkbox"
                                                                                                                     value="1"/><span></span></label></span>
                                </td>
                                <td data-field="OrderID" className="m-datatable__cell"><span style={{width: '132px'}}>54473-251</span></td>
                                <td data-field="ShipName" className="m-datatable__cell"><span style={{width: '132px'}}>Sanford-Halvorson</span></td>
                                <td data-field="Currency" className="m-datatable__cell">
                                    <span style={{width: '100px'}}>GTQ</span></td>
                                <td data-field="ShipAddress" className="m-datatable__cell"><span style={{width: '132px'}}>897 Magdeline Park</span>
                                </td>
                                <td data-field="ShipDate" className="m-datatable__cell"><span style={{width: '132px'}}>5/21/2016</span></td>
                                <td data-field="Latitude" className="m-datatable__cell"><span style={{width: '132px'}}>14.78667</span></td>
                                <td data-field="Status" className="m-datatable__cell"><span style={{width: '132px'}}><span
                                    className="m-badge m-badge--brand m-badge--wide">Pending</span></span></td>
                                <td data-field="Type" className="m-datatable__cell"><span style={{width: '132px'}}><span
                                    className="m-badge m-badge--primary m-badge--dot"></span>&nbsp;<span className="m--font-bold m--font-primary">Retail</span></span>
                                </td>
                                <td data-field="Actions" className="m-datatable__cell">
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

StudentsList.propTypes = {};

export default translate('students')(StudentsList);
