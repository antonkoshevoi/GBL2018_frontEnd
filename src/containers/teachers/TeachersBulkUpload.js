import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CsvUploadSection from "../../components/CsvUploadSection";
import Insctruction from "../../components/ui/Insctruction";
import { connect } from 'react-redux';
import { bulkUpload, resetBulkUploadRequest } from '../../redux/teachers/actions';
import {getSchool, getSchools} from '../../redux/schools/actions';
import { selectBulkUploadRequest } from '../../redux/teachers/selectors';
import {selectSchool, selectSchools} from '../../redux/schools/selectors';

class TeachersBulkUpload extends Component {

  state = {
    csvExampleName: 'teachers.csv',
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
      {username: 'Teacher 1', password: '123456', firstname: 'Teacher 1', lastname: 'Teacher 1', email: 'willy1@gmail.com', phone: '(055)36-36-55', homeroom: '1', student_id: '1'},
      {username: 'Teacher 2', password: '123456', firstname: 'Teacher 2', lastname: 'Teacher 2', email: 'willy2@gmail.com', phone: '(095)36-36-55', homeroom: '2', student_id: '2'},
      {username: 'Teacher 3', password: '123456', firstname: 'Teacher 3', lastname: 'Teacher 3', email: 'willy3@gmail.com', phone: '(098)36-36-55', homeroom: '3', student_id: '3'}
    ],
    instruction: [
      {
        title: 'Select the School, to which the users will be assigned, from the list',
      },
      {
        title: 'Use the Homeroom names as how they are listed in this system',
      },
      {
        title: 'Upload the csv file, with the following columns and separated by a comma \' , \'',
        subList: [
          {
            title: 'username'
          },
          {
            title: 'password'
          },
          {
            title: 'firstName'
          },
          {
            title: 'lastName'
          },
          {
            title: 'email'
          },
          {
            title: 'phoneNumber'
          },
          {
            title: 'homeroom_id'
          },
          {
            title: 'student_id'
          }
        ]
      },
      {
        title: 'Make sure that you place the column name headings in the first row',
      },
      {
        title: 'Make sure that data is arranged in the order as the columns',
      },
      {
        title: 'You may leave other columns data blank except for the username and password. If they are empty, place a \'\' in their column position.',
      }
    ]
  };

  componentDidMount () {
      this.props.getSchools();
      this.props.resetBulkUploadRequest()
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

TeachersBulkUpload = connect(
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
      dispatch(bulkUpload(file, {
        schoolId
      }));
    }
  })
)(TeachersBulkUpload);

export default TeachersBulkUpload;
