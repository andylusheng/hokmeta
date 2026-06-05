import {
  getTopRisingHeroes,
  getMostPickedHeroes,
  getMostBannedHeroes,
  getRecentMetaChanges,
  site,
} from '@/lib/data';
import {
  getPatchStrongest,
  getSoloQueueKings,
  getProScenePressure,
  getBestDuos,
  getBestComps,
} from '@/lib/trends';
import patchesMeta from '../../../data/patches.json';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { TrendList } from '@/components/TrendList';
import { TrendDuoList } from '@/components/TrendDuoList';
import { TrendCompList } from '@/components/TrendCompList';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';
import Link from 'next/link';

export const metadata = buildMetadata({
  title: defaultTitle('Hero Trends & Meta Rankings'),
  description:
    'Honor of Kings global meta rankings — win rate, pick/ban, patch strongest, solo queue, duos, comps, and pro draft pressure from Camp HOK.',
  path: '/hero-trends',
});

export default function HeroTrendsPage() {
  const rising = getTopRisingHeroes(10);
  const picked = getMostPickedHeroes(10);
  const banned = getMostBannedHeroes(10);
  const changes = getRecentMetaChanges(10);
  const patchStrong = getPatchStrongest(10);
  const soloKings = getSoloQueueKings(10);
  const proPressure = getProScenePressure(10);
  const duos = getBestDuos(6);
  const comps = getBestComps(4);

  const syncDate =
    'updated' in patchesMeta ? patchesMeta.updated : site.dateModified;

  return (
    <div className="container-page">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Hero Trends', path: '/hero-trends' },
        ])}
      />
      <Breadcrumb
        items={[{ label: 'Home', href: '/' }, { label: 'Hero Trends' }]}
      />
      <h1 className="mb-2 text-3xl font-bold text-white">Hero Trends</h1>
      <p className="mb-4 text-gray-400">
        Meta leaderboards from Camp HOK international ranked — updated each sync.
      </p>
      <p className="mb-8 text-sm text-gray-500">
        Last sync: {syncDate}. Duo and comp boards use lane-based top picks from
        Camp data — not official pair win rates or KPL replays. Cross-check on{' '}
        <Link href="/tier-list/" className="text-hok-gold hover:underline">
          Tier List
        </Link>{' '}
        and hero pages.
      </p>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="card">
          <h2 className="section-title">Patch Strongest</h2>
          <p className="mb-3 text-xs text-gray-500">
            Tier S+ / S heroes with highest win rate this sync
          </p>
          <TrendList heroes={patchStrong} metric="winRate" />
        </section>

        <section className="card">
          <h2 className="section-title">Solo Queue Kings</h2>
          <p className="mb-3 text-xs text-gray-500">
            Meta score with 51%+ win rate — strong picks without a premade
          </p>
          <TrendList heroes={soloKings} metric="winRate" />
        </section>

        <section className="card">
          <h2 className="section-title">Highest Win Rate</h2>
          <TrendList heroes={rising} metric="winRate" />
        </section>

        <section className="card">
          <h2 className="section-title">Most Picked</h2>
          <TrendList heroes={picked} metric="pickRate" />
        </section>

        <section className="card">
          <h2 className="section-title">Most Banned</h2>
          <TrendList heroes={banned} metric="banRate" />
        </section>

        <section className="card">
          <h2 className="section-title">Pro Draft Pressure</h2>
          <p className="mb-3 text-xs text-gray-500">
            Ban + pick weight on global Camp (no live KPL API)
          </p>
          <TrendList heroes={proPressure} metric="banRate" />
        </section>

        <section className="card lg:col-span-2">
          <h2 className="section-title">Best Duos</h2>
          <p className="mb-3 text-xs text-gray-500">
            One pair per lane strategy — roam/bot, mid/jungle, side gank, engage/pick
          </p>
          <TrendDuoList duos={duos} />
        </section>

        <section className="card lg:col-span-2">
          <h2 className="section-title">Meta Comps</h2>
          <p className="mb-3 text-xs text-gray-500">
            Five-hero templates: balanced, fast push, protect carry, ban core
          </p>
          <TrendCompList comps={comps} />
        </section>

        <section className="card lg:col-span-2">
          <h2 className="section-title">Recent Meta Changes</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            {changes.map(({ hero, patch }) => (
              <li key={`${hero.slug}-${patch}`}>
                <Link
                  href={`/hero/${hero.slug}/`}
                  className="font-medium text-hok-gold hover:underline"
                >
                  {hero.name}
                </Link>
                : {patch}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
