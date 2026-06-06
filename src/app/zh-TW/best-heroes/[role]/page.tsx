import { notFound } from 'next/navigation';
import { buildMetadata, defaultTitle } from '@/lib/seo';
import { createT } from '@/lib/i18n';
import { translateRole } from '@/lib/locale-labels';
import { BestHeroesRoleView } from '@/views/BestHeroesRoleView';
import type { HeroRole } from '@/types/hero';
import { ROLES } from '@/types/hero';

const roleMap: Record<string, HeroRole> = {
  tank: 'Tank',
  warrior: 'Warrior',
  assassin: 'Assassin',
  mage: 'Mage',
  marksman: 'Marksman',
  support: 'Support',
};

export function generateStaticParams() {
  return ROLES.map((role) => ({ role: role.toLowerCase() }));
}

export function generateMetadata({
  params,
}: {
  params: { role: string };
}) {
  const role = roleMap[params.role.toLowerCase()];
  if (!role) return {};
  const t = createT('zh-TW');
  return buildMetadata({
    title: defaultTitle(t('bestHeroes.roleTitle', { role: translateRole(role, 'zh-TW') })),
    description: t('bestHeroes.roleSubtitle', { count: 0, role: translateRole(role, 'zh-TW') }),
    path: `/best-heroes/${params.role}`,
    locale: 'zh-TW',
  });
}

export default function ZhTWBestHeroesRolePage({
  params,
}: {
  params: { role: string };
}) {
  const role = roleMap[params.role.toLowerCase()];
  if (!role) notFound();
  return <BestHeroesRoleView role={role} locale="zh-TW" />;
}
