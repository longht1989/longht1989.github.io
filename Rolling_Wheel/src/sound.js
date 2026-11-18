/**
 * sound.js - Sound Manager for Football Gacha Machine
 * Supports audio file playback with Web Audio API fallback synthesizer
 */
export class SoundManager {
  constructor() {
    this.sounds = {};
    let savedMute = false;
    try {
      savedMute = localStorage.getItem('football_gacha_muted') === 'true';
    } catch (e) {}
    this.isMuted = savedMute;
    this.audioCtx = null;
    this.lastBounceTime = 0;
    this.activeRumbleSource = null;
  }

  /**
   * Initializes or resumes the AudioContext on first user interaction
   */
  ensureAudioContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
  }

  /**
   * Preloads a sound effect from URL
   */
  async load(name, urls) {
    const urlList = Array.isArray(urls) ? urls : [urls];
    for (const url of urlList) {
      try {
        const audio = new Audio();
        audio.preload = 'auto';
        audio.src = url;
        
        await new Promise((resolve, reject) => {
          audio.oncanplaythrough = resolve;
          audio.onerror = reject;
          // Timeout after 1.5s to avoid blocking
          setTimeout(resolve, 1500);
        });

        this.sounds[name] = audio;
        return;
      } catch (e) {
        // Continue to next URL candidate
      }
    }
  }

  /**
   * Plays a sound effect
   */
  play(name, options = {}) {
    if (this.isMuted) return;
    this.ensureAudioContext();

    const { loop = false, volume = 1.0 } = options;
    const audio = this.sounds[name];

    if (audio) {
      try {
        audio.currentTime = 0;
        audio.loop = loop;
        audio.volume = Math.max(0, Math.min(1, volume));
        const playPromise = audio.play();
        if (playPromise) {
          playPromise.catch(() => {
            this.playSynthesized(name, options);
          });
        }
        return;
      } catch (err) {
        // Fall back to Web Audio synth
      }
    }

    this.playSynthesized(name, options);
  }

  /**
   * Stops a sound effect
   */
  stop(name) {
    const audio = this.sounds[name];
    if (audio) {
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch (e) {}
    }

    if (name === 'rumble' && this.activeRumbleSource) {
      try {
        this.activeRumbleSource.stop();
      } catch (e) {}
      this.activeRumbleSource = null;
    }
  }

  /**
   * Throttled bounce sound so rapid ball collisions don't sound harsh
   */
  playBounce(volume = 0.35) {
    if (this.isMuted) return;
    const now = performance.now();
    if (now - this.lastBounceTime > 75) {
      this.lastBounceTime = now;
      this.play('bounce', { volume });
    }
  }

  /**
   * Built-in Web Audio API synthesizer fallback
   */
  playSynthesized(name, { loop = false, volume = 1.0 } = {}) {
    if (this.isMuted || !this.audioCtx) return;
    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    if (name === 'bounce') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.08);

      gain.gain.setValueAtTime(volume * 0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);

    } else if (name === 'rumble') {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(55, now);
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(80, now);

      gain.gain.setValueAtTime(volume * 0.35, now);
      if (!loop) {
        gain.gain.exponentialRampToValueAtTime(0.01, now + 1.8);
      }

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      if (!loop) {
        osc1.stop(now + 1.8);
        osc2.stop(now + 1.8);
      } else {
        this.activeRumbleSource = {
          stop: () => {
            try {
              osc1.stop();
              osc2.stop();
            } catch (e) {}
          }
        };
      }

    } else if (name === 'drop') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.35);

      gain.gain.setValueAtTime(volume * 0.6, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);

    } else if (name === 'reveal') {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const noteStart = now + idx * 0.12;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(volume * 0.3, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(noteStart);
        osc.stop(noteStart + 0.8);
      });
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    try {
      localStorage.setItem('football_gacha_muted', String(this.isMuted));
    } catch (e) {}
    if (this.isMuted) {
      this.stop('rumble');
    }
    return this.isMuted;
  }
}
