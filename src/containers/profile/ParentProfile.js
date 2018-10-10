import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import Info from "./sections/Info";
import { Typography, Divider } from '@material-ui/core';
import HasRole from "../middlewares/HasRole";
import { getUser } from "../../redux/user/actions";
import { selectGetUserRequest, selectUserData } from "../../redux/user/selectors";
import { linkToParent, getParent, resetLinkToParentRequest } from "../../redux/students/actions";
import { selectLinkToParentRequest, selectGetParentRequest } from "../../redux/students/selectors";
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
  
    componentWillReceiveProps(nextProps) {
        const prev = this.props.linkToParentRequest.get('success');
        const next = nextProps.linkToParentRequest.get('success');
        
        if (!prev && next) {
            this.props.getParent();            
        }
    }
   
    _handleInputChange(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value      
        });
    }
    
    _sendRequest()
    {
        this.props.linkToParent({
            parentUsername: this.state.linkToUsername
        });
    }
    
    render() {
        const {userData, parentRequest, linkToParentRequest, t} = this.props;

        const loading = parentRequest.get('loading') || linkToParentRequest.get('loading');

        const parent = parentRequest.get('record').toJS();
        
        const errors = linkToParentRequest.get('errors') || null;
        
        return (
            <div className="row m--margin-top-20">
                {loading && <Loader />}
                {!loading && 
                <div className="col-md-12 col-lg-9 m-auto">
                    {(!parent || !parent.id) && <div className="row">
                        <div className="col-sm-10 m-auto">
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
                                                <label className="col-form-label col-lg-4" htmlFor="firsName">{t('enterParentUsernameOrEmail')}</label>
                                                <div className="col-lg-5">
                                                    <input
                                                        type="text"
                                                        name="linkToUsername"
                                                        onChange={(e) => { this._handleInputChange(e) }}
                                                        value={this.state.linkToUsername || ''}
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
                                                        />                      
                                                </div>                    
                                            </div>
                                        </div>
                                        <Divider className="m--margin-top-25 m--margin-bottom-25" />
                                        <h3>{t('createParentAccount')}</h3>
                                        </div>
                                    </TabContainer>            
                                </div>
                            </div>                        
                        </div>
                    </div>
                    }
                    {(parent && parent.id) && 
                    <div className="row">
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
                                                {t('info')}
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
                                                        <span className="m-widget1__title m--font-brand">{parent.firstName}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="m-widget1__item">
                                                <div className="row m-row--no-padding">
                                                    <div className="col">
                                                        <h3 className="m-widget1__title">{t('lastName')}</h3>
                                                    </div>
                                                    <div className="col m--align-right">
                                                        <span className="m-widget1__title m--font-brand">{parent.lastName}</span>
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
                    </div>}
                </div>}
            </div>
        );
    }
}

ParentProfile = connect(
    (state) => ({
        parentRequest: selectGetParentRequest(state),
        linkToParentRequest: selectLinkToParentRequest(state)
    }),
    (dispatch) => ({    
        linkToParent: (params = {}) => { dispatch(linkToParent(params)) },
        resetLinkToParentRequest: () => { dispatch(resetLinkToParentRequest()) },
        getParent: () => { dispatch(getParent()) }
    })    
)(ParentProfile);

export default translate('translations')(ParentProfile);