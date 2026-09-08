const t = (e, i, n, o = !1) => ({
  kind: "chips",
  key: e,
  label: i,
  options: n,
  ...o ? { multiple: o } : {}
}), s = (e, i, n, o) => ({
  kind: "range",
  key: e,
  label: i,
  min: n,
  max: o
}), r = (e, i, n) => ({
  kind: "toggle",
  key: e,
  label: i,
  text: n
}), d = (e) => [
  { key: "ordinal", kind: "ordinal", label: "#", width: "52px" },
  {
    key: "primary",
    role: "identity",
    label: e.primary,
    sort: "name",
    activate: !0,
    scope: !0,
    truncate: !0,
    class: "dc-table__primary"
  },
  {
    key: "secondary",
    role: "reference",
    label: e.secondary,
    mono: !0,
    muted: !0,
    truncate: !0
  },
  {
    key: "entityLabel",
    label: "Entity",
    when: "everything",
    width: "130px",
    mono: !0,
    truncate: !0,
    hideBelow: 900,
    class: "dc-table__entity"
  },
  {
    key: "metric1",
    role: "metric",
    kind: "number",
    label: e.metric1,
    sort: "metric1",
    width: "110px",
    hideBelow: 760,
    ...e.metric1Drill ? { drill: e.metric1Drill } : {}
  },
  {
    key: "metric2",
    role: "metric",
    kind: "number",
    label: e.metric2,
    sort: "metric2",
    width: "110px",
    hideBelow: 760,
    ...e.metric2Drill ? { drill: e.metric2Drill } : {}
  },
  {
    key: "updatedAt",
    role: "updated",
    kind: "date",
    label: "Updated",
    sort: "updated",
    width: "120px",
    mono: !0,
    muted: !0,
    hideBelow: 620
  },
  { key: "status", role: "state", kind: "status", label: "State", width: "110px" },
  /* A background is not a value, so the table leaves this one out. It is
     declared so that the schema names every field it has in one place. */
  { key: "tint", role: "tint" }
], a = (e) => ({
  key: e.key,
  label: e.label,
  count: e.count,
  facets: e.facets,
  tabs: e.tabs,
  samples: e.samples,
  ...e.scope ? { scope: e.scope } : {},
  columns: e.columns ?? d(e)
}), l = d({
  primary: "Item",
  secondary: "Reference",
  metric1: "Metric",
  metric2: "Metric 2"
}), u = (e) => e.fields.rarity === !0 ? "" : "data:image/svg+xml," + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="28"><rect width="56" height="28" rx="3" fill="${String(e.fields.tint)}"/></svg>`
);
function p(e) {
  const i = Number(e);
  return Number.isFinite(i) ? i < 100 ? `${Math.round(i)}cg` : i < 1e5 ? `${(i / 100).toFixed(1)}g` : `${(i / 1e5).toFixed(1)}kg` : "—";
}
const y = [
  { key: "ordinal", kind: "ordinal", label: "#", width: "48px" },
  // No label: a column of pictures says what it is. The role is what carries
  // it out of the table — onto the card and the tile, which are a picture and
  // a name where a piece has one.
  { key: "thumb", role: "image", kind: "image", width: "56px", height: "28px", value: u },
  {
    key: "primary",
    role: "identity",
    label: "Piece",
    sort: "name",
    activate: !0,
    scope: !0
  },
  {
    key: "secondary",
    role: "reference",
    label: "Part no.",
    width: "104px",
    mono: !0,
    muted: !0
  },
  { key: "shape", label: "Shape", width: "92px", hideBelow: 620 },
  {
    key: "firstYear",
    label: "First year",
    width: "88px",
    align: "right",
    mono: !0,
    // A year is a number and not a quantity: 1988, never 2.0k.
    format: (e) => String(e ?? "—"),
    hideBelow: 760
  },
  {
    key: "metric1",
    role: "metric",
    kind: "number",
    label: "Colors",
    width: "84px",
    sort: "metric1",
    drill: "colors",
    hideBelow: 900
  },
  {
    key: "metric2",
    role: "metric",
    kind: "number",
    label: "In sets",
    width: "84px",
    sort: "metric2",
    drill: "sets",
    hideBelow: 900
  },
  {
    key: "weight",
    label: "Weight",
    width: "88px",
    align: "right",
    mono: !0,
    /* Centigrams, off a number the row already carries: the fixtures generate
       no field the schema has not named, and a weight is what `format` is for. */
    value: (e) => Math.round(Number(e.fields.metric1) * 37),
    format: p,
    hideBelow: 1100
  },
  {
    key: "rarity",
    label: "Rare",
    width: "64px",
    muted: !0,
    format: (e) => e === !0 ? "rare" : "—",
    hideBelow: 1100
  },
  { key: "status", role: "state", kind: "status", label: "State", width: "104px" },
  /* Not a cell — the tile in the grid view is what reads it — but declared
     here, because this is where this type says what fields it has. */
  { key: "tint", role: "tint" }
], c = a({
  key: "settings",
  label: "Settings",
  count: "20",
  primary: "Setting",
  secondary: "Key",
  metric1: "Changes",
  metric2: "Scopes",
  facets: [
    t("section", "Section", ["general", "sources", "query", "notifications", "access"]),
    t("type", "Type", ["text", "toggle"]),
    r("changed", "Changed", "Only settings changed from their default")
  ],
  tabs: ["Information", "History", "Scopes", "Raw"],
  samples: [
    ["Workspace name", "general.workspace_name"],
    ["Default entity", "general.default_entity"],
    ["Default view", "general.default_view"],
    ["Query panel", "general.query_panel_open"],
    ["Connection string", "sources.connection_string"],
    ["Refresh interval", "sources.refresh_interval"],
    ["Backfill window", "sources.backfill_window"],
    ["Incremental sync", "sources.incremental_sync"],
    ["Page size", "query.page_size"],
    ["Default sort", "query.default_sort"],
    ["Saved query scope", "query.saved_scope"],
    ["Remember filters", "query.remember_filters"],
    ["Digest address", "notifications.digest_address"],
    ["Digest schedule", "notifications.digest_schedule"],
    ["Pinned records", "notifications.on_pinned_change"],
    ["Failures", "notifications.on_failure"],
    ["Default role", "access.default_role"],
    ["SSO domain", "access.sso_domain"],
    ["API tokens", "access.api_tokens"],
    ["Audit log", "access.audit_log"]
  ]
}), m = a({
  key: "logs",
  label: "Logs",
  count: "184k",
  primary: "Event",
  secondary: "Trace id",
  metric1: "Duration",
  metric2: "Records",
  facets: [
    t("level", "Level", ["debug", "info", "warn", "error"]),
    t("source", "Source", ["api", "worker", "ui", "cron"]),
    r("noise", "Noise", "Hide debug lines")
  ],
  tabs: ["Information", "Trace", "Records", "Raw"],
  samples: [
    ["Batch completed", "trc_9f31a2"],
    ["Rate limit backoff", "trc_0c74be"],
    ["Schema drift detected", "trc_51ad09"],
    ["Auth token refreshed", "trc_bb2140"],
    ["Worker restarted", "trc_7e0c8d"],
    ["Partial write rolled back", "trc_2a99f4"],
    ["Index rebuilt", "trc_63d1c7"],
    ["Export finished", "trc_18ff02"]
  ]
}), h = {
  key: "iRadar",
  label: "iRadar",
  kicker: "Web monitoring",
  placeholder: "site:*.shop AND price < 40 AND seen:false",
  columns: l,
  entities: [
    a({
      key: "searches",
      label: "Searches",
      count: "38",
      primary: "Search",
      secondary: "Expression",
      metric1: "New",
      metric2: "Results",
      facets: [
        t("state", "State", ["running", "paused", "failed"]),
        t("schedule", "Schedule", ["hourly", "daily", "weekly"]),
        r("hits", "Results", "Only searches with new hits")
      ],
      tabs: ["Information", "Results", "Sources", "Logs"],
      samples: [
        ["Competitor pricing pages", "site:*.shop price"],
        ["Firmware release notes", "inurl:release-notes"],
        ["Job postings — platform", 'title:"platform engineer"'],
        ["Regulatory filings", "domain:gov filing"],
        ["Security advisories", "cve OR advisory"],
        ["Marketplace listings", "category:resale"]
      ]
    }),
    a({
      key: "items",
      label: "Items",
      count: "9,988",
      primary: "Item",
      secondary: "URL",
      metric1: "Links",
      metric2: "Score",
      facets: [
        t("kind", "Kind", ["page", "pdf", "feed", "image"]),
        s("rank", "Rank", 0, 100),
        r("seen", "Seen", "Hide items already seen")
      ],
      tabs: ["Information", "Content", "Links", "Searches"],
      samples: [
        ["Q3 price list", "shop.example.com/pricing"],
        ["Release notes 4.2", "docs.example.io/rn/4-2"],
        ["Vendor terms update", "legal.example.net/terms"],
        ["Hardware teardown", "blog.example.org/teardown"],
        ["Supplier directory", "directory.example.com/eu"],
        ["Recall notice", "safety.example.gov/recall/8812"]
      ]
    }),
    a({
      key: "scrapers",
      label: "Scrapers",
      count: "24",
      primary: "Scraper",
      secondary: "Host",
      metric1: "Rules",
      metric2: "Items",
      facets: [
        t("state", "State", ["enabled", "disabled"]),
        t("engine", "Engine", ["static", "headless", "api"]),
        r("health", "Health", "Only failing scrapers")
      ],
      tabs: ["Information", "Rules", "Items", "Logs"],
      samples: [
        ["Reddit", "reddit.com"],
        ["Hacker News", "news.ycombinator.com"],
        ["GitHub releases", "api.github.com"],
        ["RSS bridge", "rss.example.io"],
        ["Marketplace EU", "market.example.eu"],
        ["Docs crawler", "docs.example.io"]
      ]
    }),
    m,
    c
  ]
}, g = {
  key: "LEGO",
  label: "LEGO",
  kicker: "Catalogue & inventory",
  placeholder: "theme:space AND year >= 1988 AND parts > 300",
  columns: l,
  entities: [
    a({
      key: "sets",
      label: "Sets",
      count: "19,412",
      primary: "Set",
      secondary: "Set number",
      metric1: "Parts",
      metric2: "Minifigs",
      // Parts leads to the pieces; minifigs is a count of something this
      // schema does not list, so it stays the plain number it was.
      scope: "set",
      metric1Drill: "pieces",
      facets: [
        t("theme", "Theme", ["space", "castle", "town", "technic"]),
        s("year", "Year", 1958, 2026),
        r("owned", "Owned", "Only sets in my inventory")
      ],
      tabs: ["Information", "Inventory", "Variants", "Logs"],
      samples: [
        ["Galaxy Explorer", "497-1"],
        ["Yellow Castle", "375-2"],
        ["Metroliner", "4558-1"],
        ["Blacktron Renegade", "6954-1"],
        ["Airport Shuttle", "6399-1"],
        ["Café Corner", "10182-1"]
      ]
    }),
    a({
      key: "pieces",
      label: "Pieces",
      count: "58,203",
      primary: "Piece",
      secondary: "Part number",
      metric1: "Colors",
      metric2: "In sets",
      scope: "piece",
      metric1Drill: "colors",
      metric2Drill: "sets",
      facets: [
        // `shape` rather than `category`: a category is a record here, and a
        // facet under that key would shadow the join to it.
        t("shape", "Shape", ["brick", "plate", "slope", "minifig"]),
        s("firstYear", "First year", 1958, 2026),
        r("rarity", "Rarity", "Only parts in < 5 sets")
      ],
      tabs: ["Information", "Colors", "Sets", "Logs"],
      // The one type in these four fixtures whose table is not the familiar
      // set: a catalogue piece is a picture, a shape, a year, two counts, a
      // weight and a flag, and no four of those are the four.
      columns: y,
      samples: [
        ["Brick 2 x 4", "3001"],
        ["Plate 1 x 2", "3023"],
        ["Slope 45° 2 x 2", "3039"],
        ["Tile 1 x 1 round", "98138"],
        ["Technic axle 4", "3705"],
        ["Windscreen 3 x 4", "2437"]
      ]
    }),
    a({
      key: "colors",
      label: "Colors",
      count: "267",
      primary: "Color",
      secondary: "Hex",
      metric1: "Parts",
      metric2: "Sets",
      scope: "color",
      metric1Drill: "pieces",
      metric2Drill: "sets",
      facets: [
        t("family", "Family", ["solid", "transparent", "metallic", "glow"]),
        s("firstYear", "First year", 1958, 2026),
        r("retired", "Retired", "Hide retired colors")
      ],
      tabs: ["Information", "Parts", "Sets", "Logs"],
      samples: [
        ["Bright Red", "#c91a09"],
        ["Dark Bluish Gray", "#6c6e68"],
        ["Trans-Neon Orange", "#fcb76d"],
        ["Sand Green", "#a0bcac"],
        ["Pearl Gold", "#aa7f2e"],
        ["Medium Azure", "#36aebf"]
      ]
    }),
    a({
      key: "inventories",
      label: "Inventories",
      count: "21,884",
      primary: "Inventory",
      secondary: "Revision",
      metric1: "Lines",
      metric2: "Spares",
      facets: [
        t("type", "Type", ["set", "minifig", "gear"]),
        s("version", "Version", 1, 12),
        r("complete", "Complete", "Only complete inventories")
      ],
      tabs: ["Information", "Lines", "Set", "Logs"],
      samples: [
        ["Galaxy Explorer v2", "inv-497-1-r2"],
        ["Café Corner v1", "inv-10182-1-r1"],
        ["Metroliner v3", "inv-4558-1-r3"],
        ["Yellow Castle v1", "inv-375-2-r1"],
        ["Airport Shuttle v2", "inv-6399-1-r2"],
        ["Renegade v1", "inv-6954-1-r1"]
      ]
    }),
    a({
      key: "categories",
      label: "Categories",
      count: "68",
      primary: "Category",
      secondary: "Slug",
      metric1: "Parts",
      metric2: "Children",
      scope: "category",
      metric1Drill: "pieces",
      facets: [
        t("level", "Level", ["root", "branch", "leaf"]),
        s("parts", "Parts", 0, 9e3),
        r("empty", "Empty", "Hide empty categories")
      ],
      tabs: ["Information", "Parts", "Children", "Logs"],
      samples: [
        ["Bricks", "bricks"],
        ["Plates", "plates"],
        ["Minifig heads", "minifig-heads"],
        ["Technic pins", "technic-pins"],
        ["Windows & doors", "windows-doors"],
        ["Wheels & tyres", "wheels-tyres"]
      ]
    }),
    m,
    c
  ]
}, f = {
  key: "Commerce",
  label: "Commerce",
  kicker: "Crawl & test platform",
  placeholder: "tenant:acme AND status:failed AND run > 2026-08-01",
  columns: l,
  entities: [
    a({
      key: "tenants",
      label: "Tenants",
      count: "142",
      primary: "Tenant",
      secondary: "Slug",
      metric1: "Crawls",
      metric2: "Tests",
      facets: [
        t("plan", "Plan", ["trial", "growth", "enterprise"]),
        // Multi-valued: a tenant can run in more than one region, and is in
        // each of their chip sets rather than in a combined one of its own.
        t("region", "Region", ["eu", "us", "apac"], !0),
        r("health", "Health", "Only tenants with failures")
      ],
      tabs: ["Information", "Crawls", "Tests", "Logs"],
      samples: [
        ["Acme Retail", "acme"],
        ["Northwind Trading", "northwind"],
        ["Globex Store", "globex"],
        ["Initech Shop", "initech"],
        ["Umbrella Market", "umbrella"],
        ["Soylent Foods", "soylent"]
      ]
    }),
    a({
      key: "crawls",
      label: "Crawls",
      count: "3,410",
      primary: "Crawl",
      secondary: "Run id",
      metric1: "Pages",
      metric2: "Errors",
      facets: [
        t("state", "State", ["running", "done", "failed"]),
        s("pages", "Pages", 0, 5e4),
        r("deltas", "Deltas", "Only crawls with changes")
      ],
      tabs: ["Information", "Results", "Tenant", "Logs"],
      samples: [
        ["Nightly catalogue", "crw_2026_0824_a"],
        ["Category sweep", "crw_2026_0823_c"],
        ["Checkout paths", "crw_2026_0822_b"],
        ["Sitemap diff", "crw_2026_0821_d"],
        ["Price refresh", "crw_2026_0820_a"],
        ["Image audit", "crw_2026_0819_f"]
      ]
    }),
    a({
      key: "tests",
      label: "Tests",
      count: "486",
      primary: "Test",
      secondary: "Key",
      metric1: "Assertions",
      metric2: "Runs",
      facets: [
        t("suite", "Suite", ["checkout", "search", "pdp", "auth"]),
        t("severity", "Severity", ["blocker", "major", "minor"]),
        r("flaky", "Flaky", "Only flaky tests")
      ],
      tabs: ["Information", "Assertions", "Results", "Logs"],
      samples: [
        ["Add to cart persists", "chk.cart.persist"],
        ["Guest checkout", "chk.guest.flow"],
        ["Search facets apply", "srch.facets"],
        ["PDP price matches feed", "pdp.price.feed"],
        ["Login rate limit", "auth.ratelimit"],
        ["Coupon stacking blocked", "chk.coupon.stack"]
      ]
    }),
    a({
      key: "testresults",
      label: "Test results",
      count: "92,117",
      primary: "Result",
      secondary: "Result id",
      metric1: "Duration",
      metric2: "Diffs",
      facets: [
        t("outcome", "Outcome", ["pass", "fail", "skipped"]),
        s("durationMs", "Duration ms", 0, 6e4),
        r("noise", "Noise", "Hide known-flaky results")
      ],
      tabs: ["Information", "Diff", "Test", "Logs"],
      samples: [
        ["chk.cart.persist #4412", "res_4412"],
        ["srch.facets #4411", "res_4411"],
        ["pdp.price.feed #4410", "res_4410"],
        ["auth.ratelimit #4409", "res_4409"],
        ["chk.guest.flow #4408", "res_4408"],
        ["chk.coupon.stack #4407", "res_4407"]
      ]
    }),
    a({
      key: "crawlresults",
      label: "Crawl results",
      count: "1.2m",
      primary: "Page",
      secondary: "URL",
      metric1: "Size kB",
      metric2: "Links",
      facets: [
        t("status", "Status", ["200", "301", "404", "5xx"]),
        s("sizeKb", "Size kB", 0, 4e3),
        r("changes", "Changes", "Only changed since last crawl")
      ],
      tabs: ["Information", "Content", "Links", "Crawl"],
      samples: [
        ["Home", "acme.example/"],
        ["Category — Shoes", "acme.example/c/shoes"],
        ["PDP — Runner 5", "acme.example/p/runner-5"],
        ["Cart", "acme.example/cart"],
        ["Search — boots", "acme.example/s?q=boots"],
        ["Checkout step 2", "acme.example/checkout/2"]
      ]
    }),
    m,
    c
  ]
}, b = {
  key: "Battle-sim",
  label: "Battle-sim",
  kicker: "Simulation runs",
  placeholder: "faction:north AND rounds > 40 AND outcome:draw",
  columns: l,
  entities: [
    a({
      key: "units",
      label: "Units",
      count: "612",
      primary: "Unit",
      secondary: "Code",
      metric1: "Power",
      metric2: "In runs",
      facets: [
        t("class", "Class", ["infantry", "armour", "air", "support"]),
        s("power", "Power", 0, 100),
        r("retired", "Retired", "Hide retired units")
      ],
      tabs: ["Information", "Stats", "Runs", "Logs"],
      samples: [
        ["Line Infantry", "inf.line"],
        ["Heavy Armour", "arm.heavy"],
        ["Recon Drone", "air.recon"],
        ["Field Medic", "sup.medic"],
        ["Artillery Battery", "arm.arty"],
        ["Sapper Team", "inf.sapper"]
      ]
    }),
    a({
      key: "factions",
      label: "Factions",
      count: "18",
      primary: "Faction",
      secondary: "Tag",
      metric1: "Units",
      metric2: "Runs",
      facets: [
        t("doctrine", "Doctrine", ["attrition", "manoeuvre", "siege"]),
        s("units", "Units", 0, 200),
        r("active", "Active", "Only factions in active runs")
      ],
      tabs: ["Information", "Units", "Runs", "Logs"],
      samples: [
        ["Northern Coalition", "north"],
        ["Free Cities", "cities"],
        ["Iron Pact", "iron"],
        ["Southern League", "south"],
        ["Wandering Host", "host"],
        ["Sea Concord", "sea"]
      ]
    }),
    a({
      key: "scenarios",
      label: "Scenarios",
      count: "94",
      primary: "Scenario",
      secondary: "Slug",
      metric1: "Rounds",
      metric2: "Runs",
      facets: [
        t("terrain", "Terrain", ["urban", "open", "mountain", "coast"]),
        s("rounds", "Rounds", 1, 200),
        r("balance", "Balance", "Only unbalanced scenarios")
      ],
      tabs: ["Information", "Map", "Runs", "Logs"],
      samples: [
        ["Bridgehead", "bridgehead"],
        ["Winter Pass", "winter-pass"],
        ["Harbour Assault", "harbour"],
        ["Ridge Line", "ridge-line"],
        ["Old Quarter", "old-quarter"],
        ["Salt Flats", "salt-flats"]
      ]
    }),
    a({
      key: "runs",
      label: "Runs",
      count: "48,220",
      primary: "Run",
      secondary: "Run id",
      metric1: "Rounds",
      metric2: "Casualties",
      facets: [
        t("outcome", "Outcome", ["win", "loss", "draw", "aborted"]),
        s("rounds", "Rounds", 1, 200),
        r("seeded", "Seeded", "Only reproducible seeds")
      ],
      tabs: ["Information", "Timeline", "Units", "Raw"],
      samples: [
        ["Bridgehead #8821", "run_8821"],
        ["Winter Pass #8820", "run_8820"],
        ["Harbour Assault #8819", "run_8819"],
        ["Ridge Line #8818", "run_8818"],
        ["Old Quarter #8817", "run_8817"],
        ["Salt Flats #8816", "run_8816"]
      ]
    }),
    m,
    c
  ]
}, k = {
  iRadar: h,
  LEGO: g,
  Commerce: f,
  "Battle-sim": b
}, w = Object.values(k);
export {
  b as battleSimSchema,
  f as commerceSchema,
  h as iRadarSchema,
  g as legoSchema,
  m as logsEntity,
  w as schemaList,
  k as schemas,
  c as settingsEntity
};
