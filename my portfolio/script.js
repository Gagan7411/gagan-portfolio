// ===== Shooting Stars Background =====
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let shootingStars = [];

// Create twinkling stars
class Star {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2;
    this.opacity = Math.random();
    this.opacityChange = 0.005;
  }

  update() {
    this.opacity += this.opacityChange;
    if (this.opacity <= 0 || this.opacity >= 1) {
      this.opacityChange *= -1;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(56,189,248,${this.opacity})`;
    ctx.fill();
  }
}

// Shooting Star
class ShootingStar {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = 0;
    this.length = Math.random() * 80 + 40;
    this.speed = Math.random() * 10 + 8;
    this.angle = Math.PI / 4; // diagonal
    this.opacity = 1;
  }

  update() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);
    this.opacity -= 0.02;
  }

  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = `rgba(56,189,248,${this.opacity})`;
    ctx.lineWidth = 2;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.length * Math.cos(this.angle), this.y - this.length * Math.sin(this.angle));
    ctx.stroke();
    ctx.restore();
  }
}

function initStars() {
  stars = [];
  for (let i = 0; i < 150; i++) {
    stars.push(new Star());
  }
}

function createShootingStar() {
  shootingStars.push(new ShootingStar());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw stars
  stars.forEach(star => {
    star.update();
    star.draw();
  });

  // Draw shooting stars
  for (let i = 0; i < shootingStars.length; i++) {
    shootingStars[i].update();
    shootingStars[i].draw();

    if (shootingStars[i].opacity <= 0) {
      shootingStars.splice(i, 1);
      i--;
    }
  }

  requestAnimationFrame(animate);
}

setInterval(createShootingStar, 1000); // every 1 seconds
initStars();
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initStars();
});

// ===== Scroll Animation =====
const fadeSections = document.querySelectorAll('.fade-section');

window.addEventListener('scroll', () => {
  const triggerBottom = window.innerHeight * 0.85;
  fadeSections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < triggerBottom) {
      section.classList.add('visible');
    }
  });
});

// ===== Scroll To Top Button =====
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// ===== Chatbot Logic =====
const chatbotContainer = document.querySelector('.chatbot-container');
const chatbotFloatBtn = document.getElementById('chatbotFloatBtn');
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');

// Toggle chatbot visibility
chatbotFloatBtn.addEventListener('click', () => {
  chatbotContainer.style.display = 'flex';
  chatbotFloatBtn.style.display = 'none';
});

chatbotToggle.addEventListener('click', () => {
  chatbotContainer.style.display = 'none';
  chatbotFloatBtn.style.display = 'block';
});

// FAQ Responses
const faqResponses = {
  "hello": "Hi there! 👋 I'm Gagan's portfolio assistant. Ask me about his skills, projects, or contact info.",
  "hi": "Hi there! 👋 I'm Gagan's portfolio assistant. Ask me about his skills, projects, or contact info.",
  "skills": "Gagan's top skills: Python, AI/ML, SQL, Node.js, MongoDB,  Docker.",
  "projects": "Gagan has worked on: 1. AI Voice Assistant, 2. Dental Clinic Website, 3. AI Insight Pen.",
  "contact": "You can reach Gagan at: mgagan8792@gmail.com or call 7411685451.",
  "resume": "You can download Gagan's resume from the top of the page 📄."
};

// Send message
function sendMessage(message, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', sender);
  msgDiv.innerText = message;
  chatbotMessages.appendChild(msgDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// User message handling
chatbotSend.addEventListener('click', () => {
  const userMsg = chatbotInput.value.trim().toLowerCase();
  if (!userMsg) return;

  sendMessage(chatbotInput.value, 'user');
  chatbotInput.value = '';

  // Bot response
  setTimeout(() => {
    let response = faqResponses[userMsg] || "Sorry, I didn't understand that. Try asking about skills, projects, or contact.";
    sendMessage(response, 'bot');
  }, 600);
});

// Allow Enter key to send
chatbotInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    chatbotSend.click();
  }
});



