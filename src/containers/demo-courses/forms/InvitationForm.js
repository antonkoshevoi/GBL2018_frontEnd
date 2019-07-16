import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText, Input, InputLabel, MenuItem, Select } from '@material-ui/core';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { getDemoClassrooms } from '../../../redux/classrooms/actions';
import { selectGetRecordsRequest, selectRecords } from '../../../redux/classrooms/selectors';

class InvitationForm extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    invitation: PropTypes.object.isRequired,
    errors: PropTypes.any
  };

  constructor (props) {
    super(props);
    this.state = {
      classrooms: [],
    };
  }

  componentDidMount() {
    const { getDemoClassrooms } = this.props;

    getDemoClassrooms();
  }

  _handleInputChange(event) {
    const { name, value } = event.target;

    this.props.onChange({
      ...this.props.invitation,
      [name]: value
    });
  }

  _renderDemoClassrooms() {
    const { demoClassrooms } = this.props;

    return demoClassrooms.map((classroom, key) => (
      <MenuItem key={key} value={ classroom.get('id') }>
        { classroom.get('crmName') }
      </MenuItem>
    ));
  }

  render() {
    const { invitation, errors, t } = this.props;

    return (
      <div className='row'>
        <div className='col-sm-8 m-auto'>
          <FormControl className='full-width form-inputs'>
            <InputLabel htmlFor='name-error'>{t('course')}</InputLabel>
            <Select
                primarytext=""
                name='classroomId'
                onChange={(e) => { this._handleInputChange(e) }}
                value={invitation.classroomId || ''}>
              <MenuItem value={null} primarytext=""/>
              { this._renderDemoClassrooms() }
            </Select>
            {errors && errors.get('classroomId') && <FormHelperText error>{ errors.get('classroomId').get(0) }</FormHelperText>}
          </FormControl>

          <FormControl className='full-width form-inputs'>
            <InputLabel htmlFor='name-error'>{t('email')}</InputLabel>
            <Input
              fullWidth
              name='email'
              type='text'
              margin='dense'
              value={invitation.email || ''}
              onChange={(e) => { this._handleInputChange(e) }}/>
            {errors && errors.get('email') && <FormHelperText error>{ errors.get('email').get(0) }</FormHelperText>}
          </FormControl>

          <FormControl className='full-width form-inputs'>
            <InputLabel htmlFor='name-error'>{t('name')}</InputLabel>
            <Input
              fullWidth
              name='name'
              type='text'
              margin='dense'
              value={invitation.name || ''}
              onChange={(e) => { this._handleInputChange(e) }}/>
            {errors && errors.get('name') && <FormHelperText error>{ errors.get('name').get(0) }</FormHelperText>}
          </FormControl>

          <FormControl className='full-width form-inputs'>
            <InputLabel htmlFor='name-error'>{t('message')}</InputLabel>
            <Input
              fullWidth
              name='message'
              type='text'
              margin='dense'
              multiline={true}
              value={invitation.message || ''}
              onChange={(e) => { this._handleInputChange(e) }}/>
            {errors && errors.get('message') && <FormHelperText error>{ errors.get('message').get(0) }</FormHelperText>}
          </FormControl>
        </div>
      </div>
    );
  }
}

InvitationForm = connect(
  (state) => ({
    getCoursesRequest: selectGetRecordsRequest(state),
    demoClassrooms: selectRecords(state),
  }),
  (dispatch) => ({
    getDemoClassrooms: () => { dispatch(getDemoClassrooms({
      perPage: 0
    })) }
  })
)(InvitationForm);

export default withTranslation('translations')(InvitationForm);