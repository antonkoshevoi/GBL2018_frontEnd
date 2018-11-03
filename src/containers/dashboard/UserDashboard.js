import React, {Component} from 'react';
import SchoolAverageChart from "../reports/widgets/SchoolAverageChart";
import RosterStatistic from "../reports/widgets/RosterStatistic";
import LineChart from "../reports/widgets/LineChart";
import {connect} from "react-redux";
import {translate} from "react-i18next";
import {withRouter} from "react-router-dom";
import {getRecords} from "../../redux/store/actions";
import {selectRecords} from "../../redux/store/selectors";
import {getCharts} from "../../redux/reports/dashboard/actions";
import {selectChartDatatRequest} from "../../redux/reports/dashboard/selectors";
import QuickLink from "./sections/QuickLink";
import FeaturedItems from "./sections/FeaturedItems";
import Alerts from "./sections/Alerts";
import Card from "../../components/ui/Card";
import ShoppingCart from "../store/ShoppingCart";

class UserDashboard extends Component {
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
      <div className="fadeInLeft animated">
        <Alerts />
        <div className="row dashboard-main-top m--margin-top-15">
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3 m--padding-left-0">
              <RosterStatistic/>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
              <LineChart type='school'/>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">                  
              <SchoolAverageChart loading={dataRequest.get('loading')} data={dataRequest.get('data').toJS()} />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
              <QuickLink hideHeader={true} />
            </div>                         
        </div>
        <div className="row dashboard-main-bottom">
          <div className="col-md-6 col-lg-8">
            <FeaturedItems data={records}/>
          </div>
          <div className="col-md-6 col-lg-4">
            <ShoppingCart preview = {true}/>
          </div>
        </div>
      </div>
    )
  }
}


UserDashboard = connect(
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
)(UserDashboard);


export default withRouter(translate("translations")(UserDashboard));