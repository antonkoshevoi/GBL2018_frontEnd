import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { selectSendMessageRequest } from '../../redux/messages/selectors';
import { sendMessage, resetSendMessageRequest } from '../../redux/messages/actions';
import MessageForm from "./forms/MessageForm"
import Loader from '../../components/layouts/Loader';

class NewMessage extends Component {
   
    componentWillReceiveProps(nextProps) {
       
        const {sendMessageRequest} = this.props;
        
        if (!sendMessageRequest.get('success') && nextProps.sendMessageRequest.get('success')) {
            this._goBack();
        }         
    }
    
    _goBack() {
        this.props.resetSendMessageRequest();
        this.props.goTo('/messages/chats');
    }
    
    _save(data) {
        this.props.sendMessage(data);
    }   
    
    render() {
        const {sendMessageRequest, t} = this.props;
        const loading = sendMessageRequest.get('loading');        
        const errors = sendMessageRequest.get('errors');       
        
        return (
            <div className="animated fadeInLeft">
                { loading && <Loader/> }
                <div className="m-portlet messages-portlet">
                    <div className='m-portlet__head border-b-blue'>
                        <div className='m-portlet__head-caption'>
                            <div className='m-portlet__head-title'>
                                <span className='m-portlet__head-icon'>
                                    <i className='la la-comments-o'></i>
                                </span>
                                <h3 className='m-portlet__head-text'>{t('newChat')}</h3>
                            </div>
                        </div>
                    </div>          
                    <div className="m-portlet__body">
                        <MessageForm formData={this.state} errors={errors} onSubmit={(data) => { this._save(data) }} onCancel={() => { this._goBack() }} />
                    </div>
                </div>               
            </div>
        );
    }
}

NewMessage = connect(
    (state) => ({        
        sendMessageRequest: selectSendMessageRequest(state)
    }),
    (dispatch) => ({
        sendMessage: (params = {}) => { dispatch(sendMessage(params)) },
        resetSendMessageRequest: () => { dispatch(resetSendMessageRequest()) },
        goTo: (page) => { dispatch(push(page)) }
    })
)(NewMessage);

export default translate('translations')(NewMessage);