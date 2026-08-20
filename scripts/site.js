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

// ===== Contact form =====
// GitHub Pages is static, so there is no server of ours to post to. FormSubmit
// relays the submission to CONTACT_EMAIL for us; its /ajax/ endpoint returns
// JSON so the page never reloads (same behavior as the reference form).
//
// ONE-TIME ACTIVATION: the very first submission triggers a confirmation email
// to CONTACT_EMAIL. Click the link in it once and every later submission is
// delivered silently. Until then, submissions are held, not lost.
//
// To swap services later, only these two lines need to change.
const CONTACT_EMAIL = "marlon@unjaded.net";
const FORM_ENDPOINT = "https://formsubmit.co/ajax/" + CONTACT_EMAIL;

const contactForm = document.getElementById("contact-form");
const submitBtn = document.getElementById("contact-submit");
const statusEl = document.getElementById("form-status");

function setStatus(message, state) {
  statusEl.textContent = message;
  statusEl.className = "form-status" + (state ? " is-" + state : "");
}

// Fallback for the rare case the relay is unreachable: hand the visitor a
// pre-filled mailto so their message is not simply lost.
function mailtoFallback(fields) {
  const subject = encodeURIComponent(
    `${fields.topic} inquiry from ${fields.firstName} ${fields.lastName}`
  );
  const body = encodeURIComponent(
    [
      fields.message,
      "",
      "—",
      `From: ${fields.firstName} ${fields.lastName}`,
      `Reply to: ${fields.email}`,
      `Topic: ${fields.topic}`,
    ].join("\n")
  );
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // novalidate is set on the form so we control when the browser's own
  // messages appear; trigger them here.
  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  const data = new FormData(contactForm);

  // Honeypot filled in means a bot. Show the success state so it moves on.
  if (data.get("_honey")) {
    contactForm.reset();
    setStatus("Thanks! Your message is on its way.", "success");
    return;
  }

  const fields = {
    firstName: data.get("firstName").trim(),
    lastName: data.get("lastName").trim(),
    email: data.get("email").trim(),
    topic: data.get("topic"),
    message: data.get("message").trim(),
  };

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending…";
  setStatus("");

  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        Name: `${fields.firstName} ${fields.lastName}`,
        Email: fields.email,
        Topic: fields.topic,
        Message: fields.message,
        _subject: `unjaded.net — ${fields.topic} inquiry from ${fields.firstName} ${fields.lastName}`,
        _replyto: fields.email,
        _template: "table",
        _captcha: "false",
      }),
    });

    if (!res.ok) throw new Error(`Relay responded ${res.status}`);

    contactForm.reset();
    setStatus(
      `Thanks, ${fields.firstName}! Your message is on its way — we usually reply within one business day.`,
      "success"
    );
  } catch (err) {
    statusEl.className = "form-status is-error";
    statusEl.innerHTML =
      'Something went wrong sending that. ' +
      `<a href="${mailtoFallback(fields)}">Send it by email instead</a>` +
      " and we'll pick it up there.";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit";
  }
});
