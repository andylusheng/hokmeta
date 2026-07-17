import Link from 'next/link';
import type { GameItem, HeroBuildItem } from '@/types/hero';
import { heroes } from '@/lib/data';
import {
  getLocalizedItemDescription,
  getLocalizedItemLabel,
  getLocalizedItemName,
  getLocalizedItemPassives,
} from '@/lib/item-locale';
import { getHeroDisplayName } from '@/lib/locale-names';
import { HeroAvatar } from '@/components/HeroAvatar';
import { Breadcrumb } from '@/components/Breadcrumb';
import { createT, localePath, type Locale } from '@/lib/i18n';

function heroesUsingItem(itemId: string) {
  return heroes.filter((h) => {
    const rows: HeroBuildItem[] = [
      ...(h.build || []),
      ...(h.buildZh || []),
      ...(h.builds || []).flatMap((b) => b.items),
      ...(h.buildsZh || []).flatMap((b) => b.items),
    ];
    return rows.some((row) => row.itemId === itemId);
  });
}

export function ItemDetailPageView({
  item,
  locale = 'en',
}: {
  item: GameItem;
  locale?: Locale;
}) {
  const t = createT(locale);
  const label = getLocalizedItemLabel(item, locale);
  const desc = getLocalizedItemDescription(item, locale);
  const passives = getLocalizedItemPassives(item, locale);
  const usedBy = heroesUsingItem(item.id).slice(0, 12);

  return (
    <div className="container-wide">
      <Breadcrumb
        items={[
          { label: t('common.home'), href: localePath(locale, '/') },
          { label: t('nav.items'), href: localePath(locale, '/items') },
          { label: getLocalizedItemName(item, locale) },
        ]}
      />

      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-start">
        {item.icon && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.icon}
            alt=""
            width={96}
            height={96}
            className="h-24 w-24 rounded-xl ring-2 ring-hok-border"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold text-white">{getLocalizedItemName(item, locale)}</h1>
          {item.gold != null && (
            <p className="mt-1 text-hok-gold">{item.gold} gold</p>
          )}
          {item.type && (
            <p className="mt-1 text-sm text-gray-500">{item.type}</p>
          )}
          {label && (
            <p className="mt-3 rounded-lg border border-hok-gold/30 bg-hok-gold/10 px-3 py-2 text-sm text-hok-gold">
              {label}
            </p>
          )}
          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-gray-300">
            {desc}
          </p>

          {passives.length > 0 && (
            <div className="mt-5">
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-hok-gold">
                {t('items.passiveTitle')}
              </h2>
              <ul className="space-y-2">
                {passives.map((p) => (
                  <li
                    key={p}
                    className="rounded-lg border border-hok-border/80 bg-hok-dark/50 px-3 py-2 text-sm leading-relaxed text-gray-300 whitespace-pre-line"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="mt-3 text-xs text-gray-500">{t('items.campSource')}</p>
        </div>
      </div>

      {usedBy.length > 0 && (
        <section>
          <h2 className="section-title">{t('items.usedInBuilds')}</h2>
          <div className="flex flex-wrap gap-3">
            {usedBy.map((h) => (
              <Link
                key={h.slug}
                href={localePath(locale, `/hero/${h.slug}#build`)}
                className="flex items-center gap-2 rounded-lg border border-hok-border px-2 py-1.5 hover:border-hok-gold/40"
              >
                <HeroAvatar
                  hero={{
                    slug: h.slug,
                    name: h.name,
                    avatar: h.avatar,
                    avatarFallback: h.avatarFallback,
                  }}
                  size={36}
                />
                <span className="text-sm text-gray-300">{getHeroDisplayName(h, locale)}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
