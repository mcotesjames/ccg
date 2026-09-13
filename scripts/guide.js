/* =============================================================
   COMPONENT GUIDE - SHARED CHROME BEHAVIOUR
   =============================================================
   Loads on every guide page after ../scripts/components.js.
   Page-specific demo wiring stays in that page's own <script>. */

/* Aside navigation: authored once here, injected on every page.
   Each page entry becomes a disclosure whose sub-items are that
   page's components - the links the reader actually navigates by.
   Adding a component to the guide means adding one line here. */
const GUIDE_NAV = [
  { label: "Library", intro: "Reusable components, one page per category. Every stage is the production component. Open a category, or jump straight to a component.", pages: [
    { file: "components.html", name: "Guide home" },
    { file: "actions.html", desc: "Buttons, links and filter controls. Everything the user presses.", name: "Actions", components: [
      ["cmp-ctas", "CTAs & links"],
      ["cmp-status-tabs", "Status tabs"],
      ["cmp-text-filter", "Text filter"],
      ["cmp-category-pills", "Category pills"],
      ["cmp-dropdown", "Dropdown select"]
    ]},
    { file: "chrome.html", desc: "The shared page shell. One source, identical on every page.", name: "Chrome", components: [
      ["cmp-nav", "Site navigation"],
      ["cmp-footer", "Footer"],
      ["cmp-hero-parallax", "Hero parallax"]
    ]},
    { file: "carousels.html", desc: "Three track behaviours: free-running, stepped auto-advance, and paged.", name: "Carousels", components: [
      ["cmp-showcase-carousel", "Showcase carousel"],
      ["cmp-stats-carousel", "Stats carousel"],
      ["cmp-card-carousel", "Manual carousel"]
    ]},
    { file: "spotlights.html", desc: "Full-band story rotators. Stories cross-fade in place, never tracking sideways.", name: "Spotlights", components: [
      ["cmp-cover-story", "Cover story"],
      ["cmp-spotlight-split", "Spotlight split"]
    ]},
    { file: "cards.html", desc: "Two families, one rule: the plate is a door to a place; the title sweep is content to read.", name: "Cards", components: [
      ["cmp-plate-card", "Plate card"],
      ["cmp-editorial-card", "Editorial card"],
      ["cmp-card-drawer", "Card slide-out"]
    ]},
    { file: "page-utilities.html", desc: "Small page-level furniture that supports orientation and flow.", name: "Page utilities", components: [
      ["cmp-breadcrumb", "Breadcrumb"]
    ]},
    { file: "content-blocks.html", desc: "General page-building modules: figures, rows and editorial splits.", name: "Content blocks", components: [
      ["cmp-stat-cell", "Stat cell"],
      ["cmp-accordion", "Accordion"]
    ]},
    { file: "forms.html", desc: "The house treatment is the underline: a caption label over a line, no boxes.", name: "Forms", components: [
      ["cmp-form-text", "Text fields"],
      ["cmp-form-select", "Select field"],
      ["cmp-form-choice", "Choice controls"],
      ["cmp-form-declarations", "Declarations block"]
    ]}
  ]},
  { label: "Page modules", intro: "Fixed page-specific assemblies with behaviour of their own, one page per site section. Take a module whole: layout, timings and keyboard handling are one piece.", pages: [
    { file: "modules-our-work.html", desc: "Services index and the assemblies to come from the Our Work pages.", name: "Our work", components: [
      ["cmp-services-index", "Services index"]
    ]},
    { file: "modules-our-impact.html", desc: "The people spotlight framing, and future Our Impact assemblies.", name: "Our impact", components: [
      ["cmp-people-spotlight", "People spotlight"]
    ]},
    { file: "modules-contact-us.html", desc: "The sticky enquiry panel beside the contact form.", name: "Contact us", components: [
      ["cmp-sticky-panel", "Sticky enquiry panel"]
    ]}
  ]}
];

/* Aside overlay toggle */
const cmpAside = document.querySelector("#cmpAside");
const cmpMenuToggle = document.querySelector("#cmpMenuToggle");

(function buildAsideNav() {
  const here = location.pathname.split("/").pop() || "components.html";

  const html = GUIDE_NAV.map(group => {
    const items = group.pages.map(page => {
      const current = page.file === here;

      if (!page.components) {
        return `<a href="${page.file}"${current ? ' class="is-active"' : ""}>${page.name}</a>`;
      }

      const links = page.components.map(([id, name]) => {
        const activeLink = current && location.hash === "#" + id;
        return `      <a href="${page.file}#${id}"${activeLink ? ' class="is-active"' : ""}>${name}</a>`;
      }).join("\n");

      return `<details class="cmp-aside-item"${current ? " open" : ""}>
      <summary${current ? ' class="is-active"' : ""}>${page.name}</summary>
      <nav aria-label="${page.name} components">
${links}
      </nav>
    </details>`;
    }).join("\n    ");

    return `    <p class="cmp-aside-label">${group.label}</p>
    <nav aria-label="Guide pages: ${group.label.toLowerCase()}">
    ${items}
    </nav>`;
  }).join("\n\n");

  cmpAside.insertAdjacentHTML("beforeend", html);

  /* keep the active component link in step with same-page jumps */
  window.addEventListener("hashchange", () => {
    const target = here + location.hash;
    cmpAside.querySelectorAll(".cmp-aside-item a").forEach(a => {
      a.classList.toggle("is-active", a.getAttribute("href") === target);
    });
  });
})();

/* Guide home directory: rendered from the same GUIDE_NAV so the
   hub can never drift from the asides. Only components.html
   carries the #dirRoot container. */
(function buildDirectory() {
  const root = document.querySelector("#dirRoot");
  if (!root) return;

  root.innerHTML = GUIDE_NAV.map(group => {
    const pages = group.pages.filter(page => page.components);
    const componentCount = pages.reduce((n, page) => n + page.components.length, 0);

    const cards = pages.map((page, i) => `
      <article class="dir-card">
        <p class="dir-num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</p>
        <h3 class="dir-title"><a href="${page.file}">${page.name}</a></h3>
        <p class="dir-desc">${page.desc}</p>
        <nav class="dir-links" aria-label="${page.name} components">
          ${page.components.map(([id, name]) => `<a href="${page.file}#${id}">${name}</a>`).join("\n          ")}
        </nav>
      </article>`).join("");

    return `
    <section class="dir-group" aria-label="${group.label}">
      <div class="dir-group-head">
        <p class="eyebrow">${group.label} \u00b7 ${pages.length} pages \u00b7 ${componentCount} ${group.label === "Library" ? "components" : "modules"}</p>
        <p class="dir-group-intro">${group.intro}</p>
      </div>
      <div class="dir-grid">${cards}
      </div>
    </section>`;
  }).join("");
})();

function setAside(open) {
  cmpAside.classList.toggle("is-open", open);
  cmpMenuToggle.setAttribute("aria-expanded", String(open));
}

cmpMenuToggle.addEventListener("click", () => setAside(!cmpAside.classList.contains("is-open")));

cmpAside.addEventListener("click", e => { if (e.target.closest("a")) setAside(false); });

document.addEventListener("pointerdown", e => {
  if (cmpAside.classList.contains("is-open") && !cmpAside.contains(e.target) && !cmpMenuToggle.contains(e.target)) setAside(false);
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && cmpAside.classList.contains("is-open")) setAside(false);
});

/* Viewport switchers: one binding per demo frame, wired by the
   control group's data-vp-controls selector. Each button names
   a width in data-vp; "desktop" means the frame's own width, any
   other value maps to a .cmp-viewport--<value> modifier, so a
   group can carry as many steps as the component needs. */
document.querySelectorAll("[data-vp-controls]").forEach(controls => {
  const frame = document.querySelector(controls.dataset.vpControls);
  const buttons = [...controls.querySelectorAll("[data-vp]")];
  if (!frame || !buttons.length) return;

  const modifiers = buttons
    .map(button => button.dataset.vp)
    .filter(value => value !== "desktop")
    .map(value => "cmp-viewport--" + value);

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      modifiers.forEach(modifier => frame.classList.remove(modifier));
      if (button.dataset.vp !== "desktop") frame.classList.add("cmp-viewport--" + button.dataset.vp);

      buttons.forEach(other => {
        other.classList.toggle("is-active", other === button);
        other.setAttribute("aria-pressed", String(other === button));
      });
    });
  });
});
