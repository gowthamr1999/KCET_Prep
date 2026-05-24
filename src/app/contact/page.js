import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Contact | PrepMaster',
  description: 'Contact PrepMaster for corrections, support, and content feedback.',
};

export default function ContactPage() {
  const supportEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'support@prepmaster.in';

  return (
    <>
      <Navbar />
      <main id="main-content" className="legal-page">
        <h1>Contact</h1>
        <p>
          For feedback, answer-key corrections, content concerns, accessibility requests, or
          partnerships, contact us at:
        </p>
        <p>
          <strong>Email:</strong> <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
        </p>

        <p>
          When reporting a question issue, include exam name, paper title, question number, and your
          expected correction so we can verify and update quickly.
        </p>

        <h2>Support Scope</h2>
        <p>
          We currently support: answer-key corrections, paper formatting issues, score/rank tool
          questions, and broken page reports.
        </p>

        <h2>Response Time</h2>
        <p>
          We typically reply within 2 to 5 business days, with urgent technical breakages handled
          sooner when possible.
        </p>
      </main>
    </>
  );
}
