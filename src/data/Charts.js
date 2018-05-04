
const _randomScalingFactor = function(){ return Math.round(Math.random()*40)};

export function formChartData(labels, data, selector) {
  labels = labels.map((label) => {
      if (selector === 0) {
          label = label.slice(label.length - 5, label.length - 3);
      } else if (selector === 1 || selector === 2) {
        label = label.slice(label.length - 5);
      }

      return label;
  });
  return {
    labels: labels,
    datasets: [{
      label: 'Online chart',
      fillColor: 'rgba(220,220,220,0.0)',
      pointRadius: 1,
      strokeColor: '#8CC9E8',
      pointColor: '#8CC9E8',
      pointStrokeColor: 'rgba(220,220,220,0.0)',
      pointHighlightFill: '#8CC9E8',
      pointHighlightStroke: 'rgba(220,220,220,1)',
      data: data,
      yAxisID: 'y-axis-1'
    }]
  }

}

export const ChartData = {
    data:{
        labels: ["0", "1", "2", "3", "4", "5", "6","7"],
        datasets: [{
            label: "My First dataset",
            fillColor : "rgba(220,220,220,0.0)",
            pointRadius: 0,
            strokeColor : "#8CC9E8",
            pointColor : "#8CC9E8",
            pointStrokeColor : "rgba(220,220,220,0.0)",
            pointHighlightFill : "#8CC9E8",
            pointHighlightStroke : "rgba(220,220,220,1)",
            data: [
                _randomScalingFactor(),
                _randomScalingFactor(),
                _randomScalingFactor(),
                _randomScalingFactor(),
                _randomScalingFactor(),
                _randomScalingFactor(),
                _randomScalingFactor(),
                _randomScalingFactor(),

            ],
            yAxisID: "y-axis-1",
        }]
    },
    options:{
        responsive: true,
        hoverMode: 'index',
        stacked: true,
        display: false,
        legend: {
            display: false
        },
        tooltips: {
            callbacks: {
                label: function(tooltipItem) {
                    return tooltipItem.yLabel;
                }
            }
        },
        title:{
            display: false,
            text:'Chart.js Line Chart - Multi Axis'
        },
        scales: {
            yAxes: [{
                type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                display: false,
                position: "left",
                id: "y-axis-1",
                gridLines: {
                    display:false
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
    },
    pieConfig:{
        //String - The colour of each segment stroke
        segmentStrokeColor: "#FFF",

        //Number - The width of each segment stroke
        segmentStrokeWidth: 1,

        //Number - Amount of animation steps
        animationSteps: 10,

        //String - Animation easing effect
        animationEasing: "easeOutBounce",

        //Boolean - Whether we animate the rotation of the Doughnut
        animateRotate: true,

        //Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale: true,

        fullWidth: true,

        responsive: true,

        showInLegend: true,

        maintainAspectRatio: true,

        legendTemplate: "<ul style=\" display: inline;\" className=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li style=\"float: left; clear: both; list-style: none;\"><div className=\"indicator_box\" style=\"background-color:<%=segments[i].fillColor%>; padding: 5px ; margin: 8px 10px 5px 10px; display: block; float: left; \"></div><span style=\"font-size: 1.250em; word-wrap: break-word;\"><%if(segments[i].label){%><%=segments[i].label%><%}%></span></li><%}%></ul>",

        legend: {
            display: true,
        },
    },
    pieDataProgress:[
        {color: "#79c942", label: "complete", value: 20},
        {color: "#ff931e", label: "in progress", value: 25},
        {color: "#dee6e9", label: "not started", value: 55}
    ],
    pieDataPerformance:[
        {color: "#79c942", label: "correct", value: 80},
        {color: "#fe1d25", label: "incorrect", value: 20},
    ]
}