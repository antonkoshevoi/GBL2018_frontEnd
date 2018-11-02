import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { selectGetInboxRecordsRequest, selectDeleteRecordRequest } from '../../redux/messages/selectors';
import { getInboxMessages, deleteMessage, resetDeleteMessageRequest } from '../../redux/messages/actions';
import { MenuItem, Select, Button, Icon } from '@material-ui/core';
import { HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, MessageRow } from '../../components/ui/table';
import { NavLink } from "react-router-dom";
import Pagination from '../../components/ui/Pagination';
import DeleteButton from '../../components/ui/DeleteButton';
import HasPermission from "../middlewares/HasPermission";
import moment from 'moment/moment';

class InboxMessages extends Component {

    constructor(props) {
        super(props);        
        this.state = {
            page: props.getRecordsRequest.get('pagination').get('page'),
            perPage: props.getRecordsRequest.get('pagination').get('perPage')
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
        const {deleteMessage} = this.props;
        deleteMessage(id);        
    }
      
    _recordNumber(key) {
        const { page, perPage } = this.state;
        return (key + 1 + ((page - 1) * perPage));
    }    
    
    _renderRecords() {
        const {t} = this.props;
        const loading = this.props.getRecordsRequest.get('loading');
        const records = this.props.getRecordsRequest.get('records');                               
        
        if (!loading && records.size === 0) {
            return (
                <MessageRow>{t('messagesNotFound')}</MessageRow>
            );
        }

        return records.map((record, key) => (
            <Row index={key} key={key}>
                <Td first={true} width='40px'>{this._recordNumber(key)}</Td>
                <Td width='150px'>
                    {!record.get('isRead') && <span className="m-badge m-badge--brand m-badge--wide m-badge--warning">!</span>}
                    
                    <NavLink className="m--margin-left-5 g-blue" to={`/messages/view/${record.get('id')}`}>{record.get('subject')}</NavLink>
                </Td>
                <Td width='130px'>
                    <span className={`m-badge m-badge--brand m-badge--wide ${(record.get('type') === 'alert' ? 'm-badge--warning' : '')}`}>{t(record.get('type'))}</span>
                </Td>
                <Td width='100px'>{record.get('user') ? record.get('user').get('name') : ''}</Td>
                <Td width='100px'>{moment(record.get('sent')).format('lll')}</Td>
                <Td width='100px'>
                    <NavLink className='btn btn-accent m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill' to={`/messages/view/${record.get('id')}`}>
                        <i className='la la-search'></i>
                    </NavLink>
                    <HasPermission permissions={['[Messages][Create]']}>
                        <DeleteButton title={t('areYouSure')} onClick={() => { this._deleteRecord(record.get('id')) }}/>
                    </HasPermission>
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
        const {page, perPage} = this.state;
        const loading = getRecordsRequest.get('loading');
        const success = getRecordsRequest.get('success');
        const totalPages = getRecordsRequest.get('pagination').get('totalPages');

        return (
            <div className='fadeInLeft  animated'>               
                <div className='m-portlet m-portlet--head-solid-bg'>
                    <div className='m-portlet__head border-b-darkblue'>
                        <div className='m-portlet__head-caption'>
                            <div className='m-portlet__head-title'>
                                <span className='m-portlet__head-icon'><i className='la la-comment-o'></i></span>
                                <h3 className='m-portlet__head-text'>{t('inboxMessages')}</h3>
                            </div>
                        </div>         
                    </div>
                    <div className='m-portlet__body'>
                        <div className='m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30'>
                            <div className='row align-items-center'>               
                                <div className='col-xl-12 order-1 order-xl-2 m--align-right'>
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
                                    <HasPermission permissions={['[Messages][Create]']}>
                                        <NavLink to="/messages/new">
                                            <Button color='primary' className='mt-btn mt-btn-success'>
                                              {t('newMessage')}
                                              <Icon className="m--margin-left-10">send</Icon>
                                            </Button>
                                        </NavLink>
                                    </HasPermission>
                                </div>
                            </div>
                        </div>
                        <Table>
                            <Thead>
                            <HeadRow>
                                <Th first={true} width='40px'>#</Th>
                                <Th width='150px'>{t('subject')}</Th>
                                <Th width='130px'>{t('type')}</Th>
                                <Th width='100px'>{t('from')}</Th>
                                <Th width='100px'>{t('sentDate')}</Th>                                
                                <Th width='100px'>{t('actions')}</Th>
                            </HeadRow>
                            </Thead>

                            <Tbody>
                                {loading && <TablePreloader text="Loading..." color="primary"/> }
                                {success && this._renderRecords() }
                            </Tbody>
                        </Table>

                        <div className="row">
                            <div className="col-sm-12 m--margin-top-40 text-right">
                                <Pagination page={page} totalPages={totalPages} onPageSelect={(page) => this._goToPage(page)}/>
                            </div>
                        </div>
                    </div>
                </div>          
            </div>
        );
    }
}

InboxMessages = connect(
    (state) => ({
        getRecordsRequest: selectGetInboxRecordsRequest(state),
        deleteRecordRequest: selectDeleteRecordRequest(state)
    }),
    (dispatch) => ({
        getRecords: (params = {}) => {
            dispatch(getInboxMessages(params));
        },
        deleteMessage: (id) => {
            dispatch(deleteMessage(id));
        },
        resetDeleteMessageRequest: () => {
            dispatch(resetDeleteMessageRequest());
        }
    })
)(InboxMessages);

export default translate('translations')(InboxMessages);