import { heroes, items } from '@/lib/data';
import { countUniqueArcana, LANE_ORDER } from '@/lib/lanes';
import { createT, type Locale } from '@/lib/i18n';

export function StatsStrip({ locale = 'en' }: { locale?: Locale }) {
  const t = createT(locale);
  const arcanaCount = countUniqueArcana();

  const stats = [
    { value: heroes.length, label: t('home.statHeroes') },
    { value: items.length, label: t('home.statItems') },
    { value: arcanaCount, label: t('home.statArcana') },
    { value: LANE_ORDER.length, label: t('home.statLanes') },
  ];

  return (
    <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="stat-pill">
          <span className="stat-pill-value">{s.value}</span>
          <span className="stat-pill-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
