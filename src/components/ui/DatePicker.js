import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from 'material-ui';
import { DatePicker as BaseDatePicker } from 'material-ui-pickers';
import blue from 'material-ui/es/colors/blue';
import moment from "moment/moment";
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

class DatePicker extends Component {

  _convertReturnValue(m) {
    const date = moment(m).format('YYYY-MM-DD');

    if (date === 'Invalid date') {
      return null;
    }

    return date;
  }

  render () {
    const { InputProps, format, onChange, ...rest } = this.props;

    const theme = createMuiTheme ({
      palette: {
        primary: blue
      }
    });

    return (
      <MuiThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={MomentUtils} moment={moment}>
            <BaseDatePicker
              {...rest}
              onChange={(m) => onChange(this._convertReturnValue(m))}
              clearable
              autoOk={true}
              returnMoment={false}
              invalidLabel=""
              format={format ? format : 'YYYY-MM-DD'}
              InputProps={InputProps ? InputProps : {
                style: {}
              }}/>
          </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    );
  }
}

export default DatePicker;
