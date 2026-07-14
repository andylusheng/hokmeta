import type { LearnArticle } from '@/lib/learn';
import type { Hero } from '@/types/hero';

type TopGuideConfig = {
  title: string;
  description: string;
  identity: string;
  build: string;
  lane: string;
  teamfight: string;
  counters: string;
};

function rate(value: number | null | undefined): string {
  return value == null ? 'no live rate' : `${value.toFixed(2)}%`;
}

function names(list: string[] | undefined): string {
  const clean = (list || []).filter((name) => name && name !== 'Data unavailable').slice(0, 4);
  return clean.length ? clean.join(', ') : 'not enough verified counter data yet';
}

function buildLine(hero: Hero): string {
  const items = hero.build
    .filter((item) => item.name && item.name !== 'Data unavailable')
    .slice(0, 6)
    .map((item) => item.name);
  return items.length ? items.join(' -> ') : 'Build data is still being verified.';
}

function arcanaLine(hero: Hero): string {
  const arcana = hero.arcana.filter(Boolean).slice(0, 6).join(', ') || 'standard role arcana';
  const spells = hero.spells.filter(Boolean).slice(0, 2).join(' / ') || 'Flash';
  return `**Arcana and spell:** ${arcana}. Run ${spells} unless draft pressure clearly asks for a defensive swap.`;
}

function snapshot(hero: Hero): string {
  return `**Current global snapshot:** Tier ${hero.tier}, ${rate(hero.winRate)} win rate, ${rate(hero.pickRate)} pick rate, ${rate(hero.banRate)} ban rate.`;
}

const TOP_GUIDES: Record<string, TopGuideConfig> = {
  aoyin: {
    title: "Ao'yin Best Build, Counters and Farm Lane Guide",
    description:
      "Ao'yin guide for Honor of Kings Global with best build, farm lane spacing, dragon-form damage windows, counters, and ranked draft advice.",
    identity:
      "Ao'yin is a farm lane carry who rewards patience. He has enough range and burst pressure to punish mistakes, but he still needs clean spacing before he commits to a trade. The best Ao'yin games are not constant fighting. They are controlled lanes where you farm safely, chip the enemy down, then use your big cooldowns when the enemy support or jungler has already shown.",
    build:
      "The current build should keep his damage curve online while leaving room for survival. Ao'yin wants enough attack speed and damage to punish frontliners, but he cannot afford to walk into hard engage without a defensive answer. If the enemy has multiple dive tools, treat one defensive slot as part of the core build rather than a luxury.",
    lane:
      "Play the first waves around spacing and cooldown tracking. Do not trade just because your damage is available; trade when the enemy support cannot immediately punish your position. If your support leaves lane, thin the wave from safety and avoid standing in the long lane without vision. Ao'yin scales well enough that preserving Flash and farm is often better than forcing a low-percentage kill.",
    teamfight:
      "Ao'yin should enter fights after the first engage has been absorbed. Hit the closest safe target, keep your escape path open, and do not chase into fog just because a carry is low. If the enemy tank is the only target you can hit, that is fine as long as your build has the penetration or sustained damage to make it matter.",
    counters:
      "Kaizer, Dun, and Arthur-style frontliners punish Ao'yin when they can lock him in place before he sets his damage window. Draft him with peel or a support that can stop the first dive. Avoid blind-picking him into comps that can start from multiple angles unless your team has strong vision control.",
  },
  'hou-yi': {
    title: 'Hou Yi Best Build, Counters and Ranked Guide',
    description:
      'A practical Hou Yi guide for Honor of Kings Global: best build, farm lane plan, teamfight positioning, counters, and when to draft him.',
    identity:
      'Hou Yi is popular because he is simple to understand but punishing to pilot badly. His damage comes from uninterrupted basic attacks, not flashy outplays. If you farm cleanly, keep Flash for the first dive, and enter fights after your frontline shows, Hou Yi melts the closest target faster than most farm lane picks. If you walk into fog first, he feels useless.',
    build:
      "The current build leans into attack speed, sustained damage, and a late defensive reset. Penetration matters because Hou Yi often has to hit tanks before he can reach the backline. Bloodweeper gives breathing room in extended fights, while Sage's Sanctuary and Destiny exist because one death at 15 minutes can decide the game. Do not greed for six damage items. Hou Yi already has damage; he needs time alive.",
    lane:
      'Play the first waves like a gold race. Last-hit, avoid unnecessary river fights, and only trade when your support is close enough to punish a dive. Arrow Volley lets you push without standing too far forward. If the enemy jungler is missing, give up a few minions rather than burning Flash for nothing. Once the first tower falls, rotate mid and farm the safest wave. Staying in side lane alone is how Hou Yi throws a good early game.',
    teamfight:
      'The rule is boring and it wins: hit the closest target. Hou Yi does not need to dive the enemy mage. He needs to stand behind the tank, stack his passive, and force the enemy frontline to retreat. Burning Sun Arrow is best used before the fight starts or as peel when an assassin commits. If you use it randomly for poke, you lose your best self-defense tool.',
    counters:
      'Draft Hou Yi when your team has a real frontline or a support that can stop the first engage. Avoid blind-picking him into heavy dive with no peel. Against displacement and hard engage supports, keep the wave closer to your side and force them to show before you walk up. Hou Yi is a good climb pick only when you respect how little mobility he has.',
  },
  'li-xin': {
    title: 'Li Xin Best Build, Counters and Clash Lane Guide',
    description:
      'Deep Li Xin guide for Honor of Kings Global with best build, lane control, split-push timing, teamfight choices, counters, and ranked draft advice.',
    identity:
      'Li Xin wins because he gives your team side-lane pressure without needing constant babysitting. He can play the map, threaten towers, and still arrive for objectives if you manage waves early. The trap is treating him like a permanent 1v5 hero. Good Li Xin players make the enemy answer side waves; bad Li Xin players disappear from every Tyrant fight.',
    build:
      "Boots of Dexterity and Doomsday give the tempo to trade and clear waves. Dragon's Rage and Blood Rage make the mid-game side lane dangerous enough that one defender may not be enough. Ominous Premonition and Sage's Sanctuary keep you from exploding when the enemy finally collapses. The build works because Li Xin is not only looking for kills; he is forcing responses.",
    lane:
      'Your lane goal is wave control first, solo kill second. Use Chaos Wave to soften the wave and punish short trades, then save Lightning Dash for either the committed trade or the exit. When Teleport is available, push the wave before watching the map. A random Teleport while your wave is dying under tower is not a play; it is free gold for the enemy clash laner.',
    teamfight:
      'Li Xin has to decide before the fight starts: flank, peel, or split. If your marksman is fed, hovering near them and cutting off divers is often better than chasing the enemy backline. If your team lacks engage, look for a flank after the enemy uses their first control spell. If side wave is stacked and the objective is not spawning, pressure tower and force someone to answer you.',
    counters:
      'Cai Yan, Da Qiao, and Guiguzi punish sloppy engages because they either reset the fight or start it before you are ready. Into these drafts, do not be the first body seen in river. Clear side wave, enter from an angle, and make them spend control on someone else before you commit.',
  },
  liang: {
    title: 'Liang Best Build, Counters and Mid Lane Control Guide',
    description:
      'Liang guide for Honor of Kings Global with best build, suppression timing, mid lane control, counter picks, and ranked draft advice.',
    identity:
      'Liang is valuable because he removes options. His suppression and control make mobile assassins and greedy carries play slower than they want to. He is not picked to top the damage chart every game. He is picked to make one key enemy unable to play the fight. If your team understands that, Liang turns chaotic ranked games into simple target calls.',
    build:
      'Liang wants enough magic power and penetration to punish caught targets, but his build should also respect how close he has to stand when committing control. Utility and safety matter more than chasing a perfect burst number. A dead Liang cannot suppress anyone, and a Liang who saves control too long gives the enemy carry a free fight.',
    lane:
      'Clear mid safely and move with your roamer or jungler. Liang is strongest when he arrives second and turns an existing skirmish into a guaranteed pick. Do not waste your control on a tank walking through mid wave. Hold it for the assassin, marksman, or mage who actually decides the fight.',
    teamfight:
      'Before the fight, identify the target. If the enemy has one fed assassin, your job may be defensive suppression. If your team has engage, your job may be locking the enemy carry after the first knock-up. Liang teamfights are about discipline: use the control on the winning target, not the first target.',
    counters:
      'Li Xin, Mayene, and Mulan can punish Liang if they flank or force him to use control defensively. Draft Liang when your team can follow up on one locked target. Avoid using him as your only damage source into tank-heavy comps unless your side lanes already cover sustained DPS.',
  },
  butterfly: {
    title: 'Butterfly Best Build, Counters and Jungle Reset Guide',
    description:
      'Butterfly guide for Honor of Kings Global with best build, jungle pathing, reset timing, backline cleanup, counters, and ranked tips.',
    identity:
      'Butterfly is a reset jungler. She does not need a long fight to look good; she needs one target to fall, then her cooldown reset turns the fight into a second kill. The mistake is jumping in first just because ultimate is available. A good Butterfly player waits for health bars to drop, enters from fog, and uses the first takedown to snowball the fight instead of forcing a 1v5 highlight.',
    build:
      'Her build should support fast jungle tempo, burst damage, and enough survivability to live through the first answer. Damage items help her finish low targets, but one defensive choice is often better than a greedy sixth damage item when the enemy has point-and-click control. If you are ahead, keep clearing and invading. If you are even, build for the fight you can actually survive.',
    lane:
      'Clear efficiently and look for lanes where enemies have already used mobility. Butterfly ganks are best after your laner has forced a trade or when the enemy wave is pushed too far. Do not show on every river wave. If the enemy knows where you are before level four, your reset pressure drops sharply. Farm, track the enemy jungler, then arrive when the target is already committed.',
    teamfight:
      'In teamfights, Butterfly is usually a second-entry hero. Let your frontline or mage create the first low-health target, then commit. If you spend ultimate on a full-health tank, the fight becomes slow and you lose the reason you picked her. After the first reset, decide quickly: chase the next carry if your team can follow, or leave with the reset value already won.',
    counters:
      'Hard control, peel supports, and tanky drafts punish Butterfly because they deny the first reset. She is stronger into fragile backlines and messy skirmishes where enemies split damage across several targets. Avoid blind picking her when the enemy comp can lock her down immediately after entry.',
  },
  annette: {
    title: 'Annette Best Build, Counters and Roaming Support Guide',
    description:
      'Annette guide for Honor of Kings Global with best build, roaming pathing, Hurricane Wall timing, peel decisions, counters, and ranked support tips.',
    identity:
      'Annette is a protective roaming support with strong disengage and fight control. She is not just a backline passenger. Her value comes from making the enemy dive awkward: slowing the entry, shielding the carry, and using Hurricane Wall to split a fight that the enemy thought was already started. If you waste her ultimate early, she becomes much easier to run over.',
    build:
      'Annette wants support utility, cooldown value, and enough defensive stats to stand near the carry without dying instantly. The build should answer the enemy engage pattern: physical defense against marksman and fighter dive, magic defense against burst mages, and utility when your team needs cleaner objective fights. Damage is secondary; keeping the correct teammate alive is the win condition.',
    lane:
      'Start by protecting your farm lane unless your mid or jungler has a clear invade plan. Use Gust Force to control space and help your carry trade without walking forward. When you roam, leave after the wave is safe, not while your marksman is trapped under pressure. Annette loses value when she is late to the fight she is supposed to protect.',
    teamfight:
      'Hurricane Wall should usually answer a dive or cut off a follow-up path. Do not press it just because enemies are near you. Wait until the assassin or fighter commits, then push them away from the carry or isolate the target your team can kill. Her best fights look calm because the enemy engage never fully connects.',
    counters:
      'Long-range poke and patient teams can make Annette spend tools without committing. Hard engage also punishes her if Hurricane Wall is down. Draft her when your carry needs peel or when the enemy relies on melee entry. Avoid picking her as the only frontline if your team has no one willing to start fights.',
  },
  'luban-no-7': {
    title: 'Luban No.7 Best Build, Counters and Farm Lane Guide',
    description:
      'Practical Luban No.7 guide covering best build, passive damage windows, farm lane survival, teamfight positioning, and counterplay.',
    identity:
      'Luban No.7 is a short, loud damage machine. His passive scattershot is why he can delete frontlines, but it also locks you into predictable moments where enemies know you want to stand still and fire. The difference between a good Luban and a feed Luban is not mechanics. It is whether you set up passive shots from safe spacing instead of walking forward for one extra auto.',
    build:
      'Mortal Punisher and Eternity Blade push his crit damage online early. Daybreaker-style penetration is important because Luban spends most late fights hitting tanks. The defensive pieces in the current build are not filler. Ominous Premonition and Longnight Guardian give you a chance to survive the first dive, and that is usually all Luban needs to win the fight.',
    lane:
      'Do not coin-flip level 1 trades. Stack passive safely, use Blowfish Grenade to slow anyone walking into your range, and keep Shark Cannon for disengage unless the kill is guaranteed. Luban has strong damage but poor escape. If your support roams, thin the wave from max range and let the enemy farm lane push into you. Dying once before your first two items delays the whole reason you picked him.',
    teamfight:
      'Luban should fight from behind terrain or behind a tank. Air Support is useful for vision and zoning before the fight, not only damage. Shark Cannon is your emergency button against divers, so do not waste it on poke. Once a tank commits for you, kite backward while firing scattershots through the frontline. You are allowed to hit the tank. In fact, that is usually the correct target.',
    counters:
      'Lian Po and other hard engage frontliners punish Luban if he burns Shark Cannon too early. Draft him with peel, not with four dive heroes who leave him alone. When the enemy has multiple assassins, consider earlier defense and play near mid tower instead of farming long side lanes.',
  },
  angela: {
    title: 'Angela Best Build, Counters and Mid Lane Burst Guide',
    description:
      'Angela guide for Honor of Kings Global: best build, skill combo timing, mid lane roam plan, counters, and ranked teamfight tips.',
    identity:
      'Angela is not just a beginner burst mage. In ranked, she wins by controlling narrow spaces and forcing enemies to respect Chaos Cinder. If the stun lands, the fight can end before it starts. If it misses, you need the discipline to back off instead of channeling ultimate into a losing position.',
    build:
      "Void Staff, Savant's Wrath, and Sage's Tome make the burst real against both squishy targets and bruisers with early resistance. Splendor and Sage's Sanctuary are there because Angela often becomes the obvious dive target after level 4. Buy damage first, but do not ignore survival. One well-timed defensive active lets you cast the second rotation that wins the fight.",
    lane:
      'Clear mid quickly, then move with purpose. Angela roaming through river alone is asking to get picked, so path through your own jungle and arrive after the side lane has already started trading. In lane, hold Chaos Cinder until the enemy commits to last-hit or uses mobility. Throwing it on cooldown makes your pressure disappear.',
    teamfight:
      'Angela wants choke points: river ramps, jungle entrances, tower sieges. Open with Chaos Cinder when someone is forced to walk through a narrow path, then layer Scorching Barrage and Blazing Brilliance. The ultimate shield and control immunity are powerful, but they do not make you a tank. If the beam angle is bad, cancel the idea and reposition.',
    counters:
      'Han Xin and Gao Changgong punish Angela before she can set her feet. Into assassins, keep Flash for the first real engage and stand near terrain that breaks their path. Angela is excellent when your team has point-and-click control or a tank that starts fights for her. She is weaker in scattered skirmishes where every enemy enters from a different angle.',
  },
  devara: {
    title: 'Devara Best Build, Counters and Clash Lane Guide',
    description:
      'Devara ranked guide for Honor of Kings Global with best build, energy management, clash lane trading, teamfight timing, and draft notes.',
    identity:
      'Devara is popular because he feels explosive once the energy loop starts. The important part is not mashing skills. It is entering trades when you can actually reach the enhanced state and leave before the enemy turns the cooldown window against you. His current win rate is low for an S+ pick, which usually means players are forcing fights before the kit is ready.',
    build:
      "The current build mixes fighter damage with survival: Dragon's Rage, Sunchaser, and Daybreaker-style damage for threat, then Sage's Sanctuary, Destiny, and resistance boots so you can finish a second rotation. Treat the build as a bruiser setup, not a glass cannon mage setup. If you die during the first engage, the damage items never matter.",
    lane:
      'Play around energy. Short trades are fine only if they build toward the next enhanced window. Thunderblaze gives shielded entry, Divine Judgment punishes enemies who stand their ground, and Millennium Echo is your commit button. Do not spend everything into a full-health enemy under tower. Clear the wave, threaten the trade, and use Frenzy when the enemy has already used their escape.',
    teamfight:
      'Devara should enter after the first crowd control spell is gone. If you jump in before the enemy support reacts, you get locked down and deleted. Look for side angles, target whoever your team can actually follow up on, and use the movement speed from ultimate to chase only when the fight is already winning. When behind, peel for your carry instead of forcing hero plays.',
    counters:
      'The verified counter pool is still thin, so use role logic: heavy displacement, chain control, and anti-dive tanks are the main problems. Draft Devara when your team already has reliable engage or mid control. Avoid using him as the only frontline into five heroes with slows and stuns.',
  },
  daji: {
    title: 'Daji Best Build, Counters and One-Shot Combo Guide',
    description:
      'Daji guide for Honor of Kings Global with best build, one-shot combo timing, mid lane pick setup, counters, and ranked draft advice.',
    identity:
      'Daji is a pick mage, not a poke mage. Her job is to make one enemy disappear, then let the numbers advantage win the objective. Captivate lowers magical defense, Strike a Pose locks the target, and Heartbreaker finishes the rotation. If you spend your combo on the enemy tank, you did the enemy team a favor.',
    build:
      'Void Staff and Insatiable Tome keep her burst relevant even when enemies start buying resistance. Venomous Staff adds anti-heal value into sustain comps, while late defensive options protect the shutdown gold you usually carry. Daji does not need to be on screen all the time. She needs enough damage to punish the one person who walks into her range.',
    lane:
      'Clear safely, then disappear. Daji creates pressure by being missing. Sit in side brush after wave clear, follow your roamer, and punish enemies who rotate without vision. Do not waste Strike a Pose just to poke. Without that stun, Daji has no threat and no self-defense.',
    teamfight:
      'Wait. That is the whole teamfight plan. Let your frontline show, let the enemy use their first mobility spell, then Flash or step into range for Strike a Pose. After the combo, leave and wait for cooldowns. Daji players throw by walking forward after their burst is gone. You are not a sustained DPS mage.',
    counters:
      'Gao Changgong and Mulan are dangerous because they can reach Daji before she chooses the fight. Against them, play closer to your tower and hold Flash defensively. Daji is strongest when your team controls vision and forces enemies through predictable paths. Blind face-checking river removes her biggest advantage.',
  },
  'marco-polo': {
    title: 'Marco Polo Best Build, Counters and True Damage Guide',
    description:
      'Marco Polo guide for Honor of Kings Global: best build, attack speed breakpoints, farm lane trading, true damage fights, and counters.',
    identity:
      'Marco Polo is picked for mobility and true damage pressure, but he is not a free escape button. Chain Reaction rewards repeated hits, which means spacing and bullet accuracy matter more than raw item gold. A good Marco wins long fights by stacking passive and choosing the right dash angle. A bad Marco dashes forward and gets stunned before Fevered Barrage finishes.',
    build:
      'Doomsday and Shadow Ripper support the attack-speed rhythm his Skill 1 and ultimate care about. Frigid Charge and Succubus Cloak show why Marco is different from most marksmen: he can afford defensive tempo because true damage still threatens tanks. Haste - Sunpool rounds out sustained DPS. The build is about staying in range long enough to stack passive, not chasing one-shot numbers.',
    lane:
      'Use Resplendent Revolver to farm and tag the enemy, but keep Roaming Gun for real danger. If you dash just to trade, the enemy support can immediately punish you. Stun gives kill pressure when the enemy is already stacked or trapped near terrain. Before two items, play like a mobile farmer, not an assassin.',
    teamfight:
      'Marco fights front-to-back until a clean ultimate angle appears. Fevered Barrage is not an opener into five ready enemies. Use Skill 1 to stack, watch for hard CC, then ult when the enemy has already spent the spell that stops you. If the fight is messy, kite with Skill 2 and keep applying true damage to whoever is closest.',
    counters:
      'Lian Po, Liu Bang, and Zhang Fei are annoying because they interrupt or absorb your commit window. Do not ult into saved control. Pick Marco when the enemy has multiple frontliners and your team can occupy them long enough for passive stacks to matter.',
  },
  garo: {
    title: 'Garo Best Build, Counters and Farm Lane Guide',
    description:
      'Garo guide for Honor of Kings Global with best build, farm lane spacing, shield-breaking pressure, late-game teamfight rules, and counter picks.',
    identity:
      'Garo is a range and discipline marksman. She does not need to win every early trade; she needs to reach the stage where her extended range controls the fight before enemies can touch her. The best Garo games look quiet for eight minutes, then suddenly every objective becomes impossible for the enemy frontline to enter. The worst Garo games happen when players stand too far forward because the range feels safe.',
    build:
      'Her build should protect the late-game damage plan: attack speed, critical scaling, and penetration so she can punish tanks and shielded targets. Defensive or revive items are not wasted slots on Garo, because one extra second of free firing is often worth more than another raw damage component. If the enemy has multiple divers, finish your damage core but do not delay survival forever.',
    lane:
      'Treat the lane as a spacing test. Farm from max range, punish short steps with enhanced autos, and avoid river trades unless your support has vision. Garo can chip enemies down, but she is not built to escape a clean engage. If your support roams, hold the wave near your tower and trade only after the enemy farm lane spends mobility or crowd control.',
    teamfight:
      'Garo should play front-to-back. Hit whoever is closest, keep moving between autos, and let your range force the enemy tank to choose between retreating or dying slowly. Do not chase assassins into fog. If the enemy dive is still available, stand behind terrain or your support and wait for the first engage to be absorbed before stepping forward.',
    counters:
      'Hard engage and flank pressure are the real threats. Garo is strong when your team has a stable frontline, reliable peel, and objective control. Avoid drafting her into comps that can start fights from two angles at once unless your support is dedicated to protecting farm lane.',
  },
  'li-bai': {
    title: 'Li Bai Best Build, Counters and Jungle Guide',
    description:
      'Li Bai guide for Honor of Kings Global with best build, jungle tempo, combo windows, objective timing, counterplay, and ranked draft advice.',
    identity:
      'Li Bai is a timing assassin. His value comes from entering after the enemy has already shown key control, spending a clean burst window, then leaving before the punish arrives. He feels unfair when he is ahead because he gets to choose the fight. He feels terrible from behind because every forced entry becomes a coin flip. Your first job is not montage kills; it is clean jungle tempo.',
    build:
      'The build should give Li Bai enough burst to threaten backline targets while keeping his cooldown rhythm playable. Damage matters, but so does not wasting gold on fights you cannot actually enter. If the enemy has layered crowd control, a defensive timing item or revive option can be the difference between finishing a carry and donating shutdown gold.',
    lane:
      'As a jungler, your lane phase is route planning. Clear efficiently, track which side lane has crowd control, and gank only when the wave makes sense. Li Bai does not want to walk into a full-health lane with no setup. Stack passive through camps or safe targets, then use the window to threaten a real kill or force a summoner spell before the next objective.',
    teamfight:
      'Do not be the first hero seen. Wait outside vision, count stuns, and enter when the enemy carry has already committed to hitting your frontline. If you spend your return tool badly, stop chasing. A good Li Bai fight is quick: appear, burst, reset the angle, and either re-enter or take the objective your pressure created.',
    counters:
      'Point-and-click control, grouped formations, and tanky supports make Li Bai work harder. Draft him when your lanes can create priority and your team has someone else to start fights. If your comp has no engage and no lane pressure, Li Bai is forced to do too much by himself.',
  },
  wukong: {
    title: 'Wukong Best Build, Counters and Jungle Guide',
    description:
      'Wukong guide for Honor of Kings Global covering best build, jungle pathing, burst target selection, teamfight entry, counters, and climb advice.',
    identity:
      'Wukong is a crit assassin who punishes bad spacing. He is not subtle, and that is fine. The strength of the pick is that one clean entry can remove the enemy marksman before the fight even starts. The weakness is that everyone knows what you want. Good Wukong players are patient enough to wait for vision and cooldowns instead of jumping at the first red health bar.',
    build:
      'Wukong wants a damage curve that makes his first real burst window matter. Crit and physical damage are the core, but late defensive insurance is still important because he often carries shutdown gold. If the enemy has armor stacking, penetration becomes mandatory. If the enemy has instant control, build and play as if you only get one clean attempt.',
    lane:
      'Your early jungle should be clean and predictable for yourself, not for the enemy. Path toward the lane that can actually follow your knock-up. Do not force a gank into a pushed lane with no control just because Wukong is supposed to snowball. Farm, take the guaranteed camp, and punish overextended enemies when they step past river without vision.',
    teamfight:
      'Wukong should enter from a side angle after the frontline fight starts. If you jump through the front door, tanks will absorb the burst and the enemy backline will kite you. Use brush, fog, and objective pressure to make the carry look at someone else first. After the kill attempt, either reset behind your team or finish the fight fast; extended front-to-back fights are not where Wukong shines.',
    counters:
      'Tanky peel, early invades, and supports with saved control are the main problems. Draft Wukong when your lanes can survive early and your team can force enemies into predictable objective setups. Avoid him when every enemy carry has self-peel and your lanes cannot create map pressure.',
  },
  dolia: {
    title: 'Dolia Best Build, Counters and Support Guide',
    description:
      'Dolia guide for Honor of Kings Global with best build, roaming priorities, ultimate reset timing, lane protection, counters, and ranked draft notes.',
    identity:
      'Dolia is a support who makes good teammates better. Her reset value is strongest when your carry, mage, or jungler has a cooldown worth repeating. That means the pick is not only about your own mechanics. It is about reading which ally is the real win condition and staying close enough to turn their second spell rotation into the fight-winning moment.',
    build:
      'Build Dolia for uptime, survivability, and team utility. She needs to be alive when the decisive cooldown comes back, so greedy damage choices rarely make sense. Defensive support items and cooldown-friendly choices are valuable because Dolia often plays near the center of the fight rather than safely behind it.',
    lane:
      'In the first minutes, protect farm lane when the enemy has dive pressure and roam only when the wave is safe. Dolia can help mid and jungle tempo, but abandoning a vulnerable marksman turns her best late-game partner into a liability. When roaming, move with vision and arrive before the fight starts; showing up after cooldowns are already spent wastes the reason you picked her.',
    teamfight:
      'Before every fight, decide who deserves the reset. Do not press ultimate automatically on the first ally who loses health. A second mage control spell, second assassin entry, or second marksman survival tool can change the entire fight. Dolia should stay close enough to support that target, but not so close that one engage hits both of you.',
    counters:
      'Burst engage and split fights reduce Dolia value because she needs time and grouping to amplify the right ally. Draft her with heroes who have high-impact cooldowns and avoid pairing her with comps where everyone dives in different directions. If the enemy has hard backline access, play more defensively and make the reset about survival first.',
  },
  augran: {
    title: 'Augran Best Build, Counters and Jungle Guide',
    description:
      'Augran guide for Honor of Kings Global with best build, jungle tempo, soul-chain fights, objective control, counters, and ranked execution tips.',
    identity:
      'Augran wins by turning skirmishes into extended, controlled fights. He has enough threat to pressure carries, but his best games come from choosing fights where the enemy cannot instantly disengage or burst him down. If you enter with no follow-up, he feels clunky. If your team is close and the fight stays in his range, he becomes extremely difficult to remove.',
    build:
      'Augran wants a balance of damage and durability. You need enough threat to punish carries, but you also need to survive while your chains and follow-up damage do the work. Against squishy drafts, lean into tempo and burst. Against tankier teams, value sustained damage and defensive items that let you stay attached to the fight.',
    lane:
      'As a jungler, route toward lanes that can lock enemies in place. Augran ganks are much better when the target has already used movement or when your laner can start the trade. Do not waste time forcing low-percentage dives. Clear efficiently, contest river when your lanes have priority, and use objective spawns to make enemies walk into your preferred fight range.',
    teamfight:
      'Augran should not drift alone into fog. Enter with your frontline or from a covered angle, connect onto a target your team can hit, and keep the fight moving toward your damage dealers. If the enemy carry is unreachable, punish the nearest fighter first and use the pressure to open the next target. Winning the first five seconds matters more than chasing a perfect backline highlight.',
    counters:
      'Heavy disengage, long-range poke, and chain crowd control can stop Augran before he gets full value. Draft him when your lanes have control and your comp wants to fight around objectives. Avoid forcing him into games where your team has no setup and every fight starts with the enemy kiting backward.',
  },
  'wang-zhaojun': {
    title: 'Wang Zhaojun Best Build, Counters and Control Mage Guide',
    description:
      'Wang Zhaojun guide for Honor of Kings Global with best build, freeze setup, mid lane macro, teamfight zoning, and counter picks.',
    identity:
      'Wang Zhaojun wins fights before damage numbers show up. Shattered Ice gives vision and slow, Frigid Prison threatens freeze, and Winter is Here controls the ground enemies want to stand on. She is not a burst race mage. She is a space-control mage, which means patience and map position matter more than rushing a flashy combo.',
    build:
      'The current build values utility and survival: Venomous Staff, defensive resistance pieces, Splendor, and revive options. That makes sense because Wang Zhaojun already brings control. Staying alive to cast a second freeze often beats squeezing in one more damage item. If the enemy has heavy healing, Venomous Staff is especially valuable.',
    lane:
      'Clear the wave with safe spacing, then use Skill 1 to check river and side brush before roaming. Frigid Prison has delay, so land it after a teammate slows, stuns, or forces the enemy into a narrow path. Throwing it at max range against a full-mobility target is mostly wishful thinking.',
    teamfight:
      'Your best fights happen around objectives. Cast ultimate across the choke point, not behind the enemy where nobody has to walk. Save freeze for divers or for enemies already slowed by your team. Wang Zhaojun should make the fight uncomfortable before it starts; if you are reacting after your marksman is already dead, you were too late.',
    counters:
      'Dharma, Li Xin, and Kaizer punish her if they reach melee range before she sets the zone. Draft her with a frontline and avoid isolated river walks. She is excellent into teams that must run through tight spaces, but weaker against long-range poke that never commits.',
  },
  milady: {
    title: 'Milady Best Build, Counters and Push Mage Guide',
    description:
      'Milady guide for Honor of Kings Global covering best build, robot wave control, tower pressure, mid lane rotations, counters, and ranked macro.',
    identity:
      'Milady is a macro mage. She wins by making waves and towers impossible to ignore. Mechanical Minions punish sloppy clears, and Chaos Field turns one target or structure into a pressure point. If you play her like a normal burst mage, you miss the reason she is annoying: she forces the enemy mid to answer the map instead of choosing the map.',
    build:
      "Mask of Agony, Savant's Wrath, Twilight Stream, Venomous Staff, Void Staff, and Sage's Tome form a damage-over-time and penetration curve that fits her minion pressure. She wants sustained spell value, not only a single combo. If the enemy has hard dive, you may need an earlier defensive swap because Milady without Flash is easy to punish.",
    lane:
      'Use minions to control wave tempo. Push when you know where the enemy jungler is; thin the wave when you do not. After shoving mid, hit tower plates, rotate with your roamer, or invade vision. Do not stand in lane admiring your robots. Milady gets value by turning wave priority into map pressure.',
    teamfight:
      'Milady is strongest when fights start around structures or objectives. Drop minions before the fight, mark the priority target with Chaos Field, and let the enhanced bots force movement. If assassins are missing, stay behind your frontline and use Air Superiority to zone rather than walking up for extra autos.',
    counters:
      'Allain, Fuzi, and Haya punish her lack of mobility. Against these heroes, keep waves closer to your side unless you have jungle information. Milady is a strong pick when your team wants early tower pressure and objective setup. She is weaker when your team has no frontline and every fight starts with someone diving your face.',
  },
  'lady-sun': {
    title: 'Lady Sun Best Build, Counters and Farm Lane Burst Guide',
    description:
      'Lady Sun guide for Honor of Kings Global with best build, Rolling Raid trades, farm lane positioning, burst windows, counters, and ranked tips.',
    identity:
      'Lady Sun is a burst marksman. She does not win by standing still and trading autos forever; she wins by choosing short windows where Rolling Raid gives range, damage, and a better angle. Her current win rate is low compared with her pick rate, which usually means players are rolling forward without a plan.',
    build:
      "Master Sword, Eternity Blade, and Daybreaker-style penetration are the damage core. Mortal Punisher keeps her threatening in extended fights, while Sage's Sanctuary and Destiny reduce the punishment for one bad step late. This build rewards clean hit-and-run patterns. If you cannot safely use the enhanced auto after Rolling Raid, wait.",
    lane:
      'Trade around Skill 1, not around ego. Roll sideways or backward for the enhanced shot when the enemy support can engage; roll forward only when their control is down or your support is already starting the fight. Frag Grenade matters because the physical defense reduction makes the next shots hurt. Use it before the burst, not after the enemy is already out of range.',
    teamfight:
      'Lady Sun wants angles, not front-line commitment. Stay near walls, use Rolling Raid to dodge the first engage, then fire the enhanced auto into whoever is safe to hit. Ultimate Shell is a finisher or long-range poke tool, but do not chase a low target through fog just because ultimate is up. Your biggest late-game job is staying alive for the second roll.',
    counters:
      'Kaizer, Dun, and Arthur punish her if she rolls into their threat range. Draft Lady Sun when your team can create small skirmishes or peel the first dive. Avoid using her as the only late-game insurance if your comp has no frontline, because she needs space to reset and reposition.',
  },
  kaizer: {
    title: 'Kaizer Best Build, Counters and Clash Lane Guide',
    description:
      'Kaizer guide for Honor of Kings Global with best build, clash lane trading, anti-carry entry timing, teamfight targets, and counters.',
    identity:
      'Kaizer is a clash lane bruiser who turns short windows into decisive kills. He is strongest when he can walk through the first layer of damage, reach a carry, and force the enemy team to spend cooldowns on him instead of your backline. The trap is treating him like a permanent frontliner. Kaizer can start fights, but he still needs timing, target selection, and enough durability to survive the first answer.',
    build:
      'The best Kaizer build should keep a bruiser balance: enough physical threat to punish carries, enough defense to survive entry, and enough cooldown value to keep trading after the first combo. If the enemy has multiple marksmen or fragile mages, damage and mobility matter. If the enemy has chain control, one defensive slot often wins more fights than a greedy damage item.',
    lane:
      'Play the lane around wave control and cooldown punishment. Do not spend mobility just to poke if the enemy jungler is missing. Kaizer can threaten all-ins, but he is much better when the enemy has already used their escape or control. Push before rotating, and only leave side lane when the objective timing or mid fight is actually worth the lost wave.',
    teamfight:
      'Kaizer should enter after the enemy frontline or support has shown the first control spell. If you can reach the marksman, commit with your team close enough to follow. If the backline is protected, hit the nearest winning target and force the enemy carries to step backward. A good Kaizer fight is not always a backline dive; sometimes it is zoning two carries while your team wins the front.',
    counters:
      'Kiting, displacement, and layered control punish Kaizer when he enters too early. Draft him when your team can follow his pressure or when the enemy carries lack reliable peel. Avoid forcing him as the only engage into teams that can slow, knock back, and reset every fight.',
  },
  dun: {
    title: 'Dun Best Build, Counters and Tank Guide',
    description:
      'Dun guide for Honor of Kings Global with best build, tank item choices, engage timing, peel decisions, counters, and ranked teamfight advice.',
    identity:
      'Dun is a tank who wins through timing and disruption, not damage charts. He is valuable because he can start fights, absorb pressure, and create enough chaos for carries to hit safely. The best Dun games feel simple: protect the wave, arrive first to objectives, force one clean engage, then peel if the enemy tries to counter-dive.',
    build:
      'Dun builds should react to the enemy damage profile. Physical-heavy teams ask for armor and anti-crit value. Magic-heavy teams ask for resistance and health. If the enemy has strong healing, anti-heal matters earlier. The goal is not to become unkillable in theory; it is to survive long enough for your carries to finish the fight you started.',
    lane:
      'In clash lane or flex tank situations, clear safely and avoid pointless extended trades against heroes who outscale side-lane duels. Dun should use wave priority to move first, not to chase kills under tower. When objective timers are close, push the wave, group early, and make the enemy walk through your vision and control.',
    teamfight:
      'Before engaging, decide whether your team needs start or peel. If your marksman is fed and the enemy assassin is missing, holding control defensively can be better than diving forward. If your team lacks engage, start from fog or a flank angle so the enemy carry cannot simply walk away. Dun wins fights by making the first five seconds easy for his team.',
    counters:
      'Sustained true damage, heavy kiting, and anti-tank marksmen reduce Dun value if he walks in alone. Draft him with carries who can punish his engage. Avoid using him as the only front line when the rest of the team cannot follow up before his control window ends.',
  },
  'mai-shiranui': {
    title: 'Mai Shiranui Best Build, Counters and Mid Lane Combo Guide',
    description:
      'Mai Shiranui guide for Honor of Kings Global with best build, mid lane combo timing, poke setup, flank angles, counters, and ranked advice.',
    identity:
      'Mai Shiranui is a mobile burst mage who wins by choosing angles. She is not meant to stand mid and trade skill shots forever. Her strength is threatening a carry from fog, poking before the fight, then using mobility to finish or escape. The hard part is discipline: every dash forward needs a reason, because one missed combo can put her inside the enemy team with no safe exit.',
    build:
      'Mai wants magic power, penetration, and enough safety to survive the moment after she commits. A pure damage build feels good when ahead, but against hard control you need to respect how close she gets to the target. Build to kill the priority target, then adapt if the enemy starts buying resistance or saving control only for you.',
    lane:
      'Clear mid without wasting every mobility tool, then look for side-lane angles with your jungler or support. Poke first, all-in second. Mai should not force a full combo into a full-health target unless your teammate can lock them down. When the enemy mid disappears, ping early and avoid face-checking river alone.',
    teamfight:
      'Mai teamfights are about flank timing. Poke with safe skills before the objective starts, then wait for the carry or mage to step away from peel. If the enemy support is holding control, do not dive through them. Use mobility to reposition, threaten the angle, and commit only when the target has already used escape or is trapped by your frontline.',
    counters:
      'Point-and-click control, tanky peel, and long-range poke can make Mai work harder. Draft her when your team has enough frontline or vision control to create flank paths. Avoid picking her into comps where every fight happens in open space and the enemy backline never has to move forward.',
  },
};

export function buildTopHeroGuide(hero: Hero): LearnArticle | null {
  const guide = TOP_GUIDES[hero.slug];
  if (!guide) return null;

  return {
    slug: `${hero.slug}-guide`,
    title: guide.title,
    description: guide.description,
    badge: 'POPULAR',
    category: 'Hero Guides',
    relatedHeroSlug: hero.slug,
    sections: [
      {
        heading: `${hero.name} ranked snapshot`,
        body: `${snapshot(hero)}\n\n${guide.identity}`,
      },
      {
        heading: `Best build for ${hero.name}`,
        body: `**Recommended build path:** ${buildLine(hero)}\n\n${guide.build}\n\n${arcanaLine(hero)}`,
      },
      {
        heading: `How to play ${hero.name} in lane`,
        body: guide.lane,
      },
      {
        heading: `${hero.name} teamfight plan`,
        body: guide.teamfight,
      },
      {
        heading: `${hero.name} counters and draft notes`,
        body: `**Good into:** ${names(hero.counters)}.\n\n**Watch out for:** ${names(hero.counteredBy)}.\n\n${guide.counters}`,
      },
    ],
  };
}
