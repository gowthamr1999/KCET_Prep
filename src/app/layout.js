import "./globals.css";
import Script from "next/script";
import BitsatUpdateNotifier from "@/components/BitsatUpdateNotifier";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://prepmaster.in'),
  title: {
    default: 'PrepMaster | BITSAT & KCET Mock Tests',
    template: '%s | PrepMaster',
  },
  description:
    'Free BITSAT and KCET mock tests, score analysis, rank prediction tools, and student-focused exam practice resources.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'PrepMaster | BITSAT & KCET Mock Tests',
    description:
      'Practice with full-length mocks, review your performance, and improve exam readiness with focused BITSAT and KCET tools.',
    url: '/',
    siteName: 'PrepMaster',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {adsenseClient && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
          />
        )}
        <Script id="theme-init" strategy="beforeInteractive">
          {`(() => {
            try {
              const savedTheme = localStorage.getItem('theme');
              if (savedTheme === 'dark' || savedTheme === 'light') {
                document.documentElement.dataset.theme = savedTheme;
              }
            } catch {}
          })();`}
        </Script>
        {/* Skip to main content — keyboard / screen-reader shortcut */}
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}
        <BitsatUpdateNotifier />
      </body>
    </html>
  );
}
