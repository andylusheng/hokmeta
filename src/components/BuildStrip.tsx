import Link from 'next/link';
import type { Hero } from '@/types/hero';
import { getHeroBuildPresets, defaultBuildPresetIndex } from '@/lib/data';
import { translateItemName } from '@/lib/locale-names';
import { localePath, type Locale } from '@/lib/i18n';

export function BuildStrip({
  hero,
  locale = 'en',
}: {
  hero: Hero;
  locale?: Locale;
}) {
  const presets = getHeroBuildPresets(hero, locale);
  if (!presets.length) return null;
  const items = presets[defaultBuildPresetIndex(hero, locale)].items.filter(
    (i) => i.name && i.name !== 'Data unavailable'
  );
  if (!items.length) return null;

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2 rounded-xl border border-hok-border bg-hok-card/80 p-3">
      {items.map((item) => (
        <div
          key={`${item.slot}-${item.itemId || item.name}`}
          className="flex items-center gap-2 rounded-lg border border-hok-border/60 bg-hok-dark/50 px-2 py-1.5"
          title={translateItemName(item.name, locale, item.itemId)}
        >
          {item.icon ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.icon} alt="" width={36} height={36} className="rounded" />
          ) : (
            <span className="flex h-9 w-9 items-center justify-center rounded bg-hok-border text-xs text-gray-500">
              {item.slot}
            </span>
          )}
          <span className="hidden max-w-[100px] truncate text-xs text-gray-300 sm:inline">
            {translateItemName(item.name, locale, item.itemId)}
          </span>
        </div>
      ))}
      <Link
        href={localePath(locale, `/hero/${hero.slug}#build`)}
        className="ml-auto text-xs font-semibold text-hok-gold hover:underline"
      >
        Full build →
      </Link>
    </div>
  );
}
