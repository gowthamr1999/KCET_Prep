import Link from 'next/link';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Privacy Policy | PrepMaster',
  description: 'Privacy Policy for PrepMaster mock test and study tools.',
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

        <h2>Contact</h2>
        <p>
          For questions about this policy, use the <Link href="/contact">contact page</Link>.
        </p>
      </main>
    </>
  );
}
