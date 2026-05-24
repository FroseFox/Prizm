// ══════════════════════════════════════════════
// FEATURE 1 — MATCH COUNTDOWN TIMER
// ══════════════════════════════════════════════
(function initCountdown() {
  // Set next match date here
  const matchDate = new Date();
  matchDate.setDate(matchDate.getDate() + 5);
  matchDate.setHours(20, 0, 0, 0);

  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minsEl = document.getElementById("cd-mins");
  const secsEl = document.getElementById("cd-secs");

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function tick() {
    const now = Date.now();
    const diff = matchDate.getTime() - now;

    if (diff <= 0) {
      daysEl.textContent =
        hoursEl.textContent =
        minsEl.textContent =
        secsEl.textContent =
          "00";
      document.querySelector(".live-badge").textContent = "🔴 LIVE";
      document.querySelector(".live-badge").classList.add("live-now");
      return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);

    // Flip animation on digit change
    function update(el, val) {
      const padded = pad(val);
      if (el.textContent !== padded) {
        el.classList.remove("flip");
        void el.offsetWidth; // reflow
        el.classList.add("flip");
        el.textContent = padded;
      }
    }

    update(daysEl, days);
    update(hoursEl, hours);
    update(minsEl, mins);
    update(secsEl, secs);
  }

  tick();
  setInterval(tick, 1000);
})();

// ══════════════════════════════════════════════
// FEATURE 3 — SCROLL SPY (active nav highlight)
// ══════════════════════════════════════════════
(function initScrollSpy() {
  const tabs = document.querySelectorAll(".nav-tab");
  const sections = [
    "accueil",
    "equipe",
    "matchs",
    "actualites",
    "boutique",
    "partenaires",
  ]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const header = document.querySelector(".header");

  function onScroll() {
    const scrollY = window.scrollY + (header ? header.offsetHeight + 40 : 100);

    let current = sections[0];
    sections.forEach((sec) => {
      if (sec.offsetTop <= scrollY) current = sec;
    });

    tabs.forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.section === current.id);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

// ══════════════════════════════════════════════
// SMOOTH SCROLL for anchor links
// ══════════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    const header = document.querySelector(".header");
    const offset = header ? header.offsetHeight : 83;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

// ══════════════════════════════════════════════
// HAMBURGER MENU (mobile)
// ══════════════════════════════════════════════
(function initHamburger() {
  const btn = document.getElementById("hamburger");
  const nav = document.querySelector(".nav-tabs");
  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("nav-open");
    btn.classList.toggle("ham-open", open);
    btn.setAttribute("aria-expanded", open);
  });

  // Close on nav link click (mobile)
  nav.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      nav.classList.remove("nav-open");
      btn.classList.remove("ham-open");
    });
  });
})();

// ══════════════════════════════════════════════
// PLAYER CARD HOVER GLOW (subtle creative touch)
// ══════════════════════════════════════════════
document.querySelectorAll(".frame2, .frame3, .frame5").forEach((card) => {
  card.addEventListener("mousemove", function (e) {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    card.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${-y}deg) scale(1.03)`;
  });
  card.addEventListener("mouseleave", function () {
    card.style.transform = "";
  });
});
