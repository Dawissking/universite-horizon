import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import {
  Sun, Moon, Search, Menu, X, GraduationCap,
  UserCheck, Phone
} from 'lucide-react';

const NAV_ITEMS = [
  { label: "Université",  path: "/universite" },
  { label: "Formations",  path: "/formations" },
  { label: "Institut Santé", path: "/institut-sante" },
  { label: "Admissions",  path: "/admissions" },
  { label: "Campus",      path: "/campus" },
  { label: "Actualités",  path: "/actualites" },
  { label: "Contact",     path: "/contact" },
];

export const Header = ({ onOpenSearch, onOpenPortals, onOpenApply }) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setAtTop(y < 10);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? Math.min((y / docH) * 100, 100) : 0);
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Bloquer le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* Scroll progress bar */}
      <div className="scroll-progress-track" aria-hidden="true">
        <div className="scroll-progress-fill" style={{ width: `${scrollProgress}%` }} />
      </div>

      <header className={`site-header${scrolled ? ' scrolled' : ''}${atTop ? ' is-at-top' : ''}`}>
      {/* Bandeau supérieur */}
      <div className="header-topbar">
        <div className="hz-container header-topbar-inner">
          <div className="header-topbar-left">
            <span className="header-topbar-badge">OFFICIEL</span>
            <span className="header-topbar-text">Diplômes reconnus par l'État malien &bull; Bamako</span>
          </div>
          <div className="header-topbar-right">
            <a href="tel:+22376757329" className="header-topbar-phone">
              <Phone size={12}/> +223 76 75 73 29
            </a>
            <button onClick={onOpenPortals} className="header-topbar-portals">
              <UserCheck size={12}/> Portails
            </button>
          </div>
        </div>
      </div>

      {/* Barre de navigation principale */}
      <div className="header-main">
        {/* Logo */}
        <Link to="/" className="header-logo" onClick={() => setMobileOpen(false)}>
          <div className="header-logo-img">
            <img src="/assets/logo.jpeg" alt="Logo" />
          </div>
          <div className="header-logo-text">
            <div className="header-logo-title">
              UNIVERSITÉ <span style={{ color:'var(--hz-gold-500)' }}>HORIZON</span>
            </div>
            <div className="header-logo-sub">L'Horizon est à Vous</div>
          </div>
        </Link>

        {/* Nav desktop */}
        <nav className="header-desktop-nav">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Actions desktop */}
        <div className="header-desktop-actions">
          <button onClick={onOpenSearch} className="btn btn-outline btn-sm" aria-label="Recherche">
            <Search size={16}/>
          </button>
          <button
            onClick={toggleTheme}
            className="btn btn-outline btn-sm"
            aria-label={theme==='light'?"Mode sombre":"Mode clair"}
            style={{ width:'36px', height:'36px', padding:0, borderRadius:'50%' }}
          >
            {theme==='light'
              ? <Moon size={16} color="var(--hz-navy-900)"/>
              : <Sun size={16} color="var(--hz-gold-400)"/>
            }
          </button>
          <button onClick={onOpenApply} className="btn btn-gold btn-sm header-cta-desktop">
            <GraduationCap size={16}/> Candidater
          </button>
        </div>

        {/* Hamburger mobile — toujours visible sur mobile */}
        <button
          className="header-hamburger"
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24}/> : <Menu size={24}/>}
        </button>
      </div>

      {/* Menu mobile — portal outside header stacking context */}
      {mobileOpen && createPortal(
        <div className="mobile-menu-overlay" onClick={() => setMobileOpen(false)}>
          <nav className="mobile-menu-panel" onClick={e => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <span className="mobile-menu-title">Navigation</span>
              <button onClick={() => setMobileOpen(false)} className="mobile-menu-close">
                <X size={22}/>
              </button>
            </div>

            <div className="mobile-menu-links">
              {NAV_ITEMS.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <div className="mobile-menu-actions">
              <button onClick={() => { setMobileOpen(false); onOpenApply(); }} className="btn btn-gold" style={{ justifyContent:'center', width:'100%' }}>
                <GraduationCap size={18}/> Candidater en ligne
              </button>
              <button onClick={() => { setMobileOpen(false); onOpenPortals(); }} className="btn btn-primary" style={{ justifyContent:'center', width:'100%' }}>
                <UserCheck size={18}/> Portails
              </button>
              <button onClick={() => { setMobileOpen(false); onOpenSearch(); }} className="btn btn-outline" style={{ justifyContent:'center', width:'100%' }}>
                <Search size={16}/> Rechercher
              </button>
            </div>
          </nav>
        </div>,
        document.body
      )}
    </header>
    </>
  );
};
