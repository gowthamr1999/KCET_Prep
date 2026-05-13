import Link from 'next/link';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Terms | PrepMaster',
  description: 'Terms of use for PrepMaster.',
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="legal-page">
        <h1>Terms of Use</h1>
        <p>
          PrepMaster provides mock tests, rank estimates, performance analysis, and practice tools for
          study purposes. Results and predictions are educational estimates, not official admission or
          exam outcomes.
        </p>

        <h2>Student Responsibility</h2>
        <p>
          Use the site as a preparation aid. Verify important answers, eligibility information, exam
          dates, and admission details with official sources.
        </p>

        <h2>Uploaded Content</h2>
        <p>
          Only upload or add question papers and content that you have the right to use. Do not upload
          copyrighted, private, or unlawful material.
        </p>

        <h2>Ads and Fair Use</h2>
        <p>
          Do not click your own ads, ask others to click ads, automate traffic, or use the site in ways
          that could create invalid ad activity.
        </p>

        <h2>Questions</h2>
        <p>
          For site questions, visit the <Link href="/contact">contact page</Link>.
        </p>
      </main>
    </>
  );
}
