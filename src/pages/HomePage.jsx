import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap, BookOpen, Compass, ArrowRight,
  ShieldCheck, Users, Globe, Award, Sparkles, Play
} from 'lucide-react';

/* Hook IntersectionObserver pour animer à l'entrée */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        obs.unobserve(el);
      }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* Bloc animé générique */
function Reveal({ children, delay = 0, direction = ""up"' }) {
  const ref = useReveal();
  const init = direction === 'left'
    ? '"translateX(-32px)""
    : direction === ""right"'
    ? '"translateX(32px)""
    : ""translateY(32px)"";
  return (
    <div ref={ref} style={{
      opacity: 0,
      transform: init,
      transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`
    }}>
      {children}
    </div>
  );
}

/* Stat flottante */
function StatBadge({ value, label, delay }) {
  return (
    <Reveal delay={delay}>
      <div style={{
        background: ""var(--bg-card)"",
        border: ""1px solid var(--border-100)"",
        borderRadius: ""var(--radius-md)"",
        padding: ""1rem 1.5rem"',
        textAlign: 'center',
        boxShadow: '"var(--shadow-sm)""
      }}>
        <div style={{ fontSize: ""1.75rem"', fontWeight: '"800"", color: ""var(--hz-gold-500)"", lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: ""0.78rem"', fontWeight: '"600"", color: ""var(--text-400)"", marginTop: ""4px"' }}>{label}</div>
      </div>
    </Reveal>
  );
}

export default function HomePage({ onOpenApply }) {
  return (
    <div className='page-enter'>

      {/* ======================================
          HERO IMMERSIF
      ====================================== */}
      <section style={{
        position: 'relative',
        minHeight: '"calc(100vh - 102px)"",
        display: ""flex"',
        alignItems: 'center',
        overflow: 'hidden',
        background: '"linear-gradient(135deg, #071526 0%, #0D2240 60%, #15315B 100%)""
      }}>
        {/* Orbes de fond */}
        <div className='hero-bg-orb animate-float' style={{ width:'500px', height:'500px', top:'-100px', right:'-80px', background:'radial-gradient(circle, rgba(201,151,38,0.18) 0%, transparent 70%)' }}/>
        <div className='hero-bg-orb' style={{ width:'350px', height:'350px', bottom:'-80px', left:'-60px', background:'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)' }}/>

        {/* Grille décorative */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize:'40px 40px', pointerEvents:'none' }}/>

        <div className='hz-container' style={{ position:'relative', zIndex:1, padding:'5rem 1.5rem' }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'3.5rem', alignItems:'center' }}>

            {/* Texte */}
            <div>
              <div className='animate-fadeInUp' style={{
                display:'inline-flex', alignItems:'center', gap:'7px',
                padding:'5px 14px', borderRadius:'var(--radius-full)',
                background:'rgba(201,151,38,0.12)', color:'var(--hz-gold-400)',
                border:'1px solid rgba(201,151,38,0.3)', fontSize:'0.78rem',
                fontWeight:'800', letterSpacing:'0.09em', textTransform:'uppercase', marginBottom:'1.25rem'
              }}>
                <Sparkles size={13}/> Institution d''Enseignement Supérieur • Mali
              </div>

              <h1 className='"animate-fadeInUp delay-100"" style={{
                fontFamily: ""var(--font-serif)"",
                fontSize: ""clamp(2.5rem, 5vw, 4rem)"",
                color: ""#FFFFFF"',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                marginBottom: '1rem'
              }}>
                UNIVERSITÉ<br/>
                <span style={{
                  background: '"linear-gradient(135deg,#E9BA4B 0%,#C99726 100%)"",
                  WebkitBackgroundClip: ""text"',
                  WebkitTextFillColor: 'transparent'
                }}>HORIZON</span>
              </h1>

              <div className='"animate-fadeInUp delay-200"" style={{
                fontFamily: ""var(--font-serif)"", fontSize: ""clamp(1rem, 2vw, 1.25rem)"",
                color: ""var(--hz-gold-400)"", fontWeight: ""700"", marginBottom: ""0.5rem"'
              }}>
                « Bâtissez votre avenir dans l''Excellence. »
              </div>
              <div className='"animate-fadeInUp delay-300"" style={{
                fontFamily: ""var(--font-serif)"", fontSize: ""1rem"',
                fontStyle: 'italic', color: '"rgba(255,255,255,0.72)"", marginBottom: ""2rem"'
              }}>
                « L''Horizon est à Vous. »
              </div>

              <p className='"animate-fadeInUp delay-300"" style={{
                fontSize: ""1.0625rem"', color: '"rgba(255,255,255,0.78)"",
                lineHeight: 1.75, marginBottom: ""2.25rem"', maxWidth: '520px'
              }}>
                Un écosystème universitaire moderne réunissant Licences LMD, formations accélérées
                certifiantes et encadrement rapproché pour bâtir votre excellence au Mali et à l''international.
              </p>

              <div className='"animate-fadeInUp delay-400"" style={{ display:'flex', flexWrap:'wrap', gap:'12px' }}>
                <button onClick={onOpenApply} className='btn btn-gold btn-lg'>
                  <GraduationCap size={20}/> Candidater maintenant
                </button>
                <Link to='/formations' className='btn btn-ghost-white btn-lg'>
                  <BookOpen size={20}/> Nos formations
                </Link>
                <Link to='/admissions' className='btn btn-ghost-white btn-sm' style={{ alignSelf:'center' }}>
                  <Compass size={16}/> Trouver mon parcours →
                </Link>
              </div>

              {/* Gages de confiance */}
              <div className='"animate-fadeInUp delay-500"" style={{
                display:'flex', flexWrap:'wrap', gap:'1.25rem', marginTop:'2rem',
                paddingTop:'1.5rem', borderTop:'1px solid rgba(255,255,255,0.1)'
              }}>
                <div style={{ display:'flex', alignItems:'center', gap:'7px', fontSize:'0.84rem', color:'rgba(255,255,255,0.8)' }}>
                  <ShieldCheck size={18} color=""var(--hz-gold-400)""/>
                  Diplômes reconnus par l"'État malien
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:'7px', fontSize:'0.84rem', color:'rgba(255,255,255,0.8)' }}>
                  <Users size={18} color=""var(--hz-gold-400)""/>
                  Encadrement rapproché individualisé
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:'7px', fontSize:'0.84rem', color:'rgba(255,255,255,0.8)' }}>
                  <Globe size={18} color=""var(--hz-gold-400)""/>
                  Ouverture internationale
                </div>
              </div>
            </div>

            {/* Visuel */}
            <div className=""animate-fadeInRight delay-200"">
              <div style={{ position:'relative' }}>
                <div style={{
                  borderRadius: '"var(--radius-xl)"",
                  overflow: ""hidden"',
                  border: '"2px solid rgba(201,151,38,0.4)"",
                  boxShadow: ""0 32px 80px rgba(0,0,0,0.5)"",
                  aspectRatio: ""4/3""
                }}>
                  <img src='/assets/hero_students.jpeg' alt='Étudiants Université Horizon'
                    style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, transparent 55%, rgba(7,21,38,0.75) 100%)' }}/>
                  <div style={{ position:'absolute', bottom:'1.25rem', left:'1.25rem', color:'#fff' }}>
                    <div style={{ fontSize:'0.7rem', textTransform:'uppercase', letterSpacing:'0.08em', color:'var(--hz-gold-400)', fontWeight:'800' }}>Promotion Horizon</div>
                    <div style={{ fontSize:'1rem', fontWeight:'700' }}>L"'excellence en action</div>
                  </div>
                </div>

                {/* Badge flottant haut-gauche */}
                <div className='animate-float' style={{
                  position:'absolute', top:'-18px', left:'-18px',
                  background:'var(--bg-card)', border:'1px solid var(--border-200)',
                  borderRadius:'var(--radius-md)', padding:'10px 16px',
                  boxShadow:'var(--shadow-md)', display:'flex', alignItems:'center', gap:'10px', zIndex:2
                }}>
                  <div style={{ width:'34px', height:'34px', borderRadius:'8px', background:'var(--hz-gold-bg)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Sparkles size={16} color='"var(--hz-gold-500)""/>
                  </div>
                  <div>
                    <div style={{ fontSize:'0.875rem', fontWeight:'800' }}>2 Campus</div>
                    <div style={{ fontSize:'0.7rem', color:'var(--text-400)' }}>Bamako & Baco Djicoroni Golf</div>
                  </div>
                </div>

                {/* Badge flottant bas-droite */}
                <div style={{
                  position:'absolute', bottom:'-18px', right:'-14px',
                  background:'var(--bg-card)', border:'2px solid var(--hz-gold-border)',
                  borderRadius:'var(--radius-md)', padding:'12px 18px',
                  boxShadow:'var(--shadow-gold)', display:'flex', alignItems:'center', gap:'12px', zIndex:2
                }}>
                  <div style={{ width:'38px', height:'38px', borderRadius:'50%', background:'linear-gradient(135deg,#0D2240,#15315B)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <GraduationCap size={20} color='"var(--hz-gold-400)""/>
                  </div>
                  <div>
                    <div style={{ fontSize:'0.875rem', fontWeight:'800' }}>LMD + Certificats Métiers</div>
                    <div style={{ fontSize:'0.7rem', color:'var(--hz-gold-500)', fontWeight:'700' }}>Transit · QHSE · Tech · Droit</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================
          BANDE DE STATS
      ====================================== */}
      <section style={{ background:'var(--bg-card)', borderBottom:'1px solid var(--border-100)' }}>
        <div className='hz-container' style={{ padding:'2.5rem 1.5rem' }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:'1.5rem' }}>
            <StatBadge value='"2"" label='Campus à Bamako' delay={0}/>
            <StatBadge value='"5"" label='Pôles Académiques' delay={100}/>
            <StatBadge value='"10+"" label='Filières de Formation' delay={200}/>
            <StatBadge value='"6"" label='Certificats Métiers Accélérés' delay={300}/>
            <StatBadge value='"100%"" label='Diplômes reconnus État malien' delay={400}/>
          </div>
        </div>
      </section>

      {/* ======================================
          PHILOSOPHIE
      ====================================== */}
      <section className='hz-section' style={{ background:'var(--bg-page)' }}>
        <div className='hz-container'>
          <div style={{ textAlign:'center', marginBottom:'3.5rem' }}>
            <Reveal>
              <span className='section-badge'><Sparkles size={13}/> Notre Philosophie</span>
              <h2 className='section-title'>
                « Votre avenir ne se choisit pas seulement.<br/>
                <span className='text-gold'>Il se construit. »</span>
              </h2>
              <p className='section-lead'>
                À l''Université Horizon, chaque cours, chaque projet et chaque accompagnement
                sont conçus pour faire de vous un acteur compétent et confiant de votre propre trajectoire.
              </p>
            </Reveal>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'1.5rem' }}>
            {[
              { icon:'🎯', title:'Notre Vision', text:'Devenir le pôle universitaire de référence en Afrique de l'Ouest, reconnu pour la qualité de ses cadres et la rigueur de ses programmes.'", delay:0 },
              { icon:'🚀', title:'Notre Mission', text:'Délivrer une formation d'excellence articulée autour de l''encadrement rapproché, de la pratique professionnelle et de l''employabilité durable.'", delay:100 },
              { icon:'⭐', title:'Nos Valeurs', text:'Excellence, Intégrité, Innovation et Solidarité : quatre piliers qui guident chaque décision pédagogique et chaque relation humaine sur nos campus.', delay:200 },
              { icon:'🤝', title:'Notre Engagement', text:'Un contrat moral avec chaque famille : diplôme reconnu, infrastructures modernes, stages garantis et réseau alumni actif pour votre insertion.', delay:300 },
            ].map(item => (
              <Reveal key={item.title} delay={item.delay}>
                <div className='card card-hover' style={{ height:'100%' }}>
                  <div style={{ fontSize:'2rem', marginBottom:'1rem' }}>{item.icon}</div>
                  <h3 style={{ fontSize:'1.25rem', marginBottom:'0.75rem', color:'var(--text-900)' }}>{item.title}</h3>
                  <p style={{ fontSize:'0.9375rem', color:'var(--text-600)', lineHeight:1.7 }}>{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================
          POURQUOI HORIZON
      ====================================== */}
      <section className='hz-section' style={{ background:'var(--bg-card)' }}>
        <div className='hz-container'>
          <div style={{ textAlign:'center', marginBottom:'3.5rem' }}>
            <Reveal>
              <span className='section-badge'><Award size={13}/> Nos Différenciateurs</span>
              <h2 className='section-title'>Pourquoi Choisir Horizon ?</h2>
              <p className='section-lead'>Les 6 engagements concrets qui font la différence entre une formation ordinaire et l''expérience Horizon.</p>
            </Reveal>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'1.5rem' }}>
            {[
              { icon:'🏆', title:'Enseignement de Qualité', text:'Syllabus actualisés, praticiens d'entreprise et universitaires reconnus forment ensemble une pédagogie d''excellence.'" },
              { icon:'👥', title:'Encadrement Rapproché', text:'Petits groupes, tuteurs dédiés, disponibilité permanente des enseignants et dispositif de remédiation personnalisé.' },
              { icon:'💡', title:'Culture de l'Innovation'', text:'Laboratoires équipés, projets digitaux transversaux et initiation aux outils numériques pour toutes les filières.' },
              { icon:'🌍', title:'Ouverture Internationale', text:'Anglais professionnel intégré, études de cas mondiales et préparation aux certifications internationales reconnues.' },
              { icon:'🛠️', title:'Approche Pratique & Métier', text:'70 % d'heures pratiques, cas d''entreprises réels, mises en situation chronométrées et stages obligatoires.'" },
              { icon:'🎓', title:'Accompagnement Professionnel', text:'Pôle Carrières actif, ateliers CV/entretien, job dating annuel et réseau solidaire des 500+ alumni Horizon.' },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className='card card-hover' style={{ height:'100%' }}>
                  <div style={{ fontSize:'2rem', marginBottom:'1rem' }}>{item.icon}</div>
                  <h3 style={{ fontSize:'1.125rem', marginBottom:'0.625rem' }}>{item.title}</h3>
                  <p style={{ fontSize:'0.9rem', color:'var(--text-600)', lineHeight:1.7 }}>{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================
          CTA BANNIÈRE
      ====================================== */}
      <section style={{
        background:'linear-gradient(135deg,#0D2240 0%,#15315B 100%)',
        padding:'5rem 0',
        position:'relative',
        overflow:'hidden'
      }}>
        <div className='hero-bg-orb animate-float' style={{ width:'400px', height:'400px', top:'-100px', right:'-80px', background:'radial-gradient(circle, rgba(201,151,38,0.14) 0%, transparent 70%)', opacity:0.5 }}/>
        <div className='hz-container' style={{ position:'relative', zIndex:1, textAlign:'center' }}>
          <Reveal>
            <h2 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(1.75rem,3vw,2.5rem)', color:'#fff', marginBottom:'1rem' }}>
              Votre Horizon commence <span style={{ color:'var(--hz-gold-400)' }}>maintenant.</span>
            </h2>
            <p style={{ fontSize:'1.0625rem', color:'rgba(255,255,255,0.78)', marginBottom:'2.5rem', maxWidth:'580px', margin:'0 auto 2.5rem' }}>
              Rejoignez les étudiantes et étudiants Horizon qui bâtissent leur avenir avec des diplômes reconnus et un encadrement d''excellence.
            </p>
            <div style={{ display:'flex', justifyContent:'center', flexWrap:'wrap', gap:'1rem' }}>
              <button onClick={onOpenApply} className='btn btn-gold btn-lg'>
                <GraduationCap size={20}/> Candidater maintenant
              </button>
              <Link to='/formations' className='btn btn-ghost-white btn-lg'>
                Explorer les formations <ArrowRight size={18}/>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ======================================
          TÉMOIGNAGES
      ====================================== */}
      <section className='hz-section' style={{ background:'var(--bg-page)' }}>
        <div className='hz-container'>
          <div style={{ textAlign:'center', marginBottom:'3rem' }}>
            <Reveal>
              <span className='section-badge'><Sparkles size={13}/> Horizon Stories</span>
              <h2 className='section-title'>L''Excellence Racontée par Ses Acteurs</h2>
            </Reveal>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'2rem' }}>
            {[
              { quote:'L'encadrement rapproché et les projets pratiques m''ont permis de créer ma première app mobile avant même d''obtenir mon diplôme.'", author:'Fatoumata S.', role:'Diplômée — Licence Génie Logiciel', img:'/assets/student_female.jpeg', tag:'Sciences & Tech' },
              { quote:'La formation en transit douane m'a ouvert les portes d''un cabinet agréé. Apprendre sur des cas concrets maliens fait toute la différence.'", author:'Ibrahim T.', role:'Certifié — Transit Douane', img:'/assets/student_grad.jpeg', tag:'Formation Accélérée' },
              { quote:'Voir nos camarades intégrés dans les grandes institutions du pays donne tout son sens à « Bâtissez votre avenir dans l'Excellence ».'", author:'Promotion Horizon', role:'Cérémonie de Diplômes', img:'/assets/graduates.jpeg', tag:'Réussite Alumni' },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className='card card-hover card-gold' style={{ height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
                  <div>
                    <div style={{ fontSize:'0.72rem', fontWeight:'800', textTransform:'uppercase', color:'var(--hz-gold-500)', letterSpacing:'0.08em', marginBottom:'1rem' }}>{s.tag}</div>
                    <p style={{ fontSize:'1rem', fontStyle:'italic', color:'var(--text-600)', lineHeight:1.75, marginBottom:'1.5rem' }}>'"{s.quote}""</p>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:'12px', paddingTop:'1.25rem', borderTop:'1px solid var(--border-100)' }}>
                    <div style={{ width:'46px', height:'46px', borderRadius:'50%', overflow:'hidden', border:'2px solid var(--hz-gold-500)', flexShrink:0 }}>
                      <img src={s.img} alt={s.author} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                    </div>
                    <div>
                      <div style={{ fontWeight:'800', fontSize:'0.9375rem' }}>{s.author}</div>
                      <div style={{ fontSize:'0.78rem', color:'var(--text-400)' }}>{s.role}</div>
                    </div>
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
