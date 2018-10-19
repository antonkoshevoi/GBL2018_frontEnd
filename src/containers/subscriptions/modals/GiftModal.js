import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, CircularProgress,
  DialogContent,  
  Icon,
  Toolbar, Typography,
  Divider, Button, DialogActions
} from '@material-ui/core';
import { connect } from 'react-redux';
import { translate, Interpolate } from 'react-i18next';
import { selectGiftSubscriptionRequest } from "../../../redux/subscriptions/selectors";
import { giftSubscription, resetGiftSubscriptionRequest } from "../../../redux/subscriptions/actions";
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
    const success = this.props.giftSubscriptionRequest.get('success');
    const nextSuccess = nextProps.giftSubscriptionRequest.get('success');

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
    this.props.resetGiftSubscriptionRequest();        
  };

  _onChange (form) {  
      this.setState({ form });
  };

  _onSubmit (e) {            
    e.preventDefault();
    
    this.props.giftSubscription({
        ...this.state.form, 
        subscriptionId: this.props.subscription.id
    });    
  };

  render() {
    const { isOpen, giftSubscriptionRequest, subscription, t } = this.props;
    const loading = giftSubscriptionRequest.get('loading');        
    const errors  = giftSubscriptionRequest.get('errors');        
    
    return (
      <Modal isOpen={isOpen} onClose={() => this._close()}>
        <AppBar position='static' color='primary' className='dialogAppBar'>
          <Toolbar>            
            {loading ? (
              <CircularProgress className="m--margin-right-15" color='inherit'/>
            ) : (
              <Icon className="m--margin-right-15">card_giftcard</Icon>
            )}            
            <Typography type='title' color='inherit'>
              {t('giftSubscription')}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className='m--margin-top-25' style={{minWidth: 400, maxWidth: 600}}>
            <div className="alert m-alert m-alert--default m--margin-bottom-15">
                <p className="text-center margin-bottom-0">{t('giftNotification')}</p>
            </div>          
            {subscription &&            
            <div className="row m--margin-bottom-15" >
                <div className="col-sm-12"><h3 className="m--visible-desktop-inline">{subscription.title}</h3> (<strong className="g-blue">{subscription.price}$</strong> / {t(subscription.period)})</div>                        
                <div className="col-sm-12">
                    <Interpolate i18nKey="courseAtTime" number={subscription.allowedCourses} />                            
                    <br />                            
                    <Interpolate i18nKey="usersMax" number={subscription.allowedCourses} />
                </div>
            </div>}
          <form id='create-student-form' onSubmit={(e) => { this._onSubmit(e) }}>            
            <GiftForm
              onChange={(e) => { this._onChange(e) }}
              form={this.state.form}
              errors={errors}/>
          </form>
        </DialogContent>
        <Divider className='full-width'/>
        <DialogActions>
          <Button
            type='submit'
            form='create-student-form'
            disabled={loading}
            variant="raised"
            className='mt-btn-success m--margin-top-10 pull-right btn btn-success mt-btn'
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
    giftSubscriptionRequest: selectGiftSubscriptionRequest(state)
  }),
  (dispatch) => ({
    giftSubscription: (form) => { dispatch(giftSubscription(form)) },
    resetGiftSubscriptionRequest: () => { dispatch(resetGiftSubscriptionRequest()) }
  })
)(GiftModal);
  
export default translate('translations')(GiftModal);