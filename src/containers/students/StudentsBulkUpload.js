import React, {Component} from 'react';
import CsvUploadSection from "../../components/CsvUploadSection";
import Insctruction from "../../components/ui/Insctruction";
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { bulkUpload, resetBulkUploadRequest } from '../../redux/students/actions';
import {getSchool, getSchools} from '../../redux/schools/actions';
import { selectBulkUploadRequest } from '../../redux/students/selectors';
import {selectSchool, selectSchools} from '../../redux/schools/selectors';

class StudentsBulkUpload extends Component {
  
  constructor (props) {
    super(props);
    const { t } = this.props;
    this.state = {
      csvExampleName: 'students.csv',
      csvTemplateHeaders: [
          {label: 'username', key: 'username'},
          {label: 'password', key: 'password'},
          {label: 'firstname', key: 'firstname'},
          {label: 'lastname', key: 'lastname'},
          {label: 'email', key: 'email'},
          {label: 'phone', key: 'phone'},
          {label: 'homeroom', key: 'homeroom'},
          {label: 'student_id', key: 'student_id'}
      ],
      csvTemplateData : [
          {username: 'Student 1', password: '123456', firstname: 'Student 1', lastname: 'Student 1', email: 'willy1@gmail.com', phone: '(055)36-36-55', homeroom: '1', student_id: '1'},
          {username: 'Student 2', password: '123456', firstname: 'Student 2', lastname: 'Student 2', email: 'willy2@gmail.com', phone: '(095)36-36-55', homeroom: '2', student_id: '2'},
          {username: 'Student 3', password: '123456', firstname: 'Student 3', lastname: 'Student 3', email: 'willy3@gmail.com', phone: '(098)36-36-55', homeroom: '3', student_id: '3'}
      ],
      instruction: [
          {title: t('bulkAddInstruction1')},
          {title: t('bulkAddInstruction2')},
          {
            title: t('bulkAddInstruction3'),
            subList: [
                {title: 'username'},
                {title: 'password'},
                {title: 'firstname'},
                {title: 'lastname'},
                {title: 'email'},
                {title: 'phone'},
                {title: 'homeroom_id'},
                {title: 'student_id'}
            ]
          },
          {title: t('bulkAddInstruction4')},
          {title: t('bulkAddInstruction5')},
          {title: t('bulkAddInstruction6')}
        ]
      };
  }  

  componentDidMount () {
    this.props.getSchools();
    this.props.getSchool();
    this.props.resetBulkUploadRequest();
  }

  componentWillUnmount () {
    this.props.resetBulkUploadRequest();
  }

  render() {
    const { schools,schoolRequest, upload, bulkUploadRequest } = this.props;
    return (
      <div className="row">
        <div className="col-sm-6">
          <CsvUploadSection
            csvExampleName = {this.state.csvExampleName}
            csvTemplateHeaders = {this.state.csvTemplateHeaders}
            csvTemplateData = {this.state.csvTemplateData}
            schools={schools}
            schoolRequest={schoolRequest}
            onUpload={upload}
            uploadRequest={bulkUploadRequest}
          />
        </div>
        <div className="col-sm-6">
          <Insctruction data={this.state.instruction}/>
        </div>
      </div>
    );
  }
}

StudentsBulkUpload = connect(
  (state) => ({
    schools: selectSchools(state),
    schoolRequest: selectSchool(state),
    bulkUploadRequest: selectBulkUploadRequest(state)
  }),
  (dispatch) => ({
    getSchools: () => { dispatch(getSchools()) },
    getSchool: () => { dispatch(getSchool()) },
    resetBulkUploadRequest: () => { dispatch(resetBulkUploadRequest()) },
    upload: (file, schoolId) => {
      dispatch(resetBulkUploadRequest());
      dispatch(bulkUpload(file, {
        schoolId
      }));
    },
    resetBulkUploadRequest: () => { dispatch(resetBulkUploadRequest()) }
  })
)(StudentsBulkUpload);

export default translate('translations')(StudentsBulkUpload);
