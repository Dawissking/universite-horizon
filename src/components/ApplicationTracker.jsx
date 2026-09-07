import React, { useState, useEffect } from 'react';
import { 
  Search, Clock, CheckCircle2, AlertCircle, FileCheck, 
  ArrowRight, ShieldCheck, HelpCircle, Check 
} from 'lucide-react';

export const ApplicationTracker = ({ searchCode }) => {
  const [queryCode, setQueryCode] = useState(searchCode || '');
  const [activeDossier, setActiveDossier] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (searchCode) {
      setQueryCode(searchCode);
      handleSearch(searchCode);
    }
  }, [searchCode]);

  const timelineSteps = [
    { title: "Dossier Créé", desc: "Formulaire initial validé par le candidat" },
    { title: "Dossier Reçu", desc: "Prise en charge par le bureau des admissions" },
    { title: "En Vérification", desc: "Authentification des diplômes et relevés" },
    { title: "Dossier Complet", desc: "Pièces conformes, transmission au jury" },
    { title: "Décision d'Admission", desc: "Avis favorable émis par la commission" },
    { title: "Inscription & Badge", desc: "Délivrance de la carte d'étudiant Horizon" }
  ];

  const handleSearch = (codeToSearch) => {
    const target = (codeToSearch || queryCode).trim().toUpperCase();
    if (!target) {
      setErrorMsg("Veuillez saisir votre identifiant de dossier (ex: HZ-2026-9842).");
      setActiveDossier(null);
      return;
    }

    // Recherche dans le localStorage
    const localDossiers = JSON.parse(localStorage.getItem('hz_dossiers') || '[]');
    const foundLocal = localDossiers.find(d => d.id.toUpperCase() === target);

    if (foundLocal) {
      setActiveDossier({
        id: foundLocal.id,
        applicant: foundLocal.applicant || "Candidat Horizon",
        course: foundLocal.courseTitle,
        currentStepIndex: 2,
        status: "En cours d'instruction",
        statusType: "progress",
        lastUpdate: "Aujourd'hui",
        notes: "Les pièces justificatives sont en cours d'authentification auprès du service de scolarité."
      });
      setErrorMsg('');
    } else {
      setErrorMsg("Aucun dossier correspondant à cet identifiant n'a été trouvé. Veuillez vérifier la saisie ou contacter l'administration.");
      setActiveDossier(null);
    }
  };

  return (
    <section id="tracker" className="hz-section" style={{ background: 'var(--bg-surface)' }}>
      <div className="hz-container">
        
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag">
            <Clock size={14} />
            Transparence Administrative
          </div>
          <h2 className="section-title">
            Où en est ma Candidature ?
          </h2>
          <p className="section-subtitle">
            Consultez en temps réel l'avancement de l'instruction de votre dossier auprès du service officiel de scolarité de l'Université Horizon.
          </p>
        </div>

        {/* Console de recherche */}
        <div style={{
          maxWidth: '680px',
          margin: '0 auto 3rem',
          background: 'var(--bg-subtle)',
          padding: '1.75rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-medium)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <label style={{ fontSize: '0.8125rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
            Saisissez votre numéro de candidature
          </label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Ex: HZ-2026-9842 ou HZ-DEMO"
              value={queryCode}
              onChange={(e) => { setQueryCode(e.target.value); setErrorMsg(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              style={{
                flex: '1 1 240px',
                padding: '0.875rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                fontWeight: '600',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
            <button
              onClick={() => handleSearch()}
              className="btn btn-primary"
              style={{ minWidth: '160px' }}
            >
              <Search size={18} />
              <span>Vérifier l'état</span>
            </button>
          </div>

          {errorMsg && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '1rem', color: 'var(--hz-red-primary)', fontSize: '0.875rem' }}>
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Affichage de la Timeline Interactive */}
        {activeDossier && (
          <div className="card-glass" style={{ maxWidth: '880px', margin: '0 auto', border: '2px solid var(--hz-gold-border)', padding: '2.5rem' }}>
            
            {/* Fiche d'identification */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '2rem',
              paddingBottom: '1.5rem',
              borderBottom: '1px solid var(--border-subtle)'
            }}>
              <div>
                <span className="badge-official" style={{ marginBottom: '6px' }}>
                  DOSSIER ACTIF : {activeDossier.id}
                </span>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                  {activeDossier.applicant}
                </h3>
                <div style={{ fontSize: '0.9375rem', color: 'var(--hz-gold-primary)', fontWeight: '600' }}>
                  {activeDossier.course}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  background: activeDossier.statusType === 'success' ? '#D1FAE5' : 'var(--hz-gold-bg)',
                  color: activeDossier.statusType === 'success' ? '#065F46' : 'var(--hz-gold-primary)',
                  fontWeight: '700',
                  fontSize: '0.8125rem',
                  display: 'inline-block'
                }}>
                  {activeDossier.status}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Dernière mise à jour : {activeDossier.lastUpdate}
                </div>
              </div>
            </div>

            {/* Timeline en 6 jalons */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Frise Chronologique d'Instruction
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '1rem',
                position: 'relative'
              }}>
                {timelineSteps.map((s, idx) => {
                  const isDone = idx <= activeDossier.currentStepIndex;
                  const isCurrent = idx === activeDossier.currentStepIndex;

                  return (
                    <div key={idx} style={{ textAlign: 'center', position: 'relative' }}>
                      <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        background: isDone 
                          ? (isCurrent ? 'var(--hz-gold-primary)' : 'var(--hz-navy-900)')
                          : 'var(--bg-subtle)',
                        color: isDone ? '#FFFFFF' : 'var(--text-muted)',
                        border: isCurrent ? '3px solid var(--hz-gold-light)' : '1px solid var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 10px',
                        boxShadow: isCurrent ? 'var(--shadow-gold)' : 'none',
                        transition: 'all var(--transition-fast)'
                      }}>
                        {isDone ? <Check size={18} /> : <span style={{ fontSize: '0.875rem', fontWeight: '700' }}>{idx + 1}</span>}
                      </div>

                      <div style={{
                        fontSize: '0.8125rem',
                        fontWeight: isDone ? '700' : '500',
                        color: isDone ? 'var(--text-primary)' : 'var(--text-muted)',
                        marginBottom: '4px'
                      }}>
                        {s.title}
                      </div>

                      <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>
                        {s.desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Note de la scolarité */}
            <div style={{
              background: 'var(--bg-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            }}>
              <ShieldCheck size={20} color="var(--hz-gold-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '0.8125rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '2px' }}>
                  Avis du Service des Admissions :
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {activeDossier.notes}
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
