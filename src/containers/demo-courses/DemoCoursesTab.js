import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { EditButton, HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, MessageRow } from '../../components/ui/Table';
import { Button, Icon } from '@material-ui/core';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { selectDeleteRequest, selectGetRecordsRequest, selectGetSingleRecordRequest, selectPagination, selectRecords } from '../../redux/classrooms/selectors';
import { buildSortersQuery } from '../../helpers/utils';
import { Date } from "../../components/ui/DateTime";
import { SelectPerPage } from "../../components/ui/SelectPerPage";
import Pagination from '../../components/ui/Pagination';
import DeleteButton from '../../components/ui/DeleteButton';
import { getDemoClassrooms, deleteRecord, getSingleRecord } from '../../redux/classrooms/actions';
import CreateDemoClassroomModal from './modals/CreateDemoClassroomModal';
import EditDemoClassroomModal from './modals/EditDemoClassroomModal';
import AssignStudentModal from './modals/AssignStudentModal';
import HasRole from "../middlewares/HasRole";

class DemoCoursesTab extends Component {
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
      editModalIsOpen: false,
      assignModalIsOpen: false,
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
    this._openEditDialogOnSingleRequestSuccess(prevProps);
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

  _openEditDialog () {
    this.setState({
      editModalIsOpen: true
    });
  }

  _closeEditDialog () {
    this.setState({
      editModalIsOpen: false
    });
  }
  
  _openAssignDialog () {
    this.setState({
      assignModalIsOpen: true
    });
  }

  _closeAssignDialog () {
    this.setState({
      assignModalIsOpen: false
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
  
  _handleDeleteRecordRequestSuccess(prevProps) {
    const success = this.props.deleteRecordRequest.get('success');    

    if(success && !prevProps.deleteRecordRequest.get('success')) {
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
    if(this.props.keyword !== prevProps.keyword) {
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

  _recordNumber(key) {
      const { page, perPage } = this.state;
      return (key + 1 + ((page - 1) * perPage));
  }
  
  _renderRecords () {
    const { records, t } = this.props;
    const loading = this.props.getRecordsRequest.get('loading');    

    if (!loading && records.size === 0) {
      return (
        <MessageRow>{t('classroomsNotFound')}</MessageRow>
      )
    }

    return records.map((record, key) => (
      <Row index={key} key={key}>
        <Td>{this._recordNumber(key)}</Td>
        <Td>{record.get('crmName')}</Td>
        <HasRole roles={['Superadministrator']}>
            <Td>{record.getIn(['school', 'schName'])}</Td>
        </HasRole>
        <Td>{record.getIn(['course', 'crsTitle'])}</Td>
        <Td>{record.getIn(['teacher', 'name'])}</Td>
        <Td>{record.get('studentsCount')}</Td>
        <Td><Date time={record.get('crmEndDate')} /></Td>
        <Td className="actions">
          <EditButton btnName={t('edit')} onClick={(id) => { this._editRecord(id) }} id={ record.get('id') }/>
          <DeleteButton btnName={t('delete')} title={t('areYouSureWantToArchiveClassroom')} icon="la la-archive" onClick={() => { this._deleteRecord(record.get('id')) }}/>
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

  render() {
    const { getRecordsRequest, pagination, t } = this.props;
    const { createModalIsOpen, editModalIsOpen, assignModalIsOpen, sorters, page, perPage } = this.state;
    const loading = getRecordsRequest.get('loading');
    const totalPages = pagination.get('totalPages');

    return (
        <div className='m-portlet__body'>
          <div className='mt-3 mb-4 text-right'>
            <SelectPerPage value={perPage} onChange={(value) => { this._selectPerPage(value) }} className="pull-left" />
            <Button variant="contained" color='primary' onClick={() => { this._openAssignDialog() }} className='mt-btn mt-btn-success mr-3'>
              {t('assignStudent')}
              <Icon className="ml-2">persone</Icon>
            </Button>                 
            <Button variant="contained" color='primary' onClick={() => { this._openCreateDialog() }} className='mt-btn mt-btn-success'>
              {t('addNew')}
              <Icon className="ml-2">add</Icon>
            </Button>
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
                <Th onSort={ (name) => { this._sort(name) }} dir={sorters['endDate']} name='endDate'>{t('endDate')}</Th>
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
          
          <CreateDemoClassroomModal
              isOpen={createModalIsOpen}
              onClose={() => { this._closeCreateDialog() }}
              onSuccess={() => { this._onCreate() }}/>

          <EditDemoClassroomModal
              isOpen={editModalIsOpen}
              onClose={() => { this._closeEditDialog() }}
              onSuccess={() => { this._onCreate() }}/>

          <AssignStudentModal
              isOpen={assignModalIsOpen}
              onClose={() => { this._closeAssignDialog() }}
              onSuccess={() => { this._onCreate() }}/>          
        </div>
    );
  }
}

export default withTranslation('translations')(connect(
  (state) => ({
    getRecordsRequest: selectGetRecordsRequest(state),
    getSingleRecordRequest: selectGetSingleRecordRequest(state),
    deleteRecordRequest: selectDeleteRequest(state),
    pagination: selectPagination(state),
    records: selectRecords(state)
  }),
  (dispatch) => ({
    getRecords: (params = {}) => { dispatch(getDemoClassrooms(params)) },
    getSingleRecord: (id, params = {}) => { dispatch(getSingleRecord(id, params)) },
    deleteRecord: (id, params = {}) => { dispatch(deleteRecord(id, params)) },
  })
)(DemoCoursesTab));
