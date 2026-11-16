/* ME 332 study site — shared behavior.
 * To add a page: create it in /pages (copy pages/_template.html),
 * then add one entry to PAGES below. The sidebar and home page update automatically.
 */
const PAGES = [
  { id: "equations", title: "Equation Sheet",          file: "equations.html", tag: "Reference",
    blurb: "All the key relations in one place." },
  { id: "ch06-07",   title: "Ch 6–7: Convection & External Flow", file: "ch06-07.html", tag: "Chapter",
    blurb: "Boundary layers, dimensionless numbers, flat plates, cylinders, spheres." },
  { id: "ch08",      title: "Ch 8: Internal Flow",     file: "ch08.html", tag: "Chapter",
    blurb: "Pipe flow, mean temperature, entry lengths, constant q″ vs. constant Tₛ." },
  { id: "ch09",      title: "Ch 9: Free Convection",   file: "ch09.html", tag: "Chapter",
    blurb: "Buoyancy-driven flow, Grashof and Rayleigh numbers, plates and enclosures." },
  { id: "ch11",      title: "Ch 11: Heat Exchangers",  file: "ch11.html", tag: "Chapter",
    blurb: "Overall U, LMTD method, effectiveness–NTU method." },
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
  if (themeBtn) themeBtn.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
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
