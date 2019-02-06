import React, {Component} from 'react';
import {Pie} from "react-chartjs-2";
import {CircularProgress} from '@material-ui/core';
import {translate} from 'react-i18next';

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
    const { t, loading, data } = this.props;    

    const averageGrade  =  data.averageGrade || 0;
    const completed     = data.completed || 0;
    const inProgress    = data.inProgress || 0;
    const notStarted    = data.notStarted || 0;   
    
    const progress = [
      {color: "#79c942", label: t('complete'), value: completed},
      {color: "#ff931e", label: t('inProgress'), value: inProgress},
      {color: "#dee6e9", label: t('notStarted'), value: notStarted}
    ];
    

    const progressChartData = {
      datasets: [{
        data: [+completed, +inProgress, +notStarted],
        backgroundColor: ['#79c942', '#ff931e', '#dee6e9']
      }],
      labels: [t('complete'), t('inProgress'), t('notStarted')]
    };

    const performance = [
      {color: "#79c942", label: t('correct'), value: averageGrade},
      {color: "#fe1d25", label: t('incorrect'), value: 100 - Math.round(averageGrade)}
    ];

    const performanceChartData = {
      datasets: [{
        data: [+averageGrade, 100 - Math.round(averageGrade)],
        backgroundColor: ['#79c942', '#fe1d25']
      }],
      labels: [t('correct'), t('incorrect')]
    };

    return (
      <div className="small-card-content">
        <div className="small-card">
          {loading && <div className="text-center col-md-12"><CircularProgress color="primary"/></div>}
          {!loading && data && <div className="row">
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
        </div>
        <div className="small-card">
          {loading && <div className="text-center col-md-12"><CircularProgress color="primary"/></div>}
          {!loading && data && <div className="row">
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
        </div>
      </div>
    );
  }
}

export default translate('translations')(SchoolAverageChart);
