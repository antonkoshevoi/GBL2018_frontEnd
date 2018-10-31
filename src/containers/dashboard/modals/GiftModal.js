import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, CircularProgress,
  DialogContent, FormControl, InputLabel, FormHelperText,
  Icon, Toolbar, Typography, MenuItem, Select,
  Input,  
  Divider, Button, DialogActions
} from '@material-ui/core';
import { connect } from 'react-redux';
import {translate} from "react-i18next";
import Modal from '../../../components/ui/Modal';
import { selectGetUsersRequest } from "../../../redux/connections/selectors";
import { getUsers } from "../../../redux/connections/actions";
import { selectGiftRequest } from "../../../redux/gifts/selectors";
import { giftCourseCredit, resetGiftRequest } from "../../../redux/gifts/actions";

class GiftModal extends Component {

    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,    
        onSuccess: PropTypes.func.isRequired    
    };

    constructor (props) {
        super(props);
        this.state = {
            form: {
                quantity: 1
            },
            connections: [],
            error: ''
        };
    };

  
    componentWillReceiveProps(nextProps) {    

        if (!this.props.isOpen && nextProps.isOpen) {
            this.props.getConnections();
        }
        
        this._handleSubmitSuccess(nextProps);
        
        this._handleGetConnections(nextProps);
    };
  
    _handleGetConnections(nextProps) {
        const success = this.props.connectionsRequest.get('success');
        const nextSuccess = nextProps.connectionsRequest.get('success');

        if (!success && nextSuccess) {
            this.setState({
                connections: nextProps.connectionsRequest.get('records').toJS()
            });
        }        
    }
    
    _handleSubmitSuccess(nextProps) {
        const success = this.props.giftRequest.get('success');
        const nextSuccess = nextProps.giftRequest.get('success');

        if (!success && nextSuccess) {
            this._close();     
            this.props.onSuccess();
        }        
    } 
  
    _close () {     
        this.setState({userId: null, quantity: 1});  
        this.props.resetGiftRequest();
        this.props.onClose();
    };
  
    _handleSubmit () {            
        const { unassignedItem, t } = this.props;
        const { form, connections } = this.state;
                        
        if (!form.userId && !form.email && connections.length) {
            this.setState({error: t('pleaseSelectConnectedUserOrEnterEmailAddress')});
            return false;
        } else {
            this.setState({error: null});
        }

        this.props.giftCourseCredit({
            productId: unassignedItem.id,
            ...form            
        });    
    };  

    _handleInputChange(event) {
        const {name, value} = event.target;
        let {form} = this.state;
        
        if (name === 'userId') {
            form = {
                quantity: form.quantity
            };
        } else {
            form.userId = null;
        }

        this.setState({form: {
            ...form,
           [name]: value
        }});
    }
  
  render() {
    const { isOpen, unassignedItem, giftRequest, connectionsRequest, t } = this.props;
    const { connections, form } = this.state;
    const loading = giftRequest.get('loading') || connectionsRequest.get('loading');
    const errors  = giftRequest.get('errors');
    
    return (
      <Modal isOpen={isOpen} onClose={() => this._close()}>
        <AppBar position='static' color='primary' className='dialogAppBar'>
          <Toolbar>            
              {loading ? (
                <CircularProgress className="m--margin-right-15" color='inherit'/>
              ) : (
                <Icon className="m--margin-right-15">card_giftcard</Icon>
              )}            
            <Typography variant="h6" color='inherit'>{t('giftCourseCredit')} </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className='m--margin-top-25'>             
            <div className="alert m-alert m-alert--default m--margin-bottom-25">
                <p className="text-center margin-bottom-0">{t('giftCourseCreditNotification')}</p>
            </div>
            {this.state.error &&            
                <FormHelperText className="text-center m--margin-bottom-15" error variant="filled">{this.state.error}</FormHelperText>
            }            
            <div className='row m-auto' style={{maxWidth: 750}}>                 
                <div className='col-sm-6 col-lg-5 m--margin-top-25'>
                {unassignedItem &&
                    <div className="m--margin-top-25">
                        <div className="text-center">
                            <img alt={unassignedItem.item.title} src={unassignedItem.item.thumbnail} width={70}/>
                            <p className='m--margin-top-25'><strong>{unassignedItem.item.title}</strong></p>
                        </div>        
                        {(unassignedItem.quantity > 1) && 
                        <FormControl className='full-width form-inputs'>
                            <InputLabel htmlFor='userId'>{t('quantity')}</InputLabel>
                            <Select
                              primarytext={t('quantity')}
                              id='quantity'
                              name='quantity'
                              value={form.quantity || 1}
                              onChange={(e) => { this._handleInputChange(e) }}>
                              {Array.from({length: unassignedItem.quantity}, (i, x) => (x + 1)).map((count, i) =>    
                                  <MenuItem key={i} value={count}>{count}</MenuItem>
                              )}  
                            </Select>
                            {errors && errors.get('quantity') && <FormHelperText error>{errors.get('quantity').get(0)}</FormHelperText>}
                        </FormControl>}                        
                    </div> }
                </div>
                <div className='col-sm-6 col-lg-5 m-auto'>
                    {(connections.length > 0) &&
                        <div className='m--margin-bottom-25'>
                            <Typography variant="h6">{t('selectFromMyConnections')} </Typography>
                            <FormControl className='full-width form-inputs'>
                                <InputLabel htmlFor='userId'>{t('selectPersone')}</InputLabel>
                                <Select
                                  primarytext={t('selectPersone')}
                                  id='userId'
                                  name='userId'
                                  value={form.userId || ''}
                                  onChange={(e) => { this._handleInputChange(e) }}> 
                                  <MenuItem value={null} primarytext=""/>
                                  {connections.map((user, key) => (
                                        <MenuItem key={key} value={user.id}>{user.name}</MenuItem>
                                  ))}
                                </Select>
                                {errors && errors.get('userId') && <FormHelperText error>{errors.get('userId').get(0)}</FormHelperText>}
                            </FormControl>
                        </div>
                    }
                    <div>
                    <Typography variant="h6" color='inherit'>{t('inviteNewPersone')} </Typography>
                    <FormControl aria-describedby='crmName-error-text' className='full-width form-inputs'>
                      <InputLabel htmlFor='email'>{t('email')}</InputLabel>
                      <Input
                        name='email'              
                        fullWidth
                        value={form.email || ''}
                        onChange={(e) => {
                          this._handleInputChange(e)
                        }}/>
                      {errors && errors.get('email') && <FormHelperText error>{errors.get('email').get(0)}</FormHelperText>}
                    </FormControl>
                    <FormControl className='full-width form-inputs'>
                      <InputLabel htmlFor='firstName'>{t('firstName')}</InputLabel>
                      <Input
                        name='firstName'              
                        fullWidth
                        value={form.firstName || ''}
                        onChange={(e) => {
                          this._handleInputChange(e)
                        }}/>
                      {errors && errors.get('firstName') && <FormHelperText error>{errors.get('firstName').get(0)}</FormHelperText>}
                    </FormControl>
                    <FormControl className='full-width form-inputs'>
                      <InputLabel htmlFor='lastName'>{t('lastName')}</InputLabel>
                      <Input
                        name='lastName'              
                        fullWidth
                        value={form.lastName || ''}
                        onChange={(e) => {
                          this._handleInputChange(e)
                        }}/>
                      {errors && errors.get('lastName') && <FormHelperText error>{errors.get('lastName').get(0)}</FormHelperText>}
                    </FormControl>
                    </div>
                </div>                       
            </div>       
        </DialogContent>
        
        <Divider className='full-width'/>
        <DialogActions>
          <Button
            type='button'
            onClick={(e) => { this._handleSubmit(e) }}
            form='create-student-form'
            disabled={loading}            
            className='mt-btn-success pull-right btn btn-success mt-btn'
            color='primary'>
            {t('makeGift')}
          </Button>
        </DialogActions>
      </Modal>
    );
  }
}
    
GiftModal = connect(
    (state) => ({    
        connectionsRequest: selectGetUsersRequest(state),
        giftRequest: selectGiftRequest(state)
    }),
    (dispatch) => ({
        getConnections: (params = {}) => { dispatch(getUsers(params)) },
        giftCourseCredit: (form, params = {}) => { dispatch(giftCourseCredit(form, params)) },
        resetGiftRequest: () => { dispatch(resetGiftRequest()) }
    })
)(GiftModal);
  
export default translate('translations')(GiftModal);