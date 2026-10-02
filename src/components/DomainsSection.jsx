import React, { useState } from 'react';
import { DOMAINS, COURSES } from '../data/horizonData';
import { 
  Cpu, TrendingUp, PieChart, Palette, Scale, HeartPulse, ArrowRight, 
  BookOpen, CheckCircle, Sparkles, Layers 
} from 'lucide-react';

const iconMap = {
  Cpu,
  TrendingUp,
  PieChart,
  Palette,
  Scale,
  HeartPulse
};

export const DomainsSection = ({ onSelectDomain, onOpenDetails }) => {
  const [activeDomainId, setActiveDomainId] = useState(DOMAINS[0].id);

  const activeDomain = DOMAINS.find(d => d.id === activeDomainId) || DOMAINS[0];
  const domainCourses = COURSES.filter(c => c.domainId === activeDomainId);
  const IconComponent = iconMap[activeDomain.icon] || Layers;

  return (
    <section id="domaines" className="hz-section" style={{ background: 'var(--bg-main)' }}>
      <div className="hz-container">
        
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag">
            <Layers size={14} />
            Pôles d'Enseignement
          </div>
          <h2 className="section-title">
            Nos Grands Domaines Académiques
          </h2>
          <p className="section-subtitle">
            Une offre de formation structurée pour répondre avec précision aux besoins stratégiques des entreprises et organisations du Mali et de l'Afrique.
          </p>
        </div>

        {/* Sélecteur de Domaines interactif */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: 'center',
          marginBottom: '3rem'
        }}>
          {DOMAINS.map((domain) => {
            const isSelected = activeDomainId === domain.id;
            const DomainIcon = iconMap[domain.icon] || Layers;
            return (
              <button
                key={domain.id}
                onClick={() => setActiveDomainId(domain.id)}
                className="btn"
                style={{
                  background: isSelected ? 'var(--hz-navy-900)' : 'var(--bg-surface)',
                  color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
                  border: isSelected ? '2px solid var(--hz-gold-primary)' : '1px solid var(--border-medium)',
                  boxShadow: isSelected ? 'var(--shadow-gold)' : 'var(--shadow-sm)',
                  padding: '0.75rem 1.25rem',
                  fontSize: '0.875rem'
                }}
              >
                <DomainIcon size={18} color={isSelected ? 'var(--hz-gold-light)' : 'var(--hz-gold-primary)'} />
                <span>{domain.name}</span>
              </button>
            );
          })}
        </div>

        {/* Panneau de Présentation du Domaine */}
        <div className="card-glass" style={{ border: '2px solid var(--hz-gold-border)', padding: '2.5rem' }}>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem',
            marginBottom: '2.5rem',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                <span className="badge-official">
                  {activeDomain.badge}
                </span>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  {activeDomain.programs}
                </span>
              </div>

              <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                {activeDomain.name}
              </h3>

              <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                {activeDomain.description}
              </p>

              <button 
                onClick={() => onSelectDomain(activeDomain.id)}
                className="btn btn-primary btn-sm"
              >
                <BookOpen size={16} />
                Explorer toutes les filières de ce domaine
              </button>
            </div>

            <div style={{
              background: 'var(--bg-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.75rem',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{ fontSize: '0.875rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--hz-gold-primary)', marginBottom: '1rem' }}>
                Filières & Certificats au programme
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {domainCourses.map((c) => (
                  <div 
                    key={c.id}
                    onClick={() => onOpenDetails(c)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      background: 'var(--bg-surface)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--hz-gold-primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
                  >
                    <div>
                      <div style={{ fontSize: '0.9375rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                        {c.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {c.level} • {c.duration}
                      </div>
                    </div>
                    <ArrowRight size={16} color="var(--hz-gold-primary)" />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
