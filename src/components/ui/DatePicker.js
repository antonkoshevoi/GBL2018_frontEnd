import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from 'material-ui';
import { DatePicker as BaseDatePicker } from 'material-ui-pickers';
import blue from 'material-ui/es/colors/blue';
import moment from "moment/moment";

class DatePicker extends Component {

  render () {
    const { InputProps, format, onChange, ...rest } = this.props;

    const theme = createMuiTheme ({
      palette: {
        primary: blue
      }
    });

    return (
      <MuiThemeProvider theme={theme}>
        <BaseDatePicker
          {...rest}
          onChange={(m) => onChange(moment(m).format('YYYY-MM-DD'))}
          clearable
          autoOk={true}
          returnMoment={false}
          format={format ? format : 'YYYY-MM-DD'}
          InputProps={InputProps ? InputProps : {
            style: {
              marginTop: '16px'
            }
          }}/>
      </MuiThemeProvider>
    );
  }
}

export default DatePicker;
