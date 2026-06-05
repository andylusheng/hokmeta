/**
 * Generate full hero guides, matchup analysis, long-tail FAQs, and high-rank notes
 * for every hero in data/heroes.json (Camp HOK international data).
 */
const fs = require('fs');
const path = require('path');

const heroesPath = path.join(__dirname, '..', 'data', 'heroes.json');
const heroes = JSON.parse(fs.readFileSync(heroesPath, 'utf8'));

const SYNC_DATE = heroes[0]?.dataUpdated ?? '2026-06-05';

function fmtRate(v) {
  if (v == null || Number.isNaN(v)) return 'Data unavailable';
  return `${Number(v).toFixed(1)}%`;
}

function validName(n) {
  return n && n !== 'Data unavailable' && n.length <= 32 && !/[.!?]/.test(n);
}

function uniqNames(list) {
  const seen = new Set();
  return list.filter((n) => {
    const k = n.trim().toLowerCase();
    if (!validName(n) || seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

function buildNameIndex(list) {
  const m = new Map();
  for (const h of list) {
    m.set(h.name.toLowerCase(), h);
    m.set(h.slug, h);
  }
  return m;
}

const byName = buildNameIndex(heroes);

function resolveMatchups(hero) {
  let strongInto = uniqNames(hero.counters || []);
  let weakInto = uniqNames(hero.counteredBy || []);

  if (strongInto.length < 2) {
    for (const h of heroes) {
      if (h.slug === hero.slug) continue;
      if (
        (h.counteredBy || []).some(
          (n) => n.toLowerCase() === hero.name.toLowerCase()
        )
      ) {
        strongInto.push(h.name);
      }
    }
  }

  if (weakInto.length < 2) {
    for (const h of heroes) {
      if (h.slug === hero.slug) continue;
      if (
        (h.counters || []).some(
          (n) => n.toLowerCase() === hero.name.toLowerCase()
        )
      ) {
        weakInto.push(h.name);
      }
    }
  }

  const roleFallback = {
    Assassin: {
      into: ['Marksman', 'Mage'],
      weak: ['Tank', 'Support'],
    },
    Tank: { into: ['Assassin'], weak: ['Marksman', 'Mage'] },
    Warrior: { into: ['Marksman'], weak: ['Mage', 'Support'] },
    Mage: { into: ['Tank', 'Warrior'], weak: ['Assassin'] },
    Marksman: { into: ['Tank'], weak: ['Assassin', 'Warrior'] },
    Support: { into: ['Assassin'], weak: ['Mage', 'Marksman'] },
  };

  const fb = roleFallback[hero.role];
  if (fb && strongInto.length < 2) {
    const peers = heroes
      .filter((h) => fb.weak.includes(h.role) && h.slug !== hero.slug)
      .sort((a, b) => (b.winRate ?? 0) - (a.winRate ?? 0));
    for (const p of peers) {
      if (strongInto.length >= 3) break;
      if (!strongInto.some((n) => n.toLowerCase() === p.name.toLowerCase())) {
        strongInto.push(p.name);
      }
    }
  }
  if (fb && weakInto.length < 2) {
    const threats = heroes
      .filter((h) => fb.into.includes(h.role) && h.slug !== hero.slug)
      .sort((a, b) => (b.pickRate ?? 0) - (a.pickRate ?? 0));
    for (const p of threats) {
      if (weakInto.length >= 3) break;
      if (!weakInto.some((n) => n.toLowerCase() === p.name.toLowerCase())) {
        weakInto.push(p.name);
      }
    }
  }

  return {
    strongInto: uniqNames(strongInto).slice(0, 3),
    weakInto: uniqNames(weakInto).slice(0, 3),
  };
}

function topPeers(hero, n = 2) {
  return heroes
    .filter((h) => h.role === hero.role && h.slug !== hero.slug)
    .sort((a, b) => (b.pickRate ?? 0) - (a.pickRate ?? 0))
    .slice(0, n);
}

function buildItems(hero) {
  return (hero.build || [])
    .map((b) => b.name)
    .filter((n) => n && n !== 'Data unavailable');
}

function passiveHook(hero) {
  const passive = (hero.skills || []).find((s) => s.slot === 'passive');
  if (!passive?.description) {
    return `${hero.name} — ${hero.role} (${hero.lane || 'flex'}) on Honor of Kings Global.`;
  }
  const first = passive.description.split(/[.!?]/)[0]?.trim();
  if (first && first.length > 20 && first.length < 160) {
    return `${hero.name}: ${first}.`;
  }
  return `${hero.name} — built around ${passive.name} (${hero.role}).`;
}

function defaultSkillOrder(hero) {
  const s1 = hero.skills?.find((x) => x.slot === 'skill1')?.name || 'Skill 1';
  const s2 = hero.skills?.find((x) => x.slot === 'skill2')?.name || 'Skill 2';
  const ult = hero.skills?.find((x) => x.slot === 'ultimate')?.name || 'Ultimate';
  if (hero.role === 'Assassin' || hero.lane === 'Jungling') {
    return {
      priority: `Skill 2 → Skill 1 → ${ult} (max Skill 2 first)`,
      reason: `${s2} provides mobility or stick—max first. ${s1} second for damage. ${ult} on every level.`,
    };
  }
  if (hero.role === 'Marksman') {
    return {
      priority: `Skill 1 → Skill 2 → ${ult} (max Skill 1 first)`,
      reason: `${s1} is your lane trade tool. ${s2} second. ${ult} whenever available.`,
    };
  }
  return {
    priority: `Skill 2 → Skill 1 → ${ult} (max Skill 2 first)`,
    reason: `Max primary utility/damage skill first, then ${s1}, and ${ult} on cooldown.`,
  };
}

function defaultCombos(hero) {
  const names = (hero.skills || [])
    .filter((x) => x.slot !== 'passive')
    .map((x) => x.name)
    .filter(Boolean);
  const steps =
    names.length >= 2
      ? `${names.join(' → ')} → weave basic attacks`
      : 'Safest skill → ultimate when escape is down';
  const combos = [
    {
      id: 'standard',
      name: 'Standard trade',
      steps,
      when: `${hero.lane || hero.role} skirmish or objective fight`,
    },
  ];
  if (hero.role === 'Assassin' || hero.lane === 'Jungling') {
    combos.push({
      id: 'all-in',
      name: 'All-in',
      steps: `${names[names.length - 1] || 'Ultimate'} after full rotation when Flash is down`,
      when: 'Gank or backline dive with team CC',
    });
  }
  return combos;
}

function defaultItemNotes(hero) {
  return (hero.build || [])
    .filter((b) => b.name && b.name !== 'Data unavailable')
    .map((b) => ({
      slot: b.slot,
      why:
        b.description && b.description !== 'Data unavailable'
          ? b.description
          : `Slot ${b.slot} in the recommended ${hero.lane || hero.role} path.`,
    }));
}

function defaultArcanaRows(hero) {
  const arcana = (hero.arcana || []).filter(Boolean);
  const spells = (hero.spells || []).filter(Boolean);
  const rows = arcana.map((rune, i) => ({
    slot: i === 0 ? 'Primary' : `Rune ${i + 1}`,
    rune,
    effect: `Recommended for ${hero.role} ${hero.lane || ''}`.trim(),
  }));
  if (spells.length) {
    rows.push({
      slot: 'Spell',
      rune: spells.join(' / '),
      effect: 'Adjust Purify/Execute based on enemy dive.',
    });
  }
  return rows;
}

function skillCombo(hero) {
  const combo = defaultCombos(hero)[0];
  return `Standard trade: ${combo.steps}. Weave basic attacks between skill casts for passive value.`;
}

function laningTip(hero) {
  const lane = hero.lane || hero.role;
  const map = {
    Jungling:
      'Clear to level four, then gank the lane with the least escape. Secure Tyrant when your bot or mid has crash wave.',
    'Mid Lane':
      'Control first wave without taking free poke. Roam after pushing wave 2–4 to side lanes with your jungler.',
    'Farm Lane':
      'Last-hit safely until first core item. Ping jungler for river vision; never face-check brush without minion cover.',
    'Clash Lane':
      'Trade on your power spike levels (2/4). Call jungler for dive only when enemy flash is down.',
    Roaming:
      'Help marksman crash wave, then rotate mid for picks. Return before Tyrant if your carry has no escape.',
  };
  return (
    map[lane] ||
    `Play ${hero.name} in the ${lane} role: farm to first core, then fight on your ultimate timer.`
  );
}

function teamfightTip(hero) {
  const map = {
    Tank: 'Engage on enemy carry when your team has follow-up. Body-block skillshots for your marksman.',
    Warrior: 'Flank or dive backline after tanks commit. Do not start fights without vision on enemy jungler.',
    Assassin: 'Wait for CC from your team, then dive carry with full combo. Exit with reset or flash if focus fired.',
    Mage: 'Poke from max range before objective. Save hard CC for enemy dive or your carry peel window.',
    Marksman: 'Position behind frontline; attack closest safe target. Join fight only after enemy dive cooldowns are used.',
    Support: 'Peel carry first, then look for pick on out-of-position enemies. Ward Tyrant 30s before spawn.',
  };
  return map[hero.role] || 'Stay with your team, play around objectives, and commit when you have numbers.';
}

function highRankNote(hero) {
  const wr = hero.winRate;
  const pick = hero.pickRate ?? 0;
  const ban = hero.banRate ?? 0;
  const parts = [];

  if (hero.tier === 'S+' || hero.tier === 'S') {
    parts.push(
      `${hero.name} is a Tier ${hero.tier} staple in high-elo (Diamond+) on the international server — worth mastering for climb.`
    );
  } else if (hero.tier === 'A') {
    parts.push(
      `${hero.name} is a viable Tier A pick in high rank with ${fmtRate(wr)} win rate — strong in one-trick hands or as a counter-pick.`
    );
  } else {
    parts.push(
      `${hero.name} sits at Tier ${hero.tier} globally (${fmtRate(wr)} WR). In high rank, pick only into favorable matchups or when you have a dedicated pocket pick.`
    );
  }

  if (ban >= 0.5) {
    parts.push(
      `Ban rate ${fmtRate(ban)} — expect ${hero.name} to be removed in tryhard lobbies; have a backup in the same role.`
    );
  } else if (pick >= 0.8) {
    parts.push(
      `Pick rate ${fmtRate(pick)} — frequently seen in ranked; learn the matchup even if you do not main ${hero.name}.`
    );
  } else if (pick < 0.2) {
    parts.push(
      `Low pick rate ${fmtRate(pick)} — niche in high rank; surprise value if you perfect the kit.`
    );
  }

  if (wr != null && wr >= 52) {
    parts.push('Camp data shows above-average win rate — prioritize when not hard-countered in draft.');
  } else if (wr != null && wr < 49) {
    parts.push('Below 49% global WR — high-rank players often avoid unless compensating for team comp.');
  }

  return parts.join(' ');
}

function comparisons(hero, peers) {
  const lines = [];
  for (const p of peers) {
    const wrDiff =
      hero.winRate != null && p.winRate != null
        ? hero.winRate - p.winRate
        : null;
    const wrNote =
      wrDiff != null
        ? wrDiff > 0
          ? `${hero.name} has +${wrDiff.toFixed(1)}% WR vs ${p.name} in Camp data.`
          : `${p.name} wins ${Math.abs(wrDiff).toFixed(1)}% more often globally.`
        : '';
    lines.push(
      `${hero.name} vs ${p.name} (${p.role}, Tier ${p.tier}): ${p.name} is ${fmtRate(p.pickRate)} pick / ${fmtRate(p.winRate)} WR. ${wrNote} Choose ${hero.name} when you need ${hero.lane || hero.role} identity; choose ${p.name} for ${p.lane || 'flex'} comfort.`
    );
  }
  return lines;
}

function buildFaqs(hero, buildNames, matchups, peers) {
  const arcana = (hero.arcana || []).filter(Boolean).join(', ') || 'see build section';
  const spells = (hero.spells || []).join(' & ') || 'Flash';
  const into = matchups.strongInto.length
    ? matchups.strongInto.join(', ')
    : 'flex picks with CC';
  const weak = matchups.weakInto.length
    ? matchups.weakInto.join(', ')
    : 'assassins and dive comps';

  const peer = peers[0];

  return [
    {
      id: 'faq-good-season',
      question: `Is ${hero.name} good in the current meta?`,
      answer: `${hero.name} is Tier ${hero.tier} ${hero.role} with ${fmtRate(hero.winRate)} win rate, ${fmtRate(hero.pickRate)} pick rate, and ${fmtRate(hero.banRate)} ban rate on Honor of Kings Global (Camp HOK, ${SYNC_DATE}). ${hero.tier === 'S+' || hero.tier === 'S' ? 'Strong meta pick for ranked.' : hero.tier === 'A' ? 'Solid situational pick.' : 'Niche — draft carefully.'}`,
    },
    {
      id: 'faq-best-build',
      question: `What is the best ${hero.name} build?`,
      answer: `Core item path: ${buildNames.slice(0, 6).join(', ') || 'see Build section'}. Run ${arcana} arcana with ${spells}. Switch to alternate build presets on this page for jungle, clash, or late-game setups.`,
    },
    {
      id: 'faq-counter',
      question: `How to counter ${hero.name}?`,
      answer: `Pick ${weak} into ${hero.name}. Deny ${hero.lane || hero.role} resources early and force fights before ${hero.name} completes core items. ${hero.name} struggles when the enemy can ${hero.role === 'Marksman' ? 'dive and burst' : hero.role === 'Assassin' ? 'peel and group' : 'out-range or out-sustain'} them.`,
    },
    {
      id: 'faq-strong-into',
      question: `Who does ${hero.name} counter?`,
      answer: `${hero.name} is strong into ${into} according to HoKStats matchup data and role matchups on the global server. Draft ${hero.name} when the enemy relies on these heroes in the ${hero.lane || 'same'} lane.`,
    },
    {
      id: 'faq-high-rank',
      question: `Is ${hero.name} good in high rank / Diamond+?`,
      answer: highRankNote(hero),
    },
    {
      id: 'faq-lane',
      question: `What lane should ${hero.name} play?`,
      answer: `${hero.name} is tagged ${hero.lane || hero.role} in Camp export (${hero.roles || hero.role}). ${laningTip(hero)}`,
    },
    {
      id: 'faq-arcana',
      question: `Best arcana and spells for ${hero.name}?`,
      answer: `Recommended: ${arcana} arcana. Battle spell: ${spells}. Adjust Purify/Execute based on enemy dive and jungle need.`,
    },
    ...(peer
      ? [
          {
            id: 'faq-vs-peer',
            question: `${hero.name} or ${peer.name} — which is better?`,
            answer: comparisons(hero, [peer])[0],
          },
        ]
      : []),
    {
      id: 'faq-ban',
      question: `Should I ban ${hero.name}?`,
      answer:
        (hero.banRate ?? 0) >= 0.3
          ? `Yes in tryhard queues — ${fmtRate(hero.banRate)} ban rate. Deny if enemy first-picks ${hero.role}.`
          : (hero.pickRate ?? 0) >= 1
            ? `Optional ban when enemy spams ${hero.role}; ${fmtRate(hero.pickRate)} pick rate but only ${fmtRate(hero.banRate)} ban rate.`
            : `Low priority ban (${fmtRate(hero.banRate)}). Focus bans on higher-tier ${hero.role} picks unless targeting a one-trick.`,
    },
  ];
}

function enrichHero(hero) {
  const matchups = resolveMatchups(hero);
  const buildNames = buildItems(hero);
  const peers = topPeers(hero, 2);
  const arcana = (hero.arcana || []).filter(Boolean).join(', ') || 'standard page setup';
  const spells = (hero.spells || []).join(' & ') || 'Flash';

  hero.counters = matchups.strongInto.length
    ? matchups.strongInto
    : ['Data unavailable'];
  hero.counteredBy = matchups.weakInto.length
    ? matchups.weakInto
    : ['Data unavailable'];

  const kept =
    hero.slug === 'musashi' && hero.guide?.hook
      ? {
          hook: hero.guide.hook,
          skillOrder: hero.guide.skillOrder,
          combos: hero.guide.combos,
          itemNotes: hero.guide.itemNotes,
          arcanaRows: hero.guide.arcanaRows,
          laning: hero.guide.laning,
          teamfight: hero.guide.teamfight,
          bestBuild: hero.guide.bestBuild,
          arcanaSpells: hero.guide.arcanaSpells,
          combo: hero.guide.combo,
        }
      : null;

  hero.guide = {
    overview: `${hero.name} is a ${hero.difficulty} ${hero.role} (${hero.lane || 'flex'}) on Honor of Kings Global. Camp HOK ranks them Tier ${hero.tier} with ${fmtRate(hero.winRate)} win rate and ${fmtRate(hero.pickRate)} pick rate as of ${SYNC_DATE}.`,
    hook: passiveHook(hero),
    bestBuild: `Rush ${buildNames.slice(0, 3).join(', ') || 'core items from the Build tab'}, then complete ${buildNames.slice(3, 6).join(', ') || 'situational defense or damage'}. Use preset tabs for jungle, clash, or CN-style paths when draft requires it.`,
    arcanaSpells: `Run ${arcana} for stats that match ${hero.name}'s ${hero.role} kit. Take ${spells} — swap to Purify against heavy CC or Smite when jungling.`,
    combo: skillCombo(hero),
    skillOrder: defaultSkillOrder(hero),
    combos: defaultCombos(hero),
    itemNotes: defaultItemNotes(hero),
    arcanaRows: defaultArcanaRows(hero),
    laning: laningTip(hero),
    teamfight: teamfightTip(hero),
    highRank: highRankNote(hero),
    comparisons: comparisons(hero, peers),
    matchups: {
      strongInto: matchups.strongInto,
      weakInto: matchups.weakInto,
      summary: `${hero.name} excels into ${matchups.strongInto.join(', ') || 'squishy targets'}. Avoid blind picking into ${matchups.weakInto.join(', ') || 'hard counters'} without team peel.`,
    },
    ...(kept || {}),
  };

  hero.tips = [
    hero.guide.overview,
    `Best build path: ${buildNames.join(' → ') || 'see Build section'}.`,
    hero.guide.arcanaSpells,
    hero.guide.combo,
    `Laning: ${hero.guide.laning}`,
    `Teamfight: ${hero.guide.teamfight}`,
    hero.guide.matchups.summary,
    hero.guide.highRank,
  ];

  hero.faqs = buildFaqs(hero, buildNames, matchups, peers);

  hero.metaAnalysis = [
    `${hero.name} — ${fmtRate(hero.winRate)} WR, ${fmtRate(hero.pickRate)} pick, ${fmtRate(hero.banRate)} ban (Camp HOK ${SYNC_DATE}).`,
    `Tier ${hero.tier} ${hero.role} · ${hero.lane || 'flex'} · difficulty ${hero.difficulty}.`,
    hero.guide.highRank,
    `Matchups: strong into ${matchups.strongInto.join(', ')}; weak into ${matchups.weakInto.join(', ')}.`,
    ...hero.guide.comparisons,
    `Draft tip: ${hero.tier === 'S+' || hero.tier === 'S' ? 'first-pick or ban priority in ranked' : 'counter-pick or comfort pick when lane matchup is favorable'}.`,
  ];

  hero.patchHistory = [
    {
      version: 'Live meta',
      change: `Camp HOK — WR ${fmtRate(hero.winRate)}, pick ${fmtRate(hero.pickRate)}, ban ${fmtRate(hero.banRate)}, tier ${hero.tier}.`,
    },
    {
      version: 'Matchups',
      change: `Strong into ${matchups.strongInto.join(', ')} · Weak into ${matchups.weakInto.join(', ')}.`,
    },
    {
      version: 'High rank',
      change: hero.guide.highRank,
    },
  ];
}

for (const hero of heroes) {
  enrichHero(hero);
}

fs.writeFileSync(heroesPath, JSON.stringify(heroes, null, 2) + '\n');
console.log(`Enriched guides for ${heroes.length} heroes → ${heroesPath}`);
