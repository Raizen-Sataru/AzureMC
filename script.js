// Page navigation
function showPage(pageId) {
  const pages = document.querySelectorAll(".page");
  pages.forEach(p => p.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");
}

// On load check saved user
window.onload = function () {
  const savedUser = localStorage.getItem("username");
  const savedPic = localStorage.getItem("profilePic");

  if (savedUser) {
    document.getElementById("loginArea").style.display = "none";
    document.getElementById("mainArea").style.display = "block";
  }
};

// Login function
function login() {
  let username = document.getElementById("username").value;
  let profilePic = document.getElementById("profilePic").value;

  if (username === "") {
    alert("Please enter your name!");
    return;
  }

  if (profilePic === "") {
    profilePic = "https://i.imgur.com/6VBx3io.png"; // default avatar
  }

  localStorage.setItem("username", username);
  localStorage.setItem("profilePic", profilePic);

  document.getElementById("loginArea").style.display = "none";
  document.getElementById("mainArea").style.display = "block";
}

// Send message
function sendMessage() {
  let msg = document.getElementById("chatInput").value;
  if (msg === "") return;

  const chatBox = document.getElementById("chatBox");
  const username = localStorage.getItem("username") || "Guest";
  const profilePic = localStorage.getItem("profilePic") || "https://i.imgur.com/6VBx3io.png";

  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.innerHTML = `<img src="${profilePic}" width="25" style="border-radius:50%;margin-right:5px;"> 
                               <strong>${username}</strong>: ${msg}`;

  chatBox.appendChild(messageElement);
  document.getElementById("chatInput").value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Update settings
function updateSettings() {
  const newName = document.getElementById("settingsName").value;
  const newPic = document.getElementById("settingsPic").value;

  if (newName) {
    localStorage.setItem("username", newName);
  }
  if (newPic) {
    localStorage.setItem("profilePic", newPic);
  }

  alert("✅ Settings updated! Your new profile will show in chat.");

  // Clear inputs
  document.getElementById("settingsName").value = "";
  document.getElementById("settingsPic").value = "";
}
