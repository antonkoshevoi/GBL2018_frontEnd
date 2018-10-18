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

class ViewConnectionModal extends Component {
    
    _close() {
        this.props.onClose();
    }
    
    _decline(id) {
        this._close();
        this.props.onDecline(id);
    }
    
    _accept(id) {
        this._close();
        this.props.onAccept(id);
    }
      
    _renderRequestForm(user)
    {
        const {t} = this.props;    
        
        const loading = false;
        
        return (<div className="row">
            <div className="col-lg-4">
                <div className="m-card-profile">
                    <div className="m-card-profile__pic">
                        <div className="m-card-profile__pic-wrapper">
                            <img src={user.avatar} alt=""/>
                        </div>
                    </div>
                </div>          
            </div>
            <div className="col-lg-6 m-auto">
            {user.accepted &&
                <TabContainer>                    
                    <div className="m-widget1 m-widget1--paddingless">
                        <div className="m-widget1__item">
                            <div className="row m-row--no-padding">
                                <div className="col">
                                    <h3 className="m-widget1__title">{t('firstName')}</h3>
                                </div>
                                <div className="col m--align-right">
                                    <span className="m-widget1__title m--font-brand">{user.firstName || '-'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="m-widget1__item">
                            <div className="row m-row--no-padding">
                                <div className="col">
                                    <h3 className="m-widget1__title">{t('lastName')}</h3>
                                </div>
                                <div className="col m--align-right">
                                    <span className="m-widget1__title m--font-brand">{user.lastName || '-'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="m-widget1__item">
                            <div className="row m-row--no-padding">
                                <div className="col">
                                    <h3 className="m-widget1__title">{t('email')}</h3>
                                </div>
                                <div className="col m--align-right">
                                    <span className="m-widget1__title m--font-brand">{user.email || '-'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="m-widget1__item">
                            <div className="row m-row--no-padding">
                                <div className="col">
                                    <h3 className="m-widget1__title">{t('username')}</h3>
                                </div>
                                <div className="col m--align-right">
                                    <span className="m-widget1__title m--font-brand">{user.username || '-'}</span>
                                </div>
                            </div>
                        </div>                                
                        <div className="m-widget1__item">
                            <div className="row m-row--no-padding">
                                <div className="col">
                                    <h3 className="m-widget1__title">{t('phoneNumber')}</h3>
                                </div>
                                <div className="col m--align-right">
                                    <span className="m-widget1__title m--font-brand">{user.phoneNumber || '-'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="m-widget1__item">
                            <div className="row m-row--no-padding">
                                <div className="col">
                                    <h3 className="m-widget1__title">{t('gender')}</h3>
                                </div>
                                <div className="col m--align-right">
                                    <span className="m-widget1__title m--font-brand">{user.gender ? t(user.gender) : '-'}</span>
                                </div>
                            </div>
                        </div>                 
                        <div className="m-widget1__item">
                            <div className="row m-row--no-padding">
                                <div className="col">
                                    <h3 className="m-widget1__title">{t('birthday')}</h3>
                                </div>
                                <div className="col m--align-right">
                                    <span className="m-widget1__title m--font-brand">{user.birthday || '-'}</span>
                                </div>  
                            </div>
                        </div>
                    </div>
                </TabContainer>}   
                {!user.accepted && <TabContainer>
                    <div className={`alert alert-${(user.declined ? 'danger' : 'success')}`}>
                        <p className='margin-0'>
                            {t(user.declined ? 'connectionRequestDeclined' : (user.waiting ? 'connectionRequestWaitingForYourApproval' : 'connectionRequestSent'))}
                        </p>
                    </div>
                    <div className="m-widget1 m-widget1--paddingless">
                        <div className="m-widget1__item">
                            <div className="row m-row--no-padding">
                                <div className="col">
                                    <h3 className="m-widget1__title">{t('requestSentDate')}</h3>
                                </div>
                                <div className="col m--align-right">
                                    <span className="m-widget1__title m--font-brand">{moment(user.sentAt).format('lll')}</span>
                                </div>
                            </div>
                        </div>
                        {user.declined &&
                        <div className="m-widget1__item">
                            <div className="row m-row--no-padding">
                                <div className="col">
                                    <h3 className="m-widget1__title">{t('declinedAt')}</h3>
                                </div>
                                <div className="col m--align-right">
                                    <span className="m-widget1__title m--font-brand">{moment(user.updatedAt).format('lll')}</span>
                                </div>
                            </div>
                        </div>}
                        <div className="m-widget1__item">
                            <div className="row m-row--no-padding">
                                <div className="col">
                                    <h3 className="m-widget1__title">{t('name')}</h3>
                                </div>
                                <div className="col m--align-right">
                                    <span className="m-widget1__title m--font-brand">{user.name || '-'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="m-widget1__item">
                            <div className="row m-row--no-padding">
                                <div className="col">
                                    <h3 className="m-widget1__title">{t('username')}</h3>
                                </div>
                                <div className="col m--align-right">
                                    <span className="m-widget1__title m--font-brand">{user.username || '-'}</span>
                                </div>
                            </div>
                        </div>                                
                        <div className="m-widget1__item">
                            <div className="row m-row--no-padding">
                                <div className="col">
                                    <h3 className="m-widget1__title">{t('email')}</h3>
                                </div>
                                <div className="col m--align-right">
                                    <span className="m-widget1__title m--font-brand">{user.email || '-'}</span>
                                </div>
                            </div>
                        </div>
                        {user.waiting &&
                        <div className="m-widget1__item">
                            <div className="row m-row--no-padding">             
                                <div className="col text-center">
                                    <button disabled={loading} className="btn m-btm btn-success m--margin-right-5" onClick={() => { this._accept(user.connectionId) }}>{t('accept')}</button>                                    
                                    <button disabled={loading} className="btn m-btm btn-danger" onClick={() => { this._decline(user.connectionId) }}>{t('decline')}</button>
                                </div>
                            </div>
                        </div>}                        
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
                        <Typography type="title" color="inherit" >
                            {t('connectionDetails')}
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

export default translate('translations')(ViewConnectionModal);