import type { Hero } from '@/types/hero';

export interface HeroAuthorityNotes {
  pick: string;
  avoid: string;
  powerSpikes: string[];
  buildDecision: string;
  matchupLogic: string;
  commonMistakes: string[];
}

const TOP_NOTES: Record<string, HeroAuthorityNotes> = {
  aoyin: {
    pick:
      "Pick Ao'yin when your team can protect farm lane long enough for him to reach a stable damage curve. He is strongest when fights start front-to-back and he can choose when to step forward.",
    avoid:
      "Avoid blind-picking Ao'yin into multiple hard divers or point-and-click lockdown unless your support is committed to peel. He has damage, but he still needs space before the first engage lands.",
    powerSpikes: [
      'First core damage item: lane trading becomes less defensive and tower pressure starts to matter.',
      'Two to three items: objective fights become playable if he can hit from behind his frontline.',
      'Late defensive or revive option: protects the shutdown gold and lets him survive one committed dive.',
    ],
    buildDecision:
      "Ao'yin should not copy a greedy stationary marksman build every game. Keep the damage core, then decide whether the enemy draft asks for earlier defense, penetration, or safer boots.",
    matchupLogic:
      'Against tanks, value sustained damage and penetration. Against dive, value spacing, Flash discipline, and support peel. Against poke, keep the wave closer until the enemy mid or jungler shows.',
    commonMistakes: [
      'Trading forward while the enemy support still has engage ready.',
      'Farming long side lane alone after the first tower falls.',
      'Chasing a low target into fog instead of hitting the closest safe target.',
    ],
  },
  'hou-yi': {
    pick:
      'Pick Hou Yi when your team already has a front line or a support that can stop the first dive. He is strongest when fights are predictable and he can hit the closest target without moving first.',
    avoid:
      'Avoid blind-picking Hou Yi into double assassin, hard flank, or support engage drafts unless your team has reliable peel. His damage is high, but his first positioning mistake usually costs Flash or the fight.',
    powerSpikes: [
      'First core item: lane becomes easier to control and tower pressure starts to matter.',
      'Three-item point: front-to-back teamfights become playable if he is not forced to kite backward immediately.',
      'Late revive or defensive item: lets him survive one dive and keep firing through the second half of the fight.',
    ],
    buildDecision:
      'Do not greed for six pure damage items. Hou Yi already scales through attack uptime. The correct build is the one that lets him keep attacking after the enemy support or jungler commits.',
    matchupLogic:
      'Into tanks, value penetration and sustained damage. Into dive, value defensive timing and Flash discipline. Into poke lanes, let the wave come closer to your side instead of trading health for one extra last-hit.',
    commonMistakes: [
      'Using Burning Sun Arrow for random poke instead of saving it for engage or peel.',
      'Walking into river first after lane phase ends.',
      'Chasing the backline instead of killing the closest target safely.',
    ],
  },
  'li-xin': {
    pick:
      'Pick Li Xin when your team needs side-lane pressure and a clash laner who can force the enemy to answer waves before objectives spawn.',
    avoid:
      'Avoid Li Xin when your team already lacks grouped fight presence and the enemy can collapse on side lanes faster than your team can trade objectives.',
    powerSpikes: [
      'First wave-clear item: side pressure starts becoming reliable instead of risky.',
      'Mid-game damage-durability mix: he can threaten towers and survive the first collapse.',
      'Late Teleport or flank timing: lets him convert side pressure into a real objective fight.',
    ],
    buildDecision:
      'Li Xin should build for the job the draft needs. If you are the side-lane win condition, keep tower pressure and duel threat. If your team needs frontline, add survival before forcing grouped fights.',
    matchupLogic:
      'Use wave state as your weapon. Push before rotating, arrive before the objective starts, and do not abandon a stacked side wave just to hover mid with no cooldowns ready.',
    commonMistakes: [
      'Teleporting while a side wave dies under your own tower.',
      'Treating every lead as permission to 1v3.',
      'Splitting when the next Tyrant or Overlord fight is already starting.',
    ],
  },
  liang: {
    pick:
      'Pick Liang when the enemy draft relies on one mobile carry, assassin, or diver that must be locked down for your team to win the fight.',
    avoid:
      'Avoid Liang when your team has no follow-up damage or the enemy frontline can absorb every control spell while their carries hit safely.',
    powerSpikes: [
      'Level 4: suppression turns mid-jungle skirmishes into reliable picks.',
      'First magic power item: controlled targets start dying before they can reset the fight.',
      'Mid-game grouped objectives: his value rises when one locked target means a free tower or objective.',
    ],
    buildDecision:
      'Build enough damage to punish the locked target, but do not ignore safety. Liang often stands close enough to be punished after he commits control.',
    matchupLogic:
      'Before each fight, name the target. If the fed assassin is the problem, hold control defensively. If your tank starts the fight, lock the enemy carry after their first escape is gone.',
    commonMistakes: [
      'Using suppression on the enemy tank by default.',
      'Walking through river alone because control is available.',
      'Holding ultimate so long that the enemy carry gets a free fight.',
    ],
  },
  angela: {
    pick:
      'Pick Angela when your team has someone who can start fights or hold enemies inside narrow paths. She converts one landed control spell into a kill better than most mid laners.',
    avoid:
      'Avoid Angela when your team has no vision control and the enemy has multiple flankers. She needs time to set her feet before casting the full burst chain.',
    powerSpikes: [
      'Level 4: the first real one-shot window appears if Chaos Cinder lands.',
      'First major ability power item: side-lane roams become lethal against squishy targets.',
      'Defensive active or revive item: gives enough safety to cast a second rotation in late fights.',
    ],
    buildDecision:
      'Build damage first, but do not delay safety forever. Angela is often the obvious target after she shows in mid, and one defensive timing item can decide whether her ultimate finishes.',
    matchupLogic:
      'Play around choke points and forced movement. Against assassins, hold control for self-peel. Against immobile mages, push first and threaten fog instead of trading skill shots in lane forever.',
    commonMistakes: [
      'Throwing the stun on cooldown with no follow-up.',
      'Channeling ultimate from a bad angle after the target already escaped.',
      'Roaming through river alone without support or jungle information.',
    ],
  },
  devara: {
    pick:
      'Pick Devara when your team can keep enemies inside the fight long enough for his enhanced windows and follow-up damage to matter.',
    avoid:
      'Avoid Devara when the enemy draft is built around disengage, chain control, or kiting backward forever. He needs a fight he can actually stay attached to.',
    powerSpikes: [
      'First mixed damage-survival item: short trades stop being purely defensive.',
      'Mid-game skirmishes: he can convert one controlled target into a full fight win.',
      'Late defensive timing: lets him survive the first lock-down and finish the second rotation.',
    ],
    buildDecision:
      'Devara needs a bruiser balance. If he dies during the first entry, the damage build failed. If carries can ignore him, the tank build failed.',
    matchupLogic:
      'Enter after the first control spell is gone, not before. Fight near teammates who can follow his target, and peel when the backline angle is unrealistic.',
    commonMistakes: [
      'Forcing all-in trades before the enhanced window is ready.',
      'Building pure damage into chain crowd control.',
      'Chasing the backline while the team is fighting a winnable frontline target.',
    ],
  },
  'marco-polo': {
    pick:
      'Pick Marco Polo into teams with multiple frontliners or predictable engage. His mobility and true damage pressure are valuable when fights last long enough for passive stacks.',
    avoid:
      'Avoid Marco Polo if the enemy has saved hard control that can instantly stop Fevered Barrage. He can dodge a lot, but he cannot ignore point-and-click lockdown.',
    powerSpikes: [
      'First attack-speed item: farming and passive stacking become smoother.',
      'Two-item point: true damage threat starts forcing tanks to respect him.',
      'Defensive tempo item: lets him dash near danger without dying to the first catch.',
    ],
    buildDecision:
      'Marco does not need the greediest marksman build to threaten tanks. He needs enough attack speed to stack passive and enough durability to stay in range after dashing.',
    matchupLogic:
      'Use Skill 1 to stack from safety, then decide whether ultimate is actually allowed. If the enemy still has a stun ready, keep kiting and let passive do the work.',
    commonMistakes: [
      'Dashing forward just to trade before the enemy support uses control.',
      'Starting ultimate into five ready enemies.',
      'Building like a stationary crit marksman instead of a mobile sustained-damage carry.',
    ],
  },
  'wang-zhaojun': {
    pick:
      'Pick Wang Zhaojun when your team wants objective control, choke-point denial, and a mid laner who can punish enemies walking through narrow paths.',
    avoid:
      'Avoid Wang Zhaojun when your team has no frontline and the enemy can poke from range without ever entering your control zones.',
    powerSpikes: [
      'Level 4: objective zones and river fights become much harder for enemies to enter.',
      'First utility-damage item: wave clear and control pressure become more consistent.',
      'Mid-game grouped fights: one freeze or ultimate zone can decide Tyrant, tower, or Overlord control.',
    ],
    buildDecision:
      'Do not overbuild raw damage if you are dying before the second spell cycle. Wang Zhaojun wins by casting control repeatedly, not by racing burst mages on one combo.',
    matchupLogic:
      'Place skills where enemies must walk, not where they currently stand. Against divers, save freeze defensively. Against grouped teams, make the objective entrance impossible to cross.',
    commonMistakes: [
      'Throwing freeze at max range with no slow or setup.',
      'Casting ultimate behind the enemy instead of across the path they need.',
      'Face-checking river when Skill 1 can check vision first.',
    ],
  },
  milady: {
    pick:
      'Pick Milady when your team wants mid priority, tower pressure, and a mage who can turn wave control into objective tempo.',
    avoid:
      'Avoid Milady when the enemy has reliable backline dive and your team cannot protect mid lane vision. She is powerful with wave control but fragile when caught.',
    powerSpikes: [
      'First minion-pressure item: mid shove starts turning into tower chip and roam windows.',
      'Two-item point: robot pressure makes objectives and sieges much harder to ignore.',
      'Late penetration item: keeps her relevant after enemies buy magic resistance.',
    ],
    buildDecision:
      'Milady should build around sustained spell pressure, penetration, and enough safety to survive dive. If assassins are farming you, a greedier damage curve does not solve the problem.',
    matchupLogic:
      'Push when you know where the enemy jungler is. If information is missing, thin the wave and hold safer spacing. Her pressure comes from controlling waves, not standing forward alone.',
    commonMistakes: [
      'Staying in lane after shoving without turning pressure into tower, vision, or rotation.',
      'Walking forward to auto while assassins are missing.',
      'Using minions only for damage instead of wave and structure pressure.',
    ],
  },
  garo: {
    pick:
      'Pick Garo when your team can protect a late-game marksman and force objectives slowly. Her range turns stable front-to-back fights into a positioning problem for the enemy.',
    avoid:
      'Avoid Garo when your draft has no peel or the enemy can start fights from two angles. Range helps, but it does not save her from a clean flank.',
    powerSpikes: [
      'First damage item: lane poke becomes meaningful but she still needs protection.',
      'Three-item point: objective fights become much easier to control from range.',
      'Late defensive option: prevents one dive from deleting the entire scaling plan.',
    ],
    buildDecision:
      'Keep the late-game damage plan intact, but add survivability when the enemy draft has real backline access. One safe firing window is worth more than another greedy damage component.',
    matchupLogic:
      'Hold max range, fight behind terrain, and force the enemy tank to walk through your damage before their backline can reach you. If flankers are missing, stop hitting and reposition first.',
    commonMistakes: [
      'Standing forward because the range feels safe.',
      'Taking river trades without support vision.',
      'Skipping defensive planning against hard engage comps.',
    ],
  },
  'luban-no-7': {
    pick:
      'Pick Luban No.7 when your team can peel and the enemy frontline must walk into your scattershot damage. He is excellent at punishing tanks that cannot instantly reach him.',
    avoid:
      'Avoid Luban when your team wants to dive away from you or when the enemy has multiple direct backline threats. He needs a fight built around his position.',
    powerSpikes: [
      'First crit or attack-speed spike: passive damage starts winning lane trades.',
      'Penetration item: frontliners can no longer ignore him.',
      'Late defensive item: gives him one chance to survive the first assassin entry.',
    ],
    buildDecision:
      'Luban wants damage, but the build must respect how little mobility he has. If the enemy can reach him, defensive value is not optional.',
    matchupLogic:
      'Stack passive safely, use control defensively, and hit the closest target. Against divers, the correct play is often stepping back before firing, not trying to out-damage the engage.',
    commonMistakes: [
      'Fighting level 1 or level 2 like a duelist.',
      'Using Shark Cannon for poke before the enemy diver commits.',
      'Standing still for one extra scattershot when Flash is already down.',
    ],
  },
  daji: {
    pick:
      'Pick Daji when your team can control vision and punish isolated carries. She is a pick mage, so one clean catch should turn into an objective.',
    avoid:
      'Avoid Daji into grouped, tanky drafts where no priority target has to walk alone. She loses value if every combo goes into a frontliner.',
    powerSpikes: [
      'Level 4: full combo can remove squishy targets after a stun.',
      'First major magic item: roams become much more punishing.',
      'Late penetration: lets her stay relevant after enemies buy resistance.',
    ],
    buildDecision:
      'Prioritize burst and penetration, then add safety if assassins are constantly marking you. Daji only needs one target, but she must be alive to choose that target.',
    matchupLogic:
      'Clear mid, disappear from vision, and force enemies to respect brush. Against flankers, hold stun defensively and play closer to tower until their position is known.',
    commonMistakes: [
      'Using the full combo on the enemy tank.',
      'Showing on wave too long after clearing mid.',
      'Walking forward after all burst cooldowns are down.',
    ],
  },
  'li-bai': {
    pick:
      'Pick Li Bai when your lanes can create priority and the enemy carries need to respect side angles. He wins by choosing the fight, not by forcing every fight.',
    avoid:
      'Avoid Li Bai when your team has no engage, no lane pressure, and the enemy has multiple instant control tools. He becomes too easy to read from behind.',
    powerSpikes: [
      'Level 4: first real gank and pick window opens.',
      'First burst item: backline targets must respect fog.',
      'Mid-game objective setup: vision denial lets him threaten entries from the side.',
    ],
    buildDecision:
      'Build enough burst to punish carries, but do not ignore cooldown rhythm and survival. Li Bai often needs a second entry or exit path more than another greedy damage item.',
    matchupLogic:
      'Track control cooldowns before entering. If the first stun is still available, wait. A clean delayed entry beats an early engage that burns every tool for nothing.',
    commonMistakes: [
      'Ganking lanes with no setup and bad wave state.',
      'Showing first in river before the fight starts.',
      'Chasing after the return window is no longer safe.',
    ],
  },
  wukong: {
    pick:
      'Pick Wukong when the enemy backline has poor spacing and your lanes can survive the first clear. He turns one bad carry position into a won fight.',
    avoid:
      'Avoid Wukong into layered peel, early invades, and carries with reliable self-defense. If every target survives the first hit, he has to work much harder.',
    powerSpikes: [
      'Level 4: gank threat becomes real with knock-up follow-up.',
      'First crit spike: isolated carries can die before they react.',
      'Late defensive insurance: protects shutdown gold after one failed entry.',
    ],
    buildDecision:
      'Wukong needs enough crit damage to make the first entry matter. If enemies stack armor or save control for you, adapt with penetration or survival instead of repeating the same failed dive.',
    matchupLogic:
      'Use fog and side angles. Let the frontline fight start, then attack the carry when their attention is already committed elsewhere.',
    commonMistakes: [
      'Jumping through the front door into tanks.',
      'Forcing ganks into pushed lanes with no crowd control.',
      'Ignoring armor and peel when the first burst stops working.',
    ],
  },
  dolia: {
    pick:
      'Pick Dolia when your team has a carry, mage, or jungler with a cooldown worth resetting. Her value depends on choosing the right teammate before the fight starts.',
    avoid:
      'Avoid Dolia when your team dives in five different directions or lacks a real win condition. She amplifies good cooldowns, but she cannot create a plan alone.',
    powerSpikes: [
      'First roam timing: protects farm lane or enables mid-jungle movement.',
      'First major teamfight: ultimate reset can decide whether your carry gets a second rotation.',
      'Late grouped fights: her value rises when teammates stay close enough to receive help.',
    ],
    buildDecision:
      'Build for uptime, team utility, and survival. Dolia does not need personal damage; she needs to be alive when the important ally cooldown comes back.',
    matchupLogic:
      'Before each fight, decide who deserves the reset. Against dive, the reset may be defensive. When ahead, it can be used to double down on your strongest carry spell.',
    commonMistakes: [
      'Using ultimate on the first ally who loses health.',
      'Roaming while the farm lane wave is unsafe.',
      'Standing so close to the carry that one engage hits both of you.',
    ],
  },
  augran: {
    pick:
      'Pick Augran when your lanes can help lock targets in place and your team wants extended objective fights. He is strongest when enemies cannot instantly disengage.',
    avoid:
      'Avoid Augran when your team has no setup and the enemy can kite backward forever. He needs the fight to stay within his effective range.',
    powerSpikes: [
      'First clear completion: early skirmish pressure starts if lanes have priority.',
      'First damage-durability mix: he can stay attached to fights longer.',
      'Objective fights: his value rises when enemies must walk into your team.',
    ],
    buildDecision:
      'Balance damage and durability. If he dies during the first engage, the damage build failed. If he cannot threaten carries, the tank build failed.',
    matchupLogic:
      'Route toward lanes with control and fight around objectives. Connect to targets your team can actually hit instead of chasing a perfect backline angle.',
    commonMistakes: [
      'Entering before teammates are close enough to follow.',
      'Chasing unreachable carries while ignoring the nearest winning target.',
      'Building too greedy into chain crowd control.',
    ],
  },
};

function genericNotes(hero: Hero): HeroAuthorityNotes {
  const lane = hero.lane || hero.role;
  return {
    pick: `Pick ${hero.name} when your team needs a Tier ${hero.tier} ${lane} option and the draft gives this hero enough space to play around core cooldowns.`,
    avoid: `Avoid ${hero.name} when the enemy composition directly attacks the hero's main weakness or your team cannot support the ${lane} game plan.`,
    powerSpikes: [
      'First completed core item: check whether the hero can now contest lane or jungle tempo.',
      'Two to three item point: decide whether to group for objectives or keep farming toward the late-game plan.',
      'Final defensive or damage item: adapt to the enemy threat instead of following the build blindly.',
    ],
    buildDecision:
      'Start from the recommended build, then adjust based on whether the enemy is forcing burst survival, anti-tank damage, anti-heal, or safer positioning.',
    matchupLogic:
      'Use the counter page and build compare tool together: first identify the threat, then test whether damage, defense, or utility gives the better answer.',
    commonMistakes: [
      'Following the build without checking the enemy draft.',
      'Taking fights before the first meaningful item spike.',
      'Ignoring wave state and vision before rotating.',
    ],
  };
}

export function getHeroAuthorityNotes(hero: Hero): HeroAuthorityNotes {
  return TOP_NOTES[hero.slug] ?? genericNotes(hero);
}
