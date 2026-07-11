import en from '../../messages/en.json';
import zhTW from '../../messages/zh-TW.json';
import id from '../../messages/id.json';
import fil from '../../messages/fil.json';

export type Locale = 'en' | 'zh-TW' | 'id' | 'fil';

export const DEFAULT_LOCALE: Locale = 'en';
export const LOCALES: Locale[] = ['en', 'zh-TW', 'id', 'fil'];

const MESSAGES: Record<Locale, Record<string, unknown>> = {
  en,
  'zh-TW': zhTW,
  id,
  fil,
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
  return (MESSAGES[locale] ?? MESSAGES.en) as MessageDict;
}

export type TFunction = (
  key: string,
  vars?: Record<string, string | number>
) => string;

export function createT(locale: Locale): TFunction {
  const dict = getMessages(locale);
  return (key, vars) => {
    let text =
      getNested(dict as Record<string, unknown>, key) ??
      getNested(MESSAGES.en, key) ??
      key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
      }
    }
    return text;
  };
}

export function stripLocalePrefix(pathname: string): string {
  for (const locale of LOCALES.filter((l) => l !== DEFAULT_LOCALE)) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      const stripped = pathname.replace(new RegExp(`^/${locale}`), '') || '/';
      return stripped.startsWith('/') ? stripped : `/${stripped}`;
    }
  }
  return pathname || '/';
}

/** Prefix path for locale (`/` stays English root; localized pages use `/{locale}/...`). */
export function localePath(locale: Locale, path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (locale !== DEFAULT_LOCALE) {
    if (normalized === '/') return `/${locale}/`;
    return `/${locale}${normalized.endsWith('/') ? normalized : `${normalized}/`}`;
  }
  return normalized === '/' ? '/' : normalized.endsWith('/') ? normalized : `${normalized}/`;
}

export function detectLocaleFromPath(pathname: string): Locale {
  const match = LOCALES.find(
    (locale) =>
      locale !== DEFAULT_LOCALE &&
      (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))
  );
  return match ?? DEFAULT_LOCALE;
}

/** Same page path in the other locale (for language switcher). */
export function alternateLocalePath(pathname: string, target: Locale): string {
  return localePath(target, stripLocalePrefix(pathname));
}

export function getMetaSeasonLabel(locale: Locale): string {
  return getMessages(locale).season.label;
}

export function ogLocale(locale: Locale): string {
  if (locale === 'zh-TW') return 'zh_TW';
  if (locale === 'id') return 'id_ID';
  if (locale === 'fil') return 'fil_PH';
  return 'en_US';
}

export function htmlLang(locale: Locale): string {
  if (locale === 'zh-TW') return 'zh-Hant';
  if (locale === 'id') return 'id';
  if (locale === 'fil') return 'fil-PH';
  return 'en';
}

export function hrefLang(locale: Locale): string {
  return htmlLang(locale);
}
