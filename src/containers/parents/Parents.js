import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Icon } from '@material-ui/core';
import { connect } from 'react-redux';
import { HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead } from '../../components/ui/table';
import { selectGetRecordsRequest, selectStudentStatusRequest } from '../../redux/parents/selectors';
import { getRecords, deleteStudentRequest, resetStudentRequest } from '../../redux/parents/actions';
import DeleteButton from "../../components/ui/DeleteButton";
import AddParentModal from "./modals/AddParentModal";
import ViewParentModal from "./modals/ViewParentModal";

class Parents extends Component {
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
            return (
            <tr>
                <td>
                    <div className="table-message">
                        <h2>{t('parentsNotFound')}</h2>
                    </div>
                </td>
            </tr>);
        }

        return records.map((record, key) => (
            <Row index={key} key={key}>
                <Td first={true} width='80px'><img width="100%" src={record.get('avatar')} alt={record.get('name')} /></Td>
                <Td width='132px'>{record.get('name')}</Td>                
                <Td width='132px'>{record.get('username') || '-'}</Td>
                <Td width='132px'>{record.get('email') || '-'}</Td>
                <Td width='132px'>{this._getStatus(record)}</Td>
                <Td width='132px' className='text-center'>                    
                    <button onClick={() => { this._openViewDialog(record) }} className='btn btn-accent m-btn m-btn--icon m-btn--icon-only m--margin-left-5 m-btn--custom m-btn--pill'>
                        <i className='la la-search'></i>
                    </button>
                    <DeleteButton title={t('areYouSure')} onClick={() => { this._deleteRecord(record.get('requestId')) }}/>
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
            <div className='fadeInLeft  animated'>                
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
                        <div className='m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30'>
                            <div className='row align-items-center'>
                                <div className='col-xl-12 order-1 order-xl-2 m--align-right margin-0'>       
                                    <Button variant="contained" color='primary' onClick={() => { this._openCreateDialog() }} className='mt-btn mt-btn-success'>
                                        {t('addNew')} <Icon style={{marginLeft: '5px'}}>add</Icon>
                                    </Button>                  
                                </div>
                            </div>
                        </div>
                        <Table>
                            <Thead>
                            <HeadRow>                          
                                <Th width='80px'>&nbsp;</Th>
                                <Th width='132px'>{t('name')}</Th>
                                <Th width='132px'>{t('username')}</Th>                                
                                <Th width='132px'>{t('email')}</Th>                                
                                <Th width='132px'>{t('status')}</Th>
                                <Th width='132px'>{t('actions')}</Th>
                            </HeadRow>
                            </Thead>
                            <Tbody>
                                {loading && <TablePreloader text="Loading..." color="primary"/> }
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

Parents = connect(
    (state) => ({
        getRecordsRequest: selectGetRecordsRequest(state),
        studentStatusRequest: selectStudentStatusRequest(state)
    }),
    (dispatch) => ({
        getRecords: (params = {}) => { dispatch(getRecords(params)) },
        deleteStudentRequest: (id) => { dispatch(deleteStudentRequest(id)) },
        resetStudentRequest: () => { dispatch(resetStudentRequest()) }
    })
)(Parents);

export default translate('translations')(Parents);