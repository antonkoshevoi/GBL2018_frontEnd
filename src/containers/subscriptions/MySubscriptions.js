import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { selectGetUserRecordsRequest, selectUnSubscribeStudentRequest, selectUnSubscribeRequest } from '../../redux/subscriptions/selectors';
import { getUserRecords, resetGetUserRecordsRequest, unSubscribe, resetUnSubscribeRequest } from '../../redux/subscriptions/actions';
import { HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, MessageRow } from "../../components/ui/table";
import { Select, MenuItem, FormHelperText } from '@material-ui/core';
import Loader from "../../components/layouts/Loader";
import DeleteButton from "../../components/ui/DeleteButton";
import ConfirmButton from "../../components/ui/ConfirmButton";
import AssignStudentModal from "./modals/AssignStudentModal";
import StudentsModal from "./modals/StudentsModal";
import GiftModal from "./modals/GiftModal";
import moment from 'moment/moment';

class MySubscriptions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedSubscription: {},
            assignModalIsOpen: false,
            giftModalIsOpen: false,
            studentsModalIsOpen: false,
            filter: 'active'
        }
    }    
    
    componentDidMount () {
        this._getSubscriptions();
    }
    
    componentWillReceiveProps (nextProps) {
        const { getUserRecords, resetUnSubscribeRequest, goTo } = this.props;
             
        if (!this.props.unSubscribeStudentRequest.get('success') && nextProps.unSubscribeStudentRequest.get('success')) {
            getUserRecords();
        }
        
        if (!this.props.unSubscribeRequest.get('success') && nextProps.unSubscribeRequest.get('success')) {
            resetUnSubscribeRequest();
            getUserRecords();
        }
        
        if (!this.props.subscriptionsRequest.get('success') && nextProps.subscriptionsRequest.get('success')) {
            if (nextProps.subscriptionsRequest.get('records').size === 0) {    
                goTo('/subscriptions');
            }
        }        
    }    

    _getSubscriptions() {
        const { getUserRecords } = this.props;
        getUserRecords();        
    }

    _toggleSubTable(row) {
        this.setState({[row]:!this.state[row]});
    }
    
    _cancelSubscription(id) {
        const { unSubscribe } = this.props;
        unSubscribe(id);
    }
    
    _showGiftModal(subscription) {
        this.setState({
            selectedSubscription: subscription,
            giftModalIsOpen: true            
        });
    }
    
    _closeGiftModal() {
        this.setState({
            selectedSubscription: {},
            giftModalIsOpen: false            
        });
    }    

    _showAssignModal(subscription) {
        this.setState({
            selectedSubscription: subscription,
            assignModalIsOpen: true            
        });
    }
    
    _closeAssignModal() {
        this.setState({
            selectedSubscription: {},
            assignModalIsOpen: false            
        });
    }
    
    _showStudentsModal(subscription) {
        this.setState({
            selectedSubscription: subscription,
            studentsModalIsOpen: true            
        });
    }
    
    _closeStudentsModal() {
        this.setState({
            selectedSubscription: {},
            studentsModalIsOpen: false            
        });
    }    
    
    _onAssignStudent() {
        this._getSubscriptions();
    }
    
    _onGift() {
        this._getSubscriptions();     
    }
    
    _handleFilter(e) {
        const { value } = e.target;  
        this.setState({filter: value});        
    }

    _renderSubscriptions() {
        const { subscriptionsRequest, t} = this.props;
        const { filter } = this.state;        
        
        let subscriptions = subscriptionsRequest.get('records').toJS().filter((item) => {  
            if (filter === 'active' && !item.isActive) {
                return false;
            }            
            if (filter === 'expired' && item.isActive) {
                return false;
            }            
            return true;
        });
        
        if (!subscriptions.length) {
            return (
                <MessageRow>{t('subscriptionsNotFound')}</MessageRow>
            );
        }

        return subscriptions.map((item, i) => {            
            let isMine = (item.userId === item.ownerId);
            let isOwner = (isMine || item.isGift);
            let canAssign = (item.allowedCourses - item.assignedCourses) > 0;
            return (
                <Row index={i} key={i}>                     
                    <Td width='120px'>{item.title}</Td>
                    <Td width='120px'><strong className="g-blue">${item.price}</strong> / {t(item.period)}</Td>
                    <Td width='120px'>{item.allowedCourses} x {item.allowedStudents}</Td>
                    <Td width='120px'>
                        <span className="m--margin-right-15">{item.assignedCourses}</span>
                        { (item.assignedCourses > 0 && isOwner) && <button className='btn btn-info m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill' onClick={ ()=> {this._showStudentsModal(item) }}>
                            <i className="la la-search"></i>
                        </button> }                                               
                    </Td>
                    <Td width='150px'>
                        {item.isGift ? t('giftForYou') : (isOwner ? t('self') : item.ownerName)}
                        {item.isGift && <ConfirmButton icon='la la-gift' className='btn-success m--margin-left-15' confirmOnly={true} title={t('giftFrom', {user: item.userName}) } /> }
                    </Td>
                    <Td width='120px'>{moment(item.createdAt).format('ll')}</Td>
                    <Td width='120px'>{item.expiredAt ? moment(item.expiredAt).format('ll') : '-'}</Td>  
                    {(filter !== 'expired') &&
                    <Td width='150px' className='actions'>                        
                        <div>
                            {(!item.assignedCourses && isMine) && 
                            <button className='btn btn-warning m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill m--margin-left-5' onClick={() => { this._showGiftModal(item) }} >
                              <i className='la la-gift'></i>
                            </button>}                    
                            {(canAssign && isOwner) && 
                            <button className='btn btn-warning m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill m--margin-left-5' onClick={() => { this._showAssignModal(item) }} >
                              <i className='la la-user-plus'></i>
                            </button>}
                            {(!item.isGift && !item.isMobile) && <DeleteButton title={t('areYouSureWantToCancelSubscription')} onClick={() => { this._cancelSubscription(item.id) }}/>}

                            {(!item.isGift && item.isMobile) && <ConfirmButton className='btn-danger' confirmOnly={true} title={t('deleteMobileSubscription')} />}
                        </div>
                    </Td>}
                </Row>
            );
        });
    }
    
    render() {
        const {subscriptionsRequest, unSubscribeRequest, t} = this.props;
        const {filter, assignModalIsOpen, studentsModalIsOpen, giftModalIsOpen, selectedSubscription} = this.state;
        
        return (                
        <div className='fadeInLeft  animated learning-areas'>
            {unSubscribeRequest.get('loading') && <Loader/>}
            <div className='m-portlet m-portlet--head-solid-bg'>        
                <div className='m-portlet__head border-b-blue'>
                    <div className='m-portlet__head-caption'>
                        <div className='m-portlet__head-title'>
                            <span className='m-portlet__head-icon'>
                                  <i className='la la-money'></i>
                            </span>
                            <h3 className='m-portlet__head-text'>                  
                                {t('mySubscriptions')}
                            </h3>
                        </div>
                    </div>
                </div>
                <div className='m-portlet__body'>
                    <div  className="pull-right table-filter">
                        <Select className='full-width' value={this.state.filter} onChange={(e) => { this._handleFilter(e) }} name="filter">                        
                            <MenuItem value="active">{t('activeSubscriptions')}</MenuItem>
                            <MenuItem value="expired">{t('expiredSubscriptions')}</MenuItem>
                        </Select>
                        <FormHelperText>{t('filterSubscriptions')}</FormHelperText>
                    </div>
                    <Table >
                        <Thead>
                            <HeadRow>                                 
                                <Th width='120px'>{t('title')}</Th>
                                <Th width='120px'>{t('price')}</Th>
                                <Th width='120px'>{t('allowedCourses')}</Th>
                                <Th width='120px'>{t('assignedCourses')}</Th>
                                <Th width='150px'>{t('purchasedFor')}</Th>                                
                                <Th width='120px'>{t('created')}</Th>
                                <Th width='120px'>{t('expirationDate')}</Th>                                
                                {(filter !== 'expired') &&
                                <Th width='150px'>{t('actions')}</Th>}
                            </HeadRow>
                        </Thead>
                        <Tbody>                            
                            { subscriptionsRequest.get('loading') ? <TablePreloader text="Loading..." color="primary"/> : this._renderSubscriptions() }
                        </Tbody>
                    </Table>                
                </div>
                <GiftModal
                  isOpen={giftModalIsOpen}
                  subscription={selectedSubscription}
                  onClose={() => { this._closeGiftModal() }}
                  onSuccess={() => { this._onGift() }}/>  

                <AssignStudentModal
                  isOpen={assignModalIsOpen}
                  subscriptionId={selectedSubscription.id}
                  onClose={() => { this._closeAssignModal() }}
                  onSuccess={() => { this._onAssignStudent() }}/>  

                <StudentsModal
                  isOpen={studentsModalIsOpen}
                  subscriptionId={selectedSubscription.id}
                  onClose={() => { this._closeStudentsModal() }}
                  onSuccess={() => { this._onAssignStudent() }}/>
            </div>
        </div>
        );
    }
 }

MySubscriptions = connect(
  (state) => ({
    subscriptionsRequest: selectGetUserRecordsRequest(state),
    unSubscribeRequest: selectUnSubscribeRequest(state),
    unSubscribeStudentRequest: selectUnSubscribeStudentRequest(state)
  }),
  (dispatch) => ({
    getUserRecords: (params = {}) => { dispatch(getUserRecords(params)) },
    resetUserRecordsRequest: (params = {}) => { dispatch(resetGetUserRecordsRequest(params)) },
    unSubscribe: (id, params = {}) => { dispatch(unSubscribe(id, params)) },
    resetUnSubscribeRequest: (params = {}) => { dispatch(resetUnSubscribeRequest(params)) },    
    goTo: (url) => {dispatch(push(url))}
  })
)(MySubscriptions);

export default translate('translations')(MySubscriptions);