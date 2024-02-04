const appsContainer = document.querySelector(".saved-apps");
const hoursContainer = document.querySelector(".timer-box .hours");
const minutesContainer = document.querySelector(".timer-box .minutes");
const secondsContainer = document.querySelector(".timer-box .seconds");

/** @type{HTMLCanvasElement} */
const canvas = document.querySelector("#screen");

const context = canvas.getContext("2d");
if (!context) 
  throw new Error("CanvasRenderingContext2D (somehow) not supported!");

const designMetadata = {
  required: [
    { wallpaper: "./assets/1.jpg", primary: "92, 74.6%, 53.7%" },
    { wallpaper: "./assets/4.png", primary: "0, 74.6%, 53.7%"},
  ],
  optional: [
    { wallpaper: "./assets/2.jpg", primary: "250.4, 74.6%, 53.7%"},
    { wallpaper: "./assets/3.jpg", primary: "48, 74.6%, 53.7%"},
  ],
};
designMetadata.all = [designMetadata.required, designMetadata.optional].flat();

const activeDesign = sessionStorage.getItem("has_visited?") 
  ? designMetadata.all[rand(0, designMetadata.all.length - 1)]
  : designMetadata.required[rand(0, designMetadata.required.length - 1)];

const appsMetadata = [
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
  },
];

const renderType = "matrix";
const particles = [];

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function UpdateTimer() {
  const now = new Date();
  
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentSecond = now.getSeconds();
  
  hoursContainer.textContent = (currentHour > 9) ? currentHour : `0${currentHour}`;
  minutesContainer.textContent = (currentMinute > 9) ? currentMinute : `0${currentMinute}`;
  secondsContainer.textContent = (currentSecond > 9) ? currentSecond : `0${currentSecond}`;
}

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


document.addEventListener("DOMContentLoaded", () => {
  document.body.setAttribute(
    "style",
    `--img-wallpaper: url(${activeDesign.wallpaper}); --clr-primary: ${activeDesign.primary}`
  );
  
  appsMetadata.forEach(app_data => {
    const app_tile = document.createElement("a");
    app_tile.classList.add("app-tile");
    app_tile.href = app_data.link;
    appsContainer.appendChild(app_tile);
    
    const app_favicon = document.createElement("div");
    app_favicon.classList.add("favicon");
    app_favicon.setAttribute("style", `--_tile-img: url('https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${app_data.link}&size=256')`);
    app_tile.appendChild(app_favicon);
    
    const app_name = document.createElement("div");
    app_name.classList.add("name");
    app_name.textContent = app_data.name;
    app_tile.appendChild(app_name);
  });

  UpdateTimer();
  setInterval(UpdateTimer, 1000);

  sessionStorage.setItem("has_visited?", true);
});

function render() {
  const [width, height] = resizeCanvasToViewport();
  context.clearRect(0, 0, width, height);

  if (particles.length == 0) {
    for (let n = 0; n < 75; n++)
      particles.push({x: rand(0, width), y: rand(0, height), dir: rand(0, 360), speed: rand(0.5, 3.5)});
  }

  for (const particle of particles) {
    drawCircle(particle.x, particle.y, `hsla(${activeDesign.primary}, 0.75)`);
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
