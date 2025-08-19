// Default avatar
const DEFAULT_AVATAR = "default-avatar.png";

// Switch tabs
function openTab(tabId) {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.remove("active");
  });
  document.getElementById(tabId).classList.add("active");
}

// Load user settings
window.onload = function() {
  const savedName = localStorage.getItem("profileName") || "Guest";
  const savedPic = localStorage.getItem("profilePic") || DEFAULT_AVATAR;

  document.getElementById("profileNameInput").value = savedName;
  document.getElementById("profilePreview").src = savedPic;
};

// Save settings
function saveSettings() {
  const name = document.getElementById("profileNameInput").value || "Guest";
  const fileInput = document.getElementById("profilePicInput");
  let profilePic = DEFAULT_AVATAR;

  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      profilePic = e.target.result;
      localStorage.setItem("profilePic", profilePic);
      document.getElementById("profilePreview").src = profilePic;
    };
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    profilePic = localStorage.getItem("profilePic") || DEFAULT_AVATAR;
  }

  localStorage.setItem("profileName", name);
  document.getElementById("profilePreview").src = profilePic;
  alert("Settings saved!");
}

// Send message
function sendMessage() {
  const msg = document.getElementById("chatInput").value;
  if (!msg) return;

  const chatBox = document.getElementById("chatBox");

  const messageElement = document.createElement("div");
  messageElement.classList.add("message");

  const profilePic = localStorage.getItem("profilePic") || DEFAULT_AVATAR;
  const profileName = localStorage.getItem("profileName") || "Guest";

  messageElement.innerHTML = `
    <img src="${profilePic}" alt="avatar">
    <strong>${profileName}</strong> <span>${msg}</span>
  `;

  chatBox.appendChild(messageElement);
  document.getElementById("chatInput").value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}
