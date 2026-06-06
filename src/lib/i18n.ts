import en from '../../messages/en.json';
import zhTW from '../../messages/zh-TW.json';

export type Locale = 'en' | 'zh-TW';

export const DEFAULT_LOCALE: Locale = 'en';
export const LOCALES: Locale[] = ['en', 'zh-TW'];

const MESSAGES: Record<Locale, typeof en> = {
  en,
  'zh-TW': zhTW,
};

export type MessageDict = typeof en;

function getNested(obj: Record<string, unknown>, path: string): string | undefined {
  const parts = path.split('.');
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur == null || typeof cur !== 'object') return undefined;
    cur = (cur as Record<string, unknown>)[p];
  }
  return typeof cur === 'string' ? cur : undefined;
}

export function getMessages(locale: Locale): MessageDict {
  return MESSAGES[locale] ?? MESSAGES.en;
}

export type TFunction = (
  key: string,
  vars?: Record<string, string | number>
) => string;

export function createT(locale: Locale): TFunction {
  const dict = getMessages(locale);
  return (key, vars) => {
    let text = getNested(dict as Record<string, unknown>, key) ?? key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
      }
    }
    return text;
  };
}

/** Prefix path for locale (`/` stays English root; zh-TW → `/zh-TW/...`). */
export function localePath(locale: Locale, path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (locale === 'zh-TW') {
    if (normalized === '/') return '/zh-TW/';
    return `/zh-TW${normalized.endsWith('/') ? normalized : `${normalized}/`}`;
  }
  return normalized === '/' ? '/' : normalized.endsWith('/') ? normalized : `${normalized}/`;
}

export function detectLocaleFromPath(pathname: string): Locale {
  return pathname.startsWith('/zh-TW') ? 'zh-TW' : 'en';
}

/** Same page path in the other locale (for language switcher). */
export function alternateLocalePath(pathname: string, target: Locale): string {
  const isZh = pathname.startsWith('/zh-TW');
  const stripped = isZh ? pathname.replace(/^\/zh-TW/, '') || '/' : pathname;
  return localePath(target, stripped);
}

export function getMetaSeasonLabel(locale: Locale): string {
  return getMessages(locale).season.label;
}

export function ogLocale(locale: Locale): string {
  return locale === 'zh-TW' ? 'zh_TW' : 'en_US';
}
