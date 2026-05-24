import Link from 'next/link';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Privacy Policy | PrepMaster',
  description: 'Privacy Policy for PrepMaster mock tests, analytics, and study tools.',
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="legal-page">
        <h1>Privacy Policy</h1>
        <p>
          PrepMaster helps students practice mock tests, review performance, and use AI study tools.
          This policy explains what data may be collected and how it is used.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We may collect test attempt details such as score, selected display name, paper attempted,
          time taken, and section performance. Custom uploaded papers may be stored locally in your
          browser unless a server feature explicitly says otherwise.
        </p>

        <h2>How We Use Information</h2>
        <p>
          Attempt data is used to generate score reports, improve question quality, detect broken
          flows, and provide leaderboard or benchmark features. We use aggregate patterns to improve
          exam relevance and product reliability.
        </p>

        <h2>Cookies and Local Storage</h2>
        <p>
          The site may use browser storage or cookies for preferences (for example, theme settings),
          analytics, and ad measurement. You can clear browser storage or disable cookies in your
          browser settings, though some features may not work as expected.
        </p>

        <h2>AI Features</h2>
        <p>
          When you use AI explanations, performance analysis, or practice-paper generation, relevant
          question and result data may be sent to our AI provider to generate the response. Do not
          enter private personal information into test fields.
        </p>

        <h2>Advertising</h2>
        <p>
          We may use Google AdSense to show advertisements. Google and its partners may use cookies
          or similar technologies to serve and measure ads. You can learn more from Google&apos;s
          advertising policies and your browser privacy controls.
        </p>

        <h2>Data Retention</h2>
        <p>
          We retain data only as long as required for product functionality, abuse prevention, and
          legal compliance. Non-essential records are periodically cleaned up.
        </p>

        <h2>Children and Sensitive Data</h2>
        <p>
          Do not submit highly sensitive personal data. The platform is built for educational use,
          and users should avoid sharing personal identifiers beyond what is required for display
          names or basic communication.
        </p>

        <h2>Policy Updates</h2>
        <p>
          This policy may be updated when product features, legal obligations, or ad technology
          change. Material updates will be reflected on this page.
        </p>

        <h2>Contact</h2>
        <p>
          For questions about this policy, use the <Link href="/contact">contact page</Link>.
        </p>
      </main>
    </>
  );
}
