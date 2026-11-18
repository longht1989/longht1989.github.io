/**
 * gacha.js - Gacha Machine Game Controller & State Machine
 */
import { Ball, PhysicsEngine } from './physics.js';
import { Renderer } from './renderer.js';

export class GachaMachine {
  constructor(canvas, clubs, soundManager, options = {}) {
    this.canvas = canvas;
    this.clubs = clubs;
    this.sound = soundManager;
    this.onReveal = options.onReveal || (() => {});

    this.renderer = new Renderer(canvas);
    this.physics = new PhysicsEngine(400, 420, {
      onBounce: (vol) => this.sound.playBounce(vol)
    });

    this.balls = [];
    this.state = 'idle'; // 'idle' | 'shaking' | 'dropping' | 'reveal'
    this.winnerClub = null;
    this.animFrameId = null;
    this.lastTime = 0;
    this.shakeInterval = null;
    this.machineEl = document.querySelector('.machine-container');
    this.chuteBallEl = document.getElementById('chute-ball');
  }

  /**
   * Initializes the machine, preloads images, and starts the physics loop
   */
  async init() {
    const { width, height } = this.renderer.resize();
    this.physics.setBounds(width, height);

    // Preload logos
    const loadedLogos = await this.preloadLogos(this.clubs);

    // Create balls for each club
    this.createBalls(width, height, loadedLogos);
    this.physics.setBalls(this.balls);

    // Start animation loop
    this.startLoop();
  }

  resize() {
    const { width, height } = this.renderer.resize();
    this.physics.setBounds(width, height);
  }

  async preloadLogos(clubs) {
    const promises = clubs.map((club) => {
      return new Promise((resolve) => {
        if (!club.logo) {
          resolve(null);
          return;
        }

        const candidates = [];
        const raw = club.logo;
        if (raw.startsWith('public/')) {
          candidates.push('./' + raw.replace(/^public\//, ''));
          candidates.push('./' + raw);
        } else {
          candidates.push('./' + raw);
          candidates.push('./public/' + raw);
        }

        let idx = 0;
        const tryNext = () => {
          if (idx >= candidates.length) {
            resolve(null);
            return;
          }
          const src = candidates[idx++];
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = tryNext;
          img.src = src;
        };

        tryNext();
      });
    });

    return Promise.all(promises);
  }

  createBalls(width, height, loadedLogos) {
    this.balls = [];
    const numClubs = this.clubs.length;
    // Calculate ball radius dynamically based on jar width
    const baseRadius = Math.max(16, Math.min(22, (width / 16)));

    for (let i = 0; i < numClubs; i++) {
      const club = this.clubs[i];
      const logoImg = loadedLogos[i] || null;

      // Initial distributed positions in the upper/mid portion of the jar
      const padding = baseRadius + 12;
      const x = padding + Math.random() * (width - padding * 2);
      const y = padding + (i / numClubs) * (height * 0.65);

      const ball = new Ball(x, y, baseRadius, club, logoImg);
      this.balls.push(ball);
    }
  }

  /**
   * Weighted random selection algorithm preserved from original logic:
   * priority 1 = 8x, priority 2 = 4x, priority 3 = 2x, priority 4 = 1x
   */
  selectWeightedWinner() {
    let totalWeight = 0;
    this.clubs.forEach((club) => {
      const level = club.priority || 4;
      club._weight = Math.pow(2, 4 - level);
      totalWeight += club._weight;
    });

    const random = Math.random() * totalWeight;
    let cumulative = 0;
    for (let i = 0; i < this.clubs.length; i++) {
      cumulative += this.clubs[i]._weight;
      if (random <= cumulative) {
        return i;
      }
    }
    return this.clubs.length - 1;
  }

  /**
   * Starts the gacha roll process (Fast mode default ~2.2s total)
   */
  async start() {
    if (this.state !== 'idle') return false;

    // 1. Pick winner in secret backend logic
    const winnerIdx = this.selectWeightedWinner();
    const winningClub = this.clubs[winnerIdx];
    this.winnerClub = winningClub;

    // Reset ball states
    for (const b of this.balls) {
      b.isWinner = (b.club.name === winningClub.name);
      b.isDropping = false;
      b.opacity = 1.0;
    }

    // 2. SHAKING PHASE (~1.3s fast snappy rumble)
    this.state = 'shaking';
    this.physics.setState('shaking');

    // UI Rumble shake effect on the machine container
    if (this.machineEl) {
      this.machineEl.classList.add('is-shaking');
    }

    // Play rumble sound
    this.sound.play('rumble', { loop: true, volume: 0.7 });

    // Continual random shake force
    this.shakeInterval = setInterval(() => {
      this.physics.applyShakeForces();
    }, 90);

    // Wait for shake duration (fast speed: 1350ms)
    await new Promise((r) => setTimeout(r, 1350));

    // Clear shake
    clearInterval(this.shakeInterval);
    this.shakeInterval = null;
    if (this.machineEl) {
      this.machineEl.classList.remove('is-shaking');
    }
    this.sound.stop('rumble');

    // 3. DROPPING PHASE (~800ms)
    this.state = 'dropping';
    this.physics.setState('dropping');
    this.sound.play('drop', { volume: 0.85 });

    const winnerBall = this.balls.find((b) => b.isWinner);
    if (winnerBall) {
      // Guide winning ball towards bottom center chute
      winnerBall.x = this.renderer.width / 2 + (Math.random() - 0.5) * 10;
      winnerBall.y = this.renderer.height - winnerBall.radius * 2;
      winnerBall.vx = 0;
      winnerBall.vy = 4;
      winnerBall.isDropping = true;
    }

    // Show chute ball drop visual
    if (this.chuteBallEl && winnerBall) {
      this.chuteBallEl.style.backgroundColor = winnerBall.color;
      this.chuteBallEl.classList.add('ball-exit-anim');
    }

    // Wait for ball to drop through
    await new Promise((r) => setTimeout(r, 750));

    // 4. REVEAL PHASE
    this.state = 'reveal';
    this.sound.play('reveal', { volume: 0.9 });

    if (this.onReveal) {
      this.onReveal(winningClub);
    }

    return true;
  }

  /**
   * Resets machine back to ambient idle state
   */
  reset() {
    this.state = 'idle';
    this.physics.setState('idle');

    if (this.chuteBallEl) {
      this.chuteBallEl.classList.remove('ball-exit-anim');
    }

    for (const b of this.balls) {
      b.isWinner = false;
      b.isDropping = false;
      b.opacity = 1.0;
      // Gentle bounce back up if ball fell through
      if (b.y > this.renderer.height) {
        b.y = this.renderer.height * 0.4;
        b.vy = -3;
      }
    }
  }

  startLoop() {
    const loop = (timestamp) => {
      if (!this.lastTime) this.lastTime = timestamp;
      const dt = Math.min((timestamp - this.lastTime) / 16.6, 2.5);
      this.lastTime = timestamp;

      this.physics.update(dt);
      this.renderer.render(this.balls, this.state, this.physics.chuteWidth);

      this.animFrameId = requestAnimationFrame(loop);
    };

    this.animFrameId = requestAnimationFrame(loop);
  }

  destroy() {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }
    if (this.shakeInterval) {
      clearInterval(this.shakeInterval);
    }
    this.sound.stop('rumble');
  }
}
