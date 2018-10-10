import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { selectGetUserRecordsRequest, selectUnSubscribeStudentRequest, selectUnSubscribeRequest } from '../../redux/subscriptions/selectors';
import { getUserRecords, unSubscribe, resetUnSubscribeRequest } from '../../redux/subscriptions/actions';
import { HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead } from "../../components/ui/table";
import Loader from "../../components/layouts/Loader";
import Card from "../../components/ui/Card";
import DeleteButton from "../../components/ui/DeleteButton";
import AssignStudentModal from "./modals/AssignStudentModal";
import StudentsModal from "./modals/StudentsModal";
import moment from 'moment/moment';

class MySubscriptions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedSubscription: null,
            assignModalIsOpen: false,
            studentsModalIsOpen: false
        }
    }
    
    componentDidMount () {
        const { getUserRecords } = this.props;
        getUserRecords();
    }
    
    componentWillReceiveProps (nextProps) {
        const { getUserRecords, resetUnSubscribeRequest } = this.props;
             
        if (!this.props.unSubscribeStudentRequest.get('success') && nextProps.unSubscribeStudentRequest.get('success')) {
            getUserRecords();
        }
        
        if (!this.props.unSubscribeRequest.get('success') && nextProps.unSubscribeRequest.get('success')) {
            resetUnSubscribeRequest();
            getUserRecords();
        }        
    }    

    _toggleSubTable(row) {
        this.setState({[row]:!this.state[row]});
    }
    
    _cancelSubscription(id) {
        const { unSubscribe } = this.props;
        unSubscribe(id);
    }

    _showAssignModal(id) {
        this.setState({
            selectedSubscription: id,
            assignModalIsOpen: true            
        });
    }
    
    _closeAssignModal() {
        this.setState({
            selectedSubscription: null,
            assignModalIsOpen: false            
        });
    }
    
    _showStudentsModal(id) {
        this.setState({
            selectedSubscription: id,
            studentsModalIsOpen: true            
        });
    }
    
    _closeStudentsModal() {
        this.setState({
            selectedSubscription: null,
            studentsModalIsOpen: false            
        });
    }    
    
    _onAssignStudent() {
        const { getUserRecords } = this.props;
        getUserRecords();
    }    

    _renderSubscriptions() {
        const { subscriptionsRequest, goTo, t} = this.props;
        
        if (subscriptionsRequest.get('success') && subscriptionsRequest.get('records').size === 0) {
            goTo('/subscriptions');
            return;
        }

        return subscriptionsRequest.get('records').map((item, i) => {
            return ( [
                    <Row index={i} key={i}>                     
                        <Td width='120px'>{item.get('title')}</Td>
                        <Td width='120px'><strong className="g-blue">{item.get('price')}$</strong> / {t(item.get('period'))}</Td>
                        <Td width='120px'>{item.get('allowedCourses')}</Td>
                        <Td width='120px'>
                            <span className="m--margin-right-15">{item.get('assignedCourses')}</span>
                            { (item.get('assignedCourses') > 0) && <button className='btn btn-info m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill' onClick={ ()=> {this._showStudentsModal(item.get('id')) }}>
                                <i className="la la-search"></i>
                            </button> }                                                      
                        </Td>
                        <Td width='120px'>{moment(item.get('createdAt')).format('ll')}</Td>
                        <Td width='120px'>{moment(item.get('expiredAt')).format('ll')}</Td>
                        <Td width='120px'>
                            {(item.get('isActive') > 0) ? <span className='m-badge m-badge--brand m-badge--wide'>{t('yes')}</span> : <span className='m-badge m-badge--brand m-badge--wide m-badge--danger'>{t('no')}</span>}
                        </Td>
                        <Td width='120px' name='actions'>                                                        
                        {(item.get('isActive') > 0) && 
                            <div>
                                {(item.get('allowedCourses') > item.get('assignedCourses')) && 
                                <button className='btn btn-warning m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill' onClick={() => { this._showAssignModal(item.get('id')) }} >
                                  <i className='la la-user-plus'></i>
                                </button>}
                                {(item.get('isMobile') === 0) && 
                                    <DeleteButton title={t('areYouSureWantToCancelSubscription')} onClick={() => { this._cancelSubscription(item.get('id')) }}/>
                                }
                            </div>
                        }
                        </Td>
                    </Row>,
                    ( this.state[`sub_${i}`] !== null && this.state[`sub_${i}`]) && this._renderStudentsBlock()
                ]
            )
        })
    }
    
    render() {
        const {subscriptionsRequest, unSubscribeRequest, t} = this.props;
        const {assignModalIsOpen, studentsModalIsOpen, selectedSubscription} = this.state;
        const loading = subscriptionsRequest.get('loading');
        
        return (
        <div>
            {unSubscribeRequest.get('loading') && <Loader/>}
            <div className="transactionsList">
                <Card title={t('mySubscriptions')} icon="la la-money">
                    <Table >
                        <Thead>
                            <HeadRow>                                 
                                <Th width='120px' name='title'>{t('title')}</Th>
                                <Th width='120px' name='price'>{t('price')}</Th>
                                <Th width='120px' name='courses'>{t('allowedCourses')}</Th>
                                <Th width='120px' name='courses'>{t('assignedCourses')}</Th>
                                <Th width='120px' name='created'>{t('created')}</Th>
                                <Th width='120px' name='expirationDate'>{t('expirationDate')}</Th>
                                <Th width='120px' name='actions'>{t('isActive')}</Th>
                                <Th width='120px' name='actions'>{t('actions')}</Th>
                            </HeadRow>
                        </Thead>
                        <Tbody>                            
                            { loading ? <TablePreloader text="Loading..." color="primary"/> : this._renderSubscriptions() }
                        </Tbody>
                    </Table>
                </Card>
            </div>
            <AssignStudentModal
              isOpen={assignModalIsOpen}
              subscriptionId={selectedSubscription}
              onClose={() => { this._closeAssignModal() }}
              onSuccess={() => { this._onAssignStudent() }}/>  
                  
            <StudentsModal
              isOpen={studentsModalIsOpen}
              subscriptionId={selectedSubscription}
              onClose={() => { this._closeStudentsModal() }}
              onSuccess={() => { this._onAssignStudent() }}/>
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
    unSubscribe: (id, params = {}) => { dispatch(unSubscribe(id, params)) },
    resetUnSubscribeRequest: (params = {}) => { dispatch(resetUnSubscribeRequest(params)) },    
    goTo: (url) => {dispatch(push(url))}
  })
)(MySubscriptions);

export default translate('translations')(MySubscriptions);