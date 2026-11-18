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
    this.preloadLogo = options.preloadLogo || null;

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
   * Initializes the machine immediately (0ms wait, no heavy preloading)
   */
  async init() {
    const { width, height } = this.renderer.resize();
    this.physics.setBounds(width, height);

    // Create 10 chunky classic soccer balls
    this.createBalls(width, height);
    this.physics.setBalls(this.balls);

    // Start physics animation loop
    this.startLoop();
  }

  resize() {
    const { width, height } = this.renderer.resize();
    this.physics.setBounds(width, height);
  }

  createBalls(width, height) {
    this.balls = [];
    // 10 prominent, large soccer balls with vibrant tournament accent colors
    const NUM_BALLS = 10;
    const baseRadius = Math.max(30, Math.min(36, width / 11));
    const palette = [
      '#ff4757', '#1e90ff', '#2ed573', '#ffa502', '#9b5de5',
      '#00d2d3', '#ff6b81', '#70a1ff', '#eccc68', '#5352ed'
    ];

    for (let i = 0; i < NUM_BALLS; i++) {
      const padding = baseRadius + 16;
      const x = padding + Math.random() * (width - padding * 2);
      // Settle in the lower portion of the jar
      const y = height * 0.42 + (i / NUM_BALLS) * (height * 0.46);

      const ball = new Ball(x, y, baseRadius, null, null);
      ball.accentColor = palette[i % palette.length];
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

    // 1. Pick winner in secret backend logic from all 23 clubs
    const winnerIdx = this.selectWeightedWinner();
    const winningClub = this.clubs[winnerIdx];
    this.winnerClub = winningClub;

    // Asynchronously begin preloading winning club's logo right now in parallel
    const logoPromise = (this.preloadLogo && winningClub)
      ? this.preloadLogo(winningClub)
      : Promise.resolve(null);

    // Reset ball states, designate one ball as the chosen carrier
    const winnerBallIndex = Math.floor(Math.random() * this.balls.length);
    for (let i = 0; i < this.balls.length; i++) {
      const b = this.balls[i];
      b.isWinner = (i === winnerBallIndex);
      b.club = b.isWinner ? winningClub : null;
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

    // Initial energetic burst
    this.physics.applyShakeForces();

    // Continual random shake force
    this.shakeInterval = setInterval(() => {
      this.physics.applyShakeForces();
    }, 85);

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
      winnerBall.x = this.renderer.width / 2 + (Math.random() - 0.5) * 6;
      winnerBall.y = this.renderer.height - winnerBall.radius * 2;
      winnerBall.vx = 0;
      winnerBall.vy = 5.5;
      winnerBall.isDropping = true;
    }

    // Show glowing Casino Jackpot Orb in the exit chute after slight physical delay
    if (this.chuteBallEl && winnerBall) {
      this.chuteBallEl.innerHTML = '7';
      this.chuteBallEl.style.fontSize = '24px';
      this.chuteBallEl.style.fontWeight = '900';
      this.chuteBallEl.style.color = '#ffe680';
      this.chuteBallEl.style.textShadow = '0 0 10px #ffd700, 0 2px 4px #000';

      setTimeout(() => {
        if (this.chuteBallEl) {
          this.chuteBallEl.classList.add('ball-exit-anim');
        }
      }, 190);
    }

    // Wait for ball to drop through
    await new Promise((r) => setTimeout(r, 750));

    // Delay reveal until the winner club's logo is completely loaded
    let loadedLogo = null;
    try {
      loadedLogo = await Promise.race([
        logoPromise,
        new Promise((resolve) => setTimeout(() => resolve(null), 2500)) // fallback safeguard
      ]);
    } catch (e) {
      loadedLogo = null;
    }

    // 4. REVEAL PHASE
    this.state = 'reveal';
    this.sound.play('reveal', { volume: 0.9 });

    if (this.onReveal) {
      this.onReveal(winningClub, loadedLogo);
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
      this.chuteBallEl.innerHTML = '';
    }

    for (const b of this.balls) {
      b.isWinner = false;
      b.isDropping = false;
      b.opacity = 1.0;
      // Gentle drop back into the pile if ball fell through
      if (b.y > this.renderer.height) {
        b.y = this.renderer.height * 0.45;
        b.vy = 2.5;
        b.vx = (Math.random() - 0.5) * 2;
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
