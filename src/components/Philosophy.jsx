import React, { useState } from 'react';
import { Target, Compass, HeartHandshake, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const Philosophy = () => {
  const [activeTab, setActiveTab] = useState('vision');

  const tabs = [
    {
      id: 'vision',
      title: 'NOTRE VISION',
      subtitle: 'Anticiper les défis du Mali et du continent africain',
      icon: Target,
      content: "Devenir le pôle universitaire de référence en Afrique de l'Ouest, reconnu pour sa capacité à former des cadres intègres, hautement qualifiés et immédiatement opérationnels, capables de catalyser le développement socio-économique et l'innovation technologique.",
      highlights: [
        "Adéquation permanente aux standards internationaux de l'enseignement supérieur",
        "Valorisation de l'expertise locale et des opportunités panafricaines",
        "Transformation digitale intégrée à tous les cursus académiques"
      ]
    },
    {
      id: 'mission',
      title: 'NOTRE MISSION',
      subtitle: 'Transmettre le savoir, développer les compétences et forger le caractère',
      icon: Compass,
      content: "Délivrer une formation académique et professionnelle d'excellence accessible, articulée autour de l'encadrement rapproché, de l'éthique de travail et de la mise en situation réelle pour faire de chaque étudiant l'acteur conscient et performant de son propre avenir.",
      highlights: [
        "Pédagogie active centrée sur la résolution de problèmes réels",
        "Corps enseignant combinant universitaires de renom et praticiens d'entreprise",
        "Accompagnement individualisé de l'admission jusqu'au premier emploi"
      ]
    },
    {
      id: 'valeurs',
      title: 'NOS VALEURS',
      subtitle: 'Les piliers immuables de la culture Horizon',
      icon: HeartHandshake,
      content: "L'Université Horizon est guidée par quatre valeurs cardinales qui s'imprègnent dans chaque cours, projet et échange sur nos campus : l'Excellence, l'Intégrité morale, l'Innovation audacieuse et la Solidarité communautaire.",
      highlights: [
        "Excellence : La recherche constante du travail bien accompli",
        "Intégrité : Éthique, rigueur intellectuelle et respect mutuel",
        "Innovation : Esprit critique, créativité et adaptation aux technologies",
        "Solidarité : Sens du bien commun et responsabilité sociétale"
      ]
    },
    {
      id: 'engagement',
      title: 'NOTRE ENGAGEMENT',
      subtitle: 'Un contrat moral d\'employabilité et de réussite avec chaque famille',
      icon: ShieldCheck,
      content: "Nous nous engageons solennellement auprès des étudiants et de leurs tuteurs à fournir un cadre d'études sécurisé, stimulant et rigoureux, avec des diplômes reconnus et valorisés par les recruteurs publics et privés du Mali et de la sous-région.",
      highlights: [
        "Transparence pédagogique et évaluation équitable",
        "Accès à des infrastructures modernes et connectées",
        "Insertion professionnelle active par les stages et les réseaux alumni"
      ]
    }
  ];

  const current = tabs.find(t => t.id === activeTab) || tabs[0];
  const IconComponent = current.icon;

  return (
    <section id="universite" className="hz-section" style={{ background: 'var(--bg-main)' }}>
      <div className="hz-container">
        
        {/* En-tête de section narrative */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag">
            <Compass size={14} />
            L'Éthique & La Philosophie
          </div>
          
          <h2 className="section-title">
            « Votre avenir ne se choisit pas seulement.<br />
            <span className="text-gold-gradient" style={{ fontFamily: 'var(--font-serif)' }}>
              Il se construit. »
            </span>
          </h2>
          
          <p className="section-subtitle">
            À l'Université Horizon, nous croyons qu'une éducation supérieure digne de ce nom doit être le socle inébranlable sur lequel repose l'élévation personnelle, professionnelle et collective.
          </p>
        </div>

        {/* Navigation interactive des 4 piliers */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '12px',
          marginBottom: '2rem'
        }}>
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '1.25rem 1.5rem',
                  borderRadius: 'var(--radius-md)',
                  background: isSelected ? 'var(--hz-navy-900)' : 'var(--bg-surface)',
                  color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
                  border: isSelected ? '1px solid var(--hz-gold-primary)' : '1px solid var(--border-subtle)',
                  boxShadow: isSelected ? 'var(--shadow-gold)' : 'var(--shadow-sm)',
                  transition: 'all var(--transition-fast)',
                  textAlign: 'left'
                }}
              >
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: isSelected ? 'var(--hz-gold-primary)' : 'var(--hz-gold-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <TabIcon size={20} color={isSelected ? '#071526' : 'var(--hz-gold-primary)'} />
                </div>
                <div>
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: '800',
                    letterSpacing: '0.04em',
                    color: isSelected ? '#FFFFFF' : 'var(--text-primary)'
                  }}>
                    {tab.title}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: isSelected ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)'
                  }}>
                    Découvrir l'engagement
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Panneau de contenu interactif */}
        <div className="card-glass" style={{ padding: '3rem 2.5rem', border: '1px solid var(--hz-gold-border)' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <span className="badge-official" style={{ textTransform: 'uppercase' }}>
                  {current.title}
                </span>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  Université Horizon
                </span>
              </div>

              <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                {current.subtitle}
              </h3>

              <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                {current.content}
              </p>
            </div>

            <div style={{
              background: 'var(--bg-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{
                fontSize: '0.9375rem',
                fontWeight: '700',
                color: 'var(--text-primary)',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <IconComponent size={18} color="var(--hz-gold-primary)" />
                Directives & Réalisations Concrètes
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {current.highlights.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle2 size={18} color="var(--hz-gold-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
                      {item}
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
