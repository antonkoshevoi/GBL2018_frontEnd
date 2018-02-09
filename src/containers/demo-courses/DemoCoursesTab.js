import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { EditButton, HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead } from '../../components/ui/table';
import { Button, Icon, MenuItem, Select, Typography } from 'material-ui';

import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import {
  selectDeleteRequest, selectGetRecordsRequest, selectGetSingleRecordRequest, selectPagination,
  selectRecords
} from '../../redux/classrooms/selectors';
import { buildSortersQuery } from '../../helpers/utils';
import Pagination from '../../components/ui/Pagination';
import DeleteButton from '../../components/ui/DeleteButton';
import { getDemoClassrooms, deleteRecord, getSingleRecord } from '../../redux/classrooms/actions';
import CreateDemoClassroomModal from './modals/CreateDemoClassroomModal';
import EditDemoClassroomModal from './modals/EditDemoClassroomModal';

function TabContainer(props) {
  return (
    <Typography component='div'>
      {props.children}
    </Typography>
  );
}

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
    this._openEditDialogOnSingleRequestSuccess(nextProps);
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
    const { records } = this.props;
    const loading = this.props.getRecordsRequest.get('loading');

    if (!loading && records.size === 0) {
      return (
        <tr>
          <td>
            <div className="table-message">
              <h2>Classrooms Not Found...</h2>
            </div>
          </td>
        </tr>
      )
    }

    return records.map((record, key) => (
      <Row index={key} key={key}>
        <Td first={true} width='100px'>{key + 1}</Td>
        <Td width='132px'>{record.get('crmName')}</Td>
        <Td width='132px'>{record.getIn(['school', 'schName'])}</Td>
        <Td width='132px'>{record.getIn(['course', 'crsTitle'])}</Td>
        <Td width='132px'>{record.getIn(['teacher', 'firstName'])} {record.getIn(['teacher', 'lastName'])}</Td>
        <Td width='132px'>{record.get('studentsCount')}</Td>
        <Td width='100px'>
          <EditButton onClick={(id) => { this._editRecord(id) }} id={ record.get('id') }/>
          <DeleteButton onClick={() => { this._deleteRecord(record.get('id')) }}/>
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
  _openEditDialogOnSingleRequestSuccess(nextProps) {
    const success = this.props.getSingleRecordRequest.get('success');
    const nextSuccess = nextProps.getSingleRecordRequest.get('success');

    if(!success && nextSuccess) {
      this._openEditDialog();
    }
  }

  render() {
    const { getRecordsRequest, pagination } = this.props;
    const { createModalIsOpen, editModalIsOpen, sorters, page, perPage } = this.state;
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
                <Button variant="raised" color='primary' onClick={() => { this._openCreateDialog() }} className='mt-btn mt-btn-success' style={{marginRight:'7px'}}>
                  Add new
                  <Icon style={{marginLeft:'5px'}}>add</Icon>
                </Button>
              </div>
            </div>
          </div>
          <Table>
            <Thead>
              <HeadRow>
                <Th first={true} width='100px'>#</Th>
                <Th onSort={ (name) => { this._sort(name) }} dir={sorters['name']} name='name' width='122px'>Name</Th>
                <Th onSort={ (name) => { this._sort(name) }} dir={sorters['school']} name='school' width='122px'>School</Th>
                <Th onSort={ (name) => { this._sort(name) }} dir={sorters['course']} name='course' width='122px'>Course</Th>
                <Th onSort={ (name) => { this._sort(name) }} dir={sorters['teacher']} name='teacher' width='122px'>Teacher</Th>
                <Th onSort={ (name) => { this._sort(name) }} dir={sorters['studentsCount']} name='studentsCount' width='122px'>Students Count</Th>
                <Th width='100px'>Actions</Th>
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

        <CreateDemoClassroomModal
          isOpen={createModalIsOpen}
          onClose={() => { this._closeCreateDialog() }}
          onSuccess={() => { this._onCreate() }}/>

        <EditDemoClassroomModal
          isOpen={editModalIsOpen}
          onClose={() => { this._closeEditDialog() }}
          onSuccess={() => { this._onCreate() }}/>
      </TabContainer>
    );
  }
}

DemoCoursesTab = connect(
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
)(DemoCoursesTab);

export default translate('demoCourses')(DemoCoursesTab);
