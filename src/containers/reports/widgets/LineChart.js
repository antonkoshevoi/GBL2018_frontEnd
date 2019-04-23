import React, {Component} from 'react';
import {formChartOptions, formChartData} from '../../../data/Charts';
import {Line} from 'react-chartjs-2';
import ApiClient from '../../../services/ApiClient';
import MuiDatePicker from '../../../components/ui/MuiDatePicker';
import {translate} from "react-i18next";
import moment from 'moment';
import classNames from 'classnames';
import {Icon, Button, IconButton, withStyles} from '@material-ui/core';

class LineChart extends Component {
  apiClient = new ApiClient();
  clientTimeOffset = moment().utcOffset();
  picker;

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
    const {t} = this.props;
    return (
      <div className="d-flex flex-column m-portlet m-portlet--head-solid-bg mb-0 h-100">
        <div className="m-portlet__head border-b-blue">
          <div className="m-portlet__head-caption">
            <div className="m-portlet__head-title online-users-chart-header">
              <span className="m-portlet__head-icon"><i className="fa fa-line-chart display-6 square-background circle-background"></i></span>              
              <h3 className="m-portlet__head-text">
                {t('studentsOnline')}
              </h3>
              <div className="m-portlet__head-text">
                <button type="button" className="btn btn-info btn-sm" onClick={this.handleResetDate}>
                  {t('reset')}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-0 h-100 m-portlet__body position-relative">            
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
        </div>
      </div>
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
      this.returnChartToOriginalState();
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
    const params = {
      'period': this.getStringPeriodFromNumber(selector),
      'date': date,
      'offset': this.clientTimeOffset
    };
            
    let historyUrl = 'history/school';    
            
    if (this.props.type === 'classroom') {
        historyUrl  = 'history/classroom/' + this.props.id;
    }
    
    if (this.props.type === 'homeroom') {
        // TODO send request to homeroom instead of school
    }     
    
    this.setState({disabled: true});
    
    Promise.all([this.apiClient.get(historyUrl, params)]).then((response) => {                
        this.setState({
          selectorActive: selector,
          chosenDate: date,
          disabled: false,
          data: formChartData(response[0].data.history, selector, date),
          options: formChartOptions(response[0].data.maxCount, selector)
        });
      },
      (error) => {        
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
      default:
        return 'day';
    }
  }

  generateDateSelector() {
    const currInputDate = this.state.chosenDate;
    const {t} = this.props;
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
                <MuiDatePicker
                  label={t('chooseDate')}
                  value={currInputDate}
                  maxDate={maxInputDate}
                  onChange={(date) => { this.changeStartDate(moment(date)) }}
                  animateYearScrolling={false}
                  disabled={this.state.disabled}
                  ref={(node) => {
                    this.picker = node;
                  }}
                  okLabel={t('selectDay')}
                />                         
          </div>
        </div>
      )
    } else {
      let endDate;
      let okLabel;
      if (this.state.selectorActive === 1) {
        endDate = moment(this.state.chosenDate).add(1, 'weeks').add('days', -1).format('MMMM Do');
        maxInputDate = moment().endOf('week').format('YYYY-MM-DD');
        okLabel = t('selectWeek');
      } else if (this.state.selectorActive === 2) {
        endDate = moment(this.state.chosenDate).add(1, 'months').add('days', -1).format('MMMM Do');
        maxInputDate = moment().endOf('month').format('YYYY-MM-DD');
        okLabel = t('selectMonth');
      } else if (this.state.selectorActive === 3) {
        endDate = moment(this.state.chosenDate).add(1, 'years').add('days', -1).format('MMMM Do');
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
                <MuiDatePicker
                  label={t('chooseStartDate')}
                  ref={(node) => { this.picker = node; }}
                  value={this.state.chosenDate}
                  maxDate={maxInputDate}
                  onChange={(date) => { this.changeStartDate(moment(date)) }}
                  animateYearScrolling={false}
                  disabled={this.state.disabled}
                  renderDay={this.renderWrappedDay}
                  okLabel={okLabel}
                />                          
          </div>
        </div>
      )
    }
  }

  changeStartDate(date) {
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
  }

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
      date = moment(this.state.chosenDate).add(-1, 'days');
    } else if (selector === 1) {
      date = moment(this.state.chosenDate).add(-1, 'weeks');
    } else if (selector === 2) {
      date = moment(this.state.chosenDate).add(-1, 'months');
    } else if (selector === 3) {
      date = moment(this.state.chosenDate).add(-1, 'years');
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
      date = moment(this.state.chosenDate).add(1, 'days');
    } else if (selector === 1) {
      date = moment(this.state.chosenDate).add(1, 'weeks').startOf('week');
    } else if (selector === 2) {
      date = moment(this.state.chosenDate).add(1, 'months').startOf('month');
    } else if (selector === 3) {
      date = moment(this.state.chosenDate).add(1, 'years').startOf('years');
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
