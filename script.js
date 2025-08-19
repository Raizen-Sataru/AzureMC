/* ========= Default Avatar (discord-like) ========= */
const DEFAULT_AVATAR =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
  <svg xmlns='http://www.w3.org/2000/svg' width='256' height='256' viewBox='0 0 256 256'>
    <rect width='256' height='256' rx='128' fill='#23272A'/>
    <circle cx='128' cy='108' r='52' fill='#2C2F33'/>
    <rect x='56' y='172' width='144' height='44' rx='22' fill='#2C2F33'/>
  </svg>`);

/* ========= State & Elements ========= */
const els = {
  meAvatar: document.getElementById("meAvatar"),
  meName: document.getElementById("meName"),
  chatList: document.getElementById("chatList"),
  chatText: document.getElementById("chatText"),
  sendBtn: document.getElementById("sendBtn"),
  settingsModal: document.getElementById("settingsModal"),
  infoModal: document.getElementById("infoModal"),
  hostingModal: document.getElementById("hostingModal"),
  settingsAvatarPreview: document.getElementById("settingsAvatarPreview"),
  avatarFile: document.getElementById("avatarFile"),
  changeAvatar: document.getElementById("changeAvatar"),
  displayName: document.getElementById("displayName"),
  saveSettings: document.getElementById("saveSettings"),
};

function getProfile() {
  return {
    name: localStorage.getItem("az_name") || "Guest",
    avatar: localStorage.getItem("az_avatar") || DEFAULT_AVATAR,
  };
}
function setProfile({ name, avatar }) {
  if (name) localStorage.setItem("az_name", name);
  if (avatar) localStorage.setItem("az_avatar", avatar);
  renderMe();
}
function renderMe() {
  const { name, avatar } = getProfile();
  els.meName.textContent = name;
  els.meAvatar.src = avatar;
}

/* ========= Modal helpers ========= */
function openModal(id) {
  document.getElementById(id).classList.add("show");
}
function closeModal(id) {
  document.getElementById(id).classList.remove("show");
}
document.querySelectorAll(".menu-link").forEach(btn => {
  const target = btn.getAttribute("data-open");
  btn.addEventListener("click", () => {
    if (target === "chat") {
      // no modal, just focus input
      els.chatText.focus();
    } else {
      openModal(target);
    }
  });
});
document.querySelectorAll("[data-close]").forEach(btn => {
  btn.addEventListener("click", () => closeModal(btn.getAttribute("data-close")));
});
document.querySelectorAll(".modal").forEach(m =>
  m.addEventListener("click", e => { if (e.target === m) m.classList.remove("show"); })
);

/* ========= Settings logic ========= */
els.changeAvatar.addEventListener("click", () => els.avatarFile.click());
els.avatarFile.addEventListener("change", async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => { els.settingsAvatarPreview.src = reader.result; };
  reader.readAsDataURL(file);
});
els.saveSettings.addEventListener("click", () => {
  const newName = els.displayName.value.trim();
  const newAvatar = els.settingsAvatarPreview.src;
  setProfile({ name: newName || undefined, avatar: newAvatar || undefined });
  closeModal("settingsModal");
  els.displayName.value = "";
});

/* ========= Chat send ========= */
function send() {
  const txt = els.chatText.value.trim();
  if (!txt) return;
  const { name, avatar } = getProfile();

  const row = document.createElement("div");
  row.className = "msg";

  const img = document.createElement("img");
  img.className = "avatar md";
  img.src = avatar;
  img.alt = name;

  const right = document.createElement("div");
  const who = document.createElement("div");
  who.className = "who";
  who.textContent = name;

  const text = document.createElement("div");
  text.className = "text";
  text.textContent = txt;

  right.appendChild(who);
  right.appendChild(text);

  row.appendChild(img);
  row.appendChild(right);
  els.chatList.appendChild(row);

  els.chatText.value = "";
  els.chatList.scrollTop = els.chatList.scrollHeight;
}
els.sendBtn.addEventListener("click", send);
els.chatText.addEventListener("keydown", (e) => {
  if (e.key === "Enter") send();
});

/* ========= Init ========= */
(function init(){
  // hydrate UI with saved profile
  const { name, avatar } = getProfile();
  els.settingsAvatarPreview.src = avatar || DEFAULT_AVATAR;
  renderMe();
})();
