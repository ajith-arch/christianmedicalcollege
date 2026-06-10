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

/* ─── Why CMC premium reveal ─── */
const whyCmc = document.getElementById("why-cmc");
const whyImageFloat = whyCmc?.querySelector(".why-cmc__image-float");

function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

function animateCount(el, target, suffix, delay = 0, duration = 2000) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    el.textContent = target.toLocaleString() + suffix;
    return;
  }

  setTimeout(() => {
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.round(easeOutQuart(progress) * target);
      el.textContent = value.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, delay);
}

function initWhyCmcReveal() {
  if (!whyCmc) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let revealed = false;
  let parallaxTicking = false;

  const reveal = () => {
    if (revealed) return;
    revealed = true;
    whyCmc.classList.add("is-revealed");

    whyCmc.querySelectorAll(".why-cmc__stat-num[data-count]").forEach((el) => {
      const target = Number(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const card = el.closest("[data-reveal]");
      const delayMap = { "stat-1": 1150, "stat-2": 1320 };
      const delay = delayMap[card?.dataset.reveal] ?? 1100;
      animateCount(el, target, suffix, delay);
    });

    if (!reduced) startParallax();
  };

  if (reduced) {
    reveal();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal();
          observer.unobserve(whyCmc);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );
  observer.observe(whyCmc);

  function updateParallax() {
    parallaxTicking = false;
    if (!revealed || !whyImageFloat) return;

    const rect = whyCmc.getBoundingClientRect();
    const vh = window.innerHeight;
    if (rect.bottom < 0 || rect.top > vh) return;

    const progress = (vh - rect.top) / (vh + rect.height);
    const scrollY = (progress - 0.5) * 26;
    whyImageFloat.style.setProperty("--parallax-y", `${scrollY}px`);
  }

  function startParallax() {
    updateParallax();
    window.addEventListener("scroll", () => {
      if (!parallaxTicking) {
        parallaxTicking = true;
        requestAnimationFrame(updateParallax);
      }
    }, { passive: true });
  }
}

initWhyCmcReveal();

/* ─── Care Journey reveal ─── */
function initCareJourneyReveal() {
  const careJourney = document.getElementById("patient-care");
  if (!careJourney) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let revealed = false;

  const reveal = () => {
    if (revealed) return;
    revealed = true;
    careJourney.classList.add("is-revealed");
  };

  if (reduced) {
    reveal();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal();
          observer.unobserve(careJourney);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
  );
  observer.observe(careJourney);
}

initCareJourneyReveal();

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

/* ─── Medical Services search ─── */
const msSearch = document.getElementById("msSearch");
const msCards = document.querySelectorAll(".ms-service-card");
const msSearchEmpty = document.getElementById("msSearchEmpty");

if (msSearch && msCards.length) {
  msSearch.addEventListener("input", () => {
    const query = msSearch.value.trim().toLowerCase();
    let visible = 0;

    msCards.forEach((card) => {
      const keywords = card.dataset.keywords || "";
      const text = card.textContent.toLowerCase();
      const show = !query || text.includes(query) || keywords.includes(query);
      card.hidden = !show;
      if (show) visible++;
    });

    if (msSearchEmpty) msSearchEmpty.hidden = visible > 0;
  });
}

/* ─── Find a Doctor page ─── */
function initFindDoctor() {
  const fdSearch = document.getElementById("fdSearch");
  if (!fdSearch) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Rotating auto-type placeholder */
  const examples = [
    "cardiology",
    "fever and chest pain",
    "pediatrician",
    "bone marrow transplant",
    "women's health",
    "neurology",
    "video consultation",
  ];

  let exIndex = 0;
  let charIndex = 0;
  let deleting = false;
  let typingTimer;

  function typeLoop() {
    const word = examples[exIndex];
    if (!deleting) {
      charIndex++;
      if (charIndex > word.length) {
        deleting = true;
        typingTimer = setTimeout(typeLoop, 1600);
        return;
      }
    } else {
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        exIndex = (exIndex + 1) % examples.length;
      }
    }
    fdSearch.setAttribute("placeholder", `Search “${word.slice(0, charIndex)}”`);
    typingTimer = setTimeout(typeLoop, deleting ? 45 : 95);
  }

  function startTyping() {
    if (reduced) {
      fdSearch.setAttribute("placeholder", "Search “cardiology”");
      return;
    }
    clearTimeout(typingTimer);
    typeLoop();
  }
  function stopTyping() {
    clearTimeout(typingTimer);
  }

  startTyping();
  fdSearch.addEventListener("focus", stopTyping);
  fdSearch.addEventListener("blur", () => {
    if (!fdSearch.value) startTyping();
  });

  /* Live doctor filtering */
  const doctorCards = document.querySelectorAll(".fd-doctor-card");
  const resultCount = document.getElementById("fdResultCount");
  const resultsEmpty = document.getElementById("fdResultsEmpty");

  function filterDoctors() {
    const query = fdSearch.value.trim().toLowerCase();
    let visible = 0;

    doctorCards.forEach((card) => {
      const keywords = card.dataset.keywords || "";
      const text = card.textContent.toLowerCase();
      const show = !query || text.includes(query) || keywords.includes(query);
      card.hidden = !show;
      if (show) visible++;
    });

    if (resultCount) {
      resultCount.textContent = `${visible} doctor${visible === 1 ? "" : "s"}`;
    }
    if (resultsEmpty) resultsEmpty.hidden = visible > 0;
  }

  fdSearch.addEventListener("input", filterDoctors);

  const fdForm = document.getElementById("fdSearchForm");
  if (fdForm) {
    fdForm.addEventListener("submit", (e) => {
      e.preventDefault();
      filterDoctors();
    });
  }

  /* Suggestion chips populate the search */
  document.querySelectorAll("[data-fd-suggest] .fd-chip--btn").forEach((chip) => {
    chip.addEventListener("click", () => {
      stopTyping();
      fdSearch.value = chip.textContent.trim();
      filterDoctors();
      document.getElementById("fdResults")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  /* Dummy login → dashboard */
  const loginCard = document.getElementById("fdLoginCard");
  const dashboard = document.getElementById("fdDashboard");
  const demoLogin = document.getElementById("fdDemoLogin");
  const guestBtn = document.getElementById("fdGuest");
  const logoutBtn = document.getElementById("fdLogout");

  demoLogin?.addEventListener("click", () => {
    if (loginCard) loginCard.hidden = true;
    if (dashboard) {
      dashboard.hidden = false;
      dashboard.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  guestBtn?.addEventListener("click", () => {
    showDemoToast("Continuing as guest — personalized features are hidden in demo.");
  });

  logoutBtn?.addEventListener("click", () => {
    if (dashboard) dashboard.hidden = true;
    if (loginCard) {
      loginCard.hidden = false;
      loginCard.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  /* Dashboard tabs */
  const fdTabs = document.querySelectorAll(".fd-tab");
  const fdPanels = document.querySelectorAll(".fd-tab-panel");

  fdTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.fdtab;

      fdTabs.forEach((t) => {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");

      fdPanels.forEach((panel) => {
        const match = panel.dataset.fdpanel === target;
        panel.classList.toggle("is-active", match);
        panel.hidden = !match;
      });
    });
  });
}

initFindDoctor();

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

/* ─── Footer accordion (mobile) ─── */
document.querySelectorAll("[data-footer-col]").forEach((col) => {
  const toggle = col.querySelector(".footer-col__toggle");
  if (!toggle) return;

  const openCol = () => {
    if (window.innerWidth >= 768) return;
    document.querySelectorAll("[data-footer-col]").forEach((other) => {
      if (other !== col) {
        other.classList.remove("is-open");
        other.querySelector(".footer-col__toggle")?.setAttribute("aria-expanded", "false");
      }
    });
    col.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
  };

  toggle.addEventListener("click", () => {
    if (window.innerWidth >= 768) return;
    const isOpen = col.classList.contains("is-open");
    if (isOpen) {
      col.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    } else {
      openCol();
    }
  });

  if (window.innerWidth < 768 && col.classList.contains("is-open")) {
    toggle.setAttribute("aria-expanded", "true");
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    document.querySelectorAll("[data-footer-col]").forEach((col) => {
      col.classList.add("is-open");
      col.querySelector(".footer-col__toggle")?.setAttribute("aria-expanded", "true");
    });
  }
});

/* ─── Back to top ─── */
function initBackToTop(btn) {
  if (!btn) return;
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

initBackToTop(document.getElementById("backTop"));
initBackToTop(document.getElementById("footerBackTop"));

const backTop = document.getElementById("backTop");
if (backTop) {
  window.addEventListener("scroll", () => {
    backTop.classList.toggle("is-visible", window.scrollY > 500);
  }, { passive: true });
}
