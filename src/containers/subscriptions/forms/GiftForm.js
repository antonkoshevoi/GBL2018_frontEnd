import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

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
        <div className='col-sm-8 col-lg-12 m-auto'>
        {(usersRequest.get('success')) ? (
            <div>
            {usersRequest.get('records').size ?
                <FormControl className='full-width form-inputs'>
                  <InputLabel htmlFor='name-error'>{t('giftToPersone')}</InputLabel>                 
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
                :
                    <p>{t('youDonNotHaveAnyConnections')}</p>
                }
            </div>
        ) : (
            <div className="text-center" style={{width: '100%'}}><CircularProgress color="primary"/></div>
        )}
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

export default translate('translations')(GiftForm);