let canvas, ctx, fontSize, drops, letters, columns, iter;
function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  letters = '|.';
  letters = letters.split('');

  fontSize = 10,
      columns = canvas.width / fontSize,
      iter = 0;

  drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = 1;
  }
}

function color() {
  let choices = ["#0f0", "#FFCC00", "#FFB000", "#33FF33", "#66FF66", "#fd00ff", "fdff00", "#00f9ff", "#3c00ff", "#E0BBE4", "#957DAD", "#D291BC", "#FEC8D8", "#FFDFD3", "#ffb3ba", "#ffdfba", "#ffffba", "#baffc9", "#bae1ff", "#ff0000", "#ffa500", "#ffff00", "#0000ff", "#4b0082", "#ee82ee", "#05f9fb", "#f9ad7e", "#109fac", "#63949c", "#c9b0b9", "#1c1c34"];
  return choices[Math.floor(Math.random() * choices.length)];
}

function draw() {
  if (iter  < 100000) {
     ++iter
  } else {
    ctx.fillStyle = color();
    ctx.fillRect(0, 0, canvas.width, canvas.height); 
  }
  for (let i = 0; i < drops.length; i++) {
    let text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillStyle = color();
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    drops[i]++;
    if (drops[i] * fontSize > canvas.height && Math.random() > .95) {
      drops[i] = 0;
    }
  }
}

function stop(animation) {
  console.log('stop called');
  clearInterval(animation);
}

module.exports = { init, draw, stop }