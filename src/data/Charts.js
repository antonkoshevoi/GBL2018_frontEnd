
const _randomScalingFactor = function(){ return Math.round(Math.random()*40)};


export default {
    data:{
        labels: ["0", "1", "2", "3", "4", "5", "6","7"],
        datasets: [{
            label: "My First dataset",
            fillColor : "#ee2b2e78",
            pointRadius: 0,
            strokeColor : "rgba(220,220,220,1)",
            pointColor : "rgba(220,220,220,1)",
            pointStrokeColor : "#ff1312",
            pointHighlightFill : "#35b3ff",
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
        {color: "#34bfa3", label: "complete", value: 20},
        {color: "#ffb822", label: "in progress", value: 25},
        {color: "#b4beea", label: "not started", value: 55}
    ],
    pieDataPerformance:[
        {color: "#34bfa3", label: "correct", value: 80},
        {color: "#c06", label: "incorrect", value: 20},
    ]
}