let progress = 0;

function setup() {
  createCanvas(600, 150);
}

function draw() {
  background(20);

  textAlign(CENTER, CENTER);
  text("Click to progress:", width / 2, 25);

  noFill();
  stroke(200);
  rect(50, 60, 500, 30);

  noStroke();
  fill(100, 180, 255);
  rect(50, 60, progress, 30);
}

function mousePressed() {
  progress = random(0, 500);
}
