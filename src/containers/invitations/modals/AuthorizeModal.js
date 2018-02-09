import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, Button, DialogActions, DialogContent, DialogContentText, Divider, Toolbar,
  Typography
} from 'material-ui';
import Modal from '../../../components/ui/Modal';

class AuthorizeModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  render () {
    const { isOpen, onClose } = this.props;

    return (
      <Modal isOpen={isOpen} onClose={() => onClose()}>
        <AppBar position='static' color='primary' className='dialogAppBar'>
          <Toolbar>
            <Typography type='title' color='inherit'>
              Thanks for joining the Demo
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className='m--margin-top-25'>
          <DialogContentText>
            <p>Please login if you already have an account otherwise you may not register a new account.</p>
            <p>Note that you will not be charged for this course or asked for a credit card.</p>
          </DialogContentText>
        </DialogContent>
        <Divider className='full-width'/>
        <DialogActions>
          <Button
            type='submit'
            form='create-student-form'
            raised
            className='m--margin-top-10 pull-right mt-btn'
            color='primary'>
            Login
          </Button>
          <Button
            type='submit'
            form='create-student-form'
            raised
            className='m--margin-top-10 pull-right mt-btn'
            color='primary'>
            Register
          </Button>
        </DialogActions>
      </Modal>
    );
  }
}

export default AuthorizeModal;