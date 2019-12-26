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
import { withTranslation, Trans } from 'react-i18next';
import { selectSubscriptionRequest } from "../../../redux/gifts/selectors";
import { giftSubscription, resetGiftSubscriptionRequest } from "../../../redux/gifts/actions";
import { Price } from '../../../components/ui/Price';
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
  }
  
  componentDidUpdate(prevProps) {
    const success = this.props.giftRequest.get('success');    

    if (success && !prevProps.giftRequest.get('success')) {
      this._close();     
      this.props.onSuccess();
    }
  }

  _close () {     
    this.setState({
        form: { userId: '' }
    });
    this.props.onClose();
    this.props.resetGiftRequest();        
  }

  _onChange (form) {  
      this.setState({ form });
  }

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
  }

  render() {
    const { isOpen, giftRequest, subscription, t } = this.props;
    const loading = giftRequest.get('loading');        
    const errors  = giftRequest.get('errors');        
    
    return (
      <Modal middle={true} isOpen={isOpen} onClose={() => this._close()}>
        <AppBar position='static' color='primary' className='dialogAppBar'>
          <Toolbar>            
            {loading ? (
              <CircularProgress className="mr-3" color='inherit'/>
            ) : (
              <Icon className="mr-3">card_giftcard</Icon>
            )}            
            <Typography variant="h6" color='inherit'>
              {t('giftSubscription')}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className='mt-4' style={{minWidth: 400}}>
            {this.state.error &&            
                <FormHelperText className="text-center mb-3" error variant="filled">{this.state.error}</FormHelperText>
            }             
            <div className="row">
                <div className='col-sm-6 col-lg-5 m-auto'>
                    {subscription &&            
                    <div className="row mb-3" >
                        <div className="col-sm-12"><h3>{t('learnerPlan', {learners: subscription.allowedStudents})}</h3> (<strong className="g-blue"><Price price={subscription.price} currency={subscription.currency} /></strong> / {t(subscription.period)})</div>                        
                        <div className="col-sm-12">
                            <Trans i18nKey="translations:courseAtTime">
                                <span className="font-weight-bold">{{courses: subscription.allowedCourses}}</span>
                            </Trans>
                            <br />
                            <Trans i18nKey={'translations:usersMax'}>
                                <span className="font-weight-bold">{{students: subscription.allowedCourses}}</span>
                            </Trans>
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
            className='mt-btn-success mt-btn'
            color='primary'>
            {t('makeGift')}
          </Button>
        </DialogActions>
      </Modal>
    );
  }
}
 
export default withTranslation('translations')(connect(
  (state) => ({
    giftRequest: selectSubscriptionRequest(state)
  }),
  (dispatch) => ({
    giftSubscription: (form) => { dispatch(giftSubscription(form)) },
    resetGiftRequest: () => { dispatch(resetGiftSubscriptionRequest()) }
  })
)(GiftModal));