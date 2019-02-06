import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import OnVisible from 'react-on-visible';
import { selectGetRecordsRequest, selectDeleteRecordRequest } from '../../../redux/messages/selectors';
import { getMessages, readMessages, deleteMessage, resetDeleteMessageRequest } from '../../../redux/messages/actions';
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
            records: [],
            readIds: [],
            showNewMessageModal: false,
            showEditMessageModal: false,
            message: null,
            page: props.getRecordsRequest.get('pagination').get('page'),
            perPage: props.getRecordsRequest.get('pagination').get('perPage')
        }
    }
    
    componentDidMount() {
        this.interval = setInterval(() => this._readMessages(), 10000);
    }    

    componentWillUnmount() {
        const { readIds } = this.state;
        if (readIds.length) {
            this.props.readMessages({ids: readIds});
        }               
        clearInterval(this.interval);
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
        const {deleteRecordRequest, getRecordsRequest, resetDeleteMessageRequest} = this.props;

        if (!getRecordsRequest.get('success') && nextProps.getRecordsRequest.get('success')) {            
            this.setState({
                records: nextProps.getRecordsRequest.get('records').toJS()
            });
        }
        
        if (!deleteRecordRequest.get('success') && nextProps.deleteRecordRequest.get('success')) {
            resetDeleteMessageRequest();
            this._getRecords();
        }        
    }   
    
    _readMessage(record) {
        if (record.isRead) {
            return false;
        }    
        let { readIds } = this.state;       
        readIds.push(record.id);        
        console.log(readIds);
        this.setState({readIds: readIds});
    }
    
    _readMessages() {
        let { readIds } = this.state;                
        if (readIds.length) {
            this.setState({readIds: []});            
            this.setState({records: this.state.records.map((item) => {
                if (readIds.indexOf(item.id) !== -1) {                
                    item.isRead = true;
                }
                return item;
            })});        
            this.props.readMessages({ids: readIds});
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
            message: record
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
        const records = this.state.records;
        
        if (!loading && records.length === 0) {
            return (
                <h2 className='text-center my-5'>{t('messagesNotFound')}</h2>
            );
        }

        return records.map((record, key) => (            
            <OnVisible onChange={() => {this._readMessage(record)}} className={`row d-flex align-items-center ${record.isRead ? 'message-read' : 'message-new'}`} index={key} key={key}>
                <div className='col-12 col-sm-4 col-md-3 col-lg-2 text-center'>
                    <div className='message-owner d-flex align-items-center justify-content-around'>
                        <div className='mr-sm-2'>
                            <img className='rounded-circle' src={record.user.avatarSmall} alt={record.user.name}/>
                        </div>
                        <div className='text-center'>
                            <p className='my-1 my-sm-2'>{t(record.user.school)} {t(record.user.role)}</p>
                            <p className='text-muted my-1 my-sm-2'><b>{record.user.name}</b></p>
                            <p className='d-sm-none my-1'>{moment(record.created).format('lll')}</p>
                            {record.isMine && <p className='d-sm-none my-1'>{t('recipients')}: <i>{record.recipients}</i></p>}                            
                        </div>
                    </div>
                </div>
                <div className='col-9 col-sm-5 col-md-6 col-lg-7 text-left'>                    
                    <div className='pre-line my-2 my-sm-0'>{record.body}</div>
                </div>
                <div className='col-3 col-sm-3 text-center'>
                    <p className='d-none my-2 d-sm-block'>{moment(record.created).format('lll')}</p>
                    {record.isMine && 
                        <p className='d-none my-2 d-sm-block'>{t('recipients')}: <i>{record.recipients}</i></p>
                    }
                    <p className='my-2'>
                        {record.isMine &&
                            <button className='btn btn-accent m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill' onClick={() => { this._showEditMessageModal(record) }}>
                                <i className='la la-pencil'></i>
                            </button>        
                        }
                        <DeleteButton title={t('areYouSure')} onClick={() => { this._deleteRecord(record.id) }}/>                    
                    </p>
                </div>
            </OnVisible>            
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
                    <HasRole roles={['Superadministrator', 'School', 'Teacher']}>
                        <NewMessageModal type={type} title={t(`new${typeTitle}`)} icon={icon} isOpen={showNewMessageModal} onClose={() => this._closeNewMessageModal()} onSuccess={() => this._getRecords()} />                
                        <EditMessageModal type={type} title={t(`edit${typeTitle}`)} icon={icon} message={message}  isOpen={showEditMessageModal} onClose={() => this._closeEditMessageModal()} onSuccess={() => this._getRecords()} />
                    </HasRole>        
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
        readMessages: (id) => {
            dispatch(readMessages(id));
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