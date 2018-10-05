import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { selectGetSentRecordsRequest } from '../../redux/messages/selectors';
import { getSentMessages } from '../../redux/messages/actions';
import { MenuItem, Select, Button, Icon} from '@material-ui/core';
import { HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead } from '../../components/ui/table';
import { NavLink } from "react-router-dom";
import Pagination from '../../components/ui/Pagination';
import ViewMessageModal from './modals/ViewMessageModal';
import moment from "moment/moment";

class SentMessages extends Component {

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
   
    _getRecords() {
        const { page, perPage} = this.state;

        this.props.getRecords({
            page, perPage
        });
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
      
    _recordNumber(key) {
        const { page, perPage } = this.state;
        return (key + 1 + ((page - 1) * perPage));
    }    
    
    _renderRecords() {
        const {getRecordsRequest, t} = this.props;
        const loading = getRecordsRequest.get('loading');
        const records = getRecordsRequest.get('records');        
        
        if (!loading && records.size === 0) {
            return (
                <tr>
                    <td>
                        <div className="table-message">
                            <h2>{t('messagesNotFound')}</h2>
                        </div>
                    </td>
                </tr>
            );
        }

        return records.map((record, key) => (
            <Row index={key} key={key}>
                <Td first={true} width='60px'>{this._recordNumber(key)}</Td>
                <Td width='150px'>{record.get('subject')}</Td>
                <Td width='130px'>
                    <span className={`m-badge m-badge--brand m-badge--wide ${(record.get('type') === 'alert' ? 'm-badge--warning' : '')}`}>{t(record.get('type'))}</span>
                </Td>
                <Td width='100px'>{record.get('isPrivate') ? record.get('recipients') : t('recipientsGroups.' + record.get('recipients'))}</Td>
                <Td width='100px'>{moment(record.get('sent')).format('lll')}</Td>
                <Td width='100px'>
                    <button className='btn btn-accent m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill' onClick={() => { this._showMessageModal(record) }}>
                        <i className='la la-search'></i>
                    </button>                
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
                    <div className='m-portlet__head border-b-orange'>
                        <div className='m-portlet__head-caption'>
                            <div className='m-portlet__head-title'>
                                <span className='m-portlet__head-icon'><i className='la la-comment-o' style={{fontSize: '55px'}}></i></span>
                                <h3 className='m-portlet__head-text'>{t('sentMessages')}</h3>
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
                                <Th first={true} width='60px'>#</Th>
                                <Th width='150px'>{t('subject')}</Th>
                                <Th width='130px'>{t('type')}</Th>
                                <Th width='100px'>{t('recipients')}</Th>
                                <Th width='100px'>{t('sentDate')}</Th>                                
                                <Th width='100px'>{t('actions')}</Th>
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

SentMessages = connect(
    (state) => ({
        getRecordsRequest: selectGetSentRecordsRequest(state)
    }),
    (dispatch) => ({
        getRecords: (params = {}) => {
            dispatch(getSentMessages(params));
        }        
    })
)(SentMessages);

export default translate('translations')(SentMessages);