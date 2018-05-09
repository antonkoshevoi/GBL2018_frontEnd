import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {formChartData, formChartOptions} from '../../../../../data/Charts';
import Card from '../../../../../components/ui/Card';
import {Line} from 'react-chartjs-2';
import ApiClient from '../../../../../services/ApiClient';
import {DatePicker} from 'material-ui-pickers';
import {createMuiTheme, MuiThemeProvider} from 'material-ui';
import blue from 'material-ui/es/colors/blue';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import moment from 'moment';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';

class LineChart extends Component {
  apiClient = new ApiClient();
  picker;

  static propTypes = {
    classroomId: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      options: {},
      selectorActive: 0,
      chosenDate: moment().format('YYYY-MM-DD'),
      disabled: false
    }
  }

  componentDidMount() {
    this.setState({disabled: true});
    const selector = this.state.selectorActive;
    const date = this.state.chosenDate;
    this.getChartData(selector, date).then(
      (data) => {
        this.setState({
          disabled: false,
          data: formChartData(data.data.history, selector, date),
          options: formChartOptions(data.maxCount, selector)
        });
      },
      (error) => {
        console.log(error);
        this.setState({disabled: false});
      });
  }

  render() {
    return (
      <Card title="Students Online" isChart={true} icon="flaticon-diagram" iconBackground="square-background"
            resetDate={this.handleResetDate} isResetChartButton={true}>
        <div className="date-group-selector">
          <div className={`date-group` + (this.state.selectorActive === 0 ? ' date-selector-active' : '')}
               onClick={() => {
                 this.changeDateGroup(0)
               }}>1 day
          </div>
          <div className={`date-group` + (this.state.selectorActive === 1 ? ' date-selector-active' : '')}
               onClick={() => {
                 this.changeDateGroup(1)
               }}>7 days
          </div>
          <div className={`date-group` + (this.state.selectorActive === 2 ? ' date-selector-active' : '')}
               onClick={() => {
                 this.changeDateGroup(2)
               }}>1 month
          </div>
          <div className={`date-group` + (this.state.selectorActive === 3 ? ' date-selector-active' : '')}
               onClick={() => {
                 this.changeDateGroup(3)
               }}>1 year
          </div>
        </div>
        {this.generateDateSelector()}
        {this.state.data && this.state.data.datasets &&
        <Line data={this.state.data} options={this.state.options} redraw={true} width="500" height="350"/>}
      </Card>
    );
  }

  changeDateGroup = (newSelector) => {
    if (this.state.disabled === true) {
      return;
    }
    this.setState({disabled: true});
    let currDate;
    if (newSelector === 0) {
      currDate = moment().format('YYYY-MM-DD');
    } else if (newSelector === 1) {
      currDate = moment().startOf('week').format('YYYY-MM-DD');
    } else if (newSelector === 2) {
      currDate = moment().startOf('month').format('YYYY-MM-DD');
    } else if (newSelector === 3) {
      currDate = moment().startOf('year').format('YYYY-MM-DD');
    }
    this.getChartData(newSelector, currDate).then(
      (data) => {
        this.setState({
          selectorActive: newSelector,
          chosenDate: currDate,
          disabled: false,
          data: formChartData(data.data.history, newSelector, currDate),
          options: formChartOptions(data.maxCount, newSelector)
        });
      },
      (error) => {
        console.log(error);
        this.setState({disabled: false});
      });
  };

  getChartData = (selector, date) => {
    const period = this.getStringPeriodFromNumber(selector);
    const params = {
      'period': period,
      'date-from': moment(date).utc().format('YYYY-MM-DD')
    };
    return this.apiClient.get('history/classroom/' + this.props.classroomId, params);
  };

  getStringPeriodFromNumber(selector) {
    switch (selector) {
      case 0 :
        return 'day';
      case 1 :
        return 'week';
      case 2 :
        return 'month';
      case 3 :
        return 'year';
    }
  }

  generateDateSelector = () => {
    const currInputDate = this.state.chosenDate;
    let maxInputDate = moment().format('YYYY-MM-DD');
    const theme = createMuiTheme({
      palette: {
        primary: blue
      }
    });
    if (this.state.selectorActive === 0) {
      return (
        <div className="date-selector">
          <div className="calendar-management-block">
            <div className="arrow" onClick={this.toggleDateLeft}>
              <IconButton>
                <Icon className="material-icons">
                  keyboard_arrow_left
                </Icon>
              </IconButton>
            </div>
            <div className="calendar-toggle" onClick={this.openDatePicker}>
              <Button color="primary">
                { moment(currInputDate).format('MMMM Do')}
              </Button>
            </div>
            <div className="arrow" onClick={this.toggleDateRight}>
              <IconButton>
                <Icon className="material-icons">
                  keyboard_arrow_right
                </Icon>
              </IconButton>
            </div>
          </div>
          <div style={{'display': 'none'}}>
            <MuiThemeProvider theme={theme}>
              <MuiPickersUtilsProvider utils={MomentUtils} moment={moment}>
                <DatePicker
                  label="Choose date"
                  value={currInputDate}
                  maxDate={maxInputDate}
                  onChange={this.changeStartDate}
                  animateYearScrolling={false}
                  disabled={this.state.disabled}
                  pickerRef={(node) => {
                    this.picker = node;
                  }}
                  okLabel="Select day"
                />
              </MuiPickersUtilsProvider>
            </MuiThemeProvider>
          </div>
        </div>
      )
    } else {
      let endDate;
      let okLabel;
      if (this.state.selectorActive === 1) {
        endDate = moment(this.state.chosenDate).add('weeks', 1).add('days', -1).format('MMMM Do');
        maxInputDate = moment().startOf('week');
        okLabel = "Select week";
      } else if (this.state.selectorActive === 2) {
        endDate = moment(this.state.chosenDate).add('months', 1).add('days', -1).format('MMMM Do');
        maxInputDate = moment().startOf('month');
        okLabel = "Select month";
      } else if (this.state.selectorActive === 3) {
        endDate = moment(this.state.chosenDate).add('years', 1).add('days', -1).format('MMMM Do');
        maxInputDate = moment().startOf('year');
        okLabel = "Select year";
      }

      return (
        <div className="date-selector">
          <div className="calendar-management-block">
            <div className="arrow" onClick={this.toggleDateLeft}>
              <IconButton>
                <Icon className="material-icons">
                  keyboard_arrow_left
                </Icon>
              </IconButton>
            </div>
            <div className="calendar-toggle" onClick={this.openDatePicker}>
              <Button color="primary">
                { moment(currInputDate).format('MMMM Do')} ~ {endDate}
              </Button>
            </div>
            <div className="arrow" onClick={this.toggleDateRight}>
              <IconButton>
                <Icon className="material-icons">
                  keyboard_arrow_right
                </Icon>
              </IconButton>
            </div>
          </div>
          <div style={{'display': 'none'}}>
            <MuiThemeProvider theme={theme}>
              <MuiPickersUtilsProvider utils={MomentUtils} moment={moment}>
                <DatePicker
                  label="Choose start date"
                  pickerRef={(node) => {
                    this.picker = node;
                  }}
                  value={this.state.chosenDate}
                  maxDate={maxInputDate}
                  onChange={this.changeStartDate}
                  animateYearScrolling={false}
                  disabled={this.state.disabled}
                  okLabel={okLabel}
                />
              </MuiPickersUtilsProvider>
            </MuiThemeProvider>
          </div>
        </div>
      )
    }
  };

  changeStartDate = (date) => {
    let newDate;
    const selector = this.state.selectorActive;
    if (selector === 0) {
      newDate = date.format('YYYY-MM-DD');
    } else if (selector === 1) {
      newDate = date.startOf('week').format('YYYY-MM-DD');
    } else if (selector === 2) {
      newDate = date.startOf('month').format('YYYY-MM-DD');
    } else if (selector === 3) {
      newDate = date.startOf('year').format('YYYY-MM-DD');
    }
    this.setState({disabled: true});
    this.getChartData(selector, newDate).then(
      (data) => {
        this.setState({
          chosenDate: newDate,
          disabled: false,
          data: formChartData(data.data.history, this.state.selectorActive, newDate),
          options: formChartOptions(data.maxCount, this.state.selectorActive)
        });
      },
      (error) => {
        console.log(error);
        this.setState({
          disabled: false
        });
      })
  };

  openDatePicker = () => {
    this.picker.wrapper.open();
  };

  toggleDateLeft = () => {
    if (this.state.disabled) {
      return;
    }
    let date;
    const selector = this.state.selectorActive;
    if (selector === 0) {
      date = moment(this.state.chosenDate).add('days', -1);
    } else if (selector === 1) {
      date = moment(this.state.chosenDate).add('weeks', -1);
    } else if (selector === 2) {
      date = moment(this.state.chosenDate).add('months', -1);
    } else if (selector === 3) {
      date = moment(this.state.chosenDate).add('years', -1);
    }
    this.changeStartDate(date);
  };

  toggleDateRight = () => {
    if (this.state.disabled) {
      return;
    }
    let date;
    const selector = this.state.selectorActive;
    if (selector === 0) {
      date = moment(this.state.chosenDate).add('days', 1);
    } else if (selector === 1) {
      date = moment(this.state.chosenDate).add('weeks', 1).startOf('week');
    } else if (selector === 2) {
      date = moment(this.state.chosenDate).add('months', 1).startOf('month');
    } else if (selector === 3) {
      date = moment(this.state.chosenDate).add('years', 1).startOf('years');
    }
    this.changeStartDate(date);
  };

  handleResetDate = () => {
    if (this.state.disabled === true) {
      return;
    }
    this.setState({disabled: true});
    const newSelector = 0;
    const currDate = moment().format('YYYY-MM-DD');
    this.getChartData(newSelector, currDate).then(
      (data) => {
        this.setState({
          selectorActive: newSelector,
          chosenDate: currDate,
          disabled: false,
          data: formChartData(data.data.history, newSelector, currDate),
          options: formChartOptions(data.maxCount, newSelector)
        });
      },
      (error) => {
        console.log(error);
        this.setState({disabled: false});
      });
  }
}

export default LineChart;
