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

  function getSystemPreference() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  // Initialize
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      applyTheme(saved);
    } else {
      applyTheme(getSystemPreference());
    }
  } catch (e) {
    // If localStorage isn't available, fall back to system preference
    applyTheme(getSystemPreference());
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

  // Keep in sync if user changes OS-level preference while page is open
  if (window.matchMedia) {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        try {
          const saved = localStorage.getItem(storageKey);
          if (saved) return; // respect explicit choice
        } catch (err) {
          // ignore
        }
        applyTheme(e.matches ? "dark" : "light");
      });
  }
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
