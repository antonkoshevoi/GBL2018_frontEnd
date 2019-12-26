import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import '../../styles/store.css'
import Filter from "../../components/store/Filter";
import ProductsSection from "../../components/store/ProductsSection";
import {selectGetRecordsRequest, selectRecords} from "../../redux/store/selectors";
import {withRouter} from "react-router-dom";
import {getRecords} from "../../redux/store/actions";
import {Loader} from "../../components/ui/Loader";

class Store extends Component {

  state = {
    isFiltered: false
  }

  componentDidMount() {
    this._getRecords();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.key !== this.props.location.key) {
      this.setState({isFiltered: false});
      this._getRecords();
    }
  }
  
  _getRecords(params) {
    this.props.getRecords(params);
  }

  _setFilters(params) {
    if (params) {
      this.setState({isFiltered: true});
    }
    this._getRecords(params);
  }

  _renderNotFountMessage() {      
    const {t} = this.props;
    return (
      <div className="notFountMessage">
        <div className="display-1 text-center">
          <i className="display-1 la g-red la-times-circle"></i>
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
            <ProductsSection categoryId={4} type={t('books')} title={t('books')} products={records}/>
            <ProductsSection categoryId={7} type={t('printables')} title={t('printables')} products={records}/>            
            <ProductsSection categoryId={6} type={t('stationary')} title={t('stationary')} products={records}/>
            <ProductsSection categoryId={3} type={t('teachingAds')} title={t('teachingAds')} products={records}/>
            <ProductsSection categoryId={5} type={t('studentReward')} title={t('studentReward')} products={records}/>
            <ProductsSection categoryId={1} type={t('courses')} title={t('courses')} products={records}/>
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

export default withRouter(withTranslation("translations")(connect(
  (state) => ({
    getRecordsRequest: selectGetRecordsRequest(state),
    records: selectRecords(state),
  }),
  (dispatch) => ({
    getRecords: (params = {perPage: '50'}) => {
      dispatch(getRecords(params))
    }
  })
)(Store)));
