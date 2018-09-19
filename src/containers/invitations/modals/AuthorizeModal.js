import React, { Component } from 'react';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import {
  AppBar, Button, DialogActions, DialogContent, Divider, Toolbar,
  Typography
} from '@material-ui/core';
import Modal from '../../../components/ui/Modal';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

class AuthorizeModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  render () {
    const { isOpen, onClose, toLogin, toRegistration, t } = this.props;

    return (
      <Modal isOpen={isOpen} onClose={() => onClose()}>
        <AppBar position='static' color='primary' className='dialogAppBar'>
          <Toolbar>
            <Typography type='title' color='inherit'>
              {t('thanksForJoiningDemo')}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className='m--margin-top-25'>          
           <p>{t('joinDemoLoginMessage')}</p>
           <p>{t('joinDemoCorseIsFreeMessage')}</p>          
        </DialogContent>
        <Divider className='full-width'/>
        <DialogActions>
          <Button
            onClick={() => { toLogin() }}
            type='button'
            form='create-student-form'
            raised
            className='m--margin-10 pull-right mt-btn mt-btn-success'
            color='primary'>
            {t('login')}
          </Button>
          <Button
            onClick={() => { toRegistration() }}
            type='button'
            form='create-student-form'
            raised
            className='m--margin-10 pull-right mt-btn mt-btn-success'
            color='primary'>
            {t('register')}
          </Button>
        </DialogActions>
      </Modal>
    );
  }
}

AuthorizeModal = connect(
  (state) => ({}),
  (dispatch) => ({
    toLogin: () => { dispatch(push('/login')) },
    toRegistration: () => { dispatch(push('/signUp/parent')) },
  })
)(AuthorizeModal);

export default translate('translations')(AuthorizeModal);