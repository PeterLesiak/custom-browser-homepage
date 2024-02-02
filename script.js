/* =*=*=*=*=*=*=*=*=*=*= Initialization =*=*=*=*=*=*=*=*=*=*= */
let count = 0;
let start = new Date().getTime();

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
const design_background = document.querySelector("#design-background");

const timer_box = document.querySelector(".timer-box");
const hours = timer_box.querySelector(".hours");
const minutes = timer_box.querySelector(".minutes");
const seconds = timer_box.querySelector(".seconds");

const saved_apps = document.querySelector(".saved-apps");

const originPosition = { x: 0, y: 0 };

const last = {
  starTimestamp: start,
  starPosition: originPosition,
  mousePosition: originPosition
}

const config = {
  starAnimationDuration: 1500,
  minimumTimeBetweenStars: 250,
  minimumDistanceBetweenStars: 75,
  colors: ["249 146 253", "252 254 255"],
  sizes: ["1.4rem", "1rem", "0.6rem"],
  animations: ["fall-1", "fall-2", "fall-3"]
}

const wallpapers = [
  //"./assets/1.jpg",
  //["./assets/2.jpg", "250.4, 74.6%, 53.7%"],
  //["./assets/3.jpg", "48, 74.6%, 53.7%"],
  ["./assets/4.png", "0, 74.6%, 53.7%"]
];

/* =*=*=*=*=*=*=*=*=*= Utility Functions =*=*=*=*=*=*=*=*=*= */
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function selectRandom(items) {
  return items[rand(0, items.length - 1)];
}

function calcDistance(a, b) {
  const diffX = b.x - a.x;
  const diffY = b.y - a.y;
  
  return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
}

/* =*=*=*=*=*=*=*=*=*=*=*=*=*= Code =*=*=*=*=*=*=*=*=*=*=*=*=*= */
const designIndex = rand(0, wallpapers.length - 1);
if (typeof wallpapers[designIndex] == "string") {
  document.body.setAttribute("style", `--img-wallpaper: url(${wallpapers[designIndex]})`);
} else {
  document.body.setAttribute(
    "style",
    `--img-wallpaper: url(${wallpapers[designIndex][0]}); --clr-primary: ${wallpapers[designIndex][1]}`
  );
}

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

function createStar(position) {
  const star = document.createElement("span");
  const color = selectRandom(config.colors);
  
  star.classList.add("star", "fa-solid", "fa-star");
  
  star.style.left = `${position.x}px`;
  star.style.top = `${position.y}px`;
  star.style.fontSize = selectRandom(config.sizes);
  star.style.color = `rgb(${color})`;
  star.style.textShadow = `0px 0px 1.5rem rgb(${color} / 0.5)`;
  star.style.animationName = config.animations[count++ % 3];
  star.style.starAnimationDuration = `${config.starAnimationDuration}ms`;
  
  design_background.appendChild(star);

  setTimeout(() => design_background.removeChild(star), config.starAnimationDuration);
}

window.addEventListener("mousemove", e => {
  const mousePosition = { x: e.clientX, y: e.clientY }
  
  if(last.mousePosition.x === 0 && last.mousePosition.y === 0) {
    last.mousePosition = mousePosition;
  }
  
  const now = new Date().getTime();
  const hasMovedFarEnough = calcDistance(last.starPosition, mousePosition) >= config.minimumDistanceBetweenStars;
  const hasBeenLongEnough = now - last.starTimestamp > config.minimumTimeBetweenStars;
  
  if(hasMovedFarEnough || hasBeenLongEnough) {
    createStar(mousePosition);
    
    last.starTimestamp = new Date().getTime();
    last.starPosition = mousePosition;
  }
  
  last.mousePosition = mousePosition;
});

document.body.addEventListener("mouseleave", () => last.mousePosition = originPosition);
