const h = require('./data/heroes.json');
const incomplete = ['wang-zhaojun','lady-sun','xiao-qiao','dolia','luara','consort-yu','chicha','erin','arthur','kongming','cai-yan','mozi','garo','lu-bu','dyadia','liang','lan','li-xin','gao-changgong','luban-no-7','mi-yue','garuda','aoyin','huang-zhong','wukong','dun','daji','hou-yi','angela','liu-bei','yaria','musashi','augran','kaizer','zhang-fei','haya','milady','donghuang','arli'];

for (const slug of incomplete) {
  const hero = h.find(x => x.slug === slug);
  if (!hero) { console.log(slug + ' NOT FOUND'); continue; }
  const out = {
    slug: hero.slug,
    name: hero.name,
    nameZh: hero.nameZh,
    role: hero.role,
    lane: hero.lane,
    laneZh: hero.laneZh,
    tier: hero.tier,
    winRate: hero.winRate,
    pickRate: hero.pickRate,
    banRate: hero.banRate,
    counters: hero.counters,
    counteredBy: hero.counteredBy,
    spells: hero.spells,
    spellsZh: hero.spellsZh,
    build: hero.build ? hero.build.map(b => b.name).slice(0,4) : [],
    buildZh: hero.buildZh ? hero.buildZh.map(b => b.name).slice(0,4) : [],
    skills: hero.skills ? hero.skills.map(s => ({name:s.name, desc:s.description?.slice(0,120), cd:s.cooldown})) : [],
    skillsZh: hero.skillsZh ? hero.skillsZh.map(s => ({name:s.name, desc:s.description?.slice(0,120), cd:s.cooldown})) : [],
    tips: hero.tips ? hero.tips.slice(0, 3) : [],
    tipsZh: hero.tipsZh ? hero.tipsZh.slice(0, 3) : [],
    metaAnalysis: hero.metaAnalysis?.slice(0, 150),
    metaAnalysisZh: hero.metaAnalysisZh?.slice(0, 150),
    faqs: hero.faqs,
    faqsZh: hero.faqsZh,
  };
  console.log('=== ' + slug + ' ===');
  console.log(JSON.stringify(out, null, 2));
  console.log('');
}
