import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import '../../styles/store.css'
import Filter from "../../components/store/Filter";
import ProductsSection from "../../components/store/ProductsSection";
import {selectGetRecordsRequest, selectRecords} from "../../redux/store/selectors";
import {withRouter} from "react-router-dom";
import {getRecords} from "../../redux/store/actions";
import DiscountCode from './sections/DiscountCode';
import Loader from "../../components/layouts/Loader";

class Store extends Component {

  state = {
    isFiltered: false
  }

  componentDidMount() {
    this._getRecords();
  }

  _getRecords(params) {
    this.props.getRecords(params);
  }

  _setFilters(params) {
    if (params)
      this.setState({isFiltered: true});
    this._getRecords(params)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.key !== this.props.location.key) {
      this.setState({isFiltered: false});
      this._getRecords();
    }
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

    const {records, getRecordsRequest, t} = this.props;
    const loading = getRecordsRequest.get('loading');
    const success = getRecordsRequest.get('success');
    const {isFiltered} = this.state;      

    return (
      <div className="animated fadeInLeft">
        <DiscountCode />
        {loading && <Loader/>}
        <div className="m-portlet store-wrapper">
          <div className="m-portlet__head">
            <div className="m-portlet__head-caption">
              <Filter isActive={isFiltered} onChange={(fields) => {
                this._setFilters(fields)
              }}/>
            </div>
          </div>
          {(success && !isFiltered) &&
          <div id="store-body">
            <ProductsSection categoryId={1} type={t('courses')} title={t('courses')} products={records}/>
            <ProductsSection categoryId={4} type={t('books')} title={t('books')} products={records}/>
            <ProductsSection categoryId={3} type={t('teachingAds')} title={t('teachingAds')} products={records}/>
            <ProductsSection categoryId={6} type={t('stationary')} title={t('stationary')} products={records}/>
            <ProductsSection categoryId={5} type={t('studentReward')} title={t('studentReward')} products={records}/>
            <ProductsSection categoryId={7} type={t('tutoringService')} title={t('tutoringService')} products={records}/>
            <ProductsSection categoryId={2} type={t('bundles')} title={t('bundles')} products={records}/>
          </div>
          }
          {isFiltered &&
          <div id="store-body">
            <ProductsSection type="newest" title="" all={true} products={records}/>
          </div>
          }
          {(records.size === 0 && success) && this._renderNotFountMessage()}
        </div>
      </div>
    );
  }
}

Store = connect(
  (state) => ({
    getRecordsRequest: selectGetRecordsRequest(state),
    records: selectRecords(state),
  }),
  (dispatch) => ({
    getRecords: (params = {perPage: '50'}) => {
      dispatch(getRecords(params))
    }
  })
)(Store);

export default withRouter(withTranslation("translations")(Store));
