import React, { useState } from 'react';
import { 
  Compass, Navigation, CheckCircle2, ChevronRight, 
  Sparkles, Target, Award, BookOpen, Briefcase 
} from 'lucide-react';

export const CompassSection = () => {
  const [selectedQuadrant, setSelectedQuadrant] = useState('current');

  const quadrants = [
    {
      id: 'current',
      step: '01',
      title: 'OÙ JE SUIS',
      subtitle: 'Positionnement Initial & Diagnostic',
      color: 'var(--hz-navy-900)',
      icon: Navigation,
      content: "Évaluation des acquis scolaires (Baccalauréat ou expérience professionnelle), identification des points forts et cadrage des ambitions avec l'équipe pédagogique.",
      elements: [
        "Relevé de notes & Série du Baccalauréat",
        "Bilan personnalisé lors de l'entretien d'orientation",
        "Test de positionnement en outils numériques et langues"
      ],
      progress: 25
    },
    {
      id: 'learning',
      step: '02',
      title: 'CE QUE J’APPRENDS',
      subtitle: 'Socle Académique & Fondamentaux',
      color: '#2563EB',
      icon: BookOpen,
      content: "Assimilation des concepts fondamentaux, cours magistraux enrichis et travaux dirigés en groupes restreints pour une compréhension en profondeur.",
      elements: [
        "Modules disciplinaires obligatoires et cours optionnels",
        "Études de cas réels d'entreprises maliennes et internationales",
        "Accès 24/7 aux ressources numériques de l'Université Horizon"
      ],
      progress: 50
    },
    {
      id: 'mastering',
      step: '03',
      title: 'CE QUE JE DOIS MAÎTRISER',
      subtitle: 'Savoir-faire Opérationnel & Compétences Clés',
      color: 'var(--hz-gold-primary)',
      icon: Award,
      content: "Passage de la connaissance à la maîtrise opérationnelle : pratique intensive en laboratoire, simulations logicielles et soutenance de projets tutorés.",
      elements: [
        "Résolution de problématiques métiers sans assistance",
        "Pratique des logiciels spécialisés (Douane, Finance, Systèmes)",
        "Soft skills : Leadership, négociation, prise de parole"
      ],
      progress: 75
    },
    {
      id: 'destination',
      step: '04',
      title: 'OÙ JE VEUX ALLER',
      subtitle: 'Insertion Professionnelle & Carrière d’Excellence',
      color: '#10B981',
      icon: Target,
      content: "Concrétisation de votre horizon : stage de fin de cursus, insertion dans les réseaux professionnels et tremplin vers l'entrepreneuriat ou le leadership sectoriel.",
      elements: [
        "Validation du diplôme d'État ou certificat métier",
        "Convention de stage et mise en relation directe avec les recruteurs",
        "Intégration au réseau d'élite des Alumni Horizon"
      ],
      progress: 100
    }
  ];

  const current = quadrants.find(q => q.id === selectedQuadrant) || quadrants[0];
  const CurrentIcon = current.icon;

  return (
    <section id="boussole" className="hz-section" style={{ background: 'var(--bg-main)' }}>
      <div className="hz-container">
        
        {/* En-tête */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag">
            <Compass size={14} />
            Boussole Universitaire Interactive
          </div>
          <h2 className="section-title">
            Horizon Compass™
          </h2>
          <p className="section-subtitle">
            Un instrument visuel exclusif permettant à chaque étudiant de situer son apprentissage et de piloter sa progression avec lucidité et méthode.
          </p>
        </div>

        {/* Le cadran de la boussole */}
        <div className="card-glass" style={{
          border: '2px solid var(--hz-gold-border)',
          padding: '3rem 2.5rem',
          maxWidth: '1050px',
          margin: '0 auto'
        }}>
          
          {/* Navigation en 4 quadrants */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '12px',
            marginBottom: '3rem'
          }}>
            {quadrants.map((q) => {
              const isSelected = selectedQuadrant === q.id;
              const QIcon = q.icon;
              return (
                <button
                  key={q.id}
                  onClick={() => setSelectedQuadrant(q.id)}
                  style={{
                    padding: '1.25rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    background: isSelected ? 'var(--hz-navy-900)' : 'var(--bg-subtle)',
                    color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
                    border: isSelected ? '2px solid var(--hz-gold-primary)' : '1px solid var(--border-subtle)',
                    boxShadow: isSelected ? 'var(--shadow-gold)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: isSelected ? 'var(--hz-gold-primary)' : 'var(--bg-surface)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <QIcon size={18} color={isSelected ? '#071526' : 'var(--hz-gold-primary)'} />
                  </div>

                  <span style={{ fontSize: '0.6875rem', fontWeight: '800', letterSpacing: '0.08em', color: isSelected ? 'var(--hz-gold-light)' : 'var(--text-muted)' }}>
                    CADRAN {q.step}
                  </span>

                  <span style={{ fontSize: '0.9375rem', fontWeight: '800', textAlign: 'center' }}>
                    {q.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Corps de visualisation dynamique du cadran */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center'
          }}>
            
            {/* Visualiseur circulaire & indicateur de progression */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--bg-subtle)',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem 1.5rem',
              border: '1px solid var(--border-subtle)',
              position: 'relative'
            }}>
              {/* Cercle central */}
              <div style={{
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                border: '6px solid var(--border-subtle)',
                borderTopColor: 'var(--hz-gold-primary)',
                borderRightColor: current.progress >= 50 ? 'var(--hz-gold-primary)' : 'var(--border-subtle)',
                borderBottomColor: current.progress >= 75 ? 'var(--hz-gold-primary)' : 'var(--border-subtle)',
                borderLeftColor: current.progress >= 100 ? 'var(--hz-gold-primary)' : 'var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-surface)',
                boxShadow: 'var(--shadow-gold)',
                transition: 'all var(--transition-normal)'
              }}>
                <CurrentIcon size={40} color="var(--hz-gold-primary)" />
                <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '6px' }}>
                  {current.progress}%
                </div>
                <div style={{ fontSize: '0.6875rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  Progression Cap
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                  Axe de Transformation
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Université Horizon • Parcours Certifié
                </div>
              </div>
            </div>

            {/* Explications & Éléments du quadrant */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="badge-official">
                  PHASE {current.step}
                </span>
                <span style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--hz-gold-primary)' }}>
                  {current.subtitle}
                </span>
              </div>

              <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                {current.title}
              </h3>

              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                {current.content}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  Jalons et livrables concrets :
                </div>
                {current.elements.map((el, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 size={18} color="var(--hz-gold-primary)" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.9375rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                      {el}
                    </span>
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
