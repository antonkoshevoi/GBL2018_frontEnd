import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import InfoSection from "./students/InfoSection";
import TabSection from "./students/TabSection";
import {selectStudentReportRequest} from "../../../redux/reports/students/selectors";
import {getReport} from "../../../redux/reports/students/actions";

class Students extends Component {

  componentDidMount() {
    const { id } = this.props.match.params;
    const { getReport } = this.props;

    getReport(id);
  }

  render() {
    const data = this.props.getReportRequest.toJS();
    const {t} = this.props;
    
    return (      
      <div className="fadeInLeft animated">
        <div className="row dashboard-main-top row-reports-main-top-block m-portlet  m-portlet--head-solid-bg">
          <div className="m-portlet__head report-snapshot-header-border border-b-blue">
            <div className="m-portlet__head-caption">
              <div className="m-portlet__head-title">
                <h3 className="m-portlet__head-text reports-text-header">{t('reportsSnapshot')}</h3>
              </div>
            </div>
          </div>
          <div className='m-portlet__body'>
            <InfoSection data={data}/>
            <TabSection data={data} />
          </div>
        </div>
      </div>      
    );
  }
}

Students = connect(
  (state) => ({
    getReportRequest: selectStudentReportRequest(state),
  }),
  (dispatch) => ({
    getReport: (id, params = {}) => {dispatch(getReport(id, params))}
  })
)(Students);

export default translate('translations')(Students);

