import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, CircularProgress,
  Dialog, DialogContent,
  DialogContentText,
  Icon, IconButton, Slide,
  Toolbar, Typography
} from 'material-ui';
import AddForm from "../../../components/pages/students/AddForm";
import { selectCreateRequest, selectSchools } from '../../../redux/students/selectors';
import connect from "react-redux/es/connect/connect";
import { create, getSchools, resetCreateRequest } from '../../../redux/students/actions';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AddStudentDialog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  componentDidMount() {
    this.props.getSchools();
  }

  componentWillReceiveProps(nextProps) {
    const success = this.props.createRequest.get('success');
    const nextSuccess = nextProps.createRequest.get('success');

    if(!success && nextSuccess) {

      this._onClose();
      this.props.onSuccess();
      // this.props.resetCreateRequest();
    } else {

      this.setState ({ isOpen: nextProps.dialogIsOpen });
    }
  }

  _onClose = () => {
    this.props.resetCreateRequest();
    this.setState({isOpen: false}, this.props.onClose);
  };

  _save = (form) => {
    this.props.create(form);
  };

  render() {
    const { isOpen } = this.state;
    const { createRequest, schools } = this.props;
    const loading = createRequest.get('loading');
    const errorMessage = createRequest.get('errorMessage');
    const errors = createRequest.get('errors');

    return (
      <Dialog
        open={isOpen}
        onClose={this._onClose}
        transition={Transition}
        aria-labelledby="form-dialog-title">
        <AppBar position="static" color="primary" className="dialogAppBar">
          <Toolbar>
            <IconButton color="contrast" aria-label="Close">
              <Icon>person</Icon>
            </IconButton>
            <Typography type="title" color="inherit" >
              Create user
            </Typography>
            {loading &&
              <CircularProgress color="primary"/>
            }
          </Toolbar>
        </AppBar>

        <DialogContent className="m--margin-top-25">
          <DialogContentText>
            {/*{errorMessage && <span>{errorMessage}</span>}*/}
          </DialogContentText>
          <AddForm
            onSubmit={this._save}
            loading={loading}
            schools={schools}
            errors={errors}/>
        </DialogContent>
      </Dialog>
    );
  }
}

AddStudentDialog.propTypes = {
  dialogIsOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.any.isRequired,
  create: PropTypes.func.isRequired,
  createRequest: PropTypes.any.isRequired,
};

AddStudentDialog = connect(
  (state) => ({
    createRequest: selectCreateRequest(state),
    schools: selectSchools(state),
  }),
  (dispatch) => ({
    create: (form, params = {}) => { dispatch(create(form, params)) },
    resetCreateRequest: () => { dispatch(resetCreateRequest()) },
    getSchools: () => { dispatch(getSchools()) },
  })
)(AddStudentDialog);

export default AddStudentDialog;
