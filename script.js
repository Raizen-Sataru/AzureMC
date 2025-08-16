// Banner slider
const slides = document.querySelectorAll(".banner-slide");
let currentSlide = 0;

function nextSlide() {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}

setInterval(nextSlide, 3000);

// Server status
const serverIP = "AzureSMPz.aternos.me";
const serverPort = 21847;

async function updateServerStatus() {
  try {
    const response = await fetch(`https://api.mcsrvstat.us/2/${serverIP}`);
    const data = await response.json();

    const playersEl = document.getElementById("players");
    const ipEl = document.getElementById("server-ip");
    const headerIpEl = document.getElementById("header-ip");

    ipEl.innerText = `Server IP: ${serverIP}:${serverPort}`;
    headerIpEl.innerText = `Server IP: ${serverIP}:${serverPort}`;

    if (data && data.players && typeof data.players.online !== "undefined") {
      playersEl.innerText = `Players online: ${data.players.online}`;
    } else {
      playersEl.innerText = "Players online: Unavailable";
    }
  } catch (error) {
    console.error("Error fetching server data:", error);
    document.getElementById("players").innerText = "Players online: Unavailable";
  }
}

updateServerStatus();
setInterval(updateServerStatus, 30000);
