import React, {Component} from 'react';
import {Avatar, AppBar, CircularProgress, DialogContent, Icon, Toolbar, Typography, Divider, Button, DialogActions} from '@material-ui/core';
import { HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, MessageRow } from '../../../components/ui/table';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import {selectGetStudentsRequest} from '../../../redux/parents/selectors';
import Modal from "../../../components/ui/Modal";

class StudentsModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            students: []
        };
    }

    componentWillReceiveProps(nextProps) {
        
        if (!this.props.studentsRequest.get('success') && nextProps.studentsRequest.get('success')) {
            this.setState({
                students: nextProps.studentsRequest.get('records').toJS()
            });
        }
    }

    _close() {
        this.setState({            
            students: []
        });
        this.props.onClose();
    };
    
    _renderStudents() {
        const {students} = this.state;
        const {t} = this.props;
        
        if (!students.length) {
            return <MessageRow>{t('studentsNotFound')}</MessageRow>;
        }
        
        return this.state.students.map((record, key) => (
            <Row index={key} key={key}>
                <Td width='80px'><Avatar src={record.avatarSmall} alt={record.name} /></Td>
                <Td width='132px'>{record.name}</Td>                
                <Td width='132px'>{record.username || '-'}</Td>
                <Td width='132px'>{record.email || '-'}</Td>                                        
            </Row>
        ));        
    }

    render() {
        const {isOpen, studentsRequest, t} = this.props;
        const loading = studentsRequest.get('loading');

        return (
            <Modal isOpen={isOpen} middle={true} onClose={() => this._close()}>

                <AppBar position="static" color="primary" className="dialogAppBar">
                    <Toolbar>                        
                        {loading ? (
                            <CircularProgress className="m--margin-right-15" color="inherit"/>
                        ) : (
                            <Icon className="m--margin-right-15">person</Icon>
                        )}                       
                        <Typography variant="h6" color="inherit">
                            {t('students')}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent className="m--margin-top-25">
                    <Table>
                        <Thead>
                            <HeadRow>                          
                                <Th width='80px'>{t('image')}</Th>
                                <Th width='132px'>{t('name')}</Th>
                                <Th width='132px'>{t('username')}</Th>                                
                                <Th width='132px'>{t('email')}</Th>
                            </HeadRow>
                        </Thead>
                        <Tbody>
                            {loading ? <TablePreloader text="Loading..." color="primary"/> : this._renderStudents()}
                        </Tbody>
                    </Table>
                </DialogContent>
                <Divider className='full-width'/>
                <DialogActions>
                    <Button                                                                        
                        className='mt-btn-success pull-right btn btn-success mt-btn'
                        color='primary'
                        onClick={() => this._close()} >                        
                        {t('ok')}
                    </Button>
                </DialogActions>
            </Modal>
        );
    }
}

StudentsModal = connect(
    (state) => ({
        studentsRequest: selectGetStudentsRequest(state)        
    }),
    (dispatch) => ({})
)(StudentsModal);

export default translate('translations')(StudentsModal);
