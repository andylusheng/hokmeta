import { authorMeta } from '@/lib/seo';
import { site } from '@/lib/data';
import { createT, localePath, type Locale } from '@/lib/i18n';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd, breadcrumbSchema } from '@/lib/schema';

export function PrivacyView({ locale = 'en' }: { locale?: Locale }) {
  const t = createT(locale);
  const domainHost = site.domain.replace('https://', '').replace(/\/$/, '');

  return (
    <div className="container-page max-w-3xl">
      <JsonLd
        data={breadcrumbSchema([
          { name: t('common.home'), path: localePath(locale, '/') },
          { name: t('nav.privacy'), path: localePath(locale, '/privacy') },
        ])}
      />
      <Breadcrumb
        items={[
          { label: t('common.home'), href: localePath(locale, '/') },
          { label: t('nav.privacy') },
        ]}
      />
      <h1 className="mb-6 text-3xl font-bold text-white">{t('privacy.title')}</h1>
      <div className="prose prose-invert max-w-none space-y-4 text-sm leading-relaxed text-gray-300">
        <p>{t('privacy.lastUpdated', { date: authorMeta.dateModified })}</p>
        <p>
          {t('privacy.p1', {
            name: site.name,
            domain: site.domain,
            author: authorMeta.name,
          })}
        </p>
        <h2 className="text-lg font-semibold text-white">{t('privacy.collectHeading')}</h2>
        <p>{t('privacy.collectBody')}</p>
        <h2 className="text-lg font-semibold text-white">{t('privacy.cookiesHeading')}</h2>
        <p>{t('privacy.cookiesBody')}</p>
        <h2 className="text-lg font-semibold text-white">{t('privacy.contactHeading')}</h2>
        <p>{t('privacy.contactBody', { domain: domainHost })}</p>
      </div>
    </div>
  );
}
