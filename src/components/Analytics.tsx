import Script from 'next/script';
import { GoogleAnalytics } from '@next/third-parties/google';

const gaId = process.env.NEXT_PUBLIC_GA_ID ?? '';
const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID ?? '';

export default function Analytics() {
  const ga = /^G-[A-Z0-9]+$/.test(gaId) ? gaId : '';
  const clarity = /^[a-z0-9]+$/i.test(clarityId) ? clarityId : '';
  if (!ga && !clarity) return null;
  return (
    <>
      {ga ? <GoogleAnalytics gaId={ga} /> : null}
      {clarity ? (
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${clarity}");`}
        </Script>
      ) : null}
    </>
  );
}
