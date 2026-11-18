/**
 * renderer.js - Canvas rendering engine for Gacha Machine & UEFA Starball
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

    // 2. Draw Balls (UEFA Champions League Starballs)
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

    // Radial gradient for deep capsule background (Midnight Blue / Deep Navy)
    const bgGrad = ctx.createRadialGradient(w / 2, h * 0.38, 25, w / 2, h * 0.52, w * 0.72);
    bgGrad.addColorStop(0, '#151e36');
    bgGrad.addColorStop(0.55, '#0b1122');
    bgGrad.addColorStop(1, '#050813');
    ctx.fillStyle = bgGrad;
    ctx.fill();

    // Inner subtle glow border
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.12)';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Draw bottom chute guides with electric cyan glow
    const chuteX = w / 2;
    const chuteHalf = chuteWidth / 2;
    ctx.strokeStyle = '#00f2fe';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#00f2fe';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(chuteX - chuteHalf - 4, h - 8);
    ctx.lineTo(chuteX - chuteHalf, h);
    ctx.moveTo(chuteX + chuteHalf + 4, h - 8);
    ctx.lineTo(chuteX + chuteHalf, h);
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.restore();
  }

  /**
   * Draws a UEFA Champions League Midnight Cyan Starball
   * 3D Metallic Pearl base with interlocking Cyan-Indigo stars and chrome silver seams
   */
  drawBall(ctx, ball) {
    ctx.save();
    ctx.globalAlpha = ball.opacity;
    ctx.translate(ball.x, ball.y);

    const r = ball.radius;

    // 1. Soft Drop Shadow underneath
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, r * 0.3, r * 0.95, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.42)';
    ctx.filter = 'blur(6px)';
    ctx.fill();
    ctx.filter = 'none';
    ctx.restore();

    // 2. Winner Golden-Cyan Aura when dropping
    if (ball.isWinner && ball.isDropping) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(0, 0, r * 1.35, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 242, 254, 0.35)';
      ctx.fill();
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#00f2fe';
      ctx.shadowBlur = 14;
      ctx.stroke();
      ctx.restore();
    }

    // 3. Clip everything to the circular ball bounds
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.clip();

    // 3.1 Base Sphere 3D Metallic Pearl Gradient
    const sphereGrad = ctx.createRadialGradient(-r * 0.35, -r * 0.4, r * 0.08, 0, 0, r);
    sphereGrad.addColorStop(0, '#ffffff');
    sphereGrad.addColorStop(0.45, '#f1f5f9');
    sphereGrad.addColorStop(0.8, '#cbd5e1');
    sphereGrad.addColorStop(1, '#64748b');
    ctx.fillStyle = sphereGrad;
    ctx.fill();

    // Underside ambient cyan rim bounce reflection
    const ambientGrad = ctx.createRadialGradient(r * 0.35, r * 0.45, 0, r * 0.35, r * 0.45, r * 0.65);
    ambientGrad.addColorStop(0, 'rgba(0, 242, 254, 0.28)');
    ambientGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = ambientGrad;
    ctx.fill();

    // Apply rotation for ball roll & tumble
    ctx.rotate(ball.rotation);

    // 3.2 UEFA Champions League Starball Pattern
    // Function to draw a 5-pointed star path
    const drawStarPath = (cx, cy, outerR, innerR, rot = 0) => {
      ctx.beginPath();
      for (let k = 0; k < 10; k++) {
        const rad = k % 2 === 0 ? outerR : innerR;
        const angle = -Math.PI / 2 + rot + k * (Math.PI / 5);
        const px = cx + Math.cos(angle) * rad;
        const py = cy + Math.sin(angle) * rad;
        if (k === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    // Style for the Midnight Cyan Star Gradient
    const createStarGrad = (cx, cy, size) => {
      const g = ctx.createLinearGradient(cx - size * 0.8, cy - size * 0.8, cx + size * 0.8, cy + size * 0.8);
      g.addColorStop(0, '#040d21');
      g.addColorStop(0.45, '#0a235c');
      g.addColorStop(0.82, '#00d2ff');
      g.addColorStop(1, '#00f2fe');
      return g;
    };

    // A) Central Star
    const centerStarR = r * 0.46;
    const centerStarInnerR = r * 0.21;
    drawStarPath(0, 0, centerStarR, centerStarInnerR, 0);

    ctx.fillStyle = createStarGrad(0, 0, centerStarR);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.4;
    ctx.stroke();

    // Center star inner neon core
    drawStarPath(0, 0, centerStarR * 0.45, centerStarInnerR * 0.45, 0);
    ctx.fillStyle = 'rgba(0, 242, 254, 0.4)';
    ctx.fill();

    // B) 5 Interlocking Surrounding Stars
    const outerDist = r * 0.86;
    const outerStarR = r * 0.48;
    const outerStarInnerR = r * 0.22;

    for (let m = 0; m < 5; m++) {
      const starAngle = -Math.PI / 2 + Math.PI / 5 + m * ((2 * Math.PI) / 5);
      const sx = Math.cos(starAngle) * outerDist;
      const sy = Math.sin(starAngle) * outerDist;

      // Inward orientation
      const starRot = starAngle + Math.PI;
      drawStarPath(sx, sy, outerStarR, outerStarInnerR, starRot);

      ctx.fillStyle = createStarGrad(sx, sy, outerStarR);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = 1.4;
      ctx.stroke();
    }

    ctx.restore(); // unclip sphere

    // 4. Ball Outer Rim Stroke (Fine silver-blue edge)
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(15, 23, 42, 0.5)';
    ctx.lineWidth = 1.6;
    ctx.stroke();

    // 5. Dual 3D Glass Specular Highlights
    // Primary Curved Glass Highlight (Top-Left)
    ctx.beginPath();
    ctx.ellipse(-r * 0.28, -r * 0.35, r * 0.36, r * 0.18, -Math.PI / 6, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.fill();

    // Secondary Soft Rim Reflection (Bottom-Right)
    ctx.beginPath();
    ctx.ellipse(r * 0.28, r * 0.35, r * 0.25, r * 0.09, -Math.PI / 6, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 242, 254, 0.3)';
    ctx.fill();

    ctx.restore();
  }

  drawJarGlassOverlay(ctx, w, h, chuteWidth) {
    ctx.save();

    // Glass Jar Border Outline with chrome-silver glow
    this.createJarPath(ctx, w, h, chuteWidth);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Top Rim Collar
    ctx.beginPath();
    ctx.roundRect(w * 0.1, 4, w * 0.8, 12, 6);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.35)';
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
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(w * 0.42, 0);
    ctx.lineTo(w * 0.46, 0);
    ctx.lineTo(w * 0.22, h);
    ctx.lineTo(w * 0.19, h);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
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
