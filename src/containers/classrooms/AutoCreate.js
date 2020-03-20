import React, {Component} from 'react';
import {connect} from "react-redux";
import {withTranslation} from 'react-i18next';
import Card from "../../components/ui/Card";
import {EditButton, HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, MessageRow} from "../../components/ui/Table";
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

  componentDidUpdate(prevProps) {
    this._openEditDialogOnSuccess(prevProps);
  }

  _openEditDialogOnSuccess(prevProps) {
    const success = this.props.getSingleRecordRequest.get('success');

    if (success && !prevProps.getSingleRecordRequest.get('success')) {
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

    if (this.state.page !== page) {
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
        <Td>{key + 1}</Td>
        <Td>{record.get('crsTitle')}</Td>
        <Td>{record.getIn(['publisher','name'])}</Td>
        <Td>{t(record.getIn(['autoCreateTask', 'frequency']))}</Td>
        <Td>{record.getIn(['autoCreateTask', 'rollOver'])}</Td>
        <Td>{record.getIn(['autoCreateTask', 'maxStudent'])}</Td>
        <Td className="actions">
          <HasPermission permissions={['[ClassRooms][Update][Any]']}>
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
              <Th>#</Th>
              <Th name='name'>{t('courseName')} </Th>
              <Th name='publisher'>{t('publisher')}</Th>
              <Th name='frequency'>{t('frequency')}</Th>
              <Th name='rollover'>{t('rolloverDayTime')}</Th>
              <Th name='max'>{t('maxStudents')}</Th>
              <Th name='action'>{t('createNow')}</Th>
            </HeadRow>
            </Thead>
            <Tbody>
            {loading &&
            <TablePreloader text={t('loading')} />
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

export default withTranslation('translations')(connect(
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
)(AutoCreate));