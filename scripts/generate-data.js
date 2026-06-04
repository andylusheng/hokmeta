const fs = require('fs');
const path = require('path');

const CDN = 'https://image.inews.gtimg.com/newsapp_bt/0/hokmeta/hero';

// Stats (win/pick/ban/rank) are null until real data is sourced — never invented.
const HEROES = [
  ['lam', 'Lam', 'Assassin', 'Hard', 'S+'],
  ['augran', 'Augran', 'Warrior', 'Medium', 'S'],
  ['angela', 'Angela', 'Support', 'Easy', 'S'],
  ['musashi', 'Musashi', 'Assassin', 'Hard', 'S+'],
  ['luna', 'Luna', 'Mage', 'Medium', 'S'],
  ['yaria', 'Yaria', 'Mage', 'Medium', 'A'],
  ['biron', 'Biron', 'Tank', 'Easy', 'A'],
  ['dolia', 'Dolia', 'Support', 'Medium', 'S'],
  ['loong', 'Loong', 'Warrior', 'Hard', 'S+'],
  ['arli', 'Arli', 'Marksman', 'Medium', 'S'],
  ['fang', 'Fang', 'Assassin', 'Hard', 'A'],
  ['milady', 'Milady', 'Mage', 'Medium', 'A'],
  ['wukong', 'Wukong', 'Warrior', 'Medium', 'S'],
  ['diaochan', 'Diaochan', 'Mage', 'Hard', 'S+'],
  ['hou-yi', 'Hou Yi', 'Marksman', 'Medium', 'S'],
  ['luban-no-7', 'Luban No.7', 'Marksman', 'Easy', 'A'],
  ['arthur', 'Arthur', 'Warrior', 'Easy', 'B'],
  ['mozi', 'Mozi', 'Mage', 'Hard', 'A'],
  ['lady-sun', 'Lady Sun', 'Marksman', 'Hard', 'S+'],
  ['li-xin', 'Li Xin', 'Warrior', 'Medium', 'A'],
  ['marco-polo', 'Marco Polo', 'Marksman', 'Hard', 'S'],
  ['charlotte', 'Charlotte', 'Warrior', 'Hard', 'S'],
  ['dharma', 'Dharma', 'Warrior', 'Medium', 'A'],
  ['donghuang', 'Donghuang', 'Tank', 'Hard', 'S+'],
  ['da-qiao', 'Da Qiao', 'Support', 'Easy', 'A'],
  ['cai-yan', 'Cai Yan', 'Mage', 'Medium', 'B'],
  ['jing', 'Jing', 'Assassin', 'Hard', 'S'],
  ['shouyue', 'Shouyue', 'Marksman', 'Hard', 'S+'],
  ['kaizer', 'Kaizer', 'Warrior', 'Medium', 'A'],
  ['alessio', 'Alessio', 'Marksman', 'Medium', 'A'],
];

const BUILDS = {
  lam: ['Shadow Blade', 'Hermes Boots', 'Bloodthirsty', 'Blade of Despair', 'Immortal', 'Guardian'],
  augran: ['Gilded Greaves', 'Mantle', 'Frost Cape', 'Antique Cuirass', 'Dominance', 'Helm'],
  angela: ['Swift Boots', 'Echo', 'Frosted', 'Dominance', 'Brilliant', 'Sanctuary'],
  musashi: ['Hunter', 'Hermes', 'Bloodthirsty', 'Blade', 'Immortal', 'Rose Gold'],
  luna: ['Arcane', 'Swift', 'Lightning', 'Robe', 'Brilliant', 'Dominance'],
  yaria: ['Arcane', 'Swift', 'Lightning', 'Robe', 'Brilliant', 'Dominance'],
  biron: ['Gilded', 'Mantle', 'Frost Cape', 'Antique', 'Dominance', 'Helm'],
  dolia: ['Swift', 'Echo', 'Frosted', 'Dominance', 'Brilliant', 'Sanctuary'],
  loong: ['Gilded', 'Mantle', 'Frost Cape', 'Antique', 'Dominance', 'Helm'],
  arli: ['Hunter', 'Swift', 'Wind', 'Blade', 'Immortal', 'Rose Gold'],
  fang: ['Shadow', 'Hermes', 'Bloodthirsty', 'Blade', 'Immortal', 'Guardian'],
  milady: ['Arcane', 'Swift', 'Lightning', 'Robe', 'Brilliant', 'Dominance'],
  wukong: ['Gilded', 'Mantle', 'Frost Cape', 'Antique', 'Dominance', 'Helm'],
  diaochan: ['Arcane', 'Swift', 'Lightning', 'Robe', 'Brilliant', 'Dominance'],
  'hou-yi': ['Hunter', 'Swift', 'Wind', 'Blade', 'Immortal', 'Rose Gold'],
  'luban-no-7': ['Hunter', 'Swift', 'Wind', 'Blade', 'Immortal', 'Rose Gold'],
  arthur: ['Gilded', 'Mantle', 'Frost Cape', 'Antique', 'Dominance', 'Helm'],
  mozi: ['Arcane', 'Swift', 'Lightning', 'Robe', 'Brilliant', 'Dominance'],
  'lady-sun': ['Hunter', 'Swift', 'Wind', 'Blade', 'Immortal', 'Rose Gold'],
  'li-xin': ['Gilded', 'Mantle', 'Frost Cape', 'Antique', 'Dominance', 'Helm'],
  'marco-polo': ['Hunter', 'Swift', 'Wind', 'Blade', 'Immortal', 'Rose Gold'],
  charlotte: ['Gilded', 'Mantle', 'Frost Cape', 'Antique', 'Dominance', 'Helm'],
  dharma: ['Gilded', 'Mantle', 'Frost Cape', 'Antique', 'Dominance', 'Helm'],
  donghuang: ['Gilded', 'Mantle', 'Frost Cape', 'Antique', 'Dominance', 'Helm'],
  'da-qiao': ['Swift', 'Echo', 'Frosted', 'Dominance', 'Brilliant', 'Sanctuary'],
  'cai-yan': ['Arcane', 'Swift', 'Lightning', 'Robe', 'Brilliant', 'Dominance'],
  jing: ['Shadow', 'Hermes', 'Bloodthirsty', 'Blade', 'Immortal', 'Guardian'],
  shouyue: ['Hunter', 'Swift', 'Wind', 'Blade', 'Immortal', 'Rose Gold'],
  kaizer: ['Gilded', 'Mantle', 'Frost Cape', 'Antique', 'Dominance', 'Helm'],
  alessio: ['Hunter', 'Swift', 'Wind', 'Blade', 'Immortal', 'Rose Gold'],
};

const COUNTERS = {
  lam: ['Angela', 'Biron', 'Donghuang'],
  augran: ['Diaochan', 'Milady', 'Marco Polo'],
  angela: ['Musashi', 'Jing', 'Fang'],
  musashi: ['Donghuang', 'Biron', 'Angela'],
  luna: ['Loong', 'Wukong', 'Charlotte'],
  yaria: ['Jing', 'Musashi', 'Lam'],
  biron: ['Lady Sun', 'Hou Yi', 'Marco Polo'],
  dolia: ['Diaochan', 'Luna', 'Mozi'],
  loong: ['Angela', 'Dolia', 'Da Qiao'],
  arli: ['Wukong', 'Loong', 'Kaizer'],
  fang: ['Biron', 'Donghuang', 'Angela'],
  milady: ['Musashi', 'Jing', 'Lam'],
  wukong: ['Angela', 'Dolia', 'Da Qiao'],
  diaochan: ['Musashi', 'Jing', 'Lam'],
  'hou-yi': ['Loong', 'Wukong', 'Kaizer'],
  'luban-no-7': ['Loong', 'Wukong', 'Fang'],
  arthur: ['Lady Sun', 'Diaochan', 'Luna'],
  mozi: ['Musashi', 'Fang', 'Jing'],
  'lady-sun': ['Loong', 'Wukong', 'Fang'],
  'li-xin': ['Angela', 'Dolia', 'Milady'],
  'marco-polo': ['Loong', 'Wukong', 'Fang'],
  charlotte: ['Angela', 'Dolia', 'Yaria'],
  dharma: ['Lady Sun', 'Hou Yi', 'Shouyue'],
  donghuang: ['Lady Sun', 'Hou Yi', 'Alessio'],
  'da-qiao': ['Musashi', 'Jing', 'Lam'],
  'cai-yan': ['Musashi', 'Fang', 'Jing'],
  jing: ['Biron', 'Donghuang', 'Angela'],
  shouyue: ['Loong', 'Wukong', 'Kaizer'],
  kaizer: ['Angela', 'Dolia', 'Milady'],
  alessio: ['Loong', 'Wukong', 'Fang'],
};

function counteredBy(slug) {
  const name = HEROES.find((h) => h[0] === slug)[1];
  const out = [];
  for (const [s] of HEROES) {
    const c = COUNTERS[s];
    if (c && c.includes(name) && out.length < 3) {
      out.push(HEROES.find((h) => h[0] === s)[1]);
    }
  }
  while (out.length < 3) out.push('Data unavailable');
  return out.slice(0, 3);
}

function faqs(name, slug, role, tier, wr, pr, br, build, counters) {
  const wrs = wr != null ? `${wr}% win rate` : 'Data unavailable win rate';
  const prs = pr != null ? `${pr}% pick rate` : 'Data unavailable pick rate';
  const brs = br != null ? `${br}% ban rate` : 'Data unavailable ban rate';
  const b = build.join(', ');
  const c = counters.join(', ');
  return [
    {
      id: 'faq-good-season',
      question: `Is ${name} good in current season?`,
      answer: `${name} is listed as Tier ${tier} ${role} with ${wrs}, ${prs}, and ${brs}. Ranked viability follows these meta metrics and patch history on this page.`,
    },
    {
      id: 'faq-best-build',
      question: `What is the best ${name} build?`,
      answer: `Core item path for ${name}: ${b}. Spells and arcana sets are listed in the Build section. Adjust final slot by enemy ${c.split(',')[0] || 'composition'}.`,
    },
    {
      id: 'faq-counter',
      question: `How to counter ${name}?`,
      answer: `Pick ${c} to pressure ${name}'s ${role} windows. Ban rate ${br != null ? br + '%' : 'unavailable'} shows draft priority. See counter matchups table below.`,
    },
  ];
}

function metaAnalysis(name, role, tier, wr, pr, br, counters, countered) {
  const lines = [];
  if (wr != null) lines.push(`${name} win rate ${wr}% places ${name} in Tier ${tier} for ${role} slots.`);
  else lines.push(`${name} win rate: Data unavailable. Tier ${tier} ${role} ranking uses other signals.`);
  if (pr != null) lines.push(`Pick rate ${pr}% reflects ${pr > 8 ? 'high' : 'moderate'} ranked visibility for ${name}.`);
  if (br != null) lines.push(`Ban rate ${br}% ${br > 10 ? 'signals draft threat' : 'shows selective bans'} against ${name}.`);
  lines.push(`Draft counters: ${counters.join(', ')}. Heroes that punish ${name}: ${countered.join(', ')}.`);
  return lines;
}

const heroes = HEROES.map(([slug, name, role, diff, tier]) => {
  const wr = null;
  const pr = null;
  const br = null;
  const rank = null;
  const buildNames = BUILDS[slug] || Array(6).fill('Data unavailable');
  const build = buildNames.map((n, i) => ({ name: n, slot: i + 1 }));
  const counters = COUNTERS[slug] || ['Data unavailable', 'Data unavailable', 'Data unavailable'];
  const cby = counteredBy(slug);
  const spells =
    role === 'Support'
      ? ['Heal', 'Flicker']
      : role === 'Marksman'
        ? ['Flash', 'Heal']
        : role === 'Mage'
          ? ['Flash', 'Punish']
          : ['Flash', 'Execute'];
  const arcana =
    role === 'Marksman'
      ? ['Crit', 'Penetration', 'Attack Speed']
      : role === 'Mage'
        ? ['AP', 'CDR', 'Mana']
        : role === 'Support'
          ? ['HP', 'CDR', 'Defense']
          : ['Attack', 'Penetration', 'HP'];

  return {
    id: slug,
    slug,
    name,
    role,
    difficulty: diff,
    tier,
    winRate: wr,
    pickRate: pr,
    banRate: br,
    rank,
    avatar: `${CDN}/${slug}.png`,
    build,
    arcana,
    spells,
    counters,
    counteredBy: cby,
    tips: [
      `${name}: prioritize ${tier} tier ${role} power spikes from patch history.`,
      `Watch ${br != null && br > 10 ? 'ban phase' : 'pick rate'} — ${pr != null ? pr + '% pick' : 'pick data unavailable'}.`,
      `Lane into ${counters[0]} with listed build order.`,
    ],
    patchHistory: [
      { version: 'S38', change: 'Data unavailable' },
      { version: 'S37', change: 'Data unavailable' },
      { version: 'S36', change: 'Data unavailable' },
    ],
    faqs: faqs(name, slug, role, tier, wr, pr, br, buildNames, counters),
    metaAnalysis: metaAnalysis(name, role, tier, wr, pr, br, counters, cby),
  };
});

const keywords = {};
for (const [slug, name] of HEROES.map((h) => [h[0], h[1]])) {
  const key = slug.replace(/-/g, ' ');
  keywords[slug] = [
    `${slug} build`,
    `${slug} guide`,
    `${slug} counter`,
  ];
}

const root = path.join(__dirname, '..');
fs.writeFileSync(path.join(root, 'data', 'heroes.json'), JSON.stringify(heroes, null, 2));
fs.writeFileSync(path.join(root, 'data', 'keywords.json'), JSON.stringify(keywords, null, 2));
console.log('Generated', heroes.length, 'heroes and keywords.');
