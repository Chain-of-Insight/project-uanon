import * as d3 from 'd3';
export default function() {

  const formatSecond = d3.timeFormat("%S");
  const formatMinute = d3.timeFormat("%M");
  const formatHour = d3.timeFormat("%H");

  const GOLD = '#ffbd1b';
  
  let width, 
      height, 
      offSetX, 
      offSetY, 
      pi, 
      scaleSecs, 
      scaleMins,
      scaleHours;
  
  width = 400;
  height = 200;
  offSetX = 150;
  offSetY = 100;
  
  // gets pi accurate to 15 decimal places
  pi = Math.PI;
  
  scaleSecs = d3.scaleLinear().domain([0, 59 + 999/1000]).range([0, 2 * pi]);
  scaleMins = d3.scaleLinear().domain([0, 59 + 59/60]).range([0, 2 * pi]);
  scaleHours = d3.scaleLinear().domain([0, 11 + 59/60]).range([0, 2 * pi]);
  
  // functionally generate svg components
  let vis,
      clockGroup,
      secondArc,
      minuteArc,
      hourArc;
  
  vis = d3.select("svg")
    .attr("width", width)
    .attr("height", height);
  
  clockGroup = vis.append("g")
    .attr("transform", "translate(" + offSetX + "," + offSetY + ")");
  
  clockGroup
    .append("circle")
    .attr("r", 80).attr("fill", "none")
    .attr("class", "clock outercircle")
    .attr("stroke", GOLD)
    .attr("stroke-width", 2);
  
  clockGroup
    .append("circle")
    .attr("r", 4)
    .attr("fill", GOLD)
    .attr("class", "clock innercircle");

  let fields = () => {
    let currentTime, 
        hour, 
        minute, 
        second,
        d;

    currentTime = new Date();
    d = currentTime;
    second = currentTime.getSeconds();
    minute = currentTime.getMinutes();
    hour = currentTime.getHours() + minute / 60;
    
    let data = [
      {
        "unit": "seconds",
        "text": formatSecond(d),
        "value": second
      },
      {
        "unit": "minutes",
        "text": formatMinute(d),
        "value": minute
      },
      {
        "unit": "hours",
        "text": formatHour(d),
        "value": hour
      }
    ];

    return data;
  };
  
  // render hands of clock
  const render = (data) => {
    // always instantiate a fresh instance of clock
    clockGroup
      .selectAll(".clockhand")
      .remove();
  
    // seconds
    secondArc = d3.arc()
      .innerRadius(0)       // rotation pivot point
      .outerRadius(70)      // end point of rotation pivot
      .startAngle(function(d) {
        return scaleSecs(d.value);  // return data object singleton
                                    // at start of pivot
      })
      .endAngle(function(d) {
        return scaleSecs(d.value);  // and again at pivot end
      });
  
    // minutes
    minuteArc = d3.arc()
      .innerRadius(0)
      .outerRadius(70)
      .startAngle(function(d) {
        return scaleMins(d.value);
      })
      .endAngle(function(d) {
        return scaleMins(d.value);
      });
  
    hourArc = d3.arc()
      .innerRadius(0)
      .outerRadius(50)
      .startAngle(function(d) {
        return scaleHours(d.value % 12);
      })
      .endAngle(function(d) {
        return scaleHours(d.value % 12);
      });
  
    clockGroup
      .selectAll(".clockhand")
      .data(data)
      .enter()                        // <-- enters clock
      .append("path")                 // <-- now we can change / update it
      .attr("d", function(d) {
        if (d.unit === "seconds") {
          return secondArc(d); // update seconds
        } else if (d.unit === "minutes") {
          return minuteArc(d); // update minutes
        } else if (d.unit === "hours") {
          return hourArc(d);   // update hours
        }
      })
      .attr("class", "clockhand")
      .attr("stroke", GOLD)
      .attr("stroke-width", function(d) {
        if (d.unit === "seconds") {
          return 2;   // set width of seconds hand
        } else if (d.unit === "minutes") {
          return 3;   // set width of minutes hand
        } else if (d.unit === "hours") {
          return 3;   // set width of hours hand
        }
      })
      .attr("fill", "none");
  };
  
  // return time based redrawing of hands
  // based on our above render function
  setInterval(() => {
    let data = fields();
    // console.log('interval', data);
    return render(data);
  }, 1000); // redraws 1x per second (1000 milliseconds)

}