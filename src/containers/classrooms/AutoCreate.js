import React, {Component} from 'react';
import {connect} from "react-redux";
import {translate} from 'react-i18next';
import Card from "../../components/ui/Card";
import {EditButton, HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, MessageRow} from "../../components/ui/table";
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
    this.props.getSchoolTeachers();
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

  _editRecord (id) {
    this.props.getSingleRecord(id);    
  }

  _openEditDialog = () => {
    this.setState({ editModalIsOpen: true });
  };
  _closeEditDialog = () => {
    this.setState({ editModalIsOpen: false });
  };

  _renderRecords(){
    const records = this.props.classroomRecords;
    const loading = this.props.getParentPublicClassroom.get('loading');
    const {t} = this.props; 
    if (!loading && records.size === 0) {
      return (
        <MessageRow>{t('autoClassroomsNotFound')}</MessageRow>
      )
    }

    return records.map((record, key) => (
      <Row index={key} key={key}>
        <Td width='100px'>{key + 1}</Td>
        <Td width='132px'>{record.get('crsTitle')}</Td>
        <Td width='132px'>{record.getIn(['publisher','name'])}</Td>
        <Td width='132px'>{t(record.getIn(['autoCreateTask', 'frequency']))}</Td>
        <Td width='132px'>{record.getIn(['autoCreateTask', 'rollOver'])}</Td>
        <Td width='132px'>{record.getIn(['autoCreateTask', 'maxStudent'])}</Td>
        <Td width='150px' className="actions">
          <HasPermission permissions={[
            '[ClassRooms][Update][Any]'
          ]}>
            <EditButton btnName={t('edit')} onClick={(id) => { this._editRecord(id) }} id={record.get('crsId')}/>
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
          <Table>
            <Thead>
            <HeadRow>
              <Th width='100px'>#</Th>
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


export default translate('translations')(AutoCreate);