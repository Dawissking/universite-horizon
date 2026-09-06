import React, { useState } from 'react';
import { 
  Award, Users, Lightbulb, Globe, Briefcase, UserCheck, 
  ChevronRight, Check, Sparkles 
} from 'lucide-react';

export const Differentiators = () => {
  const [selectedDiff, setSelectedDiff] = useState(0);

  const differentiators = [
    {
      id: "qualite",
      title: "Enseignement de Qualité",
      icon: Award,
      tag: "Standards Académiques",
      summary: "Une rigueur d'apprentissage calquée sur les meilleurs référentiels pédagogiques.",
      description: "À l'Université Horizon, chaque cursus est conçu pour allier socle théorique fondamental et maîtrise des outils contemporains. Nos diplômes sont scrupuleusement reconnus par l'État malien et respectent les exigences du schéma LMD.",
      stats: "100%",
      statsLabel: "Conformité aux normes officielles",
      points: [
        "Syllabus actualisés selon les évolutions du marché du travail",
        "Évaluations formatives continues et examens surveillés",
        "Ressources documentaires et numériques enrichies"
      ]
    },
    {
      id: "encadrement",
      title: "Encadrement Rapproché",
      icon: Users,
      tag: "Suivi Personnalisé",
      summary: "L'étudiant n'est jamais un numéro : chaque parcours fait l'objet d'un tutorat attentif.",
      description: "Nous limitons délibérément les effectifs par groupe de travaux dirigés pour permettre une interaction directe et vivante entre l'enseignant et l'étudiant. Des séances de remédiation et de mentorat sont intégrées au calendrier.",
      stats: "1 : 15",
      statsLabel: "Ratio encadrement moyen en travaux pratiques",
      points: [
        "Tuteurs académiques dédiés dès la première année",
        "Disponibilité permanente des enseignants pour les questions méthodologiques",
        "Dispositif d'écoute et d'orientation bienveillante"
      ]
    },
    {
      id: "innovation",
      title: "Culture de l'Innovation",
      icon: Lightbulb,
      tag: "Technologies & Futur",
      summary: "Intégrer les technologies émergentes et l'esprit entrepreneurial au cœur de chaque filière.",
      description: "Que vous soyez en droit, en gestion ou en informatique, vous apprenez à manipuler les outils numériques de pointe, l'analyse de données et les plateformes collaboratives indispensables aux leaders de la décennie.",
      stats: "100%",
      statsLabel: "Campus connectés haut débit",
      points: [
        "Laboratoires informatiques équipés de logiciels métiers",
        "Ateliers d'initiation au codage et aux outils no-code pour tous les domaines",
        "Incubation et soutien aux projets d'entrepreneuriat étudiant"
      ]
    },
    {
      id: "international",
      title: "Ouverture Internationale",
      icon: Globe,
      tag: "Plafond Sans Frontières",
      summary: "Une vision panafricaine et mondiale pour penser au-delà des frontières locales.",
      description: "L'Afrique est le carrefour de la croissance mondiale. Nos formations intègrent des études de cas internationales, la pratique intensive de l'anglais professionnel et des conférences animées par des experts de la sous-région et du monde entier.",
      stats: "Bilinguisme",
      statsLabel: "Module d'anglais professionnel dans chaque filière",
      points: [
        "Conférences et webinaires avec des spécialistes internationaux",
        "Préparation aux certifications linguistiques professionnelles",
        "Étude comparative des droits et modèles économiques régionaux (UEMOA/CEDEAO)"
      ]
    },
    {
      id: "pratique",
      title: "Approche Pratique & Métier",
      icon: Briefcase,
      tag: "Opérationnalité Immédiate",
      summary: "Des cas réels d'entreprises, des projets tutorés et des mises en situation constantes.",
      description: "Nos étudiants ne se contentent pas d'écouter : ils simulent des dédouanements en transit douane, rédigent des bilans SYSCOHADA, conçoivent des architectures réseau réelles et auditent des systèmes QHSE sur le terrain.",
      stats: "70%",
      statsLabel: "Volume horaire d'ateliers pratiques et cas concrets",
      points: [
        "Interventions régulières de praticiens et directeurs en activité",
        "Projets de fin d'études axés sur un problème concret d'une entreprise partenaire",
        "Mises en situation professionnelles chronométrées"
      ]
    },
    {
      id: "accompagnement",
      title: "Accompagnement Professionnel",
      icon: UserCheck,
      tag: "Insertion Durable",
      summary: "Du premier jour au premier contrat : un tremplin structuré vers l'employabilité.",
      description: "Le pôle Carrières de l'Université Horizon assiste chaque étudiant dans la rédaction de son CV, la préparation des entretiens d'embauche et la recherche de stages obligatoires en entreprises, ONG ou institutions publiques.",
      stats: "Obligatoire",
      statsLabel: "Stage en entreprise intégré à chaque cycle",
      points: [
        "Ateliers de développement personnel et de prise de parole en public",
        "Job dating annuel et rencontres directes avec les recruteurs",
        "Réseau solidaire des diplômés et entraide inter-promotions"
      ]
    }
  ];

  const current = differentiators[selectedDiff];
  const IconCmp = current.icon;

  return (
    <section className="hz-section" style={{ background: 'var(--bg-surface)' }}>
      <div className="hz-container">
        
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag">
            <Sparkles size={14} />
            Nos Différenciateurs
          </div>
          <h2 className="section-title">
            Pourquoi Choisir l'Université Horizon ?
          </h2>
          <p className="section-subtitle">
            Découvrez les 6 engagements concrets qui font de l'expérience Horizon une aventure académique et humaine unique en son genre.
          </p>
        </div>

        {/* Disposition interactive à deux colonnes */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          alignItems: 'stretch'
        }}>
          
          {/* Liste interactive des différenciateurs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {differentiators.map((diff, idx) => {
              const isSelected = selectedDiff === idx;
              const DiffIcon = diff.icon;
              return (
                <button
                  key={diff.id}
                  onClick={() => setSelectedDiff(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.125rem 1.5rem',
                    borderRadius: 'var(--radius-md)',
                    background: isSelected ? 'var(--hz-navy-900)' : 'var(--bg-main)',
                    color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
                    border: isSelected ? '1px solid var(--hz-gold-primary)' : '1px solid var(--border-subtle)',
                    boxShadow: isSelected ? 'var(--shadow-gold)' : 'none',
                    textAlign: 'left',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: isSelected ? 'var(--hz-gold-primary)' : 'var(--hz-gold-bg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <DiffIcon size={18} color={isSelected ? '#071526' : 'var(--hz-gold-primary)'} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.9375rem', fontWeight: '700' }}>
                        {diff.title}
                      </div>
                      <div style={{ 
                        fontSize: '0.75rem', 
                        color: isSelected ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)' 
                      }}>
                        {diff.tag}
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={18} color={isSelected ? 'var(--hz-gold-light)' : 'var(--text-muted)'} />
                </button>
              );
            })}
          </div>

          {/* Panneau de détail du différenciateur sélectionné */}
          <div className="card-glass" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'var(--bg-subtle)',
            border: '2px solid var(--hz-gold-border)'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '10px' }}>
                <span className="badge-official">
                  DIFFÉRENCIATEUR {selectedDiff + 1} / {differentiators.length}
                </span>
                <span style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--hz-gold-primary)' }}>
                  {current.tag}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1rem' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'var(--hz-navy-900)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--hz-gold-light)'
                }}>
                  <IconCmp size={24} />
                </div>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>
                  {current.title}
                </h3>
              </div>

              <p style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.5 }}>
                {current.summary}
              </p>

              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                {current.description}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '2rem' }}>
                {current.points.map((pt, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: 'var(--hz-gold-bg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Check size={12} color="var(--hz-gold-primary)" />
                    </div>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      {pt}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Encadré indicateur de performance */}
            <div style={{
              background: 'var(--bg-surface)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem 1.5rem',
              border: '1px solid var(--border-medium)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--hz-gold-primary)', lineHeight: 1 }}>
                  {current.stats}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {current.statsLabel}
                </div>
              </div>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: '700',
                color: 'var(--text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Label Horizon
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
