import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Typography, Input, FormControl, FormHelperText, InputLabel, MenuItem, Select, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import { selectGetUsersRequest} from "../../../redux/connections/selectors";
import { getUsers } from "../../../redux/connections/actions";

class GiftForm extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
    errors: PropTypes.any    
  };
  
  constructor (props) {
    super(props);
    this.state = {};
  }
  
  componentDidMount() {
    const { getUsers } = this.props;    
    getUsers();
  }  
  
  _handleInputChange(event) {
    const { name, value } = event.target;   
    let { form } = this.props;

    if (name === 'userId') {
        form = {};
    } else {
        form.userId = null;
    }
        
    this.props.onChange({
      ...this.props.form,
      [name]: value
    });
  }
  
  _renderFriends() {
    const { usersRequest } = this.props;
    
    return usersRequest.get('records').toJS().map((user, key) => (
      <MenuItem key={key} value={ user.id }>
        { user.name }
      </MenuItem>
    ));    
  }
  
  render() {
    
    const { form, errors, t , usersRequest} = this.props;    
    
    return (
      <div className='row'>
        <div className='col-sm-12 col-lg-12 m-auto'>
        {(usersRequest.get('success')) ? ((usersRequest.get('records').size > 0) &&
            <div className='mb-4'>
                <Typography variant="h6">{t('selectFromMyConnections')} </Typography>
                <FormControl className='full-width form-inputs'>
                  <InputLabel htmlFor='userId'>{t('giftToPersone')}</InputLabel>                 
                  <Select
                      primarytext=""
                      name='userId'
                      style={{minWidth: 200}}
                      onChange={(e) => { this._handleInputChange(e) }}
                      value={form.userId || ''}>
                    <MenuItem value={null} primarytext=""/>
                    { this._renderFriends() }
                  </Select>
                  {errors && errors.get('userId') && <FormHelperText error>{ errors.get('userId').get(0) }</FormHelperText>}            
                </FormControl>
            </div>) : (<div className="text-center" style={{width: '100%'}}><CircularProgress color="primary"/></div>)}
            <div>
                <Typography variant="h6" color='inherit'>{t('inviteNewPersone')} </Typography>
                <FormControl aria-describedby='crmName-error-text' className='full-width form-inputs'>
                  <InputLabel htmlFor='email'>{t('email')}</InputLabel>
                  <Input
                    name='email'              
                    fullWidth
                    value={form.email || ''}
                    onChange={(e) => {
                      this._handleInputChange(e)
                    }}/>
                  {errors && errors.get('email') && <FormHelperText error>{errors.get('email').get(0)}</FormHelperText>}
                </FormControl>
                <FormControl className='full-width form-inputs'>
                  <InputLabel htmlFor='firstName'>{t('firstName')}</InputLabel>
                  <Input
                    name='firstName'              
                    fullWidth
                    value={form.firstName || ''}
                    onChange={(e) => {
                      this._handleInputChange(e)
                    }}/>
                  {errors && errors.get('firstName') && <FormHelperText error>{errors.get('firstName').get(0)}</FormHelperText>}
                </FormControl>
                <FormControl className='full-width form-inputs'>
                  <InputLabel htmlFor='lastName'>{t('lastName')}</InputLabel>
                  <Input
                    name='lastName'              
                    fullWidth
                    value={form.lastName || ''}
                    onChange={(e) => {
                      this._handleInputChange(e)
                    }}/>
                  {errors && errors.get('lastName') && <FormHelperText error>{errors.get('lastName').get(0)}</FormHelperText>}
                </FormControl>
            </div>                
        </div>        
      </div>
    );
  }
}

GiftForm = connect(
  (state) => ({    
    usersRequest: selectGetUsersRequest(state)
  }),
  (dispatch) => ({
    getUsers: () => { dispatch(getUsers()) }
  })
)(GiftForm);

export default withTranslation('translations')(GiftForm);