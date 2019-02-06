import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { selectGetChatsRequest } from '../../redux/messages/selectors';
import { getChats } from '../../redux/messages/actions';

import { CircularProgress } from '@material-ui/core';
import { HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, MessageRow } from '../../components/ui/table';
import { NavLink } from "react-router-dom";
import Pagination from '../../components/ui/Pagination';
import DeleteButton from '../../components/ui/DeleteButton';
import HasRole from "../middlewares/HasRole";
import Chat from "./sections/Chat";
import moment from 'moment/moment';

class Chats extends Component {

    constructor(props) {
        super(props);        
        this.state = {
            page: props.getRecordsRequest.get('pagination').get('page'),
            perPage: props.getRecordsRequest.get('pagination').get('perPage')
        }
    }

    componentWillMount() {
        this._getRecords();
    }
   
    componentWillReceiveProps(nextProps) {
       
    }        
    
    _getRecords() {
        const { page, perPage} = this.state;

        this.props.getRecords({
            page, perPage, filter: {
                type: 'chat'
            }
        });
    }
         
    _recordNumber(key) {
        const { page, perPage } = this.state;
        return (key + 1 + ((page - 1) * perPage));
    }
    
    _viewChat(id) {        
        this.setState({selectedChat: id});
    }
    
    _renderRecords() {
        const {t} = this.props;        
        const records = this.props.getRecordsRequest.get('records');
        
        let selectedChat = this.state.selectedChat;
        
        return records.map((record, key) => {
            if (!selectedChat) {
                selectedChat = record.get('id');
                this.setState({selectedChat: selectedChat});
            }            
            return (
                <div className={`chat ${record.get('id') === selectedChat ? 'current' : ''}`} onClick={() => this._viewChat(record.get('id')) }>                
                    <div>
                        <div className='pre-line'>
                            <span className='chat-name'>{record.get('subject') || record.get('recipients')}</span>
                            {record.get('hasNewMessages') && <span className='m-badge m-badge--brand m-badge--wide m-badge--warning mr-2'>! </span>}
                        </div>
                    </div>
                    <div>{record.get('user').get('name')}</div>
                    <div>{moment(record.get('created')).format('lll')}</div>
                </div>
            )
        });                
    }
    
    render() {
        const {getRecordsRequest, t} = this.props;        
        const loading = getRecordsRequest.get('loading');
        const success = getRecordsRequest.get('success');
        const totalPages = getRecordsRequest.get('pagination').get('totalPages');

        return (
            <div className='fadeInLeft  animated'>               
                <div className='m-portlet m-portlet--head-solid-bg'>
                    <div className='m-portlet__head border-b-violet'>
                        <div className='m-portlet__head-caption'>
                            <div class="m-portlet__head-title d-flex flex-row justify-content-between align-items-center">
                                <div>
                                    <span className='m-portlet__head-icon violet'><i className='fa fa-weixin'></i></span>
                                    <h3 class="m-portlet__head-text">{t('chats')}</h3>
                                </div>
                                <div class="m-portlet__head-text">
                                    <HasRole roles={['Superadministrator', 'School', 'Teacher']}>
                                        <NavLink to="/messages/new">
                                            <button className='pull-right btn btn-success violet'>
                                              {t('newChat')}
                                              <span className='icon m--margin-left-10'><i className='fa fa-send'></i></span>                                             
                                            </button>
                                        </NavLink>
                                    </HasRole>                                
                                </div>
                            </div>
                        </div>         
                    </div>
                    <div>                           
                        <div>                
                            <div className='row d-flex'>
                                <div className='col-3 pr-0 chats-box'>
                                    <div className='chats'>
                                        {success && this._renderRecords() }
                                    </div>
                                </div>
                                <div className='col-9 pl-0'>
                                    {this.state.selectedChat && <Chat chatId={this.state.selectedChat} />}
                                </div>                        
                            </div>
                        </div>  
                    </div>  
                </div>          
            </div>
        );
    }
}

Chats = connect(
    (state) => ({
        getRecordsRequest: selectGetChatsRequest(state),        
    }),
    (dispatch) => ({
        getRecords: (params = {}) => {
            dispatch(getChats(params));
        }
    })
)(Chats);

export default translate('translations')(Chats);