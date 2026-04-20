import './style.css';

const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spin-btn');
const modal = document.getElementById('result-modal');
const resultText = document.getElementById('result-text');
const resultLogo = document.getElementById('result-logo');
const closeModalBtn = document.getElementById('close-modal');

let clubs = [];
let currentAngle = 0;
let isSpinning = false;
let spinVelocity = 0;
let animationFrameId;

/**
 * Initializes the app
 */
async function init() {
  try {
    const response = await fetch('clubs.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch JSON: ${response.status}`);
    }
    clubs = await response.json();
    drawWheel();
  } catch (err) {
    console.error('Error initializing data: ', err);
    // Fallback if fetch fails (e.g., local dev without server)
    clubs = [
      { name: "ERROR LOADING", color: "#000000" },
      { name: "NO DATA", color: "#333333" }
    ];
    drawWheel();
  }
}

/**
 * Draws the spinning wheel
 */
function drawWheel() {
  if (!clubs || clubs.length === 0) return;

  const numSegments = clubs.length;
  const anglePerSegment = (2 * Math.PI) / numSegments;
  const radius = canvas.width / 2;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < numSegments; i++) {
    const startAngle = currentAngle + i * anglePerSegment;
    const endAngle = startAngle + anglePerSegment;

    // Draw segment
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius - 4, startAngle, endAngle);
    ctx.closePath();
    
    ctx.fillStyle = clubs[i].color;
    ctx.fill();

    // Draw inner stroke
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw text
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(startAngle + anglePerSegment / 2);
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff'; // White text on stark background
    ctx.font = 'bold 20px "Helvetica Neue", Helvetica, sans-serif';
    ctx.fillText(clubs[i].name, radius - 30, 0);
    ctx.restore();
  }
}

/**
 * Spins the wheel smoothly using ease-out
 */
function spinWheel() {
  if (isSpinning) return;
  isSpinning = true;

  // Get speed
  const speedElement = document.querySelector('input[name="speed"]:checked');
  const speedValue = speedElement ? speedElement.value : 'normal';
  
  let baseSpins = 5;
  let duration = 5000; // 5 seconds spin
  
  if (speedValue === 'slow') {
    baseSpins = 3;
    duration = 8000;
  } else if (speedValue === 'fast') {
    baseSpins = 10;
    duration = 3000;
  }

  // Random spin amount (+ some extra rotations)
  const randomAdditionalAngle = Math.random() * Math.PI * 2;
  const totalAngleToRotate = (baseSpins * Math.PI * 2) + randomAdditionalAngle;
  
  // Animation variables
  let startTime = null;

  function animate(time) {
    if (!startTime) startTime = time;
    const progress = (time - startTime) / duration;

    if (progress < 1) {
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      currentAngle = totalAngleToRotate * easeOut;
      drawWheel();
      animationFrameId = requestAnimationFrame(animate);
    } else {
      isSpinning = false;
      currentAngle = totalAngleToRotate % (Math.PI * 2);
      drawWheel();
      showResult();
    }
  }

  requestAnimationFrame(animate);
}

/**
 * Calculates the winner based on final angle
 */
function showResult() {
  const numSegments = clubs.length;
  const anglePerSegment = (2 * Math.PI) / numSegments;
  
  // The pointer is at the very top, which corresponds to 270 degrees or -90 degrees in JS Canvas.
  // We need to calculate which sector is under the pointer.
  // In canvas, 0 is at 3 o'clock, growing clockwise. Top is -PI/2 or 3PI/2.
  let normalizedAngle = currentAngle % (2 * Math.PI);
  if (normalizedAngle < 0) {
    normalizedAngle += 2 * Math.PI;
  }
  
  const pointerAngle = (3 * Math.PI) / 2; // 270 degrees
  
  // We want to find i such that: 
  // startAngle = (normalizedAngle + i * anglePerSegment) % 2PI
  // endAngle = startAngle + anglePerSegment
  // and the pointerAngle falls inside [startAngle, endAngle]

  let winningIndex = 0;
  for (let i = 0; i < numSegments; i++) {
    let startAngle = (normalizedAngle + i * anglePerSegment) % (2 * Math.PI);
    let endAngle = startAngle + anglePerSegment;
    
    // Adjust if endAngle crosses the 2PI boundary
    if (endAngle > 2 * Math.PI) {
      if (pointerAngle >= startAngle || pointerAngle < endAngle % (2 * Math.PI)) {
        winningIndex = i;
        break;
      }
    } else {
      if (pointerAngle >= startAngle && pointerAngle < endAngle) {
        winningIndex = i;
        break;
      }
    }
  }

  const winner = clubs[winningIndex];
  resultText.textContent = winner.name;
  
  if (winner.logo) {
    resultLogo.src = winner.logo;
    resultLogo.classList.remove('hidden');
  } else {
    resultLogo.src = "";
    resultLogo.classList.add('hidden');
  }

  modal.classList.remove('hidden');
}

// Event Listeners
spinBtn.addEventListener('click', spinWheel);

closeModalBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Start
init();
