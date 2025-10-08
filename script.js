// Smooth scrolling for nav links
document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
  });
});

// Theme (dark mode) toggle
(() => {
  const storageKey = "theme-preference";
  const toggleCheckbox = document.getElementById("theme-switch");

  if (!toggleCheckbox) return; // no switch in DOM

  function applyTheme(theme) {
    console.log(`Applying theme: ${theme}`);
    document.documentElement.className = theme;
    toggleCheckbox.checked = theme === "dark";
    toggleCheckbox.setAttribute("aria-checked", String(theme === "dark"));
  }

  // Initialize: default to light unless user saved a preference
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      applyTheme(saved);
    } else {
      applyTheme("light");
    }
  } catch (e) {
    // If localStorage isn't available, default to light
    applyTheme("light");
  }

  // Use the checkbox change event for toggling
  toggleCheckbox.addEventListener("change", () => {
    const newTheme = toggleCheckbox.checked ? "dark" : "light";
    try {
      localStorage.setItem(storageKey, newTheme);
    } catch (e) {
      // ignore storage errors
    }
    applyTheme(newTheme);
  });

  // Removed OS preference syncing — site will always default to light on first load
})();

// Section show-up animation on scroll
(() => {
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
})();

// Clock

const time = document.getElementById("time");
const day = document.getElementById("day");

let clock = setInterval(
	function calcTime() {
		let date_now = new Date();
		let hr = date_now.getHours();
		let min = date_now.getMinutes();
		let sec = date_now.getSeconds();

		let days = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday"
		];

		day.textContent = days[date_now.getDay()];

		hr = hr < 10 ? "0" + hr : hr;
		min = min < 10 ? "0" + min : min;
		sec = sec < 10 ? "0" + sec : sec;

		time.textContent = hr + ":" + min + ":" + sec;
	},

	1000
);
