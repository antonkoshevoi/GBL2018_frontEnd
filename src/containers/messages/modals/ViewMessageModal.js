import React, {Component} from 'react';
import {
  AppBar, DialogContent,  
  Icon, Toolbar, Typography,
  Divider, Button, DialogActions,  
} from '@material-ui/core';
import { translate } from 'react-i18next';
import Modal from "../../../components/ui/Modal";
import moment from "moment/moment";

class ViewMessageModal extends Component {

    constructor (props) {
        super(props);
        this.state = {
            message: null
        };
    }
    
    componentWillReceiveProps(nextProps) {
        if (!this.props.isOpen && nextProps.isOpen) {
            this.setState({
                message: nextProps.message
            });   
        }                
    }
 
    _close () {
        this.props.onClose();
    };
  
    render() {
        const { isOpen, message, t } = this.props;            

        return (
            <Modal isOpen={isOpen} onClose={() => this._close()}>
                <AppBar position="static" color="primary" className="dialogAppBar">
                    <Toolbar>                             
                        <Icon className="m--margin-right-15">message</Icon>                        
                        <Typography type="title" color="inherit" >
                            {t('message')}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent className="m--margin-top-25" style={{minWidth: 650}}>
                    {message &&                     
                    <div className="row">
                        <div className="col-sm-12">
                            <h5 className="m--margin-bottom-20">{message.subject} { message.type && <span className={`m-badge m-badge--brand m-badge--wide ${(message.type === 'alert' ? 'm-badge--warning' : '')}`}>{t(message.type)}</span> }</h5>
                            <p>{t('date')}: <strong>{moment(message.sent || message.created).format('lll')}</strong></p>
                            {message.recipients &&
                                <p>{t('to')}: <strong>{message.isPrivate ? message.recipients : t('recipientsGroups.' + message.recipients)}</strong></p>
                            }
                            <Divider className="m--margin-top-20 m--margin-bottom-30" /> 
                            <p className="pre-line" style={{minHeight: 300}}>{message.body}</p>                                                                                         
                        </div>
                    </div> }
                </DialogContent>
                <Divider className='full-width'/>
                <DialogActions>
                    <Button
                      className='mt-btn-success pull-right btn btn-success mt-btn'
                      onClick={ (e) => {this._close() }}
                      color='primary'>
                      {t('ok')}
                    </Button>
                </DialogActions>
            </Modal>
        );
    }
}

export default translate('translations')(ViewMessageModal);