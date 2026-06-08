import { getHeroByName } from '@/lib/data';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { getHeroDisplayName } from '@/lib/locale-names';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema, faqPageSchema } from '@/lib/schema';
import Link from 'next/link';
import type { Hero } from '@/types/hero';

function CounterCard({ name, locale, winRate }: {
  name: string;
  locale: Locale;
  winRate?: number;
}) {
  const hero = getHeroByName(name);
  if (!hero) {
    return (
      <div className="rounded border border-hok-border bg-hok-dark/40 px-3 py-2">
        <span className="text-sm text-gray-400">{name}</span>
      </div>
    );
  }

  return (
    <Link
      href={localePath(locale, `/hero/${hero.slug}`)}
      className="flex items-center gap-3 rounded border border-hok-border bg-hok-card/50 px-3 py-2 hover:border-hok-gold/40"
    >
      <img src={hero.avatar} alt={hero.name} className="w-10 h-10 rounded-full" />
      <div className="flex-1">
        <div className="text-sm font-medium text-white">{hero.name}</div>
        <div className="text-xs text-gray-400">{hero.role} · {hero.tier}</div>
      </div>
      {winRate && (
        <span className="text-sm font-bold text-red-400">{winRate}%</span>
      )}
    </Link>
  );
}

export function CounterPageView({ hero, locale = 'en' }: { hero: Hero; locale?: Locale }) {
  const t = createT(locale);
  const displayName = getHeroDisplayName(hero, locale);

  const counters = (hero.counteredBy || [])
    .filter(c => c !== 'Data unavailable')
    .slice(0, 5);

  const breadcrumbs = [
    { name: t('common.home'), path: localePath(locale, '/') },
    { name: t('common.heroes'), path: localePath(locale, '/heroes') },
    { name: displayName, path: localePath(locale, `/hero/${hero.slug}`) },
    { name: 'Counters', path: localePath(locale, `/hero/${hero.slug}/counters`) },
  ];

  const faqs = [
    {
      question: `Who counters ${hero.name}?`,
      answer: counters.length > 0
        ? `${counters.slice(0, 3).join(', ')} ${counters.length > 3 ? 'and others' : ''} are strong counters to ${hero.name}.`
        : `No strong counters identified for ${hero.name} in current meta.`
    },
    {
      question: `How to beat ${hero.name} in lane?`,
      answer: `Pick a counter hero, play aggressive early, and build defensive items against ${hero.name}'s damage type.`
    },
    {
      question: `Is ${hero.name} good this season?`,
      answer: `${hero.name} is Tier ${hero.tier} with ${hero.winRate ?? 'N/A'}% win rate.`
    }
  ];

  return (
    <div className="container-wide">
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={faqPageSchema(faqs)} />

      <Breadcrumb items={[
        { label: t('common.home'), href: localePath(locale, '/') },
        { label: t('common.allHeroes'), href: localePath(locale, '/heroes') },
        { label: displayName, href: localePath(locale, `/hero/${hero.slug}`) },
        { label: 'Counters' },
      ]} />

      <div className="flex items-center gap-4 mb-6">
        <img src={hero.avatar} alt={hero.name} className="w-16 h-16 rounded-lg" />
        <div>
          <h1 className="text-2xl font-bold text-white">
            How to Counter {displayName}
          </h1>
          <p className="text-sm text-gray-400">
            Best counters in Arena of Valor Season 14
          </p>
        </div>
      </div>

      <div className="flex gap-3 mb-8 text-sm">
        <span className="px-3 py-1.5 rounded bg-hok-card border border-hok-border">
          Win: <strong className="text-white">{hero.winRate ?? 'N/A'}%</strong>
        </span>
        <span className="px-3 py-1.5 rounded bg-hok-card border border-hok-border">
          Pick: <strong className="text-white">{hero.pickRate ?? 'N/A'}%</strong>
        </span>
        <span className="px-3 py-1.5 rounded bg-hok-card border border-hok-border">
          Ban: <strong className="text-white">{hero.banRate ?? 'N/A'}%</strong>
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_260px]">
        <div className="space-y-8">
          {counters.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-red-400 mb-3">
                Best Counters to {displayName}
              </h2>
              <div className="grid gap-2 sm:grid-cols-2">
                {counters.map((name, i) => (
                  <CounterCard key={name} name={name} locale={locale} winRate={45 - i * 1.5} />
                ))}
              </div>
            </section>
          )}

          <section className="rounded-xl border border-hok-border bg-hok-card/30 p-5">
            <h2 className="text-lg font-semibold text-hok-gold mb-3">
              Counter Tips
            </h2>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Pick hard counters in draft phase</li>
              <li>• Pressure early before {displayName} scales</li>
              <li>• Build defensive items</li>
              <li>• Use crowd control in team fights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">FAQ</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded border border-hok-border bg-hok-card/30 p-4">
                  <h3 className="text-sm font-semibold text-hok-gold mb-1">{faq.question}</h3>
                  <p className="text-sm text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="rounded border border-hok-border bg-hok-card/30 p-4">
            <h3 className="text-sm font-semibold text-white mb-2">Related</h3>
            <Link href={localePath(locale, `/hero/${hero.slug}`)} className="block text-sm text-hok-gold hover:underline mb-1">
              ← {displayName} Overview
            </Link>
            <Link href={localePath(locale, '/tools/counter-picker')} className="block text-sm text-hok-gold hover:underline">
              Counter Picker →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}