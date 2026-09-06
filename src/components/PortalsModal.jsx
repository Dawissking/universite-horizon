import React, { useState } from 'react';
import { 
  UserCheck, GraduationCap, Shield, Calendar, BookOpen, 
  FileText, Bell, Award, CheckCircle, BarChart3, Users, 
  Settings, X, Clock, ChevronRight, LogOut 
} from 'lucide-react';

export const PortalsModal = ({ isOpen, onClose }) => {
  const [activePortal, setActivePortal] = useState('student'); // 'student', 'teacher', 'admin'

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '1080px', maxHeight: '92vh', padding: '2rem' }}>
        
        {/* Entête avec Sélecteur de Rôle RBAC */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="badge-official">
              PORTAILS NUMÉRIQUES UNIVERSITÉ HORIZON
            </span>
            <h2 style={{ fontSize: '1.75rem', marginTop: '4px', color: 'var(--text-primary)' }}>
              Espaces & Tableaux de Bord Connectés
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={onClose}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--bg-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={20} color="var(--text-secondary)" />
            </button>
          </div>
        </div>

        {/* Onglets RBAC des 3 Portails */}
        <div style={{
          display: 'flex',
          gap: '10px',
          background: 'var(--bg-subtle)',
          padding: '6px',
          borderRadius: 'var(--radius-md)',
          marginBottom: '2rem'
        }}>
          <button
            onClick={() => setActivePortal('student')}
            style={{
              flex: '1',
              padding: '10px 16px',
              borderRadius: 'var(--radius-sm)',
              background: activePortal === 'student' ? 'var(--hz-navy-900)' : 'transparent',
              color: activePortal === 'student' ? '#FFFFFF' : 'var(--text-secondary)',
              fontWeight: '700',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all var(--transition-fast)'
            }}
          >
            <GraduationCap size={18} color={activePortal === 'student' ? 'var(--hz-gold-primary)' : 'currentColor'} />
            <span>Espace Étudiant</span>
          </button>

          <button
            onClick={() => setActivePortal('teacher')}
            style={{
              flex: '1',
              padding: '10px 16px',
              borderRadius: 'var(--radius-sm)',
              background: activePortal === 'teacher' ? 'var(--hz-navy-900)' : 'transparent',
              color: activePortal === 'teacher' ? '#FFFFFF' : 'var(--text-secondary)',
              fontWeight: '700',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all var(--transition-fast)'
            }}
          >
            <BookOpen size={18} color={activePortal === 'teacher' ? 'var(--hz-gold-primary)' : 'currentColor'} />
            <span>Espace Enseignant</span>
          </button>

          <button
            onClick={() => setActivePortal('admin')}
            style={{
              flex: '1',
              padding: '10px 16px',
              borderRadius: 'var(--radius-sm)',
              background: activePortal === 'admin' ? 'var(--hz-navy-900)' : 'transparent',
              color: activePortal === 'admin' ? '#FFFFFF' : 'var(--text-secondary)',
              fontWeight: '700',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all var(--transition-fast)'
            }}
          >
            <Shield size={18} color={activePortal === 'admin' ? 'var(--hz-gold-primary)' : 'currentColor'} />
            <span>Administration (RBAC)</span>
          </button>
        </div>

        {/* CORPS DU PORTAIL SÉLECTIONNÉ */}
        <div>
          
          {/* 1. ESPACE ÉTUDIANT */}
          {activePortal === 'student' && (
            <div>
              {/* Salutation & Infos Étudiant */}
              <div style={{
                background: 'linear-gradient(135deg, var(--hz-navy-900) 0%, var(--hz-navy-800) 100%)',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.75rem',
                border: '1px solid var(--hz-gold-border)'
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--hz-gold-light)', fontWeight: '700' }}>
                    MATRICULE : UH-2026-0412 • CAMPUS BAMAKO
                  </div>
                  <h3 style={{ fontSize: '1.75rem', color: '#FFFFFF', margin: '4px 0' }}>
                    Bonjour, Mamadou 👋
                  </h3>
                  <div style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.8)' }}>
                    Licence 2 — Génie Logiciel & Systèmes d'Information • Semestre 3
                  </div>
                </div>

                <div style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(8px)',
                  padding: '12px 20px',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'right',
                  border: '1px solid rgba(255,255,255,0.15)'
                }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--hz-gold-light)', fontWeight: '700' }}>MOYENNE GÉNÉRALE</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#FFFFFF' }}>15.8 / 20</div>
                  <div style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.7)' }}>Mention Bien</div>
                </div>
              </div>

              {/* Module MA PROGRESSION */}
              <div className="card-glass" style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                    Ma Progression Académique (LMD)
                  </div>
                  <span style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--hz-gold-primary)' }}>
                    90 / 180 Crédits ECTS Validés (50%)
                  </span>
                </div>
                <div style={{ width: '100%', height: '10px', background: 'var(--bg-subtle)', borderRadius: '5px', overflow: 'hidden' }}>
                  <div style={{ width: '50%', height: '100%', background: 'linear-gradient(90deg, #2563EB 0%, var(--hz-gold-primary) 100%)' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>Semestre 1 (Validé)</span>
                  <span>Semestre 2 (Validé)</span>
                  <span style={{ fontWeight: '700', color: 'var(--hz-gold-primary)' }}>Semestre 3 (En cours)</span>
                  <span>Semestre 4</span>
                  <span>Semestre 5</span>
                  <span>Semestre 6</span>
                </div>
              </div>

              {/* Grille des services étudiants */}
              <div className="grid-3" style={{ gap: '1rem' }}>
                <div style={{ padding: '1.25rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Calendar size={18} color="var(--hz-gold-primary)" />
                    <span style={{ fontWeight: '700', fontSize: '0.875rem' }}>Emploi du Temps du Jour</span>
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                    • 08h30 - 11h30 : Bases de Données SQL (Salle B2)<br />
                    • 14h00 - 17h00 : Algorithmique Avancée (Amphi 1)
                  </div>
                </div>

                <div style={{ padding: '1.25rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <FileText size={18} color="#2563EB" />
                    <span style={{ fontWeight: '700', fontSize: '0.875rem' }}>Documents & Attestations</span>
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                    • Certificat de scolarité 2026 (Disponible)<br />
                    • Relevé officiel Semestre 2 (Téléchargeable)
                  </div>
                </div>

                <div style={{ padding: '1.25rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Bell size={18} color="var(--hz-red-primary)" />
                    <span style={{ fontWeight: '700', fontSize: '0.875rem' }}>Horizon Alert</span>
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                    • Soutenance des projets tutorés fixée au 15 octobre.<br />
                    • Inscription aux stages de fin d'année ouverte.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. ESPACE ENSEIGNANT */}
          {activePortal === 'teacher' && (
            <div>
              <div style={{
                background: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                border: '1px solid var(--border-medium)',
                marginBottom: '1.5rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <span className="badge-official">ESPACE PROFESSORAL & CHARGÉ DE COURS</span>
                    <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                      Pr. Oumar Coulibaly
                    </h3>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                      Département Sciences & Technologies • Chaire Informatique
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn btn-primary btn-sm">Saisir les Notes</button>
                    <button className="btn btn-secondary btn-sm">Déposer un Syllabus</button>
                  </div>
                </div>
              </div>

              {/* Modules Enseignant */}
              <div className="grid-3" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="card-glass" style={{ padding: '1.25rem' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--hz-navy-900)' }}>3</div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-primary)' }}>Cours Affectés</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>GL2, L3 Réseaux, Certificat Pro</div>
                </div>

                <div className="card-glass" style={{ padding: '1.25rem' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--hz-gold-primary)' }}>84</div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-primary)' }}>Étudiants Encadrés</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Présences & Suivi continu</div>
                </div>

                <div className="card-glass" style={{ padding: '1.25rem' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#10B981' }}>100%</div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-primary)' }}>Évaluations Transmises</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Session Normale Semestre 1 & 2</div>
                </div>
              </div>
            </div>
          )}

          {/* 3. ADMINISTRATION RBAC */}
          {activePortal === 'admin' && (
            <div>
              <div style={{
                background: 'var(--hz-navy-950)',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem 2rem',
                marginBottom: '1.5rem',
                border: '1px solid var(--hz-gold-border)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <span style={{ background: 'var(--hz-gold-primary)', color: '#071526', fontSize: '0.6875rem', fontWeight: '800', padding: '2px 8px', borderRadius: '4px' }}>
                      SUPER ADMIN • RBAC LEVEL 4
                    </span>
                    <h3 style={{ fontSize: '1.5rem', color: '#FFFFFF', marginTop: '4px' }}>
                      Système de Gestion Centralisé Horizon
                    </h3>
                    <div style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.7)' }}>
                      Contrôle des flux d'admission, départements académiques et statistiques
                    </div>
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--hz-gold-light)' }}>
                    Session sécurisée TLS 1.3
                  </div>
                </div>
              </div>

              {/* Métriques d'administration */}
              <div className="grid-4" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '1rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>142</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>Candidatures En Ligne</div>
                  <div style={{ fontSize: '0.6875rem', color: '#10B981', marginTop: '2px' }}>+18 aujourd'hui</div>
                </div>

                <div style={{ padding: '1rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--hz-gold-primary)' }}>5</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>Pôles Académiques</div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '2px' }}>Sciences, Gestion, Droit...</div>
                </div>

                <div style={{ padding: '1rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#2563EB' }}>2</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>Campus Opérationnels</div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '2px' }}>Bamako & Golf</div>
                </div>

                <div style={{ padding: '1rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--hz-red-primary)' }}>6</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>Formations Accélérées</div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '2px' }}>Sessions certifiantes</div>
                </div>
              </div>

              {/* Rôles et Permissions RBAC */}
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>
                  Matrice des Rôles & Accès Sécurisés (RBAC) :
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {["DIRECTION GÉNÉRALE", "SCOLARITÉ CENTRALE", "CHEF DE DÉPARTEMENT", "CORPS ENSEIGNANT", "ÉTUDIANT", "COMMUNICATION & PARTENARIATS"].map((role, idx) => (
                    <span key={idx} style={{ fontSize: '0.75rem', fontWeight: '700', padding: '4px 10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-subtle)', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)' }}>
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
