import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import ProductsSection from "../../../components/store/ProductsSection";
import {selectGetRecordsRequest, selectRecords} from "../../../redux/store/selectors";
import {getRecords} from "../../../redux/store/actions";

class SplashStore extends PureComponent {

  componentDidMount() {
    this.props.getRecords()
  }

  render() {
    const {t, records, getRecordsRequest} = this.props;
    return (
      <div className="splash-store">
        <div className="container">
          <div className="row clearfix">
            <header className="header-break container text-center">
              <h2>{t('bookstore')}</h2>              
            </header>
            {getRecordsRequest.get('success') && <ProductsSection categoryId={false}  all={true} products={records}/> }
          </div>
        </div>
      </div>
    )
  }
}

SplashStore = connect(
  (state) => ({
    getRecordsRequest: selectGetRecordsRequest(state),
    records: selectRecords(state),
  }),
  (dispatch) => ({
    getRecords: (params = {perPage: '50', filter: {category: 1}}) => {
      dispatch(getRecords(params))
    }
  })
)(SplashStore);

export default SplashStore


