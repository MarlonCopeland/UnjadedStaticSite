// Unjaded Digital Products — site behavior

// Current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open);
});

// Close the mobile menu after choosing a link
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

// Contact form: compose an email to Unjaded via the visitor's mail client.
// A static site has no server to send mail from, so mailto keeps it
// dependency-free; swap for a form service (e.g. Formspree) if needed.
const CONTACT_EMAIL = "marlon.unjaded@gmail.com";

document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const name = data.get("name").trim();
  const email = data.get("email").trim();
  const message = data.get("message").trim();

  const subject = encodeURIComponent(`Project inquiry from ${name}`);
  const body = encodeURIComponent(
    `${message}\n\n—\nFrom: ${name}\nReply to: ${email}`
  );

  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
});
