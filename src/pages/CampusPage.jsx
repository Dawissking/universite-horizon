import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { INSTITUTION } from '../data/horizonData';
import { MapPin, Phone, Clock, GraduationCap, CheckCircle2, ArrowRight } from 'lucide-react';

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting){ el.style.opacity='1'; el.style.transform= 'translateY(0)'; obs.unobserve(el); }}, { threshold:0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} style={{ opacity:0, transform:'translateY(24px)', transition:`opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms` }}>{children}</div>;
}

export default function CampusPage({ onOpenApply }) {
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
              <span style={{ color:'var(--hz-gold-400)', fontSize:'0.875rem', fontWeight:'600' }}>Campus</span>
            </div>
            <h1 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(2rem,4vw,3rem)', color:'#fff', marginBottom:'1rem' }}>
              Nos <span style={{ color:'var(--hz-gold-400)' }}>Campus</span> & Vie Étudiante
            </h1>
            <p style={{ fontSize:'1.0625rem', color:'rgba(255,255,255,0.78)', maxWidth:'580px', lineHeight:1.7 }}>
              Deux environnements d''excellence à Bamako conçus pour stimuler l''apprentissage, la créativité et l''épanouissement.
            </p>
          </div>
        </div>
      </section>

      {/* CAMPUS CARDS */}
      <section className='hz-section' style={{ background:'var(--bg-page)' }}>
        <div className='hz-container'>
          {INSTITUTION.campuses.map((campus, idx) => (
            <Reveal key={campus.id} delay={idx*150}>
              <div className='card' style={{
                marginBottom:'2.5rem',
                overflow:'hidden',
                padding:0,
                display:'grid',
                gridTemplateColumns: idx%2===0 ? 'auto 1fr' : '1fr auto',
                minHeight:'380px'
              }}>
                {/* Image */}
                <div style={{ width:'340px', minHeight:'100%', overflow:'hidden', position:'relative', order:idx%2===0?0:1 }}>
                  <img src={campus.image} alt={campus.name}
                    style={{ width:'100%', height:'100%', objectFit:'cover' }}
                     onError={e=>{ e.target.style.background='linear-gradient(135deg,#0D2240,#15315B)'; e.target.style.display='block'; }}
                  />
                  {idx === 0 && (
                    <div style={{ position:'absolute', top:'1rem', left:'1rem', background:'var(--hz-gold-500)', color:'#071526', fontSize:'0.72rem', fontWeight:'800', padding:'4px 10px', borderRadius:'4px', textTransform:'uppercase', letterSpacing:'0.07em' }}>
                      Campus Principal
                    </div>
                  )}
                </div>
                {/* Contenu */}
                <div style={{ padding:'2.75rem', order:idx%2===0?1:0 }}>
                  <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginBottom:'1rem' }}>
                    <span className='badge badge-info'>{idx===0?'Campus Principal':'Campus Secondaire'}</span>
                    <span className='badge badge-official'>Diplômes reconnus État malien</span>
                  </div>
                  <h2 style={{ fontSize:'1.625rem', marginBottom:'0.5rem' }}>{campus.name}</h2>
                  <div style={{ display:'flex', alignItems:'center', gap:'7px', color:'var(--text-400)', marginBottom:'1.5rem', fontSize:'0.9rem' }}>
                    <MapPin size={15} color='var(--hz-gold-500)'/>
                    {campus.city}
                  </div>

                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'8px', marginBottom:'1.75rem' }}>
                    {campus.features.map((f, i) => (
                      <div key={i} style={{ display:'flex', gap:'7px', alignItems:'flex-start', fontSize:'0.875rem', color:'var(--text-600)' }}>
                        <CheckCircle2 size={15} color='var(--hz-gold-500)' style={{ flexShrink:0, marginTop:'2px' }}/>
                        {f}
                      </div>
                    ))}
                  </div>

                  <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
                    <a href={campus.mapsUrl} target='_blank' rel='noopener noreferrer' className='btn btn-outline btn-sm'>
                      <MapPin size={14}/> Voir sur la carte
                    </a>
                    <a href={`tel:${campus.phone.replace(/\s/g,'')}`} className='btn btn-primary btn-sm'>
                      <Phone size={14}/> {campus.phone}
                    </a>
                    <button onClick={onOpenApply} className='btn btn-gold btn-sm'>
                      <GraduationCap size={14}/> Candidater ici
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* VIE ÉTUDIANTE */}
      <section className='hz-section' style={{ background:'var(--bg-card)' }}>
        <div className='hz-container'>
          <div style={{ textAlign:'center', marginBottom:'3rem' }}>
            <Reveal>
              <span className='section-badge'>Vie Étudiante</span>
              <h2 className='section-title'>Un Environnement pour Grandir</h2>
              <p className='section-lead'>Au-delà des cours, un campus où l''excellence rime avec épanouissement.</p>
            </Reveal>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:'1.5rem' }}>
            {[
              { emoji:'📚', title:'Bibliothèque Numérique', desc:'Accès à une bibliothèque digitale de ressources académiques, manuels professionnels et bases de données scientifiques.' },
              { emoji:'💻', title:'Laboratoires Informatiques', desc:'Postes informatiques récents, connexion haut-débit, logiciels professionnels sous licence et infrastructure cloud.' },
              { emoji:'🤝', title:'Association des Étudiants', desc:'Bureau des étudiants actif, clubs thématiques, événements culturels et solidarité intraprofessionnelle.' },
              { emoji:'🎯', title:'Pôle Carrières', desc:"Accompagnement à l'insertion : CV, simulation d'entretien, job dating annuel et réseau alumni solidaire.", },
              { emoji:'🏆', title:'Compétitions & Prix', desc:'Olympiades académiques, concours professionnels et challenges innovants récompensant les meilleurs étudiants Horizon.' },
              { emoji:'🌍', title:'Événements & Conférences', desc:"Interventions régulières d'experts nationaux et internationaux, tables rondes et Horizon Forum annuel.", },
            ].map((item, i) => (
              <Reveal key={i} delay={i*70}>
                <div className='card card-hover' style={{ height:'100%' }}>
                  <div style={{ fontSize:'2.25rem', marginBottom:'1rem' }}>{item.emoji}</div>
                  <h3 style={{ fontSize:'1.1rem', marginBottom:'0.625rem' }}>{item.title}</h3>
                  <p style={{ fontSize:'0.875rem', color:'var(--text-600)', lineHeight:1.7 }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HORAIRES */}
      <section className='hz-section' style={{ background:'var(--bg-page)' }}>
        <div className='hz-container'>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'2rem', alignItems:'center' }}>
            <Reveal>
              <span className='section-badge'><Clock size={13}/> Horaires & Accueil</span>
              <h2 className='section-title' style={{ textAlign:'left' }}>Horaires d''Ouverture</h2>
              <div className='card' style={{ padding:'1.75rem' }}>
                {[
                  { day:'Lundi — Vendredi', time:'07h30 — 18h00' },
                  { day:'Samedi',           time:'08h00 — 13h00' },
                  { day:'Dimanche & Jours Fériés', time:'Fermé' },
                ].map((item, i) => (
                  <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'12px 0', borderBottom:i<2?'1px solid var(--border-100)':undefined }}>
                    <span style={{ fontWeight:'600' }}>{item.day}</span>
                    <span style={{ color: item.time==='Fermé' ? 'var(--hz-red-600)' : 'var(--hz-gold-500)', fontWeight:'700' }}>{item.time}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={150}>
              <h3 style={{ fontSize:'1.375rem', marginBottom:'1rem' }}>Rejoignez-Nous sur le Campus</h3>
              <p style={{ fontSize:'0.9375rem', color:'var(--text-600)', lineHeight:1.75, marginBottom:'1.5rem' }}>
                Notre équipe administrative est disponible du lundi au samedi pour vous accueillir, répondre à vos questions et vous accompagner dans votre parcours d''admission.
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'10px', marginBottom:'1.5rem' }}>
                {INSTITUTION.contacts.phones.map((phone, i) => (
                  <a key={i} href={`tel:${phone.replace(/\s/g,'')}`} className='btn btn-primary' style={{ justifyContent:'center' }}>
                    <Phone size={16}/> {phone}
                  </a>
                ))}
              </div>
              <button onClick={onOpenApply} className='btn btn-gold' style={{ justifyContent:'center', width:'100%' }}>
                <GraduationCap size={18}/> Candidater maintenant <ArrowRight size={16}/>
              </button>
            </Reveal>
          </div>
        </div>
      </section>

    </div>
  );
}
