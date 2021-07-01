export default function() {

  // Context
  const canvas = document.getElementById('canvas');
  // const black = 'rgba(0, 0, 0, 0.1)';
  // const white = 'rgba(255, 0, 0, 0.1)';
  // let fps = document.getElementById('fps');
  let ctx = canvas.getContext('2d');
  let W = canvas.width = innerWidth;
  let H = canvas.height = innerHeight;
  let raf = requestAnimationFrame;
  let running = false;
  let B = 500;
  let bots;

  // Prim.
  const PI = Math.PI;
  const TAU = Math.PI*2;
  const floor = Math.floor;
  const random = Math.random;
  const cos = Math.cos;
  const sin = Math.sin;
  let ops = 'floor|random|round|abs|sqrt|PI|atan2|sin|cos|pow';
  ops.split('|')
    .forEach((p) => { 
      this[p] = Math[p];
    });

  const randint = (n) => {return floor(n*random())};
  const choose = (x, y, vx, vy) => {
    let args = [x, y, vx, vy];
    return args[randint(args.length)]
  };

  let Cos = cos(PI/77);
  let Sin = sin(PI/77);

  const loop = () => {
    if (running) raf(loop);
    update();
    draw();
  }

  const grey = (nn) => {
    let n = floor((1-nn) * 255);
    return 'rgba('+n+','+0+','+0+','+0.3+')';
  }

  // Evt.
  document.onclick = function() {
    if ((running = !running)) raf(loop);
  };

  document.onkeydown = function(e) {
    if (e.which !== 27) return;
    running = false;
    setTimeout(reset, 50);
  };

  // Viral Inst.
  function Bot (x, y, vx, vy) {
    this.x0 = this.x = x;
    this.y0 = this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.age = 1;
    this.color = grey(random());
    this.radius = random()*5;
    this.decay = choose(0.99, 0.98, 0.97, 0.96, 0.95);
  }

  Bot.prototype.update = function() {
    this.x += this.vx;
    this.y += this.vy;
    
    let sign = random() > 0.5 ? 1 : -1;
    let vx = this.vx, vy = this.vy;
    let c = Cos, s = sign*Sin;
    this.vx = vx*c - vy*s;
    this.vy = vx*s + vy*c;

    this.radius *= this.decay;
    if (this.radius < 0.3) {
      this.x = this.x0;
      this.y = this.y0;
      this.radius = 3;
      this.color = grey(random());
    }
  }

  Bot.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, TAU);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  function reset() {
    ctx.clearRect(0, 0, W, H);
    bots = new Array(B);
    for (let i = 0; i < B; i++) {
      let v = random()*4-2;
      let t = random()*TAU;
      bots[i] = new Bot(W/2, H/2, v*cos(t), v*sin(t));
    }
  }

  function update() {
    for (let i = 0; i < B; i++) bots[i].update();
  }

  function draw() {
    for (let i = 0; i < B; i++) bots[i].draw(ctx);
  }

  // Worker
  const main = () => {
    running = true;
    reset();
    raf(loop);
  }

  // Start worker
  main();
}