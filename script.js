// Banner Slider
let currentSlide = 0;
const slides = document.querySelectorAll(".banner-slide");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) slide.classList.add("active");
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Auto-slide every 5 seconds
if (slides.length > 0) {
  showSlide(currentSlide);
  setInterval(nextSlide, 5000);
}

// Server Status Fetch
async function fetchServerStatus() {
  const ip = "AzureSMPz.aternos.me";
  const port = "21847";

  try {
    const response = await fetch(`https://api.mcsrvstat.us/2/${ip}:${port}`);
    const data = await response.json();

    if (data && data.online) {
      document.getElementById("server-status").innerText =
        `Players Online: ${data.players.online} / ${data.players.max}`;
    } else {
      document.getElementById("server-status").innerText = "Server Offline";
    }
  } catch (err) {
    document.getElementById("server-status").innerText = "Error fetching status";
    console.error(err);
  }
}

// Fetch server status on load
fetchServerStatus();
