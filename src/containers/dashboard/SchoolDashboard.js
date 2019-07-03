import React, {Component} from 'react';
import SchoolAverageChart from "../reports/widgets/SchoolAverageChart";
import RosterStatistic from "../reports/widgets/RosterStatistic";
import LineChart from "../reports/widgets/LineChart";
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import {getRecords} from "../../redux/store/actions";
import {selectRecords} from "../../redux/store/selectors";
import {getCharts} from "../../redux/reports/dashboard/actions";
import {selectChartDatatRequest} from "../../redux/reports/dashboard/selectors";
import QuickLink from "./sections/QuickLink";
import FeaturedItems from "./sections/FeaturedItems";
import Alerts from "./sections/Alerts";
import ShoppingCart from "./sections/ShoppingCart";

class SchoolDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this._getRecords();
  }

  _getRecords() {
    const {params} = this.state;
    this.props.getRecords(params);
    this.props.getCharts();    
  }

  render() {
    const {records, dataRequest, t} = this.props;
    return ( 
      <div className="fadeInLeft animated m--margin-left-15 m--margin-right-15">
        <Alerts />
        <div className="row">
            <div className="col-sm-12">
                <div className='block-header border-b-blue'>
                    <h3 className='m-portlet__head-text'>{t('reportsSnapshot')}</h3>
                </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 m--margin-bottom-10">
              <RosterStatistic/>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 m--margin-bottom-10">
              <LineChart type='school'/>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 m--margin-bottom-10">                  
              <SchoolAverageChart loading={dataRequest.get('loading')} data={dataRequest.get('data').toJS()} />
            </div>
            <div className="col-12 col-md-6 col-lg-6 col-xl-4">
              <ShoppingCart preview={true}/>
            </div>
            <div className="col-12 col-md-6 col-lg-6 col-xl-4">
                <QuickLink />
            </div>
            <div className="col-12">
              <FeaturedItems data={records}/>
            </div>
        </div>
      </div>
    )
  }
}

SchoolDashboard = connect(
  (state) => ({    
    records: selectRecords(state),
    dataRequest: selectChartDatatRequest(state)
  }),
  (dispatch) => ({
    getRecords: (params = {type: 'recent'}) => {
      dispatch(getRecords(params))
    },
    getCharts: (params = {}) => {
      dispatch(getCharts(params))
    }    
  })
)(SchoolDashboard);

export default withTranslation("translations")(SchoolDashboard);