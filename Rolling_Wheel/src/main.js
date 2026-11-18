/**
 * main.js - Application entry point
 */
import { GachaMachine } from './gacha.js';
import { SoundManager } from './sound.js';

const canvas = document.getElementById('gacha-canvas');
const spinBtn = document.getElementById('spin-btn');
const soundToggleBtn = document.getElementById('sound-toggle');
const modal = document.getElementById('result-modal');
const resultText = document.getElementById('result-text');
const resultLogo = document.getElementById('result-logo');
const closeModalBtn = document.getElementById('close-modal');

const soundManager = new SoundManager();
let gacha = null;
let clubs = [];

/**
 * Robust JSON fetcher handling relative paths for both dev and prod GitHub Pages
 */
async function fetchClubsData() {
  const candidateUrls = [
    './public/clubs.json',
    './clubs.json',
    'public/clubs.json',
    'clubs.json'
  ];

  for (const url of candidateUrls) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      // Continue to next candidate
    }
  }

  throw new Error('Unable to load clubs.json');
}

/**
 * Initializes the application
 */
async function init() {
  try {
    clubs = await fetchClubsData();
  } catch (err) {
    console.error('Error loading clubs data:', err);
    // Fallback minimal data if fetch fails
    clubs = [
      { name: "REAL MADRID", color: "#000000", priority: 1 },
      { name: "BARCELONA", color: "#1A1A1A", priority: 1 },
      { name: "MANCHESTER UNITED", color: "#111111", priority: 1 },
      { name: "ARSENAL", color: "#141414", priority: 1 },
      { name: "LIVERPOOL", color: "#1F1F1F", priority: 1 }
    ];
  }

  // Preload sound assets non-blockingly (Web Audio fallback is always ready)
  Promise.all([
    soundManager.load('bounce', ['./public/sounds/bounce.wav', './sounds/bounce.wav', 'public/sounds/bounce.wav']),
    soundManager.load('rumble', ['./public/sounds/rumble.wav', './sounds/rumble.wav', 'public/sounds/rumble.wav']),
    soundManager.load('drop',   ['./public/sounds/drop.wav',   './sounds/drop.wav',   'public/sounds/drop.wav']),
    soundManager.load('reveal', ['./public/sounds/reveal.wav', './sounds/reveal.wav', 'public/sounds/reveal.wav']),
  ]).catch(() => {});

  // Instantiate Gacha Machine
  try {
    gacha = new GachaMachine(canvas, clubs, soundManager, {
      preloadLogo: preloadWinnerLogo,
      onReveal: (winner, loadedLogo) => {
        showResult(winner, loadedLogo);
      }
    });

    await gacha.init();
  } catch (err) {
    console.error('Failed to init GachaMachine:', err);
  }

  // Set initial sound button state from persisted preference
  soundToggleBtn.textContent = soundManager.isMuted ? '🔇' : '🔊';
  soundToggleBtn.setAttribute('aria-label', soundManager.isMuted ? 'Bật âm thanh' : 'Tắt âm thanh');

  setupEventListeners();
}

/**
 * Preloads the winning club's logo safely with candidates fallback
 */
async function preloadWinnerLogo(winner) {
  if (!winner || !winner.logo) return null;
  const candidates = [];
  const raw = winner.logo;
  if (raw.startsWith('public/')) {
    candidates.push('./' + raw.replace(/^public\//, ''));
    candidates.push('./' + raw);
  } else {
    candidates.push('./' + raw);
    candidates.push('./public/' + raw);
  }

  for (const src of candidates) {
    const loadedImg = await new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
      // Safety timeout so it never blocks forever
      setTimeout(() => resolve(null), 1800);
    });
    if (loadedImg) return loadedImg;
  }
  return null;
}

function showResult(winner, loadedLogo) {
  resultText.textContent = winner.name;

  if (loadedLogo && loadedLogo.src) {
    resultLogo.src = loadedLogo.src;
    resultLogo.classList.remove('hidden');
  } else if (winner.logo) {
    resultLogo.src = winner.logo.startsWith('./') ? winner.logo : './' + winner.logo;
    resultLogo.classList.remove('hidden');
  } else {
    resultLogo.src = '';
    resultLogo.classList.add('hidden');
  }

  modal.classList.remove('hidden');
  // A11y focus management
  setTimeout(() => closeModalBtn.focus(), 50);
}

function closeModal() {
  modal.classList.add('hidden');
  if (gacha) {
    gacha.reset();
  }
  // Re-enable spin button
  spinBtn.disabled = false;
  const btnText = spinBtn.querySelector('.btn-text');
  if (btnText) btnText.textContent = 'QUAY MÁY';
  // Return focus to spin button
  spinBtn.focus();
}

function setupEventListeners() {
  // Reset animation time when returning to active tab
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && gacha) {
      gacha.lastTime = performance.now();
    }
  });
  // Spin button click
  spinBtn.addEventListener('click', async () => {
    if (spinBtn.disabled) return;

    // Unlock Web Audio context on user gesture
    soundManager.ensureAudioContext();

    spinBtn.disabled = true;
    const btnText = spinBtn.querySelector('.btn-text');
    if (btnText) btnText.textContent = 'ĐANG QUAY...';

    const started = await gacha.start();
    if (!started) {
      spinBtn.disabled = false;
      if (btnText) btnText.textContent = 'QUAY MÁY';
    }
  });

  // Sound toggle button
  soundToggleBtn.addEventListener('click', () => {
    soundManager.ensureAudioContext();
    const isMuted = soundManager.toggleMute();
    soundToggleBtn.textContent = isMuted ? '🔇' : '🔊';
    soundToggleBtn.setAttribute('aria-label', isMuted ? 'Bật âm thanh' : 'Tắt âm thanh');
  });

  // Close modal button
  closeModalBtn.addEventListener('click', closeModal);

  // Close on modal background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Window resize handler
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (gacha) {
        gacha.resize();
      }
    }, 150);
  });
}

// Start application
init();
