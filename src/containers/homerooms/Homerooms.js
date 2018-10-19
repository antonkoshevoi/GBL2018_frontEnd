import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Icon, MenuItem, Select } from '@material-ui/core';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, EditButton } from '../../components/ui/table';
import { buildSortersQuery } from '../../helpers/utils';
import {
  selectDeleteRequest,
  selectGetRecordsRequest, selectGetSingleRecordRequest, selectPagination,
  selectRecords
} from '../../redux/homerooms/selectors';
import {deleteRecord, getRecords, getSingleRecord} from '../../redux/homerooms/actions';
import Pagination from '../../components/ui/Pagination';
import CreateHomeroomModal from './modals/CreateHomeroomModal';
import EditHomeroomModal from "./modals/EditHomeroomModal";
import SearchInput from "../../components/ui/SearchInput";
import DeleteButton from "../../components/ui/DeleteButton";
import HasPermission from "../middlewares/HasPermission";
import HasRole from "../middlewares/HasRole";

class Homerooms extends Component {
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

  componentWillReceiveProps(nextProps) {
    this._openEditDialogOnSingleRequestSuccess(nextProps);
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

  _recordNumber(key) {
    const { page, perPage } = this.state;
    return (key + 1 + ((page - 1) * perPage));
  } 
    
  _renderRecords () {
    const { records, t } = this.props;
    const loading = this.props.getRecordsRequest.get('loading');

      if (!loading && records.size === 0) {
      return (
        <tr>
          <td>
            <div className="table-message">
              <h2>{t('homeroomsNotFound')}</h2>
            </div>
          </td>
        </tr>
      )
    }

    return records.map((record, key) => (
      <Row index={key} key={key}>
        <Td first={true} width='60px'>{this._recordNumber(key)}</Td>
        <Td width='132px'>{record.get('name')}</Td>
        <HasRole roles={['Superadministrator']}>
        <Td width='132px'>{record.getIn(['school', 'schName'])}</Td>
        </HasRole>
        <Td width='132px'>{record.getIn(['teacher', 'name'])}</Td>
        <Td width='132px'>{record.get('studentsCount')}</Td>
        <HasPermission permissions={['[HomeRooms][Update][Any]', 'HomeRooms][Delete][Any']}>
        <Td width='100px'>
          <HasPermission permissions={['[HomeRooms][Update][Any]']}>
            <EditButton onClick={(id) => { this._editRecord(id) }} id={record.get('id')}/>
          </HasPermission>
          <HasPermission permissions={['[HomeRooms][Delete][Any]']}>
            <DeleteButton title={t('areYouSure')} onClick={() => { this._deleteRecord(record.get('id')) }}/>
          </HasPermission>
        </Td>
        </HasPermission>
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
      composed: value,
      // name: value,
      // school: value,
      // teacher: value,
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

  /**
   *
   * @param page
   * @private
   */
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
    const { createModalIsOpen, editModalIsOpen, sorters, page, perPage } = this.state;
    const loading = getRecordsRequest.get('loading');
    const totalPages = pagination.get('totalPages');

    return (
      <div className='fadeInLeft  animated learning-areas'>

        <div className='m-portlet m-portlet--head-solid-bg'>
          <div className='m-portlet__head'>
            <div className='m-portlet__head-caption'>
              <div className='m-portlet__head-title'>
              <span className='m-portlet__head-icon'><i className='la la-user' style={{fontSize:'55px'}}></i></span>
                <h3 className='m-portlet__head-text'>
                  {t('homerooms')}
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
                  <HasPermission permissions={['[HomeRooms][Create][Any]']}>
                    <Button variant="raised" color='primary' onClick={() => { this._openCreateDialog() }} className='mt-btn mt-btn-success' style={{marginRight:'7px'}}>
                      {t('addNew')}
                      <Icon style={{marginLeft:'5px'}}>add</Icon>
                    </Button>
                  </HasPermission>
                  <HasPermission permissions={['[HomeRooms][Create][Bulk][Any]']}>
                    <NavLink className='link-btn' to='/homerooms/csv'>
                      <Button variant="raised" className='btn-success mt-btn mt-btn-success'>
                        {t('bulkAddHomerooms')}
                        <Icon style={{marginLeft:'5px'}}>person</Icon>
                      </Button>
                    </NavLink>
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
                  <Th onSort={ (name) => { this._sort(name) }} dir={sorters['teacher']} name='teacher' width='132px'>{t('teacher')}</Th>
                  <Th onSort={ (name) => { this._sort(name) }} dir={sorters['studentsCount']} name='studentsCount' width='132px'>{t('studentsCount')}</Th>
                  <HasPermission permissions={['[HomeRooms][Update][Any]', 'HomeRooms][Delete][Any']}>
                    <Th width='100px'>{t('actions')}</Th>
                  </HasPermission>
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

        <CreateHomeroomModal
          isOpen={createModalIsOpen}
          onClose={() => { this._closeCreateDialog() }}
          onSuccess={() => { this._onCreate() }}/>

        <EditHomeroomModal
          isOpen={editModalIsOpen}
          onClose={() => { this._closeEditDialog() }}
          onSuccess={() => { this._onCreate() }}/>
      </div>
    );
  }
}

Homerooms = connect(
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
)(Homerooms);


export default translate('translations')(Homerooms);