/* =*=*=*=*=*=*=*=*=*=*= Initialization =*=*=*=*=*=*=*=*=*=*= */

// IMPORTANT: always keep the length even
const APPS = [
  {
    link: "https://github.com",
    name: "GitHub"
  },
  {
    link: "https://stackoverflow.com",
    name: "Stack Overflow"
  },
  {
    link: "https://google.com",
    name: "Google"
  },
  {
    link: "https://scratch.mit.edu",
    name: "Scratch"
  },
  {
    link: "https://turbowarp.org/editor",
    name: "TurboWarp"
  },
  {
    link: "https://codepen.io",
    name: "Code Pen"
  },
  {
    link: "https://cssgenerator.pl",
    name: "CSS Generators"
  },
  {
    link: "https://leetcode.com/problemset",
    name: "Leet Code"
  },
  {
    link: "https://youtube.com",
    name: "YouTube"
  },
  {
    link: "https://discord.com",
    name: "Discord"
  },
  {
    link: "https://portal.librus.pl/rodzina",
    name: "Librus"
  },
  {
    link: "https://onet.pl",
    name: "Onet"
  }
];

/* =*=*=*=*=*=*=*=*=*=*=*= Constants =*=*=*=*=*=*=*=*=*=*=*= */
const timer_box = document.querySelector(".timer-box");
const hours = timer_box.querySelector(".hours");
const minutes = timer_box.querySelector(".minutes");
const seconds = timer_box.querySelector(".seconds");

const saved_apps = document.querySelector(".saved-apps");
/** @type{HTMLCanvasElement} */
const canvas = document.querySelector("#screen");

const wallpapers = [
  ["./assets/1.jpg", "92, 74.6%, 53.7%"],
  ["./assets/2.jpg", "250.4, 74.6%, 53.7%"],
  ["./assets/3.jpg", "48, 74.6%, 53.7%"],
  ["./assets/4.png", "0, 74.6%, 53.7%"]
];

const context = canvas.getContext("2d");
if (!context) 
  throw new Error("CanvasRenderingContext2D (somehow) not supported!");

/* =*=*=*=*=*=*=*=*=*= Utility Functions =*=*=*=*=*=*=*=*=*= */
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* =*=*=*=*=*=*=*=*=*=*=*=*=*= Code =*=*=*=*=*=*=*=*=*=*=*=*=*= */
const designIndex = rand(0, wallpapers.length - 1);
document.body.setAttribute(
  "style",
  `--img-wallpaper: url(${wallpapers[designIndex][0]}); --clr-primary: ${wallpapers[designIndex][1]}`
);

function UpdateTimer() {
  const now = new Date();

  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentSecond = now.getSeconds();

  hours.textContent = (currentHour > 9) ? currentHour : `0${currentHour}`;
  minutes.textContent = (currentMinute > 9) ? currentMinute : `0${currentMinute}`;
  seconds.textContent = (currentSecond > 9) ? currentSecond : `0${currentSecond}`;
}

UpdateTimer();

const timerInterval = setInterval(UpdateTimer, 1000);

window.addEventListener("DOMContentLoaded", () => {
  APPS.forEach(app_data => {
    const app_tile = document.createElement("a");
    app_tile.classList.add("app-tile");
    app_tile.href = app_data.link;
    saved_apps.appendChild(app_tile);

    const app_favicon = document.createElement("div");
    app_favicon.classList.add("favicon");
    app_favicon.setAttribute("style", `--_tile-img: url('https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${app_data.link}&size=256')`);
    app_tile.appendChild(app_favicon);

    const app_name = document.createElement("div");
    app_name.classList.add("name");
    app_name.textContent = app_data.name;
    app_tile.appendChild(app_name);
  });
});

function resizeCanvasToViewport() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  return [canvas.width, canvas.height];
}

function drawCircle(x, y, fill) {
  context.beginPath()
  context.arc(x, y, 2, 0, 2 * Math.PI, false)
  context.fillStyle = fill;
  context.fill();
}

const particles = [];

function render() {
  const [width, height] = resizeCanvasToViewport();
  context.clearRect(0, 0, width, height);

  if (particles.length == 0) {
    for (let n = 0; n < 75; n++)
      particles.push({x: rand(0, width), y: rand(0, height), dir: rand(0, 360), speed: rand(0.5, 3.5)});
  }

  for (const particle of particles) {
    drawCircle(particle.x, particle.y, `hsla(${wallpapers[designIndex][1]}, 0.75)`);
    particle.x += Math.sin(particle.dir) * particle.speed;
    particle.y += Math.cos(particle.dir) * particle.speed;

    if (particle.x < 0 || particle.x > width) {
      particle.dir = rand(0, 360);
      particle.x = particle.x < 0 ? 0 : width;
      continue;
    }
    if (particle.y < 0 || particle.y > height) {
      particle.dir = rand(0, 360);
      particle.y = particle.y < 0 ? 0 : height;
      continue;
    }
  }

  requestAnimationFrame( render );
}

requestAnimationFrame( render );
