import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { selectUpdateGroupRequest, selectGetGroupRequest } from '../../redux/messages/selectors';
import { getGroup, updateGroup, resetUpdateGroupRequest, resetGetGroupRequest } from '../../redux/messages/actions';
import Loader from '../../components/layouts/Loader';
import GroupForm from "./forms/GroupForm"

class EditMessageGroup extends Component {
 
    constructor(props) {
        super(props);
        
        this.state = {            
            message: {}
        };
    }
    
    componentDidMount() {
        if (this.props.match.params.id) {            
            this.props.getGroup(this.props.match.params.id);
        }
    }
    
    componentWillUnmount() {
        this.props.resetGetGroupRequest();
        this.props.resetUpdateGroupRequest();
    }

    componentWillReceiveProps(nextProps) {
       
        const {groupRequest, resetUpdateGroupRequest, updateGroupRequest } = this.props;

        if (this.props.match.params.id !== nextProps.match.params.id) {
            resetUpdateGroupRequest();            
        }
        
        if (!groupRequest.get('success') && nextProps.groupRequest.get('success')) {            
            this._setMessage(nextProps.groupRequest.get('record').toJS());
        }
        
        if (!updateGroupRequest.get('success') && nextProps.updateGroupRequest.get('success')) {
            this._goBack();
        }         
    }
    
    _setMessage(data) {
        this.setState({
            id: data.id,
            message: {            
                recipient: data.recipients,                
                name: data.name,
                rolesInGroup: data.roles,
                [data.recipients]: data.recipientIds
            }
        });                
    }
    
    _save(data) {        
        this.props.updateGroup(this.state.id, data);
    }
    
    _goBack() {
        this.props.resetGetGroupRequest();
        this.props.resetUpdateGroupRequest();            
        this.props.goTo('/messages/groups');
    }     
    
    render() {
        const {groupRequest, updateGroupRequest, t} = this.props;
        const loading = groupRequest.get('loading') || updateGroupRequest.get('loading');
        const success = groupRequest.get('success');
        const errors = updateGroupRequest.get('errors');
        
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
                                <h3 className='m-portlet__head-text'>{t('Message')}</h3>
                            </div>
                        </div>
                    </div>          
                    <div className="m-portlet__body">
                        {success && <GroupForm formData={this.state.message} errors={errors} onSubmit={(data) => { this._save(data) }} onCancel={() => { this._goBack() }} />}
                    </div>
                </div>         
            </div>
        );
    }
}

EditMessageGroup = connect(
    (state) => ({    
        groupRequest: selectGetGroupRequest(state),
        updateGroupRequest: selectUpdateGroupRequest(state)
    }),
    (dispatch) => ({
        getGroup: (id) => { dispatch(getGroup(id)) },
        resetGetGroupRequest: () => { dispatch(resetGetGroupRequest()) },
        updateGroup: (id, params = {}) => { dispatch(updateGroup(id, params)) },
        resetUpdateGroupRequest: () => { dispatch(resetUpdateGroupRequest()) },
        goTo: (page) => { dispatch(push(page)) }
    })
)(EditMessageGroup);

export default translate('translations')(EditMessageGroup);