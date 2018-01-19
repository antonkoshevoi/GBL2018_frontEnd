import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CsvUploadSection from "../../components/pages/homerooms/CsvUploadSection";
import Insctruction from "../../components/ui/Insctruction";
import { connect } from 'react-redux';
import { bulkUpload } from '../../redux/homerooms/actions';
import { selectBulkUploadRequest } from '../../redux/homerooms/selectors';

class HomeroomsBulkUpload extends Component {

  state = {
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

  render() {
    const { upload, bulkUploadRequest } = this.props;

    return (
      <div className="row">
        <div className="col-sm-6">
          <CsvUploadSection
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
    bulkUploadRequest: selectBulkUploadRequest(state)
  }),
  (dispatch) => ({
    upload: (file, schoolId) => {
      dispatch(bulkUpload(file, {
        schoolId
      }));
    }
  })
)(HomeroomsBulkUpload);

export default HomeroomsBulkUpload;
