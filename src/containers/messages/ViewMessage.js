import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { selectGetRecordRequest, selectDeleteRecordRequest } from '../../redux/messages/selectors';
import { viewMessage, getUnreadMessages, deleteMessage, resetDeleteMessageRequest, resetGetMessageRequest } from '../../redux/messages/actions';
import {Divider} from '@material-ui/core';
import { push } from 'react-router-redux';
import Loader from "../../components/layouts/Loader";
import NotFoundPage from '../errors/404';
import moment from "moment/moment";
import DeleteButton from '../../components/ui/DeleteButton';
import ReplyMessageModal from './modals/ReplyMessageModal';
import HasPermission from "../middlewares/HasPermission";

class ViewMessage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            showReplyModal: false
        }
    }

    componentDidMount() {
        const {getRecord} = this.props;
        getRecord(this.state.id);
    }        

    componentWillReceiveProps(nextProps) {
        const {getRecordRequest, getRecord, getUnreadMessages, deleteRecordRequest, resetDeleteMessageRequest} = this.props;      
            
        if (this.props.match.params.id !== nextProps.match.params.id) {
            this.setState({id: nextProps.match.params.id});
            
            getRecord(nextProps.match.params.id);            
        }
        
        if (!getRecordRequest.get('success') && nextProps.getRecordRequest.get('success')) {                        
            if (!nextProps.getRecordRequest.get('record').get('isRead')) {            
                getUnreadMessages();
            }
        }                
        
        if (!deleteRecordRequest.get('success') && nextProps.deleteRecordRequest.get('success')) {
            resetDeleteMessageRequest();
            this._goBack();
        }         
    }
        
    _goBack() {
        this.props.resetGetMessageRequest();        
        this.props.goTo('/messages');
    }     
    
    _deleteRecord(id) {
        const {deleteMessage} = this.props;
        deleteMessage(id);        
    }
    
    _showReplyModal() {
        this.setState({
            showReplyModal: true
        });
    }
    
    _closeReplyModal() {
        this.setState({
            showReplyModal: false
        });        
    }    

    render() {
        const {getRecordRequest, deleteRecordRequest, t} = this.props;        
        const loading   = getRecordRequest.get('loading') || deleteRecordRequest.get('loading');
        const success   = getRecordRequest.get('success');
        const data      = getRecordRequest.get('record');
        
        if (getRecordRequest.get('fail')) {
            return <NotFoundPage />;
        }

        return (
            <div className='fadeInLeft  animated'>               
                <div className='m-portlet m-portlet--head-solid-bg'>
                    <div className='m-portlet__head border-b-orange'>
                        <div className='m-portlet__head-caption'>
                            <div className='m-portlet__head-title'>
                                <span className='m-portlet__head-icon'><i className='la la-comment-o'></i></span>
                                <h3 className='m-portlet__head-text'>{t('viewMessage')}</h3>
                            </div>
                        </div>         
                    </div>
                    {loading && <Loader />}
                    {success &&
                    <div className='m-portlet__body'>
                        <div className="row">
                            <div className="col-sm-12">
                                <h5 className="m--margin-bottom-20">{data.get('subject')} <span className={`m-badge m-badge--brand m-badge--wide ${(data.get('type') === 'alert' ? 'm-badge--warning' : '')}`}>{t(data.get('type'))}</span></h5>
                                <p>{t('date')}: <strong>{moment(data.get('sent')).format('lll')}</strong></p>
                                <p>{t('from')}: <strong>{data.get('user').get('name')}</strong></p>
                                {data.get('isMine') ?
                                <p>{t('to')}: <strong>{data.get('recipients')}</strong></p>
                                :
                                <p>{t('to')}: <strong>{t('me')}</strong></p>}
                                <Divider className="m--margin-top-20 m--margin-bottom-30" /> 
                                <p className="pre-line" style={{minHeight: 300}}>{data.get('body')}</p>                                                         
                                <Divider className="m--margin-top-30 m--margin-bottom-30" /> 
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 text-center">
                                <HasPermission permissions={['[Messages][Reply]']}>
                                    { (data.get('type') === 'chat' && !data.get('isMine')) && <button onClick={() => { this._showReplyModal() }} disabled={loading} className="m--margin-right-10 btn btn-success" >{t('reply')}</button> }
                                </HasPermission>
                                <HasPermission permissions={['[Messages][Delete]']}>
                                    <DeleteButton                    
                                        onClick={() => { this._deleteRecord(data.get('id')) }}                                                                  
                                        btnName={t('delete')}
                                        icon={false}
                                        disabled={loading}
                                        className="m--margin-right-10 btn btn-danger" />
                                </HasPermission>
                                <button onClick={() => { this._goBack() }} disabled={loading} className="btn btn-default" >{t('back')}</button>
                            </div>
                        </div>
                    </div>}
                </div>
                <ReplyMessageModal message={data.toJS()} onClose={() => { this._closeReplyModal() }} isOpen={this.state.showReplyModal} />
            </div>
        );
    }
}

ViewMessage = connect(
    (state) => ({
        getRecordRequest: selectGetRecordRequest(state),
        deleteRecordRequest: selectDeleteRecordRequest(state)
    }),
    (dispatch) => ({
        getRecord: (params = {}) => {
            dispatch(viewMessage(params));
        },
        deleteMessage: (id) => {
            dispatch(deleteMessage(id));
        },
        getUnreadMessages: () => {
            dispatch(getUnreadMessages());
        },
        resetGetMessageRequest: () => {
            dispatch(resetGetMessageRequest());
        },
        resetDeleteMessageRequest: () => {
            dispatch(resetDeleteMessageRequest());
        },        
        goTo: (url) => {dispatch(push(url))}
    })
)(ViewMessage);

export default translate('translations')(ViewMessage);