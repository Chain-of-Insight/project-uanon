import * as d3 from 'd3';
export default function() {
  const width = window.innerWidth,
        height = window.innerHeight,    // TODO: calculate width and height
        n = width / 100,                // Gradient iterations
        moonR = 30,                     // Moon radius
        fDeviation = 3,                 // Glow strength (outer bound)
        mtn1 = [-5,250,250],            // Mtn. rotations
        mtn2 = [25,320,320];            // Ibid.

  let mx = 300,                         // Moon position x
      my = 90,                          // Moon position y
      bg1 = "#1e1e1e",                  // Sky
      fillA = "#ffffff",                // Moon White
      fillB = "rgba(255,112,112,0.5)",  // Moon Red
      fillC = "rgba(153,0,0,0.25)";     // Darker Moon Red 2

  let svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", bg1);

  let defs = svg.select("defs");

  const filter = defs.append("filter")
    .attr("id","glow");

  filter.append("feGaussianBlur")
    .attr("stdDeviation", fDeviation)
    .attr("result","coloredBlur");

  const feMerge = filter.append("feMerge");

  feMerge.append("feMergeNode")
    .attr("in","coloredBlur");

  feMerge.append("feMergeNode")
    .attr("in","SourceGraphic");

  const moonA = svg.append("circle");
  moonA.attr("class", "moon")
    .attr("fill", fillA)
    .attr("cx", mx)
    .attr("cy", my)
    .attr("r", width / moonR)
    .style("filter", "url(#glow)");

  const moonB = svg.append("circle");
  moonB.attr("class", "moon")
    .attr("fill", fillB)
    .attr("cx", mx)
    .attr("cy", my)
    .attr("r", width / moonR)
    .style("filter", "url(#glow)");

  const moonC = svg.append("circle");
  moonC.attr("class", "moon")
    .attr("fill", fillC)
    .attr("cx", mx)
    .attr("cy", my)
    .attr("r", width / (moonR-5))
    .style("filter", "url(#glow)");

  svg.append("rect")
    .attr("class", "snow")
    .attr("fill", "url(#snow)")
    .attr("x", 0)
    .attr("y", 0.45 * height)
    .attr("width", width + 20)
    .attr("height", 250)
    .attr("transform", "rotate(" + mtn1[0] + "," + mtn1[1] + "," + mtn1[2] +")")
    .style("filter", "url(#glow)");
  
  svg.append("rect")
    .attr("class", "snow")
    .attr("fill", "url(#snow)")
    .attr("x", -20)
    .attr("y", 0.45 * height)
    .attr("width", width + 20)
    .attr("height", 300)
    .attr("transform", "rotate(" + mtn2[0] + "," + mtn2[1] + "," + mtn2[2] +")")
    .style("filter", "url(#glow)");

  svg.append("rect")
    .attr("class", "snow")
    .attr("fill", "url(#snow)")
    .attr("x", 0)
    .attr("y", 0.5 * height)
    .attr("width", width)
    .attr("height", height)
    .style("filter", "url(#glow)");

  let data = d3.range(0, n).map(function(i) {
    let gradient = defs.append("linearGradient").attr("id","g"+i);
    let d = {
      stops: [
        gradient.append("stop"),
        gradient.append("stop")
      ]
    };

    randomize(d);
    d.x += i * (width / n);

    return d;
  });

  function randomize(d) {
    d.x = Math.random() * -30;
    d.y = 0.65 * height + Math.random() * 15;
    d.w = 20 + Math.random() * 8;
    d.r1 = Math.random() * 5;
    d.r2 = Math.random() * 5;
    d.r3 = Math.random() * 10;
    return d;
  }

  let g = svg.selectAll("g")
    .data(data)
    .enter().append("g");

  g.append("path")
    .attr("class", "shadow")
    .attr("fill", "rgba(16,16,16,.8)");

  g.append("path")
    .attr("class", "tree");
}