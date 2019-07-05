import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Button, Icon } from '@material-ui/core';
import { connect } from 'react-redux';
import { HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, MessageRow } from '../../components/ui/table';
import { selectGetRecordsRequest, selectStudentStatusRequest } from '../../redux/student-parents/selectors';
import { getRecords, deleteStudentRequest, resetStudentRequest } from '../../redux/student-parents/actions';
import DeleteButton from "../../components/ui/DeleteButton";
import AddParentModal from "./modals/AddParentModal";
import ViewParentModal from "./modals/ViewParentModal";

class StudentParents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createModalIsOpen: false,
            viewModalIsOpen: false,
            viewRecord: null
        }
    }

    componentDidMount() {
        this._getRecords();
    }

    componentWillReceiveProps(nextProps) {
        this._deleteRequestSuccess(nextProps);
    }

    _openViewDialog(record) {
        this.setState({
            viewModalIsOpen: true,
            viewRecord: record.toJS()
        });
    }    
   
    _closeViewDialog() {
        this.setState({
            viewModalIsOpen: false,
            viewRecord: null
        });
    }
    
    _openCreateDialog() {
        this.setState({createModalIsOpen: true});
    }    
   
    _closeCreateDialog() {
        this.setState({createModalIsOpen: false});
    }
    
    _getRecords() {
        const {getRecords} = this.props;
        getRecords();        
    }
    
    _getStatus(record) {        
        let status = 'pending';
        let className = 'm-badge--default';
        
        if (record.get('accepted')) {
            status = 'accepted';
            className = 'm-badge--success';
        }
        if (record.get('declined')) {
            status = 'declined';
            className = 'm-badge--danger';              
        }
        return <span className={`m-badge m-badge--brand m-badge--wide ${className}`}>{this.props.t(status)}</span>;
    }

    _renderRecords() {
        const {t} = this.props;
        const loading = this.props.getRecordsRequest.get('loading');
        const records = this.props.getRecordsRequest.get('records');

        if (!loading && records.size === 0) {
            return (<MessageRow>{t('parentsNotFound')}</MessageRow>);
        }

        return records.map((record, key) => (
            <Row index={key} key={key}>
                <Td><img src={record.get('avatarSmall')} alt={record.get('name')} /></Td>
                <Td>{record.get('name')}</Td>                
                <Td>{record.get('username') || '-'}</Td>
                <Td>{record.get('email') || '-'}</Td>
                <Td>{this._getStatus(record)}</Td>
                <Td className='actions'>                    
                    <button onClick={() => { this._openViewDialog(record) }} className='btn btn-accent m-btn m-btn--icon m-btn--icon-only ml-2 m-btn--custom m-btn--pill'>
                        <i className='la la-search'></i>
                    </button>
                    <DeleteButton btnName={t('delete')} title={t('areYouSure')} onClick={() => { this._deleteRecord(record.get('requestId')) }}/>
                </Td>
            </Row>
        ));
    }

    _deleteRecord(id) {
        this.props.deleteStudentRequest(id);
    }

    _deleteRequestSuccess(nextProps) {
        const deleteSuccess     = this.props.studentStatusRequest.get('success');
        const nextDeleteSuccess = nextProps.studentStatusRequest.get('success');

        if (!deleteSuccess && nextDeleteSuccess) {
            this.props.resetStudentRequest();
            this._getRecords();
        }
    }

    render() {
        const {getRecordsRequest, t} = this.props;
        const {createModalIsOpen, viewModalIsOpen, viewRecord} = this.state;
        const loading = getRecordsRequest.get('loading');

        return (
            <div className='fadeInLeft animated'>
                <div className='m-portlet m-portlet--head-solid-bg'>
                    <div className='m-portlet__head border-b-orange'>
                        <div className='m-portlet__head-caption'>
                            <div className='m-portlet__head-title'>
                                <span className='m-portlet__head-icon'><i className='la la-user'></i></span>
                                <h3 className='m-portlet__head-text'>{t('myParents')}</h3>
                            </div>
                        </div>
                    </div>
                    <div className='m-portlet__body'>
                        <div className='mt-3 mb-4'>
                            <div className='row'>
                                <div className='col-sm-12 m--align-right m-0'>       
                                    <Button variant="contained" color='primary' onClick={() => { this._openCreateDialog() }} className='mt-btn mt-btn-success'>
                                        {t('addNew')} <Icon className="ml-2">add</Icon>
                                    </Button>                  
                                </div>
                            </div>
                        </div>
                        <Table>
                            <Thead>
                            <HeadRow>                          
                                <Th>&nbsp;</Th>
                                <Th>{t('name')}</Th>
                                <Th>{t('username')}</Th>                                
                                <Th>{t('email')}</Th>                                
                                <Th>{t('status')}</Th>
                                <Th className="actions">{t('actions')}</Th>
                            </HeadRow>
                            </Thead>
                            <Tbody>
                                {loading && <TablePreloader text={t('loading')} /> }
                            { this._renderRecords() }
                            </Tbody>
                        </Table>
                    </div>
                </div>
                <AddParentModal isOpen={createModalIsOpen} onSuccess={() => { this._getRecords() }} onClose={() => { this._closeCreateDialog() }} />                
                <ViewParentModal data={viewRecord} isOpen={viewModalIsOpen} onSuccess={() => { this._closeViewDialog() }} onClose={() => { this._closeViewDialog() }} />
            </div>);
    }
}

StudentParents = connect(
    (state) => ({
        getRecordsRequest: selectGetRecordsRequest(state),
        studentStatusRequest: selectStudentStatusRequest(state)
    }),
    (dispatch) => ({
        getRecords: (params = {}) => { dispatch(getRecords(params)) },
        deleteStudentRequest: (id) => { dispatch(deleteStudentRequest(id)) },
        resetStudentRequest: () => { dispatch(resetStudentRequest()) }
    })
)(StudentParents);

export default withTranslation('translations')(StudentParents);