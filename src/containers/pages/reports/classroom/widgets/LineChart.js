import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {formChartData, formChartOptions} from '../../../../../data/Charts';
import CardChart from '../../../../../components/ui/CardChart';
import {Line} from 'react-chartjs-2';
import ApiClient from '../../../../../services/ApiClient';
import {DatePicker} from 'material-ui-pickers';
import blue from '@material-ui/core/es/colors/blue';
import moment from 'moment';
import classNames from 'classnames';
import {IconButton, withStyles, Button, Icon, createMuiTheme, MuiThemeProvider} from '@material-ui/core';
import {translate} from 'react-i18next';

class LineChart extends Component {
  apiClient = new ApiClient();
  clientTimeOffset = moment().utcOffset();
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
      disabled: false,
      maxInputDate: moment().format('YYYY-MM-DD'),
      originalStateTimerId: ''
    }
  }

  componentDidMount() {
    const selector = this.state.selectorActive;
    const date = this.state.chosenDate;
    this.returnChartToOriginalState();
    this.getChartData(selector, date);
  }

  render() {
    const { t }  = this.props;
    return (
      <CardChart title={t('studentsOnline')} resetButtonHandle={this.handleResetDate} resetButtonLabel={t('reset')}>
        <div className="date-group-selector">
          <div className={`date-group` + (this.state.selectorActive === 0 ? ' date-selector-active' : '')}
               onClick={() => {
                 this.changeDateGroup(0)
               }}>{t('oneDay')}
          </div>
          <div className={`date-group` + (this.state.selectorActive === 1 ? ' date-selector-active' : '')}
               onClick={() => {
                 this.changeDateGroup(1)
               }}>{t('oneWeek')}
          </div>
          <div className={`date-group` + (this.state.selectorActive === 2 ? ' date-selector-active' : '')}
               onClick={() => {
                 this.changeDateGroup(2)
               }}>{t('oneMonth')}
          </div>
          <div className={`date-group` + (this.state.selectorActive === 3 ? ' date-selector-active' : '')}
               onClick={() => {
                 this.changeDateGroup(3)
               }}>{t('oneYear')}
          </div>
        </div>
        {this.generateDateSelector()}
        {this.state.data && this.state.data.datasets &&
        <Line data={this.state.data} options={this.state.options} width={500} height={300}/>}
      </CardChart>
    );
  }

  componentWillUnmount() {
    if (this.state.originalStateTimerId) {
      clearTimeout(this.state.originalStateTimerId);
    }
  }

  returnChartToOriginalState() {
    if (this.state.originalStateTimerId) {
      clearTimeout(this.state.originalStateTimerId);
      this.setState({originalStateTimerId: ''});
    }
    const newTimerId = setTimeout(() => {
      this.getChartData(0, moment().format('YYYY-MM-DD'));
      if (this.state.originalStateTimerId) {
        this.setState({originalStateTimerId: ''});
      }
      this.returnChartToOriginalState()
    }, 60000);
    this.setState({originalStateTimerId: newTimerId});
  }

  changeDateGroup = (newSelector) => {
    this.returnChartToOriginalState();
    if (this.state.disabled === true) {
      return;
    }
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
    this.getChartData(newSelector, currDate);
  };

  getChartData = (selector, date) => {
    const period = this.getStringPeriodFromNumber(selector);
    const params = {
      'period': period,
      'date-from': date,
      'offset': this.clientTimeOffset
    };
    this.setState({disabled: true});

    Promise.all([this.apiClient.get('history/classroom/' + this.props.classroomId, params),
      this.apiClient.get('classrooms/online-students/' + this.props.classroomId)]).then(
      (response) => {
        this.setState({
          selectorActive: selector,
          chosenDate: date,
          disabled: false,
          data: formChartData(response[0].data.history, selector, date, response[1].data.online),
          options: formChartOptions(response[0].data.maxCount, selector)
        });
      },
      (error) => {
        console.log(error);
        this.setState({disabled: false});
      });
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
    const { t }  = this.props;
    const currInputDate = this.state.chosenDate;
    const theme = createMuiTheme({
      palette: {
        primary: blue
      }
    });
    let maxInputDate;
    if (this.state.selectorActive === 0) {
      maxInputDate = moment().format('YYYY-MM-DD');
      this.state.maxInputDate = maxInputDate; // it has to be done like this, not with this.setState()!
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
                <DatePicker
                  label={t('chooseDate')}
                  value={currInputDate}
                  maxDate={maxInputDate}
                  onChange={this.changeStartDate}
                  animateYearScrolling={false}
                  disabled={this.state.disabled}
                  ref={(node) => {
                    this.picker = node;
                  }}
                  okLabel={t('selectDay')}
                />              
            </MuiThemeProvider>
          </div>
        </div>
      )
    } else {
      let endDate;
      let okLabel;
      if (this.state.selectorActive === 1) {
        endDate = moment(this.state.chosenDate).add('weeks', 1).add('days', -1).format('MMMM Do');
        maxInputDate = moment().endOf('week').format('YYYY-MM-DD');
        okLabel = t('selectWeek');
      } else if (this.state.selectorActive === 2) {
        endDate = moment(this.state.chosenDate).add('months', 1).add('days', -1).format('MMMM Do');
        maxInputDate = moment().endOf('month').format('YYYY-MM-DD');
        okLabel = t('selectMonth');
      } else if (this.state.selectorActive === 3) {
        endDate = moment(this.state.chosenDate).add('years', 1).add('days', -1).format('MMMM Do');
        maxInputDate = moment().endOf('year').format('YYYY-MM-DD');
        okLabel = t('selectYear');
      }
      this.state.maxInputDate = maxInputDate;
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
                <DatePicker
                  label={t('chooseStartDate')}
                  ref={(node) => {
                    this.picker = node;
                  }}
                  value={this.state.chosenDate}
                  maxDate={maxInputDate}
                  onChange={this.changeStartDate}
                  animateYearScrolling={false}
                  disabled={this.state.disabled}
                  renderDay={this.renderWrappedDay}
                  okLabel={okLabel}
                />              
            </MuiThemeProvider>
          </div>
        </div>
      )
    }
  };

  changeStartDate = (date) => {
    let newDate;
    const selector = this.state.selectorActive;
    this.returnChartToOriginalState();
    if (selector === 0) {
      newDate = date.format('YYYY-MM-DD');
    } else if (selector === 1) {
      newDate = date.startOf('week').format('YYYY-MM-DD');
    } else if (selector === 2) {
      newDate = date.startOf('month').format('YYYY-MM-DD');
    } else if (selector === 3) {
      newDate = date.startOf('year').format('YYYY-MM-DD');
    }
    this.getChartData(selector, newDate);
  };

  openDatePicker = () => {
    this.picker.open();
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
    const newSelector = 0;
    const currDate = moment().format('YYYY-MM-DD');
    this.getChartData(newSelector, currDate);
  };

  renderWrappedDay = (date, selectedDate, dayInCurrentMonth) => {
    const selector = this.state.selectorActive;
    const {classes} = this.props;
    let period;
    if (selector === 1) {
      period = 'week';
    } else if (selector === 2) {
      period = 'month';
    } else if (selector === 3) {
      period = 'year';
    }
    const start = moment(selectedDate).startOf(period);
    const end = moment(selectedDate).endOf(period);
    const dayIsBetween = date.isBetween(moment(start).add('day', -1), end);
    const isFirstDay = start.isSame(date, 'day');
    const isLastDay = end.isSame(date, 'day');
    const isDisabled = moment(this.state.maxInputDate).isBefore(date, 'day');

    const wrapperClassName = classNames({
      [classes.highlight]: dayIsBetween,
      [classes.firstHighlight]: isFirstDay,
      [classes.endHighlight]: isLastDay
    });

    const dayClassName = classNames(classes.day, {
      [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
      [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && dayIsBetween,
      [classes.disabled]: isDisabled
    });

    return (
      <div className={wrapperClassName}>
        <IconButton className={dayClassName}>
          <span> { date.format('D')} </span>
        </IconButton>
      </div>
    );
  }
}

const styles = theme => ({
  dayWrapper: {
    position: 'relative'
  },
  day: {
    width: 36,
    height: 36,
    fontSize: theme.typography.caption.fontSize,
    margin: '0 2px',
    color: 'inherit'
  },
  customDayHighlight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '2px',
    right: '2px',
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: '50%'
  },
  nonCurrentMonthDay: {
    color: theme.palette.text.disabled
  },
  highlightNonCurrentMonthDay: {
    color: '#676767'
  },
  highlight: {
    background: '#2196f3',
    color: theme.palette.common.white
  },
  firstHighlight: {
    extend: 'highlight',
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%'
  },
  endHighlight: {
    extend: 'highlight',
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%'
  },
  disabled: {
    color: 'rgba(0, 0, 0, 0.38)'
  }
});

export default withStyles(styles)(translate('translations')(LineChart));