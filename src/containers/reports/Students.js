import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {translate} from 'react-i18next';
import InfoSection from "./students/InfoSection";
import TabSection from "./students/TabSection";
import {selectStudentReportRequest} from "../../redux/reports/students/selectors";
import {getReport} from "../../redux/reports/students/actions";

class Students extends Component {
   
  componentDidMount() {
    const { getReport } = this.props;
    const { id } = this.props.match.params;
  
    getReport((id || 'my'));
  }

  render() {
    const {t, getReportRequest} = this.props;
    const data = getReportRequest.get('data').toJS();    
    
    const { id } = this.props.match.params;
            
    return (      
        <div className="fadeInLeft animated m--margin-left-15 m--margin-right-15">
            <div>
                <div className='block-header border-b-blue'>
                    <h3 className='m-portlet__head-text'>{t('reportsSnapshot')}</h3>
                </div>
            </div>
            <div>
                <InfoSection data={data} studentId={(id || 'my')} />
                <TabSection data={data} studentId={(id || 'my')} />
            </div>        
        </div>      
    );
  }
}

Students = connect(
    (state) => ({
        getReportRequest: selectStudentReportRequest(state)
    }),
    (dispatch) => ({
        getReport: (id, params = {}) => {dispatch(getReport(id, params))},    
    })
)(Students);

export default withRouter(translate('translations')(Students));

