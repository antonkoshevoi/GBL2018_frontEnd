import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, CircularProgress,
  DialogContent,
  DialogContentText,
  Icon, IconButton,
  Toolbar, Typography,
  Divider, Button, DialogActions
} from '@material-ui/core';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { selectGetStudentsRecordsRequest } from "../../../redux/subscriptions/selectors";
import { getStudentsRecords } from "../../../redux/subscriptions/actions";
import Modal from '../../../components/ui/Modal';
import {HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead} from "../../../components/ui/table";
import {NavLink} from "react-router-dom";
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
    }; 
    
    componentWillReceiveProps (nextProps) {
        const { getStudentsRecords } = this.props;
      
        if (!this.props.subscriptionId && nextProps.subscriptionId) {
            this.setState({
              subscriptionId: nextProps.subscriptionId
            });            
            getStudentsRecords(nextProps.subscriptionId);
        }      
    }

    _close () {        
        //alert('_close');
        this.props.onClose();    
    };
    
    _unsubscribeStudent () {        
        alert('_unsubscribeStudent');
    };
    
    _renderStudents () {
        const { studentsRecordsRequest, t} = this.props;
        
        if (studentsRecordsRequest.get('success') && studentsRecordsRequest.get('records').size === 0) {
            return (
                <tr>
                    <td>
                        <div className="table-message">
                            <h2>{t('noSubscriptions')}</h2>
                        </div>
                    </td>
                </tr>
            );
        }

        return studentsRecordsRequest.get('records').map((item, i) => {    
            return <Row index={i} key={i}>                     
                <Td width='120px'>{item.get('studentFirstName')} {item.get('studentLastName')}</Td>                        
                <Td width='120px'>{item.get('courseTitle')}</Td>    
                <Td width='120px'>{item.get('createdAt')}</Td>                                                
                <Td width='120px' name='actions'>
                    <DeleteButton title={t('areYouSureWantToCancelThisCourse')} onClick={() => { this._unsubscribeStudent(item.get('id')) }}/>                                                
                </Td>
            </Row>
        });
    }

  render() {
    const { isOpen, studentsRecordsRequest, t } = this.props;              
    
    return (
      <Modal isOpen={isOpen} onClose={() => this._close()}>
        <AppBar position='static' color='primary' className='dialogAppBar'>
          <Toolbar>
            <IconButton color="inherit" aria-label='Close'>
              { !studentsRecordsRequest.get('success') ? (
                <CircularProgress style={{float: 'right'}} color='inherit'/>
              ) : (
                <Icon>persone</Icon>
              )}
            </IconButton>
            <Typography type='title' color='inherit'>
              {t('assignedStudents')}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className='m--margin-top-25'>                            
            <Table >
                <Thead>
                    <HeadRow>                                 
                        <Th width='120px' name='student'>{t('student')}</Th>
                        <Th width='120px' name='course'>{t('course')}</Th>
                        <Th width='120px' name='assignDate'>{t('assignDate')}</Th>
                        <Th width='120px' name='actions'>{t('actions')}</Th>
                    </HeadRow>
                </Thead>
                <Tbody>                    
                    { !studentsRecordsRequest.get('success') ? <TablePreloader text="Loading..." color="primary"/> : this._renderStudents() }
                </Tbody>
            </Table>                            
        </DialogContent>
      </Modal>
    );
  }
}

StudentsModal = connect(
    (state) => ({
        studentsRecordsRequest: selectGetStudentsRecordsRequest(state)
    }),
    (dispatch) => ({
        getStudentsRecords: (id, params = {}) => { dispatch(getStudentsRecords(id, params)) }
    })
)(StudentsModal);
  
export default translate('translations')(StudentsModal);