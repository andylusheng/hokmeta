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
