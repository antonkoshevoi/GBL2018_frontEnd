import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Avatar, Button, CircularProgress, Grid, Typography} from "material-ui";
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import MetronicDatePicker from "../../../components/ui/metronic/MetronicDatePicker";
import {NavLink} from "react-router-dom";
import {getSingleRecord, update} from "../../../redux/students/actions";
import {selectGetSingleRecordRequest, selectUpdateRequest} from "../../../redux/students/selectors";


const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: '15px',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  avatar: {
    margin: '10px auto',
    height: 120,
    width: 120,
    display: 'flex'
  },
});


class ProfileEdit extends Component {

  state = {
    form: {},
    errors: null
  };

  componentDidMount() {
    const {id} = this.props.match.params;

    this.props.getStudent(id);

    this.setState({id: id})
  }

  componentWillReceiveProps(nextProps) {
    const {student} = nextProps;

    if (student && student.get('record')) {
      this.setState({
        form:
          {...student.get('record').toJS()}
      })
    }
  }

  _handleInputChange = (e) => {
    const {name, value} = e.target;
    this.setState((prevState, props) => ({
      form: {
        ...prevState.form,
        [name]: value,
      }
    }))
  };

  _handleDateChange = (date, name) => {
    this.setState((prevState, props) => ({
      form: {
        ...prevState.form,
        [name]: date,
      }
    }))
  };

  updateProfile = () => {
    this.props.updateStudent(this.state.id, this.state.form);
  };

  render() {
    const {classes, student, updateRequest} = this.props;
    const loading = student.get('loading') || updateRequest.get('loading') || false;
    const errors = updateRequest.get('errors');
    const {form} = this.state;

    const defaultAvatar = '//s3.amazonaws.com/37assets/svn/765-default-avatar.png';

    return (
      <div className="d-flex justify-content-center">
        <div className="animate fadeInLeftBig col-xl-10 col-lg-12">

          <div className={classes.root}>

            <Paper className={classes.paper}>

              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <Typography variant="display3" gutterBottom>
                    Edit profile
                  </Typography>
                </Grid>
                {loading ? (<CircularProgress style={{margin: '10px auto', minHeight: 200}} color="inherit"/>)
                  :
                  <Grid container item spacing={0}>
                    <Grid item xs={12} md={4}>
                      <Avatar
                        alt="Adelle Charles"
                        src={form.avatar ? form.avatar : defaultAvatar}
                        className={classes.avatar}
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      {/*First name*/}
                      <div className="form-group m-form__group row">
                        <label className="col-form-label col-lg-3 col-sm-12">First name</label>
                        <div className="col-lg-8 col-md-12 col-sm-12">
                          <input
                            value={form.firstName || ''}
                            name='firstName'
                            onChange={(e) => {
                              this._handleInputChange(e)
                            }}
                            type='text'
                            className='form-control m-input m-input--air '
                            placeholder=''/>
                          <div className='form-control-feedback'>
                            {errors && errors.get('firstName') &&
                            <div
                              className="form-control-feedback text-center error">{errors.get('firstName').get(0)}</div>}
                          </div>
                        </div>
                      </div>


                      {/*Last name*/}
                      <div className="form-group m-form__group row">
                        <label className="col-form-label col-lg-3 col-sm-12">Last name</label>
                        <div className="col-lg-8 col-md-12 col-sm-12">
                          <input
                            value={form.lastName || ''}
                            name='lastName'
                            onChange={(e) => {
                              this._handleInputChange(e)
                            }}
                            type='text'
                            className='form-control m-input m-input--air '
                            placeholder=''/>
                          <div className='form-control-feedback'>
                            {errors && errors.get('lastName') &&
                            <div
                              className="form-control-feedback text-center error">{errors.get('lastName').get(0)}</div>}
                          </div>
                        </div>
                      </div>

                      {/*Birthday*/}
                      <div className="form-group m-form__group row">
                        <label className="col-form-label col-lg-3 col-sm-12" htmlFor="phone">Birthday</label>
                        <div className="col-lg-8 col-md-12 col-sm-12">
                          <MetronicDatePicker
                            className="form-control m-input m-input--air "
                            value={form.birthday || null}
                            onChange={(date) => {
                              this._handleDateChange(date, 'birthday')
                            }}/>
                          {errors && errors.get('birthday') &&
                          <div
                            className="form-control-feedback text-center error">{errors.get('birthday').get(0)}</div>}
                        </div>
                      </div>


                      {/*user name*/}
                      <div className="form-group m-form__group row">
                        <label className="col-form-label col-lg-3 col-sm-12">User name</label>
                        <div className="col-lg-8 col-md-12 col-sm-12">
                          <input
                            value={form.username || ''}
                            name='username'
                            onChange={(e) => {
                              this._handleInputChange(e)
                            }}
                            type='text'
                            className='form-control m-input m-input--air '
                            placeholder=''/>
                          <div className='form-control-feedback'>
                            {errors && errors.get('username') &&
                            <div
                              className="form-control-feedback text-center error">{errors.get('username').get(0)}</div>}
                          </div>
                        </div>
                      </div>


                      {/*password name*/}
                      <div className="form-group m-form__group row">
                        <label className="col-form-label col-lg-3 col-sm-12">Password</label>
                        <div className="col-lg-8 col-md-12 col-sm-12">
                          <input
                            value={form.password || ''}
                            name='password'
                            onChange={(e) => {
                              this._handleInputChange(e)
                            }}
                            type='password'
                            className='form-control m-input m-input--air '
                            placeholder=''/>
                          <div className='form-control-feedback'>
                            {errors && errors.get('password') &&
                            <div
                              className="form-control-feedback text-center error">{errors.get('password').get(0)}</div>}
                          </div>
                        </div>
                      </div>

                    </Grid>
                  </Grid>
                }

                <Grid item xs={12}>
                  <NavLink to={`/reports/students/${this.state.id}/`}>
                    <Button variant="raised" color="default" className={classes.button}>
                      Back
                    </Button>
                  </NavLink>

                  <Button variant="raised" color="primary" className={classes.button} onClick={this.updateProfile}>
                    Save
                  </Button>
                </Grid>

              </Grid>
            </Paper>

          </div>
        </div>
      </div>

    )
      ;
  }
}

ProfileEdit = connect(
  (state) => ({
    student: selectGetSingleRecordRequest(state),
    updateRequest: selectUpdateRequest(state)
  }),
  (dispatch) => ({
    getStudent: (id) => {
      dispatch(getSingleRecord(id))
    },
    updateStudent: (id, data) => {
      dispatch(update(id, data))
    }
  })
)(ProfileEdit);

export default withStyles(styles)(ProfileEdit);

