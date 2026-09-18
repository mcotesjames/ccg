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
     SEARCH INDEX — a small client-side stand-in for the search
     endpoint. The header panel shows the top three; the results
     page (core-pages/search/search.html) filters, sorts and pages
     the same list. type = the live site's search categories.
     ----------------------------------------------------------- */

  const searchIndex = [
    ...Object.values(megaMenus).flatMap(menu =>
      menu.links.map(link => ({ title: link, section: menu.label, date: "2026-01-15" }))
    ),
    { title: "Nina Tower", section: "Our Portfolio", type: "Property", date: "2025-09-02", excerpt: "A 1,008-foot landmark at Tsuen Wan West, home to offices, Nina Hotel and the Group's headquarters." },
    { title: "Central Market", section: "Our Portfolio", type: "Property", date: "2025-06-18", excerpt: "The revitalised heritage market in Central, reopened as a playground for the city." },
    { title: "Zendo House", section: "Our Portfolio", type: "Property", date: "2025-03-11", excerpt: "Residences in Tsim Sha Tsui designed around light, quiet and the life of the street." },
    { title: "In One", section: "Our Portfolio", type: "Property", date: "2024-11-27", excerpt: "A Ho Man Tin residential address set against the hillside greenery." },
    { title: "Lucky Plaza", section: "Our Portfolio", type: "Property", date: "2024-10-31", excerpt: "Sha Tin's neighbourhood mall, with a podium garden and weekly community programme." },
    { title: "Nina Hotel Tsuen Wan West", section: "Hospitality & Entertainment", type: "Property", date: "2024-08-22", excerpt: "Harbour-view rooms and conference floors beside the Group's Tsuen Wan headquarters." },
    { title: "Future-Ready Hong Kong Summit 2026", section: "News", type: "Press Release", date: "2026-06-16", excerpt: "Global experts convene to address Hong Kong's dual climate and ageing challenges." },
    { title: "No Act is Too Small: CCG Launches REACT Campaign", section: "News", type: "Press Release", date: "2026-06-24", excerpt: "A Group-wide call to everyday climate action across estates, malls and hotels." },
    { title: "Green Tenancy Programme Expands to Twelve More Buildings", section: "News", type: "Press Release", date: "2026-06-18" },
    { title: "Tsuen Wan Games Return to D·PARK This Summer", section: "News", type: "Press Release", date: "2026-06-09" },
    { title: "Graduate Programme 2026 Opens for Applications", section: "News", type: "Press Release", date: "2026-06-02" },
    { title: "Chinachem and Her Members Shape a Sustainable Future", section: "News", type: "Press Release", date: "2016-04-14" },
    { title: "Chinachem Cultivates a Culture of Save and Share", section: "News", type: "Press Release", date: "2017-07-20" },
    { title: "Chinachem Properties Once Again Crowns Platinum Award of Charter on External Lighting", section: "News", type: "Award", date: "2019-07-08" },
    { title: "Nina Park Wins Landscape Institute Award for Public Realm", section: "About Us", type: "Award", date: "2023-11-14", excerpt: "The Tsuen Wan pocket park is recognised for returning a working waterfront to the neighbourhood." },
    { title: "Sustainability Report 2025", section: "Our Impact", type: "Award", date: "2025-10-09", excerpt: "GRESB 5-star and Global Sector Leader; a 27.7% emissions reduction against the 2020 baseline." },
    { title: "Sustainability Report 2024", section: "Our Impact", type: "Award", date: "2024-10-10" },
    { title: "Places with Heart — the Chinachem story (film)", section: "About Us", type: "Multimedia", date: "2025-02-20", excerpt: "Sixty years of building for Hong Kong, told by the people who live and work in the places." },
    { title: "Central Market rooftop season highlights (video)", section: "News", type: "Multimedia", date: "2026-07-18" },
    { title: "Makers' Market at Nina Park (gallery)", section: "News", type: "Multimedia", date: "2026-07-12" },
    { title: "Sales & Leasing", section: "Contact", date: "2026-01-15" }
  ];

  /* title-starts-with outranks title-contains outranks section-contains */
  function searchMatches(query) {
    const q = String(query || "").trim().toLowerCase();

    if (q.length < 2) {
      return [];
    }

    const rank = item => {
      const title = item.title.toLowerCase();
      if (title.startsWith(q)) return 0;
      if (title.includes(q)) return 1;
      if (item.section.toLowerCase().includes(q)) return 2;
      if ((item.excerpt || "").toLowerCase().includes(q)) return 3;
      return -1;
    };

    return searchIndex
      .map(item => ({ item, rank: rank(item) }))
      .filter(entry => entry.rank >= 0)
      .sort((a, b) => a.rank - b.rank)
      .map(entry => entry.item);
  }

  const searchResultsUrl = query =>
    root + "core-pages/search/search.html?q=" + encodeURIComponent(String(query || "").trim());

  window.ccgSearchIndex = searchIndex;
  window.ccgSearchMatches = searchMatches;
  window.ccgSearchResultsUrl = searchResultsUrl;

  /* -----------------------------------------------------------
     TEMPLATES
     ----------------------------------------------------------- */

  function siteHeaderHTML(section, ctaHref) {
    const navLink = key => `
          <button class="nav-link${key === section ? " is-current" : ""}" type="button" data-menu="${key}" aria-expanded="false" aria-controls="megaMenu">${megaMenus[key].label}</button>`;

    return `
    <div class="site-header is-preload" id="siteHeader">
      <nav class="nav" aria-label="Primary navigation">
        <a href="${root}index.html" class="nav-brand" aria-label="Chinachem Group home">
          <img src="${root}images/logo-full.svg" alt="Chinachem Group">
        </a>

        <div class="nav-links">${["about", "work", "impact", "news", "join"].map(navLink).join("")}
        </div>

        <div class="nav-actions">
          <button class="search-button" type="button" aria-label="Search" aria-expanded="false" aria-controls="searchPanel">
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

          <section class="mega-column" aria-label="Links">
            <ul class="mega-link-list" id="megaLinks"></ul>
          </section>

          <article class="mega-column mega-feature">
            <p class="mega-column-label" id="megaFeatureLabel">Featured story</p>
            <a href="#" id="megaFeatureLink">
              <div class="mega-feature-image">
                <img id="megaFeatureImage" src="" alt="">
              </div>
              <h3 id="megaFeatureTitle"></h3>
              <span class="link-arrow">Read the story</span>
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

      <div class="search-panel" id="searchPanel" aria-hidden="true">
        <div class="search-grid">
          <form class="search-field" role="search" action="#">
            <input class="search-input" id="siteSearch" type="search" name="q" placeholder="Search properties, stories, reports…" aria-label="Search" autocomplete="off">

            <div class="search-results" id="searchResults" aria-live="polite" hidden>
              <ol class="mega-link-list search-results-list" id="searchResultsList"></ol>
              <p class="search-results-empty" id="searchResultsEmpty" hidden></p>
              <a class="feature-link search-results-all" id="searchResultsAll" href="#" hidden>
                <span id="searchResultsAllLabel">See all results</span>
                <span class="inline-arrow" aria-hidden="true"></span>
              </a>
            </div>
          </form>
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

            <a class="mobile-menu-story" id="mobileMenuStory" href="#">
              <span class="mobile-menu-story-label" id="mobileMenuStoryLabel">Featured story</span>
              <span class="mobile-menu-story-image"><img id="mobileMenuStoryImage" src="" alt=""></span>
              <span class="mobile-menu-story-title" id="mobileMenuStoryTitle"></span>
              <span class="link-arrow">Read the story</span>
            </a>
          </div>

          <div class="mobile-menu-search-pane" id="mobileMenuSearch" aria-hidden="true">
            <button class="mobile-menu-back" type="button">
              <span class="ui-arrow" aria-hidden="true"></span>
              Back
            </button>

            <form class="mobile-search" role="search" action="#">
              <input class="mobile-search-input" id="mobileSearchInput" type="search" name="q" placeholder="Search" aria-label="Search the site" autocomplete="off" enterkeyhint="search">

              <div class="search-results" id="mobileSearchResults" aria-live="polite" hidden>
                <ol class="mega-link-list search-results-list" id="mobileSearchResultsList"></ol>
                <p class="search-results-empty" id="mobileSearchResultsEmpty" hidden></p>
                <a class="feature-link search-results-all" id="mobileSearchResultsAll" href="#" hidden>
                  <span id="mobileSearchResultsAllLabel">See all results</span>
                  <span class="inline-arrow" aria-hidden="true"></span>
                </a>
              </div>
            </form>
          </div>
        </nav>

        <div class="mobile-menu-utility">
          <button class="mobile-menu-search" type="button">
            <span class="mobile-menu-label">Search</span>
            <span class="ui-arrow" aria-hidden="true"></span>
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

  /* footer social icons are inline so they take the link colour
     (currentColor) and can be recoloured on hover. Paths are copied
     from images/social/*.svg - update both together. */
  const SOCIAL_ICON_PATHS = {
    facebook: '<path d="M7.99984 0C3.58169 0 0 3.58169 0 7.99984C0 11.7514 2.58299 14.8995 6.0674 15.7642V10.4446H4.41783V7.99984H6.0674V6.94642C6.0674 4.2236 7.29969 2.96154 9.97292 2.96154C10.4798 2.96154 11.3543 3.06106 11.7121 3.16026V5.37621C11.5233 5.35637 11.1953 5.34645 10.7879 5.34645C9.47629 5.34645 8.96942 5.8434 8.96942 7.13522V7.99984H11.5825L11.1335 10.4446H8.96942V15.9411C12.9306 15.4627 16 12.09 16 7.99984C15.9997 3.58169 12.418 0 7.99984 0Z" fill="currentColor"/>',
    instagram: '<path d="M8 1.44063C10.1375 1.44063 10.3906 1.45 11.2312 1.4875C12.0125 1.52188 12.4344 1.65313 12.7156 1.7625C13.0875 1.90625 13.3562 2.08125 13.6344 2.35938C13.9156 2.64063 14.0875 2.90625 14.2312 3.27813C14.3406 3.55938 14.4719 3.98438 14.5062 4.7625C14.5437 5.60625 14.5531 5.85938 14.5531 7.99375C14.5531 10.1313 14.5437 10.3844 14.5062 11.225C14.4719 12.0063 14.3406 12.4281 14.2312 12.7094C14.0875 13.0813 13.9125 13.35 13.6344 13.6281C13.3531 13.9094 13.0875 14.0813 12.7156 14.225C12.4344 14.3344 12.0094 14.4656 11.2312 14.5C10.3875 14.5375 10.1344 14.5469 8 14.5469C5.8625 14.5469 5.60937 14.5375 4.76875 14.5C3.9875 14.4656 3.56562 14.3344 3.28437 14.225C2.9125 14.0813 2.64375 13.9063 2.36562 13.6281C2.08437 13.3469 1.9125 13.0813 1.76875 12.7094C1.65937 12.4281 1.52812 12.0031 1.49375 11.225C1.45625 10.3813 1.44687 10.1281 1.44687 7.99375C1.44687 5.85625 1.45625 5.60313 1.49375 4.7625C1.52812 3.98125 1.65937 3.55938 1.76875 3.27813C1.9125 2.90625 2.0875 2.6375 2.36562 2.35938C2.64687 2.07813 2.9125 1.90625 3.28437 1.7625C3.56562 1.65313 3.99062 1.52188 4.76875 1.4875C5.60937 1.45 5.8625 1.44063 8 1.44063ZM8 0C5.82812 0 5.55625 0.009375 4.70312 0.046875C3.85312 0.084375 3.26875 0.221875 2.7625 0.41875C2.23437 0.625 1.7875 0.896875 1.34375 1.34375C0.896875 1.7875 0.625 2.23438 0.41875 2.75938C0.221875 3.26875 0.084375 3.85 0.046875 4.7C0.009375 5.55625 0 5.82813 0 8C0 10.1719 0.009375 10.4438 0.046875 11.2969C0.084375 12.1469 0.221875 12.7313 0.41875 13.2375C0.625 13.7656 0.896875 14.2125 1.34375 14.6563C1.7875 15.1 2.23437 15.375 2.75937 15.5781C3.26875 15.775 3.85 15.9125 4.7 15.95C5.55312 15.9875 5.825 15.9969 7.99687 15.9969C10.1687 15.9969 10.4406 15.9875 11.2937 15.95C12.1437 15.9125 12.7281 15.775 13.2344 15.5781C13.7594 15.375 14.2062 15.1 14.65 14.6563C15.0937 14.2125 15.3687 13.7656 15.5719 13.2406C15.7687 12.7313 15.9062 12.15 15.9437 11.3C15.9812 10.4469 15.9906 10.175 15.9906 8.00313C15.9906 5.83125 15.9812 5.55938 15.9437 4.70625C15.9062 3.85625 15.7687 3.27188 15.5719 2.76563C15.375 2.23438 15.1031 1.7875 14.6562 1.34375C14.2125 0.9 13.7656 0.625 13.2406 0.421875C12.7312 0.225 12.15 0.0875 11.3 0.05C10.4437 0.00937501 10.1719 0 8 0Z" fill="currentColor"/><path d="M8 3.89062C5.73125 3.89062 3.89062 5.73125 3.89062 8C3.89062 10.2688 5.73125 12.1094 8 12.1094C10.2688 12.1094 12.1094 10.2688 12.1094 8C12.1094 5.73125 10.2688 3.89062 8 3.89062ZM8 10.6656C6.52813 10.6656 5.33437 9.47188 5.33437 8C5.33437 6.52813 6.52813 5.33437 8 5.33437C9.47188 5.33437 10.6656 6.52813 10.6656 8C10.6656 9.47188 9.47188 10.6656 8 10.6656Z" fill="currentColor"/><path d="M13.2312 3.72891C13.2312 4.26016 12.8 4.68828 12.2719 4.68828C11.7406 4.68828 11.3125 4.25703 11.3125 3.72891C11.3125 3.19766 11.7438 2.76953 12.2719 2.76953C12.8 2.76953 13.2312 3.20078 13.2312 3.72891Z" fill="currentColor"/>',
    linkedin: '<path d="M14.8156 0H1.18125C0.528125 0 0 0.515625 0 1.15313V14.8438C0 15.4813 0.528125 16 1.18125 16H14.8156C15.4688 16 16 15.4813 16 14.8469V1.15313C16 0.515625 15.4688 0 14.8156 0ZM4.74687 13.6344H2.37188V5.99687H4.74687V13.6344ZM3.55938 4.95625C2.79688 4.95625 2.18125 4.34062 2.18125 3.58125C2.18125 2.82188 2.79688 2.20625 3.55938 2.20625C4.31875 2.20625 4.93437 2.82188 4.93437 3.58125C4.93437 4.3375 4.31875 4.95625 3.55938 4.95625ZM13.6344 13.6344H11.2625V9.92188C11.2625 9.0375 11.2469 7.89687 10.0281 7.89687C8.79375 7.89687 8.60625 8.8625 8.60625 9.85938V13.6344H6.2375V5.99687H8.5125V7.04063H8.54375C8.85938 6.44063 9.63438 5.80625 10.7875 5.80625C13.1906 5.80625 13.6344 7.3875 13.6344 9.44375V13.6344Z" fill="currentColor"/>',
    wechat: '<path fill-rule="evenodd" clip-rule="evenodd" d="M14.3347 13.0166C15.3507 12.2799 16 11.1912 16 9.98058C16 7.76325 13.842 5.96525 11.1807 5.96525C8.51933 5.96525 6.36133 7.76325 6.36133 9.98058C6.36133 12.1986 8.51933 13.9966 11.1807 13.9966C11.7307 13.9966 12.2613 13.9186 12.754 13.7766L12.8953 13.7552C12.988 13.7552 13.072 13.7839 13.1513 13.8292L14.2067 14.4386L14.2993 14.4686C14.388 14.4686 14.46 14.3966 14.46 14.3079L14.434 14.1906L14.2167 13.3806L14.2 13.2779C14.2 13.1699 14.2533 13.0746 14.3347 13.0166ZM5.78333 1.53125C2.58933 1.53125 0 3.68858 0 6.35058C0 7.80258 0.778667 9.10992 1.998 9.99325C2.096 10.0626 2.16 10.1773 2.16 10.3073L2.14 10.4299L1.87933 11.4019L1.848 11.5426C1.848 11.6493 1.93467 11.7359 2.04067 11.7359L2.15267 11.6999L3.41867 10.9686C3.51333 10.9139 3.614 10.8799 3.72533 10.8799L3.89533 10.9053C4.486 11.0753 5.12333 11.1699 5.78333 11.1699L6.10067 11.1619C5.97533 10.7859 5.90667 10.3899 5.90667 9.98125C5.90667 7.55392 8.268 5.58592 11.1807 5.58592L11.4947 5.59392C11.0593 3.29192 8.668 1.53125 5.78333 1.53125ZM9.574 9.33858C9.21933 9.33858 8.932 9.05058 8.932 8.69592C8.932 8.34058 9.21933 8.05325 9.574 8.05325C9.92933 8.05325 10.2167 8.34058 10.2167 8.69592C10.2167 9.05058 9.92933 9.33858 9.574 9.33858ZM12.7873 9.33858C12.432 9.33858 12.1447 9.05058 12.1447 8.69592C12.1447 8.34058 12.432 8.05325 12.7873 8.05325C13.142 8.05325 13.4293 8.34058 13.4293 8.69592C13.4293 9.05058 13.142 9.33858 12.7873 9.33858ZM3.85533 5.57925C3.42933 5.57925 3.08467 5.23392 3.08467 4.80858C3.08467 4.38258 3.42933 4.03725 3.85533 4.03725C4.28133 4.03725 4.62667 4.38258 4.62667 4.80858C4.62667 5.23392 4.28133 5.57925 3.85533 5.57925ZM7.71067 5.57925C7.28467 5.57925 6.94 5.23392 6.94 4.80858C6.94 4.38258 7.28467 4.03725 7.71067 4.03725C8.13667 4.03725 8.482 4.38258 8.482 4.80858C8.482 5.23392 8.13667 5.57925 7.71067 5.57925Z" fill="currentColor"/>',
    youtube: '<path d="M15.8406 4.79922C15.8406 4.79922 15.6844 3.69609 15.2031 3.21172C14.5938 2.57422 13.9125 2.57109 13.6 2.53359C11.3625 2.37109 8.00313 2.37109 8.00313 2.37109H7.99687C7.99687 2.37109 4.6375 2.37109 2.4 2.53359C2.0875 2.57109 1.40625 2.57422 0.796875 3.21172C0.315625 3.69609 0.1625 4.79922 0.1625 4.79922C0.1625 4.79922 0 6.09609 0 7.38984V8.60234C0 9.89609 0.159375 11.193 0.159375 11.193C0.159375 11.193 0.315625 12.2961 0.79375 12.7805C1.40313 13.418 2.20313 13.3961 2.55938 13.4648C3.84063 13.5867 8 13.6242 8 13.6242C8 13.6242 11.3625 13.618 13.6 13.4586C13.9125 13.4211 14.5938 13.418 15.2031 12.7805C15.6844 12.2961 15.8406 11.193 15.8406 11.193C15.8406 11.193 16 9.89922 16 8.60234V7.38984C16 6.09609 15.8406 4.79922 15.8406 4.79922ZM6.34688 10.0742V5.57734L10.6687 7.83359L6.34688 10.0742Z" fill="currentColor"/>'
  };

  const socialIcon = name =>
    `<svg class="footer-social-icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">${SOCIAL_ICON_PATHS[name]}</svg>`;

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
        <a href="#" aria-label="Facebook">${socialIcon("facebook")}</a>
        <a href="#" aria-label="Instagram">${socialIcon("instagram")}</a>
        <a href="#" aria-label="LinkedIn">${socialIcon("linkedin")}</a>
        <a href="#" aria-label="WeChat">${socialIcon("wechat")}</a>
        <a href="#" aria-label="YouTube">${socialIcon("youtube")}</a>
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
    const searchPanel = document.querySelector("#searchPanel");
    const searchButton = document.querySelector(".search-button");
    const searchInput = document.querySelector("#siteSearch");

    /* header solidity, sticky reveal and the parked state all key
       off "a panel is open", and the search sheet counts */
    const anyPanelOpen = () =>
      megaMenu.classList.contains("is-open") || searchPanel.classList.contains("is-open");
    const navLinks = [...document.querySelectorAll(".nav-link")];
    const megaKicker = document.querySelector("#megaKicker");
    const megaTitle = document.querySelector("#megaTitle");
    const megaDescription = document.querySelector("#megaDescription");
    const megaLinks = document.querySelector("#megaLinks");
    const megaFeatureLabel = document.querySelector("#megaFeatureLabel");
    const megaFeatureTitle = document.querySelector("#megaFeatureTitle");
    const megaFeatureImage = document.querySelector("#megaFeatureImage");
    const megaFeatureLink = document.querySelector("#megaFeatureLink");

    let activeMenuKey = null;
    let menuCloseTimer;
    let lastHeaderScrollY = window.scrollY;
    let headerRevealFrame;

    /* the menu stays hidden until summoned: hovering the top
       edge slides it down, leaving hides it again */
    const hoverZone = document.createElement("div");
    hoverZone.className = "menu-hover-zone";
    hoverZone.setAttribute("aria-hidden", "true");
    document.body.appendChild(hoverZone);

    let menuHideTimer;

    function summonMenu() {
      window.clearTimeout(menuHideTimer);
      siteHeader.classList.remove("is-preload");

      /* away from the top, the menu arrives as the fixed sticky
         header rather than at the document's top edge */
      if (window.scrollY > 6) {
        revealStickyHeader();
      }
    }

    function dismissMenu() {
      window.clearTimeout(menuHideTimer);
      menuHideTimer = window.setTimeout(() => {
        if (!anyPanelOpen()) {
          siteHeader.classList.add("is-preload");
        }
      }, 350);
    }

    hoverZone.addEventListener("mouseenter", summonMenu);
    siteHeader.addEventListener("mouseenter", summonMenu);
    siteHeader.addEventListener("mouseleave", dismissMenu);
    megaMenu.addEventListener("mouseenter", summonMenu);
    megaMenu.addEventListener("mouseleave", dismissMenu);

    function renderMenuLinks(target, links) {
      target.innerHTML = links.map(link => `
        <li>
          <a href="#">${link}</a>
        </li>
      `).join("");
    }

    function populateMegaMenu(key) {
      const menu = megaMenus[key];

      megaKicker.textContent = menu.label;
      megaTitle.textContent = menu.title;
      megaDescription.textContent = menu.description;
      renderMenuLinks(megaLinks, menu.links);
      megaFeatureLabel.textContent = menu.featureLabel;
      megaFeatureTitle.textContent = menu.featureTitle;
      megaFeatureImage.src = menu.featureImage;
      megaFeatureImage.alt = menu.featureTitle;
      megaFeatureLink.href = "#";
    }

    function syncHeaderState() {
      const atTop = window.scrollY <= 6;
      const menuIsOpen = anyPanelOpen();

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
        /* is-preload parks the summoned menu off-canvas and outranks
           is-hidden, so a scroll-up reveal has to clear it too or the
           header never comes back down. Cleared inside the suppressed
           window: both classes sit at -100%, so nothing jumps. */
        siteHeader.classList.remove("is-preload");
        void siteHeader.offsetHeight;
        siteHeader.style.transition = "";

        headerRevealFrame = window.requestAnimationFrame(() => {
          siteHeader.classList.remove("is-hidden");
        });
      } else {
        siteHeader.classList.remove("is-preload", "is-hidden");
      }
    }

    function handleHeaderScroll() {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastHeaderScrollY;
      const menuIsOpen = anyPanelOpen();

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
      closeSearch();

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

      /* the summoned menu retreats once nothing holds it open */
      if (!siteHeader.matches(":hover") && !hoverZone.matches(":hover") && !searchPanel.classList.contains("is-open")) {
        siteHeader.classList.add("is-preload");
      }
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
        closeSearch();
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

    /* the menu's own search: a third pane that swipes in like a
       section, independent of the desktop search panel */
    const mobileMenuSearch = document.querySelector("#mobileMenuSearch");
    const mobileSearchInput = document.querySelector("#mobileSearchInput");

    function setMobileSearch(open) {
      mobileMenu.classList.toggle("is-search", open);
      mobileMenuSearch.setAttribute("aria-hidden", String(!open));

      if (open) {
        /* synchronous so phones raise the keyboard; preventScroll
           stops the stage jumping to the pane mid-swipe */
        mobileSearchInput.focus({ preventScroll: true });
      } else {
        mobileSearchInput.blur();
        mobileSearchInput.value = "";
        mobileSearchInput.dispatchEvent(new Event("input"));
      }
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
        setMobileSearch(false);
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

        /* the section's sample story, the same one its mega menu features */
        document.querySelector("#mobileMenuStoryLabel").textContent = menu.featureLabel;
        document.querySelector("#mobileMenuStoryTitle").textContent = menu.featureTitle;
        document.querySelector("#mobileMenuStoryImage").src = menu.featureImage;
        mobileMenuSub.scrollTop = 0;

        setMobileSub(true);
        return;
      }

      if (event.target.closest(".mobile-menu-back")) {
        setMobileSub(false);
        setMobileSearch(false);
        return;
      }

      if (event.target.closest(".mobile-menu-search")) {
        setMobileSub(false);
        setMobileSearch(true);
      }
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && mobileMenu.classList.contains("is-open")) {
        setMobileMenu(false);
        menuButton.focus();
      }
    });

    /* ---- search panel — the search button summons it (desktop);
       the mobile menu has its own search pane ---- */

    function openSearch() {
      window.clearTimeout(menuCloseTimer);
      closeMegaMenu();
      searchPanel.classList.add("is-open");
      searchPanel.setAttribute("aria-hidden", "false");
      searchButton.setAttribute("aria-expanded", "true");
      siteHeader.classList.remove("is-preload", "is-hidden");

      if (window.scrollY > 6) {
        revealStickyHeader();
      }

      syncHeaderState();
      window.setTimeout(() => searchInput.focus(), 120);
    }

    function closeSearch() {
      if (!searchPanel.classList.contains("is-open")) {
        return;
      }

      searchPanel.classList.remove("is-open");
      searchPanel.setAttribute("aria-hidden", "true");
      searchButton.setAttribute("aria-expanded", "false");
      searchInput.value = "";
      searchInput.dispatchEvent(new Event("input"));
      syncHeaderState();

      if (!siteHeader.matches(":hover") && !hoverZone.matches(":hover")) {
        siteHeader.classList.add("is-preload");
      }
    }

    searchButton.addEventListener("click", () => {
      if (searchPanel.classList.contains("is-open")) {
        closeSearch();
      } else {
        openSearch();
      }
    });

    /* ---- live results: top three from the shared index, then see all ---- */

    /* one renderer, two fields: the desktop panel and the mobile
       menu's search pane each pass their own elements (id prefix) */
    function bindLiveResults(input, prefix) {
      const results = document.querySelector(`#${prefix}Results`);
      const list = document.querySelector(`#${prefix}ResultsList`);
      const empty = document.querySelector(`#${prefix}ResultsEmpty`);
      const all = document.querySelector(`#${prefix}ResultsAll`);
      const allLabel = document.querySelector(`#${prefix}ResultsAllLabel`);

      function render() {
      const query = input.value.trim();
      const active = query.length >= 2;

      results.hidden = !active;

      if (!active) {
        return;
      }

      const matches = searchMatches(query);

      list.innerHTML = matches.slice(0, 3).map(item => `
        <li>
          <a href="#">
            <span class="search-result-text">
              <span class="search-result-title">${item.title}</span>
              <span class="search-result-meta">${item.section}</span>
            </span>
            <span class="inline-arrow" aria-hidden="true"></span>
          </a>
        </li>
      `).join("");

      empty.hidden = matches.length > 0;
      empty.textContent = "No results for \u201c" + query + "\u201d";

      all.hidden = matches.length === 0;
      all.href = searchResultsUrl(query);
      allLabel.textContent =
        "See all " + matches.length + (matches.length === 1 ? " result" : " results");
      }

      input.addEventListener("input", render);

      input.form.addEventListener("submit", event => {
        event.preventDefault();

        if (input.value.trim().length >= 2) {
          window.location.href = searchResultsUrl(input.value);
        }
      });
    }

    bindLiveResults(searchInput, "search");
    bindLiveResults(mobileSearchInput, "mobileSearch");

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && searchPanel.classList.contains("is-open")) {
        closeSearch();
        searchButton.focus();
      }
    });
  }

  /* -----------------------------------------------------------
     ARTICLE GALLERY — shared initialiser
     Usage: ccgArticleGallery(section, [{ image, caption, alt }])
     — section is the .article-gallery. Photos swipe sideways:
     the incoming one slides in from the side of travel and pushes
     the current one out the other side. Arrows and a horizontal
     touch swipe step one photo and loop; the count reads 01 / NN
     and the caption follows the active photo.
     ----------------------------------------------------------- */
  window.ccgArticleGallery = function (section, photos) {
    if (!section || !photos || !photos.length) {
      return;
    }

    const frame = section.querySelector(".article-gallery-image");
    const caption = section.querySelector(".article-gallery-caption");
    const count = section.querySelector(".article-gallery-count");
    const pad = n => String(n).padStart(2, "0");
    let active = 0;

    frame.innerHTML = photos.map((photo, i) => `
      <img src="${photo.image}" alt="${photo.alt || ""}" draggable="false"${i ? ' loading="lazy"' : ""}>
    `).join("");

    const slides = [...frame.children];

    /* place a slide without animating it: -1 left, 0 centre, 1 right */
    function park(slide, side) {
      slide.style.transition = "none";
      slide.style.transform = `translateX(${side * 100}%)`;
      void slide.offsetWidth;
      slide.style.transition = "";
    }

    function render() {
      caption.textContent = photos[active].caption || "";
      count.textContent = pad(active + 1) + " / " + pad(photos.length);
    }

    /* dir 1 = next (enters from the right), -1 = previous */
    function go(dir) {
      if (photos.length < 2) {
        return;
      }

      const from = slides[active];
      active = (active + dir + photos.length) % photos.length;
      const to = slides[active];

      park(to, dir);
      from.classList.remove("is-active");
      to.classList.add("is-active");
      from.style.transform = `translateX(${-dir * 100}%)`;
      to.style.transform = "translateX(0)";
      render();
    }

    slides.forEach((slide, i) => park(slide, i === 0 ? 0 : 1));
    slides[0].classList.add("is-active");

    section.querySelector(".gallery-btn--prev").addEventListener("click", () => go(-1));
    section.querySelector(".gallery-btn--next").addEventListener("click", () => go(1));

    /* touch / pen swipe: a mostly-horizontal flick past 40px steps */
    let startX = null;
    let startY = 0;

    frame.addEventListener("pointerdown", event => {
      if (event.pointerType === "mouse") {
        return;
      }

      startX = event.clientX;
      startY = event.clientY;
    });

    frame.addEventListener("pointerup", event => {
      if (startX === null) {
        return;
      }

      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      startX = null;

      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        go(dx < 0 ? 1 : -1);
      }
    });

    frame.addEventListener("pointercancel", () => {
      startX = null;
    });

    render();
  };

  /* -----------------------------------------------------------
     STEP TIMELINE — shared initialiser
     Usage: ccgStepTimeline(el, { fillMs, pauseMs }) — el is the
     .step-timeline. Plays once when it enters the screen: each
     line fills (fillMs, linear) and lights the next dot on
     arrival, then pauses (pauseMs) before the next line sets
     off; the last line runs on to the .step-end dot. Reduced
     motion shows the finished track. Returns { replay }.
     ----------------------------------------------------------- */
  window.ccgStepTimeline = function (el, options = {}) {
    if (!el) {
      return null;
    }

    const fillMs = options.fillMs || 700;
    const pauseMs = options.pauseMs || 450;
    const steps = [...el.querySelectorAll(".step")];
    const end = el.querySelector(".step-end");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timers = [];

    el.style.setProperty("--step-fill", fillMs + "ms");

    function reset() {
      timers.forEach(window.clearTimeout);
      timers = [];
      steps.forEach(step => step.classList.remove("is-lit", "is-filled"));
      end?.classList.remove("is-lit");
    }

    function finish() {
      steps.forEach(step => step.classList.add("is-lit", "is-filled"));
      end?.classList.add("is-lit");
    }

    function play() {
      reset();

      if (reduced) {
        finish();
        return;
      }

      steps[0].classList.add("is-lit");

      /* line i sets off after the previous arrival + pause; the
         last line runs on to the end dot */
      steps.forEach((step, i) => {
        const start = pauseMs + i * (fillMs + pauseMs);
        const next = steps[i + 1] || end;

        timers.push(window.setTimeout(() => step.classList.add("is-filled"), start));

        if (next) {
          timers.push(window.setTimeout(() => next.classList.add("is-lit"), start + fillMs));
        }
      });
    }

    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        observer.disconnect();
        play();
      }
    }, { threshold: .4 });

    observer.observe(el);

    return { replay: play };
  };

  /* -----------------------------------------------------------
     CARD CAROUSEL — shared initialiser
     Usage: ccgCarousel({ track, prev, next, current, total,
     progress, visible: () => n, onChange: (index, visible) => {} })
     — cards are the track's element children; onChange fires
     after every move/resize with the first visible index.
     `current`/`total` count track positions (cards − visible + 1),
     not cards, so the reader sees how far the track can page.
     ----------------------------------------------------------- */

  window.ccgCarousel = function ({ track, prev, next, current, total, progress, visible, onChange }) {
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

      if (total) {
        total.textContent = String(maxIndex() + 1).padStart(2, "0");
      }

      if (progress) {
        // thumb spans one slide of the track (100% / steps); translateX
        // is relative to the thumb's own width, so each step advances it
        // by exactly one thumb-width and the last lands flush at the end
        const steps = maxIndex() + 1;
        progress.style.width = (100 / steps) + "%";
        progress.style.transform = `translateX(${index * 100}%)`;
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
     Counts up from 0 when 60% in view, 2s ease-out expo — the
     figure moves fast early and glides into its final value.
     Output is
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
      const duration = 2000;
      const start = performance.now();

      const tick = now => {
        const progress = Math.min((now - start) / duration, 1);
        /* expo ease-out never quite lands, so the last frame
           snaps to the exact target */
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
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
