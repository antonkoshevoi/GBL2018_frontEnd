import React, {Component} from 'react';
import {connect} from 'react-redux';
import spacer from '../../../media/images/svg/bl-spacer.svg';
import ProductsSection from "../../../components/store/ProductsSection";
import {selectGetRecordsRequest, selectRecords} from "../../../redux/store/selectors";
import {getRecords} from "../../../redux/store/actions";


class SplashStore extends Component {
  state = {
    isFiltered: false
  }

  componentDidMount() {
    this._getRecords();
  }


  _getRecords(params) {
    this.props.getRecords(params);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.location.key !== this.props.location.key) {
      this.setState({isFiltered: false});
      this._getRecords();
    }
  }


  render() {
    const {t, records} = this.props;
    return (
      <div className="splash-store">
        <div className="container">
          <div className="row clearfix">
            <header className="header-break container text-center">
              <h2>{t('store')}</h2>
              <img src={spacer} alt="---=== ===---" width="200"/>
            </header>
            <ProductsSection categoryId={false}  all={true} products={records}/>


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
    },
  })
)(SplashStore);
export default SplashStore


