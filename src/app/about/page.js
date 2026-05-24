import Link from 'next/link';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'About PrepMaster | BITSAT & KCET Practice Platform',
  description:
    'Learn how PrepMaster creates mock tests, validates answers, and helps students prepare for BITSAT and KCET with free study tools.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="legal-page">
        <h1>About PrepMaster</h1>
        <p>
          PrepMaster is a free exam-practice platform built for students preparing for BITSAT and
          KCET. The goal is simple: make high-quality mock practice and analysis available without
          paywalls, subscriptions, or login friction.
        </p>

        <h2>What We Offer</h2>
        <p>
          The platform includes full-length timed mocks, section-level analysis, score trend tools,
          rank prediction utilities, and room-based score comparison so study groups can practice on
          the same paper and compare fairly.
        </p>

        <h2>How Questions Are Curated</h2>
        <p>
          We build papers from exam-pattern-aligned datasets and continuously review feedback from
          student attempts. Questions are organized by subject and aligned to the latest observed
          structure of BITSAT and KCET formats.
        </p>

        <h2>Answer Quality and Corrections</h2>
        <p>
          Accuracy is prioritized, but no educational platform is perfect. If you find an incorrect
          key, unclear statement, or formatting issue, report it via the <Link href="/contact">contact page</Link>.
          Verified corrections are added to regular updates.
        </p>

        <h2>Who This Is For</h2>
        <p>
          PrepMaster is designed for class 11/12 students, repeat aspirants, and mentors who need a
          practical mock environment close to real exam constraints. It is not an official exam body,
          and predictions are informational estimates only.
        </p>

        <h2>Ad and Monetization Policy</h2>
        <p>
          We may display Google AdSense ads to support hosting and development. We do not sell user
          login data because the product does not require account creation for core mock usage.
          Details are available in our <Link href="/privacy">Privacy Policy</Link> and <Link href="/terms">Terms of Use</Link>.
        </p>

        <h2>Editorial Transparency</h2>
        <p>
          We aim to publish clear educational content that is useful to students: exam-pattern
          summaries, practice guidance, and product updates. Thin pages are periodically improved,
          merged, or removed when they do not provide enough learning value.
        </p>

        <h2>Get in Touch</h2>
        <p>
          For corrections, partnerships, accessibility concerns, or technical issues, contact us
          through the <Link href="/contact">Contact page</Link>.
        </p>
      </main>
    </>
  );
}
