import type { ChipsFacet, DomainSchema, EntitySchema, RangeFacet, ToggleFacet } from '../types'

/**
 * The four schemas the design was drawn against. They exist to prove the point
 * the shell is built on: every entity is the same shape — an identity pair,
 * two named metrics, a date, a state and a score — and use cases differ only
 * in vocabulary.
 *
 * Import them for stories, tests, and as worked examples of the schema shape.
 */

const chips = (key: string, label: string, options: string[]): ChipsFacet => ({
  kind: 'chips',
  key,
  label,
  options,
})

const range = (key: string, label: string, min: number, max: number): RangeFacet => ({
  kind: 'range',
  key,
  label,
  min,
  max,
})

const toggle = (key: string, label: string, text: string): ToggleFacet => ({
  kind: 'toggle',
  key,
  label,
  text,
})

interface EntityInput {
  key: string
  label: string
  count: string
  primary: string
  secondary: string
  metric1: string
  metric2: string
  facets: EntitySchema['facets']
  tabs: string[]
  samples: Array<readonly [string, string]>
}

const entity = (input: EntityInput): EntitySchema => ({
  key: input.key,
  label: input.label,
  count: input.count,
  labels: {
    primary: input.primary,
    secondary: input.secondary,
    metric1: input.metric1,
    metric2: input.metric2,
  },
  facets: input.facets,
  tabs: input.tabs,
  samples: input.samples,
})

/*
 * Logs and settings are entities like any other. They carry the same shape as
 * a search or a LEGO set, they sit in the same result set, and what removes
 * them from a query is an ordinary filter — not a separate screen.
 */

/** Present in every schema: the shell's own configuration, as records. */
export const settingsEntity: EntitySchema = entity({
  key: 'settings',
  label: 'Settings',
  count: '20',
  primary: 'Setting',
  secondary: 'Key',
  metric1: 'Changes',
  metric2: 'Scopes',
  facets: [
    chips('section', 'Section', ['general', 'sources', 'query', 'notifications', 'access']),
    chips('type', 'Type', ['text', 'toggle']),
    toggle('changed', 'Changed', 'Only settings changed from their default'),
  ],
  tabs: ['Information', 'History', 'Scopes', 'Raw'],
  samples: [
    ['Workspace name', 'general.workspace_name'],
    ['Default entity', 'general.default_entity'],
    ['Default view', 'general.default_view'],
    ['Query panel', 'general.query_panel_open'],
    ['Connection string', 'sources.connection_string'],
    ['Refresh interval', 'sources.refresh_interval'],
    ['Backfill window', 'sources.backfill_window'],
    ['Incremental sync', 'sources.incremental_sync'],
    ['Page size', 'query.page_size'],
    ['Default sort', 'query.default_sort'],
    ['Saved query scope', 'query.saved_scope'],
    ['Remember filters', 'query.remember_filters'],
    ['Digest address', 'notifications.digest_address'],
    ['Digest schedule', 'notifications.digest_schedule'],
    ['Pinned records', 'notifications.on_pinned_change'],
    ['Failures', 'notifications.on_failure'],
    ['Default role', 'access.default_role'],
    ['SSO domain', 'access.sso_domain'],
    ['API tokens', 'access.api_tokens'],
    ['Audit log', 'access.audit_log'],
  ],
})

/** Present in every schema: the shell's own audit trail. */
export const logsEntity: EntitySchema = entity({
  key: 'logs',
  label: 'Logs',
  count: '184k',
  primary: 'Event',
  secondary: 'Trace id',
  metric1: 'Duration',
  metric2: 'Records',
  facets: [
    chips('level', 'Level', ['debug', 'info', 'warn', 'error']),
    chips('source', 'Source', ['api', 'worker', 'ui', 'cron']),
    toggle('noise', 'Noise', 'Hide debug lines'),
  ],
  tabs: ['Information', 'Trace', 'Records', 'Raw'],
  samples: [
    ['Batch completed', 'trc_9f31a2'],
    ['Rate limit backoff', 'trc_0c74be'],
    ['Schema drift detected', 'trc_51ad09'],
    ['Auth token refreshed', 'trc_bb2140'],
    ['Worker restarted', 'trc_7e0c8d'],
    ['Partial write rolled back', 'trc_2a99f4'],
    ['Index rebuilt', 'trc_63d1c7'],
    ['Export finished', 'trc_18ff02'],
  ],
})

/* ------------------------------------------------------------------ iRadar */

export const iRadarSchema: DomainSchema = {
  key: 'iRadar',
  label: 'iRadar',
  kicker: 'Web monitoring',
  placeholder: 'site:*.shop AND price < 40 AND seen:false',
  entities: [
    entity({
      key: 'searches',
      label: 'Searches',
      count: '38',
      primary: 'Search',
      secondary: 'Expression',
      metric1: 'New',
      metric2: 'Results',
      facets: [
        chips('state', 'State', ['running', 'paused', 'failed']),
        chips('schedule', 'Schedule', ['hourly', 'daily', 'weekly']),
        toggle('hits', 'Results', 'Only searches with new hits'),
      ],
      tabs: ['Information', 'Results', 'Sources', 'Logs'],
      samples: [
        ['Competitor pricing pages', 'site:*.shop price'],
        ['Firmware release notes', 'inurl:release-notes'],
        ['Job postings — platform', 'title:"platform engineer"'],
        ['Regulatory filings', 'domain:gov filing'],
        ['Security advisories', 'cve OR advisory'],
        ['Marketplace listings', 'category:resale'],
      ],
    }),
    entity({
      key: 'items',
      label: 'Items',
      count: '9,988',
      primary: 'Item',
      secondary: 'URL',
      metric1: 'Links',
      metric2: 'Score',
      facets: [
        chips('kind', 'Kind', ['page', 'pdf', 'feed', 'image']),
        range('rank', 'Rank', 0, 100),
        toggle('seen', 'Seen', 'Hide items already seen'),
      ],
      tabs: ['Information', 'Content', 'Links', 'Searches'],
      samples: [
        ['Q3 price list', 'shop.example.com/pricing'],
        ['Release notes 4.2', 'docs.example.io/rn/4-2'],
        ['Vendor terms update', 'legal.example.net/terms'],
        ['Hardware teardown', 'blog.example.org/teardown'],
        ['Supplier directory', 'directory.example.com/eu'],
        ['Recall notice', 'safety.example.gov/recall/8812'],
      ],
    }),
    entity({
      key: 'scrapers',
      label: 'Scrapers',
      count: '24',
      primary: 'Scraper',
      secondary: 'Host',
      metric1: 'Rules',
      metric2: 'Items',
      facets: [
        chips('state', 'State', ['enabled', 'disabled']),
        chips('engine', 'Engine', ['static', 'headless', 'api']),
        toggle('health', 'Health', 'Only failing scrapers'),
      ],
      tabs: ['Information', 'Rules', 'Items', 'Logs'],
      samples: [
        ['Reddit', 'reddit.com'],
        ['Hacker News', 'news.ycombinator.com'],
        ['GitHub releases', 'api.github.com'],
        ['RSS bridge', 'rss.example.io'],
        ['Marketplace EU', 'market.example.eu'],
        ['Docs crawler', 'docs.example.io'],
      ],
    }),
    logsEntity,
    settingsEntity,
  ],
}

/* -------------------------------------------------------------------- LEGO */

export const legoSchema: DomainSchema = {
  key: 'LEGO',
  label: 'LEGO',
  kicker: 'Catalogue & inventory',
  placeholder: 'theme:space AND year >= 1988 AND parts > 300',
  entities: [
    entity({
      key: 'sets',
      label: 'Sets',
      count: '19,412',
      primary: 'Set',
      secondary: 'Set number',
      metric1: 'Parts',
      metric2: 'Minifigs',
      facets: [
        chips('theme', 'Theme', ['space', 'castle', 'town', 'technic']),
        range('year', 'Year', 1958, 2026),
        toggle('owned', 'Owned', 'Only sets in my inventory'),
      ],
      tabs: ['Information', 'Inventory', 'Variants', 'Logs'],
      samples: [
        ['Galaxy Explorer', '497-1'],
        ['Yellow Castle', '375-2'],
        ['Metroliner', '4558-1'],
        ['Blacktron Renegade', '6954-1'],
        ['Airport Shuttle', '6399-1'],
        ['Café Corner', '10182-1'],
      ],
    }),
    entity({
      key: 'pieces',
      label: 'Pieces',
      count: '58,203',
      primary: 'Piece',
      secondary: 'Part number',
      metric1: 'Colors',
      metric2: 'In sets',
      facets: [
        chips('category', 'Category', ['brick', 'plate', 'slope', 'minifig']),
        range('firstYear', 'First year', 1958, 2026),
        toggle('rarity', 'Rarity', 'Only parts in < 5 sets'),
      ],
      tabs: ['Information', 'Colors', 'Sets', 'Logs'],
      samples: [
        ['Brick 2 x 4', '3001'],
        ['Plate 1 x 2', '3023'],
        ['Slope 45° 2 x 2', '3039'],
        ['Tile 1 x 1 round', '98138'],
        ['Technic axle 4', '3705'],
        ['Windscreen 3 x 4', '2437'],
      ],
    }),
    entity({
      key: 'colors',
      label: 'Colors',
      count: '267',
      primary: 'Color',
      secondary: 'Hex',
      metric1: 'Parts',
      metric2: 'Sets',
      facets: [
        chips('family', 'Family', ['solid', 'transparent', 'metallic', 'glow']),
        range('firstYear', 'First year', 1958, 2026),
        toggle('retired', 'Retired', 'Hide retired colors'),
      ],
      tabs: ['Information', 'Parts', 'Sets', 'Logs'],
      samples: [
        ['Bright Red', '#c91a09'],
        ['Dark Bluish Gray', '#6c6e68'],
        ['Trans-Neon Orange', '#fcb76d'],
        ['Sand Green', '#a0bcac'],
        ['Pearl Gold', '#aa7f2e'],
        ['Medium Azure', '#36aebf'],
      ],
    }),
    entity({
      key: 'inventories',
      label: 'Inventories',
      count: '21,884',
      primary: 'Inventory',
      secondary: 'Revision',
      metric1: 'Lines',
      metric2: 'Spares',
      facets: [
        chips('type', 'Type', ['set', 'minifig', 'gear']),
        range('version', 'Version', 1, 12),
        toggle('complete', 'Complete', 'Only complete inventories'),
      ],
      tabs: ['Information', 'Lines', 'Set', 'Logs'],
      samples: [
        ['Galaxy Explorer v2', 'inv-497-1-r2'],
        ['Café Corner v1', 'inv-10182-1-r1'],
        ['Metroliner v3', 'inv-4558-1-r3'],
        ['Yellow Castle v1', 'inv-375-2-r1'],
        ['Airport Shuttle v2', 'inv-6399-1-r2'],
        ['Renegade v1', 'inv-6954-1-r1'],
      ],
    }),
    entity({
      key: 'categories',
      label: 'Categories',
      count: '68',
      primary: 'Category',
      secondary: 'Slug',
      metric1: 'Parts',
      metric2: 'Children',
      facets: [
        chips('level', 'Level', ['root', 'branch', 'leaf']),
        range('parts', 'Parts', 0, 9000),
        toggle('empty', 'Empty', 'Hide empty categories'),
      ],
      tabs: ['Information', 'Parts', 'Children', 'Logs'],
      samples: [
        ['Bricks', 'bricks'],
        ['Plates', 'plates'],
        ['Minifig heads', 'minifig-heads'],
        ['Technic pins', 'technic-pins'],
        ['Windows & doors', 'windows-doors'],
        ['Wheels & tyres', 'wheels-tyres'],
      ],
    }),
    logsEntity,
    settingsEntity,
  ],
}

/* ---------------------------------------------------------------- Commerce */

export const commerceSchema: DomainSchema = {
  key: 'Commerce',
  label: 'Commerce',
  kicker: 'Crawl & test platform',
  placeholder: 'tenant:acme AND status:failed AND run > 2026-08-01',
  entities: [
    entity({
      key: 'tenants',
      label: 'Tenants',
      count: '142',
      primary: 'Tenant',
      secondary: 'Slug',
      metric1: 'Crawls',
      metric2: 'Tests',
      facets: [
        chips('plan', 'Plan', ['trial', 'growth', 'enterprise']),
        chips('region', 'Region', ['eu', 'us', 'apac']),
        toggle('health', 'Health', 'Only tenants with failures'),
      ],
      tabs: ['Information', 'Crawls', 'Tests', 'Logs'],
      samples: [
        ['Acme Retail', 'acme'],
        ['Northwind Trading', 'northwind'],
        ['Globex Store', 'globex'],
        ['Initech Shop', 'initech'],
        ['Umbrella Market', 'umbrella'],
        ['Soylent Foods', 'soylent'],
      ],
    }),
    entity({
      key: 'crawls',
      label: 'Crawls',
      count: '3,410',
      primary: 'Crawl',
      secondary: 'Run id',
      metric1: 'Pages',
      metric2: 'Errors',
      facets: [
        chips('state', 'State', ['running', 'done', 'failed']),
        range('pages', 'Pages', 0, 50000),
        toggle('deltas', 'Deltas', 'Only crawls with changes'),
      ],
      tabs: ['Information', 'Results', 'Tenant', 'Logs'],
      samples: [
        ['Nightly catalogue', 'crw_2026_0824_a'],
        ['Category sweep', 'crw_2026_0823_c'],
        ['Checkout paths', 'crw_2026_0822_b'],
        ['Sitemap diff', 'crw_2026_0821_d'],
        ['Price refresh', 'crw_2026_0820_a'],
        ['Image audit', 'crw_2026_0819_f'],
      ],
    }),
    entity({
      key: 'tests',
      label: 'Tests',
      count: '486',
      primary: 'Test',
      secondary: 'Key',
      metric1: 'Assertions',
      metric2: 'Runs',
      facets: [
        chips('suite', 'Suite', ['checkout', 'search', 'pdp', 'auth']),
        chips('severity', 'Severity', ['blocker', 'major', 'minor']),
        toggle('flaky', 'Flaky', 'Only flaky tests'),
      ],
      tabs: ['Information', 'Assertions', 'Results', 'Logs'],
      samples: [
        ['Add to cart persists', 'chk.cart.persist'],
        ['Guest checkout', 'chk.guest.flow'],
        ['Search facets apply', 'srch.facets'],
        ['PDP price matches feed', 'pdp.price.feed'],
        ['Login rate limit', 'auth.ratelimit'],
        ['Coupon stacking blocked', 'chk.coupon.stack'],
      ],
    }),
    entity({
      key: 'testresults',
      label: 'Test results',
      count: '92,117',
      primary: 'Result',
      secondary: 'Result id',
      metric1: 'Duration',
      metric2: 'Diffs',
      facets: [
        chips('outcome', 'Outcome', ['pass', 'fail', 'skipped']),
        range('durationMs', 'Duration ms', 0, 60000),
        toggle('noise', 'Noise', 'Hide known-flaky results'),
      ],
      tabs: ['Information', 'Diff', 'Test', 'Logs'],
      samples: [
        ['chk.cart.persist #4412', 'res_4412'],
        ['srch.facets #4411', 'res_4411'],
        ['pdp.price.feed #4410', 'res_4410'],
        ['auth.ratelimit #4409', 'res_4409'],
        ['chk.guest.flow #4408', 'res_4408'],
        ['chk.coupon.stack #4407', 'res_4407'],
      ],
    }),
    entity({
      key: 'crawlresults',
      label: 'Crawl results',
      count: '1.2m',
      primary: 'Page',
      secondary: 'URL',
      metric1: 'Size kB',
      metric2: 'Links',
      facets: [
        chips('status', 'Status', ['200', '301', '404', '5xx']),
        range('sizeKb', 'Size kB', 0, 4000),
        toggle('changes', 'Changes', 'Only changed since last crawl'),
      ],
      tabs: ['Information', 'Content', 'Links', 'Crawl'],
      samples: [
        ['Home', 'acme.example/'],
        ['Category — Shoes', 'acme.example/c/shoes'],
        ['PDP — Runner 5', 'acme.example/p/runner-5'],
        ['Cart', 'acme.example/cart'],
        ['Search — boots', 'acme.example/s?q=boots'],
        ['Checkout step 2', 'acme.example/checkout/2'],
      ],
    }),
    logsEntity,
    settingsEntity,
  ],
}

/* -------------------------------------------------------------- Battle-sim */

export const battleSimSchema: DomainSchema = {
  key: 'Battle-sim',
  label: 'Battle-sim',
  kicker: 'Simulation runs',
  placeholder: 'faction:north AND rounds > 40 AND outcome:draw',
  entities: [
    entity({
      key: 'units',
      label: 'Units',
      count: '612',
      primary: 'Unit',
      secondary: 'Code',
      metric1: 'Power',
      metric2: 'In runs',
      facets: [
        chips('class', 'Class', ['infantry', 'armour', 'air', 'support']),
        range('power', 'Power', 0, 100),
        toggle('retired', 'Retired', 'Hide retired units'),
      ],
      tabs: ['Information', 'Stats', 'Runs', 'Logs'],
      samples: [
        ['Line Infantry', 'inf.line'],
        ['Heavy Armour', 'arm.heavy'],
        ['Recon Drone', 'air.recon'],
        ['Field Medic', 'sup.medic'],
        ['Artillery Battery', 'arm.arty'],
        ['Sapper Team', 'inf.sapper'],
      ],
    }),
    entity({
      key: 'factions',
      label: 'Factions',
      count: '18',
      primary: 'Faction',
      secondary: 'Tag',
      metric1: 'Units',
      metric2: 'Runs',
      facets: [
        chips('doctrine', 'Doctrine', ['attrition', 'manoeuvre', 'siege']),
        range('units', 'Units', 0, 200),
        toggle('active', 'Active', 'Only factions in active runs'),
      ],
      tabs: ['Information', 'Units', 'Runs', 'Logs'],
      samples: [
        ['Northern Coalition', 'north'],
        ['Free Cities', 'cities'],
        ['Iron Pact', 'iron'],
        ['Southern League', 'south'],
        ['Wandering Host', 'host'],
        ['Sea Concord', 'sea'],
      ],
    }),
    entity({
      key: 'scenarios',
      label: 'Scenarios',
      count: '94',
      primary: 'Scenario',
      secondary: 'Slug',
      metric1: 'Rounds',
      metric2: 'Runs',
      facets: [
        chips('terrain', 'Terrain', ['urban', 'open', 'mountain', 'coast']),
        range('rounds', 'Rounds', 1, 200),
        toggle('balance', 'Balance', 'Only unbalanced scenarios'),
      ],
      tabs: ['Information', 'Map', 'Runs', 'Logs'],
      samples: [
        ['Bridgehead', 'bridgehead'],
        ['Winter Pass', 'winter-pass'],
        ['Harbour Assault', 'harbour'],
        ['Ridge Line', 'ridge-line'],
        ['Old Quarter', 'old-quarter'],
        ['Salt Flats', 'salt-flats'],
      ],
    }),
    entity({
      key: 'runs',
      label: 'Runs',
      count: '48,220',
      primary: 'Run',
      secondary: 'Run id',
      metric1: 'Rounds',
      metric2: 'Casualties',
      facets: [
        chips('outcome', 'Outcome', ['win', 'loss', 'draw', 'aborted']),
        range('rounds', 'Rounds', 1, 200),
        toggle('seeded', 'Seeded', 'Only reproducible seeds'),
      ],
      tabs: ['Information', 'Timeline', 'Units', 'Raw'],
      samples: [
        ['Bridgehead #8821', 'run_8821'],
        ['Winter Pass #8820', 'run_8820'],
        ['Harbour Assault #8819', 'run_8819'],
        ['Ridge Line #8818', 'run_8818'],
        ['Old Quarter #8817', 'run_8817'],
        ['Salt Flats #8816', 'run_8816'],
      ],
    }),
    logsEntity,
    settingsEntity,
  ],
}

/** Every bundled schema, keyed by its `key`. */
export const schemas = {
  iRadar: iRadarSchema,
  LEGO: legoSchema,
  Commerce: commerceSchema,
  'Battle-sim': battleSimSchema,
} satisfies Record<string, DomainSchema>

export type SchemaKey = keyof typeof schemas

export const schemaList: DomainSchema[] = Object.values(schemas)
