import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, MessageRow } from '../../components/ui/table';
import { Button, Icon, MenuItem, Select, Typography } from '@material-ui/core';
import { uri } from '../../helpers/uri';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { getRecords, deleteRecord } from '../../redux/invitations/actions';
import {
  selectDeleteRecordRequest, selectGetRecordsRequest, selectPagination,
  selectRecords
} from '../../redux/invitations/selectors';
import { buildSortersQuery } from '../../helpers/utils';
import Pagination from '../../components/ui/Pagination';
import DeleteButton from '../../components/ui/DeleteButton';
import SendInvitationModal from './modals/SendInvitationModal';
import moment from 'moment/moment';

function TabContainer(props) {
  return (
    <Typography component='div'>
      {props.children}
    </Typography>
  );
}

class InvitationsTab extends Component {
  static propTypes = {
    keyword: PropTypes.string,
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

  componentWillReceiveProps(nextProps) {
    this._handleDeleteRecordRequestSuccess(nextProps);
    this._handleKeywordChange(nextProps);
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

  /**
   *
   * @private
   */
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
    const deleteSuccess = this.props.deleteRecordRequest.get('success');
    const nextDeleteSuccess = nextProps.deleteRecordRequest.get('success');

    if(!deleteSuccess && nextDeleteSuccess) {
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
  _handleKeywordChange (nextProps) {
    const keyword = this.props.keyword;
    const nextKeyword = nextProps.keyword;

    if(keyword !== nextKeyword) {
      this._search(nextKeyword);
    }
  }

  /**
   *
   * @param name
   * @private
   */
  _sort (name) {
    let sorters = {};

    if(this.state.sorters[name]) {
      sorters[name] = this.state.sorters[name] === 'asc' ? 'desc' : 'asc';
    } else {
      sorters[name] = 'asc';
    }

    this.setState({ sorters }, this._getRecords);
  }

  /**
   *
   * @param perPage
   * @private
   */
  _selectPerPage (perPage) {
    this.setState({ perPage }, this._getRecords)
  }

  /**
   *
   * @param page
   * @private
   */
  _goToPage (page) {
    this.setState({ page }, this._getRecords)
  }

  /**
   *
   * @private
   */
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
        <Td width='180px'>{record.get('email')}</Td>
        <Td width='132px'>{record.get('name')}</Td>
        <Td width='80px'>
          { this._renderStatus(record) }
        </Td>
        <Td width='132px'>{record.getIn(['course', 'crsTitle'])}</Td>        
        <Td width='132px'>{moment(record.get('date')).format('ll')}</Td>
        <Td width='100px'>
          <a title="View Invitation" href={uri('invitations/details/' + record.get('id') + '/' + record.get('securityHash'))} className="btn btn-success m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill" target="_blank">
             <i className='la la-search'></i>
          </a>
          <DeleteButton title={t('areYouSure')} onClick={() => { this._deleteRecord(record.get('id')) }}/>
        </Td>
      </Row>
    ));
  }
  _renderStatus (record) {
    const { t } = this.props;
  
    if(record.get('isAccepted')) {
      return <span className='m-badge m-badge--success m-badge--wide'>{t('accepted')}</span>;
    }
    if(record.get('isDeclined')) {
      return <span className='m-badge m-badge--danger m-badge--wide'>{t('declined')}</span>;
    }
    if(record.get('isExpired')) {
      return <span className='m-badge m-badge--warning m-badge--wide'>{t('expired')}</span>;
    }
    return <span className='m-badge m-badge--brand m-badge--wide'>{t('pending')}</span>;
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
      <TabContainer>
        <div className='m-portlet__body'>
          <div className='m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30'>
            <div className='row align-items-center'>
              <div className='col-xl-12 order-1 order-xl-2 m--align-right'>
                <Select
                  className='pull-left table-select'
                  value={perPage}
                  onChange={(e) => { this._selectPerPage(e.target.value) }}>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={100}>100</MenuItem>
                </Select>
                <Button variant="contained" color='primary' onClick={() => { this._openCreateDialog() }} className='mt-btn mt-btn-success'>
                  {t('sendNewInvitation')}
                  <Icon className="m--margin-left-5">send</Icon>
                </Button>
              </div>
            </div>
          </div>
          <Table>
            <Thead>
            <HeadRow>
              <Th onSort={ (name) => { this._sort(name) }} dir={sorters['email']} name='email' first={true} width='180px'>{t('email')}</Th>
              <Th onSort={ (name) => { this._sort(name) }} dir={sorters['name']} name='name' width='132px'>{t('name')}</Th>
              <Th onSort={ (name) => { this._sort(name) }} dir={sorters['status']} name='status' width='80px'>{t('status')}</Th>
              <Th onSort={ (name) => { this._sort(name) }} dir={sorters['course']} name='course' width='132px'>{t('course')}</Th>
              <Th onSort={ (name) => { this._sort(name) }} dir={sorters['date']} name='date' width='132px'>{t('date')}</Th>
              <Th width='100px'>{t('actions')}</Th>
            </HeadRow>
            </Thead>

            <Tbody>
            {loading && <TablePreloader text='Loading...' color='primary'/>}
            { this._renderRecords() }
            </Tbody>
          </Table>

          <div className='row'>
            <div className='col-sm-12 text-right'>
              <Pagination page={page} totalPages={totalPages} onPageSelect={(page) => this._goToPage(page)}/>
            </div>
          </div>
        </div>

        <SendInvitationModal
          isOpen={createModalIsOpen}
          onClose={() => { this._closeCreateDialog() }}
          onSuccess={() => { this._onCreate() }}/>
      </TabContainer>
    );
  }
}

InvitationsTab = connect(
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
)(InvitationsTab);

export default translate('translations')(InvitationsTab);
