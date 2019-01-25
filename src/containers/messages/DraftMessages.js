import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { selectGetDraftRecordsRequest, selectDeleteRecordRequest, } from '../../redux/messages/selectors';
import { getDraftMessages, deleteDraftMessage, resetDeleteMessageRequest } from '../../redux/messages/actions';
import { MenuItem, Select, Button, Icon } from '@material-ui/core';
import { HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, MessageRow } from '../../components/ui/table';
import Pagination from '../../components/ui/Pagination';
import DeleteButton from '../../components/ui/DeleteButton';
import { NavLink } from "react-router-dom";
import moment from 'moment/moment';
import ViewMessageModal from './modals/ViewMessageModal';

class DraftMessages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: props.getRecordsRequest.get('pagination').get('page'),
            perPage: props.getRecordsRequest.get('pagination').get('perPage'),
            showMessageModal: false,
            showMessage: null            
        }
    }

    componentWillMount() {
        const {getRecords} = this.props;
        getRecords();
    }
    
    componentWillReceiveProps(nextProps) {       
        const {deleteRecordRequest, resetDeleteMessageRequest} = this.props;

        if (!deleteRecordRequest.get('success') && nextProps.deleteRecordRequest.get('success')) {
            resetDeleteMessageRequest();
            this._getRecords();
        }        
    }
    
    _getRecords() {
        const { page, perPage} = this.state;

        this.props.getRecords({
            page, perPage
        });
    }
    
    _deleteRecord(id) {
        const {deleteDraftMessage} = this.props;
        deleteDraftMessage(id);
    }
    
    _recordNumber(key) {
        const { page, perPage } = this.state;
        return (key + 1 + ((page - 1) * perPage));
    }    
    
    _showMessageModal(record) {
        this.setState({
            showMessageModal: true,
            showMessage: record.toJS()
        });
    }
    
    _closeMessageModal() {
        this.setState({
            showMessageModal: false,
            showMessage: null
        });        
    } 
    
    _renderRecords() {
        const {t} = this.props;
        const loading = this.props.getRecordsRequest.get('loading');
        const records = this.props.getRecordsRequest.get('records');
        
        if (!loading && records.size === 0) {
            return (<MessageRow>{t('messagesNotFound')}</MessageRow>);
        }

        return records.map((record, key) => (
            <Row index={key} key={key}>
                <Td width='60px'>{this._recordNumber(key)}</Td>
                <Td width='150px'>{record.get('subject')}</Td>
                <Td width='130px'>
                    {record.get('type') ? <span className={`m-badge m-badge--brand m-badge--wide ${(record.get('type') === 'alert' ? 'm-badge--warning' : '')}`}>{t(record.get('type'))}</span> : '-'}
                </Td>
                <Td width='100px'>{record.get('recipients') || '-'}</Td>
                <Td width='100px'>{moment(record.get('created')).format('lll')}</Td>
                <Td width='150px' className="actions">
                    <button className='btn btn-accent m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill' onClick={() => { this._showMessageModal(record) }}>
                        <i className='la la-search'></i>
                    </button>
                    <NavLink className='btn btn-accent m-btn m-btn--icon m-btn--icon-only m--margin-left-5 m-btn--custom m-btn--pill' to={`/messages/draft/${record.get('id')}`}>
                        <i className='la la-edit'></i>
                    </NavLink>                     
                    <DeleteButton disabled={this.props.deleteRecordRequest.get('loading')} title={t('areYouSure')} onClick={() => { this._deleteRecord(record.get('id')) }}/>
                </Td>
            </Row>
        ));
    }

    _selectPerPage(perPage) {
        const total      = this.props.getRecordsRequest.get('pagination').get('total');
        const totalPages = Math.ceil(total / perPage);
        const page       = Math.min(this.state.page, totalPages);

        this.setState({perPage, page}, this._getRecords);
    }
    
    _goToPage(page) {
        this.setState({page}, this._getRecords);
    }

    render() {
        const {getRecordsRequest, t} = this.props;
        const {page, perPage, showMessageModal, showMessage} = this.state;
        const loading = getRecordsRequest.get('loading');
        const totalPages = getRecordsRequest.get('pagination').get('totalPages');

        return (
            <div className='fadeInLeft  animated'>               
                <div className='m-portlet m-portlet--head-solid-bg'>
                    <div className='m-portlet__head border-b-darkblue'>
                        <div className='m-portlet__head-caption'>
                            <div className='m-portlet__head-title'>
                                <span className='m-portlet__head-icon'><i className='la la-comment-o'></i></span>
                                <h3 className='m-portlet__head-text'>{t('draftMessages')}</h3>
                            </div>
                        </div>         
                    </div>
                    <div className='m-portlet__body'>
                        <div className='m--margin-top-10 m--margin-bottom-30'>
                            <div className='row'>               
                                <div className='col-sm-12 m--align-right'>
                                    <Select
                                        className="pull-left table-select"
                                        value={perPage}
                                        onChange={(e) => { this._selectPerPage(e.target.value) }}>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={10}>10</MenuItem>
                                        <MenuItem value={25}>25</MenuItem>
                                        <MenuItem value={50}>50</MenuItem>
                                        <MenuItem value={100}>100</MenuItem>
                                    </Select>
                                    <NavLink to="/messages/new">
                                        <Button color='primary' className='mt-btn mt-btn-success'>
                                          {t('newMessage')}
                                          <Icon className="m--margin-left-10">send</Icon>
                                        </Button>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <Table>
                            <Thead>
                            <HeadRow>
                                <Th width='60px'>#</Th>
                                <Th width='150px'>{t('subject')}</Th>
                                <Th width='130px'>{t('type')}</Th>
                                <Th width='100px'>{t('recipients')}</Th>
                                <Th width='100px'>{t('sentDate')}</Th>                                
                                <Th width='150px'>{t('actions')}</Th>
                            </HeadRow>
                            </Thead>

                            <Tbody>
                                {loading && <TablePreloader text="Loading..." color="primary"/> }
                                { this._renderRecords() }
                            </Tbody>
                        </Table>

                        <div className="row">
                            <div className="col-sm-12 m--margin-top-40 text-right">
                                <Pagination page={page} totalPages={totalPages} onPageSelect={(page) => this._goToPage(page)}/>
                            </div>
                        </div>
                    </div>
                </div>
                <ViewMessageModal isOpen={showMessageModal} message={showMessage} onClose={() => this._closeMessageModal()} />
            </div>
        );
    }
}

DraftMessages = connect(
    (state) => ({
        getRecordsRequest: selectGetDraftRecordsRequest(state),
        deleteRecordRequest: selectDeleteRecordRequest(state)
    }),
    (dispatch) => ({
        getRecords: (params = {}) => {
            dispatch(getDraftMessages(params));
        },
        deleteDraftMessage: (id) => {
            dispatch(deleteDraftMessage(id));
        },
        resetDeleteMessageRequest: () => {
            dispatch(resetDeleteMessageRequest());
        }
    })
)(DraftMessages);

export default translate('translations')(DraftMessages);