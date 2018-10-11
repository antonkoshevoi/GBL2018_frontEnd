import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import Info from "./sections/Info";
import { Typography, Divider } from '@material-ui/core';
import HasRole from "../middlewares/HasRole";
import { getUser } from "../../redux/user/actions";
import { selectGetUserRequest, selectUserData } from "../../redux/user/selectors";
import { linkToParent, getParent, resetLinkToParentRequest, createParent, resetCreateParentRequest } from "../../redux/students/actions";
import { selectLinkToParentRequest, selectGetParentRequest, selectCreateParentRequest } from "../../redux/students/selectors";
import Loader from '../../components/layouts/Loader';

function TabContainer(props) {
    return (
        <Typography component="div" style={{padding: 8 * 3}}>
            {props.children}
        </Typography>
    );
}

class ParentProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }
    
    componentDidMount () {
        const { getParent } = this.props;
        getParent();
    }
    
    componentWillUnmount() {
        this.props.resetLinkToParentRequest();
        this.props.resetCreateParentRequest();
    }    
  
    componentWillReceiveProps(nextProps) {        
        const {linkToParentRequest, createParentRequest } = this.props;
        
        if (!linkToParentRequest.get('success') && nextProps.linkToParentRequest.get('success')) {
            this.props.getParent();
            this.props.resetLinkToParentRequest();
        }
               
        if (!createParentRequest.get('success') && nextProps.createParentRequest.get('success')) {
            this.props.getParent();
            this.props.resetCreateParentRequest();
        }        
    }
   
    _handleInputChange(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value      
        });
    }
    
    _sendRequest() {
        this.props.linkToParent({
            parentUsername: this.state.parentUsername
        });
    }
    
    _createParent() {
        this.props.createParent(this.state);        
    }
    
    _renderRequestForm()
    {
        const {linkToParentRequest, createParentRequest, t} = this.props;
        
        const loading = linkToParentRequest.get('loading') || createParentRequest.get('loading');
        
        const errors = linkToParentRequest.get('errors');
        const formErrors = createParentRequest.get('errors');
        
        return <div className="row">
            <div className="col-sm-10 m-auto">
                {loading &&  <Loader />}
                <div className="m-portlet m-portlet--head-solid-bg m-portlet--info">
                    <div className="m-portlet__head">
                        <div className="m-portlet__head-caption">
                            <div className="m-portlet__head-title">
                                <span className="m-portlet__head-icon">                  
                                    <i className="flaticon-info"></i>
                                </span>
                                <h3 className="m-portlet__head-text">
                                    {t('info')}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="m-portlet__body m--padding-top-5" style={{height: "100%"}}>
                        <TabContainer>
                            <div className="m-widget1 m-widget1--paddingless">
                            <h3 className="m--margin-bottom-25">{t('linkToParent')}</h3>
                            <div className="m-form">
                                <div className="form-group m-form__group row">
                                    <label className="col-form-label col-lg-3" htmlFor="parentUsername">{t('enterParentUsernameOrEmail')}</label>
                                    <div className="col-lg-6">
                                        <input
                                            type="text"
                                            name="parentUsername"
                                            onChange={(e) => { this._handleInputChange(e) }}
                                            value={this.state.parentUsername || ''}
                                            className="form-control m-input--air form-control-success m-input"
                                            id="firsName"/>
                                        {errors && errors.get('parentUsername') && <div className="form-control-feedback text-center error">{errors.get('parentUsername').get(0)}</div>}
                                    </div>
                                    <div className="col-lg-3">
                                        <input
                                            type="button"                                                
                                            value={t('sendRequest')}
                                            onClick={() => { this._sendRequest() }}
                                            className="btn btn-success"
                                            disabled={loading}
                                            />                      
                                    </div>                    
                                </div>
                            </div>
                            <Divider className="m--margin-top-25 m--margin-bottom-25" />
                            <h3>{t('createParentAccount')}</h3>
                                <div className="m-form m--margin-top-25">
                                    <div className="form-group m-form__group row">
                                        <label className="col-form-label col-lg-3" htmlFor="email">{t('email')} <span className="text-danger">*</span></label>
                                        <div className="col-lg-6">
                                            <input
                                                type="email"
                                                name="email"
                                                onChange={(e) => { this._handleInputChange(e)}}
                                                value={this.state.email || ''}
                                                className="form-control m-input--air form-control-success m-input"
                                                id="email"/>
                                            {formErrors && formErrors.get('email') && <div className="form-control-feedback text-center error">{formErrors.get('email').get(0)}</div>}
                                        </div>
                                    </div>  
                                    <div className="form-group m-form__group row">
                                        <label className="col-form-label col-lg-3" htmlFor="password">{t('password')} <span className="text-danger">*</span></label>
                                        <div className="col-lg-6">
                                            <input
                                                type="password"
                                                name="password"
                                                onChange={(e) => { this._handleInputChange(e)}}
                                                value={this.state.password || ''}
                                                className="form-control m-input--air form-control-success m-input"
                                                id="password"/>
                                            {formErrors && formErrors.get('password') && <div className="form-control-feedback text-center error">{formErrors.get('password').get(0)}</div>}
                                        </div>
                                    </div>
                                    <div className="form-group m-form__group row">
                                        <label className="col-form-label col-lg-3" htmlFor="username">{t('username')}</label>
                                        <div className="col-lg-6">
                                            <input
                                                type="text"
                                                name="username"
                                                onChange={(e) => { this._handleInputChange(e)}}
                                                value={this.state.username || ''}
                                                className="form-control m-input--air form-control-success m-input"
                                                id="username"/>
                                            {formErrors && formErrors.get('username') && <div className="form-control-feedback text-center error">{formErrors.get('username').get(0)}</div>}
                                        </div>
                                    </div>                                    
                                    <div className="form-group m-form__group row">
                                        <label className="col-form-label col-lg-3" htmlFor="firsName">{t('firstName')}</label>
                                        <div className="col-lg-6">
                                            <input
                                                type="text"
                                                name="firstName"
                                                onChange={(e) => { this._handleInputChange(e) }}
                                                value={this.state.firstName || ''}
                                                className="form-control m-input--air form-control-success m-input"
                                                id="firsName"/>
                                            {formErrors && formErrors.get('firstName') && <div className="form-control-feedback text-center error">{formErrors.get('firstName').get(0)}</div>}
                                        </div>
                                    </div>
                                    <div className="form-group m-form__group row">
                                        <label className="col-form-label col-lg-3" htmlFor="lastName">{t('lastName')}</label>
                                        <div className="col-lg-6">
                                            <input
                                                type="text"
                                                name="lastName"
                                                onChange={(e) => { this._handleInputChange(e) }}
                                                value={this.state.lastName || ''}
                                                className="form-control m-input--air form-control-success m-input"
                                                id="lastName"/>
                                            {formErrors && formErrors.get('lastName') && <div className="form-control-feedback text-center error">{formErrors.get('lastName').get(0)}</div>}
                                        </div>
                                    </div>
                                    <div className="form-group m-form__group row">
                                        <div className="col-lg-12 text-center">
                                            <input
                                                type="button"                                                
                                                value={t('register')}
                                                onClick={() => { this._createParent() }}
                                                className="btn btn-success"
                                                disabled={loading}
                                                />                      
                                        </div>
                                    </div> 
                                </div>
                            </div>
                        </TabContainer>            
                    </div>
                </div>
            </div>
        </div>;
    }
    
    _renderParentProfile(parent)
    {
        const {t} = this.props;
            
        return (<div className="row">
            <div className="col-lg-4">
                <div className="m-portlet ">
                    <div className="m-portlet__body">
                        <div className="m-card-profile">
                            <div className="m-card-profile__details">
                                <span className="m-card-profile__name">{parent.firstName} {parent.lastName}</span>
                                <span className="m-card-profile__email">{parent.username}</span>
                            </div>
                            <div className="m-card-profile__pic">
                                <div className="m-card-profile__pic-wrapper">
                                    <img src={parent.avatar} alt=""/>
                                </div>
                            </div>
                        </div>      
                    </div>
                </div>
            </div>
            <div className="col-lg-8">
                <div className="m-portlet m-portlet--head-solid-bg m-portlet--info">
                    <div className="m-portlet__head">
                        <div className="m-portlet__head-caption">
                            <div className="m-portlet__head-title">
                                <span className="m-portlet__head-icon">                  
                                    <i className="flaticon-info"></i>
                                </span>
                                <h3 className="m-portlet__head-text">
                                    {t('parentProfile')}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="m-portlet__body m--padding-top-5" style={{height: "100%"}}>
                        <TabContainer>
                            <div className="m-widget1 m-widget1--paddingless">
                                <div className="m-widget1__item">
                                    <div className="row m-row--no-padding">
                                        <div className="col">
                                            <h3 className="m-widget1__title">{t('firstName')}</h3>
                                        </div>
                                        <div className="col m--align-right">
                                            <span className="m-widget1__title m--font-brand">{parent.firstName || '-'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="m-widget1__item">
                                    <div className="row m-row--no-padding">
                                        <div className="col">
                                            <h3 className="m-widget1__title">{t('lastName')}</h3>
                                        </div>
                                        <div className="col m--align-right">
                                            <span className="m-widget1__title m--font-brand">{parent.lastName || '-'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="m-widget1__item">
                                    <div className="row m-row--no-padding">
                                        <div className="col">
                                            <h3 className="m-widget1__title">{t('email')}</h3>
                                        </div>
                                        <div className="col m--align-right">
                                            <span className="m-widget1__title m--font-brand">{parent.email || '-'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="m-widget1__item">
                                    <div className="row m-row--no-padding">
                                        <div className="col">
                                            <h3 className="m-widget1__title">{t('phoneNumber')}</h3>
                                        </div>
                                        <div className="col m--align-right">
                                            <span className="m-widget1__title m--font-brand">{parent.phoneNumber || '-'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="m-widget1__item">
                                    <div className="row m-row--no-padding">
                                        <div className="col">
                                            <h3 className="m-widget1__title">{t('gender')}</h3>
                                        </div>
                                        <div className="col m--align-right">
                                            <span className="m-widget1__title m--font-brand">{parent.gender ? t(parent.gender) : '-'}</span>
                                        </div>
                                    </div>
                                </div>                 
                                <div className="m-widget1__item">
                                    <div className="row m-row--no-padding">
                                        <div className="col">
                                            <h3 className="m-widget1__title">{t('birthday')}</h3>
                                        </div>
                                        <div className="col m--align-right">
                                            <span className="m-widget1__title m--font-brand">{parent.birthday || '-'}</span>
                                        </div>  
                                    </div>
                                </div>
                            </div>
                        </TabContainer>            
                    </div>
                </div>
            </div>
        </div>);
    }
    
    _renderParentStatus(parent)
    {
        const {t} = this.props;
            
        return (<div className="row">
            <div className="col-lg-8  m-auto">
                <div className="m-portlet m-portlet--head-solid-bg m-portlet--info">
                    <div className="m-portlet__head">
                        <div className="m-portlet__head-caption">
                            <div className="m-portlet__head-title">
                                <span className="m-portlet__head-icon">                  
                                    <i className="flaticon-info"></i>
                                </span>
                                <h3 className="m-portlet__head-text">
                                    {t('parentProfile')}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="m-portlet__body m--padding-top-5" style={{height: "100%"}}>
                        <div className="alert alert-success  m--margin-top-25">
                            <p className='margin-0'>{t('youSentRequestToParent')}</p>
                        </div>                        
                        <TabContainer>
                            <div className="m-widget1 m-widget1--paddingless">
                                <div className="m-widget1__item">
                                    <div className="row m-row--no-padding">
                                        <div className="col">
                                            <h3 className="m-widget1__title">{t('firstName')}</h3>
                                        </div>
                                        <div className="col m--align-right">
                                            <span className="m-widget1__title m--font-brand">{parent.firstName || '-'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="m-widget1__item">
                                    <div className="row m-row--no-padding">
                                        <div className="col">
                                            <h3 className="m-widget1__title">{t('lastName')}</h3>
                                        </div>
                                        <div className="col m--align-right">
                                            <span className="m-widget1__title m--font-brand">{parent.lastName || '-'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="m-widget1__item">
                                    <div className="row m-row--no-padding">
                                        <div className="col">
                                            <h3 className="m-widget1__title">{t('username')}</h3>
                                        </div>
                                        <div className="col m--align-right">
                                            <span className="m-widget1__title m--font-brand">{parent.username || '-'}</span>
                                        </div>
                                    </div>
                                </div>                                
                                <div className="m-widget1__item">
                                    <div className="row m-row--no-padding">
                                        <div className="col">
                                            <h3 className="m-widget1__title">{t('email')}</h3>
                                        </div>
                                        <div className="col m--align-right">
                                            <span className="m-widget1__title m--font-brand">{parent.email || '-'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabContainer>            
                    </div>
                </div>
            </div>
        </div>);
    }
    
    render() {
        const {userData, parentRequest, linkToParentRequest, createParentRequest, t} = this.props;

        const loading = parentRequest.get('loading');

        const parent = (parentRequest.get('success') && parentRequest.get('record')) ? parentRequest.get('record').toJS() : null;                
        
        return (
            <div className="row m--margin-top-20">
                {loading ?  <Loader /> : 
                <div className="col-md-12 col-lg-9 m-auto">
                    {!parent && this._renderRequestForm()}                              
                    {parent && (parent.accepted ? this._renderParentProfile(parent) : this._renderParentStatus(parent))}                                        
                </div>}
            </div>
        );
    }
}

ParentProfile = connect(
    (state) => ({
        parentRequest: selectGetParentRequest(state),
        linkToParentRequest: selectLinkToParentRequest(state),
        createParentRequest: selectCreateParentRequest(state)
    }),
    (dispatch) => ({    
        linkToParent: (params = {}) => { dispatch(linkToParent(params)) },
        resetLinkToParentRequest: () => { dispatch(resetLinkToParentRequest()) },
        getParent: () => { dispatch(getParent()) },
        createParent: (params = {}) => { dispatch(createParent(params)) },
        resetCreateParentRequest: () => { dispatch(resetCreateParentRequest()) }
    })    
)(ParentProfile);

export default translate('translations')(ParentProfile);