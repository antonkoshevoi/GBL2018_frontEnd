import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Icon, MenuItem, Select } from '@material-ui/core';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, EditButton } from '../../components/ui/table';
import { buildSortersQuery } from '../../helpers/utils';
import {
  selectDeleteRequest, selectGetRecordForAssignStudentsRequest,
  selectGetRecordsRequest, selectGetSingleRecordRequest, selectPagination,
  selectRecords
} from '../../redux/classrooms/selectors';
import {deleteRecord, getRecordForAssignStudents, getRecords, getSingleRecord} from '../../redux/classrooms/actions';
import Pagination from '../../components/ui/Pagination';
import CreateClassroomModal from './modals/CreateClassroomModal';
import EditClassroomModal from "./modals/EditClassroomModal";
import SearchInput from "../../components/ui/SearchInput";
import DeleteButton from "../../components/ui/DeleteButton";
import HasPermission from "../middlewares/HasPermission";
import HasRole from "../middlewares/HasRole";
import AssignStudentsModal from "./modals/AssignStudentsModal";

const AssignButton = ({ id, onClick}) => {
  return (
    <button
      className='btn btn-warning m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill'
      onClick={onClick && (() => { onClick(id) })}
      style={{marginLeft: '5px'}}
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

  /**
   *
   * @private
   */
  _renderRecords () {
    const { records, goTo, t } = this.props;
    const loading = this.props.getRecordsRequest.get('loading');

      if (!loading && records.size === 0) {
      return (
        <tr>
          <td>
            <div className="table-message">
              <h2>{t('classroomsNotFound')}</h2>
            </div>
          </td>
        </tr>
      )
    }

    return records.map((record, key) => (
      <Row index={key} key={key}>
        <Td first={true} width='60px'>{key + 1}</Td>
        <Td width='132px'>
            {record.get('crmName')}
        </Td>
        <HasRole roles={['Superadministrator']}>
            <Td width='132px'>{record.getIn(['school', 'schName'])}</Td>
        </HasRole>
        <Td width='132px'>{record.getIn(['course', 'crsTitle'])}</Td>
        <Td width='132px'>{record.getIn(['teacher', 'firstName'])} {record.getIn(['teacher', 'lastName'])}</Td>
        <Td width='75px'>{record.get('studentsCount')}</Td>
        <Td width='75px'>{(record.get('isPublic') ? t('yes') : t('no'))}</Td>
        <Td width='75px'>            
            <button title={t(record.get('paid') ? 'classroomPaid' : 'classroomNotPaid')} className={`btn m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill ${record.get('paid') ? 'btn-success' : 'btn-danger '}`}>
                <i className={`la ${record.get('paid') ? 'la-dollar' : 'la-exclamation-triangle'}`} style={{fontSize: '2rem'}}></i>
            </button>             
        </Td>
        <Td width='150px'>
          <HasPermission permissions={['[ClassRooms][Update][Any]']}>
            <EditButton onClick={(id) => { this._editRecord(id) }} id={record.get('id')}/>
          </HasPermission>
          <HasPermission permissions={['[ClassRooms][Update][Schedule]']}>
            <EditButton onClick={() => { goTo(`/classrooms/schedule/${record.get('id')}`); }} id={record.get('id')}/>
          </HasPermission>          
          <HasPermission permissions={['[ClassRooms][Assign][Student]']}>
            <AssignButton onClick={() => { this._assignStudent(record.get('id')) }}/>
          </HasPermission>
          <HasPermission permissions={['[ClassRooms][Delete][Any]']}>
            <DeleteButton title={t('areYouSure')} onClick={() => { this._deleteRecord(record.get('id')) }}/>
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
        <div className='m-portlet m-portlet--head-solid-bg'>
          <div className='m-portlet__head'>
            <div className='m-portlet__head-caption'>
              <div className='m-portlet__head-title'>
                <span className='m-portlet__head-icon'>
                    <i className='la la-user' style={{fontSize:'55px'}}></i>
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
            <div className='m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30'>
              <div className='row align-items-center'>

                <div className='col-xl-12 order-1 order-xl-2 m--align-right'>
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
                  <HasPermission permissions={[
                    '[ClassRooms][Create][Any]'
                  ]}>
                    <Button variant="raised" color='primary' onClick={() => { this._openCreateDialog() }} className='mt-btn mt-btn-success' style={{marginRight:'7px'}}>
                      {t('addNew')}
                      <Icon style={{marginLeft:'5px'}}>add</Icon>
                    </Button>
                  </HasPermission>
                </div>

              </div>
            </div>

            <Table>
              <Thead>
                <HeadRow>
                  <Th first={true} width='60px'>#</Th>
                  <Th onSort={ (name) => { this._sort(name) }} dir={sorters['name']} name='name' width='132px'>{t('name')}</Th>
                  <HasRole roles={['Superadministrator']}>
                  <Th onSort={ (name) => { this._sort(name) }} dir={sorters['school']} name='school' width='132px'>{t('school')}</Th>
                  </HasRole>
                  <Th onSort={ (name) => { this._sort(name) }} dir={sorters['course']} name='course' width='132px'>{t('course')}</Th>
                  <Th onSort={ (name) => { this._sort(name) }} dir={sorters['teacher']} name='teacher' width='132px'>{t('teacher')}</Th>
                  <Th width='75px' onSort={ (name) => { this._sort(name) }} dir={sorters['studentsCount']} name='studentsCount'>{t('students')}</Th>
                  <Th width='75px'>{t('public')}</Th>
                  <Th width='75px'>{t('status')}</Th>
                  <Th width='150px'>{t('actions')}</Th>
                </HeadRow>
              </Thead>

              <Tbody>
                {loading &&
                  <TablePreloader text="Loading..." color="primary"/>
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


export default translate('translations')(Classrooms);