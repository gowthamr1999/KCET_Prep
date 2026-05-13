import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Contact | PrepMaster',
  description: 'Contact PrepMaster.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="legal-page">
        <h1>Contact</h1>
        <p>
          For feedback, corrections, content concerns, or partnership questions, contact the site
          owner at:
        </p>
        <p>
          <strong>Email:</strong> <a href="mailto:contact@example.com">contact@example.com</a>
        </p>
        <p>
          Replace this placeholder email with your real support address before applying for AdSense.
        </p>
      </main>
    </>
  );
}
