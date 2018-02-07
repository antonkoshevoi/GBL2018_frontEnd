import React, {Component} from 'react';
import ChartData from "../../data/Charts";
import classRoomSvg from '../../media/images/classroom.svg';
import AppDownloadDrawer from "../../components/ui/AppDownloadDrawer";
import SchoolAverageChart from "../pages/reports/widgets/SchoolAverageChart";
import RosterStatistic from "../pages/reports/widgets/RosterStatistic";
import LineChart from "../pages/reports/widgets/LineChart";
import {connect} from "react-redux";
import {translate} from "react-i18next";
import {withRouter} from "react-router-dom";
import {getRecords} from "../../redux/store/actions";
import {selectGetRecordsRequest, selectRecords} from "../../redux/store/selectors";
import StoreTabs from "../../components/pages/store/StoreTabs";

class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...ChartData
    }
  }


  componentDidMount() {
    this._getRecords();
  }


  _getRecords(params) {
    this.props.getRecords(params);
  }

  _renderPieChartLabels(labels) {
    return labels.map(function (item, i) {
      return (
        <div key={i} className="m-stack__item m--margin-bottom-5 m-stack__item--center m-stack__item--middle">
          <span className="m-badge m-badge--success" style={{marginRight: '8px', backgroundColor: item.color}}></span>
          <span>{item.value + '%  '}</span>
          <span style={{whiteSpace: 'pre'}}>{item.label}</span>
        </div>
      )
    })
  }


  _renderRosterStats(stats) {
    return stats.map(function (item, i) {
      return (
        <div key={i} className="m-widget1__item">
          <div className="row m-row--no-padding align-items-center">
            <div className="col">
              <h3 className="m-widget1__title">{item.title}</h3>
            </div>
            <div className="col m--align-right">
              <span className="m-widget1__number m--font-brand">{item.value}</span>
            </div>
          </div>
        </div>
      )
    })
  }

  render() {

    const {records, getRecordsRequest} = this.props;

    return (
      <div className="fadeInLeft  animated">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-3">
            <RosterStatistic/>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3">
            <LineChart/>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3">
            <SchoolAverageChart/>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3">
            <div className="small-card-content" id="g-widgets">
              <div className="small-card">
                <div className="row m--full-height  m--padding-right-10 m--padding-left-10 align-items-center">
                  <div className=" col-sm-3">
                    <span className="m-widget1__number m--font-brand">
                      <i className="fa fa-film widget-icon"></i>
                    </span>
                  </div>
                  <div className="col-sm-9 m--align-right">
                    <h5 className="m-widget1__title">How-To</h5>
                    <span className="widget-desc">Movies</span>
                  </div>
                </div>
              </div>
              <div className="small-card">
                <div className="row m--full-height m--padding-right-10 m--padding-left-10 align-items-center">
                  <div className=" col-sm-3">
                    <span className="m-widget1__number m--font-brand">
                      <img width={70} src={classRoomSvg} alt="svg"/>
                    </span>
                  </div>
                  <div className="col-sm-9 m--align-right">
                    <span className="widget-desc">Professional</span>
                    <h5 className="m-widget1__title">Training</h5>
                  </div>
                </div>
              </div>
              <div className="small-card">
                <div className="row m--full-height m--padding-right-10 m--padding-left-10 align-items-center">
                  <div className="  col-sm-3">
                    <span className="m-widget1__number m--font-brand">
                      <i className="fa fa-share-alt widget-icon"></i>
                    </span>
                  </div>
                  <div className="col-sm-9 m--align-right ">
                    <h5 className="m-widget1__title">Sharing</h5>
                    <span className="widget-desc">Messages, Chats, +</span>
                  </div>
                </div>
              </div>
              <div className="small-card">
                <div className="row m--full-height m--padding-right-10 m--padding-left-10 align-items-center">
                  <div className="col-sm-3">
                    <span className="m-widget1__number m--font-brand">
                        <i className="fa fa-id-card widget-icon"></i>
                    </span>
                  </div>
                  <div className="col-sm-9 m--align-right">
                    <span className="widget-desc">Student Centered <br/>
                      Planning and assessment
                    </span>
                    <h5 className="m-widget1__title">S-CAP</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <StoreTabs data={records}/>
          </div>
        </div>
      </div>
    )
  }
}


UserDashboard = connect(
  (state) => ({
    getRecordsRequest: selectGetRecordsRequest(state),
    records: selectRecords(state),
  }),
  (dispatch) => ({
    getRecords: (params = {type: 'recent'}) => {
      dispatch(getRecords(params))
    },
  })
)(UserDashboard);


export default withRouter(translate("UserDashboard")(UserDashboard));