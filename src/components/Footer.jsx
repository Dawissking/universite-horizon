import React from 'react';
import { Link } from 'react-router-dom';
import { INSTITUTION } from '../data/horizonData';
import { Phone, Mail, MapPin, GraduationCap, ShieldCheck } from 'lucide-react';

export const Footer = ({ onOpenApply, onOpenPortals }) => (
  <footer style={{
    background: 'linear-gradient(180deg, #071526 0%, #030B14 100%)',
    color: '#fff',
    borderTop: '2px solid var(--hz-gold-500)',
    padding: '4.5rem 0 2rem'
  }}>
    <div className="hz-container">
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'3rem', marginBottom:'3.5rem' }}>

        {/* Identité */}
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'1.25rem' }}>
            <div style={{ width:'44px', height:'44px', borderRadius:'10px', overflow:'hidden', background:'#fff', border:'2px solid var(--hz-gold-500)' }}>
              <img src="/assets/logo.jpeg" alt="Logo" style={{ width:'100%', height:'100%', objectFit:'contain' }}/>
            </div>
            <div>
              <div style={{ fontFamily:'var(--font-serif)', fontSize:'1.15rem', fontWeight:'800', letterSpacing:'0.04em' }}>
                UNIVERSITÉ <span style={{ color:'var(--hz-gold-400)' }}>HORIZON</span>
              </div>
              <div style={{ fontSize:'0.6rem', color:'rgba(255,255,255,0.6)', textTransform:'uppercase', letterSpacing:'0.07em' }}>
                République du Mali
              </div>
            </div>
          </div>
          <div style={{ fontFamily:'var(--font-serif)', fontSize:'0.9rem', color:'var(--hz-gold-400)', lineHeight:1.5, marginBottom:'0.5rem' }}>
            {INSTITUTION.tagline1}
          </div>
          <div style={{ fontFamily:'var(--font-serif)', fontSize:'0.85rem', fontStyle:'italic', color:'rgba(255,255,255,0.75)', marginBottom:'1.5rem' }}>
            {INSTITUTION.tagline2}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'8px', padding:'8px 12px', background:'rgba(255,255,255,0.06)', borderRadius:'var(--radius-sm)', border:'1px solid rgba(201,151,38,0.25)' }}>
            <ShieldCheck size={16} color="var(--hz-gold-500)"/>
            <span style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.9)' }}>
              Diplômes reconnus par l'État malien
            </span>
          </div>
        </div>

        {/* Formations */}
        <div>
          <div style={{ fontSize:'0.78rem', fontWeight:'800', textTransform:'uppercase', color:'var(--hz-gold-500)', letterSpacing:'0.08em', marginBottom:'1.25rem' }}>
            Formations
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'8px', fontSize:'0.875rem', color:'rgba(255,255,255,0.72)' }}>
            <Link to="/formations" style={{ color:'inherit', transition:'color 180ms' }} onMouseEnter={e=>e.target.style.color='var(--hz-gold-400)'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.72)'}>Sciences & Technologies</Link>
            <Link to="/formations" style={{ color:'inherit' }} onMouseEnter={e=>e.target.style.color='var(--hz-gold-400)'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.72)'}>Management & Finance</Link>
            <Link to="/formations" style={{ color:'inherit' }} onMouseEnter={e=>e.target.style.color='var(--hz-gold-400)'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.72)'}>Droit & Sciences Politiques</Link>
            <Link to="/formations" style={{ color:'inherit' }} onMouseEnter={e=>e.target.style.color='var(--hz-gold-400)'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.72)'}>Transit Douane (Accéléré)</Link>
            <Link to="/formations" style={{ color:'inherit' }} onMouseEnter={e=>e.target.style.color='var(--hz-gold-400)'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.72)'}>QHSE & RSE (Accéléré)</Link>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <div style={{ fontSize:'0.78rem', fontWeight:'800', textTransform:'uppercase', color:'var(--hz-gold-500)', letterSpacing:'0.08em', marginBottom:'1.25rem' }}>
            Navigation
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'8px', fontSize:'0.875rem', color:'rgba(255,255,255,0.72)' }}>
            <Link to="/universite" style={{ color:'inherit' }}>L'Université</Link>
            <Link to="/admissions" style={{ color:'inherit' }}>Admissions & Candidature</Link>
            <Link to="/campus" style={{ color:'inherit' }}>Campus & Vie Étudiante</Link>
            <Link to="/actualites" style={{ color:'inherit' }}>Actualités</Link>
            <Link to="/contact" style={{ color:'inherit' }}>Contact</Link>
            <button onClick={onOpenPortals} style={{ color:'rgba(255,255,255,0.72)', textAlign:'left', fontSize:'0.875rem' }}>
              Portails (Étudiant / Enseignant)
            </button>
            <Link to="/a-propos" style={{ color:'inherit' }}>À propos</Link>
            <Link to="/confidentialite" style={{ color:'inherit' }}>Confidentialité</Link>
            <Link to="/conditions" style={{ color:'inherit' }}>Conditions générales</Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontSize:'0.78rem', fontWeight:'800', textTransform:'uppercase', color:'var(--hz-gold-500)', letterSpacing:'0.08em', marginBottom:'1.25rem' }}>
            Contact & Campus
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'10px', fontSize:'0.875rem', color:'rgba(255,255,255,0.75)' }}>
            <div style={{ display:'flex', gap:'8px', alignItems:'flex-start' }}>
              <MapPin size={16} color="var(--hz-gold-500)" style={{ flexShrink:0, marginTop:'2px' }}/>
              <span>Baco Djicoroni Golf, Bamako, Mali</span>
            </div>
            <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
              <Phone size={16} color="var(--hz-gold-500)"/>
              <a href="tel:+22377677575" style={{ color:'inherit' }}>+223 77 67 75 75</a>
            </div>
            <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
              <Phone size={16} color="var(--hz-gold-500)"/>
              <a href="tel:+22376757329" style={{ color:'inherit' }}>+223 76 75 73 29</a>
            </div>
            <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
              <Mail size={16} color="var(--hz-gold-500)"/>
              <a href="mailto:contact@universite-horizon.ml" style={{ color:'inherit' }}>
                contact@universite-horizon.ml
              </a>
            </div>
          </div>
          <div style={{ marginTop:'1.25rem' }}>
            <button onClick={onOpenApply} className="btn btn-gold btn-sm" style={{ width:'100%', justifyContent:'center' }}>
              <GraduationCap size={15}/> Candidater maintenant
            </button>
          </div>
        </div>

      </div>

      {/* Bas de footer */}
      <div style={{ borderTop:'1px solid rgba(255,255,255,0.08)', paddingTop:'1.75rem', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem', fontSize:'0.75rem', color:'rgba(255,255,255,0.45)' }}>
        <span>© {new Date().getFullYear()} Université Horizon • Bamako, Mali. Tous droits réservés.</span>
        <span>Aucune publicité sur ce site • Plateforme accessible WCAG</span>
      </div>
    </div>
  </footer>
);
