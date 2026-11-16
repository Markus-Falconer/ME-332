/* ME 332 study site — shared behavior.
 * To add a page: create it in /pages (copy pages/_template.html),
 * then add one entry to PAGES below. The sidebar and home page update automatically.
 */
const PAGES = [
  { id: "midterm",   title: "Midterm Prep",            file: "midterm.html", tag: "Exam",
    blurb: "HW problem map, solving checklist, and a full practice midterm across Ch 7, 8, 9 and 11." },
  { id: "equations", title: "Equation Sheet",          file: "equations.html", tag: "Reference",
    blurb: "Every correlation for Ch 7–11, plus a 'which correlation do I use?' table." },
  { id: "ch07",      title: "Ch 7: External Flow",     file: "ch07.html", tag: "Chapter",
    blurb: "Flat plates, unheated starting length, cylinders and spheres in cross flow." },
  { id: "ch08",      title: "Ch 8: Internal Flow",     file: "ch08.html", tag: "Chapter",
    blurb: "Mean temperature, entry lengths, constant q″ vs. constant Tₛ, external fluid." },
  { id: "ch09",      title: "Ch 9: Free Convection",   file: "ch09.html", tag: "Chapter",
    blurb: "Grashof and Rayleigh numbers, vertical and horizontal plates, cylinders, fin spacing." },
  { id: "ch11",      title: "Ch 11: Heat Exchangers",  file: "ch11.html", tag: "Chapter",
    blurb: "Overall U and fouling, LMTD method, effectiveness–NTU method." },
];

(function () {
  const inPages = location.pathname.includes("/pages/");
  const base = inPages ? "" : "pages/";
  const home = inPages ? "../index.html" : "index.html";
  const current = document.body.dataset.page || "home";

  // Sidebar
  const nav = document.getElementById("site-nav");
  if (nav) {
    const link = (href, label, active) =>
      `<a href="${href}"${active ? ' class="active" aria-current="page"' : ""}>${label}</a>`;
    nav.innerHTML =
      link(home, "Home", current === "home") +
      PAGES.map(p => link(base + p.file, p.title, current === p.id)).join("");
  }

  // Home page cards
  const grid = document.getElementById("page-grid");
  if (grid) {
    grid.innerHTML = PAGES.map(p => `
      <a class="card" href="${base + p.file}">
        <span class="tag">${p.tag}</span>
        <h3>${p.title}</h3>
        <p>${p.blurb}</p>
      </a>`).join("");
  }

  // Mobile menu toggle
  const toggle = document.getElementById("menu-toggle");
  if (toggle) toggle.addEventListener("click", () => document.body.classList.toggle("nav-open"));

  // Light/dark theme toggle (remembered per browser)
  const themeBtn = document.getElementById("theme-toggle");
  const saved = (() => { try { return localStorage.getItem("theme"); } catch { return null; } })();
  if (saved) document.documentElement.dataset.theme = saved;
  const label = () => { if (themeBtn) themeBtn.textContent =
    document.documentElement.dataset.theme === "dark" ? "Light mode" : "Dark mode"; };
  label();
  if (themeBtn) themeBtn.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
    label();
  });

  // "Show all solutions" buttons (scope: whole page, or a section via data-scope="#id")
  document.querySelectorAll(".toggle-all").forEach(btn => {
    btn.addEventListener("click", () => {
      const scope = btn.dataset.scope ? document.querySelector(btn.dataset.scope) : document;
      const items = scope.querySelectorAll("details.reveal");
      const open = btn.dataset.open !== "true";
      items.forEach(d => (d.open = open));
      btn.dataset.open = String(open);
      btn.textContent = (open ? "Hide" : "Show") + btn.textContent.replace(/^(Show|Hide)/, "");
    });
  });

  // Render LaTeX ($...$ inline, $$...$$ display) once KaTeX loads
  window.addEventListener("load", () => {
    if (window.renderMathInElement) {
      renderMathInElement(document.body, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
        ],
      });
    }
  });
})();
