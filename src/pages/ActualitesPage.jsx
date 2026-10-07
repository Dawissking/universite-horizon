import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, BookOpen, Award, Users, Sparkles } from 'lucide-react';
import PageBanner from '../components/PageBanner';
import Icon from '../components/Icon';
import { COURSES, KEY_DOMAIN_COUNT, HEALTH_COURSES } from '../data/horizonData';

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

const ACTUALITES = [
  {
    id:1,
    type:'Admission', typeColor:'var(--hz-gold-500)',
    date:'Rentrée 2026',
    title:'Ouverture des dossiers de candidature 2026',
    excerpt:"L'Université Horizon ouvre officiellement sa plateforme de candidature pour toutes ses filières : Licences et Masters LMD ainsi que Certificats Métiers accélérés. Rejoignez la promotion 2026.",
    icon:'graduation',
    cta:'Candidater maintenant',
    ctaLink:'/admissions'
  },
  {
    id:7,
    type:'Institut', typeColor:'#0E9F6E',
    date:'Première rentrée',
    title:"Institut d'Excellence en Sciences de la Santé Horizon",
    excerpt:`Nouveau pôle de l'Université Horizon : ${HEALTH_COURSES.length} formations de santé, domaines clés cliniques, laboratoires et débouchés hospitaliers. Les candidatures pour la première rentrée sont ouvertes en ligne.`,
    icon:'health',
    cta:"Découvrir l'Institut",
    ctaLink:'/institut-sante'
  },
  {
    id:8,
    type:'Formation', typeColor:'#7C3AED',
    date:'Rentrée 2026',
    title:`${KEY_DOMAIN_COUNT} domaines clés : nouveau catalogue de formations`,
    excerpt:'Passation de Marché Public, Énergie Renouvelable, Gestion de projet, Informatique et IA, Logistique et Supply Chain… Retrouvez les 12 domaines clés de l’Université Horizon et leurs Licences et Masters LMD.',
    icon:'graduation',
    cta:'Explorer les formations',
    ctaLink:'/formations'
  },
  {
    id:2,
    type:'Formation', typeColor:'#2563EB',
    date:'Septembre 2026',
    title:'Nouvelle session — Formation Transit Douane & Procédures Portuaires',
    excerpt:'Une nouvelle session intensive de la formation Transit Douane démarre. Places limitées. Contacter le campus Baco Djicoroni Golf pour les inscriptions.',
    icon:'ship',
    cta:'Voir la formation',
    ctaLink:'/formations'
  },
  {
    id:3,
    type:'Formation', typeColor:'#2563EB',
    date:'Septembre 2026',
    title:'Nouvelle session — QHSE & Responsabilité Sociétale (RSE)',
    excerpt:'Devenez un expert certifié en management QHSE (ISO 9001, 14001, 45001). Formation accélérée à intensité professionnelle. Inscription ouverte.',
    icon:'settings',
    cta:'En savoir plus',
    ctaLink:'/formations'
  },
  {
    id:4,
    type:'Événement', typeColor:'#7C3AED',
    date:'[DATE À FOURNIR]',
    title:'Horizon Forum 2026 — Innovation & Emploi au Mali',
    excerpt:"L'Université Horizon organise son forum annuel réunissant professionnels, anciens étudiants et recruteurs pour des conférences, tables rondes et job dating.",
    icon:'globe',
    cta:'En savoir plus',
    ctaLink:'/contact'
  },
  {
    id:5,
    type:'Vie Campus', typeColor:'#10B981',
    date:'En continu',
      title:"Pôle Carrières — Ateliers CV & Simulation d'Entretien",
    excerpt:'Notre Pôle Carrières organise régulièrement des ateliers pratiques : rédaction de CV professionnel, préparation aux entretiens et stratégies de recherche d\'emploi.',
    icon:'briefcase',
    cta:'Découvrir le campus',
    ctaLink:'/campus'
  },
  {
    id:6,
    type:'Partenariat', typeColor:'#C0392B',
    date:'[DATE À FOURNIR]',
    title:'Convention avec des entreprises partenaires — [À FOURNIR]',
      excerpt:"L'Université Horizon développe activement son réseau de partenariats pour favoriser les stages et l'insertion professionnelle de ses étudiants.",
    icon:'handshake',
    cta:'Voir nos partenariats',
    ctaLink:'/universite'
  },
];

export default function ActualitesPage() {
  return (
    <div className='page-enter'>

      {/* BANDEAU */}
      <PageBanner
        image='/assets/Groupe_étudiants.jpeg'
        breadcrumb='Actualités'
        title='Actualités'
        highlight='Horizon'
        description="Candidatures ouvertes, nouvelles sessions de formation, événements académiques et vie de campus."
      />

      {/* ACTU PRINCIPALE */}
      <section className='hz-section' style={{ background:'var(--bg-page)' }}>
        <div className='hz-container'>
          <Reveal>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'2rem', marginBottom:'3.5rem' }}>
              <div className='card' style={{ padding:0, overflow:'hidden', borderColor:'var(--hz-gold-border)', boxShadow:'var(--shadow-gold)' }}>
                <div style={{ background:'linear-gradient(135deg,#0D2240,#15315B)', padding:'2.5rem', position:'relative', overflow:'hidden' }}>
                  <div style={{ marginBottom:'1rem' }}><Icon name='graduation' size={34} /></div>
                  <span style={{ background:'var(--hz-gold-500)', color:'#071526', fontSize:'0.72rem', fontWeight:'800', padding:'3px 10px', borderRadius:'4px', textTransform:'uppercase', letterSpacing:'0.07em' }}>À LA UNE</span>
                  <h2 style={{ fontSize:'clamp(1.5rem,2.5vw,2rem)', color:'#fff', marginTop:'1rem', marginBottom:'0.75rem', lineHeight:1.2 }}>
                    Candidature 2026 — Dossiers Ouverts
                  </h2>
                  <p style={{ fontSize:'1rem', color:'rgba(255,255,255,0.8)', lineHeight:1.7 }}>
                    Rejoignez la promotion 2026 de l'Université Horizon : Licences et Masters LMD ainsi que Certificats Métiers accélérés disponibles sur notre plateforme de candidature en ligne.
                  </p>
                </div>
                <div style={{ padding:'1.5rem', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontSize:'0.875rem', color:'var(--text-400)' }}>Rentrée 2026 • Bamako, Mali</span>
                  <Link to='/admissions' className='btn btn-gold btn-sm'>Candidater <ArrowRight size={14}/></Link>
                </div>
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
                {[
                  { icon:BookOpen, color:'#2563EB', title:`${COURSES.length} formations`, sub:'disponibles' },
                  { icon:Users, color:'#7C3AED', title:`${KEY_DOMAIN_COUNT} domaines`, sub:'clés' },
                  { icon:Award, color:'var(--hz-gold-500)', title:'Diplômes', sub:'reconnus État' },
                  { icon:Sparkles, color:'#10B981', title:'Encadrement', sub:'rapproché' },
                ].map((s, i) => {
                  const SIcon = s.icon;
                  return (
                    <div key={i} className='card' style={{ padding:'1.25rem', textAlign:'center' }}>
                      <div style={{ width:'40px', height:'40px', borderRadius:'10px', background:`${s.color}18`, margin:'0 auto 10px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <SIcon size={18} color={s.color}/>
                      </div>
                      <div style={{ fontSize:'1.125rem', fontWeight:'800', color:'var(--text-900)' }}>{s.title}</div>
                      <div style={{ fontSize:'0.78rem', color:'var(--text-400)', fontWeight:'600' }}>{s.sub}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* GRILLE D'ACTUALITÉS */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:'1.75rem' }}>
            {ACTUALITES.slice(1).map((actu, i) => (
              <Reveal key={actu.id} delay={i*80}>
                <div className='card card-hover' style={{ display:'flex', flexDirection:'column', justifyContent:'space-between', height:'100%' }}>
                  <div>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem' }}>
                      <span style={{ fontSize:'0.72rem', fontWeight:'800', textTransform:'uppercase', letterSpacing:'0.08em', color:actu.typeColor, background:`${actu.typeColor}18`, padding:'3px 10px', borderRadius:'var(--radius-full)', border:`1px solid ${actu.typeColor}30` }}>
                        {actu.type}
                      </span>
                      <div style={{ display:'flex', alignItems:'center', gap:'5px', fontSize:'0.78rem', color:'var(--text-400)' }}>
                        <Calendar size={13}/> {actu.date}
                      </div>
                    </div>
                    <div style={{ marginBottom:'0.75rem' }}><Icon name={actu.icon} size={26} /></div>
                    <h3 style={{ fontSize:'1.125rem', marginBottom:'0.75rem', lineHeight:1.35 }}>{actu.title}</h3>
                    <p style={{ fontSize:'0.875rem', color:'var(--text-600)', lineHeight:1.65 }}>{actu.excerpt}</p>
                  </div>
                  <div style={{ paddingTop:'1.25rem', borderTop:'1px solid var(--border-100)', marginTop:'1.25rem' }}>
                    <Link to={actu.ctaLink} className='btn btn-outline btn-sm' style={{ justifyContent:'center', width:'100%' }}>
                      {actu.cta} <ArrowRight size={14}/>
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
