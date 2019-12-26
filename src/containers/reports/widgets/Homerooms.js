import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, MessageRow } from '../../../components/ui/Table';
import Pagination from '../../../components/ui/Pagination';
import { selectHomeroomsRequest } from "../../../redux/reports/dashboard/selectors";
import { getHomerooms } from "../../../redux/reports/dashboard/actions";

class Homerooms extends Component {
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
        <MessageRow>{t('homeroomsNotFound')}</MessageRow>
      )
    }

    return records.map((record, key) => (
      <Row index={key} key={key}>        
        <Td width='60px'>
            <NavLink className="user-avatar" to={`/reports/homerooms/${record.get('id')}`}>
                <img src={record.get('avatar')} alt={record.get('crmName')} />
            </NavLink>
        </Td>
        <Td width='150px'>{record.get('name')}</Td>               
        <Td width='100px'>{record.get('studentsCount')}</Td>
        <Td width='300px'>
          <div>
            <span className="text-right d-block">{Math.round(record.get('passRate'))} %</span>
            <div className="progress m-progress--sm">
              <div title={t('completed')} className="progress-bar bg-success" role="progressbar" style={{width: record.get('completed') + '%'}}></div>
              <div title={t('inProgress')} className="progress-bar bg-warning" role="progressbar" style={{width: record.get('inProgress') + '%'}}></div>
            </div>
            <br/>
            <div className="progress m-progress--sm">
              <div title={t('averageGrade')} className="progress-bar bg-success" role="progressbar" style={{width: record.get('averageGrade') + '%'}}></div>
              <div title={t('averageGrade')} className="progress-bar bg-danger" role="progressbar" style={{width: (100 - Math.round(record.get('averageGrade'))) + '%'}}></div>
            </div>
          </div>     
        </Td>
        <Td width='100px'>            
            <NavLink to={`/reports/homerooms/${record.get('id')}`}>
                <button title={t('showDetails')} className="btn m-btn--icon-only btn-success">
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

export default withTranslation('translations')(connect(
  (state) => ({
    getRecordsRequest: selectHomeroomsRequest(state)
  }),
  (dispatch) => ({
    getRecords: (params = {}) => { dispatch(getHomerooms(params)) }
  })
)(Homerooms));