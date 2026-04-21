import "./globals.css";

export const metadata = {
  title: "PrepMaster | Crack KCET & BITSAT",
  description: "Free mock tests, 5-year paper analysis, and rank prediction for KCET and BITSAT engineering entrance exams.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Skip to main content — keyboard / screen-reader shortcut */}
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
