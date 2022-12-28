export default function() {
  const Canvas = document.getElementById('canvas');
  let ctx = Canvas.getContext('2d');

  function drawTree(startX, startY, len, angle, branchWidth) {
    ctx.lineWidth = branchWidth;
    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = "#59943";
    ctx.fillStyle = "#59943";
    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI/180);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -len);
    ctx.stroke();
    ctx.shadowBlur = 15;
    ctx.shadowColor = "rgba(0,0,0,0.8)";

    if (len < 10) {
      ctx.restore();
      return;
    }

    drawTree(0, -len, len*0.8, angle-15, branchWidth*0.8);
    drawTree(0, -len, len*0.8, angle+15, branchWidth*0.8);

    ctx.restore();
  }

  function getRand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  drawTree(400, 760, getRand(40,140), 0, 10);
  drawTree(900, 770, getRand(40,140), 0, 10);
  drawTree(700, 780, getRand(40,140), 0, 10);
  drawTree(1300, 780, getRand(40,140), 0, 10);
  drawTree(1600, 760, getRand(40,140), 0, 10);
  if (Math.random() >= 0.5) {
    drawTree(1950, getRand(760,780), getRand(40,140), 0, 9);
    drawTree(2150, getRand(760,780), getRand(40,140), 0, 8);
  }
}