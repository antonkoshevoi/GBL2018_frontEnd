import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Pie} from "react-chartjs-2";
import {connect} from "react-redux";
import {getCharts} from "../../../../../redux/reports/classroom/actions";
import {selectChartDatatRequest} from "../../../../../redux/reports/classroom/selectors";
import {CircularProgress} from '@material-ui/core';
import {translate} from 'react-i18next';

class SchoolAverageChart extends Component {
  static propTypes = {
    classroomId: PropTypes.string.isRequired
  };

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
    const { getCharts, classroomId } = this.props;
    getCharts(classroomId);
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
    const { t } = this.props;
            
    const progress = [
      {color: "#79c942", label: t('complete'), value: data.completed},
      {color: "#ff931e", label: t('inProgress'), value: data.inProgress},
      {color: "#dee6e9", label: t('notStarted'), value: data.notStarted}
    ];

    const progressChartData = {
      datasets: [{
        data: [+data.completed, +data.inProgress, +data.notStarted],
        backgroundColor: ['#79c942', '#ff931e', '#dee6e9']
      }],
      labels: [t('complete'), t('inProgress'), t('notStarted')]
    };

    const performance = [
      {color: "#79c942", label: t('correct'), value: data.averageGrade},
      {color: "#fe1d25", label: t('incorrect'), value: 100 - parseInt(data.averageGrade)},
    ];

    const performanceChartData = {
      datasets: [{
        data: [+data.averageGrade, 100 - parseInt(data.averageGrade)],
        backgroundColor: ['#79c942', '#fe1d25']
      }],
      labels: [t('correct'), t('incorrect')]
    };

    return (
      <div className="small-card-content">
        <div className="small-card">
          {loading && !success && <div className="text-center col-md-12"><CircularProgress color="primary"/></div>}
          {!loading && success && <div className="row">
            <div className="col-md-5 pie-block">
              <Pie data={performanceChartData} options={this.options} width={100} height={100}/>
            </div>
            <div className="col-md-7  pie-block">
              <div
                className="m-stack m--padding-left-20 d-flex flex-column justify-content-center  m-stack--ver m-stack--table">
                <h5>{t('schoolAverage')}</h5>
                <legend>{t('performance')}</legend>
                {this._renderPieChartLabels(performance)}
              </div>
            </div>
          </div>}
          {fail && <div className="text-center col-md-12"><span style={{color: 'red' }}>{t('error')}</span></div>}
        </div>
        <div className="small-card">
          {loading && !success && <div className="text-center col-md-12"><CircularProgress color="primary"/></div>}
          {!loading && success && <div className="row">
            <div className="col-md-5 pie-block">
              <Pie data={progressChartData} options={this.options} width={100} height={100}/>
            </div>
            <div className="col-md-7 pie-block">
              <div
                className="m-stack m--padding-left-20  d-flex flex-column justify-content-center   m-stack--ver m-stack--table">
                <h5>{t('schoolAverage')}</h5>
                <legend>{t('progress')}</legend>
                {this._renderPieChartLabels(progress)}
              </div>
            </div>
          </div>}
          {fail && <div className="text-center col-md-12"><span style={{color: 'red' }}>{t('error')}</span></div>}
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
    getCharts: (id, params = {}) => {dispatch(getCharts(id, params))},
  })
)(SchoolAverageChart);

export default translate('translations')(SchoolAverageChart);
