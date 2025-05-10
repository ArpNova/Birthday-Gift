//stars
const starsContainer = document.getElementById('stars-container');

  function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.top = `${Math.random() * 100}vh`;
    star.style.left = `${Math.random() * 100}vw`;
    starsContainer.appendChild(star);
  }

  // Generate 100 stars
  for (let i = 0; i < 75; i++) {
    createStar();
  }






// Balloon Animation
function launchBalloons() {
    const totalBalloons = 45;
    const colors = ['red', 'blue', 'green', 'orange', 'purple'];
  
    for (let i = 0; i < totalBalloons; i++) {
      const container = document.createElement('div');
      container.className = 'balloon-container';
  
      const leftVW = Math.random() * 85 + 5;
      container.style.left = `${leftVW}vw`;
      container.style.animationDelay = (Math.random() * 1.5).toFixed(2) + 's';
  
      const balloonDiv = document.createElement('div');
      balloonDiv.className = 'balloon';
  
      const svgNS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");
      svg.setAttribute("viewBox", "0 0 128 128");
  
      svg.innerHTML = `
          <path d="M75.87 102.1c3 4.9-2.38 10.12 1.85 13.91c7.84 7 17.44-12.05 29.49 7.49" fill="none" stroke="#64b5f6" stroke-width="3" stroke-miterlimit="10"></path>
          <path d="M74.5 106.88l5.63-1a2.86 2.86 0 0 0 2.07-4.1a34.64 34.64 0 0 0-7.2-9.62c-.44 2.89-2.16 7.38-3.62 10.8a2.85 2.85 0 0 0 3.12 3.92z" fill="#f44336"></path>
          <path d="M25.56 51.54C33.14 83.3 64.22 97.75 75.68 95s32.1-32 25.08-61.43C95.79 12.8 74.93 0 54.16 4.97s-33.57 25.83-28.6 46.6v-.03z" fill="#f44336"></path>
          <path d="M73.43 98.11l5.16-1.23c1.63-.39 2.64-2.02 2.25-3.65s-2.02-2.64-3.65-2.25L72 92.21c-1.63.39-2.64 2.02-2.25 3.65s2.02 2.64 3.65 2.25h.03z" fill="#c62828"></path>
          <path d="M78.28 13.44c-4.07-2.48-9.9-4.13-13.2.55c-1.76 2.49-.1 7.15 3.53 8.2c6.14 1.79 7.21 4 8.46 5.79c1.51 2.1 2.94 4.73 5.49 5.14s4-1.51 3.89-5.21c-.02-5.92-3.11-11.4-8.17-14.47z" fill="#ff847a"></path>
      `;
  
      const paths = svg.querySelectorAll('path');
      paths.forEach((path) => {
        path.setAttribute('fill', colors[Math.floor(Math.random() * colors.length)]);
      });
  
      balloonDiv.appendChild(svg);
      container.appendChild(balloonDiv);
      document.body.appendChild(container);
  
      setTimeout(() => container.remove(), 5000);
    }
  }
  
  // Confetti Effect
  function startConfetti() {
    const count = 370;
    const defaults = { origin: { y: 0.7 } };
  
    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }
  
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  
    const duration = 6000;
    const animationEnd = Date.now() + duration;
    let skew = 1;
  
    (function frame() {
      const timeLeft = animationEnd - Date.now();
      const ticks = Math.max(200, 500 * (timeLeft / duration));
      skew = Math.max(0.8, skew - 0.001);
  
      confetti({
        particleCount: 1,
        startVelocity: 0,
        ticks: ticks,
        origin: {
          x: Math.random(),
          y: (Math.random() * skew) - 0.2
        },
        colors: ['#ffffff'],
        shapes: ['circle'],
        gravity: Math.random() * 0.2 + 0.4,
        scalar: Math.random() * 0.6 + 0.4,
        drift: Math.random() * 0.8 - 0.4
      });
  
      if (timeLeft > 0) {
        requestAnimationFrame(frame);
      }
    })();
  }
  
  // Snow Animation
  function startSnow() {
    const snowInterval = setInterval(() => {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      snowflake.textContent = '❄';
      snowflake.style.left = Math.random() * 100 + 'vw';
      snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
      snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
      document.body.appendChild(snowflake);
  
      setTimeout(() => {
        snowflake.remove();
      }, 6000);
    }, 100);
  }
  
  // Sequence on Load
  // window.onload = () => {
  //   launchBalloons();
  
  //   setTimeout(() => {
  //     startConfetti(); // First confetti
  
  //     setTimeout(() => {
  //       startConfetti(); // Second confetti
  
  //       setTimeout(() => {
  //         startSnow(); // Then snow
  //       }, 6000); // wait for second confetti to finish
  
  //     }, 6000); // after first confetti
  //   }, 5000); // after balloons
  // };
  window.onload = () => {
    launchBalloons();
  
    setTimeout(() => {
      startConfetti(); // First confetti
  
      setTimeout(() => {
        startConfetti(); // Second confetti
  
        setTimeout(() => {
          startSnow(); // Then snow
        }, 6000); // wait for second confetti to finish
  
      }, 6000); // after first confetti
    }, 5000); // after balloons
  
    // Show "Happy Birthday" text after 15 seconds
    setTimeout(() => {
      const birthdayText = document.getElementById('birthday-text');
      birthdayText.style.opacity = 1;
    }, 15000);
  };
  
  setTimeout(function() {
    document.getElementById('cake-container').style.display = 'block';
  }, 16000);
  setTimeout(() => {
    document.getElementById('me').style.display = 'block';
    document.getElementById('para').style.display = 'block';

  }, 16000);


