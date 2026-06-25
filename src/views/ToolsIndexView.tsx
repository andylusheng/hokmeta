import Link from 'next/link';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';

export function ToolsIndexView({ locale = 'en' }: { locale?: Locale }) {
  const t = createT(locale);
  const tools = [
    {
      href: localePath(locale, '/tools/damage-calculator'),
      title: t('tools.damageTitle'),
      description: t('tools.damageDesc'),
    },
    {
      href: localePath(locale, '/tools/build-generator'),
      title: t('tools.buildGenTitle'),
      description: t('tools.buildGenDesc'),
    },
    {
      href: localePath(locale, '/tools/counter-picker'),
      title: t('tools.counterTitle'),
      description: t('tools.counterDesc'),
    },
  ];

  return (
    <div className="container-page">
      <JsonLd
        data={breadcrumbSchema([
          { name: t('common.home'), path: localePath(locale, '/') },
          { name: t('nav.tools'), path: localePath(locale, '/tools') },
        ])}
      />
      <Breadcrumb
        items={[
          { label: t('common.home'), href: localePath(locale, '/') },
          { label: t('nav.tools') },
        ]}
      />
      <h1 className="mb-2 text-3xl font-bold text-white">{t('tools.title')}</h1>
      <p className="mb-8 text-gray-400">{t('tools.subtitle')}</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href} className="card block hover:border-hok-gold/50">
            <h2 className="mb-2 text-lg font-semibold text-white">{tool.title}</h2>
            <p className="text-sm text-gray-400">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
