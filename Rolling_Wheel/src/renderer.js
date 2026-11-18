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

    // Radial gradient for deep capsule background (Vegas Casino Velvet & Noir)
    const bgGrad = ctx.createRadialGradient(w / 2, h * 0.38, 20, w / 2, h * 0.52, w * 0.72);
    bgGrad.addColorStop(0, '#380715');
    bgGrad.addColorStop(0.5, '#1e030b');
    bgGrad.addColorStop(1, '#090104');
    ctx.fillStyle = bgGrad;
    ctx.fill();

    // Inner warm gold glow border
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.2)';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Draw bottom chute guides with glowing polished brass/gold
    const chuteX = w / 2;
    const chuteHalf = chuteWidth / 2;
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#ffd700';
    ctx.shadowBlur = 10;
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
   * Draws a 24K Gold Casino Jackpot Orb
   * Deep 3D gold luster, royal ruby center medallion, golden Lucky 7, and diamond star glints
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
    ctx.fillStyle = 'rgba(0, 0, 0, 0.48)';
    ctx.filter = 'blur(6px)';
    ctx.fill();
    ctx.filter = 'none';
    ctx.restore();

    // 2. Winner Golden Jackpot Aura when dropping
    if (ball.isWinner && ball.isDropping) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(0, 0, r * 1.4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 215, 0, 0.35)';
      ctx.fill();
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = 18;
      ctx.stroke();
      ctx.restore();
    }

    // 3. Clip everything to the circular ball bounds
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.clip();

    // 3.1 Base Sphere 3D 24K Polished Gold Gradient
    const sphereGrad = ctx.createRadialGradient(-r * 0.35, -r * 0.4, r * 0.05, 0, 0, r);
    sphereGrad.addColorStop(0, '#ffffff');
    sphereGrad.addColorStop(0.18, '#fff4b8');
    sphereGrad.addColorStop(0.45, '#ffd700');
    sphereGrad.addColorStop(0.75, '#c68a0c');
    sphereGrad.addColorStop(1, '#5a3b02');
    ctx.fillStyle = sphereGrad;
    ctx.fill();

    // Underside warm ruby-crimson bounce reflection
    const ambientGrad = ctx.createRadialGradient(r * 0.35, r * 0.45, 0, r * 0.35, r * 0.45, r * 0.65);
    ambientGrad.addColorStop(0, 'rgba(255, 51, 85, 0.35)');
    ambientGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = ambientGrad;
    ctx.fill();

    // Apply rotation for ball roll & tumble
    ctx.rotate(ball.rotation);

    // 3.2 Casino Roulette / Token Facets (8 radial alternating sheens)
    for (let i = 0; i < 8; i++) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, r * 0.95, (i * Math.PI) / 4, ((i + 1) * Math.PI) / 4);
      ctx.closePath();
      ctx.fillStyle = i % 2 === 0 ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)';
      ctx.fill();
    }

    // 3.3 Golden Coin Rim Dots / Beaded Border
    ctx.save();
    ctx.fillStyle = '#fff4b8';
    ctx.shadowColor = '#3a2501';
    ctx.shadowBlur = 2;
    for (let k = 0; k < 12; k++) {
      const dotAngle = (k * Math.PI) / 6;
      const dx = Math.cos(dotAngle) * (r * 0.76);
      const dy = Math.sin(dotAngle) * (r * 0.76);
      ctx.beginPath();
      ctx.arc(dx, dy, r * 0.045, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 3.4 Inner Medallion: Royal Velvet Ruby Jewel
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.54, 0, Math.PI * 2);
    const rubyGrad = ctx.createRadialGradient(-r * 0.15, -r * 0.15, r * 0.05, 0, 0, r * 0.54);
    rubyGrad.addColorStop(0, '#ff4766');
    rubyGrad.addColorStop(0.5, '#b80f2d');
    rubyGrad.addColorStop(0.85, '#5e0413');
    rubyGrad.addColorStop(1, '#2b0107');
    ctx.fillStyle = rubyGrad;
    ctx.fill();

    // Heavy Gold Bezel Ring around ruby medallion
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 2.2;
    ctx.shadowColor = '#ffd700';
    ctx.shadowBlur = 5;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // 3.5 Center Gold Symbol: Lucky "7"
    ctx.fillStyle = '#ffe680';
    ctx.font = `900 ${Math.round(r * 0.56)}px "Arial Black", Impact, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.75)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 2;
    ctx.fillText('7', 0, r * 0.02);
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    ctx.restore(); // unclip sphere

    // 4. Ball Outer Rim Stroke (Polished Gold Edge)
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.85)';
    ctx.lineWidth = 1.8;
    ctx.stroke();

    // 5. 3D Glass Specular Highlights
    // Primary Curved Glass Highlight (Top-Left)
    ctx.beginPath();
    ctx.ellipse(-r * 0.28, -r * 0.35, r * 0.34, r * 0.16, -Math.PI / 6, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.78)';
    ctx.fill();

    // Diamond 4-Point Star Glint on high shine
    const glintX = -r * 0.36;
    const glintY = -r * 0.38;
    const glintR = r * 0.28;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(glintX, glintY - glintR);
    ctx.quadraticCurveTo(glintX, glintY, glintX + glintR, glintY);
    ctx.quadraticCurveTo(glintX, glintY, glintX, glintY + glintR);
    ctx.quadraticCurveTo(glintX, glintY, glintX - glintR, glintY);
    ctx.quadraticCurveTo(glintX, glintY, glintX, glintY - glintR);
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#ffd700';
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.restore();

    // Secondary Soft Rim Reflection (Bottom-Right)
    ctx.beginPath();
    ctx.ellipse(r * 0.28, r * 0.35, r * 0.24, r * 0.08, -Math.PI / 6, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 215, 0, 0.35)';
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
    ctx.fillStyle = 'rgba(255, 215, 0, 0.15)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.55)';
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
