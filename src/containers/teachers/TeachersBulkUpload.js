import React, {Component} from 'react';
import CsvUploadSection from "../../components/CsvUploadSection";
import Insctruction from "../../components/ui/Insctruction";
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { bulkUpload, resetBulkUploadRequest } from '../../redux/teachers/actions';
import { selectBulkUploadRequest } from '../../redux/teachers/selectors';

class TeachersBulkUpload extends Component {
    
  constructor (props) {
    super(props);
    const { t } = this.props;
    this.state = {
        csvExampleName: 'teachers.csv',
        csvTemplateHeaders: [
          {label: 'username', key: 'username'},
          {label: 'password', key: 'password'},
          {label: 'firstname', key: 'firstname'},
          {label: 'lastname', key: 'lastname'},
          {label: 'email', key: 'email'},
          {label: 'phone', key: 'phone'},
          {label: 'homeroom', key: 'homeroom'}          
        ],
        csvTemplateData : [
          {username: 'teacher_1', password: '123456', firstname: 'Teacher 1', lastname: 'Teacher 1', email: 'teacher1@gmail.com', phone: '(055)36-36-55', homeroom: 'homeroom 1'},
          {username: 'teacher_2', password: '123456', firstname: 'Teacher 2', lastname: 'Teacher 2', email: 'teacher2@gmail.com', phone: '(095)36-36-55', homeroom: 'homeroom 2'},
          {username: 'teacher_3', password: '123456', firstname: 'Teacher 3', lastname: 'Teacher 3', email: 'teacher3@gmail.com', phone: '(098)36-36-55', homeroom: 'homeroom 3'}
        ],
        instruction: [          
          {title: t('bulkAddInstructionHomeroom')},
          {
            title: t('bulkAddInstructionCsv'),
            subList: [
              {title: 'username'},
              {title: 'password'},
              {title: 'firstName'},
              {title: 'lastName'},
              {title: 'email'},
              {title: 'phoneNumber'},
              {title: 'homeroom'}              
            ]
          },
          {title: t('bulkAddInstructionHeadings')},
          {title: t('bulkAddInstructionColumnsOrder')},
          {title: t('bulkAddInstructionUserFields')}
        ]
      };
  }

  componentDidMount () {      
      this.props.resetBulkUploadRequest()
  }

  render() {
    const { upload, bulkUploadRequest } = this.props;

    return (
      <div className="row m--margin-15">
        <div className="col-sm-6">
          <CsvUploadSection
            csvExampleName = {this.state.csvExampleName}
            csvTemplateHeaders = {this.state.csvTemplateHeaders}
            csvTemplateData = {this.state.csvTemplateData}
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

TeachersBulkUpload = connect(
  (state) => ({
    bulkUploadRequest: selectBulkUploadRequest(state)
  }),
  (dispatch) => ({
    resetBulkUploadRequest: () => { dispatch(resetBulkUploadRequest()) },
    upload: (file) => {
      dispatch(bulkUpload(file));
    }
  })
)(TeachersBulkUpload);

export default translate('translations')(TeachersBulkUpload);
