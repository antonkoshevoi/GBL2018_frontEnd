import React, {Component} from 'react';
import CsvUploadSection from "../../components/CsvUploadSection";
import Insctruction from "../../components/ui/Insctruction";
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { bulkUpload, resetBulkUploadRequest } from '../../redux/homerooms/actions';
import { selectBulkUploadRequest } from '../../redux/homerooms/selectors';

class HomeroomsBulkUpload extends Component {

  constructor (props) {
    super(props);
    const { t } = this.props;
    
    this.state = {  
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
        title: t('bulkAddInstructionCsv'),
        subList: [
          {title: 'name'},
          {title: 'startDate'},
          {title: 'endDate'},
          {title: 'enrollmentStartDate'},
          {title: 'enrollmentEndDate'}
        ]
      },
      {title: t('bulkAddInstructionHeadings')},          
      {title: t('bulkAddInstructionColumnsOrder')},
      {title: t('bulkAddInstructionDates')},
      {title: t('bulkAddInstructionHomeroomFields')}
    ]
  };
  }

  componentDidMount () {      
      this.props.resetBulkUploadRequest();
  }

  render() {
    const { upload, bulkUploadRequest } = this.props;

    return (
      <div className="row  m-3">
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

HomeroomsBulkUpload = connect(
  (state) => ({    
    bulkUploadRequest: selectBulkUploadRequest(state)
  }),
  (dispatch) => ({    
    resetBulkUploadRequest: () => { dispatch(resetBulkUploadRequest()) },
    upload: (file) => {
      dispatch(bulkUpload(file));
    }
  })
)(HomeroomsBulkUpload);

export default withTranslation('translations')(HomeroomsBulkUpload);
