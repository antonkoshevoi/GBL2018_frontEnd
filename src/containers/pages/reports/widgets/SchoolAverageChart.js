import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Pie} from "react-chartjs-2";
import {connect} from "react-redux";
import {getCharts} from "../../../../redux/reports/dashboard/actions";
import {selectChartDatatRequest} from "../../../../redux/reports/dashboard/selectors";
import {CircularProgress} from "material-ui";

class SchoolAverageChart extends Component {

  options = {
    responsive: true,
    hoverMode: 'index',
    stacked: true,
    display: false,
    legend: {
      display: false
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem) {
          return tooltipItem.yLabel;
        }
      }
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart - Multi Axis'
    },
    scales: {
      yAxes: [{
        type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
        display: false,
        position: "left",
        id: "y-axis-1",
        gridLines: {
          display: false
        }
      }, {
        type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
        display: false,
        position: "right",
        id: "y-axis-2",
        // grid line settings
        gridLines: {
          display: false, // only want the grid lines for one axis to show up
        },
      }],
    }
  }

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    const {getCharts} = this.props;
    getCharts();
  }

  _renderPieChartLabels(labels) {
    return labels.map(function (item, i) {
      return (
        <div key={i} className="m-stack__item m--margin-bottom-5 m-stack__item--center m-stack__item--middle">
          <span className="m-badge m-badge--success" style={{marginRight: '8px', backgroundColor: item.color}}></span>
          <span>{item.value + '%  '}</span>
          <span style={{whiteSpace: 'pre'}}>{item.label}</span>
        </div>
      )
    })
  }

  render() {
    const getChartDataRequest = this.props.getChartDataRequest.toJS();
    const { data, loading, success, fail } = getChartDataRequest;

    const progress = [
      {color: "#79c942", label: "complete", value: data.completed},
      {color: "#ff931e", label: "in progress", value: data.inProgress},
      {color: "#dee6e9", label: "not started", value: data.notStarted}
    ];

    const progressChartData = {
      datasets: [{
        data: [+data.completed, +data.inProgress, +data.notStarted],
        backgroundColor: ['#79c942', '#ff931e', '#dee6e9']
      }],
      labels: ['complete', 'in progress', 'not started']
    };

    const performance = [
      {color: "#79c942", label: "correct", value: data.averageGrade},
      {color: "#fe1d25", label: "incorrect", value: 100 - parseInt(data.averageGrade)},
    ];

    const performanceChartData = {
      datasets: [{
        data: [+data.averageGrade, 100 - parseInt(data.averageGrade)],
        backgroundColor: ['#79c942', '#fe1d25']
      }],
      labels: ['correct', 'incorrect']
    };

    return (
      <div className="small-card-content">
        <div className="small-card">
          {loading && !success && <div className="text-center col-md-12"><CircularProgress color="primary"/></div>}
          {!loading && success && <div className="row">
            <div className="col-md-5 pie-block school-average-margins">
              <Pie data={performanceChartData} options={this.options} width={100} height={100}/>
            </div>
            <div className="col-md-7  pie-block school-average-margins">
              <div
                className="m-stack m--padding-left-20 d-flex flex-column justify-content-center  m-stack--ver m-stack--table">
                <h5> School Average</h5>
                <legend>Performance</legend>
                {this._renderPieChartLabels(performance)}
              </div>
            </div>
          </div>}
          {fail && <div className="text-center col-md-12"><span style={{color: 'red' }}>Error</span></div>}
        </div>
        <div className="small-card">
          {loading && !success && <div className="text-center col-md-12"><CircularProgress color="primary"/></div>}
          {!loading && success && <div className="row">
            <div className="col-md-5 pie-block school-average-margins">
              <Pie data={progressChartData} options={this.options} width={100} height={100}/>
            </div>
            <div className="col-md-7 pie-block school-average-margins">
              <div
                className="m-stack m--padding-left-20  d-flex flex-column justify-content-center   m-stack--ver m-stack--table">
                <h5> School Average</h5>
                <legend>Progress</legend>
                {this._renderPieChartLabels(progress)}
              </div>
            </div>
          </div>}
          {fail && <div className="text-center col-md-12"><span style={{color: 'red' }}>Error</span></div>}
        </div>
      </div>
    );
  }
}

SchoolAverageChart = connect(
  (state) => ({
    getChartDataRequest: selectChartDatatRequest(state)
  }),
  (dispatch) => ({
    getCharts: (params = {}) => {
      dispatch(getCharts(params))
    },
  })
)(SchoolAverageChart);

export default SchoolAverageChart;
