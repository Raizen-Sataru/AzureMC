const mcStatusEl = document.getElementById('mc-status');
const mcPlayersEl = document.getElementById('mc-players');

const serverIP = "AzureSMPz.aternos.me";
const serverPort = 21847;

async function fetchServerStatus() {
  try {
    const response = await fetch(`https://api.mcsrvstat.us/2/${serverIP}:${serverPort}`);
    const data = await response.json();

    if(data.online) {
      mcStatusEl.textContent = "Server is Online ✅";
      mcPlayersEl.textContent = `Players Online: ${data.players.online} / ${data.players.max}`;
    } else {
      mcStatusEl.textContent = "Server is Offline ❌";
      mcPlayersEl.textContent = "Players Online: 0";
    }
  } catch (error) {
    mcStatusEl.textContent = "Server Status Unknown ⚠️";
    mcPlayersEl.textContent = "Players Online: --";
    console.error("Error fetching server status:", error);
  }
}

// Update every 10 seconds
fetchServerStatus();
setInterval(fetchServerStatus, 10000);
