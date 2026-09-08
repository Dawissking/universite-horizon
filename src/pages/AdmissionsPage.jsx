import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { COURSES } from '../data/horizonData';
import { CheckCircle2, ArrowRight, ArrowLeft, Upload, Check, ShieldCheck, GraduationCap, Sparkles, Copy, Compass, AlertCircle, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting){ el.style.opacity= '1'; el.style.transform= 'translateY(0)'; obs.unobserve(el); }}, { threshold:0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} style={{ opacity:0, transform:'translateY(24px)', transition:`opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms` }}>{children}</div>;
}

// ---- WIZARD DE CANDIDATURE ----
function ApplicationWizard({ initialCourse, onClose, onGoToTracker }) {
  const STEPS = ['Identité','Formation','Parcours','Documents','Vérification','Validation','Confirmation'];
  const [step, setStep] = useState(1);
  const [dossierId, setDossierId] = useState('');
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    civility:'M.', firstName:'', lastName:'', email:'', phone:'', nationality:'Malienne',
    courseId: initialCourse?.id || COURSES[0].id, campus:'golf',
      lastDegree:'Baccalauréat', serieBac:'', highSchool:'',
    docs:{ diploma:false, birthCert:false, idCard:false, photo:false },
    honor:false
  });

  const handleNext = () => {
    if (step === 6) {
      const id = `HZ-2026-${Math.floor(1000+Math.random()*9000)}`;
      setDossierId(id);
        const all = JSON.parse(localStorage.getItem('hz_dossiers')||'[]');
        all.push({ id, applicant:`${form.firstName} ${form.lastName}`, courseTitle:(COURSES.find(c=>c.id===form.courseId)||{}).title||'Formation Horizon', status:'DOSSIER REÇU' });
      localStorage.setItem('hz_dossiers', JSON.stringify(all));
      try { confetti({ particleCount:80, spread:70, origin:{y:0.6} }); } catch(e){}
    }
    setStep(s => s+1);
  };

  const canNext = () => {
    if (step===1) return form.firstName && form.lastName && form.email;
    if (step===6) return form.honor;
    return true;
  };

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-box' onClick={e=>e.stopPropagation()} style={{ maxWidth:'820px', padding:'2.5rem' }}>
        
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem' }}>
          <div>
            <span className='badge badge-official'>CANDIDATURE OFFICIELLE EN LIGNE</span>
            <h2 style={{ fontSize:'1.625rem', marginTop:'6px' }}>Rejoindre l'Université Horizon</h2>
          </div>
          <button onClick={onClose} style={{ width:'36px', height:'36px', borderRadius:'50%', background:'var(--bg-muted)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontSize:'1.25rem', color:'var(--text-400)' }}>×</span>
          </button>
        </div>

        {/* Barre de progression */}
        <div style={{ marginBottom:'2rem' }}>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.8rem', fontWeight:'700', color:'var(--text-400)', marginBottom:'7px' }}>
            <span>Étape {step}/{STEPS.length} : {STEPS[step-1]}</span>
            <span>{Math.round(step/STEPS.length*100)}%</span>
          </div>
          <div className='hz-progress-bar'><div className='hz-progress-fill' style={{ width:`${step/STEPS.length*100}%` }}/></div>
        </div>

        {/* Corps */}
        <div style={{ minHeight:'320px' }}>
          {step===1 && (
            <div>
                <h3 style={{ marginBottom:'1.25rem', fontSize:'1.25rem' }}>01 — Informations Personnelles</h3>
                <div className='grid-2' style={{ gap:'1rem' }}>
                <div><label className='hz-label'>Civilité</label>
                  <select value={form.civility} onChange={e=>setForm({...form,civility:e.target.value})} className='hz-input'>
                    <option>M.</option><option>Mme</option><option>Mlle</option>
                  </select>
                </div>
                <div><label className='hz-label'>Nationalité</label>
                  <input className='hz-input' value={form.nationality} onChange={e=>setForm({...form,nationality:e.target.value})}/>
                </div>
                <div><label className='hz-label'>Prénom *</label>
                  <input className='hz-input' placeholder='Ibrahim' value={form.firstName} onChange={e=>setForm({...form,firstName:e.target.value})}/>
                </div>
                <div><label className='hz-label'>Nom *</label>
                  <input className='hz-input' placeholder='Traoré' value={form.lastName} onChange={e=>setForm({...form,lastName:e.target.value})}/>
                </div>
                <div><label className='hz-label'>Email *</label>
                  <input className='hz-input' type='email' placeholder='monemail@exemple.com' value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
                </div>
                <div><label className='hz-label'>Téléphone / WhatsApp</label>
                  <input className='hz-input' type='tel' placeholder='+223 ...' value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
                </div>
              </div>
            </div>
          )}

          {step===2 && (
            <div>
              <h3 style={{ marginBottom:'1.25rem', fontSize:'1.25rem' }}>02 — Choix de la Formation & du Campus</h3>
              <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
                <div><label className='hz-label'>Formation souhaitée</label>
                  <select value={form.courseId} onChange={e=>setForm({...form,courseId:e.target.value})} className='hz-input'>
                    {COURSES.map(c=><option key={c.id} value={c.id}>[{c.type==='accelerated'?'Accéléré':'LMD'}] {c.title}</option>)}
                  </select>
                </div>
                <div><label className='hz-label'>Campus préféré</label>
                  <div className='grid-2'>
                    {[{id:'golf',label:'Campus Baco Djicoroni Golf',sub:'Site principal · Bamako'},{id:'bamako',label:'Campus Bamako',sub:'Site secondaire'}].map(c=>(
                      <label key={c.id} style={{ display:'flex', gap:'10px', padding:'1rem', borderRadius:'var(--radius-md)', background:form.campus===c.id?'var(--hz-gold-bg)':'var(--bg-muted)', border:form.campus===c.id?'2px solid var(--hz-gold-500)':'1px solid var(--border-100)', cursor:'pointer' }}>
                        <input type='radio' name='campus' checked={form.campus===c.id} onChange={()=>setForm({...form,campus:c.id})}/>
                        <div><div style={{ fontWeight:'700' }}>{c.label}</div><div style={{ fontSize:'0.75rem', color:'var(--text-400)' }}>{c.sub}</div></div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step===3 && (
            <div>
              <h3 style={{ marginBottom:'1.25rem', fontSize:'1.25rem' }}>03 — Parcours Académique</h3>
              <div className='grid-2' style={{ gap:'1rem' }}>
                <div><label className='hz-label'>Dernier diplôme</label>
                  <select value={form.lastDegree} onChange={e=>setForm({...form,lastDegree:e.target.value})} className='hz-input'>
                    <option>Baccalauréat</option><option>DUT / BTS</option><option>Licence</option><option>Expérience professionnelle</option>
                  </select>
                </div>
                <div><label className='hz-label'>Série du Bac</label>
                  <input className='hz-input' placeholder='TSS, Sciences Exactes…' value={form.serieBac} onChange={e=>setForm({...form,serieBac:e.target.value})}/>
                </div>
                <div style={{ gridColumn:'span 2' }}><label className='hz-label'>Établissement de provenance</label>
                    <input className='hz-input' placeholder="Nom du lycée ou de l'établissement" value={form.highSchool} onChange={e=>setForm({...form,highSchool:e.target.value})}/>
                </div>
              </div>
            </div>
          )}

          {step===4 && (
            <div>
              <h3 style={{ marginBottom:'0.75rem', fontSize:'1.25rem' }}>04 — Documents Requis</h3>
              <p style={{ fontSize:'0.875rem', color:'var(--text-400)', marginBottom:'1.5rem' }}>Téléversez vos pièces en PDF ou JPEG (max 5 Mo).</p>
              <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                 {[{key:'diploma',label:'Attestation du Baccalauréat ou dernier diplôme'},{key:'birthCert',label:'Extrait d\'Acte de Naissance'},{key:'idCard',label:'Pièce d\'Identité ou Passeport'},{key:'photo',label:'Photo d\'identité récente (fond blanc)'}].map(doc=>{
                  const up = form.docs[doc.key];
                  return (
                    <div key={doc.key} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px', borderRadius:'var(--radius-md)', background:'var(--bg-muted)', border:'1px dashed var(--border-200)' }}>
                      <span style={{ fontSize:'0.875rem', fontWeight:'600' }}>{doc.label}</span>
                      <button onClick={() => setForm({...form,docs:{...form.docs,[doc.key]:!up}})} className={`btn btn-sm ${up?'btn-outline':'btn-primary'}`}>
                        {up ? <><Check size={14}/> Validé</> : <><Upload size={14}/> Ajouter</>}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step===5 && (
            <div>
              <h3 style={{ marginBottom:'1.25rem', fontSize:'1.25rem' }}>05 — Récapitulatif de votre Dossier</h3>
              <div style={{ background:'var(--bg-muted)', borderRadius:'var(--radius-md)', padding:'1.5rem', display:'flex', flexDirection:'column', gap:'1rem' }}>
                  <div><div className='hz-label'>Candidat</div><div style={{ fontWeight:'700', fontSize:'1rem' }}>{form.civility} {form.firstName||'—'} {form.lastName} ({form.nationality})</div></div>
                <div><div className='hz-label'>Formation</div><div style={{ fontWeight:'700', color:'var(--hz-gold-500)' }}>{(COURSES.find(c=>c.id===form.courseId)||{}).title}</div></div>
                <div><div className='hz-label'>Campus</div><div style={{ fontWeight:'600' }}>{form.campus==='golf'?'Campus Baco Djicoroni Golf':'Campus Bamako'}</div></div>
                  <div><div className='hz-label'>Contact</div><div style={{ color:'var(--text-600)' }}>{form.email||'—'} · {form.phone||'—'}</div></div>
              </div>
            </div>
          )}

          {step===6 && (
            <div>
              <h3 style={{ marginBottom:'1.25rem', fontSize:'1.25rem' }}>06 — Déclaration sur l'Honneur & Envoi</h3>
              <label style={{ display:'flex', gap:'12px', padding:'1.5rem', borderRadius:'var(--radius-md)', background:'var(--bg-muted)', border:'1px solid var(--border-200)', cursor:'pointer', marginBottom:'1.5rem' }}>
                <input type='checkbox' checked={form.honor} onChange={e=>setForm({...form,honor:e.target.checked})} style={{ marginTop:'3px' }}/>
                <span style={{ fontSize:'0.9rem', color:'var(--text-600)', lineHeight:1.65 }}>
                  Je certifie sur l'honneur l'exactitude des informations transmises et reconnais que toute fausse déclaration entraîne l'annulation de mon dossier conformément au règlement de l'Université Horizon.
                </span>
              </label>
              <div style={{ display:'flex', gap:'10px', padding:'12px 16px', background:'var(--hz-gold-bg)', borderRadius:'var(--radius-sm)', border:'1px solid var(--hz-gold-border)' }}>
                <ShieldCheck size={18} color='var(--hz-gold-500)' style={{ flexShrink:0 }}/>
                <span style={{ fontSize:'0.84rem' }}>Traitement sécurisé et confidentiel par le service officiel des Admissions.</span>
              </div>
            </div>
          )}

          {step===7 && (
            <div style={{ textAlign:'center', padding:'2rem 1rem' }}>
              <div style={{ width:'60px', height:'60px', borderRadius:'50%', background:'var(--hz-gold-bg)', display:'inline-flex', alignItems:'center', justifyContent:'center', marginBottom:'1.25rem' }}>
                <Sparkles size={30} color='var(--hz-gold-500)'/>
              </div>
              <h3 style={{ fontSize:'1.625rem', marginBottom:'8px' }}>Félicitations ! Dossier Enregistré.</h3>
              <p style={{ fontSize:'0.9375rem', color:'var(--text-600)', maxWidth:'480px', margin:'0 auto 2rem', lineHeight:1.65 }}>
                Votre candidature a été transmise à la commission d'admission de l'Université Horizon. Conservez précieusement votre identifiant.
              </p>
              <div style={{ background:'var(--bg-muted)', border:'2px dashed var(--hz-gold-500)', borderRadius:'var(--radius-md)', padding:'1.25rem', display:'inline-flex', alignItems:'center', gap:'14px', marginBottom:'2rem' }}>
                <div>
                  <div className='hz-label'>IDENTIFIANT DE CANDIDATURE</div>
                  <div style={{ fontSize:'1.5rem', fontWeight:'800', color:'var(--text-900)', letterSpacing:'0.05em' }}>{dossierId}</div>
                </div>
                <button className='btn btn-outline btn-sm' onClick={() => { navigator.clipboard.writeText(dossierId); setCopied(true); setTimeout(()=>setCopied(false),2500); }}>
                  {copied?<><Check size={14}/> Copié</>:<><Copy size={14}/> Copier</>}
                </button>
              </div>
              <div style={{ display:'flex', justifyContent:'center', gap:'10px', flexWrap:'wrap' }}>
                <button onClick={() => { onClose(); if(onGoToTracker) onGoToTracker(dossierId); }} className='btn btn-primary'>
                  Suivre mon dossier
                </button>
                <button onClick={onClose} className='btn btn-outline'>Fermer</button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Wizard */}
        {step < 7 && (
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'2rem', paddingTop:'1.5rem', borderTop:'1px solid var(--border-100)' }}>
            <button onClick={() => setStep(s=>s-1)} disabled={step===1} className='btn btn-outline btn-sm' style={{ opacity:step===1?0.4:1 }}>
              <ArrowLeft size={16}/> Précédent
            </button>
            <button onClick={handleNext} disabled={!canNext()} className='btn btn-gold' style={{ opacity:canNext()?1:0.55 }}>
              {step===6?'Confirmer et Transmettre':'Étape Suivante'} <ArrowRight size={16}/>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ---- OUTIL D'ORIENTATION ----
const QUESTIONS = [
      { id:'level', title:"Votre niveau d'étude actuel ?", type:'single', options:[
    {label:'Futur(e) Bachelier(e) — Terminale',value:'terminale'},
    {label:'Titulaire du Baccalauréat',value:'bac'},
    {label:'Professionnel en activité ou reconversion',value:'pro'},
    {label:'Bac+2 ou plus, en réorientation',value:'bac2+'},
  ]},
    { id:'interests', title:"Vos centres d'intérêt (2 max)", type:'multiple', max:2, options:[
    {label:'Informatique & Numérique',value:'tech'},
    {label:'Finance, Banque & Comptabilité',value:'finance'},
    {label:'Commerce international & Douane',value:'transit'},
    {label:'Droit & Institutions',value:'droit'},
    {label:'Communication & Médias',value:'comm'},
    {label:'Action humanitaire & ONG',value:'humanitaire'},
    {label:'Sécurité, Environnement & QHSE',value:'qhse'},
  ]},
  { id:'duration', title:'Format souhaité ?', type:'single', options:[
    {label:'Formation accélérée certifiante (quelques mois)',value:'court'},
    {label:'Licence universitaire complète (3 ans)',value:'long'},
      {label:'Indifférent, je m\'adapte',value:'ouvert'},
  ]},
];

function computeProfile(answers) {
  const interests = answers.interests || [];
  const duration = answers.duration;
  let courses = [];
  if (interests.includes('tech')) courses = COURSES.filter(c=>c.domainId==='sciences-tech');
  else if (interests.includes('finance')) courses = COURSES.filter(c=>c.domainId==='management-finance');
  else if (interests.includes('transit') || interests.includes('humanitaire')) courses = COURSES.filter(c=>c.domainId==='management-eco');
  else if (interests.includes('droit')) courses = COURSES.filter(c=>c.domainId==='droit');
  else if (interests.includes('comm')) courses = COURSES.filter(c=>c.domainId==='arts-comm');
  else if (interests.includes('qhse')) courses = COURSES.filter(c=>c.id==='fa-qhse');
  else courses = COURSES.slice(0, 3);
  if (duration==='court') { const acc=COURSES.filter(c=>c.type==='accelerated'); if(acc.length) courses=acc.slice(0,3); }
  return { courses: courses.slice(0,3) };
}

function OrientationTool({ onOpenApply, onViewCourse }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const q = QUESTIONS[step];
  const select = (value) => {
    if (!q) return;
    if (q.type==='multiple') {
      const cur = answers[q.id]||[];
      if (cur.includes(value)) setAnswers({...answers,[q.id]:cur.filter(v=>v!==value)});
      else if (cur.length < (q.max||3)) setAnswers({...answers,[q.id]:[...cur,value]});
    } else {
      setAnswers({...answers,[q.id]:value});
    }
  };
  const isSelected = (value) => q?.type==='multiple' ? (answers[q?.id]||[]).includes(value) : answers[q?.id]===value;
  const canNext = q?.type==='multiple' ? (answers[q?.id]||[]).length>0 : !!answers[q?.id];
  const handleNext = () => {
    if (step < QUESTIONS.length-1) setStep(s=>s+1);
    else setShowResult(true);
  };
  const reset = () => { setStep(0); setAnswers({}); setShowResult(false); };
  const profile = showResult ? computeProfile(answers) : null;

  return (
    <div className='card card-gold' style={{ padding:'2.5rem' }}>
      {!showResult ? (
        <>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.8rem', fontWeight:'700', color:'var(--text-400)', marginBottom:'8px' }}>
            <span>Question {step+1}/{QUESTIONS.length}</span>
            <span>{Math.round((step+1)/QUESTIONS.length*100)}%</span>
          </div>
          <div className='hz-progress-bar' style={{ marginBottom:'1.75rem' }}>
            <div className='hz-progress-fill' style={{ width:`${(step+1)/QUESTIONS.length*100}%` }}/>
          </div>
          <h3 style={{ fontSize:'1.375rem', marginBottom:'1.5rem' }}>{q.title}</h3>
          <div style={{ display:'flex', flexDirection:'column', gap:'10px', marginBottom:'2rem' }}>
            {q.options.map(opt => (
              <button key={opt.value} onClick={() => select(opt.value)} style={{
                display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0.9rem 1.25rem',
                borderRadius:'var(--radius-md)', textAlign:'left',
                background:isSelected(opt.value)?'var(--hz-gold-bg)':'var(--bg-muted)',
                border:isSelected(opt.value)?'2px solid var(--hz-gold-500)':'1px solid var(--border-100)',
                transition:'all 180ms ease'
              }}>
                <span style={{ fontWeight:isSelected(opt.value)?700:500, fontSize:'0.9375rem' }}>{opt.label}</span>
                {isSelected(opt.value) && <Check size={16} color='var(--hz-gold-500)'/>}
              </button>
            ))}
          </div>
          <div style={{ display:'flex', justifyContent:'space-between' }}>
            <button onClick={()=>setStep(s=>Math.max(0,s-1))} disabled={step===0} className='btn btn-outline btn-sm' style={{ opacity:step===0?0.4:1 }}>
              <ArrowLeft size={16}/> Précédent
            </button>
            <button onClick={handleNext} disabled={!canNext} className='btn btn-gold' style={{ opacity:canNext?1:0.55 }}>
              {step===QUESTIONS.length-1?'Voir mon profil':'Suivant'} <ArrowRight size={16}/>
            </button>
          </div>
        </>
      ) : (
        <>
          <div style={{ textAlign:'center', marginBottom:'2rem' }}>
            <div style={{ width:'52px', height:'52px', borderRadius:'50%', background:'var(--hz-gold-bg)', display:'inline-flex', alignItems:'center', justifyContent:'center', marginBottom:'1rem' }}>
              <Sparkles size={26} color='var(--hz-gold-500)'/>
            </div>
            <h3 style={{ fontSize:'1.5rem' }}>Votre Profil Horizon</h3>
            <p style={{ fontSize:'0.875rem', color:'var(--text-400)', marginTop:'4px' }}>Recommandations informatives · Sans engagement contractuel</p>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'10px', marginBottom:'2rem' }}>
            {profile.courses.map(c => (
              <div key={c.id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px', background:'var(--bg-muted)', borderRadius:'var(--radius-md)', border:'1px solid var(--border-100)' }}>
                <div>
                  <div style={{ fontWeight:'700', fontSize:'0.9375rem' }}>{c.title}</div>
                  <div style={{ fontSize:'0.75rem', color:'var(--text-400)' }}>{c.level} · {c.modality}</div>
                </div>
                <button onClick={()=>onViewCourse(c)} className='btn btn-outline btn-sm'>Voir</button>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', gap:'10px', justifyContent:'space-between', flexWrap:'wrap' }}>
            <button onClick={reset} className='btn btn-outline btn-sm'><RotateCcw size={14}/> Recommencer</button>
            <button onClick={() => onOpenApply(profile.courses[0])} className='btn btn-gold btn-sm'>
              <GraduationCap size={15}/> Candidater maintenant
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ---- PAGE ADMISSIONS ----
export default function AdmissionsPage({ onOpenApply }) {
  const [trackerCode, setTrackerCode] = useState('');
  const [trackerResult, setTrackerResult] = useState(null);
  const [trackerError, setTrackerError] = useState('');
  const [applyOpen, setApplyOpen] = useState(false);
  const [selectedCourseForApply, setSelectedCourseForApply] = useState(null);

  const handleApply = (course=null) => { setSelectedCourseForApply(course); setApplyOpen(true); };

  const handleTracker = () => {
    const code = trackerCode.trim().toUpperCase();
    if (!code) { setTrackerError('Saisissez votre identifiant de candidature.'); return; }
      const local = JSON.parse(localStorage.getItem('hz_dossiers')||'[]');
    const found = local.find(d=>d.id.toUpperCase()===code);
    if (found) { setTrackerResult({ ...found, stepIdx:2 }); setTrackerError(''); }
    else { setTrackerError('Aucun dossier trouvé pour cet identifiant.'); setTrackerResult(null); }
  };

    const TRACK_STEPS = ['Dossier créé','Dossier reçu','En vérification','Dossier complet','Décision d\'admission','Inscription & Badge'];

  return (
    <div className='page-enter'>
      {/* BANDEAU */}
      <section style={{ background:'linear-gradient(135deg,#0D2240,#15315B)', padding:'4.5rem 0', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize:'40px 40px', pointerEvents:'none' }}/>
        <div className='hz-container' style={{ position:'relative', zIndex:1 }}>
          <div className='animate-fadeInUp'>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'1rem' }}>
              <Link to='/' style={{ color:'rgba(255,255,255,0.55)', fontSize:'0.875rem' }}>Accueil</Link>
              <span style={{ color:'rgba(255,255,255,0.3)' }}>/</span>
              <span style={{ color:'var(--hz-gold-400)', fontSize:'0.875rem', fontWeight:'600' }}>Admissions</span>
            </div>
            <h1 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(2rem,4vw,3rem)', color:'#fff', marginBottom:'1rem' }}>
              Admissions & <span style={{ color:'var(--hz-gold-400)' }}>Candidature</span>
            </h1>
            <p style={{ fontSize:'1.0625rem', color:'rgba(255,255,255,0.78)', maxWidth:'580px', lineHeight:1.7 }}>
              Toutes les informations et outils pour intégrer l'Université Horizon et bâtir votre avenir dans l'excellence.
            </p>
            <button onClick={() => handleApply()} className='btn btn-gold' style={{ marginTop:'1.5rem' }}>
              <GraduationCap size={18}/> Candidater en ligne maintenant
            </button>
          </div>
        </div>
      </section>

      {/* ÉTAPES D'ADMISSION */}
      <section className='hz-section' style={{ background:'var(--bg-page)' }}>
        <div className='hz-container'>
          <div style={{ textAlign:'center', marginBottom:'3rem' }}>
            <Reveal>
              <span className='section-badge'><Compass size={13}/> Processus Officiel</span>
              <h2 className='section-title'>Les 5 Étapes pour Rejoindre Horizon</h2>
            </Reveal>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'1.5rem' }}>
            {[
                { n:'01', title:'Choisir votre filière', desc:"Utilisez notre outil d'orientation ou explorez le catalogue des formations.", icon:'🎯' },
                { n:'02', title:'Constituer votre dossier', desc:"Rassemblez : diplômes, acte de naissance, pièce d'identité et photos récentes.", icon:'📁' },
              { n:'03', title:'Candidater en ligne', desc:'Remplissez le formulaire officiel en 7 étapes sur notre plateforme sécurisée.', icon:'🖥️' },
              { n:'04', title:'Suivi & Commission', desc:"Suivez l'état de votre dossier en temps réel via votre identifiant unique.", icon:'📊' },
              { n:'05', title:'Inscription & Campus', desc:"Après l'avis favorable, finalisez votre inscription sur l'un de nos deux campus.", icon:'🎓' },
            ].map((item, i) => (
              <Reveal key={i} delay={i*80}>
                <div className='card card-hover' style={{ textAlign:'center', height:'100%' }}>
                  <div style={{ fontSize:'2.5rem', marginBottom:'0.75rem' }}>{item.icon}</div>
                  <div style={{ fontSize:'2rem', fontWeight:'800', color:'var(--hz-gold-500)', lineHeight:1, marginBottom:'0.5rem' }}>{item.n}</div>
                  <h3 style={{ fontSize:'1.0625rem', marginBottom:'0.625rem' }}>{item.title}</h3>
                  <p style={{ fontSize:'0.875rem', color:'var(--text-600)', lineHeight:1.65 }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OUTIL D'ORIENTATION + CANDIDATURE */}
      <section className='hz-section' style={{ background:'var(--bg-card)' }}>
        <div className='hz-container'>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:'2.5rem', alignItems:'start' }}>
            <div>
              <Reveal>
                <span className='section-badge'><Compass size={13}/> Horizon Match™</span>
                <h2 className='section-title' style={{ textAlign:'left' }}>Trouvez votre Filière</h2>
                <p style={{ fontSize:'1rem', color:'var(--text-600)', lineHeight:1.7, marginBottom:'1.75rem' }}>
                  Répondez à 3 questions simples pour identifier les formations les plus adaptées à votre profil et vos ambitions.
                </p>
                <div style={{ padding:'12px 16px', borderRadius:'var(--radius-md)', background:'rgba(192,57,43,0.06)', border:'1px solid rgba(192,57,43,0.18)', display:'flex', gap:'10px', alignItems:'flex-start', marginBottom:'1.75rem' }}>
                  <AlertCircle size={17} color='var(--hz-red-600)' style={{ flexShrink:0, marginTop:'2px' }}/>
                  <span style={{ fontSize:'0.8125rem', color:'var(--text-600)', lineHeight:1.55 }}>
                    Cet outil fournit une recommandation informative et pédagogique. Il ne constitue pas une décision d'admission, laquelle reste soumise à l'examen officiel de votre dossier.
                  </span>
                </div>
              </Reveal>
              <OrientationTool onOpenApply={handleApply} onViewCourse={(c) => console.log(c)}/>
            </div>

            {/* Conditions d'admission */}
            <div>
              <Reveal delay={100}>
                <span className='section-badge' style={{ marginBottom:'1rem' }}>Conditions d'Accès</span>
                <h3 style={{ fontSize:'1.5rem', marginBottom:'1rem' }}>Prérequis & Documents</h3>
              </Reveal>
              <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
                {[
                  { title:'Licences LMD (Bac+3)', items:['Baccalauréat malien ou étranger reconnu','Dossier scolaire complet + relevés de notes','Pièce d\'identité ou passeport valide','2 photos d\'identité récentes (fond blanc)'] },
                  { title:'Certificats Métiers Accélérés', items:['Baccalauréat ou expérience professionnelle équivalente','Acte de naissance officiel','Pièce d\'identité','Motivation éventuellement requise'] },
                ].map((section, i) => (
                  <Reveal key={i} delay={i*120+200}>
                    <div className='card' style={{ padding:'1.5rem' }}>
                      <div style={{ fontWeight:'800', fontSize:'0.9375rem', marginBottom:'0.875rem', color:'var(--text-900)' }}>{section.title}</div>
                      <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'7px' }}>
                        {section.items.map((item,j) => (
                          <li key={j} style={{ display:'flex', gap:'8px', alignItems:'flex-start', fontSize:'0.875rem', color:'var(--text-600)' }}>
                            <CheckCircle2 size={15} color='var(--hz-gold-500)' style={{ flexShrink:0, marginTop:'2px' }}/>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
                <Reveal delay={450}>
                  <div style={{ padding:'1.25rem', borderRadius:'var(--radius-md)', background:'var(--hz-gold-bg)', border:'1px solid var(--hz-gold-border)' }}>
                    <div className='hz-label' style={{ marginBottom:'4px' }}>Frais de Scolarité</div>
                    <p style={{ fontSize:'0.875rem', color:'var(--text-600)' }}>
                      Communiqués par le service des admissions sur demande.
                    </p>
                    <a href='tel:+22377677575' className='btn btn-gold btn-sm' style={{ marginTop:'10px', display:'inline-flex' }}>
                      Renseignements : +223 77 67 75 75
                    </a>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUIVI DE CANDIDATURE */}
      <section id='suivi' className='hz-section' style={{ background:'var(--bg-page)' }}>
        <div className='hz-container'>
          <div style={{ textAlign:'center', marginBottom:'3rem' }}>
            <Reveal>
              <span className='section-badge'>Transparence Administrative</span>
              <h2 className='section-title'>Où en est ma Candidature ?</h2>
              <p className='section-lead'>Suivez l'instruction de votre dossier en temps réel grâce à votre identifiant unique.</p>
            </Reveal>
          </div>
          <Reveal delay={100}>
            <div style={{ maxWidth:'600px', margin:'0 auto 2.5rem' }}>
              <div style={{ display:'flex', gap:'10px' }}>
                <input className='hz-input' placeholder='Ex: HZ-2026-1234' value={trackerCode} onChange={e=>{setTrackerCode(e.target.value);setTrackerError('');}} onKeyDown={e=>e.key==='Enter'&&handleTracker()} style={{ flex:1 }}/>
                <button onClick={handleTracker} className='btn btn-primary'>Vérifier</button>
              </div>
              {trackerError && <div style={{ color:'var(--hz-red-600)', fontSize:'0.875rem', marginTop:'8px', display:'flex', gap:'6px', alignItems:'center' }}><AlertCircle size={15}/>{trackerError}</div>}
            </div>
          </Reveal>

          {trackerResult && (
            <Reveal>
              <div className='card card-gold' style={{ maxWidth:'860px', margin:'0 auto', padding:'2.5rem' }}>
                <div style={{ display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem', marginBottom:'2rem', paddingBottom:'1.5rem', borderBottom:'1px solid var(--border-100)' }}>
                  <div>
                    <span className='badge badge-official' style={{ marginBottom:'6px' }}>DOSSIER : {trackerResult.id}</span>
                    <h3 style={{ fontSize:'1.375rem', marginTop:'4px' }}>{trackerResult.applicant}</h3>
                    <div style={{ color:'var(--hz-gold-500)', fontWeight:'700', fontSize:'0.9375rem' }}>{trackerResult.courseTitle}</div>
                  </div>
                  <div style={{ background:'var(--bg-muted)', padding:'10px 18px', borderRadius:'var(--radius-md)', textAlign:'right' }}>
                    <div className='hz-label'>Statut actuel</div>
                    <div style={{ fontWeight:'800', color:'var(--hz-gold-500)' }}>En cours d'instruction</div>
                  </div>
                </div>
                {/* Timeline */}
                <div style={{ display:'flex', justifyContent:'space-between', gap:'4px', flexWrap:'wrap' }}>
                  {TRACK_STEPS.map((s, i) => {
                    const done = i <= (trackerResult.stepIdx||0);
                    const current = i === (trackerResult.stepIdx||0);
                    return (
                      <div key={i} className={`timeline-step ${done?'done':''}`} style={{ flex:'1', minWidth:'90px' }}>
                        <div style={{
                          width:'40px', height:'40px', borderRadius:'50%', marginBottom:'8px',
                          background:done?(current?'var(--hz-gold-500)':'var(--hz-navy-900)'):'var(--bg-muted)',
                          border:current?'3px solid var(--hz-gold-400)':'1px solid var(--border-200)',
                          display:'flex', alignItems:'center', justifyContent:'center', color:'#fff',
                          boxShadow:current?'var(--shadow-gold)':'none',
                          transition:'all 300ms'
                        }}>
                          {done ? <Check size={17}/> : <span style={{ fontSize:'0.84rem', fontWeight:'700', color:'var(--text-400)' }}>{i+1}</span>}
                        </div>
                        <div style={{ fontSize:'0.75rem', fontWeight:done?700:500, color:done?'var(--text-900)':'var(--text-400)', lineHeight:1.3 }}>{s}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* WIZARD */}
      {applyOpen && <ApplicationWizard initialCourse={selectedCourseForApply} onClose={() => setApplyOpen(false)} onGoToTracker={(id) => { setApplyOpen(false); setTrackerCode(id); handleTracker(); }}/>}

    </div>
  );
}
