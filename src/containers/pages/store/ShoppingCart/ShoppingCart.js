import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import ShoppingCartTable from "../../../../components/pages/store/ShoppingCartTable";

import {
     selectCartRecords, selectGetCartRecordsRequest,
} from "../../../../redux/store/selectors";
import {addToCarts, getCartRecords, getRecords, getSingleRecord} from "../../../../redux/store/actions";
import {withRouter} from "react-router-dom";

class ShoppingCart extends Component {

    componentDidMount() {
        this._getRecords();
    }


    _getRecords() {
        this.props.getRecords();
    }

    render() {

        const {records, cartRecordsRequest} = this.props;
        const loading = cartRecordsRequest.get('loading');
        const success = cartRecordsRequest.get('success');

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
                              {success &&
                             <ShoppingCartTable data={records}/> }
                          </div>
                      </div>
                  </div>
              </div>

            </div>
        );
    }
}

ShoppingCart = connect(
    (state) => ({
        cartRecordsRequest: selectGetCartRecordsRequest(state),
        records: selectCartRecords(state),
    }),
    (dispatch) => ({
        getRecords: () => { dispatch(getCartRecords()) },
    })
)(ShoppingCart);


export default withRouter(translate("ShoppingCart")(ShoppingCart));