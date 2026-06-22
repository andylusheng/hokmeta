import Script from 'next/script';
import { site } from '@/lib/data';

export function GoogleAdSense() {
  const publisherId = site.adsensePublisherId?.trim();
  if (!publisherId) return null;

  return (
    <Script
      id="adsense-auto-ads"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
