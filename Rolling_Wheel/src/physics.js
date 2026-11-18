/**
 * physics.js - Ball & Physics simulation engine for Gacha Machine
 */

export class Ball {
  constructor(x, y, radius, club, logoImg) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vx = (Math.random() - 0.5) * 3;
    this.vy = (Math.random() - 0.5) * 3;
    this.club = club;
    this.logoImg = logoImg || null;
    
    // Aesthetic capsule color:
    // Clubs have a primary color in JSON, or fallback to fun gacha capsule colors
    this.color = club.color && club.color !== '#000000' && club.color !== '#111111' 
      ? club.color 
      : Ball.getRandomCapsuleColor();

    this.isWinner = false;
    this.isDropping = false;
    this.opacity = 1.0;
    this.scale = 1.0;
    this.rotation = Math.random() * Math.PI * 2;
    this.vRotation = (Math.random() - 0.5) * 0.05;
  }

  static getRandomCapsuleColor() {
    const palette = [
      '#e63946', '#f4a261', '#2a9d8f', '#457b9d', 
      '#1d3557', '#9b5de5', '#f15bb5', '#00bbf9', 
      '#00f5d4', '#fee440', '#d62828', '#3a86ff'
    ];
    return palette[Math.floor(Math.random() * palette.length)];
  }
}

export class PhysicsEngine {
  constructor(width, height, options = {}) {
    this.width = width;
    this.height = height;
    this.balls = [];
    this.state = 'idle'; // 'idle' | 'shaking' | 'dropping' | 'settled'
    this.onBounce = options.onBounce || (() => {});
    
    // Physics parameters
    this.gravity = 0.22;
    this.friction = 0.99;
    this.restitution = 0.72; // bounce damping
    this.ballRestitution = 0.82;
    this.chuteWidth = 70;
  }

  setBounds(width, height) {
    this.width = width;
    this.height = height;
  }

  setBalls(balls) {
    this.balls = balls;
  }

  setState(state) {
    this.state = state;
  }

  /**
   * Applies energetic random impulses during shaking phase
   */
  applyShakeForces() {
    const speedMultiplier = 16;
    for (const ball of this.balls) {
      ball.vx += (Math.random() - 0.5) * speedMultiplier;
      ball.vy -= Math.random() * (speedMultiplier * 0.9) + 4; // lift upward
      ball.vRotation += (Math.random() - 0.5) * 0.2;
    }
  }

  /**
   * Updates physics for all balls
   */
  update(dt = 1) {
    const chuteX = this.width / 2;
    const chuteHalf = this.chuteWidth / 2;

    for (let i = 0; i < this.balls.length; i++) {
      const b = this.balls[i];

      if (b.isDropping) {
        // Winner ball dropping through the chute
        b.vy += 0.45; // faster gravity down
        b.vx *= 0.94; // dampen horizontal drift
        b.x += (chuteX - b.x) * 0.08; // steer into center of chute
        b.y += b.vy;
        b.rotation += b.vRotation;
        continue;
      }

      // State-specific forces
      if (this.state === 'idle') {
        b.vy += this.gravity * 0.7;
        // Subtle ambient jitter to keep balls looking alive
        if (Math.random() < 0.05) {
          b.vx += (Math.random() - 0.5) * 0.5;
          b.vy -= Math.random() * 0.4;
        }
      } else if (this.state === 'shaking') {
        b.vy += this.gravity * 0.8;
        // Chaos impulses during shaking
        if (Math.random() < 0.3) {
          b.vx += (Math.random() - 0.5) * 5;
          b.vy -= Math.random() * 4;
        }
      } else if (this.state === 'dropping') {
        // Other balls calm down
        b.vy += this.gravity;
        b.vx *= 0.95;
        b.vy *= 0.95;
      } else {
        b.vy += this.gravity;
      }

      // Air resistance
      b.vx *= this.friction;
      b.vy *= this.friction;

      // Position update
      b.x += b.vx;
      b.y += b.vy;
      b.rotation += b.vRotation;
      b.vRotation *= 0.99;

      // Boundary Collisions (Jar Walls)
      // Left wall
      if (b.x - b.radius < 0) {
        b.x = b.radius;
        b.vx = -b.vx * this.restitution;
        this.triggerBounce(Math.abs(b.vx));
      }
      // Right wall
      if (b.x + b.radius > this.width) {
        b.x = this.width - b.radius;
        b.vx = -b.vx * this.restitution;
        this.triggerBounce(Math.abs(b.vx));
      }
      // Top ceiling
      if (b.y - b.radius < 0) {
        b.y = b.radius;
        b.vy = -b.vy * this.restitution;
        this.triggerBounce(Math.abs(b.vy));
      }

      // Bottom floor (with chute opening check if winner is ready to drop)
      const isOverChute = Math.abs(b.x - chuteX) < chuteHalf;
      if (b.isWinner && this.state === 'dropping' && isOverChute) {
        // Dropping down the chute!
        b.isDropping = true;
        continue;
      }

      if (b.y + b.radius > this.height) {
        b.y = this.height - b.radius;
        b.vy = -b.vy * this.restitution;
        // Floor friction
        b.vx *= 0.93;
        this.triggerBounce(Math.abs(b.vy));
      }
    }

    // Ball-to-Ball Collisions (Elastic 2D)
    for (let i = 0; i < this.balls.length; i++) {
      const b1 = this.balls[i];
      if (b1.isDropping) continue;

      for (let j = i + 1; j < this.balls.length; j++) {
        const b2 = this.balls[j];
        if (b2.isDropping) continue;

        const dx = b2.x - b1.x;
        const dy = b2.y - b1.y;
        const dist = Math.hypot(dx, dy);
        const minDist = b1.radius + b2.radius;

        if (dist < minDist && dist > 0) {
          // Normal vector
          const nx = dx / dist;
          const ny = dy / dist;

          // Separate overlapping spheres
          const overlap = (minDist - dist) * 0.5;
          b1.x -= nx * overlap;
          b1.y -= ny * overlap;
          b2.x += nx * overlap;
          b2.y += ny * overlap;

          // Relative velocity
          const kx = b1.vx - b2.vx;
          const ky = b1.vy - b2.vy;
          const p = 2 * (nx * kx + ny * ky) / 2; // Equal mass = 1

          if (p > 0) {
            b1.vx -= p * nx * this.ballRestitution;
            b1.vy -= p * ny * this.ballRestitution;
            b2.vx += p * nx * this.ballRestitution;
            b2.vy += p * ny * this.ballRestitution;

            // Trigger bounce sound if impact has significant speed
            if (p > 1.2) {
              this.triggerBounce(p * 0.1);
            }
          }
        }
      }
    }
  }

  triggerBounce(intensity) {
    if (this.onBounce) {
      const volume = Math.min(0.6, Math.max(0.15, intensity * 0.15));
      this.onBounce(volume);
    }
  }
}
