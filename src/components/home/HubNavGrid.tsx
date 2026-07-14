import Link from 'next/link';
import { heroes, items } from '@/lib/data';
import { countUniqueArcana } from '@/lib/lanes';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { isLocaleReadyForPath } from '@/lib/locale-readiness';

export function HubNavGrid({ locale = 'en' }: { locale?: Locale }) {
  const t = createT(locale);

  const cards = [
    {
      href: localePath(locale, '/heroes'),
      title: t('nav.heroBuilds'),
      desc: t('home.hubHeroes', { count: heroes.length }),
    },
    {
      href: localePath(locale, '/hero-trends'),
      title: t('nav.trends'),
      desc: t('home.hubTrends'),
    },
    {
      href: localePath(locale, '/meta-report'),
      title: t('home.hubMetaReportTitle'),
      desc: t('home.hubMetaReport'),
    },
    {
      href: localePath(locale, '/items'),
      title: t('nav.items'),
      desc: t('home.hubItems', { count: items.length }),
    },
    {
      href: localePath(locale, '/arcana'),
      title: t('nav.arcana'),
      desc: t('home.hubArcana', { count: countUniqueArcana() }),
    },
    {
      href: localePath(locale, '/learn'),
      title: t('nav.guides'),
      desc: t('home.hubGuides'),
    },
    {
      href: localePath(locale, '/patches'),
      title: t('nav.patches'),
      desc: t('home.hubPatches'),
    },
  ].filter((card) => isLocaleReadyForPath(locale, card.href));

  return (
    <div className="mb-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((c) => (
        <Link key={c.href} href={c.href} className="hub-card group">
          <span className="hub-card-title">{c.title}</span>
          <span className="hub-card-desc">{c.desc}</span>
        </Link>
      ))}
    </div>
  );
}
