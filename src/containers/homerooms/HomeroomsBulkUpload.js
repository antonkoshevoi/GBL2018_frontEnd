import React, {Component} from 'react';
import CsvUploadSection from "../../components/CsvUploadSection";
import Insctruction from "../../components/ui/Insctruction";
import { connect } from 'react-redux';
import { bulkUpload, resetBulkUploadRequest } from '../../redux/homerooms/actions';
import { getSchools } from '../../redux/schools/actions';
import { selectBulkUploadRequest } from '../../redux/homerooms/selectors';
import { selectSchools } from '../../redux/schools/selectors';

class HomeroomsBulkUpload extends Component {

  state = {
    csvExampleName: 'homerooms.csv',
    csvTemplateHeaders: [
        {label: 'name', key: 'name'},
        {label: 'startDate', key: 'startDate'},
        {label: 'endDate', key: 'endDate'},
        {label: 'enrollmentStartDate', key: 'enrollmentStartDate'},
        {label: 'enrollmentEndDate', key: 'enrollmentEndDate'}
    ],
    csvTemplateData : [
        {name: 'Homeroom 1', startDate: '2018-10-10', endDate: '2018-10-10', enrollmentStartDate: '2018-10-10', enrollmentEndDate: '2018-10-10'},
        {name: 'Homeroom 2', startDate: '2018-10-10', endDate: '2018-10-10', enrollmentStartDate: '2018-10-10', enrollmentEndDate: '2018-10-10'},
        {name: 'Homeroom 3', startDate: '2018-10-10', endDate: '2018-10-10', enrollmentStartDate: '2018-10-10', enrollmentEndDate: '2018-10-10'}

    ],
    instruction: [
      {
        title: 'Select the School, to which the homeroom will be assigned, from the list',
      },
      {
        title: 'Upload the csv file, with the following columns and separated by a comma \' , \'',
        subList: [
          {
            title: 'name'
          },
          {
            title: 'startDate'
          },
          {
            title: 'endDate'
          },
          {
            title: 'enrollmentStartDate'
          },
          {
            title: 'enrollmentEndDate'
          }
        ]
      },
      {
        title: 'Dates are of the format YYYY-MM-DD',
      },
      {
        title: 'Make sure that you place the column name headings in the first row',
      },
      {
        title: 'Make sure that data is arranged in the order as the columns',
      },
      {
        title: 'Do not leave any columns empty',
      }
    ]
  };

  componentDidMount () {
      this.props.getSchools();
      this.props.resetBulkUploadRequest();
  }

  render() {
    const { schools, upload, bulkUploadRequest } = this.props;

    return (
      <div className="row">
        <div className="col-sm-6">
          <CsvUploadSection
            csvExampleName = {this.state.csvExampleName}
            csvTemplateHeaders = {this.state.csvTemplateHeaders}
            csvTemplateData = {this.state.csvTemplateData}
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

HomeroomsBulkUpload = connect(
  (state) => ({
    schools: selectSchools(state),
    bulkUploadRequest: selectBulkUploadRequest(state)
  }),
  (dispatch) => ({
    getSchools: () => { dispatch(getSchools()) },
    resetBulkUploadRequest: () => { dispatch(resetBulkUploadRequest()) },
    upload: (file) => {
      dispatch(bulkUpload(file));
    }
  })
)(HomeroomsBulkUpload);

export default HomeroomsBulkUpload;
