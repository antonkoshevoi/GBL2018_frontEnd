import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { selectCreateGroupRequest } from '../../redux/messages/selectors';
import { createGroup, resetCreateGroupRequest } from '../../redux/messages/actions';
import GroupForm from "./forms/GroupForm"
import {Loader} from '../../components/ui/Loader';

class NewMessageGroup extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {};
    }
    
    componentWillReceiveProps(nextProps) {
       
        const {createGroupRequest} = this.props;
        
        if (!createGroupRequest.get('success') && nextProps.createGroupRequest.get('success')) {
            this._goBack();
        }         
    }
    
    _goBack() {
        this.props.resetCreateGroupRequest();
        this.props.goTo('/messages/groups');
    }
    
    _save(data) {
        this.props.createGroup(data);
    }    
    
    render() {
        const {createGroupRequest, t} = this.props;
        const loading = createGroupRequest.get('loading');        
        const errors = createGroupRequest.get('errors');       
        
        return (
            <div className="animated fadeInLeft">
                { loading && <Loader/> }
                <div className="m-portlet messages-portlet">
                    <div className='m-portlet__head border-b-blue'>
                        <div className='m-portlet__head-caption'>
                            <div className='m-portlet__head-title'>
                                <span className='m-portlet__head-icon'>
                                    <i className='fa fa-group'></i>
                                </span>
                                <h3 className='m-portlet__head-text'>{t('newGroup')}</h3>
                            </div>
                        </div>
                    </div>          
                    <div className="m-portlet__body">
                        <GroupForm errors={errors} onSubmit={(data) => { this._save(data) }} onCancel={() => { this._goBack() }} />
                    </div>
                </div>               
            </div>
        );
    }
}

NewMessageGroup = connect(
    (state) => ({        
        createGroupRequest: selectCreateGroupRequest(state)
    }),
    (dispatch) => ({
        createGroup: (params = {}) => { dispatch(createGroup(params)) },
        resetCreateGroupRequest: () => { dispatch(resetCreateGroupRequest()) },
        goTo: (page) => { dispatch(push(page)) }
    })
)(NewMessageGroup);

export default withTranslation('translations')(NewMessageGroup);