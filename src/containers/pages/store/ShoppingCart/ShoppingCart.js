import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import ShoppingCartTable from "../../../../components/pages/store/ShoppingCartTable";

import products from '../../../../data/json/products.json'

class ShoppingCart extends Component {
    render() {
        return (
            <div>

              <div className="row">
                  <div className="col-xl-9 m-auto">
                      <div className="m-portlet m-portlet--full-height ">
                          <div className="m-portlet__head">
                              <div className="m-portlet__head-caption">
                                  <div className="m-portlet__head-title">
                                      <h3 className="m-portlet__head-text">
                                          Shopping Cart
                                      </h3>
                                  </div>
                              </div>

                          </div>
                          <div className="m-portlet__body">
                             <ShoppingCartTable data={products}/>
                          </div>
                      </div>
                  </div>
              </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default translate("ShoppingCart")(connect(
    mapStateToProps,
)(ShoppingCart));

