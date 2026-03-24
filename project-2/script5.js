let qs = [];
let total = 60;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(32);
  textAlign(CENTER, CENTER);

  for (let i = 0; i < total; i++) {
    qs.push({
      x: random(width),
      y: random(height),
      dx: random(-0.8, 0.8),
      dy: random(-0.8, 0.8)
    });
  }
}

function draw() {
  background(0, 20);

  fill(255);
  for (let q of qs) {
    text("?", q.x, q.y);

    q.x += q.dx;
    q.y += q.dy;

    if (q.x > width) q.x = 0;
    if (q.x < 0) q.x = width;
    if (q.y > height) q.y = 0;
    if (q.y < 0) q.y = height;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
