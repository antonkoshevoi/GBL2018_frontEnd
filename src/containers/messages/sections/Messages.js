import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { selectGetRecordsRequest, selectDeleteRecordRequest } from '../../../redux/messages/selectors';
import { getMessages, deleteMessage, resetDeleteMessageRequest } from '../../../redux/messages/actions';
import { Avatar } from '@material-ui/core';
import { Preloader } from '../../../components/ui/Preloader';
import Pagination from '../../../components/ui/Pagination';
import DeleteButton from '../../../components/ui/DeleteButton';
import HasRole from "../../middlewares/HasRole";
import NewMessageModal from '../modals/NewMessageModal';
import EditMessageModal from '../modals/EditMessageModal';
import moment from 'moment/moment';

class Messages extends Component {

    constructor(props) {
        super(props);        
        this.state = {            
            showNewMessageModal: false,
            showEditMessageModal: false,
            message: null,
            page: props.getRecordsRequest.get('pagination').get('page'),
            perPage: props.getRecordsRequest.get('pagination').get('perPage')
        }
    }

    componentWillMount() {
        const {getRecords} = this.props;        
        getRecords({
            filter: {
                type: this.props.type
            }
        });
    }
   
    componentWillReceiveProps(nextProps) {
        const {deleteRecordRequest, resetDeleteMessageRequest} = this.props;

        if (!deleteRecordRequest.get('success') && nextProps.deleteRecordRequest.get('success')) {
            resetDeleteMessageRequest();
            this._getRecords();
        }             
    }   
    
    _showNewMessageModal() {
        this.setState({
            showNewMessageModal: true
        });
    }
    
    _closeNewMessageModal() {
        this.setState({
            showNewMessageModal: false          
        });        
    }    
        
    _showEditMessageModal(record) {
        this.setState({
            showEditMessageModal: true,
            message: record.toJS()
        });
    }
    
    _closeEditMessageModal() {
        this.setState({
            showEditMessageModal: false,
            message: null
        });        
    }
    
    _getRecords() {
        const { page, perPage} = this.state;

        this.props.getRecords({
            page, perPage, filter: {
                type: this.props.type
            }
        });
    }
    
    _deleteRecord(id) {
        const {deleteMessage} = this.props;
        deleteMessage(id);        
    }       
    
    _renderRecords() {
        const {t} = this.props;
        const loading = this.props.getRecordsRequest.get('loading');
        const records = this.props.getRecordsRequest.get('records');                               
        
        if (!loading && records.size === 0) {
            return (
                <h2 className='text-center my-5'>{t('messagesNotFound')}</h2>
            );
        }

        return records.map((record, key) => (
            <div className='row d-flex align-items-center' index={key} key={key}>
                <div className='col-2 col-sm-3 col-lg-2 text-center'>
                    <div className='d-flex align-items-center justify-content-around'>
                        <div>
                            <Avatar style={{width:100, height:100}} src={record.get('user').get('avatarSmall')}/>
                        </div>
                        <div className='text-center'>
                            <p>{t(record.get('user').get('school'))} {t(record.get('user').get('role'))}</p>
                            <p className='text-muted mb-0'><b>{record.get('user').get('name')}</b></p>
                        </div>
                    </div>
                </div>
                <div className='col-6 col-sm-6 col-lg-7 text-left'>                    
                    <div className='pre-line'>{record.get('body')}</div>
                </div>
                <div className='col-1 col-sm-3 text-center'>
                    <p>{moment(record.get('sent')).format('lll')}</p>
                    {record.get('isMine') && 
                        <p>{t('recipients')}: <i>{record.get('recipients')}</i></p>
                    }
                    <p>
                        {record.get('isMine') &&
                            <button className='btn btn-accent m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill' onClick={() => { this._showEditMessageModal(record) }}>
                                <i className='la la-pencil'></i>
                            </button>        
                        }
                        <DeleteButton title={t('areYouSure')} onClick={() => { this._deleteRecord(record.get('id')) }}/>                    
                    </p>
                </div>
            </div>
        ));
    }
    
    _goToPage(page) {
        this.setState({page}, this._getRecords);
    }    

    render() {
        const {getRecordsRequest, t, type, icon, color} = this.props;
        const {page, showNewMessageModal, showEditMessageModal, message} = this.state;
        const loading = getRecordsRequest.get('loading');
        const success = getRecordsRequest.get('success');
        const totalPages = getRecordsRequest.get('pagination').get('totalPages');

        const typeTitle = type.charAt(0).toUpperCase() + type.slice(1);

        return (            
            <div className='m-portlet m-portlet--head-solid-bg'>
                <div className={`m-portlet__head border-b-${color}`}>
                    <div className='m-portlet__head-caption'>
                        <div className='m-portlet__head-title'>
                            <span className={`m-portlet__head-icon ${color}`}><i className={icon}></i></span>
                            <h3 className='m-portlet__head-text'>{t(type + 's')}</h3>
                        </div>
                    </div>         
                </div>                                                                     
                <div className='m-portlet__body'>
                    <HasRole roles={['Superadministrator', 'School', 'Teacher']}>
                        <div className='m--margin-top-5 m--margin-bottom-20 text-right'>                                                         
                            <button className={`btn btn-info ${color}`} onClick={() => this._showNewMessageModal() }>
                               {t(`new${typeTitle}`)}
                               <span className='icon m--margin-left-10'><i className={icon}></i></span>
                            </button>                                    
                        </div>                    
                    </HasRole>                
                    <div className='messages'>
                        {loading && <Preloader text={t('loading')} /> }
                        {success && this._renderRecords() }
                    </div>
                    <div className="row">
                        <div className="col-sm-12 m--margin-top-40 text-right">
                            <Pagination page={page} totalPages={totalPages} onPageSelect={(page) => this._goToPage(page)}/>
                        </div>
                    </div>
                    <NewMessageModal type={type} title={t(`new${typeTitle}`)} icon={icon} isOpen={showNewMessageModal} onClose={() => this._closeNewMessageModal()} onSuccess={() => this._getRecords()} />                
                    <EditMessageModal type={type} title={t(`edit${typeTitle}`)} icon={icon} message={message}  isOpen={showEditMessageModal} onClose={() => this._closeEditMessageModal()} onSuccess={() => this._getRecords()} />
                </div>
            </div>
        );
    }
}

Messages = connect(
    (state) => ({
        getRecordsRequest: selectGetRecordsRequest(state),
        deleteRecordRequest: selectDeleteRecordRequest(state)        
    }),
    (dispatch) => ({
        getRecords: (params = {}) => {
            dispatch(getMessages(params));
        },
        deleteMessage: (id) => {
            dispatch(deleteMessage(id));
        },
        resetDeleteMessageRequest: () => {
            dispatch(resetDeleteMessageRequest());
        }
    })
)(Messages);

export default translate('translations')(Messages);