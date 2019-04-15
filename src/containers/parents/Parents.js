import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Icon, MenuItem, Select } from '@material-ui/core';
import { connect } from 'react-redux';
import { HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, EditButton, MessageRow } from '../../components/ui/table';
import { buildSortersQuery } from '../../helpers/utils';
import { selectDeleteRequest, selectGetRecordsRequest, selectGetSingleRecordRequest, selectPagination, selectRecords, selectGetStudentsRequest } from '../../redux/parents/selectors';
import {deleteRecord, getRecords, getSingleRecord, getStudents} from '../../redux/parents/actions';
import Pagination from '../../components/ui/Pagination';
import CreateParentModal from './modals/CreateParentModal';
import EditParentModal from "./modals/EditParentModal";
import StudentsModal from "./modals/StudentsModal";
import Loader from "../../components/layouts/Loader";
import SearchInput from "../../components/ui/SearchInput";
import DeleteButton from "../../components/ui/DeleteButton";
import HasPermission from "../middlewares/HasPermission";
import HasRole from "../middlewares/HasRole";

class Parents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createModalIsOpen: false,
      editModalIsOpen: false,
      studentsModalIsOpen: false,
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
    this._openEditDialogOnSingleRequestSuccess(nextProps);
    this._openStudentsDialogOnRequestSuccess(nextProps);
    this._deleteRequestSuccess(nextProps);
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
  
  _openStudentsDialog = () => {
    this.setState({ studentsModalIsOpen: true });
  };

  _closeStudentsDialog = () => {
    this.setState({ studentsModalIsOpen: false });
  };  

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
  
  _showStudents (id) {
    this.props.getStudents(id);
  }
  
  _openEditDialogOnSingleRequestSuccess(nextProps) {
    const success = this.props.getSingleRecordRequest.get('success');
    const nextSuccess = nextProps.getSingleRecordRequest.get('success');

    if (!success && nextSuccess) {
      this._openEditDialog();
    }
  }
  
  _openStudentsDialogOnRequestSuccess (nextProps) {
    const success = this.props.getStudentsRequest.get('success');
    const nextSuccess = nextProps.getStudentsRequest.get('success');

    if(!success && nextSuccess) {
      this._openStudentsDialog();
    }
  }  

  _deleteRecord (id) {
    this.props.deleteRecord(id);
  }
  
  _deleteRequestSuccess(nextProps) {
    const deleteSuccess = this.props.getDeleteRequest.get('success');
    const nextDeleteSuccess = nextProps.getDeleteRequest.get('success');

    if(!deleteSuccess && nextDeleteSuccess) {
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

  _renderRecords () {
    const { records, t } = this.props;    
    const loading = this.props.getRecordsRequest.get('loading');

      if (!loading && records.size === 0) {
      return (
        <MessageRow>{t('parentsNotFound')}</MessageRow>
      )
    }

    return records.map((record, key) => (
      <Row index={key} key={key}>
        <Td width='60px'>{this._recordNumber(key)}</Td>
        <Td width='132px'>{record.get('username')}</Td>
        <Td width='132px'>{record.get('firstName')}</Td>
        <Td width='132px'>{record.get('lastName')}</Td>
        <Td width='132px'>{record.get('email')}</Td>        
        <Td width='132px'>{record.get('students')}
            {record.get('students') > 0 &&
                <button title={t('students')} className='ml-3 btn btn-accent m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill' onClick={() => { this._showStudents(record.get('id')) }} >
                    <i className='la la-search'></i>
                </button>
            }
        </Td>   
        <HasRole roles={['Superadministrator']}>
            <Td width='132px'>{record.get('schoolName')}</Td>
        </HasRole>
        <Td width='150px' className="actions">
          <HasPermission permissions={['[Users][Parents][Update]']}>
            <EditButton btnName={t('edit')} onClick={(id) => { this._editRecord(id) }} id={record.get('id')}/>
          </HasPermission>
          <HasPermission permissions={['[Users][Parents][Delete]']}>
            <DeleteButton btnName={t('delete')} title={t('areYouSure')} onClick={() => { this._deleteRecord(record.get('id')) }}/>
          </HasPermission>
        </Td>
      </Row>
    ));
  }
  
  render() {
    const { getRecordsRequest, getSingleRecordRequest, getDeleteRequest, getStudentsRequest, pagination, t } = this.props;
    const { createModalIsOpen, editModalIsOpen, studentsModalIsOpen, sorters, page, perPage } = this.state;
    const loading = getSingleRecordRequest.get('loading') || getDeleteRequest.get('loading') || getStudentsRequest.get('loading');
    const totalPages = pagination.get('totalPages');

    return (
        <div>
            {loading && <Loader />}
            <div className='fadeInLeft  animated'>                  
              <div className='m-portlet m-portlet--head-solid-bg '>
                <div className='m-portlet__head border-b-orange'>
                  <div className='m-portlet__head-caption'>
                    <div className='m-portlet__head-title'>
                      <span className='m-portlet__head-icon'>
                        <i className='la la-user'></i>
                      </span>
                      <h3 className='m-portlet__head-text'>
                        {t('parents')}
                      </h3>
                    </div>
                  </div>
                  <div className="m-portlet__head-tools">
                    <SearchInput className="portlet-header-input" id="search" type='search' placeholder={t('search')} onChange={(e) => { this._search(e) }}/>
                  </div>
                </div>
                <div className='m-portlet__body'>
                  <div className='m--margin-top-10 m--margin-bottom-30'>
                    <div className='row'>
                      <div className='col-sm-12 m--align-right'>
                        <Select
                          className="pull-left table-select"
                          value={perPage}
                          onChange={(e) => { this._selectPerPage(e.target.value) }}>
                          <MenuItem value={5}>5</MenuItem>
                          <MenuItem value={10}>10</MenuItem>
                          <MenuItem value={25}>25</MenuItem>
                          <MenuItem value={50}>50</MenuItem>
                          <MenuItem value={100}>100</MenuItem>
                        </Select>
                        <HasPermission permissions={['[Users][Parents][Create]']}>
                          <Button variant="contained" color='primary' onClick={() => { this._openCreateDialog() }} className='mt-btn mt-btn-success m--margin-right-10'>
                            {t('addNew')}
                            <Icon className="m--margin-left-5">add</Icon>
                          </Button>
                        </HasPermission>
                      </div>
                    </div>
                  </div>
                  <Table>
                    <Thead>
                      <HeadRow>
                        <Th width='60px'>#</Th>
                        <Th onSort={ (name) => { this._sort(name) }} dir={sorters['username']} name='username' width='132px'>{t('username')}</Th>
                        <Th onSort={ (name) => { this._sort(name) }} dir={sorters['firstName']} name='firstName' width='132px'>{t('firstName')}</Th>
                        <Th onSort={ (name) => { this._sort(name) }} dir={sorters['lastName']} name='lastName' width='132px'>{t('lastName')}</Th>
                        <Th onSort={ (name) => { this._sort(name) }} dir={sorters['email']} name='email' width='132px'>{t('email')}</Th>                  
                        <Th width='132px'>{t('students')}</Th>          
                        <HasRole roles={['Superadministrator']}>
                        <Th onSort={ (name) => { this._sort(name) }} dir={sorters['school']} name='school' width='132px'>{t('school')}</Th>
                        </HasRole>
                        <Th width='150px' className='actios'>{t('actions')}</Th>
                      </HeadRow>
                    </Thead>

                    <Tbody>
                      {getRecordsRequest.get('loading') &&
                        <TablePreloader text={t('loading')} />
                      }
                      { this._renderRecords() }
                    </Tbody>
                  </Table>

                  <div className="row">
                    <div className="col-sm-12 m--margin-top-40 text-right">
                      <Pagination page={page} totalPages={totalPages} onPageSelect={(page) => this._goToPage(page)}/>
                    </div>
                  </div>
                </div>
              </div>

              <CreateParentModal
                isOpen={createModalIsOpen}
                onClose={() => { this._closeCreateDialog() }}
                onSuccess={() => { this._onCreate() }}/>

              <EditParentModal
                isOpen={editModalIsOpen}
                onClose={() => { this._closeEditDialog() }}
                onSuccess={() => { this._onCreate() }}/>

              <StudentsModal
                isOpen={studentsModalIsOpen}
                onClose={() => { this._closeStudentsDialog() }} />

            </div>
      </div>
    );
  }
}

Parents = connect(
  (state) => ({
    getRecordsRequest: selectGetRecordsRequest(state),
    getSingleRecordRequest: selectGetSingleRecordRequest(state),
    getDeleteRequest: selectDeleteRequest(state),
    getStudentsRequest: selectGetStudentsRequest(state),
    pagination: selectPagination(state),
    records: selectRecords(state)
  }),
  (dispatch) => ({
    getRecords: (params = {}) => { dispatch(getRecords(params)) },
    getSingleRecord: (id, params = {}) => { dispatch(getSingleRecord(id, params)) },
    getStudents: (id, params = {}) => { dispatch(getStudents(id, params)) },
    deleteRecord: (id, params = {}) => { dispatch(deleteRecord(id, params)) }
  })
)(Parents);

export default translate('translations')(Parents);