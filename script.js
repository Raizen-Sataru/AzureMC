const serverIP = "AzureSMPz.aternos.me";
const serverPort = 21847;

async function updateServerStatus() {
  try {
    const response = await fetch(`https://api.mcsrvstat.us/2/${serverIP}`);
    const data = await response.json();

    const playersEl = document.getElementById("players");
    const ipEl = document.getElementById("server-ip");

    // Update server IP
    ipEl.innerText = `${serverIP}:${serverPort}`;

    // Update players online
    if (data && data.players && typeof data.players.online !== "undefined") {
      playersEl.innerText = `${data.players.online} players online`;
    } else {
      playersEl.innerText = "Players online: Unavailable";
    }
  } catch (error) {
    console.error("Error fetching server data:", error);
    document.getElementById("players").innerText = "Players online: Unavailable";
  }
}

// Run once immediately
updateServerStatus();

// Update every 30 seconds
setInterval(updateServerStatus, 30000);
