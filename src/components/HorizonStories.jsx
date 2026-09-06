import React from 'react';
import { STORIES } from '../data/horizonData';
import { Quote, Sparkles, Award } from 'lucide-react';

export const HorizonStories = () => {
  return (
    <section className="hz-section" style={{ background: 'var(--bg-surface)' }}>
      <div className="hz-container">
        
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag">
            <Sparkles size={14} />
            Récits & Réussites Étudiantes
          </div>
          <h2 className="section-title">
            Horizon Stories™
          </h2>
          <p className="section-subtitle">
            L'excellence de l'Université Horizon s'incarne avant tout dans les trajectoires et l'épanouissement de ses étudiantes et étudiants.
          </p>
        </div>

        {/* Grille des Récits */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {STORIES.map((story) => (
            <div
              key={story.id}
              className="card-glass"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '2rem',
                border: '1px solid var(--hz-gold-border)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span className="badge-official">{story.tag}</span>
                  <Quote size={24} color="var(--hz-gold-primary)" style={{ opacity: 0.6 }} />
                </div>

                <p style={{
                  fontSize: '1rem',
                  fontStyle: 'italic',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: '1.75rem'
                }}>
                  "{story.quote}"
                </p>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--border-subtle)'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid var(--hz-gold-primary)',
                  flexShrink: 0
                }}>
                  <img
                    src={story.image}
                    alt={story.author}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                    {story.author}
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                    {story.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
