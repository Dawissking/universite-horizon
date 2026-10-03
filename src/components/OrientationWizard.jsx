import React, { useState } from 'react';
import { COURSES, DOMAINS } from '../data/horizonData';
import { 
  Compass, ArrowRight, ArrowLeft, CheckCircle2, AlertTriangle, 
  Sparkles, RotateCcw, Printer, GraduationCap, Briefcase, Award 
} from 'lucide-react';

export const OrientationWizard = ({ onOpenApply, onOpenCourseDetails }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    level: '',
    interests: [],
    subjects: [],
    workType: '',
    approach: '',
    goal: '',
    duration: ''
  });

  const questions = [
    {
      id: 'level',
      title: 'Quel est votre niveau d’étude actuel ?',
      subtitle: 'Pour adapter les cursus éligibles à votre profil académique.',
      type: 'single',
      options: [
        { label: 'Élève en Terminale / Futurs Bacheliers', value: 'terminale' },
        { label: 'Titulaire du Baccalauréat', value: 'bac' },
        { label: 'Bac +1 / Bac +2 (En réorientation)', value: 'bac2' },
        { label: 'Licence validée (Bac +3)', value: 'licence' },
        { label: 'Professionnel en activité / Sans diplôme formel', value: 'pro' }
      ]
    },
    {
      id: 'interests',
      title: 'Quels sont vos centres d’intérêt majeurs ?',
      subtitle: 'Sélectionnez jusqu’à 3 domaines qui vous passionnent.',
      type: 'multiple',
      maxSelect: 3,
      options: [
        { label: 'Informatique, Code & Intelligence Artificielle', value: 'tech' },
        { label: 'Gestion d’entreprise, Finance & Comptabilité', value: 'finance' },
        { label: 'Banque, Assurance & Marchés financiers', value: 'banque' },
        { label: 'Commerce international, Transit & Logistique', value: 'transit' },
        { label: 'Passation des marchés publics', value: 'marches' },
        { label: 'Droit, Justice & Institutions politiques', value: 'droit' },
        { label: 'Relation Internationnelle & Coopération', value: 'ri' },
        { label: 'Marketing Digital, Communication & Commerce', value: 'comm' },
        { label: 'Gestion de projet & Pilotage', value: 'projets' },
        { label: 'Management des Ressources Humaines', value: 'rh' },
        { label: 'Réseaux & Télécommunications', value: 'telecom' },
        { label: 'Énergies renouvelables & environnement', value: 'energie' },
        { label: 'Action humanitaire, Solidarité & ONG', value: 'humanitaire' },
        { label: 'Santé, Soins & Bien-être des populations', value: 'sante' },
        { label: 'Hygiène, Sécurité & Environnement (QHSE)', value: 'qhse' }
      ]
    },
    {
      id: 'subjects',
      title: 'Quelles matières préférez-vous ?',
      subtitle: 'Les disciplines où vous vous sentez le plus à l’aise.',
      type: 'multiple',
      maxSelect: 2,
      options: [
        { label: 'Mathématiques & Raisonnement logique', value: 'maths' },
        { label: 'Sciences économiques & Comptabilité', value: 'eco' },
        { label: 'Français, Philosophie & Expression écrite', value: 'litteraire' },
        { label: 'Technologies, Informatique & Pratique sur machine', value: 'info' },
        { label: 'Sciences de la vie, Biologie & Anatomie', value: 'bio' },
        { label: 'Sciences humaines, Histoire & Société', value: 'socio' }
      ]
    },
    {
      id: 'workType',
      title: 'Quel type d’environnement de travail vous attire ?',
      subtitle: 'Votre cadre d’épanouissement idéal.',
      type: 'single',
      options: [
        { label: 'Bureau moderne d’entreprise ou institution financière', value: 'corporate' },
        { label: 'Terrain, ports, douanes, chantiers ou missions d’ONG', value: 'field' },
        { label: 'Cabinet juridique, études notariales ou tribunaux', value: 'legal' },
        { label: 'Agence de communication, studio de création ou médias', value: 'creative' },
        { label: 'Start-up technologique, laboratoire informatique', value: 'startup' }
      ]
    },
    {
      id: 'approach',
      title: 'Quelle approche pédagogique préférez-vous ?',
      subtitle: 'Pour calibrer le dosage entre théorie et pratique.',
      type: 'single',
      options: [
        { label: 'Forte dominante pratique, ateliers et immersion métier immédiate', value: 'pratique' },
        { label: 'Équilibre harmonieux entre théorie universitaire et projets concrets', value: 'equilibre' },
        { label: 'Approche académique approfondie visant la recherche ou le Master', value: 'theorique' }
      ]
    },
    {
      id: 'goal',
      title: 'Quel est votre objectif professionnel prioritaire ?',
      subtitle: 'Votre horizon d’accomplissement personnel.',
      type: 'single',
      options: [
        { label: 'Obtenir un emploi rapidement dans un métier porteur', value: 'fast_job' },
        { label: 'Construire un diplôme universitaire reconnu (Bac+3 / Bac+5)', value: 'degree' },
        { label: 'Créer mon entreprise ou mon cabinet d’expertise', value: 'business' },
        { label: 'Monter en compétences pour obtenir une promotion en poste', value: 'upskill' }
      ]
    },
    {
      id: 'duration',
      title: 'Quel format de cursus envisagez-vous ?',
      subtitle: 'Pour vous proposer des parcours adaptés à votre disponibilité.',
      type: 'single',
      options: [
        { label: 'Formation accélérée certifiante (Quelques mois, orientée métier)', value: 'court' },
        { label: 'Cycle universitaire complet (Licence 3 ans)', value: 'long' },
        { label: 'Ouvert aux deux options selon l’adéquation de l’opportunité', value: 'ouvert' }
      ]
    }
  ];

  const handleSelectOption = (questionId, value, isMultiple) => {
    if (isMultiple) {
      const currentList = answers[questionId] || [];
      if (currentList.includes(value)) {
        setAnswers({ ...answers, [questionId]: currentList.filter(v => v !== value) });
      } else {
        const max = questions[currentStep].maxSelect || 3;
        if (currentList.length < max) {
          setAnswers({ ...answers, [questionId]: [...currentList, value] });
        }
      }
    } else {
      setAnswers({ ...answers, [questionId]: value });
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({
      level: '',
      interests: [],
      subjects: [],
      workType: '',
      approach: '',
      goal: '',
      duration: ''
    });
  };

  // Algorithme de calcul du Profil Horizon
  const isFinished = currentStep === questions.length;

  const calculateProfile = () => {
    const interests = answers.interests || [];
    const duration = answers.duration;

    // Rattachement d'une réponse d'intérêt à l'un des domaines clés officiels
    const INTEREST_DOMAIN = {
      tech:       'informatique-ia',
      finance:    'comptabilite-finance-audit',
      banque:     'banque-finance-assurance',
      transit:    'logistique-supply-chain',
      marches:    'marches-publics',
      droit:      'droit-politique',
      ri:         'relation-internationale',
      humanitaire:'relation-internationale',
      comm:       'marketing-digital',
      projets:    'gestion-projets',
      qhse:       'gestion-projets',
      rh:         'management-rh',
      telecom:    'reseaux-telecom',
      energie:    'energie-renouvelable',
      sante:      'sante'
    };

    let domainId = interests.map(i => INTEREST_DOMAIN[i]).find(Boolean);
    if (!domainId) {
      if (answers.subjects.includes('info'))        domainId = 'informatique-ia';
      else if (answers.subjects.includes('bio'))    domainId = 'sante';
      else if (answers.subjects.includes('eco'))    domainId = 'comptabilite-finance-audit';
      else if (answers.subjects.includes('socio'))  domainId = 'droit-politique';
    }

    let recommendedDomain = DOMAINS.find(d => d.id === domainId) || DOMAINS[0];
    let recommendedCourses = domainId
      ? COURSES.filter(c => c.domainId === domainId)
      : COURSES.slice(0, 3);

    if (duration === 'court') {
      const acc = COURSES.filter(c => c.type === 'accelerated');
      if (acc.length > 0) recommendedCourses = acc.slice(0, 3);
    }

    return {
      domain: recommendedDomain,
      courses: recommendedCourses,
      skills: ["Raisonnement analytique", "Maîtrise des outils métiers", "Communication professionnelle", "Gestion des priorités"],
      pathway: duration === 'court' 
        ? "Admission directe sur dossier ➔ Formation intensive pratique ➔ Stage en entreprise ➔ Insertion professionnelle"
        : "Baccalauréat ➔ Licence Universitaire LMD (3 ans) ➔ Stage annuel obligatoire ➔ Insertion ou poursuite en Master",
      nextSteps: [
        "Consulter la fiche détaillée des formations suggérées",
        "Prendre rendez-vous avec un conseiller pédagogique Horizon",
        "Déposer votre dossier de candidature en ligne"
      ]
    };
  };

  const profile = isFinished ? calculateProfile() : null;

  return (
    <section id="orientation" className="hz-section" style={{ background: 'var(--bg-surface)' }}>
      <div className="hz-container">
        
        {/* En-tête de section */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-tag">
            <Compass size={14} />
            Assistant Intelligent d'Orientation
          </div>
          <h2 className="section-title">
            Trouvez Votre Horizon
          </h2>
          <p className="section-subtitle">
            Un questionnaire méthodique pour vous guider vers la filière la plus adaptée à vos ambitions réelles.
          </p>
        </div>

        {/* Encadré d'avertissement éthique - Zéro fausse promesse */}
        <div style={{
          maxWidth: '820px',
          margin: '0 auto 2.5rem',
          padding: '12px 18px',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(192, 57, 43, 0.08)',
          border: '1px solid rgba(192, 57, 43, 0.25)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <AlertTriangle size={20} color="var(--hz-red-primary)" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
            <strong>Note éthique d'orientation :</strong> Cet outil fournit une recommandation informative et pédagogique basée sur vos réponses. Il ne constitue ni une promesse formelle d’emploi ni une décision contractuelle d’admission, laquelle reste soumise à l’examen officiel de votre dossier.
          </span>
        </div>

        {/* Conteneur de l'assistant */}
        <div className="card-glass" style={{ maxWidth: '820px', margin: '0 auto', border: '2px solid var(--hz-gold-border)' }}>
          
          {!isFinished ? (
            <div>
              {/* Barre de progression */}
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  <span>Question {currentStep + 1} sur {questions.length}</span>
                  <span>{Math.round(((currentStep) / questions.length) * 100)}% complété</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'var(--bg-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${((currentStep + 1) / questions.length) * 100}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, var(--hz-navy-900) 0%, var(--hz-gold-primary) 100%)',
                    transition: 'width 300ms ease'
                  }} />
                </div>
              </div>

              {/* Titre de la question */}
              <div style={{ marginBottom: '1.75rem' }}>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '6px' }}>
                  {questions[currentStep].title}
                </h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>
                  {questions[currentStep].subtitle}
                </p>
              </div>

              {/* Liste des options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '2.5rem' }}>
                {questions[currentStep].options.map((opt) => {
                  const qId = questions[currentStep].id;
                  const isMultiple = questions[currentStep].type === 'multiple';
                  const isSelected = isMultiple
                    ? (answers[qId] || []).includes(opt.value)
                    : answers[qId] === opt.value;

                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleSelectOption(qId, opt.value, isMultiple)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1rem 1.25rem',
                        borderRadius: 'var(--radius-md)',
                        background: isSelected ? 'var(--hz-gold-bg)' : 'var(--bg-subtle)',
                        border: isSelected ? '2px solid var(--hz-gold-primary)' : '1px solid var(--border-subtle)',
                        color: 'var(--text-primary)',
                        textAlign: 'left',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      <span style={{ fontSize: '0.9375rem', fontWeight: isSelected ? '700' : '500' }}>
                        {opt.label}
                      </span>
                      <div style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: isMultiple ? '4px' : '50%',
                        border: isSelected ? '2px solid var(--hz-gold-primary)' : '2px solid var(--border-medium)',
                        background: isSelected ? 'var(--hz-gold-primary)' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {isSelected && <CheckCircle2 size={16} color="#FFFFFF" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Boutons de navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="btn btn-secondary btn-sm"
                  style={{ opacity: currentStep === 0 ? 0.4 : 1, cursor: currentStep === 0 ? 'not-allowed' : 'pointer' }}
                >
                  <ArrowLeft size={16} />
                  Précédent
                </button>

                <button
                  onClick={handleNext}
                  className="btn btn-gold"
                  disabled={
                    questions[currentStep].type === 'multiple'
                      ? (answers[questions[currentStep].id] || []).length === 0
                      : !answers[questions[currentStep].id]
                  }
                >
                  <span>{currentStep === questions.length - 1 ? "Générer mon profil" : "Suivant"}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ) : (
            /* Affichage du Rapport : VOTRE PROFIL HORIZON */
            <div id="horizon-profile-report">
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'var(--hz-gold-bg)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}>
                  <Sparkles size={28} color="var(--hz-gold-primary)" />
                </div>
                <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '6px' }}>
                  VOTRE PROFIL HORIZON
                </h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>
                  Synthèse personnalisée d'orientation académique et professionnelle
                </p>
              </div>

              {/* Domaine Recommandé */}
              <div style={{
                background: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem 2rem',
                border: '1px solid var(--hz-gold-border)',
                marginBottom: '1.75rem'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--hz-gold-primary)', letterSpacing: '0.08em', marginBottom: '4px' }}>
                  PÔLE STRATÉGIQUE RECOMMANDÉ
                </div>
                <div style={{ fontSize: '1.375rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>
                  {profile.domain.name}
                </div>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
                  {profile.domain.description}
                </p>
              </div>

              {/* Formations Suggérées */}
              <div style={{ marginBottom: '1.75rem' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-primary)', textTransform: 'uppercase', marginBottom: '10px' }}>
                  Formations d'Excellence Adaptées
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {profile.courses.map((course) => (
                    <div
                      key={course.id}
                      style={{
                        padding: '14px 16px',
                        background: 'var(--bg-main)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.9375rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                          {course.title}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {course.level} • {course.modality}
                        </div>
                      </div>
                      <button 
                        onClick={() => onOpenCourseDetails(course)}
                        className="btn btn-secondary btn-sm"
                      >
                        Consulter
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Parcours Conseillé & Prochaines Étapes */}
              <div style={{
                background: 'var(--bg-main)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                border: '1px solid var(--border-subtle)',
                marginBottom: '2rem'
              }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--hz-navy-800)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Parcours Conseillé
                </div>
                <div style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
                  {profile.pathway}
                </div>

                <div style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--hz-navy-800)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Prochaines étapes recommandées
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {profile.nextSteps.map((s, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      <CheckCircle2 size={15} color="var(--hz-gold-primary)" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions du rapport */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'space-between' }}>
                <button
                  onClick={handleReset}
                  className="btn btn-secondary btn-sm"
                >
                  <RotateCcw size={16} />
                  Recommencer le test
                </button>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => window.print()}
                    className="btn btn-secondary btn-sm"
                  >
                    <Printer size={16} />
                    Imprimer
                  </button>

                  <button
                    onClick={onOpenApply}
                    className="btn btn-gold btn-sm"
                  >
                    <GraduationCap size={16} />
                    Candidater avec ce profil
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
