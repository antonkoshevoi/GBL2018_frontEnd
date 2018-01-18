import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText, Input, InputLabel, MenuItem, Select, Typography, Tab, Tabs, Paper } from 'material-ui';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class HomeroomForm extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    homeroom: PropTypes.object.isRequired,
    schools: PropTypes.any,
    errors: PropTypes.any
  };

  state = {
    value: 0,
  };

  handleChangeTab = (event, value) => {
    this.setState({ value });
  };

  _handleInputChange(event) {
    const { name, type, value, checked } = event.target;

    this.props.onChange({
      ...this.props.homeroom,
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

  render() {
    const { homeroom, errors } = this.props;
    const { value } = this.state;

    return (
      <div className='row'>

          <Paper>
            <Tabs value={value} onChange={this.handleChangeTab} centered>
              <Tab label="Details" />
              <Tab label="Administration" />
              <Tab label="Students" />
            </Tabs>

          {value === 0 && <TabContainer>
            <div className="col-sm-8 m-auto">
            <FormControl aria-describedby='name-error-text' className='full-width form-inputs'>
              <InputLabel htmlFor='name-error'>Name</InputLabel>
              <Input
                  name='name'
                  margin='dense'
                  fullWidth
                  value={homeroom.name || ''}
                  onChange={(e) => { this._handleInputChange(e) }}/>
                {errors && errors.get('name') && <FormHelperText error>{ errors.get('name').get(0) }</FormHelperText>}
            </FormControl>
            <FormControl aria-describedby='name-error-text' className='full-width form-inputs'>
              <InputLabel htmlFor='name-error'>Start Date</InputLabel>
              <Input
                  name='startDate'
                  margin='dense'
                  fullWidth
                  value={homeroom.startDate || ''}
                  onChange={(e) => { this._handleInputChange(e) }}/>
                {errors && errors.get('startDate') && <FormHelperText error>{ errors.get('startDate').get(0) }</FormHelperText>}
            </FormControl>
            <FormControl aria-describedby='name-error-text' className='full-width form-inputs'>
              <InputLabel htmlFor='name-error'>End Date</InputLabel>
              <Input
                  name='endDate'
                  margin='dense'
                  fullWidth
                  value={homeroom.endDate || ''}
                  onChange={(e) => { this._handleInputChange(e) }}/>
                {errors && errors.get('endDate') && <FormHelperText error>{ errors.get('endDate').get(0) }</FormHelperText>}
            </FormControl>
            <FormControl aria-describedby='name-error-text' className='full-width form-inputs'>
              <InputLabel htmlFor='name-error'>Enrollment Start Date</InputLabel>
              <Input
                  name='enrollment_startDate'
                  margin='dense'
                  fullWidth
                  value={homeroom.enrollment_startDate || ''}
                  onChange={(e) => { this._handleInputChange(e) }}/>
                {errors && errors.get('enrollment_startDate') && <FormHelperText error>{ errors.get('enrollment_startDate').get(0) }</FormHelperText>}
            </FormControl>
            <FormControl aria-describedby='name-error-text' className='full-width form-inputs'>
              <InputLabel htmlFor='name-error'>Enrollment End Date</InputLabel>
              <Input
                  name='enrollment_endDate'
                  margin='dense'
                  fullWidth
                  value={homeroom.enrollment_endDate || ''}
                  onChange={(e) => { this._handleInputChange(e) }}/>
                {errors && errors.get('enrollment_endDate') && <FormHelperText error>{ errors.get('enrollment_endDate').get(0) }</FormHelperText>}
            </FormControl>
            </div>
          </TabContainer>}
          {value === 1 && <TabContainer>
            <div className="col-sm-8 m-auto">
            <FormControl className='full-width form-inputs'>
              <InputLabel htmlFor='name-error'>School</InputLabel>
              <Select
                  primarytext=""
                  name='schoolId'
                  onChange={(e) => { this._handleInputChange(e) }}
                  children={this._renderSchools()}
                  value={homeroom.schoolId || ''}>
              </Select>
              {errors && errors.get('schoolId') && <FormHelperText error>{ errors.get('schoolId').get(0) }</FormHelperText>}
            </FormControl>
            <FormControl className='full-width form-inputs'>
              <InputLabel htmlFor='name-error'>Teacher</InputLabel>
              <Select
                  primarytext=""
                  name='teacherId'
                  onChange={(e) => { this._handleInputChange(e) }}
                  value={homeroom.teacherId || ''}>
                <MenuItem value={null} primarytext=""/>
              </Select>
                {errors && errors.get('teacherId') && <FormHelperText error>{ errors.get('teacherId').get(0) }</FormHelperText>}
            </FormControl>
            </div>
          </TabContainer>}
          {value === 2 && <TabContainer>
            Students
          </TabContainer>}
          </Paper>
      </div>
    );
  }
}

export default HomeroomForm;