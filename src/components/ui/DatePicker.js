import React, { PureComponent  } from 'react';
import { DatePicker as BaseDatePicker } from 'material-ui-pickers';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core';
import blue from '@material-ui/core/es/colors/blue';
import moment from "moment/moment";

class DatePicker extends PureComponent {

  _convertReturnValue(m) {
    const date = moment(m).format('YYYY-MM-DD');

    if (date === 'Invalid date') {
      return null;
    }

    return date;
  }
  
  open() {
      this.picker.open();
  }

  render () {
    const { InputProps, format, onChange, ...rest } = this.props;
    const theme = createMuiTheme({
        palette: {
            primary: blue
        }
    });
    return (     
        <MuiThemeProvider theme={theme}>
            <BaseDatePicker
              {...rest}
              onChange={(m) => onChange(this._convertReturnValue(m))}
              clearable
              autoOk={true}
              returnMoment={false}
              ref={(node) => { this.picker = node; }}
              invalidLabel=""
              format={format ? format : 'YYYY-MM-DD'}
              InputProps={InputProps ? InputProps : {
                style: {}
              }}/>
        </MuiThemeProvider>
    );
  }
}

export default DatePicker;
