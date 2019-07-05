import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, MessageRow } from '../../../components/ui/table';
import Pagination from '../../../components/ui/Pagination';
import { selectStudentsRequest } from "../../../redux/reports/dashboard/selectors";
import { getStudents } from "../../../redux/reports/dashboard/actions";
import SearchInput from "../../../components/ui/SearchInput";

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: props.filters || [],
      page: props.getRecordsRequest.get('pagination').get('page'),
      perPage: props.getRecordsRequest.get('pagination').get('perPage')
    }        
  }

  componentDidMount () {
    this.props.getRecords({
                ...this.state.filters
    });    
  }

  _search (value) {
    let filters = {
        ...this.state.filters,
        filter: {composed: value}
    };

    this.setState({
      page: 1,
      filters
    }, this._getRecords);
  }
  
  _getRecords () {
    const { page, perPage, filters } = this.state;
       
    this.props.getRecords({
        page, perPage, ...filters
    });
  }

  _goToPage (page) {
    this.setState({ page }, this._getRecords);
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
        <MessageRow>{t('studentsNotFound')}</MessageRow>
      )
    }

    return records.map((record, key) => (
      <Row index={key} key={key}>        
        <Td width='60px'>
            <NavLink className="user-avatar" to={`/reports/students/${record.get('id')}`}>
                <img src={record.get('avatarSmall')} alt={record.get('crmName')} />
            </NavLink>
        </Td>
        <Td width='100px'>{record.get('firstName')}</Td>
        <Td width='100px'>{record.get('lastName')}</Td>
        <Td width='100px'>{record.get('username')}</Td>
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
            <NavLink to={`/reports/students/${record.get('id')}`}>
                <button title={t('showDetails')} className="btn m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill btn-success">
                    <i className="la la-search"></i>
                </button>
            </NavLink>
        </Td>
      </Row>
    ));
  }

  render() {
    const { getRecordsRequest, t } = this.props;
    const { page } = this.state;
    const loading = getRecordsRequest.get('loading');
    const totalPages = getRecordsRequest.get('pagination').get('totalPages');

    return (
        <div>
            <div className="text-right mb-3">
              <SearchInput
                className="portlet-header-input"
                id="search"
                type='search'
                placeholder={t('search')}
                onChange={(e) => { this._search(e) }}/>
            </div>
            <Table>
                <Thead>
                    <HeadRow>                        
                        <Th width='60px'>&nbsp;</Th>
                        <Th width='100px'>{t('firstName')}</Th>
                        <Th width='100px'>{t('lastName')}</Th>
                        <Th width='100px'>{t('username')}</Th>
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

Students = connect(
  (state) => ({
    getRecordsRequest: selectStudentsRequest(state)
  }),
  (dispatch) => ({
    getRecords: (params = {}) => { dispatch(getStudents(params)) }
  })
)(Students);

export default withTranslation('translations')(Students);