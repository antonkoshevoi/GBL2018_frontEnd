import React, {Component} from 'react';
import CsvUploadSection from "../../components/CsvUploadSection";
import Insctruction from "../../components/ui/Insctruction";
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { bulkUpload, resetBulkUploadRequest } from '../../redux/students/actions';
import { selectBulkUploadRequest } from '../../redux/students/selectors';

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
          {label: 'homeroom', key: 'homeroom'}
      ],
      csvTemplateData : [
          {username: 'student_1', password: '123456', firstname: 'Student 1', lastname: 'Student 1', email: 'willy1@gmail.com', phone: '(011) 36-36-55', homeroom: 'Homeroom 1'},
          {username: 'student_2', password: '123456', firstname: 'Student 2', lastname: 'Student 2', email: 'willy2@gmail.com', phone: '(022) 36-36-55', homeroom: 'Homeroom 2'},
          {username: 'student_3', password: '123456', firstname: 'Student 3', lastname: 'Student 3', email: 'willy3@gmail.com', phone: '(033) 36-36-55', homeroom: 'Homeroom 3'}
      ],
      instruction: [          
          {title: t('bulkAddInstructionHomeroom')},
          {
            title: t('bulkAddInstructionCsv'),
            subList: [
                {title: 'username'},
                {title: 'password'},
                {title: 'firstname'},
                {title: 'lastname'},
                {title: 'email'},
                {title: 'phone'},
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
    this.props.resetBulkUploadRequest();
  }

  componentWillUnmount () {
    this.props.resetBulkUploadRequest();
  }

  render() {
    const { upload, bulkUploadRequest } = this.props;
    return (
      <div className="row m-3">
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

export default withTranslation('translations')(connect(
  (state) => ({
    bulkUploadRequest: selectBulkUploadRequest(state)
  }),
  (dispatch) => ({
    resetBulkUploadRequest: () => { dispatch(resetBulkUploadRequest()) },    
    upload: (file) => {
      dispatch(resetBulkUploadRequest());
      dispatch(bulkUpload(file));
    }    
  })
)(StudentsBulkUpload));
