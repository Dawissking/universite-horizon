import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import Icon from '../components/Icon';
import {
  INSTITUTE, HEALTH_COURSES, INSTITUTION
} from '../data/horizonData';
import {
  ArrowRight, CheckCircle2, Target, Calendar, Users, Briefcase,
  GraduationCap, HeartPulse, Microscope, BookOpen
} from 'lucide-react';

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        obs.unobserve(el);
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: 0, transform: 'translateY(32px)',
      transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
      transitionDelay: `${delay}ms`
    }}>
      {children}
    </div>
  );
}

export default function HealthInstitutePage({ onOpenApply }) {
  const navigate = useNavigate();

  return (
    <div className="page-enter">

      <PageBanner
        image="/assets/campus_students.jpeg"
        breadcrumb="Institut Sciences de la Santé"
        title="Institut d'Excellence en Sciences de la Santé"
        highlight="Horizon"
        description={INSTITUTE.summary}
      />

      {/* EN-TÊTE INSTITUTIONNEL */}
      <section className="hz-section" style={{ background: 'var(--bg-page)' }}>
        <div className="hz-container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'2.5rem', alignItems:'start' }}>
            <Reveal>
              <span className="section-badge" style={{ background:'rgba(14,159,110,0.12)', color:'#0E9F6E', borderColor:'rgba(14,159,110,0.3)' }}>
                <HeartPulse size={13}/> {INSTITUTE.status}
              </span>
              <h2 className="section-title">Une entité dédiée à la santé</h2>
              <p className="section-lead">{INSTITUTE.mission}</p>

              <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', marginTop:'2rem' }}>
                <button onClick={() => onOpenApply ? onOpenApply(HEALTH_COURSES[0]) : navigate('/admissions')} className='btn btn-gold'>
                  <GraduationCap size={17}/> Candidater en santé
                </button>
                <button onClick={() => navigate('/formations')} className='btn btn-outline'>
                  Toutes les formations
                </button>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
                {[
                  { icon: Target, title:'Domaines clés', value:`${INSTITUTE.keyDomains.length} domaines`, color:'#0E9F6E' },
                  { icon: GraduationCap, title:'Formations rattachées', value:`${HEALTH_COURSES.length} formations`, color:'#2563EB' },
                  { icon: Calendar, title:'Rentrée', value:INSTITUTE.intake.date, color:'#C99726' },
                  { icon: Users, title:'Effectifs', value:INSTITUTE.intake.capacity, color:'#7C3AED' },
                ].map((item) => (
                  <div key={item.title} style={{ display:'flex', alignItems:'center', gap:'14px', padding:'16px 20px', background:'var(--bg-card)', border:'1px solid var(--border-100)', borderRadius:'var(--radius-md)', boxShadow:'var(--shadow-sm)' }}>
                    <div style={{ width:'44px', height:'44px', borderRadius:'12px', background:`${item.color}18`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <item.icon size={20} color={item.color}/>
                    </div>
                    <div style={{ minWidth:0 }}>
                      <div style={{ fontSize:'0.72rem', fontWeight:'800', textTransform:'uppercase', letterSpacing:'0.07em', color:'var(--text-400)' }}>{item.title}</div>
                      <div style={{ fontWeight:'700', fontSize:'0.9375rem', marginTop:'2px' }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* DOMAINES CLÉS */}
      <section className="hz-section" style={{ background:'var(--bg-card)' }}>
        <div className="hz-container">
          <div style={{ textAlign:'center', marginBottom:'3.5rem' }}>
            <Reveal>
              <span className="section-badge"><Target size={13}/> Domaines Clés</span>
              <h2 className="section-title">Les pôles de l'Institut</h2>
              <p className="section-lead">
                {INSTITUTE.keyDomains.length} domaines clés structurent l'Institut d'Excellence.
                Chacun ouvre un cursus de licence structuré en trois ans, prolongé par un
                master de deux ans, et adossé à des équipements spécifiques.
              </p>
            </Reveal>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'1.5rem' }}>
            {INSTITUTE.keyDomains.map((domain, i) => (
              <Reveal key={domain.id} delay={i * 80}>
                <div className="card card-hover" style={{ height:'100%' }}>
                  <div style={{ marginBottom:'1rem' }}>
                    <Icon name={domain.icon} size={26} color="#0E9F6E"/>
                  </div>
                  <h3 style={{ fontSize:'1.125rem', marginBottom:'0.625rem' }}>{domain.name}</h3>
                  <p style={{ fontSize:'0.9rem', color:'var(--text-600)', lineHeight:1.7 }}>{domain.description}</p>
                  <div style={{ marginTop:'1rem', paddingTop:'0.875rem', borderTop:'1px solid var(--border-100)' }}>
                    <div style={{ fontSize:'0.72rem', fontWeight:'800', textTransform:'uppercase', letterSpacing:'0.07em', color:'var(--text-400)', marginBottom:'4px' }}>
                      Formations rattachées
                    </div>
                    <div style={{ fontSize:'0.875rem', color:'#0E9F6E', fontWeight:'600' }}>
                      {domain.courseIds.length} formation{domain.courseIds.length > 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURES */}
      <section className="hz-section" style={{ background:'var(--bg-page)' }}>
        <div className="hz-container">
          <div style={{ textAlign:'center', marginBottom:'3.5rem' }}>
            <Reveal>
              <span className="section-badge"><Microscope size={13}/> Plateforme Technique</span>
              <h2 className="section-title">Équipements et dispositifs</h2>
              <p className="section-lead">
                L'Institut s'appuie sur une plateforme technique dédiée à la pratique
                clinique et à l'analyse biologique.
              </p>
            </Reveal>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'1.5rem' }}>
            {INSTITUTE.facilities.map((facility, i) => (
              <Reveal key={facility.name} delay={i * 80}>
                <div className="card card-hover" style={{ height:'100%' }}>
                  <div style={{ marginBottom:'1rem' }}>
                    <Icon name={facility.icon} size={24} color="#0E9F6E"/>
                  </div>
                  <h3 style={{ fontSize:'1.0625rem', marginBottom:'0.5rem' }}>{facility.name}</h3>
                  <p style={{ fontSize:'0.875rem', color:'var(--text-600)', lineHeight:1.7 }}>{facility.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FORMATIONS RATTACHÉES */}
      <section className="hz-section" style={{ background:'var(--bg-card)' }}>
        <div className="hz-container">
          <div style={{ textAlign:'center', marginBottom:'3.5rem' }}>
            <Reveal>
              <span className="section-badge"><BookOpen size={13}/> Cursus</span>
              <h2 className="section-title">Formations de l'Institut</h2>
              <p className="section-lead">
                {HEALTH_COURSES.length} formations (Licences et Masters), toutes adossées à des
                stages cliniques encadrés.
              </p>
            </Reveal>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:'1.5rem' }}>
            {HEALTH_COURSES.map((course, i) => (
              <Reveal key={course.id} delay={i * 70}>
                <div className="card card-hover" style={{ height:'100%', display:'flex', flexDirection:'column' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'0.875rem' }}>
                    <span style={{ background:'rgba(14,159,110,0.12)', color:'#0E9F6E', fontSize:'0.7rem', fontWeight:'800', padding:'3px 10px', borderRadius:'var(--radius-full)', letterSpacing:'0.06em' }}>
                      {course.level}
                    </span>
                  </div>
                  <h3 style={{ fontSize:'1.0625rem', marginBottom:'0.75rem', lineHeight:1.4 }}>{course.title}</h3>
                  <p style={{ fontSize:'0.875rem', color:'var(--text-600)', lineHeight:1.7, marginBottom:'1rem', flex:1 }}>{course.objectives}</p>
                  <div style={{ display:'flex', flexDirection:'column', gap:'6px', marginBottom:'1.25rem' }}>
                    {course.careers.slice(0, 3).map((career) => (
                      <div key={career} style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'0.8125rem', color:'var(--text-600)' }}>
                        <CheckCircle2 size={13} color="#0E9F6E" style={{ flexShrink:0 }}/>
                        {career}
                      </div>
                    ))}
                  </div>
                  <button onClick={() => onOpenApply ? onOpenApply(course) : navigate('/formations')} className='btn btn-outline btn-sm' style={{ justifyContent:'center', width:'100%' }}>
                    Découvrir la formation <ArrowRight size={14}/>
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DÉBOUCHÉS */}
      <section className="hz-section" style={{ background:'var(--bg-page)' }}>
        <div className="hz-container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'2.5rem' }}>
            <Reveal>
              <span className="section-badge"><Briefcase size={13}/> Insertion</span>
              <h2 className="section-title" style={{ fontSize:'clamp(1.5rem,2.5vw,2rem)' }}>Débouchés professionnels</h2>
              <p className="section-lead">
                Les diplômés de l'Institut exercent dans les structures de santé du Mali et
                de la sous-région, en secteur public comme en secteur privé.
              </p>
              <button onClick={() => navigate('/contact')} className='btn btn-gold' style={{ marginTop:'1rem' }}>
                Poser une question <ArrowRight size={16}/>
              </button>
            </Reveal>

            <Reveal delay={150}>
              <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                {INSTITUTE.outlets.map((outlet) => (
                  <div key={outlet} style={{ display:'flex', alignItems:'flex-start', gap:'10px', padding:'12px 16px', background:'var(--bg-card)', border:'1px solid var(--border-100)', borderRadius:'var(--radius-sm)' }}>
                    <CheckCircle2 size={16} color="#0E9F6E" style={{ flexShrink:0, marginTop:'2px' }}/>
                    <span style={{ fontSize:'0.9rem', fontWeight:'600' }}>{outlet}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PREMIÈRE RENTRÉE */}
      <section style={{
        background:'linear-gradient(135deg,#0D2240 0%,#15315B 100%)',
        padding:'5rem 0', position:'relative', overflow:'hidden'
      }}>
        <div className="hz-container" style={{ position:'relative', zIndex:1, textAlign:'center' }}>
          <Reveal>
            <span className="section-badge" style={{ background:'rgba(14,159,110,0.2)', color:'#6EE7B7', borderColor:'rgba(14,159,110,0.4)' }}>
              <Calendar size={13}/> Première rentrée
            </span>
            <h2 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(1.75rem,3vw,2.5rem)', color:'#fff', marginBottom:'1rem' }}>
              Rejoignez l'Institut à sa première rentrée
            </h2>
            <p style={{ fontSize:'1.0625rem', color:'rgba(255,255,255,0.78)', maxWidth:'620px', margin:'0 auto 2.5rem', lineHeight:1.75 }}>
              Les candidatures sont ouvertes en ligne. Sélectionnez la filière Sciences de la
              Santé lors de votre candidature et joignez les pièces demandées.
            </p>
            <div style={{ display:'flex', justifyContent:'center', gap:'12px', flexWrap:'wrap' }}>
              <button onClick={() => onOpenApply ? onOpenApply(HEALTH_COURSES[0]) : navigate('/admissions')} className='btn btn-gold btn-lg'>
                <GraduationCap size={18}/> Candidater maintenant
              </button>
              <button onClick={() => navigate('/contact')} className='btn btn-ghost-white btn-lg'>
                Nous contacter
              </button>
            </div>
            <p style={{ fontSize:'0.8125rem', color:'rgba(255,255,255,0.6)', marginTop:'2rem' }}>
              Rentrée : {INSTITUTE.intake.date} · Effectifs : {INSTITUTE.intake.capacity}
              <br/>
              Pour toute question, {INSTITUTION.contacts.email} — {INSTITUTION.contacts.phones[0]}
            </p>
          </Reveal>
        </div>
      </section>

    </div>
  );
}