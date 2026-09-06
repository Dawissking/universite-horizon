import React, { useState } from 'react';
import { INSTITUTION } from '../data/horizonData';
import { MapPin, Building2, CheckCircle2, Wifi, Monitor, Users, BookOpen } from 'lucide-react';

export const CampusTour = () => {
  const [selectedCampusId, setSelectedCampusId] = useState(INSTITUTION.campuses[0].id);

  const activeCampus = INSTITUTION.campuses.find(c => c.id === selectedCampusId) || INSTITUTION.campuses[0];

  return (
    <section id="campus" className="hz-section" style={{ background: 'var(--bg-surface)' }}>
      <div className="hz-container">
        
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag">
            <Building2 size={14} />
            Infrastructures & Vie Étudiante
          </div>
          <h2 className="section-title">
            Notre Campus Numérique
          </h2>
          <p className="section-subtitle">
            Deux sites modernes au cœur de Bamako conçus pour offrir un environnement de travail connecté, stimulant et hautement propice à la réussite.
          </p>
        </div>

        {/* Sélecteur des Campus */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          {INSTITUTION.campuses.map((campus) => {
            const isSelected = selectedCampusId === campus.id;
            return (
              <button
                key={campus.id}
                onClick={() => setSelectedCampusId(campus.id)}
                className="btn"
                style={{
                  background: isSelected ? 'var(--hz-navy-900)' : 'var(--bg-subtle)',
                  color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
                  border: isSelected ? '2px solid var(--hz-gold-primary)' : '1px solid var(--border-medium)',
                  boxShadow: isSelected ? 'var(--shadow-gold)' : 'none',
                  padding: '0.875rem 1.75rem'
                }}
              >
                <MapPin size={18} color={isSelected ? 'var(--hz-gold-light)' : 'var(--hz-gold-primary)'} />
                <span>{campus.name}</span>
              </button>
            );
          })}
        </div>

        {/* Présentation du site sélectionné */}
        <div className="card-glass" style={{ border: '2px solid var(--hz-gold-border)', padding: '2.5rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center'
          }}>
            
            {/* Photographie officielle du Campus */}
            <div style={{
              position: 'relative',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)',
              aspectRatio: '16/10'
            }}>
              <img
                src={activeCampus.image}
                alt={activeCampus.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(7,21,38,0) 60%, rgba(7,21,38,0.7) 100%)'
              }} />
              <div style={{ position: 'absolute', bottom: '1rem', left: '1.25rem', color: '#FFFFFF' }}>
                <span className="badge-official" style={{ marginBottom: '4px' }}>
                  {activeCampus.city}
                </span>
                <div style={{ fontWeight: '700', fontSize: '1.125rem' }}>
                  {activeCampus.name}
                </div>
              </div>
            </div>

            {/* Caractéristiques et Services */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="badge-info">SITE OFFICIEL HOMOLOGUÉ</span>
              </div>

              <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                {activeCampus.name}
              </h3>

              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                {activeCampus.description}
              </p>

              <div style={{
                background: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                border: '1px solid var(--border-subtle)',
                marginBottom: '1.5rem'
              }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--hz-gold-primary)', marginBottom: '10px' }}>
                  Équipements & Commodités du Site :
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  {activeCampus.features.map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                      <CheckCircle2 size={16} color="var(--hz-gold-primary)" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Adresse : <span className="badge-placeholder">{activeCampus.address}</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
