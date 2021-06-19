import * as d3 from 'd3';
export default function() {

  const width = window.innerWidth,
        height = window.innerHeight,
        rows = 10,        // Many wrungs but only 1 ascension
        sky = '#8B0000',  // The smell of blood and lust surrounds us
        sunR = 100;       // Dead Sun radius

  let mx = width / 1.25,  // Dead Sun position x
      my = 40,            // Dead Sun position y
      fDeviation = 300;   // Glow strength (outer bound)

  let fillA = 'silver',   // Dead Sun glow, the silver of their decadence
      fillB = '#333333';  // Dead Sun main fill

  let svg = d3.select('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background', sky)
    .style('background-image', 'linear-gradient(270deg, #a71d31 0%, #3f0d12 100%)');
    
  let glowFilter = svg.append('filter').attr('id','glow');

  glowFilter.append('feGaussianBlur')
    .attr('stdDeviation', fDeviation)
    .attr('result','coloredBlur');

  const feMerge = glowFilter.append('feMerge');

  feMerge.append('feMergeNode')
    .attr('in','coloredBlur');

  feMerge.append('feMergeNode')
    .attr('in','SourceGraphic');

  let data = d3.range(rows).map(() => {
    var x = Math.random() * width;
    return [[0, 0], [x - 50, 0], [x, -100], [x + 50, 0], [width, 0]];
  });

  const sunA = svg.append('circle');
  sunA.attr('class', 'sun')
    .attr('fill', fillA)
    .attr('cx', mx)
    .attr('cy', my)
    .attr('r', width / sunR)
    .style('filter', 'url(#glow)');

  const sunB = svg.append('circle');
  sunB.attr('class', 'sun')
    .attr('fill', fillB)
    .attr('cx', mx)
    .attr('cy', my)
    .attr('r', width / sunR)
    .style('filter', 'url(#glow)');

  let	area = d3.area()
    .y0(height)
    .curve(d3.curveCatmullRom.alpha(1));

  let scale = d3.scaleLinear()
    .domain([0, rows])
    .range(['#c2b280', '#222']);

  let groups = svg.selectAll('g')
    .data(data)
    .enter().append('g')
    .attr('transform', (d, i) => {
      return 'translate(' + [0, i * height / rows] + ')'
    });

  groups.append('path')
    .attr('fill', (d, i) => { return scale(i); })
    .attr('d', area);

  groups.filter((d, i) => { 
    return i != rows - 1; 
  })
  .append('g')
  .attr('filter', 'url(#blur)')
  .selectAll('circle')
  .data((d, i) => {
    return d3.range(7).map(() => {
      return {
        i: i,
        x: (Math.random() * (width + 200) - 100)
      };
    });
  })
  .enter().append('ellipse')
  .attr('cy', 20)
  .attr('ry', 20)
  .attr('rx', 60)
  .style('fill', (d) => {
    return scale(d.i - 5);
  })
  .attr('fill-opacity', 0.2);

}