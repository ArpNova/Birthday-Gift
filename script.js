




const style = document.createElement("style");
style.textContent = `
@keyframes riseUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;
document.head.appendChild(style);



const app = new PIXI.Application();
await app.init({
  resizeTo: window,
  antialias: true,
  autoDensity: true,
  backgroundAlpha: 0,
});
document.body.appendChild(app.canvas);

// Limit FPS for performance
app.ticker.maxFPS = 30;

// Preload and cache texture
await PIXI.Assets.load("flower4.png");
const flowerTexture = PIXI.Texture.from("flower4.png");

// Constants
const MAX_FLOWERS = 400;
const FLOWER_SIZE = 50;
const SPAWN_INTERVAL = 0.15;0 // seconds between flower spawns

// Mouse tracking
let mouseX = 0;
let mouseY = 0;
let isMouseMoving = false;

// Time buffer
let bufferFrameTime = 0;

// Spawn flowers at intervals
app.ticker.add((ticker) => {
  bufferFrameTime += ticker.deltaTime / 60;

  if (bufferFrameTime >= SPAWN_INTERVAL && isMouseMoving) {
    bufferFrameTime = 0;
    spawnFlower(mouseX, mouseY);
  }
});


function spawnFlower(x, y) {
  if (app.stage.children.length >= MAX_FLOWERS) {
    app.stage.removeChildAt(0); // remove oldest
  }

  const sprite = new PIXI.Sprite(flowerTexture);

  // Generate a random size between 30 and 160
  const size = Math.random() * 220 + 30; // 30px to 160px
  sprite.width = sprite.height = size;

  sprite.x = x - size / 2;
  sprite.y = y - size;

  app.stage.addChild(sprite);
}

function drawCursorTrail(x, y) {
  const dot = new PIXI.Graphics();

  const size = 2 + Math.random() * 2; // tiny dot 2–4 px
  dot.beginFill(0xffffff, 0.6); // white with some transparency
  dot.drawCircle(0, 0, size);
  dot.endFill();

  dot.x = x;
  dot.y = y;

  app.stage.addChild(dot);

  // Fade out and remove after a short time (e.g., 500ms)
  setTimeout(() => {
    app.stage.removeChild(dot);
  }, 500);
}



// Track pointer (mouse or finger)
document.addEventListener("mousemove", handleMove);
document.addEventListener("touchmove", handleTouchMove, { passive: true });


function handleMove(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  drawCursorTrail(mouseX, mouseY);
  triggerMoving();
}

function handleTouchMove(e) {
  const touch = e.touches[0];
  mouseX = touch.clientX;
  mouseY = touch.clientY;
  drawCursorTrail(mouseX, mouseY);
  triggerMoving();
}


// Detect when movement stops
let stopTimeout;
function triggerMoving() {
  isMouseMoving = true;
  clearTimeout(stopTimeout);
  stopTimeout = setTimeout(() => {
    isMouseMoving = false;
  }, 100);
}

// Create a container div for UI elements
const uiContainer = document.createElement("div");
uiContainer.style.position = "fixed";
uiContainer.style.top = "50%";
uiContainer.style.left = "50%";
uiContainer.style.transform = "translate(-50%, -50%)";
uiContainer.style.zIndex = "10";
uiContainer.style.textAlign = "center";

document.body.appendChild(uiContainer);



const headingText = "Wander Freely And Let The World Respond To Your Touch";
const heading = document.createElement("h1");
heading.style.display = "flex";
heading.style.flexWrap = "wrap";
heading.style.justifyContent = "center";
heading.style.gap = "9px"; // spacing between words
heading.style.color = "white";
heading.style.fontFamily = "sans-serif";
heading.style.fontSize = "42px";
heading.style.marginBottom = "20px";
heading.style.textAlign = "center";
heading.style.zIndex = "10";

// Split by words, then letters
headingText.split(" ").forEach((word, wordIndex) => {
  const wordSpan = document.createElement("span");
  wordSpan.style.display = "inline-flex";

  word.split("").forEach((char, charIndex) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.style.opacity = 0;
    span.style.transform = "translateY(20px)";
    span.style.display = "inline-block";
    span.style.animation = `riseUp 0.5s forwards`;
    span.style.animationDelay = `${(wordIndex * 5 + charIndex) * 0.05}s`;
    span.style.textShadow = "0 0 2px #fff8e1, 0 0 6px #ffb347";
    wordSpan.appendChild(span);
  });

  heading.appendChild(wordSpan);
});

uiContainer.appendChild(heading);

const button = document.createElement("button");
button.innerText = "Next";
button.style.padding = "10px 20px";
button.style.fontSize = "26px";
button.style.border = "none";
button.style.borderRadius = "20px";
button.style.cursor = "pointer";
button.style.backgroundColor = "#ff69b4";
button.style.color = "white";

// Hide initially and apply transition
button.style.opacity = "0";
button.style.transition = "opacity 1s";

// Add click handler
button.onclick = () => {
  window.location.href = "index2.html";
};
// function goToNextPage() {
//   window.location.href = "index2.html";
// }

uiContainer.appendChild(button);

// Show after 3 seconds
setTimeout(() => {
  button.style.opacity = "1";
}, 20000);










//cloud test temp
// const app = new PIXI.Application({ 
//   resizeTo: window, 
//   backgroundColor: 0x000000 
// });
// document.body.appendChild(app.view);

// // Load the cloud image
// PIXI.Assets.load("cloud.png").then(() => {
//   const clouds = [];

//   // Create multiple clouds
//   for (let i = 0; i < 5; i++) {
//       const cloud = PIXI.Sprite.from("cloud.png");

//       // Random position & scale
//       cloud.x = Math.random() * app.screen.width;
//       cloud.y = Math.random() * app.screen.height * 0.5; // top half
//       cloud.alpha = 0.6;
//       cloud.scale.set(0.3 + Math.random() * 0.5);
//       cloud.speed = 0.2 + Math.random() * 0.3;

//       app.stage.addChild(cloud);
//       clouds.push(cloud);
//   }

//   // Animate clouds
//   app.ticker.add(() => {
//       clouds.forEach(cloud => {
//           cloud.x += cloud.speed;

//           // Loop cloud back to start when off screen
//           if (cloud.x > app.screen.width) {
//               cloud.x = -cloud.width;
//               cloud.y = Math.random() * app.screen.height * 0.5;
//           }
//       });
//   });
// });
