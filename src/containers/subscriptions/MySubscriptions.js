import React, { Component } from 'react';
import { withTranslation, Trans} from 'react-i18next';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { renderToString } from 'react-dom/server'
import { NavLink } from 'react-router-dom';
import { selectGetUserRecordsRequest, selectUnSubscribeStudentRequest, selectUnSubscribeRequest } from '../../redux/subscriptions/selectors';
import { getUserRecords, resetGetUserRecordsRequest, unSubscribe, resetUnSubscribeRequest } from '../../redux/subscriptions/actions';
import { HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, MessageRow } from "../../components/ui/Table";
import { Select, MenuItem, FormHelperText } from '@material-ui/core';
import { Date } from "../../components/ui/DateTime";
import { Price } from '../../components/ui/Price';
import {Loader} from "../../components/ui/Loader";
import DeleteButton from "../../components/ui/DeleteButton";
import ConfirmButton from "../../components/ui/ConfirmButton";
import AssignStudentModal from "./modals/AssignStudentModal";
import StudentsModal from "./modals/StudentsModal";
import GiftModal from "./modals/GiftModal";

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

    _renderStatus(subscription) {
        const {t} = this.props;
        const buttonClasses = 'btn m-btn--icon-only ml-2';
        const date = renderToString(<Date time={subscription.expiredAt} />);
        
        if (subscription.status === 1) {            
            return <ConfirmButton icon='la la-check' className='btn-success' classNameDefault={buttonClasses} confirmOnly={true} title={t('subscriptionIsActive', {date}) } />;
        }
        if (subscription.status === 2) {            
            return <ConfirmButton icon='la la-exclamation' className='btn-warning' classNameDefault={buttonClasses} confirmOnly={true} title={t('subscriptionWillBeClosed', {date}) } />;
        }
        return <ConfirmButton icon='la la-close' className='btn-danger' classNameDefault={buttonClasses} confirmOnly={true} title={t('subscriptionIsClosed') } />;
    }
    
    _keepLearning() {
        const { subscriptionsRequest} = this.props;
        
        if (!subscriptionsRequest.get('success')) {
            return '';
        }
        
        let hasActive = false;
        
        subscriptionsRequest.get('records').map((item, i) => {
            if (item.get('status') === 1) {
                hasActive = true;
            }
            return true;
        });

        return hasActive ? '' : (<p className="display-10 px-3 d-none d-sm-block">
            <Trans i18nKey="translations:keepLearning"><span></span><NavLink className="g-blue" to="/subscriptions"></NavLink>.</Trans>
        </p>);
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
            let canAssign = ((item.allowedCourses * item.allowedStudents) - item.assignedCourses) > 0;
            return (
                <Row index={i} key={i}>                     
                    <Td>{t('learnerPlan', {learners: item.allowedStudents})}</Td>
                    <Td><strong className="g-blue"><Price price={item.totalPrice} currency={item.currency} /></strong> / {t(item.period)}</Td>
                    <Td>{item.allowedCourses} x {item.allowedStudents}</Td>
                    <Td>
                        <span className="mr-3">{item.assignedCourses}</span>
                        { (item.assignedCourses > 0 && isOwner) && <button title={t('assignedStudents')} className='btn btn-info m-btn--icon-only' onClick={ ()=> {this._showStudentsModal(item) }}>
                            <i className="la la-search"></i>
                        </button> }                                               
                    </Td>
                    <Td>
                        {item.isGift ? t('giftForYou') : (isOwner ? t('self') : item.ownerName)}
                        {item.isGift && <ConfirmButton icon='la la-gift' className='btn-success ml-3' confirmOnly={true} title={t('giftFrom', {user: item.userName}) } /> }
                    </Td>
                    <Td><Date time={item.createdAt} /></Td>
                    <Td>{item.expiredAt ? <Date time={item.expiredAt} /> : '-'} {this._renderStatus(item)}</Td>  
                    {(filter !== 'expired') &&
                    <Td className='actions'>                        
                        <div>
                            {(!item.assignedCourses && isMine) && 
                            <button title={t('giftSubscription')} className='btn btn-warning m-btn--icon-only ml-2' onClick={() => { this._showGiftModal(item) }} >
                              <i className='la la-gift'></i>
                            </button>}                    
                            {(canAssign && isOwner) && 
                            <button title={t('assignStudent')} className='btn btn-warning m-btn--icon-only ml-2' onClick={() => { this._showAssignModal(item) }} >
                              <i className='la la-user-plus'></i>
                            </button>}
                            {(!item.isGift && !item.isMobile && item.status === 1) && <DeleteButton btnName={t('delete')} title={t('areYouSureWantToCancelSubscription')} onClick={() => { this._cancelSubscription(item.id) }}/>}

                            {(!item.isGift && item.isMobile) && <ConfirmButton btnName={t('delete')} className='btn-danger' confirmOnly={true} title={t('deleteMobileSubscription')} />}
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
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="flex-grow-1 text-center">
                            {this._keepLearning()}
                        </div>
                        <div className="table-filter">
                            <Select className='full-width' value={this.state.filter} onChange={(e) => { this._handleFilter(e) }} name="filter">                        
                                <MenuItem value="active">{t('activeSubscriptions')}</MenuItem>
                                <MenuItem value="expired">{t('expiredSubscriptions')}</MenuItem>
                            </Select>
                            <FormHelperText>{t('filterSubscriptions')}</FormHelperText>
                        </div>
                    </div>
                    <Table >
                        <Thead>
                            <HeadRow>                                 
                                <Th>{t('title')}</Th>
                                <Th>{t('price')}</Th>
                                <Th>{t('allowedCourses')}</Th>
                                <Th>{t('assignedCourses')}</Th>
                                <Th>{t('purchasedFor')}</Th>                                
                                <Th>{t('created')}</Th>
                                <Th>{t('expirationDate')}</Th>                                
                                {(filter !== 'expired') &&
                                <Th>{t('actions')}</Th>}
                            </HeadRow>
                        </Thead>
                        <Tbody>                            
                            { subscriptionsRequest.get('loading') ? <TablePreloader text={t('loading')} /> : this._renderSubscriptions() }
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

export default withTranslation('translations')(MySubscriptions);