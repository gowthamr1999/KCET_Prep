'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';

const NAV_GROUPS = [
  {
    label: 'BITSAT',
    links: [
      { href: '/bitsat',       label: 'Score Predictor' },
      { href: '/bitsat/tests', label: 'Mock Tests' },
    ],
  },
  {
    label: 'KCET',
    links: [
      { href: '/kcet',          label: 'Rank Predictor' },
      { href: '/kcet/analysis', label: '5-Year Analysis' },
      { href: '/kcet/tests',    label: 'Mock Tests' },
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
    <header style={styles.headerShell} className="site-header-shell">
      <nav aria-label="Main navigation" style={styles.navbar} className="site-nav">
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
                {group.label === 'BITSAT' && <span style={styles.priorityPill}>Focus</span>}
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
                style={{ ...styles.link, color: isActive(href) ? 'var(--text-main)' : 'var(--text-main)', padding: '7px 14px', background: isActive(href) ? 'var(--nav-pill-active)' : 'var(--nav-pill-bg)', border: '1px solid var(--nav-pill-border)', borderRadius: '999px' }}
                aria-current={isActive(href) ? 'page' : undefined}>
                {label}
              </Link>
            </li>
          ))}
          <li role="none">
            <ThemeToggle />
          </li>
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
          style={styles.mobileNav} className="site-nav mobile-nav-sheet">
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
            <li style={{ paddingTop: '8px' }}>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

const styles = {
  headerShell: {
    position: 'sticky',
    top: 0,
    zIndex: 220,
    padding: 0,
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 28px',
    margin: 0,
    maxWidth: 'none',
    width: '100%',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoMark: {
    width: '20px',
    height: '20px',
    borderRadius: '7px',
    background: 'linear-gradient(135deg, var(--accent-secondary), var(--accent-primary))',
    display: 'inline-block',
    flexShrink: 0,
  },
  logoText: {
    fontSize: '1.28rem',
    fontWeight: '800',
    letterSpacing: '-0.4px',
    color: 'var(--text-main)',
  },
  navLinks: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    listStyle: 'none',
  },
  link: {
    fontSize: '0.92rem',
    fontWeight: '600',
    color: 'var(--text-main)',
    textDecoration: 'none',
    transition: 'color 0.15s, background 0.15s, border-color 0.15s',
    padding: '8px 12px',
    borderRadius: '999px',
  },
  priorityPill: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '2px 8px',
    marginLeft: '2px',
    borderRadius: '999px',
    fontSize: '0.68rem',
    fontWeight: 800,
    letterSpacing: '0.02em',
    background: 'var(--surface-highlight)',
    color: 'var(--accent-secondary)',
    border: '1px solid var(--surface-border-strong)',
  },
  dropdown: {
    position: 'absolute',
    top: 'calc(100% + 12px)',
    left: '50%',
    transform: 'translateX(-50%)',
    minWidth: '210px',
    background: 'var(--dropdown-bg)',
    border: '1px solid var(--surface-border-strong)',
    borderRadius: '16px',
    padding: '10px',
    listStyle: 'none',
    zIndex: 300,
    boxShadow: 'var(--dropdown-shadow)',
  },
  dropdownLink: {
    display: 'block',
    padding: '10px 14px',
    borderRadius: '10px',
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
    margin: 0,
    maxWidth: 'none',
    width: '100%',
    padding: '14px 20px 16px',
    borderRadius: 0,
  },
  mobileLink: {
    display: 'block',
    padding: '11px 6px',
    fontSize: '0.94rem',
    fontWeight: 600,
    textDecoration: 'none',
    color: 'var(--text-main)',
    borderBottom: '1px solid var(--surface-border)',
  },
};
