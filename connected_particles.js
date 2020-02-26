const particles = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  for (let i = 0; i < window.innerWidth / 25; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(10, 10, 10);
  particles.forEach((p, index) => {
    p.update();
    p.connect(particles.slice(index));
    p.show();
  });
}

class Particle {
  constructor() {
    this.pos = createVector(
      random(window.innerWidth),
      random(window.innerHeight)
    );
    this.vel = createVector(random(-0.69, 0.69), random(-0.69, 0.69));
    this.size = 6.5;
  }

  update() {
    while (
      (this.vel.x > -0.05 && this.vel.x < 0.05) ||
      (this.vel.y > -0.05 && this.vel.y < 0.05)
    ) {
      this.vel = createVector(random(-0.69, 0.69), random(-0.69, 0.69));
    }
    this.pos.add(this.vel);
    this.edges();
  }

  show() {
    noStroke();
    // fill('rgba(150, 15, 15, 0.75)');
    fill("rgba(125, 125, 125, 0.75)");
    circle(this.pos.x, this.pos.y, this.size);
  }

  edges() {
    if (this.pos.x - this.size / 2 < 0 || this.pos.x + this.size / 2 > width) {
      this.vel.x *= -1;
    }
    if (this.pos.y - this.size / 2 < 0 || this.pos.y + this.size / 2 > height) {
      this.vel.y *= -1;
    }
  }

  connect(particles) {
    particles.forEach(particle => {
      const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
      if (d < 150) {
        let distStroke = map(d, 0, 150, 115, 35);
        let distWeight = map(d, 0, 150, 4, 1.5);
        stroke(175, 42, 42, distStroke);
        strokeWeight(distWeight);
        line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
      }
    });
  }
}
