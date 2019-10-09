import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import {NavLink} from "react-router-dom";
import { selectGetUserRecordsRequest, selectUnSubscribeStudentRequest, selectUnSubscribeRequest } from '../../../redux/subscriptions/selectors';
import { getUserRecords, resetGetUserRecordsRequest, unSubscribe, resetUnSubscribeRequest } from '../../../redux/subscriptions/actions';
import { HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead } from "../../../components/ui/Table";
import { Date } from "../../../components/ui/DateTime";
import { Price } from "../../../components/ui/Price";
import DeleteButton from "../../../components/ui/DeleteButton";
import ConfirmButton from "../../../components/ui/ConfirmButton";
import AssignStudentModal from "../../subscriptions/modals/AssignStudentModal";
import StudentsModal from "../../subscriptions/modals/StudentsModal";
import GiftModal from "../../subscriptions/modals/GiftModal";

class Subscriptions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedSubscription: {},
            assignModalIsOpen: false,
            giftModalIsOpen: false,
            studentsModalIsOpen: false
        }
    }
    
    componentDidMount () {
        this._getSubscriptions();
    }
    
    componentWillUnmount() {        
        this.props.resetUserRecordsRequest();
    }  
    
    componentWillReceiveProps (nextProps) {            
        if (!this.props.unSubscribeStudentRequest.get('success') && nextProps.unSubscribeStudentRequest.get('success')) {
            this._getSubscriptions();
        }
        
        if (!this.props.unSubscribeRequest.get('success') && nextProps.unSubscribeRequest.get('success')) {
            this.props.resetUnSubscribeRequest();
            this._getSubscriptions();
        }        
    }    

    _getSubscriptions() {
        const { getUserRecords } = this.props;
        
        getUserRecords({filter: {
            active: 1,
            own: 1
        }});        
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

    _renderSubscriptions() {
        const { subscriptionsRequest, t} = this.props;        
        const subscriptions = subscriptionsRequest.get('records').toJS()
        
        if (!subscriptions.length) {
            return (
                <tr>
                  <td colSpan={4}>
                    <div className="table-message">
                        <div>
                            <h2>{t('subscriptionsNotFound')}</h2>
                            <div className="text-center"><NavLink className="btn mt-3 btn-info" to="/subscriptions">{t('buySubscription')}</NavLink></div>
                        </div>
                    </div>
                  </td>
                </tr>                
            );
        }

        return subscriptions.map((item, i) => {            
            let isMine = (item.userId === item.ownerId);
            let isOwner = (isMine || item.isGift);
            let canAssign = ((item.allowedCourses * item.allowedStudents) - item.assignedCourses) > 0;
            return (
                <Row index={i} key={i}>                     
                    <Td>
                        <div>{t('learnerPlan', {learners: item.allowedStudents})}</div>
                        <strong className="g-blue"><Price price={item.totalPrice} currency={item.currency} /></strong> / {t(item.period)}
                    </Td>      
                    <Td>
                        <span className="mr-3">{item.assignedCourses} / {(item.allowedCourses * item.allowedStudents)} </span>
                        { (item.assignedCourses > 0 && isOwner) && <button title={t('assignedStudents')} className='btn btn-info m-btn--icon-only' onClick={ ()=> {this._showStudentsModal(item) }}>
                            <i className="la la-search"></i>
                        </button> }                                               
                    </Td>                    
                    <Td>{item.expiredAt ? <Date time={item.expiredAt} /> : '-'}</Td>                      
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
                            {(!item.isGift && !item.isMobile) && <DeleteButton btnName={t('delete')} title={t('areYouSureWantToCancelSubscription')} onClick={() => { this._cancelSubscription(item.id) }}/>}

                            {(!item.isGift && item.isMobile) && <ConfirmButton btnName={t('delete')} className='btn-danger' confirmOnly={true} title={t('deleteMobileSubscription')} />}
                        </div>
                    </Td>
                </Row>
            );
        });
    }
    
    render() {
        const {subscriptionsRequest, t} = this.props;
        const {assignModalIsOpen, studentsModalIsOpen, giftModalIsOpen, selectedSubscription} = this.state;
        const loading = subscriptionsRequest.get('loading');          
        
        const blockStyles = {
            minHeight: 340,
            overflowY: 'auto',
            overflowX: 'hidden'
        };
    
        return (                
            <div>
                <div className='block-header border-b-blue'>
                    <h3 className='m-portlet__head-text'> {t('manageSubscriptions')}</h3>
                </div>              
                <div className="m-portlet m-portlet--head-solid-bg">
                    <div className="m-portlet__body pt-3">
                        <div style={blockStyles}>
                            <Table >
                                <Thead>
                                    <HeadRow>                                 
                                        <Th>{t('title')}</Th>                                        
                                        <Th>{t('enrollments')}</Th>                                        
                                        <Th>{t('expirationDate')}</Th>                                                                        
                                        <Th>{t('actions')}</Th>
                                    </HeadRow>
                                </Thead>
                                <Tbody>                            
                                    { loading ? <TablePreloader text={t('loading')} /> : this._renderSubscriptions() }
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
            </div>
        );
    }
}

Subscriptions = connect(
  (state) => ({
    subscriptionsRequest: selectGetUserRecordsRequest(state),
    unSubscribeRequest: selectUnSubscribeRequest(state),
    unSubscribeStudentRequest: selectUnSubscribeStudentRequest(state)
  }),
  (dispatch) => ({
    getUserRecords: (params = {}) => { dispatch(getUserRecords(params)) },
    unSubscribe: (id, params = {}) => { dispatch(unSubscribe(id, params)) },
    resetUserRecordsRequest: (params = {}) => { dispatch(resetGetUserRecordsRequest(params)) },
    resetUnSubscribeRequest: (params = {}) => { dispatch(resetUnSubscribeRequest(params)) }    
  })
)(Subscriptions);

export default withTranslation('translations')(Subscriptions);