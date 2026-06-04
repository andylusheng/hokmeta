import { heroes, getHeroesByRole, formatRate } from '@/lib/data';
import type { HeroRole } from '@/types/hero';

export interface LearnArticle {
  slug: string;
  title: string;
  description: string;
  sections: { heading: string; body: string }[];
}

function topByRole(role: HeroRole, n = 5) {
  return getHeroesByRole(role)
    .slice(0, n)
    .map((h) => `${h.name} (Tier ${h.tier}, WR ${formatRate(h.winRate)})`)
    .join('; ');
}

function topAssassins() {
  return getHeroesByRole('Assassin')
    .slice(0, 5)
    .map((h) => h.name)
    .join(', ');
}

const jungleHeroes = topByRole('Assassin', 5) + '; ' + topByRole('Warrior', 3);

export const learnArticles: LearnArticle[] = [
  {
    slug: 'best-jungle-heroes',
    title: 'Best Jungle Heroes in Honor of Kings',
    description:
      'Data-ranked jungle picks from HOK Meta tier list: win rate, pick rate, and ban rate for Assassin and Warrior junglers.',
    sections: [
      {
        heading: 'Top jungle picks (data)',
        body: `Current meta junglers from our dataset: ${jungleHeroes}. Selections use win rate and tier fields only.`,
      },
      {
        heading: 'Draft priority',
        body: `Jungler ban rates: ${heroes.filter((h) => h.banRate !== null).map((h) => `${h.name} ${formatRate(h.banRate)}`).join(', ') || 'Data unavailable'}.`,
      },
    ],
  },
  {
    slug: 'best-solo-queue-heroes',
    title: 'Best Solo Queue Heroes',
    description:
      'Solo queue heroes with strong independent win rates and stable pick rates from HOK Meta JSON data.',
    sections: [
      {
        heading: 'Carry picks',
        body:
          heroes
            .filter((h) => h.tier === 'S+' || h.tier === 'S')
            .map((h) => `${h.name}: Tier ${h.tier}, WR ${formatRate(h.winRate)}`)
            .join('. ') || 'Data unavailable',
      },
    ],
  },
  {
    slug: 'best-beginner-heroes',
    title: 'Best Beginner Heroes',
    description: 'Easy-difficulty heroes with accessible kits and meta-friendly win rates.',
    sections: [
      {
        heading: 'Easy difficulty roster',
        body: heroes
          .filter((h) => h.difficulty === 'Easy')
          .map((h) => `${h.name} (${h.role}, Tier ${h.tier})`)
          .join('; ') || 'Data unavailable',
      },
    ],
  },
  {
    slug: 'how-to-rank-up-fast',
    title: 'How to Rank Up Fast in HOK',
    description:
      'Rank climbing tied to meta picks: pick high win-rate heroes in your role and track patch history.',
    sections: [
      {
        heading: 'Meta-first drafting',
        body: `Queue with Tier S+ and S heroes: ${heroes.filter((h) => h.tier === 'S+' || h.tier === 'S').map((h) => h.name).slice(0, 10).join(', ')}. Match pick rate ${formatRate(heroes[0]?.pickRate ?? null)} benchmarks on hero pages.`,
      },
    ],
  },
  {
    slug: 'how-to-counter-assassins',
    title: 'How to Counter Assassins',
    description: 'Assassin counters from hero counter matrices in hokmeta data.',
    sections: [
      {
        heading: 'Assassin matchups',
        body: `Target assassins: ${topAssassins()}. Use Tank and Support counters listed on each assassin hero page.`,
      },
      {
        heading: 'Example counters',
        body: heroes
          .filter((h) => h.role === 'Assassin')
          .slice(0, 3)
          .map((h) => `${h.name}: counter with ${h.counteredBy.join(', ')}`)
          .join('. '),
      },
    ],
  },
  {
    slug: 'how-to-counter-tanks',
    title: 'How to Counter Tanks',
    description: 'Marksman and Mage picks that beat Tank win conditions.',
    sections: [
      {
        heading: 'Anti-tank carries',
        body: topByRole('Marksman', 5),
      },
      {
        heading: 'Tank counter list',
        body: getHeroesByRole('Tank')
          .map((h) => `${h.name} countered by ${h.counteredBy.join(', ')}`)
          .join('. ') || 'Data unavailable',
      },
    ],
  },
  {
    slug: 'how-to-jungle',
    title: 'How to Jungle in Honor of Kings',
    description: 'Jungle pathing basics aligned with current jungle meta stats.',
    sections: [
      {
        heading: 'Hero selection',
        body: jungleHeroes,
      },
    ],
  },
  {
    slug: 'how-to-roam',
    title: 'How to Roam as Support',
    description: 'Support roam timing using pick rates and tier data.',
    sections: [
      {
        heading: 'Support meta',
        body: topByRole('Support', 6),
      },
    ],
  },
  {
    slug: 'how-tier-list-works',
    title: 'How the HOK Meta Tier List Works',
    description:
      'Tier S+ through C assigned from win rate, pick rate, ban rate, and rank index in heroes.json.',
    sections: [
      {
        heading: 'Tier bands',
        body: 'S+: top win rate and ban pressure. S: strong meta. A/B/C: lower composite metrics. Each hero page shows the exact stats table.',
      },
      {
        heading: 'Role grouping',
        body: 'Tier list page groups every tier band by Tank, Warrior, Assassin, Mage, Marksman, and Support.',
      },
    ],
  },
  {
    slug: 'best-heroes-after-patch',
    title: 'Best Heroes After Patch',
    description: 'Post-patch priorities from patchHistory fields across the hero roster.',
    sections: [
      {
        heading: 'Recent adjustments',
        body: heroes
          .flatMap((h) =>
            h.patchHistory
              .filter((p) => p.change !== 'Data unavailable')
              .slice(0, 1)
              .map((p) => `${h.name}: ${p.version} — ${p.change}`)
          )
          .slice(0, 12)
          .join(' | ') || 'Data unavailable',
      },
    ],
  },
];

export function getLearnArticle(slug: string) {
  return learnArticles.find((a) => a.slug === slug);
}

export function getLearnSlugs() {
  return learnArticles.map((a) => a.slug);
}
