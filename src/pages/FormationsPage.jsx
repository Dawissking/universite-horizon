import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { COURSES, DOMAINS } from '../data/horizonData';
import { Search, BookOpen, ArrowRight, X, CheckCircle, GraduationCap, Filter } from 'lucide-react';

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting){ el.style.opacity= '1'; el.style.transform= 'translateY(0)'; obs.unobserve(el); }}, { threshold:0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} style={{ opacity:0, transform:'translateY(24px)', transition:`opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms` }}>{children}</div>;
}

export default function FormationsPage({ onOpenApply }) {
  const [search, setSearch] = useState('');
  const [domain, setDomain] = useState('all');
  const [type,   setType]   = useState('all');
  const [selectedCourse, setSelectedCourse] = useState(null);

  const filtered = useMemo(() => COURSES.filter(c => {
    const q = search.toLowerCase();
    const matchText = !q || c.title.toLowerCase().includes(q) || c.skills.some(s => s.toLowerCase().includes(q)) || c.careers.some(o => o.toLowerCase().includes(q));
    const matchDomain = domain === 'all' || c.domainId === domain;
    const matchType   = type   === 'all' || c.type === type;
    return matchText && matchDomain && matchType;
  }), [search, domain, type]);

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
              <span style={{ color:'var(--hz-gold-400)', fontSize:'0.875rem', fontWeight:'600' }}>Formations</span>
            </div>
            <h1 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(2rem,4vw,3rem)', color:'#fff', marginBottom:'1rem' }}>
              Nos <span style={{ color:'var(--hz-gold-400)' }}>Formations</span>
            </h1>
            <p style={{ fontSize:'1.0625rem', color:'rgba(255,255,255,0.78)', maxWidth:'580px', lineHeight:1.7 }}>
              Licences LMD et Certificats Métiers accélérés pour bâtir votre excellence professionnelle au Mali et à l''international.
            </p>
          </div>
        </div>
      </section>

      {/* DOMAINES */}
      <section style={{ background:'var(--bg-card)', borderBottom:'1px solid var(--border-100)', padding:'2.5rem 0' }}>
        <div className='hz-container'>
          <div style={{ display:'flex', gap:'10px', flexWrap:'wrap', justifyContent:'center' }}>
            <button onClick={() => setDomain('all')} className={`btn btn-sm ${domain==='all'?'btn-primary':'btn-outline'}`}>Tous les domaines</button>
            {DOMAINS.map(d => (
              <button key={d.id} onClick={() => setDomain(d.id)} className={`btn btn-sm ${domain===d.id?'btn-primary':'btn-outline'}`}>
                {d.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* RECHERCHE & FILTRES */}
      <section style={{ background:'var(--bg-page)', padding:'2.5rem 0' }}>
        <div className='hz-container'>
          <div style={{ background:'var(--bg-card)', padding:'1.5rem', borderRadius:'var(--radius-lg)', border:'1px solid var(--border-200)', boxShadow:'var(--shadow-sm)', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'1rem', alignItems:'center' }}>
            <div style={{ position:'relative', gridColumn:'span 2' }}>
              <Search size={17} style={{ position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', color:'var(--text-400)' }}/>
              <input
                type='text'
                placeholder='Rechercher : Transit, Logiciel, QHSE, Audit…'
                value={search}
                onChange={e => setSearch(e.target.value)}
                className='hz-input'
                style={{ paddingLeft:'2.5rem' }}
              />
            </div>
            <select value={type} onChange={e => setType(e.target.value)} className='hz-input'>
              <option value='all'>Tous les types</option>
              <option value='degree'>Licences LMD (Bac+3)</option>
              <option value='accelerated'>Certificats Métiers Accélérés</option>
            </select>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:'0.84rem', color:'var(--text-400)' }}>
              <span>{filtered.length} formation{filtered.length>1?"s":""} trouvée{filtered.length>1?"s":""}</span>
              {(search || domain!=='all' || type!=='all') && (
                <button onClick={() => { setSearch(''); setDomain('all'); setType('all'); }} style={{ color:'var(--hz-gold-500)', fontWeight:'700', fontSize:'0.84rem' }}>
                  Réinitialiser
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* GRILLE DES FORMATIONS */}
      <section style={{ background:'var(--bg-page)', paddingBottom:'5rem' }}>
        <div className='hz-container'>
          {filtered.length === 0 ? (
            <div style={{ textAlign:'center', padding:'5rem 2rem', color:'var(--text-400)' }}>
              <BookOpen size={48} style={{ margin:'0 auto 1rem', opacity:0.4 }}/>
              <p>Aucune formation ne correspond à vos critères.</p>
            </div>
          ) : (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:'1.75rem' }}>
              {filtered.map((c, i) => (
                <Reveal key={c.id} delay={i*60}>
                  <div className='card card-hover' style={{ display:'flex', flexDirection:'column', justifyContent:'space-between', height:'100%' }}>
                    <div>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'8px', marginBottom:'1rem' }}>
                        <span className={`badge ${c.type==='accelerated'?'badge-official':'badge-info'}`}>
                          {c.level}
                        </span>
                        <span style={{ fontSize:'0.72rem', fontWeight:'700', color:'var(--text-400)', textAlign:'right' }}>{c.domainName}</span>
                      </div>
                      <h3 style={{ fontSize:'1.1875rem', marginBottom:'0.75rem', lineHeight:1.35 }}>{c.title}</h3>
                      <p style={{ fontSize:'0.875rem', color:'var(--text-600)', lineHeight:1.65, marginBottom:'1.25rem' }}>{c.objectives}</p>
                      <div style={{ display:'flex', flexWrap:'wrap', gap:'6px', marginBottom:'1.25rem' }}>
                        {c.skills.slice(0,3).map((s,idx) => (
                          <span key={idx} style={{ fontSize:'0.72rem', background:'var(--bg-muted)', padding:'3px 8px', borderRadius:'var(--radius-sm)', color:'var(--text-400)', fontWeight:'600' }}>{s}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ paddingTop:'1rem', borderTop:'1px solid var(--border-100)', display:'flex', gap:'8px' }}>
                      <button onClick={() => setSelectedCourse(c)} className='btn btn-outline btn-sm' style={{ flex:1, justifyContent:'center' }}>Voir le détail</button>
                      <button onClick={() => onOpenApply(c)} className='btn btn-primary btn-sm' style={{ flex:1, justifyContent:'center' }}>Postuler</button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* MODALE FICHE DÉTAILLÉE */}
      {selectedCourse && (
        <div className='modal-overlay' onClick={() => setSelectedCourse(null)}>
          <div className='modal-box' onClick={e => e.stopPropagation()} style={{ padding:'2.5rem', maxWidth:'820px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'1rem', marginBottom:'1.5rem' }}>
              <div>
                <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginBottom:'8px' }}>
                  <span className={`badge ${selectedCourse.type==='accelerated'?'badge-official':'badge-info'}`}>{selectedCourse.level}</span>
                  <span className='badge badge-official'>Diplôme reconnu État malien</span>
                </div>
                <h2 style={{ fontSize:'1.625rem' }}>{selectedCourse.title}</h2>
                <div style={{ fontSize:'0.84rem', color:'var(--text-400)', marginTop:'4px' }}>
                  {selectedCourse.domainName} · {selectedCourse.modality}
                </div>
              </div>
              <button onClick={() => setSelectedCourse(null)} style={{ flexShrink:0, width:'36px', height:'36px', borderRadius:'50%', background:'var(--bg-muted)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <X size={18} color='var(--text-400)'/>
              </button>
            </div>

            <hr style={{ borderColor:'var(--border-100)', marginBottom:'1.5rem' }}/>

            <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
              <div style={{ background:'var(--bg-muted)', padding:'1.25rem', borderRadius:'var(--radius-md)' }}>
                <div style={{ fontSize:'0.72rem', fontWeight:'800', textTransform:'uppercase', color:'var(--hz-gold-500)', marginBottom:'6px', letterSpacing:'0.07em' }}>Objectifs Pédagogiques</div>
                <p style={{ fontSize:'0.9375rem', lineHeight:1.7 }}>{selectedCourse.objectives}</p>
              </div>

              <div className='grid-2'>
                <div style={{ padding:'1rem', border:'1px solid var(--border-100)', borderRadius:'var(--radius-md)' }}>
                  <div className='hz-label'>Durée</div>
                  <div style={{ fontWeight:'700' }}>{selectedCourse.duration}</div>
                </div>
                <div style={{ padding:'1rem', border:'1px solid var(--border-100)', borderRadius:'var(--radius-md)' }}>
                  <div className='hz-label'>Frais de formation</div>
                  <span className='badge badge-tbd'>{selectedCourse.tuition}</span>
                </div>
              </div>

              <div>
                <div className='hz-label' style={{ marginBottom:'8px' }}>Prérequis</div>
                <p style={{ fontSize:'0.9rem', color:'var(--text-600)' }}>{selectedCourse.prerequisites}</p>
              </div>

              <div>
                <div className='hz-label' style={{ marginBottom:'8px' }}>Compétences Visées</div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                  {selectedCourse.skills.map((s,i) => (
                    <span key={i} style={{ background:'var(--bg-muted)', padding:'5px 10px', borderRadius:'var(--radius-sm)', fontSize:'0.84rem', fontWeight:'600' }}>{s}</span>
                  ))}
                </div>
              </div>

              <div>
                <div className='hz-label' style={{ marginBottom:'8px' }}>Débouchés Professionnels</div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(190px,1fr))', gap:'8px' }}>
                  {selectedCourse.careers.map((c,i) => (
                    <div key={i} style={{ display:'flex', gap:'8px', alignItems:'center', padding:'8px 12px', background:'var(--bg-muted)', borderRadius:'var(--radius-sm)' }}>
                        <CheckCircle size={14} color='var(--hz-gold-500)'/>
                      <span style={{ fontSize:'0.875rem' }}>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display:'flex', justifyContent:'flex-end', gap:'10px', marginTop:'0.5rem' }}>
                <button onClick={() => setSelectedCourse(null)} className='btn btn-outline'>Fermer</button>
                <button onClick={() => { setSelectedCourse(null); onOpenApply(selectedCourse); }} className='btn btn-gold'>
                  <GraduationCap size={18}/> Candidater à cette formation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
