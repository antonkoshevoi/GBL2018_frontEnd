import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, MessageRow } from '../../components/ui/Table';
import { Button, Icon } from '@material-ui/core';
import { uri } from '../../helpers/uri';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { getRecords, deleteRecord } from '../../redux/invitations/actions';
import { selectDeleteRecordRequest, selectGetRecordsRequest, selectPagination, selectRecords } from '../../redux/invitations/selectors';
import { buildSortersQuery } from '../../helpers/utils';
import { Date } from "../../components/ui/DateTime";
import { SelectPerPage } from "../../components/ui/SelectPerPage";
import Pagination from '../../components/ui/Pagination';
import DeleteButton from '../../components/ui/DeleteButton';
import SendInvitationModal from './modals/SendInvitationModal';

class InvitationsTab extends Component {
  static propTypes = {
    keyword: PropTypes.string
  };

  static defaultProps = {
    keyword: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      createModalIsOpen: false,
      sorters: {},
      filters: {},
      page: props.pagination.get('page'),
      perPage: props.pagination.get('perPage')
    }
  }

  componentDidMount () {
    const { getRecords } = this.props;
    getRecords();
  }

  componentDidUpdate(prevProps) {
    this._handleDeleteRecordRequestSuccess(prevProps);
    this._handleKeywordChange(prevProps);
  }

  _openCreateDialog () {
    this.setState({
      createModalIsOpen: true
    });
  }

  _closeCreateDialog () {
    this.setState({
      createModalIsOpen: false
    });
  }

  _getRecords () {
    const { filters, sorters, page, perPage } = this.state;

    this.props.getRecords({
      orderBy: buildSortersQuery(sorters),
      filter: filters,
      page, perPage
    });
  }

  _deleteRecord (id) {
    this.props.deleteRecord(id);
  }
  
  _handleDeleteRecordRequestSuccess(nextProps) {
    const success = this.props.deleteRecordRequest.get('success');
    const prevSuccess = nextProps.deleteRecordRequest.get('success');

    if (success && !prevSuccess) {
      this._getRecords();
    }
  }

  _search (value) {
    let filters = {
      composed: value
    };

    this.setState({
      page: 1,
      filters
    }, this._getRecords);
  }
  
  _handleKeywordChange (prevProps) {
    if (this.props.keyword !== prevProps.keyword) {
      this._search(this.props.keyword);
    }
  }

  _sort (name) {
    let sorters = {};

    if(this.state.sorters[name]) {
      sorters[name] = this.state.sorters[name] === 'asc' ? 'desc' : 'asc';
    } else {
      sorters[name] = 'asc';
    }

    this.setState({ sorters }, this._getRecords);
  }

  _selectPerPage (perPage) {
    this.setState({ perPage }, this._getRecords)
  }

  _goToPage (page) {
    this.setState({ page }, this._getRecords)
  }

  _renderRecords () {
    const { records, getRecordsRequest, t } = this.props;
    const loading = getRecordsRequest.get('loading');

    if (!loading && records.size === 0) {
      return (
        <MessageRow>{t('invitationsNotFound')}</MessageRow>
      )
    }

    return records.map((record, key) => (
      <Row index={key} key={key}>
        <Td>{record.get('email')}</Td>
        <Td>{record.get('name')}</Td>
        <Td>{ this._renderStatus(record) }</Td>
        <Td>{record.getIn(['course', 'crsTitle'])}</Td>        
        <Td><Date time={record.get('date')} /></Td>
        <Td className="actions">
          <a title={t('viewInvitation')} rel="noopener noreferrer" href={uri(`invitations/details/${record.get('id')}/${record.get('securityHash')}`)} className="btn btn-success m-btn--icon-only" target="_blank">
             <i className='la la-search'></i>
          </a>
          <DeleteButton btnName={t('delete')} title={t('areYouSure')} onClick={() => { this._deleteRecord(record.get('id')) }}/>
        </Td>
      </Row>
    ));
  }
  _renderStatus (record) {
    const { t } = this.props;
  
    if(record.get('isAccepted')) {
      return <span className='badge badge-success'>{t('accepted')}</span>;
    }
    if(record.get('isDeclined')) {
      return <span className='badge badge-danger'>{t('declined')}</span>;
    }
    if(record.get('isExpired')) {
      return <span className='badge badge-warning'>{t('expired')}</span>;
    }
    return <span className='badge badge-info'>{t('pending')}</span>;
  }

  /**
   * Change page if necessary after creating a new record
   */
  _onCreate () {
    const { pagination } = this.props;
    const page = pagination.get('page');

    if(this.state.page !== page) {
      this._goToPage(page);
    }
  }

  render() {
    const { getRecordsRequest, pagination, t } = this.props;
    const { createModalIsOpen, sorters, page, perPage } = this.state;
    const loading = getRecordsRequest.get('loading');
    const totalPages = pagination.get('totalPages');

    return (      
        <div className='m-portlet__body'>
          <div className='mt-3 mb-4 text-right'>
            <SelectPerPage value={perPage} onChange={(value) => { this._selectPerPage(value) }} className="pull-left" />
            <Button variant="contained" color='primary' onClick={() => { this._openCreateDialog() }} className='mt-btn mt-btn-success'>
              {t('sendNewInvitation')}
              <Icon className="ml-2">send</Icon>
            </Button>
          </div>
          <Table>
            <Thead>
            <HeadRow>
              <Th onSort={ (name) => { this._sort(name) }} dir={sorters['email']} name='email' first={true}>{t('email')}</Th>
              <Th onSort={ (name) => { this._sort(name) }} dir={sorters['name']} name='name'>{t('name')}</Th>
              <Th onSort={ (name) => { this._sort(name) }} dir={sorters['status']} name='status'>{t('status')}</Th>
              <Th onSort={ (name) => { this._sort(name) }} dir={sorters['course']} name='course'>{t('course')}</Th>
              <Th onSort={ (name) => { this._sort(name) }} dir={sorters['date']} name='date'>{t('date')}</Th>
              <Th>{t('actions')}</Th>
            </HeadRow>
            </Thead>

            <Tbody>
            {loading && <TablePreloader text={t('loading')} color='primary'/>}
            { this._renderRecords() }
            </Tbody>
          </Table>

          <div className='row'>
            <div className='col-sm-12 text-right'>
              <Pagination page={page} totalPages={totalPages} onPageSelect={(page) => this._goToPage(page)}/>
            </div>
          </div>
          
          <SendInvitationModal
              isOpen={createModalIsOpen}
              onClose={() => { this._closeCreateDialog() }}
              onSuccess={() => { this._onCreate() }}/>      
        </div>
    );
  }
}

export default withTranslation('translations')(connect(
  (state) => ({
    getRecordsRequest: selectGetRecordsRequest(state),
    deleteRecordRequest: selectDeleteRecordRequest(state),
    pagination: selectPagination(state),
    records: selectRecords(state)
  }),
  (dispatch) => ({
    getRecords: (params = {}) => { dispatch(getRecords(params)) },
    deleteRecord: (id, params = {}) => { dispatch(deleteRecord(id, params)) },
  })
)(InvitationsTab));
