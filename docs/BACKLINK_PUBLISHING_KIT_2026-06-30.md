# HOKMeta Backlink Publishing Kit - 2026-06-30

Goal: earn early external references for HOKMeta without sounding like a press release.

Positioning:

- HOKMeta is a small, practical Honor of Kings Global tool site.
- The angle is "tools plus data", not "another tier list".
- Use honest numbers from the current project: 116 hero pages, 116 counter pages, 105 item pages, public JSON endpoints, and a static build that generated 1,985 pages on 2026-06-30.
- Do not claim traffic wins until GSC/GA4 data proves them.

Primary links to use:

```txt
https://hokmeta.com/
https://hokmeta.com/tools/damage-calculator/
https://hokmeta.com/tools/build-compare/
https://hokmeta.com/tools/counter-picker/
https://hokmeta.com/hero/hou-yi/
https://hokmeta.com/learn/hou-yi-guide/
https://hokmeta.com/api/heroes.json
```

## Article 1 - Medium / Dev.to

Title options:

- I built a small Honor of Kings Global meta site around tools, not just tier lists
- Building HOKMeta: 116 hero pages, public JSON data, and tools for real player questions
- Why I made an Honor of Kings build site with damage and counter tools

Canonical link:

```txt
https://hokmeta.com/
```

Body:

```md
# I built a small Honor of Kings Global meta site around tools, not just tier lists

I have been working on a small site for Honor of Kings Global called HOKMeta:

https://hokmeta.com/

The reason I started it was simple: when I searched for hero builds, counters, arcana, and item choices, a lot of the available content felt either too thin or too disconnected from how players actually make decisions in a match.

Most players do not search for a generic "Honor of Kings guide". They search like this:

- "Hou Yi build 2026"
- "best arcana for Hou Yi"
- "how to counter Angela"
- "Marco Polo build and counters"
- "best marksman HOK"

So I decided to build the site around those real questions.

## What is live right now

The current version is still early, but it is already more than a static blog.

As of the 2026-06-30 production build, the site generated 1,985 static pages. The data set currently covers:

- 116 hero pages
- 116 hero counter pages
- 105 item pages
- hero guide pages for popular searches like Hou Yi, Angela, Marco Polo, Garo, Luban No.7, Daji, Li Bai, Wukong, Dolia, and Augran
- public JSON endpoints for hero and item data

Example pages:

- Hou Yi build page: https://hokmeta.com/hero/hou-yi/
- Hou Yi guide: https://hokmeta.com/learn/hou-yi-guide/
- Damage calculator: https://hokmeta.com/tools/damage-calculator/
- Counter picker: https://hokmeta.com/tools/counter-picker/
- Public hero JSON: https://hokmeta.com/api/heroes.json

## Why I focused on tools

Content is useful, but for a game like Honor of Kings it gets outdated quickly. A tier list article can help someone once. A tool can bring them back.

That is why I added:

- a damage calculator for testing item builds against target templates
- a build compare tool for checking which build is better in different matchups
- a counter picker for draft questions
- an item database so item names and stats are easier to check

The goal is not to replace player judgment. The goal is to make common decisions faster:

- Can this build actually kill a tank?
- Is this item core or just situational?
- Who counters this hero?
- What should I build first if I am behind?

## What I learned while building it

The biggest lesson is that "more pages" is not the same as better coverage.

The pages that matter most are the ones that match a player's exact problem. A Hou Yi player does not just need a generic hero profile. They need:

- the current build
- arcana and spell choices
- what to do in lane
- what counters them
- when to avoid picking the hero
- a tool to test item decisions

That is why the internal links are built around hero page -> guide -> counters -> tools. The site is trying to answer the whole search journey, not just one keyword.

## What still needs work

This is not a finished project.

The next improvements are:

- better patch freshness tracking
- more detailed matchup notes for the top 30 heroes
- more practical counter pages
- cleaner mobile performance
- real Search Console data to replace estimated keyword priorities

I am also trying to keep the public data simple enough that other people can inspect or reuse it:

https://hokmeta.com/api/heroes.json

If you play Honor of Kings Global and notice a build, counter, or hero page that feels wrong, I would rather hear that feedback early than pretend the site is already perfect.

Site: https://hokmeta.com/
Tools: https://hokmeta.com/tools/
```

## Article 2 - GitHub README / Discussion

Title:

```txt
HOKMeta: static Honor of Kings Global hero data, builds, counters, and tools
```

Body:

````md
# HOKMeta Public Data and Tools

HOKMeta is a small Honor of Kings Global project focused on practical player decisions:

- hero builds
- arcana
- counter picks
- item data
- damage calculation
- build comparison
- draft/counter picking

Main site:

https://hokmeta.com/

Public JSON:

```txt
https://hokmeta.com/api/heroes.json
https://hokmeta.com/api/items.json
https://hokmeta.com/api/heroes/hou-yi.json
```

The current public site is statically generated. On 2026-06-30 the production build generated 1,985 pages, including 116 hero pages, 116 counter pages, 105 item pages, tool pages, and guide pages.

Useful pages:

- Tools: https://hokmeta.com/tools/
- Damage calculator: https://hokmeta.com/tools/damage-calculator/
- Build compare: https://hokmeta.com/tools/build-compare/
- Counter picker: https://hokmeta.com/tools/counter-picker/
- Hou Yi build: https://hokmeta.com/hero/hou-yi/
- Hou Yi guide: https://hokmeta.com/learn/hou-yi-guide/

The project is still early. The current priority is improving data freshness, matchup notes, and guide quality for common long-tail searches like `hou yi build 2026`, `how to counter angela`, and `best marksman HOK`.
````

## Article 3 - V2EX / Indie Hackers Style Post

Title options:

- I made a small HOK Global build and counter tool site. Here is what I learned
- Building an Honor of Kings tool site: why I chose tools over pure content
- My early HOKMeta build: 1,985 static pages, 116 heroes, and a few practical tools

Body:

```md
I recently built an early version of HOKMeta, a small Honor of Kings Global site:

https://hokmeta.com/

I did not want to make only another tier list page. For this game, the search intent is usually much more specific:

- Hou Yi build 2026
- best arcana for Hou Yi
- how to counter Angela
- Marco Polo build and counters
- best marksman HOK

So the site is structured around hero pages, counter pages, guide pages, and tools.

Current build snapshot:

- 116 hero pages
- 116 counter pages
- 105 item pages
- 1,985 static pages generated in the 2026-06-30 build
- public JSON endpoints for heroes and items

The tools are the part I care about most:

- Damage calculator: https://hokmeta.com/tools/damage-calculator/
- Build compare: https://hokmeta.com/tools/build-compare/
- Counter picker: https://hokmeta.com/tools/counter-picker/

The site is still early, and I am not claiming big traffic numbers yet. The next step is to use Google Search Console data to decide which hero pages and guide pages deserve deeper updates.

Right now I am focusing on long-tail pages such as:

- https://hokmeta.com/hero/hou-yi/
- https://hokmeta.com/learn/hou-yi-guide/
- https://hokmeta.com/hero/angela/counters/

If anyone here plays Honor of Kings Global, I am interested in feedback on whether the build/counter/tool flow matches how you actually search before a ranked match.
```

## Short Social Posts

### X / Twitter

```txt
I am building HOKMeta, a small Honor of Kings Global site focused on tools, not just tier lists.

Current build:
- 116 hero pages
- 116 counter pages
- 105 item pages
- damage calculator
- build compare
- counter picker

https://hokmeta.com/tools/
```

### Reddit

```txt
I made a small Honor of Kings Global build/counter/tool site: https://hokmeta.com/

It is still early, but the current version has hero pages, counter pages, item pages, a damage calculator, build compare, and counter picker.

I am mainly trying to answer practical searches like "Hou Yi build 2026", "how to counter Angela", and "best marksman HOK".

Feedback from actual players is welcome, especially if a build or counter page feels wrong.
```

## Publishing Rules

- Use one main link plus one deep link per post. Do not dump 10 links.
- Put the tool link near the top for communities that dislike SEO articles.
- Do not say "best site", "ultimate", or "complete" yet.
- Mention that the site is early and feedback is welcome.
- After publishing, record the URL, platform, anchor text, and date in `docs/backlink-tracker.csv`.
