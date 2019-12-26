import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { AppBar, CircularProgress, DialogContent, Icon, Toolbar, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { selectGetStudentsRecordsRequest, selectUnSubscribeStudentRequest } from "../../../redux/subscriptions/selectors";
import { getStudentsRecords, unSubscribeStudent, resetUnSubscribeStudentRequest } from "../../../redux/subscriptions/actions";
import { Date } from "../../../components/ui/DateTime";
import {HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, MessageRow} from "../../../components/ui/Table";
import Modal from '../../../components/ui/Modal';
import DeleteButton from "../../../components/ui/DeleteButton";

class StudentsModal extends Component {

    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
        onSuccess: PropTypes.any.isRequired
    };
  
    constructor (props) {
        super(props);
        this.state = {
            subscriptionId: props.subscriptionId
        };        
    } 
    
    componentDidUpdate (prevProps) {
        const { getStudentsRecords, resetUnSubscribeStudentRequest } = this.props;
      
        if (this.props.subscriptionId && !prevProps.subscriptionId) {
            this.setState({
              subscriptionId: this.props.subscriptionId
            });            
            getStudentsRecords(this.props.subscriptionId);
        }        

        if (this.props.unSubscribeStudentRequest.get('success') && !prevProps.unSubscribeStudentRequest.get('success')) {
            getStudentsRecords(this.props.subscriptionId);
            resetUnSubscribeStudentRequest();
        }        
    }

    _close () {
        this.props.onClose();    
    }
    
    _unsubscribeStudent (id) {        
        this.props.unSubscribeStudent(id);
    }
    
    _renderStudents () {
        const { studentsRecordsRequest, t} = this.props;
        
        if (studentsRecordsRequest.get('success') && studentsRecordsRequest.get('records').size === 0) {
            return (
                <MessageRow>{t('noSubscribedUsers')}</MessageRow>
            );
        }

        return studentsRecordsRequest.get('records').map((item, i) => {    
            return <Row index={i} key={i}>                     
                <Td>{item.get('studentFirstName')} {item.get('studentLastName')}</Td>                        
                <Td>{item.get('courseTitle')}</Td>    
                <Td>{item.get('classroomName')}</Td>
                <Td><Date time={item.get('createdAt')} /></Td>                                                
                <Td className='actions'>
                    <DeleteButton btnName={t('delete')} title={t('areYouSureWantToCancelThisCourse')} onClick={() => { this._unsubscribeStudent(item.get('id')) }}/>                                                
                </Td>
            </Row>
        });
    }

  render() {
    const { isOpen, studentsRecordsRequest, unSubscribeStudentRequest, t } = this.props;              
    
    return (
      <Modal bigger={true} isOpen={isOpen} onClose={() => this._close()}>
        <AppBar position='static' color='primary' className='dialogAppBar'>
          <Toolbar>            
              { (!studentsRecordsRequest.get('success') || unSubscribeStudentRequest.get('loading')) ? (
                <CircularProgress className="mr-3" color='inherit'/>
              ) : (
                <Icon className="mr-3">persone</Icon>
              )}            
            <Typography variant="h6" color='inherit'>
              {t('assignedStudents')}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className='mt-4'>                            
            <Table >
                <Thead>
                    <HeadRow>                                 
                        <Th name='student'>{t('student')}</Th>
                        <Th name='course'>{t('course')}</Th>
                        <Th name='course'>{t('classroom')}</Th>
                        <Th name='assignDate'>{t('assignDate')}</Th>
                        <Th name='actions'>{t('actions')}</Th>
                    </HeadRow>
                </Thead>
                <Tbody>                    
                    { !studentsRecordsRequest.get('success') ? <TablePreloader text={t('loading')} /> : this._renderStudents() }
                </Tbody>
            </Table>                            
        </DialogContent>
      </Modal>
    );
  }
}

export default withTranslation('translations')(connect(
    (state) => ({
        studentsRecordsRequest: selectGetStudentsRecordsRequest(state),
        unSubscribeStudentRequest: selectUnSubscribeStudentRequest(state)
    }),
    (dispatch) => ({
        getStudentsRecords: (id, params = {}) => { dispatch(getStudentsRecords(id, params)) },
        unSubscribeStudent: (id, params = {}) => { dispatch(unSubscribeStudent(id, params)) },
        resetUnSubscribeStudentRequest: () => { dispatch(resetUnSubscribeStudentRequest()) }
    })
)(StudentsModal));