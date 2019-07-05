import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Button, Icon, MenuItem, Select } from '@material-ui/core';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, EditButton, MessageRow } from '../../components/ui/table';
import { buildSortersQuery } from '../../helpers/utils';
import { Date } from "../../components/ui/DateTime";
import { selectDeleteRequest, selectGetRecordForAssignStudentsRequest, selectGetRecordsRequest, selectGetSingleRecordRequest, selectPagination, selectRecords } from '../../redux/classrooms/selectors';
import { deleteRecord, getRecordForAssignStudents, getRecords, getSingleRecord } from '../../redux/classrooms/actions';
import Pagination from '../../components/ui/Pagination';
import CreateClassroomModal from './modals/CreateClassroomModal';
import EditClassroomModal from "./modals/EditClassroomModal";
import SearchInput from "../../components/ui/SearchInput";
import DeleteButton from "../../components/ui/DeleteButton";
import HasPermission from "../middlewares/HasPermission";
import HasRole from "../middlewares/HasRole";
import AssignStudentsModal from "./modals/AssignStudentsModal";

const AssignButton = ({ id, onClick, btnName}) => {
  return (
    <button
      title={btnName}
      className='btn btn-warning m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill ml-2'
      onClick={onClick && (() => { onClick(id) })}      
    >
      <i className='la la-user-plus'></i>
    </button>
  );
};

class Classrooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createModalIsOpen: false,
      editModalIsOpen: false,
      assignStudentsModalIsOpen: false,
      sorters: {},
      filters: {},
      page: props.pagination.get('page'),
      perPage: props.pagination.get('perPage')
    }
  }

  componentWillReceiveProps(nextProps) {
    this._openEditDialogOnSingleRequestSuccess(nextProps);
    this._openAssignStudentDialogOnSingleRequestSuccess(nextProps);
    this._deleteRequestSuccess(nextProps);
  }

  componentDidMount () {
    const { getRecords } = this.props;
    getRecords();
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

  _openAssignStudentsDialog  = () => {
    this.setState({ assignStudentsModalIsOpen: true });
  };
  _closeAssignStudentsDialog = () => {
    this.setState({ assignStudentsModalIsOpen: false });
  };

  _recordNumber(key) {
      const { page, perPage } = this.state;
      return (key + 1 + ((page - 1) * perPage));
  }
  /**
   *
   * @private
   */
  _renderRecords () {
    const { records, goTo, t } = this.props;
    const loading = this.props.getRecordsRequest.get('loading');
    
    
    if (!loading && records.size === 0) {
      return (
        <MessageRow>{t('classroomsNotFound')}</MessageRow>
      )
    }

    return records.map((record, key) => (
      <Row index={key} key={key}>
        <Td>{this._recordNumber(key)}</Td>
        <Td>
            {record.get('crmName')}
        </Td>
        <HasRole roles={['Superadministrator']}>
            <Td>{record.getIn(['school', 'schName'])}</Td>
        </HasRole>
        <Td>{record.getIn(['course', 'crsTitle'])}</Td>
        <Td>{record.getIn(['teacher', 'name'])}</Td>
        <Td>{record.get('studentsCount')}</Td>
        <Td>{(record.get('isPublic') ? t('yes') : t('no'))}</Td>
        <Td>            
            <span title={t(record.get('paid') ? 'classroomPaid' : 'classroomNotPaid')} className={`${record.get('paid') ? 'text-success' : 'text-danger '}`}>
                <i className={`display-5 la ${record.get('paid') ? 'la-dollar' : 'la-exclamation-triangle'}`}></i>
            </span>             
        </Td>
        <Td><Date time={record.get('crmEndDate')} /></Td>
        <Td className="actions">
          <HasPermission permissions={['[ClassRooms][Update][Any]']}>
            <EditButton btnName={t('edit')} onClick={(id) => { this._editRecord(id) }} id={record.get('id')}/>
          </HasPermission>
          <HasPermission permissions={['[ClassRooms][Update][Schedule]']}>
            <EditButton btnName={t('edit')} onClick={() => { goTo(`/classrooms/schedule/${record.get('id')}`); }} id={record.get('id')}/>
          </HasPermission>          
          <HasPermission permissions={['[ClassRooms][Assign][Student]']}>
            <AssignButton btnName={t('assignStudents')} onClick={() => { this._assignStudent(record.get('id')) }}/>
          </HasPermission>
          <HasPermission permissions={['[ClassRooms][Delete][Any]']}>
            <DeleteButton btnName={t('delete')} title={t('areYouSureWantToArchiveClassroom')} icon="la la-archive" onClick={() => { this._deleteRecord(record.get('id')) }}/>
          </HasPermission>
        </Td>
      </Row>
    ));
  }

  _editRecord (id) {
    this.props.getSingleRecord(id);
  }
  _openEditDialogOnSingleRequestSuccess(nextProps) {
    const success = this.props.getSingleRecordRequest.get('success');
    const nextSuccess = nextProps.getSingleRecordRequest.get('success');

    if(!success && nextSuccess) {
      this._openEditDialog();
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

  _assignStudent (id) {
    this.props.getRecordForAssignStudents(id);
  }
  _openAssignStudentDialogOnSingleRequestSuccess(nextProps) {
    const success = this.props.getRecordForAssignStudentsRequest.get('success');
    const nextSuccess = nextProps.getRecordForAssignStudentsRequest.get('success');

    if(!success && nextSuccess) {
      this._openAssignStudentsDialog();
    }
  }

  /**
   *
   * @private
   */
  _getRecords () {
    const { sorters, filters, page, perPage } = this.state;

    this.props.getRecords({
      orderBy: buildSortersQuery(sorters),
      filter: filters,
      page, perPage
    });
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
   * @param value
   * @private
   */
  _search(value) {
    let filters = {
      composed: value
    };

    this.setState({
      page: 1,
      filters
    }, this._getRecords);
  }

  /**
   *
   * @param perPage
   * @private
   */
  _selectPerPage (perPage) {
    const total = this.props.pagination.get('total');
    const totalPages = Math.ceil(total / perPage);
    const page = Math.min(this.state.page, totalPages);

    this.setState({ perPage, page }, this._getRecords)
  }

  _goToPage (page) {
    this.setState({ page }, this._getRecords)
  }

  _onCreate () {
    const { pagination } = this.props;
    const page = pagination.get('page');

    if(this.state.page !== page) {
      this._goToPage(page);
    }
  }

  render() {
    const { getRecordsRequest, pagination, t } = this.props;
    const { createModalIsOpen, editModalIsOpen, assignStudentsModalIsOpen, sorters, page, perPage } = this.state;
    const loading = getRecordsRequest.get('loading');
    const totalPages = pagination.get('totalPages');

    return (
      <div className='fadeInLeft  animated learning-areas'>
        <div className='m-portlet m-portlet--head-solid-bg '>
          <div className='m-portlet__head border-b-red'>
            <div className='m-portlet__head-caption'>
              <div className='m-portlet__head-title'>
                <span className='m-portlet__head-icon'>
                    <i className='la la-user'></i>
                </span>
                <h3 className='m-portlet__head-text'>                  
                  {t('classrooms')}
                </h3>
              </div>
            </div>
            <div className="m-portlet__head-tools">
              <SearchInput
                className="portlet-header-input"
                id="search"
                type='search'
                placeholder="Search"
                onChange={(e) => { this._search(e) }}/>
            </div>
          </div>
          <div className='m-portlet__body'>
            <div className='mt-3 mb-4'>
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
                  <HasPermission permissions={['[ClassRooms][Create][Any]']}>
                    <Button variant="contained" color='primary' onClick={() => { this._openCreateDialog() }} className='mt-btn mt-btn-success'>
                      {t('addNew')}
                      <Icon className="ml-2">add</Icon>
                    </Button>
                  </HasPermission>
                </div>
              </div>
            </div>

            <Table>
              <Thead>
                <HeadRow>
                  <Th>#</Th>
                  <Th onSort={ (name) => { this._sort(name) }} dir={sorters['name']} name='name'>{t('name')}</Th>
                  <HasRole roles={['Superadministrator']}>
                  <Th onSort={ (name) => { this._sort(name) }} dir={sorters['school']} name='school'>{t('school')}</Th>
                  </HasRole>
                  <Th onSort={ (name) => { this._sort(name) }} dir={sorters['course']} name='course'>{t('course')}</Th>
                  <Th onSort={ (name) => { this._sort(name) }} dir={sorters['teacher']} name='teacher'>{t('teacher')}</Th>
                  <Th onSort={ (name) => { this._sort(name) }} dir={sorters['studentsCount']} name='studentsCount'>{t('students')}</Th>
                  <Th>{t('public')}</Th>
                  <Th>{t('status')}</Th>
                  <Th onSort={ (name) => { this._sort(name) }} dir={sorters['endDate']} name='endDate'>{t('endDate')}</Th>
                  <Th>{t('actions')}</Th>
                </HeadRow>
              </Thead>

              <Tbody>
                { loading && <TablePreloader text={t('loading')} /> }
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

        <CreateClassroomModal
          isOpen={createModalIsOpen}
          onClose={() => { this._closeCreateDialog() }}
          onSuccess={() => { this._onCreate() }}/>

        <EditClassroomModal
          isOpen={editModalIsOpen}
          onClose={() => { this._closeEditDialog() }}
          onSuccess={() => { this._onCreate() }}/>

        <AssignStudentsModal
          isOpen={assignStudentsModalIsOpen}
          onClose={() => { this._closeAssignStudentsDialog() }}
          onSuccess={() => { this._onCreate() }}/>
      </div>
    );
  }
}

Classrooms = connect(
  (state) => ({
    getRecordsRequest: selectGetRecordsRequest(state),
    getSingleRecordRequest: selectGetSingleRecordRequest(state),
    getRecordForAssignStudentsRequest: selectGetRecordForAssignStudentsRequest(state),
    getDeleteRequest: selectDeleteRequest(state),
    pagination: selectPagination(state),
    records: selectRecords(state),
  }),
  (dispatch) => ({
    getRecords: (params = {}) => { dispatch(getRecords(params)) },
    getSingleRecord: (id, params = {}) => { dispatch(getSingleRecord(id, params)) },
    getRecordForAssignStudents: (id, params = {}) => { dispatch(getRecordForAssignStudents(id, params)) },
    deleteRecord: (id, params = {}) => { dispatch(deleteRecord(id, params)) },
    goTo: (url) => {dispatch(push(url))}
  })
)(Classrooms);


export default withTranslation('translations')(Classrooms);