// ── FILTER TABS ───────────────────────────────
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");

    const filter = this.dataset.filter;
    document.querySelectorAll(".product-card").forEach((card) => {
      const match = filter === "all" || card.dataset.cat === filter;
      card.style.display = match ? "" : "none";
      if (match) {
        card.style.animation = "fadeInCard 0.35s ease forwards";
      }
    });
  });
});

// ── SIZE BUTTONS ──────────────────────────────
document.querySelectorAll(".product-card").forEach((card) => {
  card.querySelectorAll(".size-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      card
        .querySelectorAll(".size-btn")
        .forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
    });
  });
});

// ── ADD TO CART TOAST ─────────────────────────
const toast = document.getElementById("cart-toast");
let toastTimer;

document.querySelectorAll(".btn-add-cart, .modal-cta").forEach((btn) => {
  btn.addEventListener("click", function () {
    clearTimeout(toastTimer);
    toast.classList.add("show");
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
  });
});

// ── MODAL ─────────────────────────────────────
const overlay = document.getElementById("modal-overlay");
const modalClose = document.getElementById("modal-close");

const products = {
  "maillot-dom": {
    cat: "MAILLOT",
    title: "Maillot Domicile — KAYZEN #07",
    desc: "Le maillot officiel porté par l'équipe PRIZM lors des compétitions. Tissu respirant haute performance, broderie officielle PRIZM.",
    price: "59,99 €",
    img: "./public/TshirtSITEWEBgrosplan-1@2x.png",
  },
  "maillot-ext": {
    cat: "MAILLOT",
    title: "Maillot Extérieur — Edition Limitée",
    desc: "Edition limitée saison 2025. Coloris inversé exclusif, numérotation individuelle. Stock limité.",
    price: "64,99 €",
    img: "./public/TshirtSITEWEBgrosplan-1@2x.png",
  },
  hoodie: {
    cat: "HOODIE",
    title: "Hoodie PRIZM — Saison 2",
    desc: "Hoodie oversize premium 80% coton / 20% polyester. Logo brodé au dos, poches kengourou, intérieur molleton doux.",
    price: "79,99 €",
    img: "./public/TshirtSITEWEBgrosplan-1@2x.png",
  },
  casquette: {
    cat: "ACCESSOIRE",
    title: "Casquette Snapback PRIZM",
    desc: "Snapback 6 panneaux taille unique. Logo PRIZM brodé en façade, fermeture ajustable.",
    price: "29,99 €",
    img: "./public/LOGOnoBG-1@2x.png",
  },
  "player-ed": {
    cat: "MAILLOT",
    title: "Maillot Player Edition — Saison 1",
    desc: "L'original. Le maillot qui a lancé PRIZM. Stock limité saison 1 disponible à prix réduit.",
    price: "44,99 €",
    img: "./public/TshirtSITEWEBgrosplan-1@2x.png",
  },
  pack: {
    cat: "BUNDLE",
    title: "Pack Fan PRIZM — Maillot + Casquette",
    desc: "Le pack complet fan PRIZM : un maillot domicile au choix + la casquette snapback officielle. Économisez 10€ vs l'achat séparé.",
    price: "79,99 €",
    img: "./public/TshirtSITEWEBgrosplan-1@2x.png",
  },
};

function openModal(id) {
  const p = products[id];
  if (!p) return;
  document.getElementById("modal-cat").textContent = p.cat;
  document.getElementById("modal-title").textContent = p.title;
  document.getElementById("modal-desc").textContent = p.desc;
  document.getElementById("modal-price").textContent = p.price;
  document.getElementById("modal-img").src = p.img;
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// Modal size buttons
document
  .querySelector(".modal-size-row")
  ?.querySelectorAll(".size-btn")
  .forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .querySelector(".modal-size-row")
        .querySelectorAll(".size-btn")
        .forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
    });
  });

// ── SMOOTH SCROLL ─────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    const offset = 83;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - offset,
      behavior: "smooth",
    });
  });
});

// ── HAMBURGER ─────────────────────────────────
const hamburger = document.getElementById("hamburger");
const navTabs = document.querySelector(".nav-tabs");
if (hamburger && navTabs) {
  hamburger.addEventListener("click", () => {
    const open = navTabs.classList.toggle("nav-open");
    hamburger.classList.toggle("ham-open", open);
  });
}

// make openModal global
window.openModal = openModal;
