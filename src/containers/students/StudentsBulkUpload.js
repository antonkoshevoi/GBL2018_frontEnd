import React, {Component} from 'react';
import CsvUploadSection from "../../components/CsvUploadSection";
import Insctruction from "../../components/ui/Insctruction";
import { connect } from 'react-redux';
import { bulkUpload } from '../../redux/students/actions';
import { getSchools } from '../../redux/schools/actions';
import { selectBulkUploadRequest } from '../../redux/students/selectors';
import { selectSchools } from '../../redux/schools/selectors';

class StudentsBulkUpload extends Component {

  state = {
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
            title: 'firstname'
          },
          {
            title: 'lastname'
          },
          {
            title: 'email'
          },
          {
            title: 'phone'
          },
          {
            title: 'homeroom'
          },
          {
            title: 'student_id'
          },
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
      },
    ]
  };

  componentDidMount () {
    this.props.getSchools();
  }

  render() {
    const { schools, upload, bulkUploadRequest } = this.props;

    return (
      <div className="row">
        <div className="col-sm-6">
          <CsvUploadSection
            schools={schools}
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
    bulkUploadRequest: selectBulkUploadRequest(state)
  }),
  (dispatch) => ({
    getSchools: () => { dispatch(getSchools()) },
    upload: (file, schoolId) => {
      dispatch(bulkUpload(file, {
        schoolId
      }));
    }
  })
)(StudentsBulkUpload);

export default StudentsBulkUpload;
