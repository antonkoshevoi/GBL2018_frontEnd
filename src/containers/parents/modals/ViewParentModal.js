import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { AppBar, DialogContent, Icon, Toolbar, Typography } from '@material-ui/core';
import moment from 'moment/moment';
import Modal from "../../../components/ui/Modal";

function TabContainer(props) {
    return (
        <Typography component="div">
            {props.children}
        </Typography>
    );
}

class ViewParentModal extends Component {
    
    _close() {
        this.props.onClose();
    }  
      
    _renderRequestForm(parent)
    {
        const {t} = this.props;                
        
        return (<div className="row">
            <div className="col-lg-4">
                <div className="m-card-profile">
                    <div className="m-card-profile__pic">
                        <div className="m-card-profile__pic-wrapper">
                            <img src={parent.avatar} alt=""/>
                        </div>
                    </div>
                </div>          
            </div>
            <div className="col-lg-6 m-auto">
            {parent.accepted &&
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
                </TabContainer>}   
                {!parent.accepted && <TabContainer>
                    <div className={`alert alert-${(parent.declined ? 'danger' : 'success')}`}>
                        <p className='margin-0'>
                            {t(parent.declined ? 'parentDeclinedYourRequest' : 'youSentRequestToParent')}                                
                        </p>
                    </div>
                    <div className="m-widget1 m-widget1--paddingless">
                        <div className="m-widget1__item">
                            <div className="row m-row--no-padding">
                                <div className="col">
                                    <h3 className="m-widget1__title">{t('requestSentDate')}</h3>
                                </div>
                                <div className="col m--align-right">
                                    <span className="m-widget1__title m--font-brand">{moment(parent.sentAt).format('lll')}</span>
                                </div>
                            </div>
                        </div>
                        {parent.declined &&
                        <div className="m-widget1__item">
                            <div className="row m-row--no-padding">
                                <div className="col">
                                    <h3 className="m-widget1__title">{t('declinedAt')}</h3>
                                </div>
                                <div className="col m--align-right">
                                    <span className="m-widget1__title m--font-brand">{moment(parent.updatedAt).format('lll')}</span>
                                </div>
                            </div>
                        </div>}
                        <div className="m-widget1__item">
                            <div className="row m-row--no-padding">
                                <div className="col">
                                    <h3 className="m-widget1__title">{t('name')}</h3>
                                </div>
                                <div className="col m--align-right">
                                    <span className="m-widget1__title m--font-brand">{parent.name || '-'}</span>
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
                </TabContainer>}
            </div>
        </div>);
    }    
    
    render() {
        const {t, data, isOpen} = this.props;        
        return (
            <Modal bigger={true} isOpen={isOpen} onClose={() => this._close()}>
                <AppBar position="static" color="primary" className="dialogAppBar">
                    <Toolbar>                             
                        <Icon className="m--margin-right-15">person</Icon>
                        <Typography variant="h6" color="inherit" >
                            {t('parentProfile')}
                        </Typography>                        
                    </Toolbar>
                </AppBar>
                <DialogContent className="m--margin-top-25">
                    { data && this._renderRequestForm(data) }
                </DialogContent>
            </Modal>
        );
    }
}

export default translate('translations')(ViewParentModal);