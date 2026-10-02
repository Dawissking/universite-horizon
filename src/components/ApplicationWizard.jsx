import React, { useState, useEffect } from 'react';
import { COURSES } from '../data/horizonData';
import { 
  CheckCircle, ArrowRight, ArrowLeft, Upload, FileText, 
  ShieldCheck, AlertCircle, X, Sparkles, Copy, Check 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitApplication, DOC_KEYS, validateDocument } from '../lib/api';

export const ApplicationWizard = ({ isOpen, onClose, initialCourse, onGoToTracker }) => {
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const [dossierId, setDossierId] = useState('');

  const [formData, setFormData] = useState({
    // Étape 1 : Infos personnelles
    civility: 'M.',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    nationality: 'Malienne',
    // Étape 2 : Choix formation
    courseId: initialCourse ? initialCourse.id : COURSES[0].id,
    campus: 'bamako',
    // Étape 3 : Parcours académique
    lastDegree: 'Baccalauréat',
    serieBac: 'TSS',
    highSchool: '',
    yearGraduation: '2026',
    // Étape 4 : Documents (fichiers réels)
    documents: {},
    // Étape 5 & 6 : Engagement
    honorDeclaration: false
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [docErrors, setDocErrors] = useState({});

  /** Sélectionne et valide un fichier pour une pièce du dossier. */
  const handleDocChange = (key, file) => {
    setDocErrors((prev) => ({ ...prev, [key]: '' }));
    if (!file) {
      setFormData((f) => ({ ...f, documents: { ...f.documents, [key]: null } }));
      return;
    }
    const check = validateDocument(file, key);
    if (!check.ok) {
      setDocErrors((prev) => ({ ...prev, [key]: check.message }));
      setFormData((f) => ({ ...f, documents: { ...f.documents, [key]: null } }));
      return;
    }
    setFormData((f) => ({ ...f, documents: { ...f.documents, [key]: file } }));
  };

  useEffect(() => {
    if (initialCourse) {
      setFormData(prev => ({ ...prev, courseId: initialCourse.id }));
    }
  }, [initialCourse]);

  if (!isOpen) return null;

  const stepsNames = [
    "Identité",
    "Formation",
    "Parcours",
    "Documents",
    "Vérification",
    "Validation",
    "Confirmation"
  ];

  const handleNext = () => {
    if (step === 6) {
      setSubmitting(true);
      setSubmitError('');
      submitApplication(
        {
          civility: formData.civility,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          birthDate: formData.birthDate,
          nationality: formData.nationality,
          courseId: formData.courseId,
          lastDegree: formData.lastDegree,
          serieBac: formData.serieBac,
          highSchool: formData.highSchool,
        },
        DOC_KEYS.map(({ key }) => ({ key, file: formData.documents[key] }))
      )
        .then((result) => {
          setDossierId(result.reference);
          try {
            confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
          } catch (e) {
            // Confettis indisponibles : la candidature est déjà enregistrée
          }
          setStep(prev => prev + 1);
        })
        .catch((error) => {
          setSubmitError(
            error?.message || "Une erreur est survenue. Vérifiez votre connexion et réessayez."
          );
          setSubmitting(false);
        });
      return;
    }
    setStep(prev => prev + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(prev => prev - 1);
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(dossierId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '840px', padding: '2.5rem' }}>
        
        {/* Entête du Wizard */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <span className="badge-official">
              CANDIDATURE OFFICIELLE EN LIGNE
            </span>
            <h2 style={{ fontSize: '1.75rem', marginTop: '6px', color: 'var(--text-primary)' }}>
              Rejoindre l'Université Horizon
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--bg-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} color="var(--text-secondary)" />
          </button>
        </div>

        {/* Barre de progression des 7 étapes */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px',
            fontSize: '0.8125rem',
            fontWeight: '700',
            color: 'var(--text-muted)'
          }}>
            <span>Étape {step} sur 7 : {stepsNames[step - 1]}</span>
            <span>{Math.round((step / 7) * 100)}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'var(--bg-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{
              width: `${(step / 7) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, var(--hz-navy-900) 0%, var(--hz-gold-primary) 100%)',
              transition: 'width 250ms ease'
            }} />
          </div>
        </div>

        {/* CONTENU DE L'ÉTAPE */}
        <div style={{ minHeight: '340px' }}>
          
          {/* ÉTAPE 1 : Identité */}
          {step === 1 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                01. Informations Personnelles du Candidat
              </h3>
              <div className="grid-2" style={{ gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Civilité</label>
                  <select
                    value={formData.civility}
                    onChange={(e) => setFormData({ ...formData, civility: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)' }}
                  >
                    <option value="M.">Monsieur (M.)</option>
                    <option value="Mme">Madame (Mme)</option>
                    <option value="Mlle">Mademoiselle (Mlle)</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Nationalité</label>
                  <input
                    type="text"
                    value={formData.nationality}
                    onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Prénom</label>
                  <input
                    type="text"
                    placeholder="Ex: Ibrahim"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Nom de famille</label>
                  <input
                    type="text"
                    placeholder="Ex: Traoré"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Adresse Email</label>
                  <input
                    type="email"
                    placeholder="candidat@exemple.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Numéro Téléphone / WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="+223 XX XX XX XX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ÉTAPE 2 : Choix de formation */}
          {step === 2 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                02. Sélection de la Filière & du Campus
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Formation Ciblée</label>
                  <select
                    value={formData.courseId}
                    onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                    style={{ width: '100%', padding: '0.875rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)' }}
                  >
                    {COURSES.map(c => (
                      <option key={c.id} value={c.id}>
                        [{c.type === 'accelerated' ? 'Accélérée' : 'Diplômante LMD'}] {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Campus d'Étude Préféré</label>
                  <div className="grid-2">
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '1rem',
                      borderRadius: 'var(--radius-md)',
                      background: formData.campus === 'bamako' ? 'var(--hz-gold-bg)' : 'var(--bg-main)',
                      border: formData.campus === 'bamako' ? '2px solid var(--hz-gold-primary)' : '1px solid var(--border-subtle)',
                      cursor: 'pointer'
                    }}>
                      <input
                        type="radio"
                        name="campus"
                        checked={formData.campus === 'bamako'}
                        onChange={() => setFormData({ ...formData, campus: 'bamako' })}
                      />
                      <div>
                        <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>Campus Principal - Bamako</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Amphithéâtres & Labos Tech</div>
                      </div>
                    </label>

                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '1rem',
                      borderRadius: 'var(--radius-md)',
                      background: formData.campus === 'golf' ? 'var(--hz-gold-bg)' : 'var(--bg-main)',
                      border: formData.campus === 'golf' ? '2px solid var(--hz-gold-primary)' : '1px solid var(--border-subtle)',
                      cursor: 'pointer'
                    }}>
                      <input
                        type="radio"
                        name="campus"
                        checked={formData.campus === 'golf'}
                        onChange={() => setFormData({ ...formData, campus: 'golf' })}
                      />
                      <div>
                        <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>Campus Horizon Golf</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Management & Formations Pro</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ÉTAPE 3 : Parcours académique */}
          {step === 3 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                03. Parcours Académique Antérieur
              </h3>
              <div className="grid-2" style={{ gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Dernier diplôme obtenu</label>
                  <select
                    value={formData.lastDegree}
                    onChange={(e) => setFormData({ ...formData, lastDegree: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)' }}
                  >
                    <option value="Baccalauréat">Baccalauréat malien</option>
                    <option value="BacEtranger">Baccalauréat étranger reconnu</option>
                    <option value="DUT_BTS">DUT / BTS / DEUG (Bac+2)</option>
                    <option value="Licence">Licence (Bac+3)</option>
                    <option value="Professionnel">Expérience professionnelle équivalente</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Série du Baccalauréat</label>
                  <input
                    type="text"
                    placeholder="Ex: Sciences Exactes, TSS, Langues..."
                    value={formData.serieBac}
                    onChange={(e) => setFormData({ ...formData, serieBac: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Lycée ou Établissement de provenance</label>
                  <input
                    type="text"
                    placeholder="Nom du lycée ou de l'institut précédent"
                    value={formData.highSchool}
                    onChange={(e) => setFormData({ ...formData, highSchool: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ÉTAPE 4 : Documents requis */}
          {step === 4 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                04. Dépôt des Pièces Justificatives
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Téléversez vos documents sous format PDF ou JPEG (taille max: 5 Mo par pièce).
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {DOC_KEYS.map((doc) => {
                  const file = formData.documents[doc.key];
                  const err = docErrors[doc.key];
                  return (
                    <div
                      key={doc.key}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        flexWrap: 'wrap',
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-md)',
                        background: err ? 'rgba(220,38,38,0.06)' : 'var(--bg-main)',
                        border: `1px ${err ? 'solid' : 'dashed'} ${err ? 'rgba(220,38,38,0.45)' : 'var(--border-medium)'}`
                      }}
                    >
                      <div style={{ minWidth: 0, flex: '1 1 240px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <FileText size={18} color="var(--hz-gold-primary)" style={{ flexShrink: 0 }} />
                          <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                            {doc.label}
                          </span>
                        </div>
                        {file ? (
                          <div style={{ fontSize: '0.78rem', color: '#059669', marginTop: '5px', marginLeft: '28px', wordBreak: 'break-all' }}>
                            {file.name} — {(file.size / 1024).toFixed(0)} Ko
                          </div>
                        ) : err ? (
                          <div style={{ fontSize: '0.78rem', color: '#DC2626', marginTop: '5px', marginLeft: '28px' }}>
                            {err}
                          </div>
                        ) : (
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-400)', marginTop: '5px', marginLeft: '28px' }}>
                            Aucun fichier sélectionné
                          </div>
                        )}
                      </div>

                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        {file && (
                          <button
                            type="button"
                            onClick={() => handleDocChange(doc.key, null)}
                            className="btn btn-secondary btn-sm"
                            aria-label={`Retirer ${doc.label}`}
                          >
                            Retirer
                          </button>
                        )}
                        <label className={`btn btn-sm ${file ? 'btn-outline' : 'btn-primary'}`} style={{ cursor: 'pointer' }}>
                          <Upload size={14} />
                          <span>{file ? 'Remplacer' : 'Choisir un fichier'}</span>
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                            onChange={(e) => handleDocChange(doc.key, e.target.files?.[0])}
                            style={{ display: 'none' }}
                            aria-label={doc.label}
                          />
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ÉTAPE 5 : Vérification */}
          {step === 5 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                05. Récapitulatif de Votre Dossier
              </h3>
              
              <div style={{
                background: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Candidat :</span>
                  <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                    {formData.civility} {formData.firstName || 'Candidat'} {formData.lastName} ({formData.nationality})
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Filière Choisie :</span>
                  <div style={{ fontSize: '0.9375rem', fontWeight: '600', color: 'var(--hz-gold-primary)' }}>
                    {(COURSES.find(c => c.id === formData.courseId) || {}).title}
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                    Campus : {formData.campus === 'bamako' ? 'Campus Principal Bamako' : 'Campus Horizon Golf'}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Contact :</span>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    {formData.email || 'Non renseigné'} • {formData.phone || 'Non renseigné'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ÉTAPE 6 : Validation */}
          {step === 6 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                06. Déclaration sur l'Honneur & Envoi
              </h3>
              
              <div style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-main)',
                border: '1px solid var(--border-medium)',
                marginBottom: '1.5rem'
              }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.honorDeclaration}
                    onChange={(e) => setFormData({ ...formData, honorDeclaration: e.target.checked })}
                    style={{ marginTop: '4px' }}
                  />
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    Je certifie sur l'honneur l'exactitude des informations transmises et reconnais que toute fausse déclaration entraînera l'annulation de plein droit de mon dossier de candidature conformément au règlement de l'Université Horizon.
                  </span>
                </label>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', background: 'var(--hz-gold-bg)', borderRadius: 'var(--radius-sm)' }}>
                <ShieldCheck size={20} color="var(--hz-gold-primary)" />
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-primary)' }}>
                  Traitement garanti sécurisé et confidentiel par le service officiel des admissions.
                </span>
              </div>

              {submitError && (
                <div
                  role="alert"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    marginTop: '1rem',
                    padding: '12px 16px',
                    background: 'rgba(220,38,38,0.08)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(220,38,38,0.35)'
                  }}
                >
                  <AlertCircle size={18} color="#DC2626" style={{ flexShrink: 0, marginTop: '1px' }} />
                  <span style={{ fontSize: '0.875rem', color: '#DC2626' }}>{submitError}</span>
                </div>
              )}
            </div>
          )}

          {/* ÉTAPE 7 : Confirmation */}
          {step === 7 && (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--hz-gold-bg)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <Sparkles size={32} color="var(--hz-gold-primary)" />
              </div>

              <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
                Félicitations ! Votre Dossier est Enregistré
              </h3>

              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
                Votre candidature a été transmise à la commission d'admission de l'Université Horizon. Conservez précieusement votre identifiant de dossier pour suivre son instruction.
              </p>

              {/* Numéro de dossier généré */}
              <div style={{
                background: 'var(--bg-subtle)',
                border: '2px dashed var(--hz-gold-primary)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '14px',
                marginBottom: '2rem'
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    IDENTIFIANT UNIQUE DE CANDIDATURE
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--hz-navy-900)', letterSpacing: '0.05em' }}>
                    {dossierId}
                  </div>
                </div>

                <button
                  onClick={handleCopyId}
                  className="btn btn-secondary btn-sm"
                  title="Copier le code"
                >
                  {copied ? <Check size={16} color="#10B981" /> : <Copy size={16} />}
                  <span>{copied ? "Copié !" : "Copier"}</span>
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => {
                    onClose();
                    if (onGoToTracker) onGoToTracker(dossierId);
                  }}
                  className="btn btn-primary"
                >
                  Accéder au Suivi de Candidature
                </button>
                <button
                  onClick={onClose}
                  className="btn btn-secondary"
                >
                  Terminer
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Boutons de navigation du Wizard */}
        {step < 7 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
            <button
              onClick={handlePrev}
              disabled={step === 1}
              className="btn btn-secondary btn-sm"
              style={{ opacity: step === 1 ? 0.4 : 1, cursor: step === 1 ? 'not-allowed' : 'pointer' }}
            >
              <ArrowLeft size={16} />
              Précédent
            </button>

            <button
              onClick={handleNext}
              disabled={submitting || (step === 6 && !formData.honorDeclaration)}
              className="btn btn-gold"
            >
              <span>{step === 6 ? (submitting ? "Transmission en cours…" : "Confirmer et Transmettre") : "Étape Suivante"}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
