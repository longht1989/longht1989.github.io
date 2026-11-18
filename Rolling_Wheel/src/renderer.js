/**
 * renderer.js - Canvas rendering engine for Gacha Machine & Balls
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
    // Maintain a sleek aspect ratio (around 1:1.05)
    const displayWidth = Math.min(rect.width, 480);
    const displayHeight = Math.min(displayWidth * 1.05, 500);

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

  render(balls, state, chuteWidth = 70) {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    ctx.clearRect(0, 0, w, h);

    // 1. Draw Jar Interior Background
    this.drawJarInterior(ctx, w, h, chuteWidth, state);

    // 2. Draw Balls
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

    // Inner shadow at the edges
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Draw bottom chute guides
    const chuteX = w / 2;
    const chuteHalf = chuteWidth / 2;
    ctx.strokeStyle = 'rgba(233, 69, 96, 0.4)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(chuteX - chuteHalf - 4, h - 8);
    ctx.lineTo(chuteX - chuteHalf, h);
    ctx.moveTo(chuteX + chuteHalf + 4, h - 8);
    ctx.lineTo(chuteX + chuteHalf, h);
    ctx.stroke();

    ctx.restore();
  }

  drawBall(ctx, ball) {
    ctx.save();
    ctx.globalAlpha = ball.opacity;
    ctx.translate(ball.x, ball.y);
    ctx.rotate(ball.rotation);

    const r = ball.radius;

    // 1. Soft Shadow
    ctx.save();
    ctx.rotate(-ball.rotation); // un-rotate shadow
    ctx.beginPath();
    ctx.arc(0, r * 0.25, r * 0.95, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.filter = 'blur(4px)';
    ctx.fill();
    ctx.filter = 'none';
    ctx.restore();

    // 2. Winner Glow if dropping
    if (ball.isWinner && ball.isDropping) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(0, 0, r * 1.35, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 215, 0, 0.35)';
      ctx.fill();
      ctx.restore();
    }

    // 3. Base Ball Sphere with 3D Radial Gradient
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);

    const sphereGrad = ctx.createRadialGradient(-r * 0.3, -r * 0.35, r * 0.1, 0, 0, r);
    sphereGrad.addColorStop(0, '#ffffff');
    sphereGrad.addColorStop(0.3, ball.color);
    sphereGrad.addColorStop(1, '#090a0f');
    ctx.fillStyle = sphereGrad;
    ctx.fill();

    // 4. White Center Circle for Crisp Logo Placement
    const badgeR = r * 0.65;
    ctx.beginPath();
    ctx.arc(0, 0, badgeR, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // 5. Logo / Monogram
    if (ball.logoImg && ball.logoImg.complete && ball.logoImg.naturalWidth !== 0) {
      ctx.save();
      // Clip to circular badge
      ctx.beginPath();
      ctx.arc(0, 0, badgeR - 1, 0, Math.PI * 2);
      ctx.clip();

      const logoSize = badgeR * 1.55;
      ctx.drawImage(ball.logoImg, -logoSize / 2, -logoSize / 2, logoSize, logoSize);
      ctx.restore();
    } else {
      // Fallback: Club name initials
      const initials = (ball.club.name || 'FC')
        .split(' ')
        .map(w => w[0])
        .slice(0, 3)
        .join('');
      ctx.fillStyle = '#111111';
      ctx.font = `bold ${Math.floor(badgeR * 0.7)}px "Helvetica Neue", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(initials, 0, 0);
    }

    // 6. Gloss Specular Highlight (Curved 3D sheen)
    ctx.beginPath();
    ctx.ellipse(-r * 0.28, -r * 0.35, r * 0.38, r * 0.2, -Math.PI / 6, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
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
    // Top-left
    ctx.moveTo(radiusTop, 6);
    // Top line
    ctx.lineTo(w - radiusTop, 6);
    // Top-right corner
    ctx.arcTo(w - 6, 6, w - 6, 6 + radiusTop, radiusTop);
    // Right wall
    ctx.lineTo(w - 6, h - radiusBottom);
    // Bottom-right corner
    ctx.arcTo(w - 6, h - 6, w - radiusBottom, h - 6, radiusBottom);
    // Bottom right floor
    ctx.lineTo(chuteX + chuteHalf, h - 6);
    // Chute dip opening
    ctx.lineTo(chuteX + chuteHalf, h);
    ctx.lineTo(chuteX - chuteHalf, h);
    ctx.lineTo(chuteX - chuteHalf, h - 6);
    // Bottom left floor
    ctx.lineTo(radiusBottom, h - 6);
    // Bottom-left corner
    ctx.arcTo(6, h - 6, 6, h - radiusBottom, radiusBottom);
    // Left wall
    ctx.lineTo(6, 6 + radiusTop);
    // Top-left corner
    ctx.arcTo(6, 6, 6 + radiusTop, 6, radiusTop);
    ctx.closePath();
  }
}
