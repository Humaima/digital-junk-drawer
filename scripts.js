const counter = document.getElementById("counter");
const themeButton = document.getElementById("themeButton");
const topButton = document.getElementById("topButton");
const toast = document.getElementById("toast");

// Animated "things saved" counter.
const target = 127;
let current = 0;

function animateCounter() {
  if (current >= target) {
    counter.textContent = target;
    return;
  }

  current += Math.ceil((target - current) / 8);
  counter.textContent = current;
  requestAnimationFrame(animateCounter);
}

const observer = new IntersectionObserver((entries, obs) => {
  if (entries[0].isIntersecting) {
    animateCounter();
    obs.disconnect();
  }
}, { threshold: 0.4 });

if (counter) observer.observe(counter);

// Dreamy alternate palette.
themeButton?.addEventListener("click", () => {
  document.body.classList.toggle("dreamy");
  themeButton.textContent = document.body.classList.contains("dreamy") ? "☾" : "☼";
  showToast(
    document.body.classList.contains("dreamy")
      ? "☾ dreamy mode activated"
      : "☼ pink mode restored"
  );
});

// Make the concept folder buttons feel interactive.
document.querySelectorAll(".folder-grid button").forEach((button) => {
  button.addEventListener("click", () => {
    const label = button.querySelector("span")?.textContent || "folder";
    showToast(`✨ ${label.toLowerCase()} opened — concept only!`);
  });
});

// Back to top.
topButton?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Small reusable toast.
let toastTimer;

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

// Easter egg: typing "save" triggers a tiny message.
let typed = "";
document.addEventListener("keydown", (event) => {
  if (event.key.length !== 1) return;

  typed = (typed + event.key.toLowerCase()).slice(-4);

  if (typed === "save") {
    showToast("💖 saved! Future you will definitely remember this. Probably.");
    typed = "";
  }
});
