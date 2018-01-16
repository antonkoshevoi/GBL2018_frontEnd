import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Icon, MenuItem, Select } from 'material-ui';
import AddStudentDialog from './modals/AddStudentDialog';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {create, getRecords} from '../../redux/pages/students/actions';
import {HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead} from '../../components/ui/table';
import { selectGetRecordsRequest, selectPagination, selectRecords } from '../../redux/pages/students/selectors';
import { buildSortersQuery } from '../../helpers/utils';
import Pagination from '../../components/ui/Pagination';

class Students extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dialogIsOpen: false,
      sorters: {},
      page: props.pagination.get('page'),
      perPage: props.pagination.get('perPage')
    }
  }

  componentDidMount () {
    const { getRecords } = this.props;
    getRecords();
  }


  _openAddDialog = () => {
    this.setState({ dialogIsOpen: true });
  };

  _closeAddDialog = () => {
    this.setState({ dialogIsOpen: false });
  };

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
              <h2>Students Not Found...</h2>
            </div>
          </td>
        </tr>
      )
    }

    return records.map((record, key) => (
      <Row index={key} key={key}>
        <Td first={true} width='100px'>{key + 1}</Td>
        <Td width='132px'>{record.get('username')}</Td>
        <Td width='132px'>{record.get('firstName')}</Td>
        <Td width='132px'>{record.get('lastName')}</Td>
        <Td width='132px'>{record.get('email')}</Td>
        <Td width='132px'><span className='m-badge m-badge--brand m-badge--wide'>Student</span></Td>
        <Td width='132px'>{record.get('school')}</Td>
        <Td width='100px'>
          <button  className='btn btn-accent m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill'>
            <i className='la la-edit'></i>
          </button>
        </Td>
      </Row>
    ));
  }

  /**
   *
   * @private
   */
  _getRecords () {
    const { sorters, page, perPage } = this.state;

    this.props.getRecords({
      orderBy: buildSortersQuery(sorters),
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

  _onCreate () {
    const { pagination } = this.props;
    const page = pagination.get('page');
    this._goToPage(page);
    //
    // this.setState({ page }, this._getRecords);
  }

  render() {
    const { getRecordsRequest, pagination } = this.props;
    const { dialogIsOpen, sorters, page, perPage } = this.state;
    const loading = getRecordsRequest.get('loading');
    const totalPages = pagination.get('totalPages');

    return (
      <div className='fadeInLeft  animated'>

        <div className='m-portlet m-portlet--head-solid-bg m-portlet--brand'>
          <div className='m-portlet__head'>
            <div className='m-portlet__head-caption'>
              <div className='m-portlet__head-title'>
              <span className='m-portlet__head-icon'>
							  <i className='la la-user' style={{fontSize:'55px'}}></i>
						  </span>
                <h3 className='m-portlet__head-text'>
                  Students
                </h3>
              </div>
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
                  <Button raised color='accent' onClick={this._openAddDialog} className='mt-btn mt-btn-success' style={{marginRight:'7px'}}>
                    Add New
                    <Icon style={{marginLeft:'5px'}}>add</Icon>
                  </Button>
                  <NavLink className='link-btn' to='/students/csv'>
                  <Button raised className='btn-success mt-btn mt-btn-success' >

                         Bulk Add Students
                    <Icon style={{marginLeft:'5px'}}>person</Icon>
                  </Button>
                  </NavLink>
                </div>

              </div>
            </div>

            <Table>
              <Thead>
                <HeadRow>
                  <Th onSort={ (name) => { this._sort(name) }} dir={sorters['id']} name='id' first={true} width='100px'>#</Th>
                  <Th onSort={ (name) => { this._sort(name) }} dir={sorters['username']} name='username' width='132px'>Username</Th>
                  <Th onSort={ (name) => { this._sort(name) }} dir={sorters['firstName']} name='firstName' width='132px'>Firstname</Th>
                  <Th onSort={ (name) => { this._sort(name) }} dir={sorters['lastName']} name='lastName' width='132px'>Lastname</Th>
                  <Th onSort={ (name) => { this._sort(name) }} dir={sorters['email']} name='email' width='132px'>Email</Th>
                  <Th width='132px'>Role</Th>
                  <Th onSort={ (name) => { this._sort(name) }} dir={sorters['school']} name='school' width='132px'>School</Th>
                  <Th onSort={ (name) => { this._sort(name) }} dir={sorters['actions']} name='actions' width='100px'>Actions</Th>
                </HeadRow>
              </Thead>

              <Tbody>
                {loading &&
                  <TablePreloader text="Loading..." color="accent"/>
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

        <AddStudentDialog
          dialogIsOpen={dialogIsOpen}
          onClose={this._closeAddDialog}
          onSuccess={() => { this._onCreate() }}/>
      </div>
    );
  }
}

Students = connect(
  (state) => ({
    getRecordsRequest: selectGetRecordsRequest(state),
    pagination: selectPagination(state),
    records: selectRecords(state),
  }),
  (dispatch) => ({
    getRecords: (params = {}) => { dispatch(getRecords(params)) }
  })
)(Students);


export default translate('students')(Students);