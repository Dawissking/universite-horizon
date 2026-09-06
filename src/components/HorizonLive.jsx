import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Tag, ChevronRight, Sparkles, Bell } from 'lucide-react';

export const HorizonLive = () => {
  const [timeFilter, setTimeFilter] = useState('upcoming'); // 'today', 'week', 'month', 'upcoming'

  const events = [
    {
      id: 1,
      title: "Cérémonie Officielle d'Accueil de la Nouvelle Promotion",
      category: "Cérémonie",
      timeCategory: "upcoming",
      date: "Prochaine Rentrée",
      time: "09h00",
      location: "Amphithéâtre Central - Campus Bamako",
      description: "Accueil solennel des nouveaux étudiants par la direction académique et remise des guides d'orientation.",
      badge: "Événement Majeur"
    },
    {
      id: 2,
      title: "Masterclass : Les enjeux de la dématérialisation douanière UEMOA",
      category: "Conférence Métier",
      timeCategory: "upcoming",
      date: "Session de Novembre",
      time: "15h30",
      location: "Campus Horizon Golf & Visioconférence",
      description: "Animée par des experts commissionnaires agréés en douane et praticiens du commerce international.",
      badge: "Professionnel"
    },
    {
      id: 3,
      title: "Soutenances Publiques des Projets Tutorés en Génie Logiciel",
      category: "Soutenances",
      timeCategory: "upcoming",
      date: "Session de Décembre",
      time: "10h00",
      location: "Labo Tech - Campus Bamako",
      description: "Présentation des applications web et mobiles conçues par les étudiants devant un jury mixte enseignants-entreprises.",
      badge: "Académique"
    },
    {
      id: 4,
      title: "Atelier Carrières : Préparation au Stage & Pitch Professionnel",
      category: "Atelier",
      timeCategory: "week",
      date: "Ce Samedi",
      time: "14h00",
      location: "Salle Multimédia - Campus Golf",
      description: "Simulation d'entretiens d'embauche et optimisation des CV pour les étudiants de Licence 3 et Certificats.",
      badge: "Insertion"
    }
  ];

  const filteredEvents = events.filter(e => {
    if (timeFilter === 'all' || timeFilter === 'upcoming') return true;
    return e.timeCategory === timeFilter;
  });

  return (
    <section id="actualites" className="hz-section" style={{ background: 'var(--bg-main)' }}>
      <div className="hz-container">
        
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag">
            <Bell size={14} />
            Vie Académique & Événements
          </div>
          <h2 className="section-title">
            Horizon Live™
          </h2>
          <p className="section-subtitle">
            Suivez le pouls des conférences, soutenances publiques et cérémonies qui rythment l'année universitaire.
          </p>
        </div>

        {/* Filtres Temporels */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '2.5rem'
        }}>
          {[
            { id: 'upcoming', label: 'À VENIR' },
            { id: 'week', label: 'CETTE SEMAINE' },
            { id: 'today', label: 'AUJOURD’HUI' },
            { id: 'all', label: 'TOUS LES ÉVÉNEMENTS' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTimeFilter(tab.id)}
              className="btn btn-sm"
              style={{
                background: timeFilter === tab.id ? 'var(--hz-navy-900)' : 'var(--bg-surface)',
                color: timeFilter === tab.id ? '#FFFFFF' : 'var(--text-secondary)',
                border: timeFilter === tab.id ? '1px solid var(--hz-gold-primary)' : '1px solid var(--border-subtle)',
                fontWeight: '700'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Liste des Événements */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="card-glass"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.75rem'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className="badge-official">{evt.badge}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>{evt.category}</span>
                </div>

                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.75rem', lineHeight: 1.35 }}>
                  {evt.title}
                </h3>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {evt.description}
                </p>
              </div>

              <div style={{
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                fontSize: '0.8125rem',
                color: 'var(--text-muted)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={14} color="var(--hz-gold-primary)" />
                  <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{evt.date} • {evt.time}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={14} color="var(--hz-gold-primary)" />
                  <span>{evt.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
