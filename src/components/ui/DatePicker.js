import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from 'material-ui';
import { DatePicker as BaseDatePicker } from 'material-ui-pickers';
import blue from 'material-ui/es/colors/blue';

class DatePicker extends Component {

  render () {
    const { format, ...rest } = this.props;

    const theme = createMuiTheme ({
      palette: {
        primary: blue
      }
    });

    return (
      <MuiThemeProvider theme={theme}>
        <BaseDatePicker
          {...rest}
          clearable
          format={format ? format : 'YYYY-MM-DD'}/>
      </MuiThemeProvider>
    );
  }
}

export default DatePicker;
