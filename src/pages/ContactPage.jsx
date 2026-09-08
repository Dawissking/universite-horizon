import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { INSTITUTION } from '../data/horizonData';
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQ } from '../data/horizonData';

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

function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
      {FAQ.map((item, i) => {
        const open = openIdx === i;
        return (
          <div key={i} style={{ border:'1px solid', borderColor:open?'var(--hz-gold-border)':'var(--border-100)', borderRadius:'var(--radius-md)', overflow:'hidden', transition:'border-color 200ms', background:open?'var(--hz-gold-bg)':'var(--bg-card)' }}>
            <button onClick={() => setOpenIdx(open ? null : i)} style={{
              width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center',
              padding:'1.125rem 1.375rem', textAlign:'left', background:'none', fontWeight:'700', fontSize:'0.9375rem', gap:'1rem'
            }}>
              <span>{item.q}</span>
              {open ? <ChevronUp size={18} color='var(--hz-gold-500)'/> : <ChevronDown size={18} color='var(--text-400)'/>}
            </button>
            {open && (
              <div style={{ padding:'0 1.375rem 1.25rem', fontSize:'0.9375rem', color:'var(--text-600)', lineHeight:1.75 }}>
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', subject:'', message:'' });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => { setSent(true); setSubmitting(false); }, 1200);
  };
  if (sent) return (
    <div style={{ textAlign:'center', padding:'3rem 1.5rem' }}>
      <div style={{ width:'56px', height:'56px', borderRadius:'50%', background:'var(--hz-gold-bg)', display:'inline-flex', alignItems:'center', justifyContent:'center', marginBottom:'1rem' }}>
          <Check size={28} color='var(--hz-gold-500)'/>
      </div>
      <h3 style={{ fontSize:'1.5rem', marginBottom:'8px' }}>Message envoyé !</h3>
      <p style={{ color:'var(--text-600)', lineHeight:1.65 }}>Notre équipe vous répondra dans les meilleurs délais.</p>
      <button onClick={() => { setForm({ name:'',email:'',phone:'',subject:'',message:'' }); setSent(false); }} className='btn btn-outline btn-sm' style={{ marginTop:'1.5rem' }}>
        Envoyer un autre message
      </button>
    </div>
  );
  return (
    <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
      <div className='grid-2' style={{ gap:'1rem' }}>
        <div><label className='hz-label'>Nom complet *</label>
          <input required className='hz-input' placeholder='Amadou Konaté' value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
        <div><label className='hz-label'>Email *</label>
          <input required className='hz-input' type='email' placeholder='votre@email.com' value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div>
      </div>
      <div className='grid-2' style={{ gap:'1rem' }}>
        <div><label className='hz-label'>Téléphone</label>
          <input className='hz-input' type='tel' placeholder='+223 ...' value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></div>
        <div><label className='hz-label'>Objet *</label>
          <select required className='hz-input' value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})}>
            <option value=''>— Choisir un sujet —</option>
            <option>Renseignements sur une formation</option>
            <option>Procédure d'admission</option>
            <option>Frais de scolarité & Paiement</option>
            <option>Vie de campus</option>
            <option>Partenariat & Entreprises</option>
            <option>Autre demande</option>
          </select>
        </div>
      </div>
      <div><label className='hz-label'>Votre message *</label>
          <textarea required className='hz-input' rows={5} placeholder='Décrivez votre demande…' value={form.message} onChange={e=>setForm({...form,message:e.target.value})} style={{ resize:'vertical' }}/>
      </div>
      <button type='submit' disabled={submitting || !form.name || !form.email || !form.subject || !form.message} className='btn btn-gold' style={{ justifyContent:'center', opacity:(!form.name||!form.email||!form.subject||!form.message)?0.6:1 }}>
          {submitting ? '⏳ Envoi en cours…' : <><Send size={16}/> Envoyer le message</>}
      </button>
    </form>
  );
}

export default function ContactPage() {
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
              <span style={{ color:'var(--hz-gold-400)', fontSize:'0.875rem', fontWeight:'600' }}>Contact</span>
            </div>
            <h1 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(2rem,4vw,3rem)', color:'#fff', marginBottom:'1rem' }}>
              Contactez-<span style={{ color:'var(--hz-gold-400)' }}>Nous</span>
            </h1>
            <p style={{ fontSize:'1.0625rem', color:'rgba(255,255,255,0.78)', maxWidth:'540px', lineHeight:1.7 }}>
              Notre équipe est disponible pour répondre à toutes vos questions, vous orienter et vous accompagner dans votre projet universitaire.
            </p>
          </div>
        </div>
      </section>

      {/* COORDONNÉES */}
      <section className='hz-section' style={{ background:'var(--bg-page)' }}>
        <div className='hz-container'>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'1.25rem', marginBottom:'4rem' }}>
            {[
                { icon:Phone, color:'var(--hz-gold-500)', title:'Téléphone', content: INSTITUTION.contacts.phones, href: 'tel:+22377677575', type:'phones' },
              { icon:Mail, color:'#2563EB', title:'Email', content:[INSTITUTION.contacts.email, INSTITUTION.contacts.emailAdmissions], href:`mailto:${INSTITUTION.contacts.email}`, type:'emails' },
              { icon:MapPin, color:'var(--hz-red-600)', title:'Adresse Principale', content:['Baco Djicoroni Golf','Bamako, Mali'], href:INSTITUTION.campuses[0].mapsUrl, type:'map' },
                { icon:Clock, color:'#7C3AED', title:"Heures d'Accueil", content:['Lun — Ven : 07h30 — 18h00','Samedi : 08h00 — 13h00'], type:'schedule' },
                { icon:MessageCircle, color:'#10B981', title:'WhatsApp Rapide', content:['+223 77 67 75 75','Réponse sous 24h ouvrables'], href:INSTITUTION.socialLinks.whatsapp, type:'whatsapp' },
            ].map((item, i) => {
              const ItemIcon = item.icon;
              return (
                <Reveal key={i} delay={i*80}>
                  <a href={item.href} target={item.type==='map'?'_blank':undefined} rel='noopener noreferrer' className='card card-hover' style={{ display:'block', textDecoration:'none' }}>
                    <div style={{ width:'46px', height:'46px', borderRadius:'12px', background:`${item.color}18`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1rem' }}>
                      <ItemIcon size={22} color={item.color}/>
                    </div>
                    <div style={{ fontSize:'0.72rem', fontWeight:'800', textTransform:'uppercase', color:'var(--text-400)', letterSpacing:'0.08em', marginBottom:'0.5rem' }}>{item.title}</div>
                    {item.content.map((line, j) => (
                        <div key={j} style={{ fontWeight: j===0?'700':'400', fontSize: j===0?'0.9375rem':'0.84rem', color: j===0?'var(--text-900)':'var(--text-400)' }}>{line}</div>
                    ))}
                  </a>
                </Reveal>
              );
            })}
          </div>

          {/* FORMULAIRE + FAQ */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'3rem', alignItems:'start' }}>
            <Reveal>
              <h2 style={{ fontSize:'1.75rem', marginBottom:'1.5rem' }}>Envoyez-nous un Message</h2>
              <div className='card' style={{ padding:'2rem' }}>
                <ContactForm/>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <h2 style={{ fontSize:'1.75rem', marginBottom:'1.5rem' }}>Questions Fréquentes</h2>
              <FaqAccordion/>
              <div style={{ marginTop:'1.5rem', padding:'1.25rem', borderRadius:'var(--radius-md)', background:'var(--hz-gold-bg)', border:'1px solid var(--hz-gold-border)' }}>
                <div style={{ fontWeight:'700', marginBottom:'4px' }}>Besoin d'un rendez-vous physique ?</div>
                <p style={{ fontSize:'0.875rem', color:'var(--text-600)', marginBottom:'0.75rem' }}>
                  Venez nous rencontrer au campus Baco Djicoroni Golf, du lundi au samedi.
                </p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                    <a href='tel:+22377677575' className='btn btn-primary btn-sm'><Phone size={14}/> Appeler</a>
                  <a href={INSTITUTION.campuses[0].mapsUrl} target='_blank' rel='noopener noreferrer' className='btn btn-outline btn-sm'><MapPin size={14}/> Itinéraire</a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

    </div>
  );
}
