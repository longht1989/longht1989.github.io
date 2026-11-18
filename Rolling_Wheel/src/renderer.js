/**
 * renderer.js - Canvas rendering engine for Gacha Machine & Modern Match Balls
 */

export class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.dpr = window.devicePixelRatio || 1;
    this.width = 400;
    this.height = 420;
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const displayWidth = Math.min(rect.width, 480);
    const displayHeight = rect.height > 0 ? rect.height : Math.min(displayWidth * 1.05, 500);

    this.width = displayWidth;
    this.height = displayHeight;

    this.dpr = window.devicePixelRatio || 1;
    this.canvas.width = Math.floor(this.width * this.dpr);
    this.canvas.height = Math.floor(this.height * this.dpr);

    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.resetTransform?.();
    this.ctx.scale(this.dpr, this.dpr);

    return { width: this.width, height: this.height };
  }

  render(balls, state, chuteWidth = 86) {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    ctx.clearRect(0, 0, w, h);

    // 1. Draw Jar Interior Background
    this.drawJarInterior(ctx, w, h, chuteWidth, state);

    // 2. Draw Balls (Modern Pro Tournament Match Balls)
    for (const ball of balls) {
      this.drawBall(ctx, ball);
    }

    // 3. Draw Glass Jar Highlights & Glare
    this.drawJarGlassOverlay(ctx, w, h, chuteWidth);
  }

  drawJarInterior(ctx, w, h, chuteWidth, state) {
    ctx.save();

    // Jar shape path
    this.createJarPath(ctx, w, h, chuteWidth);
    ctx.clip();

    // Radial gradient for deep capsule background
    const bgGrad = ctx.createRadialGradient(w / 2, h * 0.4, 30, w / 2, h * 0.5, w * 0.7);
    bgGrad.addColorStop(0, '#1f2a44');
    bgGrad.addColorStop(0.7, '#13192b');
    bgGrad.addColorStop(1, '#0c101c');
    ctx.fillStyle = bgGrad;
    ctx.fill();

    // Inner subtle glow border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Draw bottom chute guides
    const chuteX = w / 2;
    const chuteHalf = chuteWidth / 2;
    ctx.strokeStyle = 'rgba(255, 71, 87, 0.45)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(chuteX - chuteHalf - 4, h - 8);
    ctx.lineTo(chuteX - chuteHalf, h);
    ctx.moveTo(chuteX + chuteHalf + 4, h - 8);
    ctx.lineTo(chuteX + chuteHalf, h);
    ctx.stroke();

    ctx.restore();
  }

  /**
   * Draws a modern pro tournament match ball vector directly on Canvas
   * Vibrant, high-end 3D metallic pearl finish with dynamic aerodynamic ribbons
   */
  drawBall(ctx, ball) {
    ctx.save();
    ctx.globalAlpha = ball.opacity;
    ctx.translate(ball.x, ball.y);

    const r = ball.radius;

    // 1. Soft Drop Shadow underneath
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, r * 0.32, r * 0.95, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.filter = 'blur(6px)';
    ctx.fill();
    ctx.filter = 'none';
    ctx.restore();

    // 2. Winner Golden Aura when dropping
    if (ball.isWinner && ball.isDropping) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(0, 0, r * 1.35, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 215, 0, 0.4)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 225, 80, 0.85)';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.restore();
    }

    // 3. Clip everything to the circular ball bounds
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.clip();

    // 3.1 Base Sphere 3D Metallic Pearl Gradient
    const sphereGrad = ctx.createRadialGradient(-r * 0.35, -r * 0.38, r * 0.08, 0, 0, r);
    sphereGrad.addColorStop(0, '#ffffff');
    sphereGrad.addColorStop(0.5, '#f1f5f9');
    sphereGrad.addColorStop(0.85, '#cbd5e1');
    sphereGrad.addColorStop(1, '#64748b');
    ctx.fillStyle = sphereGrad;
    ctx.fill();

    // Ambient bounce light on underside (reflecting neon glow of the jar)
    const ambientGrad = ctx.createRadialGradient(r * 0.3, r * 0.5, 0, r * 0.3, r * 0.5, r * 0.7);
    ambientGrad.addColorStop(0, 'rgba(56, 189, 248, 0.22)');
    ambientGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = ambientGrad;
    ctx.fill();

    // Apply rotation for ball roll & tumble
    ctx.rotate(ball.rotation);

    // 3.2 Dynamic Aerodynamic Chevron Ribbons (Modern Pro Match Ball Style)
    const accent = ball.accentColor || '#ff4757';
    for (let k = 0; k < 5; k++) {
      const angle = -Math.PI / 2 + k * ((2 * Math.PI) / 5);

      ctx.save();
      ctx.rotate(angle);

      // Curved ribbon panel wrapping to outer sphere
      ctx.beginPath();
      ctx.moveTo(r * 0.28, -r * 0.1);
      ctx.bezierCurveTo(r * 0.55, -r * 0.18, r * 0.82, -r * 0.05, r * 0.96, r * 0.22);
      ctx.lineTo(r * 0.78, r * 0.35);
      ctx.bezierCurveTo(r * 0.65, r * 0.15, r * 0.45, 0.05, r * 0.28, 0.08);
      ctx.closePath();

      // Metallic Accent Gradient on ribbon
      const ribbonGrad = ctx.createLinearGradient(r * 0.2, 0, r * 0.9, 0);
      ribbonGrad.addColorStop(0, '#111827');
      ribbonGrad.addColorStop(0.55, accent);
      ribbonGrad.addColorStop(1, '#0f172a');
      ctx.fillStyle = ribbonGrad;
      ctx.fill();

      // Sleek ribbon edge stroke
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.restore();
    }

    // 3.3 Center Star Shield (Dark Chrome Core with Metallic Trim)
    const r0 = r * 0.34;
    ctx.beginPath();
    for (let k = 0; k < 5; k++) {
      const angle = -Math.PI / 2 + k * ((2 * Math.PI) / 5);
      const px = Math.cos(angle) * r0;
      const py = Math.sin(angle) * r0;
      if (k === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();

    const starGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, r0);
    starGrad.addColorStop(0, '#1e293b');
    starGrad.addColorStop(0.85, '#0f172a');
    starGrad.addColorStop(1, '#020617');
    ctx.fillStyle = starGrad;
    ctx.fill();

    ctx.strokeStyle = accent;
    ctx.lineWidth = 1.6;
    ctx.stroke();

    // Center micro-star emblem
    ctx.beginPath();
    ctx.arc(0, 0, r0 * 0.35, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    ctx.restore(); // unclip sphere

    // 4. Ball Outer Rim Stroke (Fine metallic edge)
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(30, 41, 59, 0.45)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 5. Dual 3D Specular Sheen (Curved glass highlight + soft secondary reflection)
    // Primary Top-Left Highlight
    ctx.beginPath();
    ctx.ellipse(-r * 0.28, -r * 0.36, r * 0.36, r * 0.18, -Math.PI / 6, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fill();

    // Secondary Soft Rim Highlight
    ctx.beginPath();
    ctx.ellipse(r * 0.26, r * 0.34, r * 0.24, r * 0.08, -Math.PI / 6, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.fill();

    ctx.restore();
  }

  drawJarGlassOverlay(ctx, w, h, chuteWidth) {
    ctx.save();

    // Glass Jar Border Outline
    this.createJarPath(ctx, w, h, chuteWidth);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Top Rim Collar
    ctx.beginPath();
    ctx.roundRect(w * 0.1, 4, w * 0.8, 12, 6);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Diagonal Glass Reflection Streaks across the Jar
    this.createJarPath(ctx, w, h, chuteWidth);
    ctx.clip();

    ctx.beginPath();
    ctx.moveTo(w * 0.15, 0);
    ctx.lineTo(w * 0.38, 0);
    ctx.lineTo(w * 0.12, h);
    ctx.lineTo(w * 0.04, h);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(w * 0.42, 0);
    ctx.lineTo(w * 0.46, 0);
    ctx.lineTo(w * 0.22, h);
    ctx.lineTo(w * 0.19, h);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.025)';
    ctx.fill();

    ctx.restore();
  }

  createJarPath(ctx, w, h, chuteWidth) {
    const chuteHalf = chuteWidth / 2;
    const chuteX = w / 2;
    const radiusTop = 28;
    const radiusBottom = 32;

    ctx.beginPath();
    ctx.moveTo(radiusTop, 6);
    ctx.lineTo(w - radiusTop, 6);
    ctx.arcTo(w - 6, 6, w - 6, 6 + radiusTop, radiusTop);
    ctx.lineTo(w - 6, h - radiusBottom);
    ctx.arcTo(w - 6, h - 6, w - radiusBottom, h - 6, radiusBottom);
    ctx.lineTo(chuteX + chuteHalf, h - 6);
    ctx.lineTo(chuteX + chuteHalf, h);
    ctx.lineTo(chuteX - chuteHalf, h);
    ctx.lineTo(chuteX - chuteHalf, h - 6);
    ctx.lineTo(radiusBottom, h - 6);
    ctx.arcTo(6, h - 6, 6, h - radiusBottom, radiusBottom);
    ctx.lineTo(6, 6 + radiusTop);
    ctx.arcTo(6, 6, 6 + radiusTop, 6, radiusTop);
    ctx.closePath();
  }
}
