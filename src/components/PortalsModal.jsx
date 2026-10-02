import React, { useEffect, useState } from 'react';
import {
  GraduationCap, ShieldCheck, BookOpen, X, LogOut, Loader2,
  FileText, BarChart3, Users, Download, Search, PlusCircle, AlertCircle
} from 'lucide-react';
import Icon from './Icon';
import { auth, studentApi, teacherApi, adminApi, downloadDocument, ApiError } from '../lib/api';

const PORTALS = [
  { id: 'student', label: 'Étudiant',    icon: 'graduation', title: 'Tableau de Bord Étudiant' },
  { id: 'teacher', label: 'Enseignant',   icon: 'library',    title: 'Portail Enseignant' },
  { id: 'admin',   label: 'Administration', icon: 'usercog',  title: 'Portail Administration' },
];

const STATUS_LABELS = {
  received: 'Dossier reçu',
  under_review: 'En cours d\'examen',
  accepted: 'Dossier accepté',
  rejected: 'Dossier non retenu',
};

const STATUS_COLORS = {
  received: 'var(--hz-blue, #2563EB)',
  under_review: '#7C3AED',
  accepted: '#059669',
  rejected: '#DC2626',
};

export const PortalsModal = ({ isOpen, onClose }) => {
  const [activePortal, setActivePortal] = useState('student');
  const [user, setUser] = useState(null);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [authError, setAuthError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setSessionChecked(false);
    auth.me()
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setSessionChecked(true));
  }, [isOpen]);

  if (!isOpen) return null;

  const close = () => {
    setCredentials({ email: '', password: '' });
    setAuthError('');
    onClose();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setBusy(true);
    setAuthError('');
    try {
      const data = await auth.login(credentials.email, credentials.password);
      setUser(data.user);
      setCredentials({ email: '', password: '' });
    } catch (error) {
      setAuthError(error.message || 'Connexion impossible.');
    } finally {
      setBusy(false);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.logout();
    } catch {
      // La session peut déjà être expirée : on déconnecte quand même
    }
    setUser(null);
  };

  const switchPortal = (id) => {
    setActivePortal(id);
    setAuthError('');
  };

  return (
    <div className="modal-overlay" onClick={close} role="dialog" aria-modal="true" aria-label="Portails">
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '960px', maxHeight: '90vh', overflowY: 'auto', padding: '2.5rem' }}
      >
        {/* Sélecteur de portail */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span className="badge badge-official">ESPACE NUMÉRIQUE</span>
            <h2 style={{ fontSize: '1.5rem', marginTop: '6px' }}>
              {PORTALS.find((p) => p.id === activePortal)?.title}
            </h2>
          </div>
          <button
            onClick={close}
            aria-label="Fermer"
            style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-muted)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <X size={18} color="var(--text-400)" />
          </button>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
          {PORTALS.map((p) => {
            const active = p.id === activePortal;
            const allowed = user && user.role === p.id;
            return (
              <button
                key={p.id}
                onClick={() => switchPortal(p.id)}
                aria-pressed={active}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '9px 16px', borderRadius: 'var(--radius-full)',
                  fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer',
                  background: active ? 'var(--hz-navy-900)' : 'var(--bg-muted)',
                  color: active ? '#fff' : 'var(--text-600)',
                  border: `1px solid ${active ? 'transparent' : 'var(--border-200)'}`
                }}
              >
                <Icon name={p.icon} size={15} color={active ? 'var(--hz-gold-400)' : 'var(--text-400)'} style={{ width: 26, height: 26, background: 'transparent', border: 'none' }} />
                {p.label}
              </button>
            );
          })}
        </div>

        {!sessionChecked ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
            <Loader2 size={28} className="animate-spin" color="var(--hz-gold-primary)" />
          </div>
        ) : user && user.role === activePortal ? (
          <div>
            <SessionBar user={user} onLogout={handleLogout} />
            {activePortal === 'student' && <StudentDashboard />}
            {activePortal === 'teacher' && <TeacherDashboard teacher={user} />}
            {activePortal === 'admin' && <AdminDashboard />}
          </div>
        ) : user ? (
          <Notice
            tone="warn"
            text={`Votre session est ouverte en tant que ${user.firstName} ${user.lastName}. Ce portail est réservé aux profils « ${PORTALS.find((p) => p.id === activePortal)?.label} ».`}
          />
        ) : (
          <LoginForm
            portal={PORTALS.find((p) => p.id === activePortal)}
            credentials={credentials}
            setCredentials={setCredentials}
            onSubmit={handleLogin}
            error={authError}
            busy={busy}
          />
        )}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Fragments partagés                                                 */
/* ------------------------------------------------------------------ */

const SessionBar = ({ user, onLogout }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap', padding: '14px 18px', background: 'var(--hz-gold-bg)', border: '1px solid var(--hz-gold-border)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
    <div>
      <div style={{ fontWeight: '800', fontSize: '0.95rem' }}>
        {user.firstName} {user.lastName}
      </div>
      <div style={{ fontSize: '0.8125rem', color: 'var(--text-600)' }}>
        {user.email}{user.matricule ? ` · ${user.matricule}` : ''}
      </div>
    </div>
    <button onClick={onLogout} className="btn btn-outline btn-sm">
      <LogOut size={14} /> Déconnexion
    </button>
  </div>
);

const Notice = ({ tone = 'info', text }) => {
  const color = tone === 'warn' ? '#B45309' : 'var(--text-600)';
  const bg = tone === 'warn' ? 'rgba(180,83,9,0.07)' : 'var(--bg-muted)';
  const border = tone === 'warn' ? 'rgba(180,83,9,0.3)' : 'var(--border-200)';
  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '14px 16px', background: bg, border: `1px solid ${border}`, borderRadius: 'var(--radius-md)' }}>
      <AlertCircle size={18} color={color} style={{ flexShrink: 0, marginTop: '1px' }} />
      <span style={{ fontSize: '0.875rem', color, lineHeight: 1.6 }}>{text}</span>
    </div>
  );
};

const LoginForm = ({ portal, credentials, setCredentials, onSubmit, error, busy }) => (
  <form onSubmit={onSubmit} style={{ maxWidth: '440px', margin: '0 auto' }}>
    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
      <div style={{ marginBottom: '1rem' }}><Icon name={portal.icon} size={32} /></div>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Connexion {portal.label}</h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-600)', lineHeight: 1.6 }}>
        Accédez avec les identifiants communiqués par l'administration de l'Université Horizon.
      </p>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div>
        <label className="hz-label" htmlFor={`portal-email-${portal.id}`}>Adresse e-mail</label>
        <input
          id={`portal-email-${portal.id}`}
          className="hz-input"
          type="email"
          autoComplete="username"
          required
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        />
      </div>
      <div>
        <label className="hz-label" htmlFor={`portal-pass-${portal.id}`}>Mot de passe</label>
        <input
          id={`portal-pass-${portal.id}`}
          className="hz-input"
          type="password"
          autoComplete="current-password"
          required
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
      </div>

      {error && (
        <div role="alert" style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '10px 14px', background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.32)', borderRadius: 'var(--radius-sm)' }}>
          <AlertCircle size={16} color="#DC2626" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: '0.8125rem', color: '#DC2626' }}>{error}</span>
        </div>
      )}

      <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }} disabled={busy}>
        {busy ? 'Connexion…' : 'Se connecter'}
      </button>
    </div>
  </form>
);

const Panel = ({ title, children }) => (
  <section style={{ marginBottom: '1.5rem' }}>
    <h4 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '0.875rem', color: 'var(--text-900)' }}>
      {title}
    </h4>
    {children}
  </section>
);

const Loading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: '2.5rem' }}>
    <Loader2 size={24} className="animate-spin" color="var(--hz-gold-primary)" />
  </div>
);

const ErrorBox = ({ error }) => <Notice tone="warn" text={error} />;

/* ------------------------------------------------------------------ */
/*  Portail Étudiant                                                   */
/* ------------------------------------------------------------------ */

function StudentDashboard() {
  const [grades, setGrades] = useState(null);
  const [applications, setApplications] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([studentApi.grades(), studentApi.applications()])
      .then(([g, a]) => {
        setGrades(g);
        setApplications(a.applications);
      })
      .catch((e) => setError(e.message || 'Chargement impossible.'));
  }, []);

  if (error) return <ErrorBox error={error} />;
  if (!grades || !applications) return <Loading />;

  return (
    <div>
      <Panel title="Mes notes">
        {grades.grades.length === 0 ? (
          <Notice text="Aucune note publiée pour le moment. Vos enseignants saisissent les résultats au fil de la campagne." />
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px', marginBottom: '1rem' }}>
              <StatCard label="Moyenne générale" value={grades.average !== null ? `${grades.average}/20` : '—'} />
              <StatCard label="Évaluations" value={grades.grades.length} />
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-200)' }}>
                    <th style={{ padding: '10px 8px', fontWeight: '700' }}>Évaluation</th>
                    <th style={{ padding: '10px 8px', fontWeight: '700' }}>Matière</th>
                    <th style={{ padding: '10px 8px', fontWeight: '700', textAlign: 'right' }}>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {grades.grades.map((g, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border-100)' }}>
                      <td style={{ padding: '10px 8px' }}>{g.label}</td>
                      <td style={{ padding: '10px 8px', color: 'var(--text-600)' }}>{g.course || '—'}</td>
                      <td style={{ padding: '10px 8px', textAlign: 'right', fontWeight: '700' }}>
                        {g.value} / {g.max}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </Panel>

      <Panel title="Mes dossiers de candidature">
        {applications.length === 0 ? (
          <Notice text="Aucun dossier rattaché à votre compte. Les dossiers déposés avec cette adresse e-mail apparaissent ici." />
        ) : (
          applications.map((a) => (
            <div key={a.reference} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap', padding: '12px 16px', background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)', marginBottom: '8px' }}>
              <div>
                <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>{a.reference}</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-600)' }}>{a.course_title || 'Formation à préciser'}</div>
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', color: STATUS_COLORS[a.status] || 'var(--text-600)' }}>
                {STATUS_LABELS[a.status] || a.status}
              </span>
            </div>
          ))
        )}
      </Panel>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Portail Enseignant                                                 */
/* ------------------------------------------------------------------ */

function TeacherDashboard({ teacher }) {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState(null);
  const [recent, setRecent] = useState([]);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ courseId: '', studentId: '', label: '', value: '', max: '20', semester: '' });
  const [formError, setFormError] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    Promise.all([teacherApi.students(), teacherApi.myGrades()])
      .then(([s, g]) => {
        setCourses(s.courses || []);
        setStudents(s.students);
        setRecent(g.grades);
      })
      .catch((e) => setError(e.message || 'Chargement impossible.'));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSaved(false);
    try {
      await teacherApi.addGrade({
        courseId: form.courseId,
        studentId: form.studentId,
        label: form.label,
        value: form.value,
        max: form.max,
        semester: form.semester,
      });
      setForm({ courseId: form.courseId, studentId: '', label: '', value: '', max: '20', semester: '' });
      setSaved(true);
      teacherApi.myGrades().then((g) => setRecent(g.grades));
    } catch (err) {
      setFormError(err.message || 'Enregistrement impossible.');
    }
  };

  if (error) return <ErrorBox error={error} />;
  if (!students) return <Loading />;

  const noCourses = courses.length === 0;

  return (
    <div>
      {noCourses && (
        <div style={{ marginBottom: '1.5rem' }}>
          <Notice tone="warn" text="Aucune formation ne vous est affectée. Contactez l'administration pour obtenir vos affectations avant de saisir des notes." />
        </div>
      )}

      <Panel title="Saisir une note">
        {noCourses || students.length === 0 ? (
          <Notice text="Aucun étudiant inscrit n'est rattaché à vos formations pour le moment." />
        ) : (
          <form onSubmit={submit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
            <div>
              <label className="hz-label" htmlFor="grade-course">Formation</label>
              <select id="grade-course" className="hz-input" required value={form.courseId} onChange={(e) => setForm({ ...form, courseId: e.target.value, studentId: '' })}>
                <option value="">Sélectionner</option>
                {courses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
              </select>
            </div>
            <div>
              <label className="hz-label" htmlFor="grade-student">Étudiant</label>
              <select id="grade-student" className="hz-input" required value={form.studentId} onChange={(e) => setForm({ ...form, studentId: e.target.value })}>
                <option value="">Sélectionner</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>{s.last_name} {s.first_name}{s.matricule ? ` (${s.matricule})` : ''}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="hz-label" htmlFor="grade-label">Intitulé</label>
              <input id="grade-label" className="hz-input" required placeholder="Examen final" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} />
            </div>
            <div>
              <label className="hz-label" htmlFor="grade-value">Note</label>
              <input id="grade-value" className="hz-input" required type="number" step="0.01" min="0" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} />
            </div>
            <div>
              <label className="hz-label" htmlFor="grade-max">Barème</label>
              <input id="grade-max" className="hz-input" type="number" step="0.01" min="1" max="100" value={form.max} onChange={(e) => setForm({ ...form, max: e.target.value })} />
            </div>
            <div>
              <label className="hz-label" htmlFor="grade-sem">Semestre</label>
              <input id="grade-sem" className="hz-input" placeholder="S1, S2…" value={form.semester} onChange={(e) => setForm({ ...form, semester: e.target.value })} />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center', width: '100%' }}>
                <PlusCircle size={15} /> Enregistrer
              </button>
            </div>
            {formError && <div style={{ gridColumn: '1 / -1' }}><Notice tone="warn" text={formError} /></div>}
            {saved && !formError && <div style={{ gridColumn: '1 / -1' }}><Notice text="Note enregistrée et visible par l'étudiant." /></div>}
          </form>
        )}
      </Panel>

      <Panel title={`Dernières notes saisies (${recent.length})`}>
        {recent.length === 0 ? (
          <Notice text="Aucune note saisie pour le moment." />
        ) : (
          recent.slice(0, 10).map((g) => (
            <div key={g.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', padding: '10px 14px', background: 'var(--bg-muted)', borderRadius: 'var(--radius-sm)', marginBottom: '6px', fontSize: '0.875rem' }}>
              <span><strong>{g.label}</strong> — {g.student}{g.matricule ? ` (${g.matricule})` : ''}</span>
              <span style={{ fontWeight: '700' }}>{g.value} / {g.max_value}</span>
            </div>
          ))
        )}
      </Panel>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Portail Administration                                             */
/* ------------------------------------------------------------------ */

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState({ status: '', search: '' });
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const [reviewError, setReviewError] = useState('');

  const loadStats = () => adminApi.stats().then(setStats).catch((e) => setError(e.message));
  const loadApplications = (f = filter) =>
    adminApi.applications({ status: f.status, search: f.search })
      .then((d) => setApplications(d.applications))
      .catch((e) => setError(e.message));

  useEffect(() => {
    loadStats();
    loadApplications();
  }, []);

  const review = async (id, status) => {
    setReviewError('');
    try {
      await adminApi.review({ id, status, note: '' });
      setSelected(null);
      loadApplications();
      loadStats();
    } catch (e) {
      setReviewError(e.message || 'Mise à jour impossible.');
    }
  };

  const openDetail = async (id) => {
    setReviewError('');
    try {
      const data = await adminApi.application(id);
      setSelected(data);
    } catch (e) {
      setReviewError(e.message || 'Chargement impossible.');
    }
  };

  return (
    <div>
      {error && <ErrorBox error={error} />}

      {stats && (
        <Panel title="Tableau de bord">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', marginBottom: '1.25rem' }}>
            <StatCard label="Reçus" value={stats.applications.received} color={STATUS_COLORS.received} />
            <StatCard label="En examen" value={stats.applications.under_review} color={STATUS_COLORS.under_review} />
            <StatCard label="Acceptés" value={stats.applications.accepted} color={STATUS_COLORS.accepted} />
            <StatCard label="Non retenus" value={stats.applications.rejected} color={STATUS_COLORS.rejected} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
            <StatCard label="Étudiants" value={stats.users.student} />
            <StatCard label="Enseignants" value={stats.users.teacher} />
            <StatCard label="Administrateurs" value={stats.users.admin} />
          </div>
        </Panel>
      )}

      <Panel title="Dossiers de candidature">
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <select
            className="hz-input"
            style={{ width: 'auto' }}
            value={filter.status}
            onChange={(e) => { const f = { ...filter, status: e.target.value }; setFilter(f); loadApplications(f); }}
          >
            <option value="">Tous les statuts</option>
            {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <input
            className="hz-input"
            style={{ flex: '1 1 200px' }}
            placeholder="Référence, nom ou e-mail"
            value={filter.search}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
            onKeyDown={(e) => { if (e.key === 'Enter') loadApplications(); }}
          />
          <button className="btn btn-outline btn-sm" onClick={() => loadApplications()}>
            <Search size={14} /> Rechercher
          </button>
        </div>

        {applications.length === 0 ? (
          <Notice text="Aucun dossier ne correspond à ces critères." />
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-200)' }}>
                  <th style={{ padding: '10px 8px', fontWeight: '700' }}>Référence</th>
                  <th style={{ padding: '10px 8px', fontWeight: '700' }}>Candidat</th>
                  <th style={{ padding: '10px 8px', fontWeight: '700' }}>Formation</th>
                  <th style={{ padding: '10px 8px', fontWeight: '700' }}>Statut</th>
                  <th style={{ padding: '10px 8px' }}></th>
                </tr>
              </thead>
              <tbody>
                {applications.map((a) => (
                  <tr key={a.id} style={{ borderBottom: '1px solid var(--border-100)' }}>
                    <td style={{ padding: '10px 8px', fontFamily: 'monospace', fontSize: '0.8125rem' }}>{a.reference}</td>
                    <td style={{ padding: '10px 8px' }}>{a.first_name} {a.last_name}</td>
                    <td style={{ padding: '10px 8px', color: 'var(--text-600)' }}>{a.course_title || '—'}</td>
                    <td style={{ padding: '10px 8px', fontSize: '0.75rem', fontWeight: '800', color: STATUS_COLORS[a.status] }}>
                      {STATUS_LABELS[a.status] || a.status}
                    </td>
                    <td style={{ padding: '10px 8px', textAlign: 'right' }}>
                      <button className="btn btn-outline btn-sm" onClick={() => openDetail(a.id)}>
                        <FileText size={13} /> Ouvrir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      {selected && (
        <DetailModal
          application={selected.application}
          documents={selected.documents}
          error={reviewError}
          onClose={() => setSelected(null)}
          onReview={review}
        />
      )}
    </div>
  );
}

const DetailModal = ({ application, documents, error, onClose, onReview }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px', maxHeight: '85vh', overflowY: 'auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <span className="badge badge-official">DOSSIER {application.reference}</span>
          <h3 style={{ fontSize: '1.25rem', marginTop: '6px' }}>
            {application.first_name} {application.last_name}
          </h3>
        </div>
        <button onClick={onClose} aria-label="Fermer" style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'var(--bg-muted)', border: 'none', cursor: 'pointer' }}>
          <X size={17} color="var(--text-400)" />
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '1.25rem' }}>
        <InfoRow label="Formation" value={application.course_title || '—'} />
        <InfoRow label="E-mail" value={application.email} />
        <InfoRow label="Téléphone" value={application.phone || '—'} />
        <InfoRow label="Nationalité" value={application.nationality || '—'} />
        <InfoRow label="Dernier diplôme" value={application.last_degree || '—'} />
        <InfoRow label="Établissement" value={application.high_school || '—'} />
        <InfoRow label="Série du Bac" value={application.serie_bac || '—'} />
        <InfoRow label="Déposé le" value={new Date(application.created_at).toLocaleDateString('fr-FR')} />
      </div>

      {application.motivation && (
        <div style={{ marginBottom: '1.25rem' }}>
          <div className="hz-label">Motivation</div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-600)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
            {application.motivation}
          </p>
        </div>
      )}

      <div style={{ marginBottom: '1.25rem' }}>
        <div className="hz-label">Pièces justificatives</div>
        {documents.length === 0 ? (
          <p style={{ fontSize: '0.875rem', color: 'var(--text-400)' }}>Aucune pièce jointe.</p>
        ) : (
          documents.map((d) => (
            <button
              key={d.doc_key}
              onClick={() => downloadDocument(d.id, d.original_name).catch(() => {})}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', width: '100%', textAlign: 'left', padding: '10px 14px', background: 'var(--bg-muted)', border: '1px solid var(--border-200)', borderRadius: 'var(--radius-sm)', marginBottom: '6px', cursor: 'pointer', fontSize: '0.875rem' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                <FileText size={15} color="var(--hz-gold-primary)" style={{ flexShrink: 0 }} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.original_name}</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-400)', flexShrink: 0 }}>
                {(d.size_bytes / 1024).toFixed(0)} Ko <Download size={13} />
              </span>
            </button>
          ))
        )}
      </div>

      {error && <div style={{ marginBottom: '1rem' }}><Notice tone="warn" text={error} /></div>}

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button className="btn btn-primary btn-sm" onClick={() => onReview(application.id, 'under_review')}>Mettre en examen</button>
        <button className="btn btn-sm" style={{ background: '#059669', color: '#fff', border: 'none' }} onClick={() => onReview(application.id, 'accepted')}>Accepter</button>
        <button className="btn btn-sm" style={{ background: '#DC2626', color: '#fff', border: 'none' }} onClick={() => onReview(application.id, 'rejected')}>Refuser</button>
      </div>
    </div>
  </div>
);

const InfoRow = ({ label, value }) => (
  <div>
    <div className="hz-label">{label}</div>
    <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>{value}</div>
  </div>
);

const StatCard = ({ label, value, color }) => (
  <div style={{ padding: '14px 16px', background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-100)' }}>
    <div style={{ fontSize: '0.72rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-400)' }}>{label}</div>
    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: color || 'var(--text-900)', marginTop: '4px' }}>{value}</div>
  </div>
);

export default PortalsModal;