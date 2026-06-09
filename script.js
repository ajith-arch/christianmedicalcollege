/* ─── Header scroll ─── */
const header = document.getElementById("header");
const isSolidPage = header?.classList.contains("header--solid");

if (header && !isSolidPage) {
  window.addEventListener("scroll", () => {
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  }, { passive: true });
}

/* ─── Mobile menu ─── */
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", open);
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ─── Fade-up on scroll ─── */
const fadeEls = document.querySelectorAll(".fade-up");
if (fadeEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "-40px" }
  );
  fadeEls.forEach((el) => observer.observe(el));
}

/* ─── FAQ Accordion ─── */
document.querySelectorAll(".faq-group").forEach((group) => {
  const items = group.querySelectorAll(".accordion-item");

  items.forEach((item) => {
    const trigger = item.querySelector(".accordion-trigger");
    const panel = item.querySelector(".accordion-panel");

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      items.forEach((other) => {
        other.classList.remove("is-open");
        other.querySelector(".accordion-trigger").setAttribute("aria-expanded", "false");
        other.querySelector(".accordion-panel").style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });
});

/* ─── FAQ Search & Filter ─── */
const faqSearch = document.getElementById("faqSearch");
const faqPills = document.getElementById("faqPills");
const faqGroups = document.querySelectorAll(".faq-group");

function filterFAQs() {
  const query = (faqSearch?.value || "").trim().toLowerCase();
  const activePill = faqPills?.querySelector(".pill.active");
  const category = activePill?.dataset.filter || "all";

  faqGroups.forEach((group) => {
    const groupCat = group.dataset.category;
    const matchCategory = category === "all" || category === groupCat;
    let hasVisible = false;

    group.querySelectorAll(".accordion-item").forEach((item) => {
      const text = item.textContent.toLowerCase();
      const matchSearch = !query || text.includes(query);
      const show = matchCategory && matchSearch;
      item.style.display = show ? "" : "none";
      if (show) hasVisible = true;
    });

    group.style.display = hasVisible ? "" : "none";
  });
}

if (faqSearch) {
  faqSearch.addEventListener("input", filterFAQs);
}

if (faqPills) {
  faqPills.addEventListener("click", (e) => {
    const pill = e.target.closest(".pill");
    if (!pill) return;
    faqPills.querySelectorAll(".pill").forEach((p) => p.classList.remove("active"));
    pill.classList.add("active");
    filterFAQs();
  });
}

/* ─── FAQ Sidebar scroll ─── */
document.querySelectorAll(".faq-sidebar button[data-scroll]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.scroll;
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });

    document.querySelectorAll(".faq-sidebar button").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

/* ─── Portal tabs ─── */
const portalTabs = document.querySelectorAll(".portal-tab");
const portalPanels = document.querySelectorAll(".portal-panel");

portalTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    portalTabs.forEach((t) => {
      t.classList.remove("is-active");
      t.setAttribute("aria-selected", "false");
    });
    tab.classList.add("is-active");
    tab.setAttribute("aria-selected", "true");

    portalPanels.forEach((panel) => {
      const isTarget =
        (target === "existing" && panel.id === "panel-existing") ||
        (target === "new" && panel.id === "panel-new");
      panel.classList.toggle("is-active", isTarget);
      panel.hidden = !isTarget;
    });
  });
});

/* ─── Demo toast ─── */
const demoToast = document.getElementById("demoToast");
let toastTimer;

function showDemoToast(message) {
  if (!demoToast) return;
  demoToast.textContent = message;
  demoToast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => demoToast.classList.remove("is-visible"), 3200);
}

document.querySelectorAll("[data-demo]").forEach((el) => {
  el.addEventListener("click", (e) => {
    const msg = el.dataset.demo;
    if (!msg) return;
    if (el.tagName === "A") e.preventDefault();
    showDemoToast(msg);
  });
});

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    showDemoToast("Demo only — appointment system not connected.");
  });
}

/* ─── Back to top ─── */
const backTop = document.getElementById("backTop");

if (backTop) {
  window.addEventListener("scroll", () => {
    backTop.classList.toggle("is-visible", window.scrollY > 500);
  }, { passive: true });

  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
