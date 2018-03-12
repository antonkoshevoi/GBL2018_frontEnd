import React, {Component} from 'react';
import ChartData from "../../data/Charts";
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
import LinksWidgets from "../pages/reports/widgets/LinksWidgets";
import Account from "../pages/reports/widgets/account";
import QuickLink from "../pages/reports/widgets/QuickLink";
import FeaturedItems from "../pages/reports/widgets/FeaturedItems";

class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...ChartData,
      params: {
        filter: {
          category: '1'
        },
        courses: null,
      }
    }
  }


  componentDidMount() {
    this._getRecords();
  }


  _getRecords() {
    const {params} = this.state;
    this.props.getRecords(params);
  }

  _setCategoryFilter(category) {

    switch (category) {
      case 'courses':
        this.setState({
          params: {
            ...this.state.params,
            filter: {...this.state.params.filter, category: '1'}
          }
        }, this._getRecords);
        break;
      case 'books':
        this.setState({
          params: {
            ...this.state.params,
            filter: {...this.state.params.filter, category: '4'}
          }
        }, this._getRecords);
        break;
      case 'teaching_aids':
        this.setState({
          params: {
            ...this.state.params,
            filter: {...this.state.params.filter, category: '3'}
          }
        }, this._getRecords);
        break;
      case 'stationary':
        this.setState({
          params: {
            ...this.state.params,
            filter: {...this.state.params.filter, category: '6'}
          }
        }, this._getRecords);
        break;
      case 'student_rewards':
        this.setState({
          params: {
            ...this.state.params,
            filter: {...this.state.params.filter, category: '5'}
          }
        }, this._getRecords);
        break;
      case 'tutoring_services':
        this.setState({
          params: {
            ...this.state.params,
            filter: {...this.state.params.filter, category: '7'}
          }
        }, this._getRecords);
        break;
      case 'bundles':
        this.setState({
          params: {
            ...this.state.params,
            filter: {...this.state.params.filter, category: '2'}
          }
        }, this._getRecords);
        break;
      default:
        return;
    }
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
    const productsLoading = getRecordsRequest.get('loading');
    const productsSuccess = getRecordsRequest.get('success');
    return (
      <div className="fadeInLeft  animated">
        <div className="row">
          <div className="col-sm-12 col-md-8 col-lg-8 col-xl-9">
            <div className="">
              <div className='m-portlet m-portlet--head-solid-bg'>
                <div className='m-portlet__head border-b-blue'>
                  <div className='m-portlet__head-caption'>
                    <div className='m-portlet__head-title'>
                      <h3 className='m-portlet__head-text'>
                        Reports Snapshot
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row row-15">
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-4">
                <RosterStatistic/>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-4">
                <LineChart/>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-12 col-xl-4">
                <SchoolAverageChart/>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4 col-xl-3">
            <QuickLink/>
          </div>





        </div>
        <div className="row">
          <div className="col-md-6 col-lg-8">
            <FeaturedItems data={records}/>
            {/*<StoreTabs isLoading={productsLoading} isSuccess={productsSuccess} getProducts={(category) => {*/}
              {/*this._setCategoryFilter(category)*/}
            {/*}} data={records}/>*/}
          </div>
          <div className="col-md-6 col-lg-4">
            <Account/>
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