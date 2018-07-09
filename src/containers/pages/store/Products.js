import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import '../../../styles/store.css'
import ProductsSection from "../../../components/pages/store/ProductsSection";
import Filter from "../../../components/pages/store/Filter";
import {withRouter} from "react-router-dom";
import {getRecords} from "../../../redux/store/actions";
import {selectGetRecordsRequest, selectRecords} from "../../../redux/store/selectors";
import Loader from "../../../components/layouts/Loader";

class Products extends Component {

  state = {
    isFiltered: true,
    sort: {
      orderBy: {}
    }
  }

  _getRecords(params) {
    this.props.getRecords(params);
  }


  _setFilters(params) {
    if (params )
      this.setState({isFiltered:true});
    this._getRecords(params)
  }


  _renderNotFountMessage() {
    const {t} = this.props; 
    return (
      <div className="notFountMessage">
        <div className="display-1 text-center">
          <i className="la g-red	la-times-circle"></i>
          <h1>{t('productsNotFound')}</h1>
        </div>
      </div>
    )
  }

  render() {
    const {records, getRecordsRequest, match} = this.props;
    const loading = getRecordsRequest.get('loading');
    const success = getRecordsRequest.get('success');
    const {isFiltered} = this.state;

    return (
      <div className="animated fadeInLeft">
        {loading &&
        <Loader/>}
        <div className="m-portlet store-wrapper">
          <div className="m-portlet__head">
            <div className="m-portlet__head-caption">
              <Filter type={match.params.type} isActive={isFiltered} onChange={(fields) => {
                this._setFilters(fields)
              }}/>
            </div>
          </div>

          <div id="store-body" className="all-products">
            {success &&
            <ProductsSection  all={true} products={records}/> }
            {(records.size === 0 && success) && this._renderNotFountMessage()}
          </div>
        </div>
      </div>
    );
  }
}

Products = connect(
  (state) => ({
    getRecordsRequest: selectGetRecordsRequest(state),
    records: selectRecords(state),
  }),
  (dispatch) => ({
    getRecords: (params = {type: 'recent'}) => {
      dispatch(getRecords(params))
    },
  })
)(Products);


export default withRouter(translate("translations")(Products));


