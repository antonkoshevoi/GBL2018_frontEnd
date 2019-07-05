import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, MessageRow } from '../../../components/ui/table';
import Pagination from '../../../components/ui/Pagination';
import { selectClassroomsRequest } from "../../../redux/reports/dashboard/selectors";
import { getClassrooms } from "../../../redux/reports/dashboard/actions";

class Classrooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: props.getRecordsRequest.get('pagination').get('page'),
      perPage: props.getRecordsRequest.get('pagination').get('perPage')
    }
  }

  componentDidMount () {
    const { getRecords } = this.props;
    getRecords();
  }

  /**
   *
   * @private
   */
  _renderRecords () {
    const { getRecordsRequest, t } = this.props;
    const loading = getRecordsRequest.get('loading');
    const records = getRecordsRequest.get('records');

    if (!loading && records.size === 0) {
      return (
        <MessageRow>{t('classroomsNotFound')}</MessageRow>
      )
    }

    return records.map((record, key) => (
      <Row index={key} key={key}>        
        <Td width='60px'>
            <NavLink className="user-avatar" to={`/reports/classrooms/${record.get('id')}`}>
                <img width="100%" src={record.get('avatar')} alt={record.get('crmName')} />
            </NavLink>
        </Td>
        <Td width='150px'>{record.get('crmName')}</Td>               
        <Td width='100px'>{record.get('studentsCount')}</Td>
        <Td width='300px'>
          <div>
            <span className="text-right d-block">{Math.round(record.get('passRate'))} %</span>
            <div className="progress m-progress--sm">
              <div title={t('averageGrade')} className="progress-bar bg-success" role="progressbar" style={{width: record.get('averageGrade') + '%'}}></div>
              <div title={t('averageGrade')} className="progress-bar bg-danger" role="progressbar" style={{width: (100 - Math.round(record.get('averageGrade'))) + '%'}}></div>
            </div>
            <br/>
            <div className="progress m-progress--sm">
              <div title={t('completed')} className="progress-bar bg-success" role="progressbar" style={{width: record.get('completed') + '%'}}></div>
              <div title={t('inProgress')} className="progress-bar bg-warning" role="progressbar" style={{width: record.get('inProgress') + '%'}}></div>
            </div>
          </div>        
        </Td>
        <Td width='100px'>            
            <NavLink to={`/reports/classrooms/${record.get('id')}`}>
                <button title={t('showDetails')} className="btn m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill btn-success">
                    <i className="la la-search"></i>
                </button>
            </NavLink>
        </Td>
      </Row>
    ));
  }

  _getRecords () {
    const { page, perPage } = this.state;

    this.props.getRecords({
      page, perPage
    });
  }

  _goToPage (page) {
    this.setState({ page }, this._getRecords);
  }

  render() {
    const { getRecordsRequest, t } = this.props;
    const { page } = this.state;
    const loading = getRecordsRequest.get('loading');
    const totalPages = getRecordsRequest.get('pagination').get('totalPages');

    return (
        <div>
            <Table>
                <Thead>
                    <HeadRow>                        
                        <Th width='60px'>&nbsp;</Th>
                        <Th width='150px'>{t('name')}</Th>
                        <Th width='100px'>{t('students')}</Th>
                        <Th width='300px'>{t('progress')}</Th>
                        <Th width='100px'>{t('actions')}</Th>                  
                    </HeadRow>
                </Thead>
                <Tbody>
                    { loading && <TablePreloader text={t('loading')} /> }
                    { this._renderRecords() }
                </Tbody>
            </Table>
            <div className="row">
                <div className="col-sm-12 mt-4 mb-5 text-right">
                    <Pagination page={page} totalPages={totalPages} onPageSelect={(page) => this._goToPage(page)}/>
                </div>
            </div>
        </div>
    );
  }
}

Classrooms = connect(
  (state) => ({
    getRecordsRequest: selectClassroomsRequest(state)
  }),
  (dispatch) => ({
    getRecords: (params = {}) => { dispatch(getClassrooms(params)) }
  })
)(Classrooms);

export default withTranslation('translations')(Classrooms);