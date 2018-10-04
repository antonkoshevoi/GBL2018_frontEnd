import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { selectSendMessageRequest, selectGetRecordRequest } from '../../redux/messages/selectors';
import { sendMessage, getDraftMessage, resetSendMessageRequest, resetGetMessageRequest } from '../../redux/messages/actions';
import Loader from '../../components/layouts/Loader';
import MessageForm from "./forms/MessageForm"

class NewMessage extends Component {
 
    constructor(props) {
        super(props);
        
        this.state = {
            isDraft: false,
            message: {}
        };
    }
    
    componentDidMount() {
        if (this.props.match.params.id) {            
            this.props.getDraftMessage(this.props.match.params.id);
        }
    }
    
    componentWillUnmount() {
        this.props.resetGetMessageRequest();
        this.props.resetSendMessageRequest();
    }

    componentWillReceiveProps(nextProps) {
       
        const {sendMessageRequest, resetGetMessageRequest, messageRequest } = this.props;

        if (this.props.match.params.id !== nextProps.match.params.id) {
            resetGetMessageRequest();            
        }
        
        if (!messageRequest.get('success') && nextProps.messageRequest.get('success')) {            
            this._setMessage(nextProps.messageRequest.get('record').toJS());
        }
        
        if (!sendMessageRequest.get('success') && nextProps.sendMessageRequest.get('success')) {
            this._goBack(this.state.isDraft ? '/messages/drafts' : '/messages/sent');
        }         
    }
    
    _setMessage(data) {
        this.setState({
            id: data.id,
            message: {            
                recipient: data.recipients,
                type: data.type,
                message: data.body,
                subject: data.subject,
                [data.recipients]: data.recipientsIds
            }
        });                
    }
    
    _save(data) {
        this.setState({
            isDraft: (data.isDraft || false)
        });
        
        this.props.sendMessage({
            draftId: this.state.id,
            ...data
        });
    }
    
    _goBack(page = '/messages') {
        this.props.resetSendMessageRequest();
        this.props.resetGetMessageRequest();            
        this.props.goTo(page);
    }     
    
    render() {
        const {messageRequest, sendMessageRequest, t} = this.props;
        const loading = messageRequest.get('loading') || sendMessageRequest.get('loading');
        const success = messageRequest.get('success');
        const errors = sendMessageRequest.get('errors');
        
        return (
            <div className="animated fadeInLeft">
                { loading && <Loader/> }
                <div className="m-portlet messages-portlet  m-portlet--info">
                    <div className='m-portlet__head border-b-blue'>
                        <div className='m-portlet__head-caption'>
                            <div className='m-portlet__head-title'>
                                <span className='m-portlet__head-icon'>
                                    <i className='la la-comments-o' style={{fontSize: '55px'}}></i>
                                </span>
                                <h3 className='m-portlet__head-text'>{t('Message')}</h3>
                            </div>
                        </div>
                    </div>          
                    <div className="m-portlet__body">
                        {success && <MessageForm formData={this.state.message} errors={errors} onSubmit={(data) => { this._save(data) }} onCancel={() => { this._goBack() }} />}
                    </div>
                </div>         
            </div>
        );
    }
}

NewMessage = connect(
    (state) => ({    
        messageRequest: selectGetRecordRequest(state),
        sendMessageRequest: selectSendMessageRequest(state)
    }),
    (dispatch) => ({
        getDraftMessage: (id) => { dispatch(getDraftMessage(id)) },
        resetGetMessageRequest: () => { dispatch(resetGetMessageRequest()) },
        sendMessage: (params = {}) => { dispatch(sendMessage(params)) },
        resetSendMessageRequest: () => { dispatch(resetSendMessageRequest()) },
        goTo: (page) => { dispatch(push(page)) }
    })
)(NewMessage);

export default translate('translations')(NewMessage);