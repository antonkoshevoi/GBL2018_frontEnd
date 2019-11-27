import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Tab, Tabs } from '@material-ui/core';
import { connect } from 'react-redux';
import { HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, MessageRow } from '../../components/ui/Table';
import { selectGetRecordsRequest, selectDeleteRequest, selectChangeStatusRequest } from '../../redux/gifts/selectors';
import { getRecords, deleteRecord, accept, decline, resetDeleteRequest, resetChangeStatusRequest } from '../../redux/gifts/actions';
import { DateTime } from "../../components/ui/DateTime";
import DeleteButton from "../../components/ui/DeleteButton";

class Gifts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: 'received'
        }
    }

    componentDidMount() {
        this._getRecords();
    }

    componentDidUpdate(prevProps) {
       // this._deleteRequestSuccess(prevProps);
        this._changeStatusRequestSuccess(prevProps);
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
        let className = 'badge-secondary';
        
        if (record.get('accepted')) {
            status = 'accepted';
            className = 'badge-success';
        }
        if (record.get('declined')) {
            status = 'declined';
            className = 'badge-danger';
        }
        if (record.get('waiting')) {
            status = 'waiting';
            className = 'badge-warning';
        }        
        return <span className={`badge ${className}`}>{this.props.t(status)}</span>;
    }
    
    _setCurrentTab(value) {
        this.setState({
            currentTab: value
        });
    }

    _renderRecords() {
        const {t, getRecordsRequest} = this.props;        
        const { currentTab } = this.state;
               
        const records = getRecordsRequest.get('records').filter((record) => {
            if (this.state.currentTab === 'sent' && !record.get('isCreatedByMe')) {
                return false;
            }            
            if (this.state.currentTab === 'received' && record.get('isCreatedByMe')) {
                return false;
            }            
            return true;
        });
        
        if (records.size === 0) {
            return (<MessageRow>{t('giftsNotFound')}</MessageRow>);
        }
               
        return records.map((record, key) => {           
            return (<Row index={key} key={key}>
                <Td>
                    {record.get('name')}
                    {(record.get('quantity') > 1) && <span className="ml-3 badge badge-info"> x {record.get('quantity')}</span>}
                </Td>
                <Td>{t(record.get('productType'))}</Td>                
                <Td>{(currentTab === 'sent') ? record.get('ownerName') : record.get('userName')}</Td>
                <Td>{this._getStatus(record)}</Td>
                <Td><DateTime time={record.get('createdAt')} /></Td>
                <Td className='actions'>
                    {(currentTab === 'sent') &&
                        <div>{record.get('accepted') ? <span className="ml-3">-</span> : <DeleteButton btnName={t('delete')} title={t('areYouSure')} onClick={() => { this._delete(record.get('id')) }} />}</div>
                    }
                    {(currentTab === 'received') && <div> 
                        {record.get('waiting') && <button title={t('accept')} onClick={() => { this._accept(record.get('id')) }} className='btn btn-success m-btn--icon-only ml-2'>
                            <i className='la la-check'></i>
                        </button>}
                        {!record.get('declined') && <DeleteButton btnName={t('delete')} title={t('areYouSureWantToDeclineThisGift')} onClick={() => { this._decline(record.get('id')) }} />}
                    </div>}
                </Td>
            </Row>);
        });
    }

    _deleteRequestSuccess(prevProps) {
        const success = this.props.deleteRequest.get('success');        

        if (success && !prevProps.deleteRequest.get('success')) {
            this.props.resetDeleteRequest();
            this._getRecords();
        }
    }
    
    _changeStatusRequestSuccess(prevProps) {
        const success = this.props.changeStatusRequest.get('success');        

        if (success && !prevProps.changeStatusRequest.get('success')) {
            this.props.resetChangeStatusRequest();
            this._getRecords();
        }
    }    

    render() {
        const {getRecordsRequest, t} = this.props;
        const {currentTab} = this.state;
        const loading = getRecordsRequest.get('loading');

        return (
            <div className='fadeInLeft  animated'>                
                <div className='m-portlet m-portlet--head-solid-bg'>
                    <div className='m-portlet__head border-b-blue'>
                        <div className='m-portlet__head-caption'>
                            <div className='m-portlet__head-title'>
                                <span className='m-portlet__head-icon'><i className='fa fa-gift'></i></span>
                                <h3 className='m-portlet__head-text'>{t('myGifts')}</h3>
                            </div>
                        </div>
                    </div>
                    <div className='m-portlet__body'>
                        <div className='mb-3'>
                            <Tabs                             
                                value={currentTab} 
                                onChange={(event, value) => { this._setCurrentTab(value) }}
                                indicatorColor="primary"
                                textColor="primary" >
                                  <Tab value="received" label={t('received')} />
                                  <Tab value="sent" label={t('sent')} />
                            </Tabs>  
                        </div>
                        <Table>
                            <Thead>
                            <HeadRow>                          
                                <Th>{t('product')}</Th>
                                <Th>{t('type')}</Th>
                                <Th>{t((currentTab === 'sent') ? 'receiver' : 'sender')}</Th>
                                <Th>{t('status')}</Th>
                                <Th>{t('date')}</Th>
                                <Th>{t('actions')}</Th>
                            </HeadRow>
                            </Thead>
                            <Tbody>
                                {loading ? <TablePreloader text={t('loading')} /> : this._renderRecords() }                            
                            </Tbody>
                        </Table>
                    </div>
                </div>
            </div>);
    }
}

Gifts = connect(
    (state) => ({
        getRecordsRequest: selectGetRecordsRequest(state),
        deleteRequest: selectDeleteRequest(state),
        changeStatusRequest: selectChangeStatusRequest(state)
    }),
    (dispatch) => ({
        getRecords: (params = {}) => { dispatch(getRecords(params)) },
        delete: (id) => { dispatch(deleteRecord(id)) },
        accept: (id) => { dispatch(accept(id)) },
        decline: (id) => { dispatch(decline(id)) },
        resetDeleteRequest: () => { dispatch(resetDeleteRequest()) },
        resetChangeStatusRequest: () => { dispatch(resetChangeStatusRequest()) }
    })
)(Gifts);

export default withTranslation('translations')(Gifts);