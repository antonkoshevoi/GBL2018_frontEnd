import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText, Input, InputLabel, MenuItem, Select } from 'material-ui';
import { connect } from 'react-redux';
import { selectGetSchoolHomeroomsRequest, selectSchools } from '../../../redux/schools/selectors';
import { getSchoolHomerooms, getSchools } from '../../../redux/schools/actions';

class InvitationForm extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    invitation: PropTypes.object.isRequired,
    errors: PropTypes.any
  };

  constructor (props) {
    super(props);
    this.state = {
      schoolHomerooms: [],
    };
  }

  componentDidMount() {
    const { getSchoolHomerooms } = this.props;

    getSchoolHomerooms();
  }

  componentWillReceiveProps(nextProps) {
    this._getSchoolHomeroomsSuccess(nextProps);
  }

  _getSchoolHomeroomsSuccess(nextProps) {
    const schoolHomerooms = this.props.getSchoolHomeroomsRequest.get('records');
    const nextschoolHomerooms = nextProps.getSchoolHomeroomsRequest.get('records');

    if (!schoolHomerooms && nextschoolHomerooms) {
      this.setState({
        ...this.state,
        schoolHomerooms: nextschoolHomerooms.toJS()
      });
    }
  }

  _handleInputChange(event) {
    const { name, type, value, checked } = event.target;

    this.props.onChange({
      ...this.props.student,
      [name]: value
    });
  }

  _renderSchools() {
    const { schools } = this.props;

    return schools.map((school, key) => (
      <MenuItem key={key} value={ school.get('schId') }>
        { school.get('schName') }
      </MenuItem>
    ));
  }

  _renderSchoolHomerooms() {
    const { schoolHomerooms } = this.state;

    return schoolHomerooms.map((homeroom, key) => (
      <MenuItem key={key} value={ homeroom.id }>
        { homeroom.name }
      </MenuItem>
    ));
  }

  render() {
    const { invitation, errors } = this.props;

    return (
      <div className='row'>
        <div className='col-sm-8 m-auto'>
          <FormControl className='full-width form-inputs'>
            <InputLabel htmlFor='name-error'>Course</InputLabel>
            <Select
                primarytext=""
                name='classroomId'
                onChange={(e) => { this._handleInputChange(e) }}
                value={invitation.classroomId || ''}>
              <MenuItem value={null} primarytext=""/>
              {this._renderSchoolHomerooms()}
            </Select>
            {errors && errors.get('classroomId') && <FormHelperText error>{ errors.get('classroomId').get(0) }</FormHelperText>}
          </FormControl>

          <FormControl aria-describedby='name-error-text' className='full-width form-inputs'>
            <InputLabel htmlFor='name-error'>Email</InputLabel>
            <Input
              fullWidth
              name='email'
              type='email'
              margin='dense'
              value={invitation.email || ''}
              onChange={(e) => { this._handleInputChange(e) }}/>
            {errors && errors.get('email') && <FormHelperText error>{ errors.get('email').get(0) }</FormHelperText>}
          </FormControl>

          <FormControl aria-describedby='name-error-text' className='full-width form-inputs'>
            <InputLabel htmlFor='name-error'>Name</InputLabel>
            <Input
              fullWidth
              name='name'
              type='text'
              margin='dense'
              value={invitation.name || ''}
              onChange={(e) => { this._handleInputChange(e) }}/>
            {errors && errors.get('name') && <FormHelperText error>{ errors.get('name').get(0) }</FormHelperText>}
          </FormControl>

          <FormControl aria-describedby='name-error-text' className='full-width form-inputs'>
            <InputLabel htmlFor='name-error'>Message</InputLabel>
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
    schools: selectSchools(state),
    getSchoolHomeroomsRequest: selectGetSchoolHomeroomsRequest(state),
  }),
  (dispatch) => ({
    getSchools: () => { dispatch(getSchools()) },
    getSchoolHomerooms: () => { dispatch(getSchoolHomerooms()) }
  })
)(InvitationForm);

export default InvitationForm;