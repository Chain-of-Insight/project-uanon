import * as d3 from 'd3';
export default function() {

  const width = window.innerWidth,
    height = window.innerHeight,
    fDeviation = 300,               // Glow strength (outer bound)
    sunR = 40;                      // Sun radius

  let mx = width / 1.25,            // Sun position x
    my = 125,                       // Sun position y
    bg1 = "#1ce7ff";                // Sky

  let fillA = "#ffffff",            // Sun glow
    fillB = "rgba(255,112,112,0.5)";// Sun main

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

  svg.append("rect")
      .attr("class", "rites")
      .attr("fill", "url(#rites)")
      .attr("x", -20)
      .attr("y", 0.45 * height)
      .attr("width", width + 20)
      .attr("height", 100)
      .attr("transform", "rotate(5,250,250)")
      .style("filter", "url(#glow)");

  svg.append("rect")
      .attr("class", "rites")
      .attr("fill", "url(#rites)")
      .attr("x", 0)
      .attr("y", 0.45 * height)
      .attr("width", width + 20)
      .attr("height", 100)
      .style("filter", "url(#glow)");

  svg.append("rect")
    .attr("class", "rites")
    .attr("fill", "url(#rites)")
    .attr("x", 0)
    .attr("y", 0.5 * height)
    .attr("width", width)
    .attr("height", height)
    .attr("transform", "rotate(0,250,250)")
    .style("filter", "url(#glow)");

  const sunA = svg.append("circle");
  sunA.attr("class", "moon")
    .attr("fill", fillA)
    .attr("cx", mx)
    .attr("cy", my)
    .attr("r", width / sunR)
    .style("filter", "url(#glow)");

  const sunB = svg.append("circle");
  sunB.attr("class", "sun")
    .attr("fill", fillB)
    .attr("cx", mx)
    .attr("cy", my)
    .attr("r", width / sunR)
    .style("filter", "url(#glow)");

  // Tree configuration
  let branches = [];
  let seed = {i: 0, x: 420, y: 750, a: 0, l: 100, d:0}; // a = angle, l = length, d = depth
  let da = 0.3; // Angle delta
  let dl = 0.85; // Length delta (factor)
  let ar = (Math.random() >= 0.5) ? 0.991 : 0.725; // Randomness
  let maxDepth = 10;

  // Tree creation functions
  function branch(b) {
    let end = endPt(b), daR, newB;

    branches.push(b);

    if (b.d === maxDepth)
      return;

    // Left branch
    daR = ar * Math.random() - ar * 0.5;
    newB = {
      i: branches.length,
      x: end.x,
      y: end.y,
      a: b.a - da + daR,
      l: b.l * dl,
      d: b.d + 1,
      parent: b.i
    };
    branch(newB);

    // Right branch
    daR = ar * Math.random() - ar * 0.5;
    newB = {
      i: branches.length,
      x: end.x, 
      y: end.y, 
      a: b.a + da + daR, 
      l: b.l * dl, 
      d: b.d + 1,
      parent: b.i
    };
    branch(newB);
  }

  function regenerate(initialise) {
    branches = [];
    branch(seed);
    initialise ? create() : update();
  }

  function endPt(b) {
    // Return endpoint of branch
    var x = b.x + b.l * Math.sin( b.a );
    var y = b.y - b.l * Math.cos( b.a );
    return {x: x, y: y};
  }


  // D3 functions
  let color = d3.scaleLinear()
      .domain([0, maxDepth])
      .range(["black","purple"]);

  function x1(d) {return d.x;}
  function y1(d) {return d.y;}
  function x2(d) {return endPt(d).x;}
  function y2(d) {return endPt(d).y;}

  function create() {
    d3.select('svg')
      .selectAll('line')
      .data(branches)
      .enter()
      .append('line')
      .attr('x1', x1)
      .attr('y1', y1)
      .attr('x2', x2)
      .attr('y2', y2)
      .style('stroke-width', function(d) {
          var t = parseInt(maxDepth*.5 +1 - d.d*.5);
          return  t + 'px';
      })
      .style('stroke', function(d) {
          return color(d.d);
      })
      .attr('id', function(d) {return 'id-'+d.i;});
  }

  function update() {
    d3.select('svg')
      .selectAll('line')
      .data(branches)
      .transition()
      .attr('x1', x1)
      .attr('y1', y1)
      .attr('x2', x2)
      .attr('y2', y2);
  }

  regenerate(true);

}