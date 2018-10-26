import React, { Component  } from 'react';
import { DatePicker } from 'material-ui-pickers';
import moment from "moment/moment";

class MuiDatePicker extends Component {

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
    
    return (
            <DatePicker
              {...rest}
              onChange={(m) => onChange(this._convertReturnValue(m))}
              clearable
              autoOk={true}
              ref={(node) => { this.picker = node; }}
              invalidLabel=""
              format={format ? format : 'YYYY-MM-DD'}
              InputProps={InputProps ? InputProps : {
                style: {}
              }}/>        
    );
  }
}

export default MuiDatePicker;
