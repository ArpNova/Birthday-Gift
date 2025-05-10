onload = () => {
    const c = setTimeout(() => {
      document.body.classList.remove("not-loaded");
      clearTimeout(c);
    }, 1000);
  };
  
  const canvas = document.getElementById('stars');
  const ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  let stars = [];
  
  for (let i = 0; i < 100; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      delta: Math.random() * 0.02
    });
  }
  
  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
      ctx.fill();
      star.alpha += star.delta;
      if (star.alpha <= 0 || star.alpha >= 1) star.delta *= -1;
    });
    requestAnimationFrame(drawStars);
  }
  drawStars();
  
  
  document.getElementById("flowerColor").addEventListener("input", (e) => {
    const color = e.target.value;
    document.querySelectorAll(".flower__leaf").forEach((el) => {
      el.style.backgroundColor = color;
      el.style.backgroundImage = "none"; // disable gradient to show solid color
    });
  });
  


  document.getElementById("grassColor").addEventListener("input", (e) => {
    const color = e.target.value;
  
    // Top part of main grass blades
    document.querySelectorAll(".flower__grass--top").forEach((el) => {
      el.style.borderRightColor = color;
    });
  
    // Bottom part of the stalks
    document.querySelectorAll(".flower__grass--bottom").forEach((el) => {
      el.style.backgroundImage = `linear-gradient(to top, transparent, ${color})`;
    });
  
    // Very long foreground grass blades (like in the center and corners)
    document.querySelectorAll(".long-g .leaf").forEach((el) => {
      el.style.borderLeftColor = color;
    });
  });
  
  function goToNextPage() {
  window.location.href = "index3.html";
}