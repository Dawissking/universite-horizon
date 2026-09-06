import React, { useState } from 'react';
import { INSTITUTION } from '../data/horizonData';
import { 
  Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, 
  HelpCircle, MessageSquare, Clock, UserCheck 
} from 'lucide-react';

export const ContactSection = () => {
  const [selectedService, setSelectedService] = useState('admissions');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const services = [
    { id: 'admissions', label: 'Admissions & Inscriptions', email: 'admissions@universite-horizon.ml', desc: 'Questions sur les conditions d’accès, le dépôt de dossier et les bourses.' },
    { id: 'scolarite', label: 'Scolarité & Certificats', email: 'scolarite@universite-horizon.ml', desc: 'Demandes de relevés, attestations d’inscription et emplois du temps.' },
    { id: 'direction', label: 'Direction Pédagogique', email: 'direction@universite-horizon.ml', desc: 'Validation des équivalences, jurys et encadrement professoral.' },
    { id: 'communication', label: 'Communication & Médias', email: 'communication@universite-horizon.ml', desc: 'Relations presse, événements officiels et partenariats digitaux.' },
    { id: 'partenariats', label: 'Entreprises & Partenariats', email: 'partenaires@universite-horizon.ml', desc: 'Offres de stages, conventions entreprises et recrutement alumni.' }
  ];

  const currentService = services.find(s => s.id === selectedService) || services[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="hz-section" style={{ background: 'var(--bg-main)' }}>
      <div className="hz-container">
        
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag">
            <Mail size={14} />
            Guichet d'Orientation & Coordonnées
          </div>
          <h2 className="section-title">
            Contact Intelligent & Services Dédiés
          </h2>
          <p className="section-subtitle">
            Une prise en charge rapide et directe par le service académique ou administratif concerné par votre requête.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem'
        }}>
          
          {/* Colonne Gauche : JE SAIS CE QUE JE CHERCHE & Coordonnées */}
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--hz-gold-primary)', letterSpacing: '0.08em', marginBottom: '8px' }}>
                ORIENTATION DIRECTE
              </div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                « Je sais ce que je cherche »
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                Sélectionnez le département compétent pour adresser votre message directement à son responsable :
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {services.map((srv) => {
                  const isSelected = selectedService === srv.id;
                  return (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => setSelectedService(srv.id)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-md)',
                        background: isSelected ? 'var(--hz-navy-900)' : 'var(--bg-surface)',
                        color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
                        border: isSelected ? '2px solid var(--hz-gold-primary)' : '1px solid var(--border-subtle)',
                        textAlign: 'left',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: '700', fontSize: '0.9375rem' }}>{srv.label}</span>
                        {isSelected && <span className="badge-official" style={{ padding: '2px 8px', fontSize: '0.6875rem' }}>Actif</span>}
                      </div>
                      <span style={{ fontSize: '0.75rem', color: isSelected ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)', marginTop: '4px' }}>
                        {srv.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Encadré Coordonnées Officielles */}
            <div className="card-glass" style={{ padding: '1.5rem', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '12px' }}>
                Points d'Accueil & Coordonnées
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <MapPin size={18} color="var(--hz-gold-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Campus Bamako :</strong> [ADRESSE OFFICIELLE : INFORMATION OFFICIELLE À FOURNIR]
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <MapPin size={18} color="var(--hz-gold-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Campus Golf :</strong> [ADRESSE ZONE GOLF : INFORMATION OFFICIELLE À FOURNIR]
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Mail size={18} color="var(--hz-gold-primary)" />
                  <span>contact@universite-horizon.ml</span>
                </div>
              </div>
            </div>

          </div>

          {/* Colonne Droite : Formulaire Dynamique */}
          <div className="card-glass" style={{ padding: '2.5rem', border: '2px solid var(--hz-gold-border)' }}>
            
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <span className="badge-official" style={{ marginBottom: '6px' }}>
                    DESTINATAIRE : {currentService.label.toUpperCase()}
                  </span>
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                    Envoyer un Message Sécurisé
                  </h3>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                    Routage automatique vers : {currentService.email}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Nom complet *</label>
                    <input
                      type="text"
                      required
                      placeholder="Votre prénom et nom"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)' }}
                    />
                  </div>

                  <div className="grid-2" style={{ gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="votre@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Téléphone / WhatsApp</label>
                      <input
                        type="tel"
                        placeholder="+223 ..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Objet de votre demande</label>
                    <input
                      type="text"
                      placeholder="Ex: Demande de brochure officielle / Prise de rendez-vous"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Votre Message *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Expliquez en quelques lignes votre situation ou question..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-main)', color: 'var(--text-primary)', resize: 'vertical' }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-gold"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Send size={18} />
                  <span>Transmettre au service {currentService.label}</span>
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'var(--hz-gold-bg)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}>
                  <CheckCircle2 size={32} color="var(--hz-gold-primary)" />
                </div>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
                  Message Transmis avec Succès
                </h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Votre demande a été enregistrée et transmise directement au bureau <strong>{currentService.label}</strong>. Un conseiller vous répondra sous 24 à 48 heures ouvrées.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', subject: '', message: '' }); }}
                  className="btn btn-secondary btn-sm"
                >
                  Envoyer une autre demande
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
