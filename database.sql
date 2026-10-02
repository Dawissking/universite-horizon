-- ============================================================
--  UNIVERSITÉ HORIZON — Schéma de base de données
--  MySQL / MariaDB — hébergement hPanel (Hostinger)
--  Import : phpMyAdmin > Importer > database.sql
-- ============================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ------------------------------------------------------------
--  1. DOMAINES ET FORMATIONS
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS domains (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug          VARCHAR(60)  NOT NULL,
  name          VARCHAR(120) NOT NULL,
  color         VARCHAR(9)   NOT NULL DEFAULT '#C99726',
  description   TEXT         NULL,
  created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uniq_domain_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS courses (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  domain_id     INT UNSIGNED NOT NULL,
  code          VARCHAR(30)  NOT NULL,
  title         VARCHAR(180) NOT NULL,
  level         ENUM('Licence','Master','Certificat') NOT NULL DEFAULT 'Licence',
  duration      VARCHAR(60)  NULL,
  capacity      SMALLINT UNSIGNED NULL,
  is_active     TINYINT(1)   NOT NULL DEFAULT 1,
  created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uniq_course_code (code),
  KEY idx_course_domain (domain_id),
  CONSTRAINT fk_course_domain FOREIGN KEY (domain_id)
    REFERENCES domains (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
--  2. UTILISATEURS (portails Étudiant / Enseignant / Administration)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id             INT UNSIGNED NOT NULL AUTO_INCREMENT,
  role           ENUM('student','teacher','admin') NOT NULL,
  email          VARCHAR(190) NOT NULL,
  password_hash  VARCHAR(255) NOT NULL,
  matricule      VARCHAR(40)  NULL COMMENT 'Matricule étudiant ou identifiant professionnel',
  first_name     VARCHAR(80)  NOT NULL,
  last_name      VARCHAR(80)  NOT NULL,
  phone          VARCHAR(30)  NULL,
  is_active      TINYINT(1)   NOT NULL DEFAULT 1,
  last_login_at  DATETIME     NULL,
  created_at     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uniq_user_email (email),
  UNIQUE KEY uniq_user_matricule (matricule),
  KEY idx_user_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
--  3. DOSSIERS DE CANDIDATURE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS applications (
  id                INT UNSIGNED NOT NULL AUTO_INCREMENT,
  reference         VARCHAR(20)  NOT NULL COMMENT 'Identifiant unique communiqué au candidat',
  user_id           INT UNSIGNED NULL COMMENT 'Renseigné si le candidat a un compte',
  course_id         INT UNSIGNED NULL,

  civility          VARCHAR(20)  NULL,
  first_name        VARCHAR(80)  NOT NULL,
  last_name         VARCHAR(80)  NOT NULL,
  birth_date        DATE         NULL,
  birthplace        VARCHAR(120) NULL,
  nationality       VARCHAR(60)  NULL,
  phone             VARCHAR(30)  NULL,
  email             VARCHAR(190) NOT NULL,
  address           VARCHAR(255) NULL,

  last_degree       VARCHAR(80)  NULL,
  serie_bac         VARCHAR(60)  NULL,
  high_school       VARCHAR(180) NULL,
  previous_school   VARCHAR(180) NULL,

  motivation        TEXT         NULL,
  status            ENUM('received','under_review','accepted','rejected') NOT NULL DEFAULT 'received',
  review_note       TEXT         NULL,
  reviewed_by       INT UNSIGNED NULL,
  reviewed_at       DATETIME     NULL,
  created_at        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  UNIQUE KEY uniq_application_ref (reference),
  KEY idx_application_email (email),
  KEY idx_application_status (status),
  KEY idx_application_course (course_id),
  CONSTRAINT fk_application_user FOREIGN KEY (user_id)
    REFERENCES users (id) ON DELETE SET NULL,
  CONSTRAINT fk_application_course FOREIGN KEY (course_id)
    REFERENCES courses (id) ON DELETE SET NULL,
  CONSTRAINT fk_application_reviewer FOREIGN KEY (reviewed_by)
    REFERENCES users (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
--  4. PIÈCES JUSTIFICATIVES
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS application_documents (
  id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  application_id  INT UNSIGNED NOT NULL,
  doc_key         VARCHAR(40)  NOT NULL COMMENT 'diploma, birthCert, idCard, photo',
  original_name   VARCHAR(255) NOT NULL,
  stored_name     VARCHAR(255) NOT NULL,
  mime_type       VARCHAR(100) NOT NULL,
  size_bytes      INT UNSIGNED NOT NULL,
  uploaded_at     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uniq_application_doc (application_id, doc_key),
  CONSTRAINT fk_doc_application FOREIGN KEY (application_id)
    REFERENCES applications (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
--  5. SUIVI DE DOSSIIER (historique des changements de statut)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS application_events (
  id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  application_id  INT UNSIGNED NOT NULL,
  status          VARCHAR(30)  NOT NULL,
  note            VARCHAR(255) NULL,
  created_by      INT UNSIGNED NULL,
  created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_event_application (application_id),
  CONSTRAINT fk_event_application FOREIGN KEY (application_id)
    REFERENCES applications (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
--  6. AFFECTATION DES ENSEIGNANTS AUX FORMATIONS
--     Sans cette table, un enseignant pourrait consulter et
--     modifier le relevé de n'importe quel étudiant. Un
--     enseignant non affecté ne voit aucune liste d'étudiants.
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS teacher_courses (
  teacher_id   INT UNSIGNED NOT NULL,
  course_id    INT UNSIGNED NOT NULL,
  assigned_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (teacher_id, course_id),
  KEY idx_tc_course (course_id),
  CONSTRAINT fk_tc_teacher FOREIGN KEY (teacher_id)
    REFERENCES users (id) ON DELETE CASCADE,
  CONSTRAINT fk_tc_course FOREIGN KEY (course_id)
    REFERENCES courses (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS grades (
  id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
  student_id   INT UNSIGNED NOT NULL,
  teacher_id   INT UNSIGNED NULL,
  course_id    INT UNSIGNED NULL,
  label        VARCHAR(120) NOT NULL COMMENT 'Ex: Examen final, TP, Projet',
  value        DECIMAL(5,2) NOT NULL,
  max_value    DECIMAL(5,2) NOT NULL DEFAULT 20.00,
  semester     VARCHAR(20)  NULL,
  created_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_grade_student (student_id),
  KEY idx_grade_teacher (teacher_id),
  CONSTRAINT fk_grade_student FOREIGN KEY (student_id)
    REFERENCES users (id) ON DELETE CASCADE,
  CONSTRAINT fk_grade_teacher FOREIGN KEY (teacher_id)
    REFERENCES users (id) ON DELETE SET NULL,
  CONSTRAINT fk_grade_course FOREIGN KEY (course_id)
    REFERENCES courses (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
--  7. MESSAGES DU FORMULAIRE DE CONTACT
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_messages (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name        VARCHAR(120) NOT NULL,
  email       VARCHAR(190) NOT NULL,
  phone       VARCHAR(30)  NULL,
  subject     VARCHAR(180) NULL,
  message     TEXT         NOT NULL,
  is_read     TINYINT(1)   NOT NULL DEFAULT 0,
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_message_read (is_read)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================
--  COMPTE ADMINISTRATEUR
--  Le hash du mot de passe ne doit jamais être écrit en clair
--  dans un fichier SQL versionné. Utilisez plutôt :
--
--    php api/setup-admin.php
--
--  Ce script génère un hash bcrypt réel et crée le compte
--  administrateur de façon interactive.
-- ============================================================
