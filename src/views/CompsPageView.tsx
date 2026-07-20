import Link from 'next/link';
import { getCompDuos, getCompTemplates, getCompsMeta } from '@/lib/comps';
import { Breadcrumb } from '@/components/Breadcrumb';
import { HeroAvatar } from '@/components/HeroAvatar';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { getHeroDisplayName } from '@/lib/locale-names';
import { translateLane } from '@/lib/locale-labels';
import { LANE_LABEL } from '@/lib/lanes';
import { JsonLd, breadcrumbSchema, faqPageSchema } from '@/lib/schema';

const COMPS_FAQS = [
  {
    question: 'What is the best team comp for ranked climb in Honor of Kings?',
    answer: 'A balanced comp with frontline engage, backline DPS, and peel support works best. Fast Push and Protect-Carry templates are reliable for solo queue.',
  },
  {
    question: 'How do I counter a dive composition?',
    answer: 'Use Anti-Dive Protection: Dun + Dolia double peel, zone denial from Yi Xing, and a secondary frontline like Kaizer to absorb engages.',
  },
  {
    question: 'Which duo is strongest for bot lane?',
    answer: 'Marco Polo + Yaria is the classic hyper-carry duo. Garo + Da Qiao enables split-push, while Meng Ya + Sakeer dominates with poke range.',
  },
  {
    question: 'Are these comps based on actual duo win rates?',
    answer: 'No. Individual hero stats come from Camp HOK international ranked data. Synergy notes are editorial analysis — no official duo win-rate data is published.',
  },
];

export function CompsPageView({ locale = 'en' }: { locale?: Locale }) {
  const t = createT(locale);
  const duos = getCompDuos(locale);
  const templates = getCompTemplates(locale);
  const meta = getCompsMeta();

  return (
    <div className="container-wide">
      <JsonLd
        data={breadcrumbSchema([
          { name: t('common.home'), path: localePath(locale, '/') },
          { name: t('comps.title'), path: localePath(locale, '/comps') },
        ])}
      />
      <Breadcrumb
        items={[
          { label: t('common.home'), href: localePath(locale, '/') },
          { label: t('comps.title') },
        ]}
      />
      <h1 className="mb-2 font-display text-3xl font-black text-white sm:text-4xl">
        {t('comps.title')}
      </h1>
      <p className="mb-2 max-w-2xl text-gray-400">{t('comps.subtitle')}</p>
      <p className="mb-8 text-xs text-gray-500">
        {t('comps.sourceNote', { source: meta.source, updated: meta.updated })}
      </p>

      <section className="mb-12">
        <h2 className="section-title">{t('comps.duosTitle')}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {duos.map((duo) => (
            <article
              key={duo.id}
              className="rounded-xl border border-hok-border bg-hok-card/80 p-5"
            >
              <div className="mb-4 flex flex-wrap items-center gap-4">
                {duo.heroes.map((h) => (
                  <Link
                    key={h.slug}
                    href={localePath(locale, `/hero/${h.slug}`)}
                    className="flex flex-col items-center gap-1"
                  >
                    <HeroAvatar hero={h} size={64} />
                    <span className="text-xs font-medium text-white">
                      {getHeroDisplayName(h, locale)}
                    </span>
                  </Link>
                ))}
                <span className="text-2xl text-gray-600">+</span>
              </div>
              <p className="mb-2 text-xs uppercase tracking-wide text-hok-gold">
                {translateLane(LANE_LABEL[duo.lane], locale) || LANE_LABEL[duo.lane]}
                {duo.tags.length ? ` · ${duo.tags.join(', ')}` : ''}
              </p>
              <p className="text-sm leading-relaxed text-gray-300">{duo.synergy}</p>
              <p className="mt-3 text-xs text-gray-500">{duo.dataNote}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="section-title">{t('comps.templatesTitle')}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {templates.map((tpl) => (
            <article
              key={tpl.id}
              className="rounded-xl border border-hok-gold/30 bg-hok-gold/5 p-5"
            >
              <h3 className="mb-3 text-lg font-bold text-white">{tpl.title}</h3>
              <div className="mb-4 flex flex-wrap gap-3">
                {tpl.heroes.map((h) => (
                  <Link
                    key={h.slug}
                    href={localePath(locale, `/hero/${h.slug}`)}
                    className="flex items-center gap-2 rounded-lg border border-hok-border/60 px-2 py-1"
                  >
                    <HeroAvatar hero={h} size={32} />
                    <span className="text-xs text-gray-300">
                      {getHeroDisplayName(h, locale)}
                    </span>
                  </Link>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-gray-300">{tpl.description}</p>
              <p className="mt-3 text-xs text-gray-500">{tpl.dataNote}</p>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-12 max-w-2xl">
        <h2 className="section-title">{t('comps.faqTitle')}</h2>
        <div className="space-y-4">
          {COMPS_FAQS.map((faq) => (
            <details key={faq.question} className="rounded-lg border border-hok-border bg-hok-card/40 p-4">
              <summary className="cursor-pointer text-sm font-semibold text-white">{faq.question}</summary>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">{faq.answer}</p>
            </details>
          ))}
        </div>
        <JsonLd data={faqPageSchema(COMPS_FAQS)} />
      </section>
    </div>
  );
}
