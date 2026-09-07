import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import {
  Sun, Moon, Search, Menu, X, GraduationCap,
  ChevronDown, UserCheck, Phone
} from 'lucide-react';

const NAV_ITEMS = [
  { label: "Université",  path: "/universite" },
  { label: "Formations",  path: "/formations" },
  { label: "Admissions",  path: "/admissions" },
  { label: "Campus",      path: "/campus" },
  { label: "Actualités",  path: "/actualites" },
  { label: "Contact",     path: "/contact" },
];

export const Header = ({ onOpenSearch, onOpenPortals, onOpenApply }) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      {/* Bandeau supérieur */}
      <div className="header-topbar">
        <div className="hz-container header-topbar-inner">
          <div className="header-topbar-left">
            <span className="header-topbar-badge">OFFICIEL</span>
            <span className="header-topbar-text">Diplômes reconnus par l'État malien &bull; Baco Djicoroni Golf, Bamako</span>
          </div>
          <div className="header-topbar-right">
            <a href="tel:+22377677575" className="header-topbar-phone">
              <Phone size={12}/> +223 77 67 75 75
            </a>
            <button onClick={onOpenPortals} className="header-topbar-portals">
              <UserCheck size={12}/> Portails
            </button>
          </div>
        </div>
      </div>

      {/* Barre de navigation principale */}
      <div className="hz-container" style={{ padding:'0.75rem 1rem' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'0.75rem' }}>

          {/* Logo */}
          <Link to="/" style={{ display:'flex', alignItems:'center', gap:'12px', flexShrink:0 }}>
            <div style={{
              width:'44px', height:'44px', borderRadius:'10px', overflow:'hidden',
              border:'2px solid var(--hz-gold-500)', background:'#fff',
              boxShadow:'var(--shadow-sm)'
            }}>
              <img src="/assets/logo.jpeg" alt="Logo Université Horizon"
                style={{ width:'100%', height:'100%', objectFit:'contain' }}/>
            </div>
            <div>
              <div style={{ fontFamily:'var(--font-serif)', fontSize:'1.2rem', fontWeight:'800', letterSpacing:'0.04em', lineHeight:1.1 }}>
                UNIVERSITÉ <span style={{ color:'var(--hz-gold-500)' }}>HORIZON</span>
              </div>
              <div style={{ fontSize:'0.6rem', fontWeight:'700', color:'var(--text-400)', letterSpacing:'0.07em', textTransform:'uppercase' }}>
                L'Horizon est à Vous
              </div>
            </div>
          </Link>

          {/* Nav desktop */}
          <nav style={{ display:'none', alignItems:'center', gap:'2px' }} id="desktop-nav">
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

          {/* Actions */}
          <div style={{ display:'flex', alignItems:'center', gap:'6px', flexShrink:0 }}>
            <button
              onClick={onOpenSearch}
              className="btn btn-outline btn-sm"
              aria-label="Recherche"
            >
              <Search size={16}/>
              <span id="search-label-desktop">Rechercher</span>
            </button>

            <button
              onClick={toggleTheme}
              className="btn btn-outline btn-sm"
              aria-label={theme==='light'?"Mode sombre":"Mode clair"}
              style={{ width:'38px', height:'38px', padding:0, borderRadius:'50%', flexShrink:0 }}
              title={theme==='light'?"Mode Sombre":"Mode Clair"}
            >
              {theme==='light'
                ? <Moon size={16} color="var(--hz-navy-900)"/>
                : <Sun size={16} color="var(--hz-gold-400)"/>
              }
            </button>

            <button
              onClick={onOpenApply}
              className="btn btn-gold btn-sm"
              id="header-cta"
              style={{ fontWeight:'700' }}
            >
              <GraduationCap size={16}/> Candidater
            </button>

            {/* Hamburger mobile */}
            <button
              className="btn btn-outline btn-sm"
              id="mobile-menu-btn"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Menu"
              style={{ padding:'8px' }}
            >
              {mobileOpen ? <X size={20}/> : <Menu size={20}/>}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile plein-écran */}
      {mobileOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileOpen(false)}>
          <div className="mobile-menu-panel" onClick={e => e.stopPropagation()}>
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
            <div className="mobile-menu-actions">
              <button onClick={() => { setMobileOpen(false); onOpenApply(); }} className="btn btn-gold" style={{ justifyContent:'center', width:'100%' }}>
                <GraduationCap size={18}/> Candidater en ligne
              </button>
              <button onClick={() => { setMobileOpen(false); onOpenPortals(); }} className="btn btn-primary" style={{ justifyContent:'center', width:'100%' }}>
                <UserCheck size={18}/> Portails (Étudiant / Enseignant)
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 1024px) {
          #desktop-nav { display: flex !important; }
          #header-cta  { display: inline-flex !important; }
          #mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 1023px) {
          #desktop-nav { display: none !important; }
          #search-label-desktop { display: none; }
          #header-cta { display: none !important; }
          #mobile-menu-btn { display: inline-flex !important; }
        }
        .mobile-menu-overlay {
          position: fixed;
          inset: 0;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(7,21,38,0.6);
          backdrop-filter: blur(4px);
          z-index: 999;
          display: flex;
          align-items: stretch;
          justify-content: flex-end;
          animation: fadeIn 200ms ease-out;
        }
        .mobile-menu-panel {
          width: 85%;
          max-width: 340px;
          height: 100%;
          background: var(--bg-card);
          box-shadow: -8px 0 30px rgba(0,0,0,0.3);
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
          overflow-y: auto;
          animation: fadeInRight 250ms ease-out;
        }
        .mobile-nav-link {
          display: block;
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-600);
          padding: 0.9rem 0.75rem;
          border-radius: var(--radius-sm);
          border-bottom: 1px solid var(--border-100);
          transition: all 180ms ease;
        }
        .mobile-nav-link:hover, .mobile-nav-link.active {
          color: var(--hz-gold-500);
          background: var(--hz-gold-bg);
        }
        .mobile-menu-actions {
          margin-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-top: 1rem;
          border-top: 1px solid var(--border-100);
        }
        @media (max-width: 480px) {
          .mobile-menu-panel {
            width: 100%;
            max-width: none;
          }
        }
      `}</style>
    </header>
  );
};
