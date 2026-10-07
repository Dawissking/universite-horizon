import React, { useState, useMemo } from 'react';
import { COURSES, DOMAINS } from '../data/horizonData';
import { 
  Search, Filter, BookOpen, Clock, Award, CheckCircle, 
  ArrowRight, ExternalLink, X, FileText, HelpCircle, GraduationCap, ChevronRight 
} from 'lucide-react';

export const CoursesExplorer = ({ onOpenApply, selectedCourseModal, setSelectedCourseModal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [selectedType, setSelectedType] = useState('all'); // all, accelerated, licence, master

  const filteredCourses = useMemo(() => {
    return COURSES.filter((c) => {
      // Recherche textuelle
      const matchesSearch = 
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.domainName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
        c.careers.some(o => o.toLowerCase().includes(searchTerm.toLowerCase()));

      // Filtre domaine
      const matchesDomain = selectedDomain === 'all' || c.domainId === selectedDomain;

      // Filtre type
      const matchesType = 
        selectedType === 'all' ||
        (selectedType === 'accelerated' && c.type === 'accelerated') ||
        (selectedType === 'degree' && c.type !== 'accelerated') ||
        (selectedType === 'licence' && c.type !== 'accelerated' && c.level.startsWith('Licence')) ||
        (selectedType === 'master' && c.type !== 'accelerated' && c.level.startsWith('Master'));

      return matchesSearch && matchesDomain && matchesType;
    });
  }, [searchTerm, selectedDomain, selectedType]);

  return (
    <section id="formations" className="hz-section" style={{ background: 'var(--bg-main)' }}>
      <div className="hz-container">
        
        {/* En-tête */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-tag">
            <BookOpen size={14} />
            Catalogue Académique & Professionnel
          </div>
          <h2 className="section-title">
            Explorateur de Formations
          </h2>
          <p className="section-subtitle">
            Consultez l'ensemble de nos diplômes d'État et certificats métiers accélérés pour bâtir votre cursus sur mesure.
          </p>
        </div>

        {/* Barre de Recherche et Filtres */}
        <div style={{
          background: 'var(--bg-surface)',
          padding: '1.5rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-medium)',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '2.5rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            alignItems: 'center'
          }}>
            {/* Input de recherche */}
            <div style={{ position: 'relative', gridColumn: 'span 2' }}>
              <Search 
                size={18} 
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} 
              />
              <input
                type="text"
                placeholder="Rechercher par intitulé, compétence, métier (ex: Douane, Logiciel, SYSCOHADA)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem 0.875rem 2.6rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-main)',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
              />
            </div>

            {/* Filtre Domaine */}
            <div>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-main)',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
              >
                <option value="all">Tous les Domaines</option>
                {DOMAINS.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            {/* Filtre Type */}
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-main)',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
              >
                <option value="all">Tous types de cursus</option>
                <option value="degree">Diplômes Universitaires LMD</option>
                <option value="licence">Licences LMD (Bac+3)</option>
                <option value="master">Masters LMD (Bac+5)</option>
                <option value="accelerated">Formations Accélérées Métiers</option>
              </select>
            </div>

          </div>

          {/* Indicateur de résultats */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              {filteredCourses.length} formation{filteredCourses.length > 1 ? 's' : ''} trouvée{filteredCourses.length > 1 ? 's' : ''}
            </span>
            {(searchTerm || selectedDomain !== 'all' || selectedType !== 'all') && (
              <button
                onClick={() => { setSearchTerm(''); setSelectedDomain('all'); setSelectedType('all'); }}
                style={{ fontSize: '0.8125rem', color: 'var(--hz-gold-primary)', fontWeight: '600' }}
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>
        </div>

        {/* Grille des Formations */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
          gap: '1.75rem'
        }}>
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="card-glass"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.75rem'
              }}
            >
              <div>
                {/* Badges de tête */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '1rem' }}>
                  <span className={course.type === 'accelerated' ? "badge-official" : "badge-info"}>
                    {course.level}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>
                    {course.domainName}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--text-primary)', lineHeight: 1.35 }}>
                  {course.title}
                </h3>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {course.objectives}
                </p>

                {/* Compétences clés */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    Compétences visées :
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {course.skills.map((s, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.75rem',
                          background: 'var(--bg-subtle)',
                          padding: '3px 8px',
                          borderRadius: 'var(--radius-sm)',
                          color: 'var(--text-secondary)'
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pied de carte */}
              <div>
                <div style={{
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px'
                }}>
                  <button
                    onClick={() => setSelectedCourseModal(course)}
                    className="btn btn-secondary btn-sm"
                    style={{ flex: '1', justifyContent: 'center' }}
                  >
                    Fiche détaillée
                  </button>
                  <button
                    onClick={() => onOpenApply(course)}
                    className="btn btn-primary btn-sm"
                    style={{ flex: '1', justifyContent: 'center' }}
                  >
                    Postuler
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modale de Fiche Détaillée de Formation */}
        {selectedCourseModal && (
          <div className="modal-overlay" onClick={() => setSelectedCourseModal(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '850px', padding: '2.5rem' }}>
              
              {/* Entête Modale */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <span className={selectedCourseModal.type === 'accelerated' ? "badge-official" : "badge-info"}>
                      {selectedCourseModal.level}
                    </span>
                    <span className="badge-official">
                      Diplôme reconnu par l'État malien
                    </span>
                  </div>
                  <h2 style={{ fontSize: '1.75rem', color: 'var(--text-primary)' }}>
                    {selectedCourseModal.title}
                  </h2>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    Domaine : {selectedCourseModal.domainName} • Modalité : {selectedCourseModal.modality}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCourseModal(null)}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'var(--bg-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <X size={20} color="var(--text-secondary)" />
                </button>
              </div>

              <hr style={{ borderColor: 'var(--border-subtle)', marginBottom: '1.5rem' }} />

              {/* Corps de la fiche */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                {/* Objectifs & Public */}
                <div style={{ background: 'var(--bg-subtle)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--hz-gold-primary)', marginBottom: '6px' }}>
                    Objectifs Pédagogiques
                  </div>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                    {selectedCourseModal.objectives}
                  </p>
                </div>

                {/* Grille Informations Pratiques */}
                <div className="grid-2">
                  <div style={{ padding: '1rem', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      DURÉE DU PROGRAMME
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                      {selectedCourseModal.duration}
                    </div>
                  </div>

                  <div style={{ padding: '1rem', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      FRAIS DE FORMATION
                    </div>
                    <div className="badge-placeholder">
                      {selectedCourseModal.tuition}
                    </div>
                  </div>
                </div>

                {/* Prérequis */}
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '6px' }}>
                    Conditions d'accès & Prérequis
                  </div>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
                    {selectedCourseModal.prerequisites}
                  </p>
                </div>

                {/* Débouchés Métiers */}
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '8px' }}>
                    Débouchés Professionnels
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
                     {selectedCourseModal.careers.map((career, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: 'var(--bg-main)', borderRadius: 'var(--radius-sm)' }}>
                        <CheckCircle size={15} color="var(--hz-gold-primary)" />
                        <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{career}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pièces à fournir */}
                <div style={{ background: 'var(--bg-main)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-primary)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Pièces Constitutives du Dossier
                  </div>
                  <ul style={{ paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <li>Copie légalisée de l'attestation du Baccalauréat ou diplôme équivalent</li>
                    <li>Extraits d'acte de naissance officiel</li>
                    <li>Relevés de notes des années antérieures</li>
                    <li>Photocopies des pièces d'identité et photos d'identité récentes</li>
                  </ul>
                </div>

                {/* Boutons d'action finale */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                  <button
                    onClick={() => setSelectedCourseModal(null)}
                    className="btn btn-secondary"
                  >
                    Fermer
                  </button>
                  <button
                    onClick={() => {
                      const course = selectedCourseModal;
                      setSelectedCourseModal(null);
                      onOpenApply(course);
                    }}
                    className="btn btn-gold"
                  >
                    <GraduationCap size={18} />
                    Candidater à cette formation
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
