import patchesMeta from '../../data/patches.json';
import { createT, type Locale } from '@/lib/i18n';

export function MetaBanner({ locale = 'en' }: { locale?: Locale }) {
  const t = createT(locale);
  const updated =
    'updated' in patchesMeta && patchesMeta.updated
      ? patchesMeta.updated
      : null;

  return (
    <div className="mb-6 rounded-lg border border-hok-gold/30 bg-hok-gold/10 px-4 py-2 text-sm text-gray-300">
      <span className="font-medium text-hok-gold">{t('metaBanner.label')}</span>
      {updated && (
        <>
          {' '}
          · {t('metaBanner.from')}{' '}
          <a
            href="https://camp.honorofkings.com/"
            className="text-hok-gold underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            Camp HOK
          </a>{' '}
          · {t('metaBanner.updated')} {updated}
        </>
      )}
    </div>
  );
}
