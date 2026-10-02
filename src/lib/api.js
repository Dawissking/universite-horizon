/**
 * Client de l'API PHP Université Horizon.
 *
 * Toutes les requêtes partent en same-origin avec les cookies de session
 * (`credentials: 'include'`), ce qui permet aux portails Student, Teacher
 * et Admin de s'authentifier côté serveur.
 */

/** URL de base de l'API, injectée à la construction. */
const API_BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/+$/, '');

/** Erreur renvoyée par l'API, avec le code HTTP pour un traitement fin. */
export class ApiError extends Error {
  constructor(message, status, payload) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.payload = payload || {};
  }
}

async function parse(response) {
  const text = await response.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { error: 'Réponse illisible du serveur.' };
  }
  if (!response.ok) {
    throw new ApiError(data.error || `Erreur ${response.status}`, response.status, data);
  }
  return data;
}

/** Requête JSON standard. */
async function request(path, { method = 'GET', body, action } = {}) {
  const url = new URL(`${API_BASE}/${path}`, window.location.origin);
  if (action) url.searchParams.set('action', action);
  Object.entries(body || {}).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v);
  });

  const response = await fetch(url, {
    method,
    credentials: 'include',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  return parse(response);
}

/** Envoi de données multipart (téléversement de fichiers). */
async function upload(path, formData, action) {
  const url = new URL(`${API_BASE}/${path}`, window.location.origin);
  if (action) url.searchParams.set('action', action);

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });
  return parse(response);
}

/* ------------------------------------------------------------------ */
/*  Candidature                                                         */
/* ------------------------------------------------------------------ */

/**
 * Dépose un dossier de candidature avec ses pièces justificatives.
 * @param {object} fields  Champs du candidat
 * @param {File[]} files   Fichiers dans l'ordre de DOC_KEYS
 */
export function submitApplication(fields, files) {
  const form = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    if (value !== undefined && value !== null) form.append(key, String(value));
  });
  files.forEach(({ key, file }) => {
    if (file) form.append(`documents[${key}]`, file, file.name);
  });
  return upload('apply.php', form);
}

/** Clés et libellés des pièces justificatives attendues. */
export const DOC_KEYS = [
  { key: 'diploma',   label: 'Attestation du Baccalauréat ou dernier diplôme' },
  { key: 'birthCert', label: "Copie de l'Extrait d'Acte de Naissance" },
  { key: 'idCard',    label: "Copie de la Pièce d'Identité ou Passeport" },
  { key: 'photo',     label: "Photo d'identité récente (fond blanc)" },
];

/** Taille maximale par pièce, alignée sur la validation serveur. */
export const DOC_MAX_BYTES = {
  diploma: 5 * 1024 * 1024,
  birthCert: 5 * 1024 * 1024,
  idCard: 5 * 1024 * 1024,
  photo: 2 * 1024 * 1024,
};

/** Types MIME acceptés par le serveur. */
export const DOC_MIME = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

/**
 * Vérifie un fichier avant envoi, côté client.
 * Le serveur revalide systématiquement : ceci n'est qu'un confort.
 */
export function validateDocument(file, key) {
  if (!file) return { ok: false, message: 'Aucun fichier sélectionné.' };
  const max = DOC_MAX_BYTES[key];
  if (file.size > max) {
    return { ok: false, message: `Fichier trop volumineux (max ${Math.round(max / 1024 / 1024)} Mo).` };
  }
  if (!DOC_MIME.includes(file.type)) {
    return { ok: false, message: 'Format non accepté. Utilisez PDF, JPEG ou PNG.' };
  }
  return { ok: true };
}

/* ------------------------------------------------------------------ */
/*  Suivi de dossier                                                   */
/* ------------------------------------------------------------------ */

export function trackApplication(reference, email) {
  return request('track.php', { action: null, body: { reference, email } });
}

/* ------------------------------------------------------------------ */
/*  Contact                                                            */
/* ------------------------------------------------------------------ */

export function sendMessage(payload) {
  return request('contact.php', { method: 'POST', body: payload });
}

/* ------------------------------------------------------------------ */
/*  Authentification                                                    */
/* ------------------------------------------------------------------ */

export const auth = {
  login: (email, password) => request('auth.php', { method: 'POST', action: 'login', body: { email, password } }),
  logout: () => request('auth.php', { method: 'POST', action: 'logout' }),
  me: () => request('auth.php', { action: 'me' }),
};

/* ------------------------------------------------------------------ */
/*  Portail étudiant                                                   */
/* ------------------------------------------------------------------ */

export const studentApi = {
  grades: () => request('student.php', { action: 'grades' }),
  applications: () => request('student.php', { action: 'documents' }),
  applicationDocuments: (reference) =>
    request('student.php', { action: 'application', body: { reference } }),
};

/* ------------------------------------------------------------------ */
/*  Portail enseignant                                                 */
/* ------------------------------------------------------------------ */

export const teacherApi = {
  courses: () => request('teacher.php', { action: 'courses' }),
  students: () => request('teacher.php', { action: 'students' }),
  myGrades: () => request('teacher.php', { action: 'mygrades' }),
  addGrade: (payload) => request('teacher.php', { method: 'POST', action: 'grade', body: payload }),
};

/* ------------------------------------------------------------------ */
/*  Portail administration                                             */
/* ------------------------------------------------------------------ */

export const adminApi = {
  stats: () => request('admin.php', { action: 'stats' }),
  applications: ({ status, search } = {}) => request('admin.php', { action: 'applications', body: { status, search } }),
  application: (id) => request('admin.php', { action: 'application', body: { id } }),
  review: (payload) => request('admin.php', { method: 'POST', action: 'review', body: payload }),
  users: () => request('admin.php', { action: 'users' }),
  createUser: (payload) => request('admin.php', { method: 'POST', action: 'create-user', body: payload }),
};

/* ------------------------------------------------------------------ */
/*  Téléchargement d'une pièce justificative                            */
/* ------------------------------------------------------------------ */

/**
 * Télécharge un document protégé. Le nom de fichier du candidat est
 * conservé côté navigateur ; le contrôle d'accès est fait par le serveur.
 */
export async function downloadDocument(id, filename) {
  const url = new URL(`${API_BASE}/document.php`, window.location.origin);
  url.searchParams.set('id', String(id));

  const response = await fetch(url, { credentials: 'include' });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new ApiError(data.error || 'Téléchargement impossible.', response.status, data);
  }

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = filename || 'document';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(objectUrl);
}
