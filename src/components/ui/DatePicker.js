import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from 'material-ui';
import { DatePicker as BaseDatePicker } from 'material-ui-pickers';
import blue from 'material-ui/es/colors/blue';

class DatePicker extends Component {

  render () {
    const theme = createMuiTheme ({
      palette: {
        primary: blue
      },
      status: {
        danger: 'orange',
      },
    });

    return (
      <MuiThemeProvider theme={theme}>
        <BaseDatePicker {...this.props}/>
      </MuiThemeProvider>
    );
  }
}

export default DatePicker;
