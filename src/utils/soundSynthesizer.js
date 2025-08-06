class SoundSynthesizer {
  constructor() {
    this.audioContext = null;
  }

  initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      // Resume context if it's not running (needed for some browsers)
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
    }
    return this.audioContext;
  }

  // Method to explicitly resume audio context
  resumeAudioContext() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  createClickSound(frequency = 2000, duration = 0.05) {
    const ctx = this.initAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

    // Quick fade out for click sound
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  }

  createHoverSound(frequency = 1500, duration = 0.1) {
    const ctx = this.initAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.5, ctx.currentTime + duration);

    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  }

  createAmbientDrone(baseFrequency = 220, duration = 2) {
    const ctx = this.initAudioContext();
    const oscillators = [];
    const gainNodes = [];

    // Create multiple oscillators for a rich texture
    const frequencies = [
      baseFrequency,
      baseFrequency * 1.5,
      baseFrequency * 2,
      baseFrequency * 2.5,
    ];

    frequencies.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const pan = ctx.createStereoPanner();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Add slight frequency modulation
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(
        freq * (1 + Math.random() * 0.1),
        ctx.currentTime + duration
      );

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);

      // Random panning for spatial effect
      pan.pan.setValueAtTime(Math.random() * 2 - 1, ctx.currentTime);

      osc.connect(gain);
      gain.connect(pan);
      pan.connect(ctx.destination);

      oscillators.push(osc);
      gainNodes.push(gain);
    });

    oscillators.forEach((osc) => osc.start(ctx.currentTime));
    oscillators.forEach((osc) => osc.stop(ctx.currentTime + duration));
  }

  createSuccessSound() {
    const ctx = this.initAudioContext();
    const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5

    frequencies.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.1);

      gain.gain.setValueAtTime(0, ctx.currentTime + index * 0.1);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + index * 0.1 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + index * 0.1 + 0.3);

      osc.start(ctx.currentTime + index * 0.1);
      osc.stop(ctx.currentTime + index * 0.1 + 0.3);
    });
  }
}

export const soundSynth = new SoundSynthesizer();
