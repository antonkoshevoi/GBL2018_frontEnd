import React, {Component} from 'react';
import {Avatar, AppBar, CircularProgress, DialogContent, Icon, Toolbar, Typography, Divider, Button, DialogActions} from '@material-ui/core';
import { HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, MessageRow } from '../../../components/ui/Table';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
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
                <Td><Avatar src={record.avatarSmall} alt={record.name} /></Td>
                <Td>{record.name}</Td>                
                <Td>{record.username || '-'}</Td>
                <Td>{record.email || '-'}</Td>                                        
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
                            <CircularProgress className="mr-3" color="inherit"/>
                        ) : (
                            <Icon className="mr-3">person</Icon>
                        )}                       
                        <Typography variant="h6" color="inherit">
                            {t('students')}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent className="mt-4">
                    <Table>
                        <Thead>
                            <HeadRow>                          
                                <Th>{t('image')}</Th>
                                <Th>{t('name')}</Th>
                                <Th>{t('username')}</Th>                                
                                <Th>{t('email')}</Th>
                            </HeadRow>
                        </Thead>
                        <Tbody>
                            {loading ? <TablePreloader text={t('loading')} /> : this._renderStudents()}
                        </Tbody>
                    </Table>
                </DialogContent>
                <Divider className='full-width'/>
                <DialogActions>
                    <Button                                                                        
                        className='mt-btn-success mt-btn'
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

export default withTranslation('translations')(StudentsModal);
