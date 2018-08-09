import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {translate} from 'react-i18next';
import {MenuItem, Select} from '@material-ui/core';
import Card from "../../components/ui/Card";
import {EditButton, HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead} from "../../components/ui/table";
import {selectGetRecordsRequest, selectGetSingleRecordRequest, selectPagination, selectRecords} from "../../redux/classrooms/selectors";
import {getRecordsPublic, getSingleAutoClassRecord, resetUpdateAutoClass} from "../../redux/classrooms/actions";
import HasPermission from "../middlewares/HasPermission";
import EditAutoClassroomModal from "./modals/EditAutoClassroomModal";
import {getSchoolTeachers} from "../../redux/schools/actions";

class AutoCreate extends Component {

  state = {
    editModalIsOpen : false,
  };

  componentDidMount() {
    this.props.resetUpdateAutoClass();
    this.props.getPublicClassrooms();
  }

  componentWillReceiveProps(nextProps) {
    this._openEditDialogOnSingleRequestSuccess(nextProps);
  }

  _openEditDialogOnSingleRequestSuccess(nextProps) {
    const success = this.props.getSingleRecordRequest.get('success');
    const nextSuccess = nextProps.getSingleRecordRequest.get('success');

    if(!success && nextSuccess) {
      this._openEditDialog();
    }
  }

  _goToPage (page) {
    this.setState({ page }, this._getRecords)
  }

  _onCreate () {
    this.props.getPublicClassrooms();
    const { pagination } = this.props;
    const page = pagination.get('page');

    if(this.state.page !== page) {
      this._goToPage(page);
    }
  }



  /**
   * @param perPage
   * @private
   */
  _selectPerPage = (perPage) => {
    // const total = this.props.pagination.get('total');
    // const totalPages = Math.ceil(total / perPage);
    // const page = Math.min(this.state.page, totalPages);
    //
    // this.setState({ perPage, page }, this._getRecords)
  };
  
  _editRecord (id) {
    this.props.getSingleRecord(id);
    this.props.getSchoolTeachers();
  }

  _openEditDialog = () => {
    this.setState({ editModalIsOpen: true });
  };
  _closeEditDialog = () => {
    this.setState({ editModalIsOpen: false });
  };


  _renderSelectPerPage(){
    let perPage = 10;
    return (
      <Select
        className="pull-left table-select"
        value={perPage}
        onChange={ (e) => this._selectPerPage(e.target.value)}>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={25}>25</MenuItem>
        <MenuItem value={50}>50</MenuItem>
        <MenuItem value={100}>100</MenuItem>
      </Select>
    )
  }

  _renderRecords(){
    const records = this.props.classroomRecords;
    const loading = this.props.getParentPublicClassroom.get('loading');
    const {t} = this.props; 
    if (!loading && records.size === 0) {
      return (
        <tr>
          <td>
            <div className="table-message">
              <h2>{t('autoClassroomsNotFound')}</h2>
            </div>
          </td>
        </tr>
      )
    }

    return records.map((record, key) => (
      <Row index={key} key={key}>
        <Td first={true} width='100px'>{key + 1}</Td>
        <Td width='132px'>{record.getIn(['courses', 'crsTitle'])}</Td>
        <Td width='132px'>{record.getIn(['courses', 'publisher','name'])}</Td>
        <Td width='132px'>{record.getIn(['courses', 'autoCreateTask', 'frequency', 'name'])}</Td>
        <Td width='132px'>{record.getIn(['courses', 'autoCreateTask', 'rollOver'])}</Td>
        <Td width='132px'>{record.getIn(['courses', 'autoCreateTask', 'maxStudent'])}</Td>
        <Td width='150px'>
          <HasPermission permissions={[
            '[ClassRooms][Update][Any]'
          ]}>
            <EditButton onClick={(id) => { this._editRecord(id) }} id={record.getIn(['courses','crsId'])}/>
          </HasPermission>
        </Td>
      </Row>
    ))
  }

  render() {
    const {getParentPublicClassroom, t} = this.props;
    const loading = getParentPublicClassroom.get('loading');
    const {editModalIsOpen} = this.state;
    return (
      <Card title={t('autoClass')}>
        <div className='col-xl-12 order-1 order-xl-2 m--align-right'>
          {this._renderSelectPerPage()}
        </div>
        <div className="col-12">
          <Table>
            <Thead>
            <HeadRow>
              <Th first={true} width='100px'>#</Th>
              <Th name='name' width='132px'>{t('courseName')} </Th>
              <Th name='publisher' width='132px'>{t('publisher')}</Th>
              <Th name='frequency' width='132px'>{t('frequency')}</Th>
              <Th name='rollover' width='132px'>{t('rolloverDayTime')}</Th>
              <Th name='max' width='132px'>{t('maxStudents')}</Th>
              <Th name='action' width='150px'>{t('createNow')}</Th>
            </HeadRow>
            </Thead>

            <Tbody>
            {loading &&
            <TablePreloader text="Loading..." color="primary"/>
            }
            { this._renderRecords() }
            </Tbody>
          </Table>
        </div>
        <EditAutoClassroomModal
          isPublic={true}
          isOpen={editModalIsOpen}
          onClose={() => { this._closeEditDialog() }}
          onSuccess={() => { this._onCreate() }}/>
      </Card>

    );
  }
}


AutoCreate = connect(
  (state) => ({
    getParentPublicClassroom: selectGetRecordsRequest(state),
    classroomRecords: selectRecords(state),
    getSingleRecordRequest: selectGetSingleRecordRequest(state),
    pagination: selectPagination(state)

  }),
  (dispatch) => ({
    getPublicClassrooms: () => {dispatch(getRecordsPublic())},
    getSingleRecord: (id, params = {}) => { dispatch(getSingleAutoClassRecord(id, params)) },
    getSchoolTeachers: () => {dispatch(getSchoolTeachers())},
    resetUpdateAutoClass: () => {dispatch(resetUpdateAutoClass())}

  }),
)(AutoCreate);


export default withRouter(translate('translations')(AutoCreate));