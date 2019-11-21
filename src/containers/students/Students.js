import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Button, Icon } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, EditButton, MessageRow } from '../../components/ui/Table';
import { SelectPerPage } from "../../components/ui/SelectPerPage";
import { buildSortersQuery } from '../../helpers/utils';
import { selectDeleteRequest, selectGetRecordsRequest, selectGetSingleRecordRequest, selectPagination, selectRecords } from '../../redux/students/selectors';
import {deleteRecord, getRecords, getSingleRecord} from '../../redux/students/actions';
import Pagination from '../../components/ui/Pagination';
import CreateStudentModal from './modals/CreateStudentModal';
import EditStudentModal from "./modals/EditStudentModal";
import SearchInput from "../../components/ui/SearchInput";
import DeleteButton from "../../components/ui/DeleteButton";
import HasPermission from "../middlewares/HasPermission";
import HasRole from "../middlewares/HasRole";

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createModalIsOpen: false,
      editModalIsOpen: false,
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
    this._openEditDialogOnSingleRequestSuccess(prevProps);
    this._deleteRequestSuccess(prevProps);
  }

  _openCreateDialog = () => {
    this.setState({ createModalIsOpen: true });
  };
  
  _closeCreateDialog = () => {
    this.setState({ createModalIsOpen: false });
  };

  _openEditDialog = () => {
    this.setState({ editModalIsOpen: true });
  };
  
  _closeEditDialog = () => {
    this.setState({ editModalIsOpen: false });
  };

  /**
   * Records
   */
  _getRecords () {
    const { sorters, filters, page, perPage } = this.state;

    this.props.getRecords({
      orderBy: buildSortersQuery(sorters),
      filter: filters,
      page, perPage
    });
  }
  
  _recordNumber(key) {
      const { page, perPage } = this.state;
      return (key + 1 + ((page - 1) * perPage));
  }
  
  _renderRecords () {
    const { records, t } = this.props;    
    const loading = this.props.getRecordsRequest.get('loading');

      if (!loading && records.size === 0) {
      return (
        <MessageRow>{t('studentsNotFound')}</MessageRow>
      )
    }

    return records.map((record, key) => (
      <Row index={key} key={key}>
        <Td>{this._recordNumber(key)}</Td>
        <Td>{record.get('username')}</Td>
        <Td>{record.get('firstName')}</Td>
        <Td>{record.get('lastName')}</Td>
        <Td>{record.get('email')}</Td>        
        <HasRole roles={['Superadministrator']}>
            <Td>{record.get('schoolName')}</Td>
        </HasRole>
        <Td className="actions">
          <NavLink className='link-btn' to={`/reports/students/${record.get('id')}`}>
            <button className='btn btn-accent m-btn--icon-only mr-2' title={t('viewReport')}>
              <i className='la la-bar-chart'></i>
            </button>
          </NavLink>
          <HasPermission permissions={['[Users][Students][Update][Any]']}>
            <EditButton btnName={t('edit')} onClick={(id) => { this._editRecord(id) }} id={record.get('id')}/>
          </HasPermission>
          <HasPermission permissions={['[Users][Students][Delete][Any]']}>
            <DeleteButton btnName={t('delete')} title={t('areYouSure')} onClick={() => { this._deleteRecord(record.get('id')) }}/>
          </HasPermission>
        </Td>
      </Row>
    ));
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

  _editRecord (id) {
    this.props.getSingleRecord(id);
  }
  
  _openEditDialogOnSingleRequestSuccess(prevProps) {
    const success = this.props.getSingleRecordRequest.get('success');

    if (success && !prevProps.getSingleRecordRequest.get('success')) {
      this._openEditDialog();
    }
  }

  _deleteRecord (id) {
    this.props.deleteRecord(id);
  }
  
  _deleteRequestSuccess(prevProps) {
    const success = this.props.getDeleteRequest.get('success');

    if(success && !prevProps.getDeleteRequest.get('success')) {
      this._getRecords();
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
  
  _search (value) {
    let filters = {
      composed: value
    };

    this.setState({
      page: 1,
      filters
    }, this._getRecords);
  }
  
  _selectPerPage (perPage) {
    const total = this.props.pagination.get('total');
    const totalPages = Math.ceil(total / perPage);
    const page = Math.min(this.state.page, totalPages);

    this.setState({ perPage, page }, this._getRecords)
  }
  _goToPage (page) {
    this.setState({ page }, this._getRecords)
  }

  render() {
    const { getRecordsRequest, pagination, t } = this.props;
    const { createModalIsOpen, editModalIsOpen, sorters, page, perPage } = this.state;
    const loading = getRecordsRequest.get('loading');
    const totalPages = pagination.get('totalPages');

    return (
      <div className='fadeInLeft  animated'>
        <div className='m-portlet m-portlet--head-solid-bg '>
          <div className='m-portlet__head border-b-orange'>
            <div className='m-portlet__head-caption'>
              <div className='m-portlet__head-title'>
                <span className='m-portlet__head-icon'>
		  <i className='la la-user'></i>
                </span>
                <h3 className='m-portlet__head-text'>
                  {t('students')}
                </h3>
              </div>
            </div>
            <div className="m-portlet__head-tools">
              <SearchInput
                className="portlet-header-input"
                id="search"
                type='search'
                placeholder={t('search')}
                onChange={(e) => { this._search(e) }}/>
            </div>
          </div>
          <div className='m-portlet__body'>
            <div className='mt-3 mb-4 text-right'>
              <SelectPerPage value={perPage} onChange={(value) => { this._selectPerPage(value) }} className="pull-left" />
              <HasPermission permissions={['[Users][Students][Create][Any]']}>
                <Button variant="contained" color='primary' onClick={() => { this._openCreateDialog() }} className='mt-btn mt-btn-success mr-3'>
                  {t('addNew')}
                  <Icon className="ml-2">add</Icon>
                </Button>
              </HasPermission>
              <HasPermission permissions={['[Users][Students][Create][Bulk][Any]']}>
                <NavLink className='link-btn' to='/students/csv'>
                <Button variant="contained" className='mt-btn mt-btn-success'>
                  {t('bulkAddStudents')} 
                  <Icon className="ml-2">person</Icon>
                </Button>
                </NavLink>
              </HasPermission>
            </div>
            <Table>
              <Thead>
                <HeadRow>
                  <Th>#</Th>
                  <Th onSort={ (name) => { this._sort(name) }} dir={sorters['username']} name='username'>{t('username')}</Th>
                  <Th onSort={ (name) => { this._sort(name) }} dir={sorters['firstName']} name='firstName'>{t('firstName')}</Th>
                  <Th onSort={ (name) => { this._sort(name) }} dir={sorters['lastName']} name='lastName'>{t('lastName')}</Th>
                  <Th onSort={ (name) => { this._sort(name) }} dir={sorters['email']} name='email'>{t('email')}</Th>                  
                  <HasRole roles={['Superadministrator']}>
                  <Th onSort={ (name) => { this._sort(name) }} dir={sorters['school']} name='school'>{t('school')}</Th>
                  </HasRole>
                  <Th className='actios'>{t('actions')}</Th>
                </HeadRow>
              </Thead>

              <Tbody>
                {loading &&
                  <TablePreloader text={t('loading')} />
                }
                { this._renderRecords() }
              </Tbody>
            </Table>

            <div className="row">
              <div className="col-sm-12 mt-5 text-right">
                <Pagination page={page} totalPages={totalPages} onPageSelect={(page) => this._goToPage(page)}/>
              </div>
            </div>
          </div>
        </div>

        <CreateStudentModal
          isOpen={createModalIsOpen}
          onClose={() => { this._closeCreateDialog() }}
          onSuccess={() => { this._onCreate() }}/>

        <EditStudentModal
          isOpen={editModalIsOpen}
          onClose={() => { this._closeEditDialog() }}
          onSuccess={() => { this._onCreate() }}/>
      </div>
    );
  }
}

Students = connect(
  (state) => ({
    getRecordsRequest: selectGetRecordsRequest(state),
    getSingleRecordRequest: selectGetSingleRecordRequest(state),
    getDeleteRequest: selectDeleteRequest(state),
    pagination: selectPagination(state),
    records: selectRecords(state),
  }),
  (dispatch) => ({
    getRecords: (params = {}) => { dispatch(getRecords(params)) },
    getSingleRecord: (id, params = {}) => { dispatch(getSingleRecord(id, params)) },
    deleteRecord: (id, params = {}) => { dispatch(deleteRecord(id, params)) }
  })
)(Students);

export default withTranslation('translations')(Students);