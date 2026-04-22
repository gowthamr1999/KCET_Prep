'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const NAV_GROUPS = [
  {
    label: 'KCET',
    links: [
      { href: '/kcet',          label: 'Rank Predictor' },
      { href: '/kcet/analysis', label: '5-Year Analysis' },
      { href: '/kcet/tests',    label: 'Mock Tests' },
    ],
  },
  {
    label: 'BITSAT',
    links: [
      { href: '/bitsat',       label: 'Score Predictor' },
      { href: '/bitsat/tests', label: 'Mock Tests' },
    ],
  },
];

// Direct top-level links (no dropdown)
const NAV_DIRECT = [
  { href: '/upload', label: '📤 Upload Paper' },
];

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null); // 'KCET' | 'BITSAT' | null
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  function toggleMenu(label) {
    setOpenMenu(prev => (prev === label ? null : label));
  }

  function isActive(href) {
    return pathname === href || pathname.startsWith(href + '/');
  }

  return (
    <header>
      <nav aria-label="Main navigation" style={styles.navbar} className="glass-panel">
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }} aria-label="PrepMaster — go to home">
          <div style={styles.logoContainer}>
            <span style={styles.logoMark} aria-hidden="true" />
            <span style={styles.logoText}>Prep<span className="text-gradient">Master</span></span>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul style={styles.navLinks} className="nav-links-desktop" role="menubar" aria-label="Site navigation">
          <li role="none">
            <Link href="/" style={{ ...styles.link, color: isActive('/') && pathname === '/' ? 'var(--accent-secondary)' : 'var(--text-main)' }}
              aria-current={pathname === '/' ? 'page' : undefined}>
              Home
            </Link>
          </li>

          {NAV_GROUPS.map(group => (
            <li key={group.label} role="none" style={{ position: 'relative' }}>
              <button
                role="menuitem"
                aria-haspopup="true"
                aria-expanded={openMenu === group.label}
                onClick={() => toggleMenu(group.label)}
                onBlur={e => { if (!e.currentTarget.parentElement.contains(e.relatedTarget)) setOpenMenu(null); }}
                style={{
                  ...styles.link,
                  background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                  color: pathname.startsWith(`/${group.label.toLowerCase()}`) ? 'var(--accent-secondary)' : 'var(--text-main)',
                  display: 'flex', alignItems: 'center', gap: '4px',
                }}>
                {group.label}
                <span aria-hidden="true" style={{ fontSize: '0.65rem', transition: 'transform 0.2s', transform: openMenu === group.label ? 'rotate(180deg)' : 'none' }}>▾</span>
              </button>

              {/* Dropdown */}
              {openMenu === group.label && (
                <ul role="menu" aria-label={`${group.label} sub-navigation`}
                  style={styles.dropdown}
                  onMouseLeave={() => setOpenMenu(null)}>
                  {group.links.map(({ href, label }) => (
                    <li key={href} role="none">
                      <Link href={href} role="menuitem"
                        aria-current={isActive(href) ? 'page' : undefined}
                        onClick={() => setOpenMenu(null)}
                        style={{ ...styles.dropdownLink, color: isActive(href) ? 'var(--accent-secondary)' : 'var(--text-muted)' }}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}

          {/* Direct links */}
          {NAV_DIRECT.map(({ href, label }) => (
            <li key={href} role="none">
              <Link href={href}
                style={{ ...styles.link, color: isActive(href) ? 'var(--text-main)' : 'var(--text-main)', padding: '6px 14px', background: isActive(href) ? 'rgba(140,154,149,0.16)' : 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                aria-current={isActive(href) ? 'page' : undefined}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen(o => !o)}
          style={styles.hamburger}>
          <span aria-hidden="true" style={{ fontSize: '1.4rem' }}>{mobileOpen ? '✕' : '☰'}</span>
        </button>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav id="mobile-nav" aria-label="Mobile navigation"
          style={styles.mobileNav} className="glass-panel">
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <li><Link href="/" onClick={() => setMobileOpen(false)} style={styles.mobileLink} aria-current={pathname === '/' ? 'page' : undefined}>Home</Link></li>
            {NAV_GROUPS.flatMap(g =>
              g.links.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} onClick={() => setMobileOpen(false)}
                    style={{ ...styles.mobileLink, color: isActive(href) ? 'var(--accent-secondary)' : 'var(--text-muted)' }}
                    aria-current={isActive(href) ? 'page' : undefined}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{g.label} / </span>{label}
                  </Link>
                </li>
              ))
            )}
            {NAV_DIRECT.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} onClick={() => setMobileOpen(false)}
                  style={{ ...styles.mobileLink, color: isActive(href) ? 'var(--accent-secondary)' : 'var(--text-main)', fontWeight: 700 }}
                  aria-current={isActive(href) ? 'page' : undefined}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 40px',
    margin: '16px 40px',
    position: 'sticky',
    top: '16px',
    zIndex: 200,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoMark: {
    width: '24px',
    height: '24px',
    borderRadius: '8px',
    background: 'var(--accent-primary)',
    display: 'inline-block',
    flexShrink: 0,
  },
  logoText: {
    fontSize: '1.4rem',
    fontWeight: '800',
    letterSpacing: '-0.5px',
    color: 'var(--text-main)',
  },
  navLinks: {
    display: 'flex',
    gap: '28px',
    alignItems: 'center',
    listStyle: 'none',
  },
  link: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: 'var(--text-main)',
    textDecoration: 'none',
    transition: 'color 0.15s',
    padding: '4px 0',
  },
  dropdown: {
    position: 'absolute',
    top: 'calc(100% + 10px)',
    left: '50%',
    transform: 'translateX(-50%)',
    minWidth: '180px',
    background: 'rgba(16,20,22,0.98)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    padding: '8px',
    listStyle: 'none',
    zIndex: 300,
    boxShadow: '0 12px 28px rgba(0,0,0,0.26)',
  },
  dropdownLink: {
    display: 'block',
    padding: '9px 14px',
    borderRadius: '8px',
    fontSize: '0.88rem',
    fontWeight: 600,
    textDecoration: 'none',
    transition: 'background 0.15s, color 0.15s',
  },
  hamburger: {
    display: 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--text-main)',
    padding: '8px',
  },
  mobileNav: {
    margin: '0 16px 16px',
    padding: '16px 20px',
  },
  mobileLink: {
    display: 'block',
    padding: '10px 4px',
    fontSize: '0.95rem',
    fontWeight: 600,
    textDecoration: 'none',
    color: 'var(--text-main)',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
};
