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
              {/* Espace Login Étudiant */}
              <div style={{
                background: 'linear-gradient(135deg, var(--hz-navy-900) 0%, var(--hz-navy-800) 100%)',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.75rem',
                border: '1px solid var(--hz-gold-border)',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--hz-gold-light)', fontWeight: '700' }}>
                    ESPACE ÉTUDIANT — UNIVERSITÉ HORIZON
                  </div>
                  <h3 style={{ fontSize: '1.75rem', color: '#FFFFFF', margin: '4px 0' }}>
                    Tableau de Bord Étudiant
                  </h3>
                  <div style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.8)' }}>
                    Connectez-vous pour accéder à vos notes, emplois du temps et documents officiels.
                  </div>
                </div>
              </div>

              {/* Formulaire de connexion placeholder */}
              <div className="card-glass" style={{ padding: '2rem', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎓</div>
                <h3 style={{ fontSize: '1.375rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                  Connexion Étudiant
                </h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Ce portail sera accessible après l'activation de votre compte étudiant lors de votre inscription officielle.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', margin: '0 auto' }}>
                  <input className="hz-input" placeholder="Identifiant (matricule)" disabled />
                  <input className="hz-input" type="password" placeholder="Mot de passe" disabled />
                  <button className="btn btn-primary" style={{ justifyContent: 'center', opacity: 0.6 }} disabled>
                    Se connecter
                  </button>
                </div>
                <div style={{ marginTop: '1rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  Besoin d'aide ? Contactez la scolarité au +223 77 67 75 75
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
                      Portail Enseignant
                    </h3>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                      Accédez à vos cours, saisissez les notes et gérez vos syllabus.
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulaire de connexion enseignant */}
              <div className="card-glass" style={{ padding: '2rem', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
                <h3 style={{ fontSize: '1.375rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                  Connexion Enseignant
                </h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Ce portail sera accessible après activation de votre compte professoral par l'administration.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', margin: '0 auto' }}>
                  <input className="hz-input" placeholder="Identifiant professionnel" disabled />
                  <input className="hz-input" type="password" placeholder="Mot de passe" disabled />
                  <button className="btn btn-primary" style={{ justifyContent: 'center', opacity: 0.6 }} disabled>
                    Se connecter
                  </button>
                </div>
                <div style={{ marginTop: '1rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  Contact : direction@universite-horizon.ml
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
                      ADMINISTRATION — RBAC
                    </span>
                    <h3 style={{ fontSize: '1.5rem', color: '#FFFFFF', marginTop: '4px' }}>
                      Système de Gestion Centralisé Horizon
                    </h3>
                    <div style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.7)' }}>
                      Accès réservé au personnel administratif autorisé
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulaire de connexion admin */}
              <div className="card-glass" style={{ padding: '2rem', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔐</div>
                <h3 style={{ fontSize: '1.375rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                  Connexion Administration
                </h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Accès sécurisé réservé aux administrateurs avec privilèges RBAC.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', margin: '0 auto' }}>
                  <input className="hz-input" placeholder="Identifiant administrateur" disabled />
                  <input className="hz-input" type="password" placeholder="Mot de passe" disabled />
                  <button className="btn btn-primary" style={{ justifyContent: 'center', opacity: 0.6 }} disabled>
                    Accéder au tableau de bord
                  </button>
                </div>
                <div style={{ marginTop: '1rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  Session sécurisée — Contactez l'administrateur système
                </div>
              </div>

              {/* Rôles et Permissions RBAC */}
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginTop: '1.5rem' }}>
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
