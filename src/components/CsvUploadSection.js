import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  FormControl, FormHelperText,
  Input, InputLabel,
  MenuItem, Select,
} from 'material-ui';
import ConfirmButton from './ui/ConfirmButton';
import { CSVLink } from "react-csv";
import PortletWidgets from './ui/PortletWidgets';
import LinearProgress from './ui/LinearProgress';

// const requiredCsvFields = [
//   'username',
//   'password',
//   'firstname',
//   'lastname',
//   'email',
//   'phone',
//   'homeroom',
//   'student_id'
// ];
//
// const csvTemplate = [
//   [...requiredCsvFields]
// ];

class CsvUploadSection extends Component {

  static propTypes = {
    schools: PropTypes.any.isRequired,
    onUpload: PropTypes.func.isRequired,
    uploadRequest: PropTypes.any.isRequired,
  };

  state = {
    schoolId: undefined,
    file: undefined,
  };

  _selectSchool(event) {
    this.setState({school: event.target.value})
  }

  _renderSchools() {
    const { schools } = this.props;

    return schools.map((school, key) => (
      <MenuItem key={key} value={ school.get('schId') }>
        { school.get('schName') }
      </MenuItem>
    ));
  }

  _handleSchoolChange(e) {
    this.setState({schoolId: e.target.value})
  }

  _handleFileChange(e) {
    if(typeof e.target.files[0] !== 'undefined') {

      this.setState ({
        file: e.target.files[0]
      }, () => {
        this.props.onUpload(
          this.state.file,
          this.state.schoolId
        )
      });
    }
  }

  render() {
    const { uploadRequest } = this.props;
    const { schoolId } = this.state;
    const loading = uploadRequest.get('loading');
    const progress = uploadRequest.get('progress');
    const cancel = uploadRequest.get('cancel');
    const uploading = loading && progress < 100;
    const success = uploadRequest.get('success');
    const results = uploadRequest.get('results');
    const exampleName = this.props.exampleName;
    const csvTemplate = [
        [...this.props.fields]
    ];

    return (
      <div>
        <div className="m-portlet m-portlet--brand  m-portlet--head-solid-bg m-portlet--bordered">
          <div className="m-portlet__head">
            <div className="m-portlet__head-caption">
              <div className="m-portlet__head-title">
                <span className="m-portlet__head-icon">
                  <i className="flaticon-cogwheel-2"></i>
                </span>
                <h3 className="m-portlet__head-text">CSV</h3>
              </div>
            </div>
          </div>
          <div className="m-portlet__body">
            <div className="row" style={{marginBottom: '30px'}}>
                <div className="col-sm-12">
                  <h6>
                    You may download this .csv template to use it as pattern for your csv file. Kindly make sure that you have a valid .csv format before uploading to the system.
                  </h6>
                  <CSVLink data={csvTemplate} filename={exampleName} className="btn btn-success">Download</CSVLink>
                </div>
            </div>
            <div className="row" style={{marginLeft: 0}}>
              <div className="col-sm-6">
                <div className="row">
                  <div className="col-xs-12 ">
                    <FormControl>
                      <InputLabel htmlFor="school-helper">Schools</InputLabel>
                      <Select
                        disabled={loading}
                        style={{minWidth: '120px'}}
                        value={schoolId || ''}
                        onChange={(e) => { this._handleSchoolChange(e) }}
                        input={<Input name="school" id="school-helper" />}>
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {this._renderSchools()}
                      </Select>
                      <FormHelperText></FormHelperText>
                    </FormControl>
                  </div>
                </div>
              </div>
              <div className={`col-sm-6 ${loading || !schoolId ? ' not-allowed' : ''}` }>
                <div className={`react-csv-input ${loading || !schoolId ? ' disabled' : 'fdsfsf'}`}>
                  <label>Select CSV file</label>
                  <input className="csv-input" type="file" accept="text/csv" onChange={e => this._handleFileChange(e)} />
                </div>
              </div>
            </div>
            {loading && (
              <div className="row" style={{marginTop: '10px'}}>
                <div className="col-sm-12">
                  {!uploading &&
                    <LinearProgress color='primary'/>
                  }
                  {uploading &&
                    <LinearProgress mode="determinate" value={progress}/>
                  }
                  {cancel && uploading &&
                    <ConfirmButton className='m--margin-top-10 btn mt-btn mt-btn-danger' onClick={() => { cancel('canceled by user'); }}>
                      Cancel
                      <i className='la la-close m--margin-left-5'></i>
                    </ConfirmButton>}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-xs-12 m--margin-top-10">
          {success &&
            <PortletWidgets data={[
              {
                title: 'Total',
                value: results.get('total'),
                colorName: 'info',
              },
              {
                title: 'Inserted',
                value: results.get('inserted'),
                colorName: 'success',
              },
              {
                title: 'Failed',
                value: results.get('failed'),
                colorName: 'danger',
              }
            ]} title="Results" icon="flaticon-list-3"/>
          }
        </div>
      </div>
    );
  }
}

export default CsvUploadSection;
