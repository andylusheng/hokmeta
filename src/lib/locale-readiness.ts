import {
  alternateLocalePath,
  detectLocaleFromPath,
  hrefLang,
  stripLocalePrefix,
  type Locale,
} from '@/lib/i18n';

export type LocaleCandidate = Locale;

export type RouteGroup =
  | 'home'
  | 'climb-picks'
  | 'heroes'
  | 'hero-detail'
  | 'hero-counters'
  | 'learn'
  | 'best-heroes'
  | 'hero-trends'
  | 'meta-report'
  | 'tools'
  | 'items'
  | 'arcana'
  | 'patches'
  | 'docs-api'
  | 'about'
  | 'privacy'
  | 'search'
  | 'comps'
  | 'tier-list';

type LocaleStatus = 'live' | 'planned';

export interface LocaleReadinessEntry {
  status: LocaleStatus;
  label: string;
  hrefLang: string;
  routeGroups: Record<RouteGroup, boolean>;
  note: string;
}

const ALL_ROUTE_GROUPS: RouteGroup[] = [
  'home',
  'climb-picks',
  'heroes',
  'hero-detail',
  'hero-counters',
  'learn',
  'best-heroes',
  'hero-trends',
  'meta-report',
  'tools',
  'items',
  'arcana',
  'patches',
  'docs-api',
  'about',
  'privacy',
  'search',
  'comps',
  'tier-list',
];

function allReady(): Record<RouteGroup, boolean> {
  return Object.fromEntries(ALL_ROUTE_GROUPS.map((group) => [group, true])) as Record<
    RouteGroup,
    boolean
  >;
}

function readyExcept(blocked: RouteGroup[]): Record<RouteGroup, boolean> {
  return Object.fromEntries(
    ALL_ROUTE_GROUPS.map((group) => [group, !blocked.includes(group)])
  ) as Record<RouteGroup, boolean>;
}

function noneReady(): Record<RouteGroup, boolean> {
  return Object.fromEntries(ALL_ROUTE_GROUPS.map((group) => [group, false])) as Record<
    RouteGroup,
    boolean
  >;
}

export const LOCALE_READINESS_MANIFEST: Record<LocaleCandidate, LocaleReadinessEntry> = {
  en: {
    status: 'live',
    label: 'EN',
    hrefLang: hrefLang('en'),
    routeGroups: allReady(),
    note: 'Primary live locale.',
  },
  'zh-TW': {
    status: 'live',
    label: '繁中',
    hrefLang: hrefLang('zh-TW'),
    routeGroups: allReady(),
    note: 'Live traditional Chinese locale.',
  },
  id: {
    status: 'live',
    label: 'ID',
    hrefLang: hrefLang('id'),
    routeGroups: readyExcept(['learn', 'patches', 'tier-list']),
    note: 'Indonesia locale is live for core product routes. Long-form learn, patch history, and tier-list pages stay hidden until body copy is translated or intentionally retired.',
  },
  fil: {
    status: 'live',
    label: 'FIL',
    hrefLang: hrefLang('fil'),
    routeGroups: readyExcept(['learn', 'patches', 'tier-list']),
    note: 'Filipino locale is live for core product routes. Long-form learn, patch history, and tier-list pages stay hidden until body copy is translated or intentionally retired.',
  },
};

export function inferRouteGroup(pathname: string): RouteGroup {
  const stripped = stripLocalePrefix(pathname);

  if (stripped === '/') return 'home';
  if (stripped.startsWith('/climb-picks')) return 'climb-picks';
  if (stripped.startsWith('/hero-trends')) return 'hero-trends';
  if (stripped.startsWith('/meta-report')) return 'meta-report';
  if (stripped.startsWith('/heroes')) return 'heroes';
  if (stripped.startsWith('/best-heroes')) return 'best-heroes';
  if (/^\/hero\/[^/]+\/counters\/?$/.test(stripped)) return 'hero-counters';
  if (stripped.startsWith('/hero/')) return 'hero-detail';
  if (stripped.startsWith('/learn')) return 'learn';
  if (stripped.startsWith('/tools')) return 'tools';
  if (stripped.startsWith('/items')) return 'items';
  if (stripped.startsWith('/arcana')) return 'arcana';
  if (stripped.startsWith('/patches')) return 'patches';
  if (stripped.startsWith('/docs/api')) return 'docs-api';
  if (stripped.startsWith('/about')) return 'about';
  if (stripped.startsWith('/privacy')) return 'privacy';
  if (stripped.startsWith('/search')) return 'search';
  if (stripped.startsWith('/comps')) return 'comps';
  if (stripped.startsWith('/tier-list')) return 'tier-list';
  return 'home';
}

export function isLocaleReadyForPath(locale: LocaleCandidate, pathname: string): boolean {
  const entry = LOCALE_READINESS_MANIFEST[locale];
  return entry.routeGroups[inferRouteGroup(pathname)];
}

export function getLanguageSwitcherEntries(pathname: string) {
  const current = detectLocaleFromPath(pathname);
  const liveLocales = (Object.keys(LOCALE_READINESS_MANIFEST) as LocaleCandidate[]).filter(
    (locale) =>
      LOCALE_READINESS_MANIFEST[locale].status === 'live' &&
      isLocaleReadyForPath(locale, pathname)
  ) as Locale[];

  return liveLocales.map((locale) => ({
    locale,
    label: LOCALE_READINESS_MANIFEST[locale].label,
    hrefLang: LOCALE_READINESS_MANIFEST[locale].hrefLang,
    href: alternateLocalePath(pathname, locale),
    current: locale === current,
  }));
}
