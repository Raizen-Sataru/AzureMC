// Banner Slider
let slides = document.querySelectorAll(".banner-slide");
let currentSlide = 0;

const showSlide = (index) => {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

// Auto slide every 5 seconds
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 5000);

// Next/Prev buttons
document.querySelector(".next").addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

document.querySelector(".prev").addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

// Placeholder for players online
document.getElementById("players-online").innerText = "3 players online";
