import React, { useState } from 'react';
import { COURSES, DOMAINS } from '../data/horizonData';
import { 
  GitBranch, Check, ArrowDown, Printer, Download, 
  Sparkles, GraduationCap, Briefcase, Award, CheckCircle2 
} from 'lucide-react';

export const PathSimulator = ({ onOpenApply }) => {
  const [selectedEntry, setSelectedEntry] = useState('bac');
  const [selectedCourseId, setSelectedCourseId] = useState(COURSES[0].id);
  const [selectedPoursuite, setSelectedPoursuite] = useState('master');
  const [selectedStage, setSelectedStage] = useState('cabinet');

  const activeCourse = COURSES.find(c => c.id === selectedCourseId) || COURSES[0];

  const pathways = [
    {
      stepNumber: "01",
      title: "Point de Départ",
      badge: "Entrée",
      detail: selectedEntry === 'bac' ? "Baccalauréat Scientifique, Économique ou Littéraire" : "Professionnel ou Reconversion",
      icon: GraduationCap,
      color: "var(--hz-navy-800)"
    },
    {
      stepNumber: "02",
      title: "Formation Horizon",
      badge: activeCourse.type === 'accelerated' ? "Certificat Accéléré" : activeCourse.level,
      detail: activeCourse.title,
      icon: Award,
      color: "var(--hz-gold-primary)"
    },
    {
      stepNumber: "03",
      title: "Immersion & Stage",
      badge: "Pratique",
      detail: selectedStage === 'cabinet' 
        ? "Stage professionnel en entreprise ou cabinet partenaire"
        : "Mission terrain d'évaluation ou projet entrepreneurial tutoré",
      icon: Briefcase,
      color: "#2563EB"
    },
    {
      stepNumber: "04",
      title: "Cap & Métier Cible",
      badge: "Horizon de Sortie",
      detail: activeCourse.careers[0] || "Cadre d'entreprise qualifié",
      icon: Sparkles,
      color: "#10B981"
    }
  ];

  return (
    <section id="simulateur" className="hz-section" style={{ background: 'var(--bg-surface)' }}>
      <div className="hz-container">
        
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag">
            <GitBranch size={14} />
            Simulateur Visuel de Cursus
          </div>
          <h2 className="section-title">
            Mon Horizon Architect™
          </h2>
          <p className="section-subtitle">
            Projetez et construisez graphiquement les étapes charnières de votre parcours, du premier jour de cours jusqu'à votre premier poste de responsabilité.
          </p>
        </div>

        {/* Console de configuration du parcours */}
        <div style={{
          background: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          border: '1px solid var(--border-medium)',
          marginBottom: '3rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem'
          }}>
            {/* Étape 1 : Niveau d'entrée */}
            <div>
              <label style={{ fontSize: '0.8125rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                1. Votre Diplôme d'Entrée
              </label>
              <select
                value={selectedEntry}
                onChange={(e) => setSelectedEntry(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-surface)',
                  color: 'var(--text-primary)'
                }}
              >
                <option value="bac">Baccalauréat (Toutes séries)</option>
                <option value="pro">Professionnel / Validation des acquis</option>
              </select>
            </div>

            {/* Étape 2 : Choix de la formation */}
            <div>
              <label style={{ fontSize: '0.8125rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                2. Filière Souhaitée
              </label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-surface)',
                  color: 'var(--text-primary)'
                }}
              >
                {COURSES.map(c => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>

            {/* Étape 3 : Format de stage */}
            <div>
              <label style={{ fontSize: '0.8125rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                3. Modalité d'Immersion
              </label>
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-surface)',
                  color: 'var(--text-primary)'
                }}
              >
                <option value="cabinet">Stage conventionné en entreprise / cabinet</option>
                <option value="projet">Projet tutoré d'innovation sur cas réel</option>
              </select>
            </div>
          </div>
        </div>

        {/* Représentation Graphique de la Progression */}
        <div className="card-glass" style={{ border: '2px solid var(--hz-gold-border)', padding: '3rem 2rem', marginBottom: '2rem' }}>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            position: 'relative'
          }}>
            {pathways.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div 
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    position: 'relative'
                  }}
                >
                  {/* Pastille numérotée */}
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'var(--bg-surface)',
                    border: `3px solid ${step.color}`,
                    boxShadow: 'var(--shadow-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    position: 'relative',
                    zIndex: 2
                  }}>
                    <StepIcon size={28} color={step.color} />
                  </div>

                  <span className="badge-official" style={{ marginBottom: '8px' }}>
                    {step.badge}
                  </span>

                  <div style={{ fontSize: '1.125rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {step.title}
                  </div>

                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, maxWidth: '220px' }}>
                    {step.detail}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Synthèse des Compétences Débloquées */}
          <div style={{
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-subtle)',
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem'
          }}>
            <div style={{ fontSize: '0.875rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--hz-gold-primary)', marginBottom: '10px' }}>
              Compétences et Atouts Validés à l'Issue de ce Parcours :
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {activeCourse.skills.map((skill, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-surface)', padding: '6px 12px', borderRadius: 'var(--radius-sm)', fontSize: '0.8125rem', fontWeight: '600' }}>
                  <CheckCircle2 size={14} color="var(--hz-gold-primary)" />
                  <span>{skill}</span>
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-surface)', padding: '6px 12px', borderRadius: 'var(--radius-sm)', fontSize: '0.8125rem', fontWeight: '600' }}>
                <CheckCircle2 size={14} color="var(--hz-gold-primary)" />
                <span>Diplôme Officiel Reconnu par l'État</span>
              </div>
            </div>
          </div>

          {/* Actions d'Export & Candidature */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <button
              onClick={() => window.print()}
              className="btn btn-secondary btn-sm"
            >
              <Printer size={16} />
              Imprimer / Sauvegarder ce parcours
            </button>

            <button
              onClick={() => onOpenApply(activeCourse)}
              className="btn btn-gold"
            >
              <GraduationCap size={18} />
              Candidater sur ce parcours
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
