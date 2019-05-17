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
import { withTranslation } from 'react-i18next';
import { selectGetSingleRecordRequest, selectUpdateRequest} from '../../../redux/homerooms/selectors';
import { resetGetSingleRecordRequest, resetUpdateRequest, update } from '../../../redux/homerooms/actions';
import Modal from "../../../components/ui/Modal";
import HomeroomForm from "../forms/HomeroomForm";

class EditHomeroomModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.any.isRequired,
    update: PropTypes.func.isRequired,
    resetUpdateRequest: PropTypes.func.isRequired,
    updateRequest: PropTypes.any.isRequired,
  };

  constructor (props) {
    super(props);
    this.state = {
      id: undefined,
      homeroom: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    const record = this.props.getSingleRecordRequest.get('record');
    const nextRecord = nextProps.getSingleRecordRequest.get('record');

    if (!record && nextRecord) {
      this.setState({
        id: nextRecord.get('id'),
        homeroom: nextRecord.toJS()
      });
    }

    const success = this.props.updateRequest.get('success');
    const nextSuccess = nextProps.updateRequest.get('success');

    if(!success && nextSuccess) {
      this._close();
      this.props.onSuccess();
    }
  }

  _close () {
    this.setState({
      id: undefined,
      homeroom: {}
    });
    this.props.resetUpdateRequest();
    this.props.resetGetSingleRecordRequest();
    this.props.onClose();
  };

  _onChange (homeroom) {
    this.setState({ homeroom });
  };

  _onSubmit (e) {
    e.preventDefault();
    this.props.update(
      this.state.id,
      this.state.homeroom
    );  
  };

  render() {
    const { isOpen, updateRequest, getSingleRecordRequest, t } = this.props;
    const loading = updateRequest.get('loading') || getSingleRecordRequest.get('loading');    
    const errors = updateRequest.get('errors');

    return (
      <Modal isOpen={isOpen} onClose={() => this._close()}>
        <AppBar position="static" color="primary" className="dialogAppBar">
          <Toolbar>            
              {loading ? (
                <CircularProgress className="m--margin-right-15" color="inherit"/>
              ) : (
                <Icon className="m--margin-right-15">person</Icon>
              )}            
            <Typography variant="h6" color="inherit" >
              {t('editHomeroom')}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className="m--margin-top-25">
          <form id='update-homeroom-form' onSubmit={(e) => { this._onSubmit(e) }}>
            <HomeroomForm
              onChange={(homeroom) => { this._onChange(homeroom) }}
              homeroom={this.state.homeroom}
              errors={errors}/>
          </form>
        </DialogContent>
        <Divider className='full-width'/>
        <DialogActions>
          <Button
            type='submit'
            form='update-homeroom-form'
            disabled={loading}           
            className='mt-btn-success pull-right btn btn-success mt-btn'
            color='primary'>
            {t('updateHomeroom')}
          </Button>
        </DialogActions>
      </Modal>
    );
  }
}

EditHomeroomModal = connect(
  (state) => ({
    getSingleRecordRequest: selectGetSingleRecordRequest(state),
    updateRequest: selectUpdateRequest(state),
  }),
  (dispatch) => ({
    update: (id, form, params = {}) => { dispatch(update(id, form, params)) },
    resetUpdateRequest: () => { dispatch(resetUpdateRequest()) },
    resetGetSingleRecordRequest: () => { dispatch(resetGetSingleRecordRequest()) },
  })
)(EditHomeroomModal);

export default withTranslation('translations')(EditHomeroomModal);
