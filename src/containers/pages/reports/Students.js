import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import InfoSection from "../../../components/pages/reports/students/InfoSection";
import TabSection from "../../../components/pages/reports/students/TabSection";
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

    return (
      <div className="animate fadeInLeftBig">
        <InfoSection data={data}/>
        <TabSection data={data} />
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

export default translate('students')(Students);

