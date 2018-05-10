import moment from 'moment';

const _randomScalingFactor = function () {
  return Math.round(Math.random() * 40)
};

export function formChartData(history, selector, startDate) {
  const data = generateChartTemplate(selector, startDate);
  generateChartDataFromTemplate(data, history, selector);
  const colors = generateColors(selector, startDate);
  return {
    labels: data.labels,
    datasets: [{
      borderColor: '#8CC9E8',
      backgroundColor: 'transparent',
      pointBackgroundColor: colors,
      pointBorderColor: colors,
      pointRadius: 2,
      borderWidth: 2,
      data: data.values
    }]
  }

}

export function formChartOptions(maxStudents, selector) {
  return {
    responsive: true,
    legend: {
      display: false
    },
    tooltips: {
      displayColors: false,
      backgroundColor: '#ffffff',
      bodyFontColor: '#000000',
      mode: 'nearest',
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          const label = data.labels[tooltipItem.index];
          const value = tooltipItem.yLabel;
          if ((selector === 0) && ((label && label.length === 2) || (typeof label === 'number'))) {
            let numberLabel = +label;
            let timeType = '';
            if (numberLabel < 12) {
              timeType = 'AM';
            } else {
              timeType = 'PM';
              numberLabel = numberLabel - 12;
            }
            return value + ' ' + numberLabel + ':00' + timeType;
          } else if (selector === 1 || selector === 2) {
            return value + ' ' + label;
          } else if (selector === 3) {
            return value + ' ' + moment('' + label, 'MM').format('MMMM');
          }
        },
        title: function () {

        }
      }
    },
    title: {
      display: false
    },

    scales: {
      yAxes: [{
        display: true,
        ticks: {
          suggestedMin: 0,
          suggestedMax: maxStudents,
          beginAtZero: true,
          callback: function (value) {
            if (value % 1 === 0) {
              return value;
            }
          }
        }
      }],
      xAxes: [{
        display: true,
        ticks: {
          autoSkip: false,
          callback: function (value) {
            return renderXAxis(selector, value);
          }
        }
      }]
    }
  };

  function renderXAxis(selector, value) {
    if (selector === 0) {
      switch (value) {
        case 0 :
          return value;
        case 3 :
          return value;
        case 6 :
          return value;
        case 9 :
          return value;
        case 12 :
          return value;
        case 15 :
          return value;
        case 18 :
          return value;
        case 21 :
          return value;
        default:
          return;
      }
    } else if (selector === 1) {
      return value.slice(-5);
    } else if (selector === 2) {
      const daysInMonth = moment(value).daysInMonth();
      const day = moment(value).date();
      switch (day) {
        case 1 :
          return value.slice(-5);
        case 7 :
          return value.slice(-5);
        case 14 :
          return value.slice(-5);
        case 21 :
          return value.slice(-5);
        case daysInMonth :
          return value.slice(-5);
        default:
          return;
      }
    } else if (selector === 3) {
      if (+value % 2 === 0) {
        return value;
      }
    }
  }
}

export function generateColors(selector, startDate) {
  const currDate = moment();
  const colors = [];
  if (selector === 0) {
    const isSameDay = currDate.isSame(startDate, 'day');
    const currHours = +currDate.format('HH');
    for (let i = 0; i < 24; i++) {
      if (i + 1 < currHours || !isSameDay) {
        colors.push('#8CC9E8');
      } else if (i + 1 === currHours) {
        colors.push('rgb(121, 201, 66)');
      } else {
        colors.push('transparent');
      }
    }
  } else if (selector === 1) {
    const isSameWeek = currDate.isSame(startDate, 'week');
    const currDay = currDate.day();
    for (let i = 0; i < 7; i++) {
      if (i < currDay || !isSameWeek) {
        colors.push('#8CC9E8');
      } else if (i === currDay) {
        colors.push('rgb(121, 201, 66)');
      } else {
        colors.push('transparent');
      }
    }
  } else if (selector === 2) {
    const isSameMonth = currDate.isSame(startDate, 'month');
    const currDay = currDate.date();
    const daysInMonth = moment(startDate).daysInMonth();

    for (let i = 0; i < daysInMonth; i++) {
      if (i < currDay || !isSameMonth) {
        colors.push('#8CC9E8');
      } else if (i === currDay) {
        colors.push('rgb(121, 201, 66)');
      } else {
        colors.push('transparent');
      }
    }
  } else if (selector === 3) {
    const isSameYear = currDate.isSame(startDate, 'year');
    const currMonth = currDate.month();

    for (let i = 0; i < 12; i++) {
      if (i < currMonth || !isSameYear) {
        colors.push('#8CC9E8');
      } else if (i === currMonth) {
        colors.push('rgb(121, 201, 66)');
      } else {
        colors.push('transparent');
      }
    }
  }
  return colors;

}

export function generateChartDataFromTemplate(template, history, selector) {
  Object.keys(history).forEach((key) => {
    if (selector === 0) {
      const newKey = +key.slice(-5, -3);
      const index = template.labels.indexOf(newKey);
      template.values[index] = history[key];
    } else if (selector === 1 || selector === 2) {
      const newKey = key.slice(-10);
      console.log(newKey);
      const index = template.labels.indexOf(newKey);
      template.values[index] = history[key];
    }
    if (selector === 3) {
      const newKey = +key.slice(-2);
      const index = template.labels.indexOf(newKey);
      template.values[index] = history[key];
    }
  });

}

export function generateChartTemplate(selector, startDate) {
  if (selector === 0) {
    return {
      labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
      values: fillZeroValues(24)
    };
  } else if (selector === 1) {
    return {
      labels: fillDates(startDate, 7, 'YYYY-MM-DD'),
      values: fillZeroValues(7)
    };
  } else if (selector === 2) {
    const daysInMonth = moment(startDate).daysInMonth();
    return {
      labels: fillDates(startDate, daysInMonth, 'YYYY-MM-DD'),
      values: fillZeroValues(daysInMonth)
    };
  } else if (selector === 3) {
    return {
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      values: fillZeroValues(12)
    };
  }

  function fillDates(startDate, number, format) {
    const arr = [];
    for (let i = 0; i < number; i++) {
      arr.push(moment(startDate).add('days', i).format(format));
    }
    return arr;
  }

  function fillZeroValues(number) {
    const arr = [];
    for (let i = 0; i < number; i++) {
      arr.push(0);
    }
    return arr;
  }
}

export const ChartData = {
  data: {
    labels: ['0', '1', '2', '3', '4', '5', '6', '7'],
    datasets: [{
      label: 'My First dataset',
      fillColor: 'rgba(220,220,220,0.0)',
      pointRadius: 0,
      strokeColor: '#8CC9E8',
      pointColor: '#8CC9E8',
      pointStrokeColor: 'rgba(220,220,220,0.0)',
      pointHighlightFill: '#8CC9E8',
      pointHighlightStroke: 'rgba(220,220,220,1)',
      data: [
        _randomScalingFactor(),
        _randomScalingFactor(),
        _randomScalingFactor(),
        _randomScalingFactor(),
        _randomScalingFactor(),
        _randomScalingFactor(),
        _randomScalingFactor(),
        _randomScalingFactor()

      ],
      yAxisID: 'y-axis-1'
    }]
  },
  options: {
    responsive: true,
    legend: {
      display: false
    },
    tooltips: {
      displayColors: false,
      backgroundColor: '#ffffff',
      bodyFontColor: '#000000',
      callbacks: {
        label: function (tooltipItem) {
          const label = tooltipItem.xLabel;
          const value = tooltipItem.yLabel;
          if (label && label.length === 2) {
            let numberLabel = +label;
            let timeType = '';
            if (numberLabel < 12) {
              timeType = 'AM';
            } else {
              timeType = 'PM';
              numberLabel = numberLabel - 12;
            }
            return value + ' ' + numberLabel + ':00' + timeType;
          } else {
            return value + ' ' + label;
          }
        },
        title: function () {

        }
      }
    },
    title: {
      display: false
    },

    scales: {
      yAxes: [{
        display: true,
        ticks: {
          suggestedMin: 0,
          suggestedMax: 10,
          beginAtZero: true,
          callback: function (value) {
            if (value % 1 === 0) {
              return value;
            }
          }
        }
      }]
    }
    // scales: {
    //   yAxes: [{
    //     type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
    //     display: false,
    //     position: 'left',
    //     id: 'y-axis-1',
    //     gridLines: {
    //       display: false
    //     }
    //   }, {
    //     type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
    //     display: false,
    //     position: 'right',
    //     id: 'y-axis-2',
    //     // grid line settings
    //     gridLines: {
    //       display: false // only want the grid lines for one axis to show up
    //     }
    //   }],
    //   xAxes: [{
    //     type: 'time',
    //     ticks: {
    //       autoSkip: true,
    //       maxTicksLimit: 8
    //     }
    //   }]
    // }
  },
  pieConfig: {
    //String - The colour of each segment stroke
    segmentStrokeColor: '#FFF',

    //Number - The width of each segment stroke
    segmentStrokeWidth: 1,

    //Number - Amount of animation steps
    animationSteps: 10,

    //String - Animation easing effect
    animationEasing: 'easeOutBounce',

    //Boolean - Whether we animate the rotation of the Doughnut
    animateRotate: true,

    //Boolean - Whether we animate scaling the Doughnut from the centre
    animateScale: true,

    fullWidth: true,

    responsive: true,

    showInLegend: true,

    maintainAspectRatio: true,

    legendTemplate: '<ul style=" display: inline;" className="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li style="float: left; clear: both; list-style: none;"><div className="indicator_box" style="background-color:<%=segments[i].fillColor%>; padding: 5px ; margin: 8px 10px 5px 10px; display: block; float: left; "></div><span style="font-size: 1.250em; word-wrap: break-word;"><%if(segments[i].label){%><%=segments[i].label%><%}%></span></li><%}%></ul>',

    legend: {
      display: true
    }
  },
  pieDataProgress: [
    {color: '#79c942', label: 'complete', value: 20},
    {color: '#ff931e', label: 'in progress', value: 25},
    {color: '#dee6e9', label: 'not started', value: 55}
  ],
  pieDataPerformance: [
    {color: '#79c942', label: 'correct', value: 80},
    {color: '#fe1d25', label: 'incorrect', value: 20}
  ]
}