import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { selectGetChatsRequest } from '../../redux/messages/selectors';
import { getChats } from '../../redux/messages/actions';
import { Avatar } from '@material-ui/core';
import { NavLink } from "react-router-dom";
import HasRole from "../middlewares/HasRole";
import Loader from '../../components/layouts/Loader';
import Chat from "./sections/Chat";
import moment from 'moment/moment';

class Chats extends Component {

    constructor(props) {
        super(props);        
        this.state = {}
    }

    componentWillMount() {
        this._getRecords();
    }
   
    componentWillReceiveProps(nextProps) {
        if (!this.props.getRecordsRequest.get('success') && nextProps.getRecordsRequest.get('success')) {
            let records = nextProps.getRecordsRequest.get('records');
            if (records.size) {
                this.setState({
                    selectedChat: records.get(0).get('id')
                });
            }
        }
    }        
    
    _getRecords() {
        this.props.getRecords();
    }
         
    _recordNumber(key) {
        const { page, perPage } = this.state;
        return (key + 1 + ((page - 1) * perPage));
    }
    
    _viewChat(id) {        
        this.setState({selectedChat: id});
    }
    
    _renderRecords() {        
        const records = this.props.getRecordsRequest.get('records');        
        const selectedChat = this.state.selectedChat;        
        
        return records.map((record, key) => {
            return (
                <div key={key} className={`chat ${record.get('id') === selectedChat ? 'current' : ''}`} onClick={() => this._viewChat(record.get('id')) }>
                    <div className='d-flex'>
                        <div className='align-self-center d-inline-block mr-3'>
                            <Avatar src={record.get('user').get('avatarSmall')} className='border' />
                        </div>
                        <div className='d-inline-block'>
                            <div>
                                <span className='chat-name'>{record.get('subject') || record.get('recipients')}</span>
                                {record.get('newMessages') > 0 && <span className='m-badge m-badge--brand m-badge--wide m-badge--danger p-0 ml-2'>{record.get('newMessages')}</span>}
                            </div>                        
                            <div>{record.get('user').get('name')}</div>
                            <div>{moment(record.get('created')).format('lll')}</div>
                        </div>
                    </div>
                </div>
            );    
        });
    }
    
    _renderChats() {
        const selectedChat = this.state.selectedChat;
        const {getRecordsRequest, t} = this.props;        
        
        if (!getRecordsRequest.get('records').size) {
            return <div className='m-portlet__body'>
                <h2 className='text-center my-5'>{t('messagesNotFound')}</h2>
            </div>;
        }
        
        return (
            <div className='h-100 d-flex align-items-stretch'>
                <div className='row w-100'>
                    <div className='col-3 pr-0 chats-box'>
                        <div className='chats'>
                            {this._renderRecords()}
                        </div>
                    </div>
                    <div className='col-9 pl-0'>
                        {selectedChat && <Chat chatId={this.state.selectedChat} />}
                    </div>                        
                </div>                
            </div>
        );
    }
    
    render() {
        const {getRecordsRequest, t} = this.props;        
        const loading = getRecordsRequest.get('loading');
        const success = getRecordsRequest.get('success');
        const records = getRecordsRequest.get('records');        

        return (
            <div className='fadeInLeft h-100'> 
                {loading && <Loader />}                
                <div className='m-portlet m-portlet--head-solid-bg h-100'>
                    <div className='m-portlet__head border-b-violet'>
                        <div className='m-portlet__head-caption'>
                            <div className="m-portlet__head-title d-flex flex-row justify-content-between align-items-center">
                                <div>
                                    <span className='m-portlet__head-icon violet'><i className='fa fa-weixin'></i></span>
                                    <h3 className="m-portlet__head-text">{t('chats')}</h3>
                                </div>
                                <div className="m-portlet__head-text">
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
                    {success && this._renderChats()}                    
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