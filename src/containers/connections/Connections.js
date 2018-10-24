import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Icon } from '@material-ui/core';
import { connect } from 'react-redux';
import { HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead } from '../../components/ui/table';
import { selectGetRecordsRequest, selectDeleteRequest, selectChangeStatusRequest } from '../../redux/connections/selectors';
import { getRecords, deleteRecord, resetDeleteRequest, accept, decline, resetChangeStatusRequest } from '../../redux/connections/actions';
import DeleteButton from "../../components/ui/DeleteButton";
import AddConnectionModal from "./modals/AddConnectionModal";
import ViewConnectionModal from "./modals/ViewConnectionModal";
import SendMessageModal from "../messages/modals/SendMessageModal";

class Connections extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createModalIsOpen: false,
            viewModalIsOpen: false,
            messageModalIsOpen: false,
            record: null
        }
    }

    componentDidMount() {
        this._getRecords();
    }

    componentWillReceiveProps(nextProps) {
        this._deleteRequestSuccess(nextProps);
        this._changeStatusRequestSuccess(nextProps);
    }

    _openMessageDialog(record) {
        this.setState({
            messageModalIsOpen: true,
            record: record.toJS()
        });
    }    
   
    _closeMessageDialog() {
        this.setState({
            messageModalIsOpen: false,
            record: null
        });
    }
    
    _openViewDialog(record) {
        this.setState({
            viewModalIsOpen: true,
            record: record.toJS()
        });
    }    
   
    _closeViewDialog() {
        this.setState({
            viewModalIsOpen: false,
            record: null
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

    _accept(id) {
        this.props.accept(id);
    }
    
    _decline(id) {
        this.props.decline(id);
    }
    
    _delete(id) {
        this.props.delete(id);
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
        if (record.get('waiting')) {
            status = 'waiting';
            className = 'm-badge--warning';              
        }        
        return <span className={`m-badge m-badge--brand m-badge--wide ${className}`}>{this.props.t(status)}</span>;
    }

    _renderRecords() {
        const {t, getRecordsRequest} = this.props;
        const loading = getRecordsRequest.get('loading');
        const records = getRecordsRequest.get('records');

        if (!loading && records.size === 0) {
            return (
            <tr>
                <td>
                    <div className="table-message">
                        <h2>{t('connectionsNotFound')}</h2>
                    </div>
                </td>
            </tr>);
        }

        return records.map((record, key) => (
            <Row index={key} key={key}>
                <Td first={true} width='80px'><img width="100%" src={record.get('avatar')} alt={record.get('name')} /></Td>
                <Td width='132px'>{record.get('name') || '-'}</Td>
                <Td width='132px'>{record.get('username') || '-'}</Td>
                <Td width='150px'>{record.get('email') || '-'}</Td>
                <Td width='132px'>{this._getStatus(record)}</Td>
                <Td width='150px' className='text-center'>
                    <button title={t('connectionDetails')}  onClick={() => { this._openViewDialog(record) }} className='btn btn-accent m-btn m-btn--icon m-btn--icon-only m--margin-left-5 m-btn--custom m-btn--pill'>
                        <i className='la la-search'></i>
                    </button>
                    {record.get('accepted') && 
                        <button title={t('sendMessage')} onClick={() => { this._openMessageDialog(record) }} className='btn btn-accent m-btn m-btn--icon m-btn--icon-only m--margin-left-5 m-btn--custom m-btn--pill'>
                            <i className='la la-envelope'></i>
                        </button>
                    }
                    {record.get('waiting') && 
                        <button title={t('accept')} onClick={() => { this._accept(record.get('connectionId')) }} className='btn btn-success m-btn m-btn--icon m-btn--icon-only m--margin-left-5 m-btn--custom m-btn--pill'>
                            <i className='la la-check'></i>
                        </button>                             
                    }
                    {record.get('isCreatedByMy') ?
                        <DeleteButton title={t('areYouSure')} onClick={() => { this._delete(record.get('connectionId')) }} />
                    :                            
                        <DeleteButton title={t('areYouSureWantToDeclineThisRequest')} onClick={() => { this._decline(record.get('connectionId')) }} />                            
                    }
                </Td>
            </Row>
        ));
    }

    _deleteRequestSuccess(nextProps) {
        const success     = this.props.deleteRequest.get('success');
        const nextSuccess = nextProps.deleteRequest.get('success');

        if (!success && nextSuccess) {
            this.props.resetDeleteRequest();
            this._getRecords();
        }
    }
    
    _changeStatusRequestSuccess(nextProps) {
        const success     = this.props.changeStatusRequest.get('success');
        const nextSuccess = nextProps.changeStatusRequest.get('success');

        if (!success && nextSuccess) {
            this.props.resetChangeStatusRequest();
            this._getRecords();
        }
    }    

    render() {
        const {getRecordsRequest, t} = this.props;
        const {createModalIsOpen, viewModalIsOpen, messageModalIsOpen, record} = this.state;
        const loading = getRecordsRequest.get('loading');

        return (
            <div className='fadeInLeft  animated'>                
                <div className='m-portlet m-portlet--head-solid-bg'>
                    <div className='m-portlet__head border-b-orange'>
                        <div className='m-portlet__head-caption'>
                            <div className='m-portlet__head-title'>
                                <span className='m-portlet__head-icon'><i className='la la-user' style={{fontSize: '55px'}}></i></span>
                                <h3 className='m-portlet__head-text'>{t('myConnections')}</h3>
                            </div>
                        </div>
                    </div>
                    <div className='m-portlet__body'>
                        <div className='m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30'>
                            <div className='row align-items-center'>
                                <div className='col-xl-12 order-1 order-xl-2 m--align-right margin-0'>       
                                    <Button variant="raised" color='primary' onClick={() => { this._openCreateDialog() }} className='mt-btn mt-btn-success'>
                                        {t('sentRequest')} <Icon style={{marginLeft: '5px'}}>add</Icon>
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
                                <Th width='150px'>{t('email')}</Th>                                
                                <Th width='132px'>{t('status')}</Th>
                                <Th width='150px'>{t('actions')}</Th>
                            </HeadRow>
                            </Thead>
                            <Tbody>
                                {loading && <TablePreloader text="Loading..." color="primary"/> }
                            { this._renderRecords() }
                            </Tbody>
                        </Table>
                    </div>
                </div>
                <AddConnectionModal isOpen={createModalIsOpen} onSuccess={() => { this._getRecords() }} onClose={() => { this._closeCreateDialog() }} />
                <ViewConnectionModal data={record} isOpen={viewModalIsOpen} onAccept={(id) => { this._accept(id) }} onDecline={(id) => { this._decline(id) }} onClose={() => { this._closeViewDialog() }} />
                <SendMessageModal recipient={record} isOpen={messageModalIsOpen} onClose={() => { this._closeMessageDialog() }} />
            </div>);
    }
}

Connections = connect(
    (state) => ({
        getRecordsRequest: selectGetRecordsRequest(state),
        deleteRequest: selectDeleteRequest(state),
        changeStatusRequest: selectChangeStatusRequest(state)
    }),
    (dispatch) => ({
        getRecords: (params = {}) => { dispatch(getRecords(params)) },
        delete: (id) => { dispatch(deleteRecord(id)) },
        resetDeleteRequest: () => { dispatch(resetDeleteRequest()) },        
        accept: (id) => { dispatch(accept(id)) },
        decline: (id) => { dispatch(decline(id)) },
        resetChangeStatusRequest: () => { dispatch(resetChangeStatusRequest()) }        
    })
)(Connections);

export default translate('translations')(Connections);