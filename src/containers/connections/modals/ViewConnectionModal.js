import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { AppBar, DialogContent, Icon, Toolbar, Typography } from '@material-ui/core';
import { DateTime } from "../../../components/ui/DateTime";
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
            <div className="col-lg-4 col-xl-5">                
                <div className="text-center">
                    <div className="m-4 m-xl-5">
                      <img className="rounded-circle img-thumbnail" src={user.avatar} alt=""/>
                    </div>                        
                </div>                      
            </div>
            <div className="col-lg-8 col-xl-7">
            {user.accepted &&
                <TabContainer>                    
                    <div className="m-widget1 p-0">
                        <div className="m-widget1__item">
                            <div className="row m-row--no-padding">
                                <div className="col">
                                    <h3 className="m-widget1__title">{t('firstName')}</h3>
                                </div>
                                <div className="col text-right">
                                    <span className="m-widget1__title text-info">{user.firstName || '-'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="m-widget1__item">
                            <div className="row m-row--no-padding">
                                <div className="col">
                                    <h3 className="m-widget1__title">{t('lastName')}</h3>
                                </div>
                                <div className="col text-right">
                                    <span className="m-widget1__title text-info">{user.lastName || '-'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="m-widget1__item">
                            <div className="row m-row--no-padding">
                                <div className="col">
                                    <h3 className="m-widget1__title">{t('email')}</h3>
                                </div>
                                <div className="col text-right">
                                    <span className="m-widget1__title text-info">{user.email || '-'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="m-widget1__item">
                            <div className="row m-row--no-padding">
                                <div className="col">
                                    <h3 className="m-widget1__title">{t('username')}</h3>
                                </div>
                                <div className="col text-right">
                                    <span className="m-widget1__title text-info">{user.username || '-'}</span>
                                </div>
                            </div>
                        </div>                                
                        <div className="m-widget1__item">
                            <div className="row m-row--no-padding">
                                <div className="col">
                                    <h3 className="m-widget1__title">{t('phoneNumber')}</h3>
                                </div>
                                <div className="col text-right">
                                    <span className="m-widget1__title text-info">{user.phoneNumber || '-'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="m-widget1__item">
                            <div className="row m-row--no-padding">
                                <div className="col">
                                    <h3 className="m-widget1__title">{t('gender')}</h3>
                                </div>
                                <div className="col text-right">
                                    <span className="m-widget1__title text-info">{user.gender ? t(user.gender) : '-'}</span>
                                </div>
                            </div>
                        </div>                 
                        <div className="m-widget1__item">
                            <div className="row m-row--no-padding">
                                <div className="col">
                                    <h3 className="m-widget1__title">{t('birthday')}</h3>
                                </div>
                                <div className="col text-right">
                                    <span className="m-widget1__title text-info">{user.birthday || '-'}</span>
                                </div>  
                            </div>
                        </div>
                    </div>
                </TabContainer>}   
                {!user.accepted && <TabContainer>
                    <div className={`alert alert-${(user.declined ? 'danger' : 'success')}`}>
                        <p className='m-0'>
                            {t(user.declined ? 'connectionRequestDeclined' : (user.waiting ? 'connectionRequestWaitingForYourApproval' : 'connectionRequestSent'))}
                        </p>
                    </div>
                    <div className="m-widget1 p-0">
                        <div className="m-widget1__item">
                            <div className="row m-row--no-padding">
                                <div className="col">
                                    <h3 className="m-widget1__title">{t('requestSentDate')}</h3>
                                </div>
                                <div className="col text-right">
                                    <span className="m-widget1__title text-info"><DateTime time={user.sentAt} /></span>
                                </div>
                            </div>
                        </div>
                        {user.declined &&
                        <div className="m-widget1__item">
                            <div className="row m-row--no-padding">
                                <div className="col">
                                    <h3 className="m-widget1__title">{t('declinedAt')}</h3>
                                </div>
                                <div className="col text-right">
                                    <span className="m-widget1__title text-info"><DateTime time={user.updatedAt} /></span>
                                </div>
                            </div>
                        </div>}
                        <div className="m-widget1__item">
                            <div className="row m-row--no-padding">
                                <div className="col">
                                    <h3 className="m-widget1__title">{t('name')}</h3>
                                </div>
                                <div className="col text-right">
                                    <span className="m-widget1__title text-info">{user.name || '-'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="m-widget1__item">
                            <div className="row m-row--no-padding">
                                <div className="col">
                                    <h3 className="m-widget1__title">{t('username')}</h3>
                                </div>
                                <div className="col text-right">
                                    <span className="m-widget1__title text-info">{user.username || '-'}</span>
                                </div>
                            </div>
                        </div>                                
                        <div className="m-widget1__item">
                            <div className="row m-row--no-padding">
                                <div className="col">
                                    <h3 className="m-widget1__title">{t('email')}</h3>
                                </div>
                                <div className="col text-right">
                                    <span className="m-widget1__title text-info">{user.email || '-'}</span>
                                </div>
                            </div>
                        </div>
                        {user.waiting &&
                        <div className="m-widget1__item">
                            <div className="row m-row--no-padding">             
                                <div className="col text-center">
                                    <button disabled={loading} className="btn m-btm btn-success mr-2" onClick={() => { this._accept(user.connectionId) }}>{t('accept')}</button>                                    
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
            <Modal middle={true} isOpen={isOpen} onClose={() => this._close()}>
                <AppBar position="static" color="primary" className="dialogAppBar">
                    <Toolbar>                             
                        <Icon className="mr-3">person</Icon>
                        <Typography variant="h6" color="inherit" >
                            {t('connectionDetails')}
                        </Typography>                        
                    </Toolbar>
                </AppBar>
                <DialogContent className="mt-4">
                    { data && this._renderRequestForm(data) }
                </DialogContent>
            </Modal>
        );
    }
}

export default withTranslation('translations')(ViewConnectionModal);