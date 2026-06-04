import patchesMeta from '../../data/patches.json';

export function MetaBanner() {
  const updated =
    'updated' in patchesMeta && patchesMeta.updated
      ? patchesMeta.updated
      : null;

  return (
    <div className="mb-6 rounded-lg border border-hok-gold/30 bg-hok-gold/10 px-4 py-2 text-sm text-gray-300">
      <span className="font-medium text-hok-gold">Live meta data</span>
      {updated && (
        <>
          {' '}
          · Win / pick / ban from{' '}
          <a
            href="https://camp.honorofkings.com/"
            className="text-hok-gold underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            Camp HOK
          </a>{' '}
          · Updated {updated}
        </>
      )}
    </div>
  );
}
