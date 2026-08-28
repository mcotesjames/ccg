/* =============================================================
   CHINACHEM GROUP — SHARED HTML COMPONENTS
   =============================================================
   Injects the shared page chrome so it is authored once:

     <div data-component="site-header" data-section="work"></div>
     <div data-component="site-footer"></div>
     <script src="…/scripts/components.js"></script>

   data-section  highlights the current nav item
                 (about | work | impact | news | join)
   data-cta-href overrides the Sales & Leasing button target
                 (defaults to #contact)

   Asset and link paths are resolved from this script's own src,
   so pages in subfolders (core-pages/…) need no extra config.
   ============================================================= */

(() => {
  const scriptSrc = document.currentScript.getAttribute("src");
  const root = scriptSrc.slice(0, scriptSrc.indexOf("scripts/components.js"));

  /* -----------------------------------------------------------
     MEGA MENU DATA — the site IA. Edit here, updates everywhere.
     ----------------------------------------------------------- */

  const megaMenus = {
    about: {
      label: "About Us",
      title: "Creating places with heart",
      description: "Discover the people, purpose and long-term thinking behind Chinachem Group.",
      links: [
        "Mission & Vision",
        "Our Story",
        "Leadership",
        "Corporate Governance",
        "Accolades"
      ],
      featureLabel: "Featured story",
      featureTitle: "Building a better Hong Kong through enduring places",
      featureImage: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1000&q=85"
    },
    work: {
      label: "Our Work",
      title: "Places shaped around life",
      description: "Explore the homes, workplaces, destinations and neighbourhoods we create and care for.",
      links: [
        "Our Portfolio",
        "Hospitality & Entertainment",
        "Property Services",
        "Healthcare",
        "Membership Rewards"
      ],
      featureLabel: "Featured place",
      featureTitle: "A historic landmark reimagined for a new generation",
      featureImage: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1000&q=85"
    },
    impact: {
      label: "Our Impact",
      title: "Progress with lasting value",
      description: "See how we bring environmental and social responsibility into every place and partnership.",
      links: [
        "Our Approach",
        "Environment",
        "Social",
        "Placemaking",
        "Sustainability Reports",
        "Governance"
      ],
      featureLabel: "Latest report",
      featureTitle: "Our pathway towards a low-carbon and resilient future",
      featureImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85"
    },
    news: {
      label: "News",
      title: "Stories from across the Group",
      description: "Read the latest news, perspectives and reports from our places and communities.",
      links: [
        "News",
        "LIFE+"
      ],
      featureLabel: "Latest story",
      featureTitle: "Opening new spaces for creativity and shared experience",
      featureImage: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=1000&q=85"
    },
    join: {
      label: "Join Us",
      title: "Build what comes next",
      description: "Bring your perspective to a team creating better places and stronger communities.",
      links: [
        "A rewarding career",
        "Internship Program"
      ],
      featureLabel: "People story",
      featureTitle: "Meet the people helping our communities thrive",
      featureImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=85"
    }
  };

  /* -----------------------------------------------------------
     TEMPLATES
     ----------------------------------------------------------- */

  function siteHeaderHTML(section, ctaHref) {
    const navLink = key => `
          <button class="nav-link${key === section ? " is-current" : ""}" type="button" data-menu="${key}" aria-expanded="false" aria-controls="megaMenu">${megaMenus[key].label}</button>`;

    return `
    <div class="site-header" id="siteHeader">
      <nav class="nav" aria-label="Primary navigation">
        <a href="${root}index.html" class="nav-brand" aria-label="Chinachem Group home">
          <img src="${root}images/logo-full.svg" alt="Chinachem Group">
        </a>

        <div class="nav-links">${["about", "work", "impact", "news", "join"].map(navLink).join("")}
        </div>

        <div class="nav-actions">
          <button class="search-button" type="button" aria-label="Search">
            <span class="search-icon" aria-hidden="true"></span>
          </button>

          <a href="${ctaHref}" class="nav-cta">
            <span class="nav-cta-label">Sales &amp; Leasing</span>
            <span class="nav-cta-arrow" aria-hidden="true">
              <span class="inline-arrow"></span>
            </span>
          </a>

          <button class="nav-menu-button" id="navMenuButton" type="button" aria-label="Menu" aria-expanded="false">
            <span class="nav-menu-lines" aria-hidden="true"></span>
          </button>
        </div>
      </nav>

      <div class="mega-menu" id="megaMenu" aria-hidden="true">
        <div class="mega-grid">
          <section class="mega-column mega-overview" aria-labelledby="megaTitle">
            <p class="mega-kicker" id="megaKicker">About Us</p>
            <h2 id="megaTitle">Creating places with heart</h2>
            <p id="megaDescription">Discover the people, purpose and long-term thinking behind Chinachem Group.</p>
          </section>

          <section class="mega-column" aria-label="Links, first group">
            <ul class="mega-link-list" id="megaLinksOne"></ul>
          </section>

          <section class="mega-column" aria-label="Links, second group">
            <ul class="mega-link-list" id="megaLinksTwo"></ul>
          </section>

          <article class="mega-column mega-feature">
            <p class="mega-column-label" id="megaFeatureLabel">Featured story</p>
            <a href="#" id="megaFeatureLink">
              <div class="mega-feature-image">
                <img id="megaFeatureImage" src="" alt="">
              </div>
              <h3 id="megaFeatureTitle"></h3>
              <span class="feature-link">Read the story <span class="inline-arrow" aria-hidden="true"></span></span>
            </a>
          </article>
        </div>

        <div class="mega-utility">
          <a class="mega-contact" href="#contact">Contact Us</a>
          <button class="language-toggle" type="button" aria-label="Change language: English, Simplified Chinese or Traditional Chinese">
            <span>EN</span><span aria-hidden="true">/</span><span>简</span><span aria-hidden="true">/</span><span>繁</span>
          </button>
        </div>
      </div>
    </div>

    <div class="mobile-menu" id="mobileMenu" aria-hidden="true">
        <nav class="mobile-menu-stage" aria-label="Primary navigation">
          <div class="mobile-menu-list">
            ${Object.entries(megaMenus).map(([key, menu], index) => `
            <button class="mobile-menu-head" type="button" data-menu="${key}">
              <span class="mobile-menu-label">${menu.label}</span>
              <span class="ui-arrow" aria-hidden="true"></span>
            </button>`).join("")}
          </div>

          <div class="mobile-menu-sub" id="mobileMenuSub" aria-hidden="true">
            <button class="mobile-menu-back" type="button">
              <span class="ui-arrow" aria-hidden="true"></span>
              Back
            </button>

            <p class="mobile-menu-sub-head" id="mobileMenuSubLabel"></p>

            <div class="mobile-menu-sub-links" id="mobileMenuSubLinks"></div>
          </div>
        </nav>

        <div class="mobile-menu-utility">
          <button class="mobile-menu-search" type="button">
            Search
            <span class="search-icon" aria-hidden="true"></span>
          </button>

          <div class="mobile-menu-utility-row">
            <a class="mega-contact" href="#contact">Contact Us</a>
            <button class="language-toggle" type="button" aria-label="Change language: English, Simplified Chinese or Traditional Chinese">
              <span>EN</span><span aria-hidden="true">/</span><span>简</span><span aria-hidden="true">/</span><span>繁</span>
            </button>
          </div>
        </div>
    </div>`;
  }

  function footerHTML() {
    return `
  <footer>

    <div class="footer-nav-grid">

      <div class="footer-column">
        <h3>About Us</h3>
        <a href="#">Mission &amp; Vision</a>
        <a href="#">Our Story</a>
        <a href="#">Leadership</a>
        <a href="#">Corporate Governance</a>
        <a href="#">Accolades</a>
      </div>

      <div class="footer-column">
        <h3>Our Work</h3>
        <a href="#">Our Portfolio</a>
        <a href="#">Hospitality &amp; Entertainment</a>
        <a href="#">Property Services</a>
        <a href="#">Healthcare</a>
        <a href="#">Membership Rewards</a>
      </div>

      <div class="footer-column">
        <h3>Our Impact</h3>
        <a href="#">Our Approach</a>
        <a href="#">Environment</a>
        <a href="#">Social</a>
        <a href="#">Placemaking</a>
        <a href="#">Sustainability Reports</a>
        <a href="#">Governance</a>
      </div>

      <div class="footer-column">
        <h3>News</h3>
        <a href="#">News</a>
        <a href="#">LIFE+</a>
      </div>

      <div class="footer-column">
        <h3>Join Us</h3>
        <a href="#">A rewarding career</a>
        <a href="#">Internship Program</a>
      </div>

      <div class="footer-column">
        <h3><a href="#contact">Contact Us</a></h3>
        <p class="footer-address">
          Nina Tower, 8 Yeung Uk Road,<br>
          Tsuen Wan, Hong Kong
        </p>
        <a href="tel:+85228336000">+852 2833 6000</a>
        <a href="mailto:info@chinachem.com">info@chinachem.com</a>
      </div>

    </div>

    <div class="footer-bottom">
      <a href="${root}index.html" class="footer-logo" aria-label="Chinachem Group home">
        <img src="${root}images/logo-full.svg" alt="Chinachem Group">
      </a>

      <div class="footer-legal">
        <span>© Chinachem Group. All rights reserved.</span>
        <a href="#">Accessibility</a>
        <a href="#">Disclaimer</a>
        <a href="#">Data privacy policy</a>
      </div>

      <div class="footer-social" aria-label="Social links">
        <a href="#" aria-label="Facebook"><img src="${root}images/social/facebook.svg" alt=""></a>
        <a href="#" aria-label="Instagram"><img src="${root}images/social/instagram.svg" alt=""></a>
        <a href="#" aria-label="LinkedIn"><img src="${root}images/social/linkedin.svg" alt=""></a>
        <a href="#" aria-label="WeChat"><img src="${root}images/social/wechat.svg" alt=""></a>
        <a href="#" aria-label="YouTube"><img src="${root}images/social/youtube.svg" alt=""></a>
      </div>
    </div>

  </footer>`;
  }

  /* -----------------------------------------------------------
     SITE HEADER BEHAVIOUR — sticky reveal + mega menu
     ----------------------------------------------------------- */

  function bindSiteHeader() {
    const siteHeader = document.querySelector("#siteHeader");
    const megaMenu = document.querySelector("#megaMenu");
    const navLinks = [...document.querySelectorAll(".nav-link")];
    const megaKicker = document.querySelector("#megaKicker");
    const megaTitle = document.querySelector("#megaTitle");
    const megaDescription = document.querySelector("#megaDescription");
    const megaLinksOne = document.querySelector("#megaLinksOne");
    const megaLinksTwo = document.querySelector("#megaLinksTwo");
    const megaFeatureLabel = document.querySelector("#megaFeatureLabel");
    const megaFeatureTitle = document.querySelector("#megaFeatureTitle");
    const megaFeatureImage = document.querySelector("#megaFeatureImage");
    const megaFeatureLink = document.querySelector("#megaFeatureLink");

    let activeMenuKey = null;
    let menuCloseTimer;
    let lastHeaderScrollY = window.scrollY;
    let headerRevealFrame;

    function renderMenuLinks(target, links, startIndex = 0) {
      target.innerHTML = links.map((link, index) => `
        <li>
          <a href="#">
            <span class="mega-link-number">${String(startIndex + index + 1).padStart(2, "0")}</span>
            <span>${link}</span>
          </a>
        </li>
      `).join("");
    }

    function populateMegaMenu(key) {
      const menu = megaMenus[key];
      const splitIndex = Math.ceil(menu.links.length / 2);

      megaKicker.textContent = menu.label;
      megaTitle.textContent = menu.title;
      megaDescription.textContent = menu.description;
      renderMenuLinks(megaLinksOne, menu.links.slice(0, splitIndex));
      renderMenuLinks(megaLinksTwo, menu.links.slice(splitIndex), splitIndex);
      megaFeatureLabel.textContent = menu.featureLabel;
      megaFeatureTitle.textContent = menu.featureTitle;
      megaFeatureImage.src = menu.featureImage;
      megaFeatureImage.alt = menu.featureTitle;
      megaFeatureLink.href = "#";
    }

    function syncHeaderState() {
      const atTop = window.scrollY <= 6;
      const menuIsOpen = megaMenu.classList.contains("is-open");

      if (atTop) {
        siteHeader.classList.remove("is-sticky", "is-hidden");
      }

      const shouldBeSolid = menuIsOpen || siteHeader.classList.contains("is-sticky");
      siteHeader.classList.toggle("is-solid", shouldBeSolid);
    }

    function revealStickyHeader() {
      window.cancelAnimationFrame(headerRevealFrame);

      if (!siteHeader.classList.contains("is-sticky")) {
        /* Jump to the hidden position with transitions off. Otherwise the
           header transitions from its resting place UP to -100%, and the
           reveal a frame later reverses a run already in flight — so it
           barely moves and the background fade is all you see. Suppressing
           the jump means the slide down is the whole animation. */
        siteHeader.style.transition = "none";
        siteHeader.classList.add("is-sticky", "is-hidden", "is-solid");
        void siteHeader.offsetHeight;
        siteHeader.style.transition = "";

        headerRevealFrame = window.requestAnimationFrame(() => {
          siteHeader.classList.remove("is-hidden");
        });
      } else {
        siteHeader.classList.remove("is-hidden");
      }
    }

    function handleHeaderScroll() {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastHeaderScrollY;
      const menuIsOpen = megaMenu.classList.contains("is-open");

      if (currentScrollY <= 6) {
        siteHeader.classList.remove("is-sticky", "is-hidden");
      } else if (scrollDelta < -3 && currentScrollY > 92) {
        revealStickyHeader();
      } else if (scrollDelta > 3 && siteHeader.classList.contains("is-sticky") && !menuIsOpen) {
        siteHeader.classList.add("is-hidden");
      }

      lastHeaderScrollY = currentScrollY;
      syncHeaderState();
    }

    function openMegaMenu(key, trigger) {
      window.clearTimeout(menuCloseTimer);

      if (activeMenuKey !== key) {
        populateMegaMenu(key);
      }

      activeMenuKey = key;
      megaMenu.classList.add("is-open");
      megaMenu.setAttribute("aria-hidden", "false");
      siteHeader.classList.remove("is-hidden");

      navLinks.forEach(link => {
        link.setAttribute("aria-expanded", String(link === trigger));
      });

      syncHeaderState();
    }

    function closeMegaMenu() {
      activeMenuKey = null;
      megaMenu.classList.remove("is-open");
      megaMenu.setAttribute("aria-hidden", "true");
      navLinks.forEach(link => link.setAttribute("aria-expanded", "false"));
      syncHeaderState();
    }

    function scheduleMenuClose() {
      window.clearTimeout(menuCloseTimer);
      menuCloseTimer = window.setTimeout(closeMegaMenu, 150);
    }

    navLinks.forEach(link => {
      link.addEventListener("pointerenter", () => {
        openMegaMenu(link.dataset.menu, link);
      });

      link.addEventListener("focus", () => {
        openMegaMenu(link.dataset.menu, link);
      });

      link.addEventListener("click", () => {
        openMegaMenu(link.dataset.menu, link);
      });
    });

    siteHeader.addEventListener("pointerenter", () => {
      window.clearTimeout(menuCloseTimer);
    });

    siteHeader.addEventListener("pointerleave", scheduleMenuClose);

    siteHeader.addEventListener("focusout", event => {
      if (!siteHeader.contains(event.relatedTarget)) {
        scheduleMenuClose();
      }
    });

    document.addEventListener("pointerdown", event => {
      if (!siteHeader.contains(event.target)) {
        closeMegaMenu();
      }
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && megaMenu.classList.contains("is-open")) {
        const activeTrigger = navLinks.find(link => link.dataset.menu === activeMenuKey);
        closeMegaMenu();
        activeTrigger?.focus();
      }
    });

    window.addEventListener("scroll", handleHeaderScroll, { passive: true });
    syncHeaderState();

    /* ---- mobile menu (burger panel, ≤1000) ---- */

    const menuButton = document.querySelector("#navMenuButton");
    const mobileMenu = document.querySelector("#mobileMenu");

    const mobileMenuSub = document.querySelector("#mobileMenuSub");
    const mobileMenuSubLabel = document.querySelector("#mobileMenuSubLabel");
    const mobileMenuSubLinks = document.querySelector("#mobileMenuSubLinks");

    function setMobileSub(open) {
      mobileMenu.classList.toggle("is-sub", open);
      mobileMenuSub.setAttribute("aria-hidden", String(!open));
    }

    function setMobileMenu(open) {
      menuButton.setAttribute("aria-expanded", String(open));
      mobileMenu.classList.toggle("is-open", open);
      mobileMenu.setAttribute("aria-hidden", String(!open));
      siteHeader.classList.toggle("menu-open", open);
      document.body.classList.toggle("menu-open", open);

      if (open) {
        siteHeader.classList.remove("is-hidden");
      } else {
        setMobileSub(false);
      }
    }

    menuButton.addEventListener("click", () => {
      setMobileMenu(menuButton.getAttribute("aria-expanded") !== "true");
    });

    mobileMenu.addEventListener("click", event => {
      const head = event.target.closest(".mobile-menu-head");

      if (head) {
        const menu = megaMenus[head.dataset.menu];

        mobileMenuSubLabel.textContent = menu.label;
        mobileMenuSubLinks.innerHTML = menu.links.map(link => `<a href="#">${link}</a>`).join("");

        setMobileSub(true);
        return;
      }

      if (event.target.closest(".mobile-menu-back")) {
        setMobileSub(false);
      }
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && mobileMenu.classList.contains("is-open")) {
        setMobileMenu(false);
        menuButton.focus();
      }
    });
  }

  /* -----------------------------------------------------------
     CARD CAROUSEL — shared initialiser
     Usage: ccgCarousel({ track, prev, next, current, progress,
     visible: () => n, onChange: (index, visible) => {} })
     — cards are the track's element children; onChange fires
     after every move/resize with the first visible index.
     ----------------------------------------------------------- */

  window.ccgCarousel = function ({ track, prev, next, current, progress, visible, onChange }) {
    const cards = [...track.children];

    let index = 0;
    let dragStart = 0;
    let dragDelta = 0;
    let dragging = false;

    function step() {
      if (cards.length < 2) {
        return cards[0].getBoundingClientRect().width;
      }

      return cards[1].offsetLeft - cards[0].offsetLeft;
    }

    function maxIndex() {
      return Math.max(0, cards.length - visible());
    }

    function update(animate = true) {
      index = Math.max(0, Math.min(index, maxIndex()));

      track.style.transition = animate
        ? "transform .7s cubic-bezier(.22,.61,.36,1)"
        : "none";

      track.style.transform = `translate3d(${-index * step()}px,0,0)`;

      if (current) {
        current.textContent = String(index + 1).padStart(2, "0");
      }

      if (progress) {
        const p = maxIndex() === 0 ? 0 : index / maxIndex();
        // thumb is 15% wide: (100 - 15) / 15 lands its far edge flush at p = 1
        progress.style.transform = `translateX(${p * 566.67}%)`;
      }

      if (onChange) onChange(index, visible());
    }

    function move(direction) {
      index += direction;

      if (index > maxIndex()) index = 0;
      if (index < 0) index = maxIndex();

      update();
    }

    prev.addEventListener("click", () => move(-1));
    next.addEventListener("click", () => move(1));

    track.addEventListener("pointerdown", event => {
      if (event.pointerType === "mouse" && event.button !== 0) return;

      dragging = true;
      dragStart = event.clientX;
      dragDelta = 0;
      track.setPointerCapture(event.pointerId);
      track.style.transition = "none";
    });

    track.addEventListener("pointermove", event => {
      if (!dragging) return;

      dragDelta = event.clientX - dragStart;
      track.style.transform = `translate3d(${(-index * step()) + dragDelta}px,0,0)`;
    });

    function finishDrag(event) {
      if (!dragging) return;

      dragging = false;

      if (track.hasPointerCapture(event.pointerId)) {
        track.releasePointerCapture(event.pointerId);
      }

      if (Math.abs(dragDelta) > 55) {
        move(dragDelta < 0 ? 1 : -1);
      } else {
        update();
      }
    }

    track.addEventListener("pointerup", finishDrag);
    track.addEventListener("pointercancel", finishDrag);

    window.addEventListener("resize", () => update(false));
    update(false);
  };

  /* -----------------------------------------------------------
     SERVICE TABS — auto-initialised
     Markup contract: SERVICE TABS banner in components.css.
     Click or ←/→ switches the active tab; panels are matched
     by each tab's aria-controls.
     ----------------------------------------------------------- */

  document.querySelectorAll(".service-tabs").forEach(tablist => {
    const tabs = [...tablist.querySelectorAll(".service-tab")];
    const panels = tabs.map(tab => document.getElementById(tab.getAttribute("aria-controls")));
    const autoplay = parseInt(tablist.dataset.autoplay || "0", 10);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stage = tablist.parentElement;

    let current = 0;
    let timer = null;

    const activate = active => {
      current = active;
      tabs.forEach((tab, i) => {
        const on = i === active;
        tab.classList.toggle("is-active", on);
        tab.setAttribute("aria-selected", String(on));
        tab.tabIndex = on ? 0 : -1;
        if (panels[i]) panels[i].classList.toggle("is-active", on);
      });

      // Keep the active tab in view when the list scrolls horizontally (mobile)
      if (tablist.scrollWidth > tablist.clientWidth) {
        const tab = tabs[active];
        tablist.scrollTo({
          left: tab.offsetLeft - (tablist.clientWidth - tab.offsetWidth) / 2,
          behavior: reduceMotion ? "auto" : "smooth"
        });
      }
    };

    // Restart the CSS progress animation on the active tab
    const replayProgress = () => {
      const tab = tabs[current];
      tab.classList.remove("is-active");
      void tab.offsetWidth;
      tab.classList.add("is-active");
    };

    const stop = () => {
      clearInterval(timer);
      timer = null;
    };

    const play = () => {
      if (!autoplay || reduceMotion) return;
      stop();
      timer = setInterval(() => activate((current + 1) % tabs.length), autoplay);
    };

    const select = i => {
      activate(i);
      play();
    };

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(i));
      tab.addEventListener("keydown", event => {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft" && event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
        event.preventDefault();
        const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
        const next = (i + (forward ? 1 : -1) + tabs.length) % tabs.length;
        select(next);
        tabs[next].focus();
      });
    });

    if (autoplay && !reduceMotion) {
      tablist.style.setProperty("--service-duration", autoplay + "ms");

      const pause = () => {
        stop();
        tablist.dataset.paused = "true";
      };

      const resume = () => {
        tablist.dataset.paused = "false";
        replayProgress();
        play();
      };

      stage.addEventListener("mouseenter", pause);
      stage.addEventListener("mouseleave", resume);
      stage.addEventListener("focusin", pause);
      stage.addEventListener("focusout", event => {
        if (!stage.contains(event.relatedTarget)) resume();
      });

      document.addEventListener("visibilitychange", () => {
        document.hidden ? pause() : resume();
      });
    }

    select(Math.max(0, tabs.findIndex(tab => tab.classList.contains("is-active"))));
  });

  /* -----------------------------------------------------------
     TEXT FILTER — drag to scroll, auto-initialised
     Markup contract: TEXT FILTER banner in components.css.
     A row that outgrows its column scrolls; touch and trackpad
     get that for free, a mouse does not. This adds click-drag
     scrubbing without costing the row its clicks: movement past
     a small threshold marks the gesture a drag and swallows the
     click that follows, so dragging never selects a filter.
     ----------------------------------------------------------- */

  document.querySelectorAll(".filter-display").forEach(row => {
    let dragging = false;
    let moved = false;
    let startX = 0;
    let startScroll = 0;

    const scrollable = () => row.scrollWidth > row.clientWidth;

    row.addEventListener("pointerdown", event => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      if (!scrollable()) return;

      dragging = true;
      moved = false;
      startX = event.clientX;
      startScroll = row.scrollLeft;
    });

    row.addEventListener("pointermove", event => {
      if (!dragging) return;

      const delta = event.clientX - startX;

      /* below the threshold this is still a click, not a drag */
      if (!moved) {
        if (Math.abs(delta) <= 5) return;
        moved = true;
        row.dataset.dragging = "true";
      }

      /* scroll first: capture is an enhancement and must never be
         able to stop the row moving if it throws */
      row.scrollLeft = startScroll - delta;

      /* capture keeps the drag alive if the pointer leaves the row */
      try {
        if (!row.hasPointerCapture(event.pointerId)) row.setPointerCapture(event.pointerId);
      } catch (error) {
        /* no capture available; the drag still works within the row */
      }
    });

    function finishDrag(event) {
      if (!dragging) return;

      dragging = false;
      delete row.dataset.dragging;

      try {
        if (row.hasPointerCapture(event.pointerId)) row.releasePointerCapture(event.pointerId);
      } catch (error) {
        /* nothing captured */
      }

      /* the click lands after pointerup; drop it only if we dragged */
      if (moved) {
        row.addEventListener("click", swallow, { capture: true, once: true });
        window.setTimeout(() => row.removeEventListener("click", swallow, { capture: true }), 0);
      }
    }

    function swallow(event) {
      event.stopPropagation();
      event.preventDefault();
    }

    row.addEventListener("pointerup", finishDrag);
    row.addEventListener("pointercancel", finishDrag);
  });

  /* -----------------------------------------------------------
     STAT COUNT-UP — auto-initialised
     Usage: <span data-count="2900">0</span>
            <span data-count="2.8" data-decimals="1">0</span>
     Counts up from 0 when 60% in view, 1.4s eased. Output is
     en-US formatted (thousands commas; fixed decimals when
     data-decimals is set). Reduced-motion renders the final
     value immediately.
     ----------------------------------------------------------- */

  const counters = [...document.querySelectorAll("[data-count]")];

  if (counters.length) {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const formatCount = (value, decimals) =>
      value.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });

    const animateCounter = el => {
      const target = parseFloat(el.dataset.count);
      const decimals = parseInt(el.dataset.decimals || "0", 10);
      const duration = 1400;
      const start = performance.now();

      const tick = now => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = formatCount(target * eased, decimals);
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    if (reduceMotion) {
      counters.forEach(el => {
        el.textContent = formatCount(parseFloat(el.dataset.count), parseInt(el.dataset.decimals || "0", 10));
      });
    } else {
      const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: .6 });

      counters.forEach(el => counterObserver.observe(el));
    }
  }

  /* -----------------------------------------------------------
     FEATURE PARALLAX — shared initialiser
     Binds every .parallax-media image (sized taller than its
     clipping frame, e.g. in a feature-split) so it drifts
     slower than the scroll. Call window.ccgParallax() once
     after the page's markup is in place. Respects
     prefers-reduced-motion by never binding.
     ----------------------------------------------------------- */

  window.ccgParallax = function () {
    const imgs = [...document.querySelectorAll(".parallax-media")];

    if (!imgs.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let ticking = false;

    function update() {
      ticking = false;

      const viewportH = window.innerHeight;

      imgs.forEach(img => {
        const rect = img.parentElement.getBoundingClientRect();

        if (rect.bottom < 0 || rect.top > viewportH) return;

        /* 0 when the frame enters from below, 1 when it leaves above */
        const progress = (viewportH - rect.top) / (viewportH + rect.height);
        const travel = img.offsetHeight - rect.height;

        img.style.transform = `translate3d(0, ${-progress * travel}px, 0)`;
      });
    }

    function request() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    update();
  };

  /* -----------------------------------------------------------
     MOUNT
     ----------------------------------------------------------- */

  const headerMount = document.querySelector('[data-component="site-header"]');
  if (headerMount) {
    const section = headerMount.dataset.section || "";
    const ctaHref = headerMount.dataset.ctaHref || "#contact";
    headerMount.outerHTML = siteHeaderHTML(section, ctaHref);
    bindSiteHeader();
  }

  const footerMount = document.querySelector('[data-component="site-footer"]');
  if (footerMount) {
    footerMount.outerHTML = footerHTML();
  }
})();
