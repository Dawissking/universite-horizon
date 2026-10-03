// ============================================================
// DONNÉES OFFICIELLES — UNIVERSITÉ HORIZON
// Principe Zéro Hallucination : toute info manquante = [À FOURNIR]
// ============================================================

export const INSTITUTION = {
  name:      "Université Horizon",
  tagline1:  "Bâtissez votre avenir dans l'Excellence.",
  tagline2:  "L'Horizon est à Vous.",
  country:   "Mali",
  accreditation: "Diplômes reconnus par l'État malien",

  contacts: {
    phones:  ["+223 77 67 75 75", "+223 76 75 73 29"],
    email:   "contact@universite-horizon.ml",
    emailAdmissions: "admissions@universite-horizon.ml",
  },

  campuses: [
    {
      id:    "golf",
      name:  "Campus Baco Djicoroni Golf",
      city:  "Bamako — Baco Djicoroni Golf",
      address: "Baco Djicoroni Golf, Bamako, Mali",
      mapsUrl: "https://www.google.com/maps/search/Baco+Djicoroni+Golf+Bamako",
      phone: "+223 77 67 75 75",
      image: "/assets/campus_students.jpeg",
      features: [
        "Amphithéâtres climatisés",
        "Laboratoires informatiques",
        "Bibliothèque numérique",
        "Espace de vie étudiante",
        "Salles multimédias connectées",
        "Guichet unique d'orientation"
      ]
    },
    {
      id:    "bamako",
      name:  "Campus Principal — Bamako",
      city:  "Bamako",
      address: "[ADRESSE EXACTE À FOURNIR]",
      mapsUrl: "#",
      phone: "+223 76 75 73 29",
      image: "/assets/hero_students.jpeg",
      features: [
        "Salles de formation accélérée",
        "Laboratoire professionnel QHSE",
        "Salle de conférences",
        "Espace entrepreneuriat",
        "Cafétéria étudiante",
        "Administration centrale"
      ]
    }
  ],

  socialLinks: {
    facebook:  "[LIEN OFFICIEL À FOURNIR]",
    linkedin:  "[LIEN OFFICIEL À FOURNIR]",
    whatsapp:  "https://wa.me/22377677575"
  }
};

// ---- DOMAINES ACADÉMIQUES ----
// Les 12 domaines clés officiellement retenus par l'Université Horizon,
// plus le pôle Sciences de la Santé rattaché à l'Institut d'Excellence.
export const KEY_DOMAIN_COUNT = 12;

export const DOMAINS = [
  {
    id:          "marches-publics",
    name:        "Passation des Marchés Publics",
    badge:       "Pôle Achats Publics",
    color:       "#B45309",
    icon:        "Gavel",
    description: "Maîtriser la commande publique : préparation, mise en concurrence, attribution et suivi des marchés de l'État.",
    programs:    "Marchés Publics, Contrats Publics, Contrôle & Audit des Achats"
  },
  {
    id:          "energie-renouvelable",
    name:        "Énergies Renouvelables",
    badge:       "Pôle Transition Énergétique",
    color:       "#16A34A",
    icon:        "Zap",
    description: "Concevoir, installer et exploiter les installations solaires, éoliennes et hybrides au service du Mali.",
    programs:    "Solaire, Éolien, Efficacité Énergétique, Réseaux intelligents"
  },
  {
    id:          "gestion-projets",
    name:        "Gestion des Projets",
    badge:       "Pôle Pilotage",
    color:       "#2563EB",
    icon:        "FolderKanban",
    description: "Conduire des projets de bout en bout : cadrage, planification, budget, risques et pilotage de la performance.",
    programs:    "Méthodologies Agiles, Planification, Gestion des Risques, QHSE"
  },
  {
    id:          "droit-politique",
    name:        "Droit et Sciences Politiques",
    badge:       "Pôle Régalien",
    color:       "#C0392B",
    icon:        "Scale",
    description: "Droit des affaires OHADA, droit public, institutions politiques et carrières juridiques.",
    programs:    "Droit des Affaires, Droit Public, Sciences Politiques"
  },
  {
    id:          "relation-internationale",
    name:        "Relation Internationnelle",
    badge:       "Pôle Coopération",
    color:       "#0D9488",
    icon:        "Globe",
    description: "Diplomatie, coopération au développement, organisations internationales et affaires géopolitiques.",
    programs:    "Diplomatie, Coopération, Organisations Internationales, ONG"
  },
  {
    id:          "informatique-ia",
    name:        "Informatique et IA",
    badge:       "Pôle Innovation",
    color:       "#7C3AED",
    icon:        "Cpu",
    description: "Développement logiciel, data et intelligence artificielle au service de la transformation digitale africaine.",
    programs:    "Génie Logiciel, Intelligence Artificielle, Data, Cybersécurité"
  },
  {
    id:          "marketing-digital",
    name:        "Marketing Digital & Commerce",
    badge:       "Pôle Croissance",
    color:       "#DB2777",
    icon:        "Megaphone",
    description: "Construire la marque, piloter les campagnes digitales et développer le commerce en ligne.",
    programs:    "Marketing Digital, Communication, E-commerce, Commerce International"
  },
  {
    id:          "comptabilite-finance-audit",
    name:        "Comptabilité-Finances-Audit",
    badge:       "Pôle Excellence",
    color:       "#C99726",
    icon:        "Calculator",
    description: "Comptabilité SYSCOHADA, contrôle de gestion, audit légal et analyse financière.",
    programs:    "Comptabilité, Contrôle de Gestion, Audit, Fiscalité"
  },
  {
    id:          "banque-finance-assurance",
    name:        "Banque Finances et Assurance",
    badge:       "Pôle Marchés Financiers",
    color:       "#1D4ED8",
    icon:        "Landmark",
    description: "Ingénierie financière, gestion de portefeuille, assurance et conformité des institutions financières.",
    programs:    "Banque, Marchés Financiers, Assurance, Ingénierie Financière"
  },
  {
    id:          "management-rh",
    name:        "Management des RH",
    badge:       "Pôle Capital Humain",
    color:       "#EA580C",
    icon:        "Users",
    description: "Attirer, développer et fidéliser les talents : recrutement, paie, droit du travail et stratégie RH.",
    programs:    "Ressources Humaines, Droit du Travail, Paie, Développement des Compétences"
  },
  {
    id:          "logistique-supply-chain",
    name:        "Logistique et Supply Chain",
    badge:       "Pôle Flux & Transit",
    color:       "#0F766E",
    icon:        "Truck",
    description: "Maîtriser les flux physiques : transit douane, transport, entreposage et chaîne d'approvisionnement.",
    programs:    "Transit Douane, Transport, Entreposage, Supply Chain"
  },
  {
    id:          "reseaux-telecom",
    name:        "Réseaux et Télécommunications",
    badge:       "Pôle Connectivité",
    color:       "#475569",
    icon:        "Network",
    description: "Concevoir, déployer et sécuriser les infrastructures de communications fixes, mobiles et fibre optique.",
    programs:    "Réseaux, Télécoms, Fibre Optique, Sécurité des Systèmes"
  },
  {
    id:          "sante",
    name:        "Sciences de la Santé",
    badge:       "Pôle Vitalité",
    color:       "#0E9F6E",
    icon:        "HeartPulse",
    description: "Former des professionnels de santé de qualité : soignants, sages-femmes, techniciens de laboratoire et gestionnaires hospitaliers.",
    programs:    "Infirmier Obstétricien, Sage-Femme, Biologie Médicale, Labo Pharmacie",
    // L'institut d'excellence est l'entité de rattachement du pôle santé.
    institute:   "institut-sante"
  }
];

// ============================================================
//  INSTITUT D'EXCELLENCE EN SCIENCES DE LA SANTÉ HORIZON
//  Entité de rattachement du pôle santé, à la rentrée.
//  Principe Zéro Hallucination : toute information non fournie
//  est marquée [À FOURNIR] plutôt qu'inventée.
// ============================================================
export const INSTITUTE = {
  id: "institut-sante",
  name: "Institut d'Excellence en Sciences de la Santé Horizon",
  shortName: "Institut Sciences de la Santé",
  domainId: "sante",
  color: "#0E9F6E",
  icon: "HeartPulse",
  status: "Première rentrée — [DATE À FOURNIR]",

  mission:
    "Former des professionnels de santé de qualité, capables d'exercer avec rigueur scientifique, hygiène et humanité dans les structures de santé du Mali et de la sous-région.",

  summary:
    "L'Institut d'Excellence en Sciences de la Santé Horizon regroupe l'ensemble des formations de santé de l'Université Horizon dans une entité dédiée. Il structure les cursus cliniques, ouvre des séries de santé dédiées et crée une passerelle entre formation initiale, recherche appliquée et exercice hospitalier.",

  // --- Domaines clés ---
  // Les domaines définitifs seront ceux communiqués par l'Université.
  // Liste provisoire, alignée sur les formations déjà présentes.
  keyDomains: [
    {
      id: "sante-maternelle",
      name: "Santé Maternelle et Infantile",
      icon: "graduation",
      description:
        "Suivi de la grossesse, accouchement, soins néonatals et accompagnement de la femme et de l'enfant.",
      courseIds: ["lic-infirmier-obstetricien", "lic-sage-femme"]
    },
    {
      id: "sante-publique",
      name: "Santé Publique et Épidémiologie",
      icon: "chart",
      description:
        "Prévention, surveillance des maladies, statistiques sanitaires et politiques de santé publique.",
      courseIds: ["lic-sante-publique"]
    },
    {
      id: "biologie-medicale",
      name: "Biologie Médicale et Analyses Cliniques",
      icon: "laptop",
      description:
        "Analyses d'échantillons biologiques, hématologie, biochimie, microbiologie et contrôle qualité.",
      courseIds: ["lic-biologie-medicale"]
    },
    {
      id: "pharmacie-dispensation",
      name: "Pharmacie et Dispensation",
      icon: "settings",
      description:
        "Pharmacognosie, chimie pharmaceutique, dispensation, conseil pharmaceutique et réglementation.",
      courseIds: ["lic-labo-pharmacie"]
    }
  ],

  // --- Infrastructures prevues ---
  facilities: [
    { icon: "laptop", name: "Laboratoires de biologie médicale", text: "Équipements d'analyse, colorimétrie, automates et contrôle qualité." },
    { icon: "graduation", name: "Laboratoire de simulation clinique", text: "Mannequins obstétricaux, matériel de réanimation, simulation de urgences." },
    { icon: "users", name: "Centre de formation clinique", text: "Partenariats avec les structures de santé pour les stages et l'enseignement clinique." },
    { icon: "book", name: "Ressources documentaires santé", text: "Bibliothèque numérique spécialisée, bases de données médicales et périodiques scientifiques." }
  ],

  // --- Débouchés ---
  outlets: [
    "Structures de santé publiques et privées",
    "Hôpitaux de district et centres de santé",
    "Laboratoires d'analyses médicales",
    "Officines et pharmacies hospitalières",
    "Programmes et ONG de santé publique",
    "Administration sanitaire et coordination régionale",
    "Poursuite en études supérieures et recherche"
  ],

  // --- Cibles de la première rentrée ---
  intake: {
    year: "[ANNÉE À FOURNIR]",
    date: "[DATE À FOURNIR]",
    capacity: "[EFFECTIFS À FOURNIR]",
    eligibility: "Baccalauréat, série scientifique ou toutes séries",
    application: "Via le portail de candidature en ligne, rubrique Sciences de la Santé"
  }
};

// ---- FORMATIONS ----
export const COURSES = [
  // FORMATIONS ACCÉLÉRÉES (officiellement documentées)
  {
    id: "fa-transit",
    title: "Transit Douane & Procédures Portuaires",
    domainId: "logistique-supply-chain",
    domainName: "Logistique et Supply Chain",
    level: "Certificat Métier",
    type: "accelerated",
    duration: "[DURÉE À FOURNIR]",
    modality: "Présentiel intensif",
    tuition: "[TARIF À FOURNIR]",
    prerequisites: "Baccalauréat ou expérience équivalente",
    objectives: "Maîtriser la réglementation douanière, la déclaration en détail, le transit inter-États et le dédouanement sous SYDONIA.",
    skills: ["Réglementation douanière UEMOA", "Déclaration SYDONIA", "Contentieux douanier", "Transit international"],
    careers: ["Déclarant en douane", "Agent de transit", "Gestionnaire import/export", "Courtier en douane"]
  },
  {
    id: "fa-qhse",
    title: "QHSE & Responsabilité Sociétale (RSE)",
    domainId: "gestion-projets",
    domainName: "Gestion des Projets",
    level: "Certificat Métier",
    type: "accelerated",
    duration: "[DURÉE À FOURNIR]",
    modality: "Présentiel + Mises en situation",
    tuition: "[TARIF À FOURNIR]",
    prerequisites: "Baccalauréat scientifique/technique ou expérience professionnelle",
    objectives: "Déployer les systèmes de management QHSE (ISO 9001, 14001, 45001) et piloter la démarche RSE.",
    skills: ["Audit des risques", "Normes ISO 9001/14001/45001", "Plans de prévention", "RSE & développement durable"],
    careers: ["Animateur QHSE", "Chargé de mission RSE", "Auditeur sécurité", "Superviseur conformité"]
  },
  {
    id: "fa-bureautique",
    title: "Informatique Bureautique & Outils Collaboratifs",
    domainId: "informatique-ia",
    domainName: "Informatique et IA",
    level: "Certificat Métier",
    type: "accelerated",
    duration: "[DURÉE À FOURNIR]",
    modality: "100 % sur machine",
    tuition: "[TARIF À FOURNIR]",
    prerequisites: "Accessible sans prérequis spécifique",
    objectives: "Maîtriser le pack bureautique avancé, la gestion de données et les outils collaboratifs en ligne.",
    skills: ["Excel avancé", "Word professionnel", "PowerPoint & Pitch", "Suite Google / Office 365"],
    careers: ["Assistant bureautique", "Secrétaire de direction", "Opérateur de saisie", "Gestionnaire de données"]
  },
  {
    id: "fa-comptable",
    title: "Assistante Comptable & Gestion Financière",
    domainId: "comptabilite-finance-audit",
    domainName: "Comptabilité-Finances-Audit",
    level: "Certificat Métier",
    type: "accelerated",
    duration: "[DURÉE À FOURNIR]",
    modality: "Présentiel + Cas d'entreprise",
    tuition: "[TARIF À FOURNIR]",
    prerequisites: "Niveau Bac, idéalement économie/gestion",
    objectives: "Tenir la comptabilité générale SYSCOHADA révisé, effectuer les rapprochements et préparer la paie.",
    skills: ["Comptabilité SYSCOHADA", "Logiciels comptables", "Gestion de la paie", "Déclarations fiscales"],
    careers: ["Assistante comptable", "Aide-comptable", "Gestionnaire de facturation", "Trésorière adjointe"]
  },
  {
    id: "fa-humanitaire",
    title: "Action Humanitaire & Protection de l'Enfance",
    domainId: "relation-internationale",
    domainName: "Relation Internationnelle",
    level: "Certificat Métier",
    type: "accelerated",
    duration: "[DURÉE À FOURNIR]",
    modality: "Présentiel + Séminaires ONG",
    tuition: "[TARIF À FOURNIR]",
    prerequisites: "Baccalauréat toutes séries ou engagement associatif avéré",
    objectives: "Concevoir et évaluer des programmes d'aide, de protection de l'enfance et de soutien communautaire.",
    skills: ["Droit humanitaire international", "Protection de l'enfance", "Gestion de projet ONG", "Suivi & Évaluation"],
    careers: ["Chargé de projet humanitaire", "Agent de protection de l'enfance", "Coordinateur terrain ONG"]
  },
  {
    id: "fa-logistique",
    title: "Logistique Humanitaire & Gestion des Crises",
    domainId: "logistique-supply-chain",
    domainName: "Logistique et Supply Chain",
    level: "Certificat Métier",
    type: "accelerated",
    duration: "[DURÉE À FOURNIR]",
    modality: "Présentiel + Simulations d'urgence",
    tuition: "[TARIF À FOURNIR]",
    prerequisites: "Bac ou expérience professionnelle en logistique/transport",
    objectives: "Piloter la chaîne d'approvisionnement en contexte d'urgence : transport, entreposage, distribution.",
    skills: ["Supply chain humanitaire", "Gestion de flottes", "Achats d'urgence", "Sécurité des convois"],
    careers: ["Logisticien d'urgence", "Responsable entrepôt ONG", "Coordinateur des approvisionnements"]
  },

  // LICENCES LMD
  {
    id: "lic-genie-logiciel",
    title: "Licence — Génie Logiciel & Systèmes d'Information",
    domainId: "informatique-ia",
    domainName: "Informatique et IA",
    level: "Licence (Bac+3)",
    type: "degree",
    duration: "3 ans — 6 semestres",
    modality: "Présentiel + Projets tutorés",
    tuition: "[TARIF À FOURNIR]",
    prerequisites: "Baccalauréat série scientifique ou technique (TSS, TSE, STI…)",
    objectives: "Former des développeurs et architectes d'applications web, mobiles et de systèmes d'information robustes.",
    skills: ["Algorithmique & POO", "Bases de données SQL/NoSQL", "Développement Web & Mobile", "Cloud & DevOps"],
    careers: ["Développeur Full-Stack", "Architecte logiciel", "Administrateur BDD", "Chef de projet IT"]
  },
  {
    id: "lic-comptabilite",
    title: "Licence — Comptabilité, Contrôle & Audit (CCA)",
    domainId: "comptabilite-finance-audit",
    domainName: "Comptabilité-Finances-Audit",
    level: "Licence (Bac+3)",
    type: "degree",
    duration: "3 ans — 6 semestres",
    modality: "Présentiel + Stages annuels",
    tuition: "[TARIF À FOURNIR]",
    prerequisites: "Baccalauréat série Économique, Scientifique ou équivalent",
    objectives: "Délivrer une expertise en finance d'entreprise, audit légal, contrôle de gestion et normes SYSCOHADA.",
    skills: ["Audit comptable", "Contrôle budgétaire", "Droit fiscal malien", "Analyse financière"],
    careers: ["Auditeur junior", "Contrôleur de gestion", "Comptable en cabinet", "Analyste financier"]
  },
  {
    id: "lic-droit",
    title: "Licence — Droit des Affaires & Carrières Juridiques",
    domainId: "droit-politique",
    domainName: "Droit et Sciences Politiques",
    level: "Licence (Bac+3)",
    type: "degree",
    duration: "3 ans — 6 semestres",
    modality: "Présentiel + Clinique juridique",
    tuition: "[TARIF À FOURNIR]",
    prerequisites: "Baccalauréat toutes séries",
    objectives: "Acquérir les fondamentaux du droit OHADA, commercial, contractuel et des institutions judiciaires.",
    skills: ["Droit OHADA", "Rédaction contractuelle", "Droit du travail", "Contentieux des affaires"],
    careers: ["Juriste d'entreprise", "Collaborateur notaire", "Conseiller juridique", "Préparation concours"]
  },
  {
    id: "lic-communication",
    title: "Licence — Communication Digitale & Médias",
    domainId: "marketing-digital",
    domainName: "Marketing Digital & Commerce",
    level: "Licence (Bac+3)",
    type: "degree",
    duration: "3 ans — 6 semestres",
    modality: "Présentiel + Atelier Média Studio",
    tuition: "[TARIF À FOURNIR]",
    prerequisites: "Baccalauréat toutes séries",
    objectives: "Former des stratèges de la communication capables de piloter l'image de marque et les campagnes digitales.",
    skills: ["Stratégie de marque", "Community Management", "Production audiovisuelle", "Relations presse"],
    careers: ["Responsable communication", "Social Media Manager", "Attaché de presse", "Concepteur de campagnes"]
  },
  {
    id: "lic-gesta",
    title: "Licence — Gestion des Entreprises et des Administrations (G.E.S.T.A.)",
    domainId: "management-rh",
    domainName: "Management des RH",
    level: "Licence (Bac+3)",
    type: "degree",
    duration: "3 ans — 6 semestres",
    modality: "Présentiel + Stages en entreprise et administration",
    tuition: "[TARIF À FOURNIR]",
    prerequisites: "Baccalauréat toutes séries",
    objectives: "Former des cadres capables de piloter la gestion d'entreprise et la conduite des affaires publiques dans un contexte africain.",
    skills: ["Management & Organisation", "Comptabilité analytique", "Finances publiques", "Droit des affaires & marchés publics", "Ressources humaines"],
    careers: ["Cadre d'entreprise", "Attaché d'administration", "Gestionnaire de budgets", "Chargé de méthodes & opérations"]
  },

  // ---- LICENCES — 12 DOMAINES CLÉS OFFICIELS ----
  {
    id: "lic-marches-publics",
    title: "Licence — Passation des Marchés Publics & Contrats Publics",
    domainId: "marches-publics",
    domainName: "Passation des Marchés Publics",
    level: "Licence (Bac+3)",
    type: "degree",
    duration: "3 ans — 6 semestres",
    modality: "Présentiel + Cas de passation réels",
    tuition: "[TARIF À FOURNIR]",
    prerequisites: "Baccalauréat toutes séries",
    objectives: "Maîtriser la chaîne de la commande publique : préparation des achats, mise en concurrence, évaluation des offres, attribution et exécution des contrats conformément au Code des marchés publics.",
    skills: ["Code des marchés publics UEMOA", "Mise en concurrence & appels d'offres", "Rédaction des dossiers de consultation", "Suivi & exécution des contrats"],
    careers: ["Chargé des achats publics", "Membre d'une commission d'appel d'offres", "Gestionnaire de marchés", "Consultant en passation de marchés"]
  },
  {
    id: "lic-energie-renouvelable",
    title: "Licence — Énergies Renouvelables & Efficacité Énergétique",
    domainId: "energie-renouvelable",
    domainName: "Énergies Renouvelables",
    level: "Licence (Bac+3)",
    type: "degree",
    duration: "3 ans — 6 semestres",
    modality: "Présentiel + Travaux pratiques de chantier",
    tuition: "[TARIF À FOURNIR]",
    prerequisites: "Baccalauréat série scientifique ou technique",
    objectives: "Concevoir, installer, exploiter et maintenir des installations solaires, éoliennes et hybrides, et conduire des programmes d'efficacité énergétique.",
    skills: ["Photovoltaïque & solaire thermique", "Éolien & systèmes hybrides", "Stockage & gestion de la demande", "Audit énergétique"],
    careers: ["Technicien en énergies renouvelables", "Installateur solaire", "Chargé d'audit énergétique", "Gestionnaire de projets ENR"]
  },
  {
    id: "lic-gestion-projets",
    title: "Licence — Gestion de Projet & Management de Projet",
    domainId: "gestion-projets",
    domainName: "Gestion des Projets",
    level: "Licence (Bac+3)",
    type: "degree",
    duration: "3 ans — 6 semestres",
    modality: "Présentiel + Projets tutorés en entreprise",
    tuition: "[TARIF À FOURNIR]",
    prerequisites: "Baccalauréat toutes séries",
    objectives: "Conduire un projet de la définition du cadrage à la recette : planification, budget, allocation des ressources, pilotage des risques et mesure de la performance.",
    skills: ["Cadrage & planification", "Méthodes agiles & cycle en V", "Budget & allocation des ressources", "Gestion des risques & qualité"],
    careers: ["Chef de projet junior", "Chargé de planification", "Analyste en organisation", "Coordinateur de projets associatifs"]
  },
  {
    id: "lic-relation-internationale",
    title: "Licence — Relation Internationnelle & Coopération",
    domainId: "relation-internationale",
    domainName: "Relation Internationnelle",
    level: "Licence (Bac+3)",
    type: "degree",
    duration: "3 ans — 6 semestres",
    modality: "Présentiel + Simulations de négociation",
    tuition: "[TARIF À FOURNIR]",
    prerequisites: "Baccalauréat toutes séries",
    objectives: "Comprendre et intervenir dans les relations entre États, organisations internationales et acteurs du développement : diplomatie, négociation, coopération et affaires géopolitiques.",
    skills: ["Diplomatie & négociation internationale", "Organisations internationales (ONU, UA, CEDEAO)", "Coopération & programmes de développement", "Analyse géopolitique"],
    careers: ["Chargé de mission coopération", "Attaché / collaborateur diplomatique", "Chargé de plaidoyer ONG", "Analyste en affaires internationales"]
  },
  {
    id: "lic-informatique-ia",
    title: "Licence — Informatique & Intelligence Artificielle",
    domainId: "informatique-ia",
    domainName: "Informatique et IA",
    level: "Licence (Bac+3)",
    type: "degree",
    duration: "3 ans — 6 semestres",
    modality: "Présentiel + Laboratoires de données",
    tuition: "[TARIF À FOURNIR]",
    prerequisites: "Baccalauréat série scientifique ou technique",
    objectives: "Concevoir des solutions numériques intelligentes : programmation, traitement de la donnée, modèles d'apprentissage automatique et déploiement d'applications IA.",
    skills: ["Programmation Python & structures de données", "Machine learning & Deep learning", "Ingénierie de la donnée", "Éthique & applications métiers de l'IA"],
    careers: ["Développeur IA / Machine Learning", "Data analyst", "Ingénieur data", "Intégrateur de solutions IA"]
  },
  {
    id: "lic-marketing-digital",
    title: "Licence — Marketing Digital & Commerce Électronique",
    domainId: "marketing-digital",
    domainName: "Marketing Digital & Commerce",
    level: "Licence (Bac+3)",
    type: "degree",
    duration: "3 ans — 6 semestres",
    modality: "Présentiel + Campagnes réelles en laboratoire",
    tuition: "[TARIF À FOURNIR]",
    prerequisites: "Baccalauréat toutes séries",
    objectives: "Construire la notoriété d'une marque, piloter des campagnes d'acquisition digitales et développer des canaux de vente en ligne rentables.",
    skills: ["Stratégie digitale, SEO & SEA", "Réseaux sociaux & publicité en ligne", "E-commerce & marketplaces", "Analytics, KPI & retour sur investissement"],
    careers: ["Chargé de marketing digital", "Community manager", "Gestionnaire e-commerce", "Spécialiste acquisition / growth"]
  },
  {
    id: "lic-banque-finance-assurance",
    title: "Licence — Banque, Finance & Assurance",
    domainId: "banque-finance-assurance",
    domainName: "Banque Finances et Assurance",
    level: "Licence (Bac+3)",
    type: "degree",
    duration: "3 ans — 6 semestres",
    modality: "Présentiel + Simulations de marchés",
    tuition: "[TARIF À FOURNIR]",
    prerequisites: "Baccalauréat série Économique ou Scientifique",
    objectives: "Maîtriser les produits et services bancaires, la gestion de portefeuille, le financement des entreprises et les mécanismes de l'assurance.",
    skills: ["Produits bancaires & analyse de crédit", "Marchés financiers & portefeuille", "Assurance & gestion des risques", "Conformité & lutte anti-blanchiment"],
    careers: ["Chargé de clientèle bancaire", "Analyste crédit", "Courtier / chargé de sinistres", "Conseiller financier"]
  },
  {
    id: "lic-management-rh",
    title: "Licence — Management des Ressources Humaines",
    domainId: "management-rh",
    domainName: "Management des RH",
    level: "Licence (Bac+3)",
    type: "degree",
    duration: "3 ans — 6 semestres",
    modality: "Présentiel + Mises en situation en entreprise",
    tuition: "[TARIF À FOURNIR]",
    prerequisites: "Baccalauréat toutes séries",
    objectives: "Piloter le capital humain de l'organisation : recrutement, intégration, paie, développement des compétences et relations sociales.",
    skills: ["Recrutement & intégration", "Paie & droit du travail malien", "Développement des compétences", "Dialogue social & qualité de vie au travail"],
    careers: ["Chargé de recrutement", "Gestionnaire de paie", "Coressource RH", "Chargé de formation"]
  },
  {
    id: "lic-reseaux-telecom",
    title: "Licence — Réseaux & Télécommunications",
    domainId: "reseaux-telecom",
    domainName: "Réseaux et Télécommunications",
    level: "Licence (Bac+3)",
    type: "degree",
    duration: "3 ans — 6 semestres",
    modality: "Présentiel + Baie de brassage et terrain",
    tuition: "[TARIF À FOURNIR]",
    prerequisites: "Baccalauréat série scientifique ou technique",
    objectives: "Concevoir, déployer, superviser et sécuriser les infrastructures réseaux et télécoms fixes, mobiles et fibre optique.",
    skills: ["Architecture réseaux & routage", "Fibre optique & transmissions", "Sécurité des réseaux", "Téléphonie IP & datacenters"],
    careers: ["Ingénieur réseau", "Technicien télécom", "Administrateur systèmes & réseaux", "Technicien fibre optique"]
  },

  // FILIÈRES SANTÉ — SCIENCES DE LA SANTÉ
  {
    id: "lic-infirmier-obstetricien",
    title: "Licence — Infirmier Obstétricien (IFO)",
    domainId: "sante",
    domainName: "Sciences de la Santé",
    level: "Licence (Bac+3)",
    type: "degree",
    duration: "3 ans — 6 semestres",
    modality: "Présentiel + Stages cliniques hospitaliers",
    tuition: "[TARIF À FOURNIR]",
    prerequisites: "Baccalauréat (série scientifique ou toutes séries)",
    objectives: "Former des infirmiers obstétriciens capables d'assurer le suivi de la grossesse, l'accouchement, le post-partum et les soins néonatals de base.",
    skills: ["Sciences obstétricales", "Suivi de grossesse & gynécologie", "Soins néonatals", "Urgences obstétricales", "Éducation sanitaire"],
    careers: ["Infirmier obstétricien", "Accoucheur / Accoucheuse", "Soignant en matemité", "Coordinateur de programme de santé maternelle"]
  },
  {
    id: "lic-sage-femme",
    title: "Licence — Sage-Femme (Maîtrise en Maïeutique)",
    domainId: "sante",
    domainName: "Sciences de la Santé",
    level: "Licence (Bac+3)",
    type: "degree",
    duration: "3 ans — 6 semestres",
    modality: "Présentiel + Clinique et simulation obstétricale",
    tuition: "[TARIF À FOURNIR]",
    prerequisites: "Baccalauréat (série scientifique ou toutes séries)",
    objectives: "Former des sages-femmes capables d'assurer la consultations prénatale, l'accouchement, le suivi post-natal et le dépistage précoce.",
    skills: ["Consultation prénatale", "Obstétrique & gynécologie", "Suivi post-partum & soins néonatals", "Allaitement & nutrition maternelle", "Planning familial"],
    careers: ["Sage-femme", "Accoucheuse", "Conseillère en santé maternelle", "Coordinateur de centre de santé"]
  },
  {
    id: "lic-sante-publique",
    title: "Licence — Santé Publique & Épidémiologie",
    domainId: "sante",
    domainName: "Sciences de la Santé",
    level: "Licence (Bac+3)",
    type: "degree",
    duration: "3 ans — 6 semestres",
    modality: "Présentiel + Stage sur le terrain et enforcement",
    tuition: "[TARIF À FOURNIR]",
    prerequisites: "Baccalauréat (série scientifique ou toutes séries)",
    objectives: "Former des spécialistes de la santé des populations : prévention, surveillance épidémiologique, promotion de la santé et politiques sanitaires.",
    skills: ["Épidémiologie", "Biostatistique", "Santé publique & promotion", "Surveillance des maladies", "Gestion de programmes sanitaires"],
    careers: ["Épidémiologiste", "Chargé de programmes de santé", "Agent de promotion de la santé", "Consultant en politiques sanitaires"]
  },
  {
    id: "lic-biologie-medicale",
    title: "Licence — Biologie Médicale & Analyses Cliniques",
    domainId: "sante",
    domainName: "Sciences de la Santé",
    level: "Licence (Bac+3)",
    type: "degree",
    duration: "3 ans — 6 semestres",
    modality: "Présentiel + Laboratoire et stages hospitaliers",
    tuition: "[TARIF À FOURNIR]",
    prerequisites: "Baccalauréat série scientifique ou toutes séries",
    objectives: "Former des techniciens de laboratoire capables d'analyser les échantillons biologiques et de contribuer au diagnostic médical.",
    skills: ["Hématologie & Biochimie", "Microbiologie & Parasitologie", "Immunologie & Sérologie", "Contrôle qualité", "Biologie du laboratoire"],
    careers: ["Technicien de laboratoire", "Analyste biologique", "Contrôleur qualité", "Chercheur en biologie médicale"]
  },
  {
    id: "lic-labo-pharmacie",
    title: "Licence — Laboratoire de Pharmacie & Dispensation",
    domainId: "sante",
    domainName: "Sciences de la Santé",
    level: "Licence (Bac+3)",
    type: "degree",
    duration: "3 ans — 6 semestres",
    modality: "Présentiel + Laboratoire pharmaceutique et officine",
    tuition: "[TARIF À FOURNIR]",
    prerequisites: "Baccalauréat (série scientifique ou toutes séries)",
    objectives: "Former des préparateurs en pharmacie capables d'assurer la dispensation, le stockage des médicaments et le conseil pharmaceutique.",
    skills: ["Pharmacognosie", "Chimie pharmaceutique", "Pharmacie clinique", "Dispensation & Conseil", "Réglementation pharmaceutique"],
    careers: ["Préparateur en pharmacie", "Responsable d'officine", "Gestionnaire de stock pharmaceutique", "Conseiller en pharmacie"]
  }
];

/** Formations rattachées à l'institut de santé. */
export const HEALTH_COURSES = COURSES.filter(c => c.domainId === 'sante');

// ---- FAQ OFFICIELLE ----
export const FAQ = [
  {
    q: "Quels sont les domaines clés de l'Université Horizon ?",
    a: "Nos 12 domaines clés sont : Passation des Marchés Publics, Énergies Renouvelables, Gestion des Projets, Droit et Sciences Politiques, Relation Internationuelle, Informatique et IA, Marketing Digital & Commerce, Comptabilité-Finances-Audit, Banque Finances et Assurance, Management des RH, Logistique et Supply Chain, Réseaux et Télécommunications. S'y ajoute le pôle Sciences de la Santé, porté par notre Institut d'Excellence.",
    cat: "Formations"
  },
  {
    q: "Quand ouvre l'Institut d'Excellence en Sciences de la Santé Horizon ?",
    a: "L'Institut accueille sa première rentrée à la date communiquée par le service des admissions ([DATE À FOURNIR]). Les candidatures se font en ligne, rubrique Sciences de la Santé, ou sur le campus Baco Djicoroni Golf.",
    cat: "Institut Sciences de la Santé"
  },
  {
    q: "Les diplômes sont-ils reconnus par l'État malien ?",
    a: "Oui. Les formations et diplômes délivrés par l'Université Horizon sont officiellement reconnus par l'État malien et respectent le schéma LMD.",
    cat: "Diplômes & Reconnaissance"
  },
  {
    q: "Où se situent les campus ?",
    a: "L'Université Horizon dispose de deux campus : Campus Baco Djicoroni Golf (Bamako) — notre site principal, et un second site à Bamako. Contactez-nous au +223 77 67 75 75 pour un accueil personnalisé.",
    cat: "Campus & Localisation"
  },
  {
    q: "Quelles formations accélérées sont disponibles ?",
    a: "6 certificats métiers intensifs : Transit Douane, QHSE & RSE, Informatique Bureautique, Assistante Comptable, Action Humanitaire, et Logistique Humanitaire.",
    cat: "Formations"
  },
  {
    q: "Quels sont les frais de scolarité ?",
    a: "Les tarifs officiels sont communiqués par le service des admissions lors du dépôt de dossier ou sur demande au +223 77 67 75 75 / 76 75 73 29.",
    cat: "Admissions & Tarifs"
  },
  {
    q: "Comment postuler ?",
    a: "Via notre plateforme en ligne (bouton « Candidater ») en 7 étapes simples, ou directement en vous présentant au campus Baco Djicoroni Golf muni de votre dossier.",
    cat: "Processus d'Admission"
  }
];

// ---- TÉMOIGNAGES ----
export const STORIES = [
  {
    id: "s1",
    author: "Fatoumata S.",
    role: "Diplômée — Licence Génie Logiciel",
    quote: "L'encadrement rapproché et les projets pratiques m'ont permis de concevoir ma première application mobile bien avant l'obtention de mon diplôme.",
    image: "/assets/avatar-fatoumata.svg",
    tag: "Sciences & Technologies"
  },
  {
    id: "s2",
    author: "Ibrahim T.",
    role: "Certifié — Transit Douane",
    quote: "La formation en transit douane m'a ouvert les portes d'un grand cabinet agréé. Apprendre sur des cas concrets maliens fait toute la différence.",
    image: "/assets/avatar-ibrahim.svg",
    tag: "Formation Accélérée"
  },
  {
    id: "s3",
    author: "Promotion Horizon",
    role: "Cérémonie Officielle de Diplômes",
    quote: "Voir nos camarades intégrés dans les institutions financières et technologiques du pays donne tout son sens à « Bâtissez votre avenir dans l'Excellence ».",
    image: "/assets/avatar-promotion.svg",
    tag: "Réussite & Alumni"
  }
];

// ---- AVANTAGES ----
export const WHY_HORIZON = [
  {
    id: "qualite",
    icon: "Award",
    title: "Enseignement de Qualité",
    desc: "Programmes actualisés, corps enseignant de praticiens et d'universitaires, évaluations rigoureuses."
  },
  {
    id: "encadrement",
    icon: "Users",
    title: "Encadrement Rapproché",
    desc: "Ratio encadrant-étudiant optimisé pour un suivi individualisé du premier jour jusqu'à l'insertion."
  },
  {
    id: "international",
    icon: "Globe",
    title: "Ouverture Internationale",
    desc: "Anglais professionnel, cas internationaux, conférences d'experts étrangers et perspectives LMD."
  },
  {
    id: "pratique",
    icon: "Briefcase",
    title: "Approche Pratique & Métier",
    desc: "70 % d'heures pratiques, mises en situation réelles, stages obligatoires et projets d'entreprise."
  },
  {
    id: "accompagnement",
    icon: "UserCheck",
    title: "Accompagnement Professionnel",
    desc: "Pôle Carrières actif : CV, entretiens, job dating annuel et réseau alumni solidaire."
  },
  {
    id: "diplomes",
    icon: "ShieldCheck",
    title: "Diplômes Reconnus par l'État",
    desc: "Certificats et Licences officiellement homologués par le ministère de l'Enseignement Supérieur."
  }
];
