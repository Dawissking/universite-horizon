import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { INSTITUTE, HEALTH_COURSES } from '../data/horizonData';
import {
  HeartPulse, GraduationCap, Target, Calendar, Users,
  CheckCircle2, ArrowRight, Microscope
} from 'lucide-react';

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        obs.unobserve(el);
      }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: 0, transform: 'translateY(28px)',
      transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
      transitionDelay: `${delay}ms`
    }}>
      {children}
    </div>
  );
}

const STAT = ({ icon: I, label, value, color, delay }) => (
  <Reveal delay={delay}>
    <div style={{
      display: 'flex', alignItems: 'center', gap: '12px', height: '100%',
      padding: '16px 18px', background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.12)', borderRadius: 'var(--radius-md)'
    }}>
      <div style={{
        width: '42px', height: '42px', borderRadius: '12px',
        background: `${color}22`, border: `1px solid ${color}55`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
      }}>
        <I size={19} color={color}/>
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: '0.68rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)' }}>{label}</div>
        <div style={{ fontWeight: '800', fontSize: '0.9375rem', marginTop: '2px', color: '#fff' }}>{value}</div>
      </div>
    </div>
  </Reveal>
);

/**
 * Bandeau d'annonce du pôle Santé : Institut d'Excellence en Sciences
 * de la Santé Horizon, visible dès la première rentrée.
 */
export const InstituteSection = () => (
  <section style={{
    position: 'relative', overflow: 'hidden', padding: '5rem 0',
    background: 'linear-gradient(135deg, #062A21 0%, #0B4436 55%, #0E6B52 100%)'
  }}>
    <div className='hero-bg-orb animate-float' style={{
      width: '460px', height: '460px', top: '-140px', left: '-120px',
      background: 'radial-gradient(circle, rgba(110,231,183,0.16) 0%, transparent 70%)'
    }}/>
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
      backgroundSize: '38px 38px', pointerEvents: 'none'
    }}/>

    <div className='hz-container' style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '3rem', alignItems: 'center' }}>

        <div>
          <Reveal>
            <span className='section-badge' style={{
              background: 'rgba(110,231,183,0.14)', color: '#6EE7B7',
              border: '1px solid rgba(110,231,183,0.35)'
            }}>
              <HeartPulse size={13}/> Nouveau pôle • Première rentrée
            </span>

            <h2 style={{
              fontFamily: 'var(--font-serif)', color: '#fff',
              fontSize: 'clamp(1.75rem,3vw,2.5rem)', lineHeight: 1.2, margin: '1rem 0 0.875rem'
            }}>
              Institut d'Excellence en<br/>
              <span style={{ color: '#6EE7B7' }}>Sciences de la Santé Horizon</span>
            </h2>

            <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.75, fontSize: '1.0625rem', maxWidth: '560px', marginBottom: '1.5rem' }}>
              {INSTITUTE.mission}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', marginBottom: '2rem' }}>
              {INSTITUTE.keyDomains.map((d) => (
                <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: '9px', fontSize: '0.9375rem', color: 'rgba(255,255,255,0.88)' }}>
                  <CheckCircle2 size={15} color='#6EE7B7' style={{ flexShrink: 0 }}/>
                  {d.name}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <Link to='/institut-sante' className='btn btn-gold btn-lg'>
                <Microscope size={18}/> Découvrir l'Institut
              </Link>
              <Link to='/formations' className='btn btn-ghost-white btn-lg'>
                Formations en santé <ArrowRight size={17}/>
              </Link>
            </div>
          </Reveal>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '14px' }}>
          <STAT icon={GraduationCap} label='Formations rattachées' value={`${HEALTH_COURSES.length} formations`} color='#6EE7B7' delay={0}/>
          <STAT icon={Target} label='Domaines clés' value={`${INSTITUTE.keyDomains.length} pôles`} color='#E9BA4B' delay={90}/>
          <STAT icon={Calendar} label='Première rentrée' value={INSTITUTE.intake.date} color='#93C5FD' delay={180}/>
          <STAT icon={Users} label='Effectifs' value={INSTITUTE.intake.capacity} color='#F0ABFC' delay={270}/>
        </div>

      </div>
    </div>
  </section>
);

export default InstituteSection;
