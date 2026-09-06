import React, { useState, useMemo } from 'react';
import { COURSES, DOMAINS, INSTITUTION, FAQ } from '../data/horizonData';
import { Search, X, BookOpen, Layers, MapPin, HelpCircle, ArrowRight } from 'lucide-react';

export const SearchModal = ({ isOpen, onClose, onSelectCourse, onNavigate }) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;

    const matchedCourses = COURSES.filter(c => 
      c.title.toLowerCase().includes(q) || 
      c.skills.some(s => s.toLowerCase().includes(q)) ||
      c.careers.some(o => o.toLowerCase().includes(q))
    );

    const matchedDomains = DOMAINS.filter(d => 
      d.name.toLowerCase().includes(q) || 
      d.description.toLowerCase().includes(q)
    );

    const matchedFaq = FAQ.filter(f => 
      f.question.toLowerCase().includes(q) || 
      f.answer.toLowerCase().includes(q)
    );

    const matchedCampuses = INSTITUTION.campuses.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.city.toLowerCase().includes(q)
    );

    return {
      courses: matchedCourses,
      domains: matchedDomains,
      faq: matchedFaq,
      campuses: matchedCampuses,
      total: matchedCourses.length + matchedDomains.length + matchedFaq.length + matchedCampuses.length
    };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px', padding: '2rem' }}>
        
        {/* Entête avec barre de recherche instantanée */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', borderBottom: '2px solid var(--hz-gold-primary)', paddingBottom: '12px' }}>
          <Search size={24} color="var(--hz-gold-primary)" />
          <input
            type="text"
            autoFocus
            placeholder="Que recherchez-vous ? (Ex: Douane, Génie Logiciel, Campus, Recommandation...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '1.125rem',
              color: 'var(--text-primary)',
              fontFamily: 'inherit'
            }}
          />
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        {/* Résultats Catégorisés */}
        <div style={{ maxHeight: '420px', overflowY: 'auto' }}>
          {!searchResults ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '0.875rem' }}>
                Tapez au moins une lettre pour rechercher parmi les <strong>formations</strong>, <strong>domaines</strong>, <strong>campus</strong> et <strong>FAQ officielle</strong>.
              </div>
            </div>
          ) : searchResults.total === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
              Aucun résultat trouvé pour « {query} ».
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Formations trouvées */}
              {searchResults.courses.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--hz-gold-primary)', letterSpacing: '0.08em', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <BookOpen size={14} />
                    <span>Formations ({searchResults.courses.length})</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {searchResults.courses.map(c => (
                      <div
                        key={c.id}
                        onClick={() => { onClose(); onSelectCourse(c); }}
                        style={{
                          padding: '10px 14px',
                          background: 'var(--bg-subtle)',
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '0.9375rem', fontWeight: '600', color: 'var(--text-primary)' }}>{c.title}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.level} • {c.domainName}</div>
                        </div>
                        <ArrowRight size={14} color="var(--hz-gold-primary)" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Domaines trouvés */}
              {searchResults.domains.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--hz-gold-primary)', letterSpacing: '0.08em', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Layers size={14} />
                    <span>Pôles Académiques ({searchResults.domains.length})</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {searchResults.domains.map(d => (
                      <div
                        key={d.id}
                        onClick={() => { onClose(); onNavigate('domaines'); }}
                        style={{
                          padding: '10px 14px',
                          background: 'var(--bg-subtle)',
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ fontSize: '0.9375rem', fontWeight: '600', color: 'var(--text-primary)' }}>{d.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{d.description.slice(0, 80)}...</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ Officielle */}
              {searchResults.faq.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--hz-gold-primary)', letterSpacing: '0.08em', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <HelpCircle size={14} />
                    <span>Questions Officielles ({searchResults.faq.length})</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {searchResults.faq.map((f, i) => (
                      <div
                        key={i}
                        style={{
                          padding: '10px 14px',
                          background: 'var(--bg-subtle)',
                          borderRadius: 'var(--radius-sm)'
                        }}
                      >
                        <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>{f.question}</div>
                        <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{f.answer}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
