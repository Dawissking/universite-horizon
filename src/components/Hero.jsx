import React, { useState, useEffect } from 'react';
import { GraduationCap, ArrowRight, ShieldCheck, Compass, Sparkles, BookOpen, Users } from 'lucide-react';

export const Hero = ({ onOpenApply, onNavigate }) => {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <section 
      id="hero" 
      style={{
        position: 'relative',
        padding: '5rem 0 6rem',
        background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-main) 100%)',
        overflow: 'hidden'
      }}
    >
      {/* Motifs géométriques institutionnels d'arrière-plan */}
      <div style={{
        position: 'absolute',
        top: '-150px',
        right: '-100px',
        width: '550px',
        height: '550px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201, 151, 38, 0.12) 0%, rgba(201, 151, 38, 0) 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{
        position: 'absolute',
        bottom: '-120px',
        left: '-80px',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, rgba(37, 99, 235, 0) 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="hz-container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3.5rem',
          alignItems: 'center'
        }}>
          
          {/* Colonne Gauche : Narration & Appel à l'action */}
          <div>
            <div className={`section-tag hero-reveal${revealed ? ' revealed' : ''}`} data-delay="1" style={{ animation: revealed ? undefined : 'none' }}>
              <Sparkles size={14} />
              Institution d'Enseignement Supérieur au Mali
            </div>

            <h1 className={`hero-reveal${revealed ? ' revealed' : ''}`} data-delay="2" style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
              marginBottom: '1.25rem',
              color: 'var(--text-primary)'
            }}>
              UNIVERSITÉ <span className="text-gold-gradient" style={{ fontFamily: 'var(--font-serif)' }}>HORIZON</span>
            </h1>

            <div className={`hero-reveal${revealed ? ' revealed' : ''}`} data-delay="3" style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.125rem, 2.2vw, 1.375rem)',
              fontWeight: '700',
              color: 'var(--hz-navy-800)',
              letterSpacing: '0.02em',
              marginBottom: '0.5rem',
              lineHeight: 1.3
            }}>
              <span style={{ color: 'var(--hz-gold-primary)' }}>«</span> BÂTISSEZ VOTRE AVENIR DANS L’EXCELLENCE. <span style={{ color: 'var(--hz-gold-primary)' }}>»</span>
            </div>

            <div className={`hero-reveal${revealed ? ' revealed' : ''}`} data-delay="4" style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.125rem',
              fontWeight: '600',
              fontStyle: 'italic',
              color: 'var(--text-secondary)',
              marginBottom: '1.75rem'
            }}>
              « L’Horizon est à Vous. »
            </div>

            <p className={`hero-reveal${revealed ? ' revealed' : ''}`} data-delay="5" style={{
              fontSize: '1.0625rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              marginBottom: '2.25rem',
              maxWidth: '540px'
            }}>
              Entrez dans un écosystème universitaire moderne où rigueur académique, 
              encadrement rapproché et innovation technologique convergent pour propulser 
              votre employabilité au Mali et à l'international.
            </p>

            {/* Boutons d'Action Principaux */}
            <div className={`hero-cta-group hero-reveal${revealed ? ' revealed' : ''}`} data-delay="6">
              <button 
                onClick={onOpenApply} 
                className="btn btn-gold"
              >
                <GraduationCap size={18} />
                Candidater maintenant
              </button>

              <button 
                onClick={() => onNavigate('formations')} 
                className="btn btn-primary"
              >
                <BookOpen size={18} />
                Découvrir nos formations
              </button>
            </div>

            {/* Rassurance institutionnelle */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border-subtle)',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={20} color="var(--hz-gold-primary)" />
                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                  Diplômes reconnus par l'État malien
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={20} color="var(--hz-blue-accent)" />
                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                  Encadrement rapproché & individualisé
                </span>
              </div>
            </div>

          </div>

          {/* Colonne Droite : Composition Visuelle avec Photographie Réelle */}
          <div className={`hero-visual-col hero-visual-reveal${revealed ? ' revealed' : ''}`}>
            
            {/* Cadre de l'image principale des étudiants Horizon */}
            <div className="hero-image-frame">
              <img 
                src="/assets/hero_students.jpeg" 
                alt="Étudiants de l'Université Horizon" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(7, 21, 38, 0) 60%, rgba(7, 21, 38, 0.75) 100%)'
              }} />
              
              <div style={{
                position: 'absolute',
                bottom: '1.25rem',
                left: '1.25rem',
                right: '1.25rem',
                color: '#FFFFFF'
              }}>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#E9BA4B', fontWeight: '700' }}>
                  Promotion Horizon
                </div>
                <div style={{ fontSize: '1rem', fontWeight: '600' }}>
                  Former les leaders & praticiens de demain
                </div>
              </div>
            </div>

            {/* Badge flottant supérieur : 2 Campus */}
            <div className="hero-badge-top">
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'var(--hz-gold-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sparkles size={18} color="var(--hz-gold-primary)" />
              </div>
              <div>
                <div style={{ fontSize: '0.9375rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                  2 Campus d'Excellence
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Bamako & Zone Golf
                </div>
              </div>
            </div>

            {/* Badge flottant inférieur : Filières & Formations accélérées */}
            <div className="hero-badge-bottom">
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #0D2240 0%, #15315B 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#E9BA4B'
              }}>
                <GraduationCap size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.9375rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                  LMD & Formations Accélérées
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--hz-gold-primary)', fontWeight: '600' }}>
                  Transit, QHSE, Gestion, Tech
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
