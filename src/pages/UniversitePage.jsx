import React, { useEffect, useRef, useState } from 'react';
import { Target, Compass, HeartHandshake, ShieldCheck, CheckCircle2, Users, Globe, Award, Cpu, MapPin, Phone, Mail } from 'lucide-react';
import { INSTITUTION } from '../data/horizonData';
import CountUp from '../components/CountUp';
import PageBanner from '../components/PageBanner';
import Icon from '../components/Icon';

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; obs.unobserve(el); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity:0, transform:'translateY(28px)', transition:`opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms` }}>
      {children}
    </div>
  );
}

export default function UniversitePage() {
  const [activeTab, setActiveTab] = useState('vision');

  const tabs = [
    { id:'vision',      title:'Notre Vision',    icon:Target,          color:'#2563EB',
      content:"Devenir le pôle universitaire de référence en Afrique de l'Ouest, reconnu pour sa capacité à former des cadres intègres, hautement qualifiés et immédiatement opérationnels.",
      points:['Standards académiques internationaux','Valorisation des talents maliens et africains','Intégration des technologies émergentes dans chaque cursus']
    },
    { id:'mission',     title:'Notre Mission',   icon:Compass,         color:'var(--hz-gold-500)',
      content:"Délivrer une formation académique et professionnelle d'excellence articulée autour de l'encadrement rapproché, de la pratique opérationnelle et de l'insertion professionnelle.",
      points:['Pédagogie active centrée sur la résolution de problèmes réels','Corps enseignant alliant universitaires et praticiens d\'entreprise','Accompagnement de l\'admission jusqu\'au premier emploi']
    },
    { id:'valeurs',     title:'Nos Valeurs',     icon:HeartHandshake,  color:'#7C3AED',
        content:"Excellence, Intégrité, Innovation et Solidarité : quatre valeurs cardinales qui s'imprègnent dans chaque cours, projet et échange sur nos campus.",
      points:['Excellence : La recherche permanente du travail bien accompli','Intégrité : Rigueur intellectuelle, éthique et respect mutuel','Innovation : Créativité et adaptation aux technologies','Solidarité : Responsabilité sociétale et bien commun']
    },
    { id:'engagement',  title:'Notre Engagement', icon:ShieldCheck,    color:'#10B981',
      content:'Un contrat moral solennellement assumé : diplômes officiellement reconnus, infrastructures modernes et réseau alumni actif pour faire de chaque étudiant un acteur de son destin.',
      points:['Transparence pédagogique et évaluation équitable','Accès à des infrastructures modernes et connectées','Insertion professionnelle active via stages et réseaux alumni']
    }
  ];

  const activeTabData = tabs.find(t => t.id === activeTab);
  const TabIcon = activeTabData.icon;

  return (
    <div className='page-enter'>

{/* Bandeau Page */}
      <PageBanner
        image='/assets/campus_students.jpeg'
        breadcrumb='Université'
        title="L'Université"
        highlight='Horizon'
        description="Une institution d'enseignement supérieur fondée sur l'excellence académique, l'encadrement humain et l'ouverture sur le monde."
      />

      {/* PHILOSOPHIE INTERACTIVE */}
      <section className='hz-section' style={{ background:'var(--bg-page)' }}>
        <div className='hz-container'>
          <div style={{ textAlign:'center', marginBottom:'3rem' }}>
            <Reveal>
              <span className='section-badge'><Compass size={13}/> Éthique & Philosophie</span>
              <h2 className='section-title'>
                Votre avenir ne se choisit pas seulement. <span className='text-gold'>Il se construit.</span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={100}>
            {/* Onglets */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'10px', marginBottom:'2rem' }}>
              {tabs.map(tab => {
                const TIcon = tab.icon;
                const isSelected = activeTab === tab.id;
                return (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                    display:'flex', alignItems:'center', gap:'10px', padding:'1.1rem 1.25rem',
                    borderRadius:'var(--radius-md)',
                    background: isSelected ? 'var(--hz-navy-900)' : 'var(--bg-card)',
                    color: isSelected ? '#fff' : 'var(--text-900)',
                    border: isSelected ? '2px solid var(--hz-gold-500)' : '1px solid var(--border-100)',
                      boxShadow: isSelected ? 'var(--shadow-gold)' : 'var(--shadow-xs)',
                    textAlign:'left',
                    transition:'all 200ms ease-out'
                  }}>
                      <div style={{ width:'34px', height:'34px', borderRadius:'8px', background: isSelected ? 'var(--hz-gold-500)' : 'var(--hz-gold-bg)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                        <TIcon size={18} color={ isSelected ? '#071526' : 'var(--hz-gold-500)' }/>
                    </div>
                    <span style={{ fontWeight:'700', fontSize:'0.875rem' }}>{tab.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Panneau de contenu */}
            <div className='card card-gold' style={{ padding:'2.5rem' }}>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'2.5rem', alignItems:'center' }}>
                <div>
                  <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'1rem' }}>
                    <div style={{ width:'42px', height:'42px', borderRadius:'10px', background:'var(--hz-navy-900)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <TabIcon size={22} color='var(--hz-gold-400)'/>
                    </div>
                    <h3 style={{ fontSize:'1.5rem' }}>{activeTabData.title}</h3>
                  </div>
                  <p style={{ fontSize:'1rem', color:'var(--text-600)', lineHeight:1.75 }}>
                    {activeTabData.content}
                  </p>
                </div>
                <div style={{ background:'var(--bg-muted)', borderRadius:'var(--radius-md)', padding:'1.75rem' }}>
                  <div style={{ fontSize:'0.78rem', fontWeight:'800', textTransform:'uppercase', color:'var(--hz-gold-500)', marginBottom:'1rem', letterSpacing:'0.07em' }}>
                    Directives Concrètes
                  </div>
                  {activeTabData.points.map((pt, i) => (
                    <div key={i} style={{ display:'flex', gap:'10px', alignItems:'flex-start', marginBottom:'12px' }}>
                        <CheckCircle2 size={17} color='var(--hz-gold-500)' style={{ flexShrink:0, marginTop:'2px' }}/>
                      <span style={{ fontSize:'0.9rem', color:'var(--text-600)', lineHeight:1.6 }}>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CORPS ENSEIGNANT & ATOUTS */}
      <section className='hz-section' style={{ background:'var(--bg-card)' }}>
        <div className='hz-container'>
          <div style={{ textAlign:'center', marginBottom:'3rem' }}>
            <Reveal>
              <span className='section-badge'><Users size={13}/> Corps Enseignant</span>
              <h2 className='section-title'>Une Équipe Pédagogique d'Excellence</h2>
              <p className='section-lead'>Praticiens en activité, enseignants-chercheurs et experts métiers : une équipe sélectionnée pour sa compétence et son engagement.</p>
            </Reveal>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:'1.5rem' }}>
            {[
      { icon:'graduation', title:'Enseignants-Chercheurs', desc:'Docteurs et agrégés combinant rigueur académique et ouverture disciplinaire.' },
      { icon:'briefcase', title:"Praticiens d'Entreprise", desc:'Directeurs, experts et consultants en activité partageant leur expérience opérationnelle.' },
      { icon:'globe', title:'Experts Internationaux', desc:'Intervenants et conférenciers de la sous-région et de l\'international pour une vision globale.' },
      { icon:'handshake', title:'Tuteurs & Mentors', desc:"Chaque étudiant dispose d'un tuteur académique dédié pour un suivi personnalisé." },
            ].map((item, i) => (
              <Reveal key={i} delay={i*100}>
                <div className='card card-hover' style={{ height:'100%' }}>
                  <div style={{ marginBottom:'1rem' }}><Icon name={item.icon} size={24} /></div>
                  <h3 style={{ fontSize:'1.1rem', marginBottom:'0.625rem' }}>{item.title}</h3>
                  <p style={{ fontSize:'0.9rem', color:'var(--text-600)', lineHeight:1.7 }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CAMPUS EN CHIFFRES */}
      <section className='hz-section campus-stats-section'>
        <div className='hz-container'>
          <Reveal>
            <div style={{ textAlign:'center', marginBottom:'3rem' }}>
              <h2 style={{ color:'#fff', fontSize:'clamp(1.75rem,3vw,2.375rem)', marginBottom:'0.75rem' }}>
                Nos Campus en <span style={{ color:'var(--hz-gold-400)' }}>Chiffres</span>
              </h2>
              <p style={{ color:'rgba(255,255,255,0.7)', maxWidth:'520px', margin:'0 auto' }}>
                Deux sites d'excellence à Bamako pour un environnement d'apprentissage à la hauteur de vos ambitions.
              </p>
            </div>
          </Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'1.5rem' }}>
            {[
              { val:'2', label:'Campus à Bamako' },
              { val:'13', label:'Pôles & Domaines Clés' },
              { val:'25', label:'Filières de Formation' },
              { val:'6', label:'Certificats Métiers' },
              { val:'100', suffix:'%', label:'Diplômes reconnus État malien' },
            ].map((s, i) => (
              <Reveal key={i} delay={i*80}>
                <div style={{ textAlign:'center', padding:'1.75rem', background:'rgba(255,255,255,0.05)', borderRadius:'var(--radius-md)', border:'1px solid rgba(201,151,38,0.2)' }}>
                  <div style={{ fontSize:'2.25rem', fontWeight:'800', color:'var(--hz-gold-400)', lineHeight:1, marginBottom:'8px' }}>
                    <CountUp target={s.val} suffix={s.suffix || ''} />
                  </div>
                  <div style={{ fontSize:'0.84rem', fontWeight:'600', color:'rgba(255,255,255,0.75)' }}>{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
