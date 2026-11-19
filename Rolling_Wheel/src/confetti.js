/**
 * confetti.js - Tiered Confetti & Fireworks Celebration Manager
 * Integrates canvas-confetti with 3 distinct tiers based on club priority
 */
import confetti from './confetti.module.js';

let activeTimers = [];

/**
 * Resolves confetti engine safely from module or global window
 */
function getConfetti() {
  if (typeof confetti === 'function') {
    return confetti;
  }
  if (typeof window !== 'undefined' && typeof window.confetti === 'function') {
    return window.confetti;
  }
  return null;
}

/**
 * Creates custom star shape if Path2D is supported in browser
 */
function getStarShape(confettiInstance) {
  try {
    if (typeof Path2D !== 'undefined' && confettiInstance && typeof confettiInstance.shapeFromPath === 'function') {
      return confettiInstance.shapeFromPath({
        path: 'M 0 -10 L 2.5 -2.5 L 10 -2.5 L 4 2 L 6 9.5 L 0 5 L -6 9.5 L -4 2 L -10 -2.5 L -2.5 -2.5 Z'
      });
    }
  } catch (e) {}
  return 'circle';
}

/**
 * Clears any pending bursts and resets the canvas immediately
 */
export function clearConfetti() {
  activeTimers.forEach((t) => clearTimeout(t));
  activeTimers = [];

  const confetti = getConfetti();
  if (confetti && typeof confetti.reset === 'function') {
    confetti.reset();
  }
}

/**
 * Tier 1: Grand Jackpot (Priority 1 & 4)
 * Multi-stage 360° fireworks burst + golden 24K stars + intense casino celebration
 */
export function fireGrandJackpot() {
  const confetti = getConfetti();
  if (!confetti) return;

  clearConfetti();
  const star = getStarShape(confetti);

  const goldRubyColors = ['#ffd700', '#ff2a4b', '#fff4b8', '#ffffff', '#e6193c', '#ffb700'];

  // Wave 1: Immediate powerful center blast (0ms)
  confetti({
    particleCount: 100,
    spread: 100,
    startVelocity: 45,
    origin: { x: 0.5, y: 0.45 },
    colors: goldRubyColors,
    shapes: [star, 'circle', 'square'],
    scalar: 1.15,
    ticks: 180,
    decay: 0.91,
    zIndex: 1001
  });

  // Wave 2: Left firework burst (180ms)
  const t1 = setTimeout(() => {
    confetti({
      particleCount: 65,
      spread: 90,
      startVelocity: 40,
      origin: { x: 0.35, y: 0.38 },
      colors: goldRubyColors,
      shapes: [star, 'circle'],
      scalar: 1.25,
      ticks: 160,
      decay: 0.92,
      zIndex: 1001
    });
  }, 180);
  activeTimers.push(t1);

  // Wave 3: Right firework burst (360ms)
  const t2 = setTimeout(() => {
    confetti({
      particleCount: 65,
      spread: 90,
      startVelocity: 40,
      origin: { x: 0.65, y: 0.38 },
      colors: goldRubyColors,
      shapes: [star, 'circle'],
      scalar: 1.25,
      ticks: 160,
      decay: 0.92,
      zIndex: 1001
    });
  }, 360);
  activeTimers.push(t2);
}

/**
 * Tier 2: Big Winner (Priority 2)
 * Dual side cannons shooting upward diagonally from bottom corners
 */
export function fireBigWinner() {
  const confetti = getConfetti();
  if (!confetti) return;

  clearConfetti();

  const colors = ['#ffd700', '#e6193c', '#ffffff', '#fcd34d'];

  // Left cannon
  confetti({
    particleCount: 55,
    angle: 60,
    spread: 60,
    startVelocity: 50,
    origin: { x: 0.05, y: 0.85 },
    colors: colors,
    ticks: 160,
    decay: 0.92,
    zIndex: 1001
  });

  // Right cannon
  confetti({
    particleCount: 55,
    angle: 120,
    spread: 60,
    startVelocity: 50,
    origin: { x: 0.95, y: 0.85 },
    colors: colors,
    ticks: 160,
    decay: 0.92,
    zIndex: 1001
  });

  // Second wave for richness (200ms)
  const t = setTimeout(() => {
    confetti({
      particleCount: 35,
      angle: 65,
      spread: 50,
      startVelocity: 44,
      origin: { x: 0.1, y: 0.85 },
      colors: colors,
      ticks: 140,
      decay: 0.93,
      zIndex: 1001
    });
    confetti({
      particleCount: 35,
      angle: 115,
      spread: 50,
      startVelocity: 44,
      origin: { x: 0.9, y: 0.85 },
      colors: colors,
      ticks: 140,
      decay: 0.93,
      zIndex: 1001
    });
  }, 200);
  activeTimers.push(t);
}

/**
 * Tier 3: Lucky Club (Priority 3 or default)
 * Elegant top-down shower
 */
export function fireLuckyClub() {
  const confetti = getConfetti();
  if (!confetti) return;

  clearConfetti();

  const colors = ['#ffd700', '#fcd34d', '#e2e8f0', '#ffffff'];

  confetti({
    particleCount: 60,
    angle: 90,
    spread: 120,
    startVelocity: 26,
    origin: { x: 0.5, y: 0.05 },
    colors: colors,
    gravity: 0.85,
    scalar: 0.95,
    ticks: 170,
    decay: 0.93,
    zIndex: 1001
  });
}

/**
 * Master dispatcher: triggers the corresponding celebration based on club priority
 * Priority 1 & 4 -> Grand Jackpot
 * Priority 2     -> Big Winner
 * Priority 3     -> Lucky Club
 */
export function triggerConfettiByPriority(priority) {
  const num = Number(priority);
  if (num === 1 || num === 4) {
    fireGrandJackpot();
  } else if (num === 2) {
    fireBigWinner();
  } else {
    fireLuckyClub();
  }
}
