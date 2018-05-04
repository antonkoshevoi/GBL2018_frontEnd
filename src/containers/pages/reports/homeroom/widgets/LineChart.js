import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ChartData, formChartData} from '../../../../../data/Charts';
import Card from "../../../../../components/ui/Card";
import { Line } from "react-chartjs";
import ApiClient from '../../../../../services/ApiClient';


class LineChart extends Component {
  apiClient = new ApiClient();

  static propTypes = {
    homeroomId: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      options: ChartData.options,
      selectorActive: 0,
      chosenDate: new Date(),
      disabled: false
    }
  }

  componentDidMount() {
    this.setState({disabled: true});
    const selector = this.state.selectorActive;
    const date = this.state.chosenDate;
    this.getChartData(selector, date).then(
      (data) => {
        const labels = Object.keys(data.data);
        const values = Object.values(data.data);
        this.setState({disabled: false, data: formChartData(labels, values, selector)});
      },
      (error) => {
        console.log(error);
        this.setState({disabled: false});
      });
  }

  render() {
    return (
      <Card title="Students Online" isChart={true} icon="flaticon-diagram" iconBackground="square-background"
      >
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
        {this.state.data && this.state.data.datasets && <Line data={this.state.data} options={this.state.options} redraw width="500" height="350"/>}
      </Card>
    );
  }

  changeDateGroup = (newSelector) => {
    if (this.state.disabled === true) {
      return;
    }
    this.setState({disabled: true});
    this.getChartData(newSelector, this.state.chosenDate).then(
      (data) => {
        const labels = Object.keys(data.data);
        const values = Object.values(data.data);
        this.setState({selectorActive: newSelector, disabled: false, data: formChartData(labels, values, newSelector)});
      },
      (error) => {
        console.log(error);
        this.setState({disabled: false});
      });
  };

  getChartData = (selector, date) => {
    const dateFrom = date.toJSON().slice(0, 10);
    const period = this.getStringPeriodFromNumber(selector);
    const params = {
      'period': period,
      'date-from': dateFrom
    };
    // TODO send request to homeroom instead of school
    return this.apiClient.get('history/school', params)
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

  generateDateSelector() {
    const currInputDate = this.state.chosenDate.toJSON().slice(0, 10);
    if (this.state.selectorActive === 0) {
      return (
        <div className="date-selector">
          <span>Choose date</span>
          <input type="date" disabled={this.state.disabled} onChange={this.changeStartDate} value={currInputDate}/>
        </div>
      )
    } else {
      let endDate;
      const oneDay = 86400000;
      const sevenDays = oneDay * 7;
      const month = oneDay * 30;
      const year = month * 12 + oneDay * 6; // 'oneDay * 6' because we count month as 30 days instead of 30/31
      if (this.state.selectorActive === 1) {
        endDate = new Date(this.state.chosenDate.getTime() + sevenDays);
      } else if (this.state.selectorActive === 2) {
        endDate = new Date(this.state.chosenDate.getTime() + month);
      } else if (this.state.selectorActive === 3) {
        endDate = new Date(this.state.chosenDate.getTime() + year);
      }
      const currDate = new Date();
      if (endDate > currDate) {
        endDate = currDate;
      }

      return (
        <div className="date-selector">
          <span>Start date</span>
          <input type="date" disabled={this.state.disabled} onChange={this.changeStartDate} value={currInputDate}/>
          <span>End date: {endDate.toJSON().slice(0, 10)}</span>
        </div>
      )
    }
  }

  changeStartDate = (event) => {
    this.setState({chosenDate: new Date(event.target.value), disabled: true});
    const newDate = new Date(event.target.value);
    this.getChartData(this.state.selectorActive, newDate).then(
      (data) => {
        const labels = Object.keys(data.data);
        const values = Object.values(data.data);
        this.setState({
          chosenDate: newDate,
          disabled: false,
          data: formChartData(labels, values, this.state.selectorActive)
        });
      },
      (error) => {
        console.log(error);
        this.setState({disabled: false, chosenDate: this.state.chosenDate});
      })
  }
}

export default LineChart;
