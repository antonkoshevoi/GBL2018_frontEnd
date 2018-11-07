import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, CircularProgress,
  DialogContent,  
  Icon,
  Toolbar, Typography, FormHelperText,
  Divider, Button, DialogActions
} from '@material-ui/core';
import { connect } from 'react-redux';
import { translate, Interpolate } from 'react-i18next';
import { selectGiftRequest } from "../../../redux/gifts/selectors";
import { giftSubscription, resetGiftRequest } from "../../../redux/gifts/actions";
import Modal from '../../../components/ui/Modal';
import GiftForm from '../forms/GiftForm';

class GiftModal extends Component {

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.any.isRequired
  };
  
  constructor (props) {
    super(props);
    this.state = {
        form: { userId: '' }
    };
  };
  
  componentWillReceiveProps(nextProps) {
    const success = this.props.giftRequest.get('success');
    const nextSuccess = nextProps.giftRequest.get('success');

    if (!success && nextSuccess) {
      this._close();     
      this.props.onSuccess();
    }
  };

  _close () {     
    this.setState({
        form: { userId: '' }
    });
    this.props.onClose();
    this.props.resetGiftRequest();        
  };

  _onChange (form) {  
      this.setState({ form });
  };

  _handleSubmit() {            
    const {giftSubscription, t} = this.props;
    const {form} = this.state;
    
    if (!form.userId && !form.email) {
        this.setState({error: t('pleaseSelectConnectedUserOrEnterEmailAddress')});
        return false;
    } else {
        this.setState({error: null});
    }
        
    giftSubscription({
        ...form, 
        productId: this.props.subscription.id
    });    
  };

  render() {
    const { isOpen, giftRequest, subscription, t } = this.props;
    const loading = giftRequest.get('loading');        
    const errors  = giftRequest.get('errors');        
    
    return (
      <Modal middle={true} isOpen={isOpen} onClose={() => this._close()}>
        <AppBar position='static' color='primary' className='dialogAppBar'>
          <Toolbar>            
            {loading ? (
              <CircularProgress className="m--margin-right-15" color='inherit'/>
            ) : (
              <Icon className="m--margin-right-15">card_giftcard</Icon>
            )}            
            <Typography variant="h6" color='inherit'>
              {t('giftSubscription')}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className='m--margin-top-25' style={{minWidth: 400}}>
            <div className="alert m-alert m-alert--default m--margin-bottom-15">
                <p className="text-center margin-bottom-0">{t('giftNotification')}</p>
            </div>
            {this.state.error &&            
                <FormHelperText className="text-center m--margin-bottom-15" error variant="filled">{this.state.error}</FormHelperText>
            }             
            <div className="row">
                <div className='col-sm-6 col-lg-5 m-auto'>
                    {subscription &&            
                    <div className="row m--margin-bottom-15" >
                        <div className="col-sm-12"><h3 className="m--visible-desktop-inline">{subscription.title}</h3> (<strong className="g-blue">{subscription.price}$</strong> / {t(subscription.period)})</div>                        
                        <div className="col-sm-12">
                            <Interpolate i18nKey="courseAtTime" number={subscription.allowedCourses} />                            
                            <br />                            
                            <Interpolate i18nKey="usersMax" number={subscription.allowedCourses} />
                        </div>
                    </div>}
                </div>
                <div className='col-sm-6 col-lg-5 m-auto'>                    
                  <GiftForm
                    onChange={(e) => { this._onChange(e) }}
                    form={this.state.form}
                    errors={errors}/>                    
                </div>
            </div>
        </DialogContent>
        <Divider className='full-width'/>
        <DialogActions>
          <Button
            disabled={loading}     
            onClick={(e) => { this._handleSubmit(e) }}
            className='mt-btn-success btn btn-success mt-btn'
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
    giftRequest: selectGiftRequest(state)
  }),
  (dispatch) => ({
    giftSubscription: (form) => { dispatch(giftSubscription(form)) },
    resetGiftRequest: () => { dispatch(resetGiftRequest()) }
  })
)(GiftModal);
  
export default translate('translations')(GiftModal);