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
      <div style={{
        background: 'linear-gradient(90deg,#071526,#0D2240)',
        color: '#fff',
        fontSize: '0.78rem',
        padding: '5px 0',
        borderBottom: '1px solid rgba(201,151,38,0.2)'
      }}>
        <div className="hz-container" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:'8px', flexWrap:'wrap' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <span style={{ background:'#C0392B', fontSize:'0.65rem', fontWeight:'800', padding:'2px 7px', borderRadius:'4px' }}>OFFICIEL</span>
            <span>Diplômes reconnus par l'État malien &bull; Baco Djicoroni Golf, Bamako</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
            <a href="tel:+22377677575" style={{ color:'#E9BA4B', display:'flex', alignItems:'center', gap:'4px' }}>
              <Phone size={12}/> +223 77 67 75 75
            </a>
            <button onClick={onOpenPortals} style={{ color:'#fff', display:'flex', alignItems:'center', gap:'4px' }}>
              <UserCheck size={12}/> Portails
            </button>
          </div>
        </div>
      </div>

      {/* Barre de navigation principale */}
      <div className="hz-container" style={{ padding:'0.875rem 1.5rem' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'1.25rem' }}>

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
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
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
        <div style={{
          position:'fixed', top:'102px', left:0, right:0, bottom:0,
          background:'var(--bg-card)', zIndex:800,
          padding:'2rem 1.5rem', overflowY:'auto',
          display:'flex', flexDirection:'column', gap:'0.75rem',
          animation:'fadeInUp 200ms ease-out',
          borderTop:'1px solid var(--border-100)'
        }}>
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              style={{ fontSize:'1.125rem', padding:'0.875rem 0', borderBottom:'1px solid var(--border-100)' }}
            >
              {item.label}
            </NavLink>
          ))}
          <div style={{ marginTop:'1.5rem', display:'flex', flexDirection:'column', gap:'10px' }}>
            <button onClick={() => { setMobileOpen(false); onOpenApply(); }} className="btn btn-gold" style={{ justifyContent:'center' }}>
              <GraduationCap size={18}/> Candidater en ligne
            </button>
            <button onClick={() => { setMobileOpen(false); onOpenPortals(); }} className="btn btn-primary" style={{ justifyContent:'center' }}>
              <UserCheck size={18}/> Portails (Étudiant / Enseignant)
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 1024px) {
          #desktop-nav { display: flex !important; }
          #header-cta  { display: inline-flex !important; }
          #mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 600px) {
          #search-label-desktop { display: none; }
        }
      `}</style>
    </header>
  );
};
