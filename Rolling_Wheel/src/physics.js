/**
 * physics.js - Ball & Physics simulation engine for Gacha Machine
 */

export class Ball {
  constructor(x, y, radius, club = null, logoImg = null) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vx = (Math.random() - 0.5) * 3;
    this.vy = (Math.random() - 0.5) * 2;
    this.club = club;
    this.logoImg = logoImg || null;
    
    // Aesthetic capsule color with safe navigation:
    this.color = (club && club.color && club.color !== '#000000' && club.color !== '#111111')
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
    
    // Physics parameters: realistic, solid gravity
    this.gravity = 0.55;
    this.friction = 0.985;
    this.restitution = 0.65; // bounce damping on walls/ceiling
    this.ballRestitution = 0.78;
    this.chuteWidth = 86;
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
   * Applies realistic mixing & churning forces during shaking phase.
   * Agitates laterally and vertically without pinning balls against the top ceiling.
   */
  applyShakeForces() {
    for (const ball of this.balls) {
      // Strong lateral churn (left/right agitation)
      ball.vx += (Math.random() - 0.5) * 14;
      // Controlled vertical agitation (some hop upward, but gravity pulls them back actively)
      ball.vy += (Math.random() - 0.5) * 10 - 2.5;
      ball.vRotation += (Math.random() - 0.5) * 0.25;
    }
  }

  /**
   * Updates physics for all balls
   */
  update(dt = 1) {
    const chuteX = this.width / 2;

    for (let i = 0; i < this.balls.length; i++) {
      const b = this.balls[i];

      if (b.isDropping) {
        // Winner ball dropping through the chute
        b.vy += 0.65; // fast gravity down
        b.vx *= 0.92; // dampen horizontal drift
        b.x += (chuteX - b.x) * 0.1; // steer into center of chute
        b.y += b.vy;
        b.rotation += b.vRotation;
        continue;
      }

      // State-specific forces
      if (this.state === 'idle') {
        // Steady gravity to keep balls resting at the bottom
        b.vy += this.gravity;
        // Occasional micro-movement so the pile looks organic
        if (Math.random() < 0.04) {
          b.vx += (Math.random() - 0.5) * 0.4;
          b.vy -= Math.random() * 0.3;
        }
      } else if (this.state === 'shaking') {
        // Strong gravity active so balls actively drop back after bouncing
        b.vy += this.gravity;
        // Chaotic turbulence
        if (Math.random() < 0.25) {
          b.vx += (Math.random() - 0.5) * 6;
          b.vy += (Math.random() - 0.5) * 4;
        }
      } else if (this.state === 'dropping') {
        // Post-shake: balls fall down FAST to floor and settle cleanly
        b.vy += this.gravity * 1.35;
        b.vx *= 0.95;
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
      b.vRotation *= 0.98;

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
      // Top ceiling (dampened so balls don't cling or get stuck)
      if (b.y - b.radius < 0) {
        b.y = b.radius;
        b.vy = Math.abs(b.vy) * 0.5 + 1.0; // push immediately back downward
        this.triggerBounce(Math.abs(b.vy));
      }

      // Bottom floor
      if (b.y + b.radius > this.height) {
        b.y = this.height - b.radius;
        b.vy = -b.vy * this.restitution;
        // Floor friction
        b.vx *= 0.9;
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
            if (p > 1.4) {
              this.triggerBounce(p * 0.12);
            }
          }
        }
      }
    }
  }

  triggerBounce(intensity) {
    if (this.onBounce) {
      const volume = Math.min(0.55, Math.max(0.12, intensity * 0.14));
      this.onBounce(volume);
    }
  }
}
