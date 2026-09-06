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
export const DOMAINS = [
  {
    id:          "sciences-tech",
    name:        "Sciences & Technologies",
    badge:       "Pôle Innovation",
    color:       "#2563EB",
    icon:        "Cpu",
    description: "Former les ingénieurs du numérique et les acteurs de la transformation digitale africaine.",
    programs:    "Génie Logiciel, Réseaux, Systèmes d'Information"
  },
  {
    id:          "management-finance",
    name:        "Management & Finance",
    badge:       "Pôle Excellence",
    color:       "#C99726",
    icon:        "TrendingUp",
    description: "Préparer les dirigeants, auditeurs et experts financiers du Mali et de la sous-région.",
    programs:    "Comptabilité, Audit, Finance d'Entreprise, Banque"
  },
  {
    id:          "management-eco",
    name:        "Management & Économie",
    badge:       "Pôle Stratégique",
    color:       "#0D2240",
    icon:        "PieChart",
    description: "Analyse économique, commerce international, gouvernance et politiques publiques.",
    programs:    "Transit Douane, Logistique, Commerce International"
  },
  {
    id:          "arts-comm",
    name:        "Arts, Communication & Design",
    badge:       "Pôle Créatif",
    color:       "#7C3AED",
    icon:        "Palette",
    description: "Maîtriser les médias, la communication stratégique et la création graphique moderne.",
    programs:    "Communication Digitale, Relations Publiques, Design"
  },
  {
    id:          "droit",
    name:        "Droit & Sciences Politiques",
    badge:       "Pôle Régalien",
    color:       "#C0392B",
    icon:        "Scale",
    description: "Droit des affaires OHADA, droit public, carrières juridiques et diplomatiques.",
    programs:    "Droit des Affaires, Droit Public, Sciences Politiques"
  }
];

// ---- FORMATIONS ----
export const COURSES = [
  // FORMATIONS ACCÉLÉRÉES (officiellement documentées)
  {
    id: "fa-transit",
    title: "Transit Douane & Procédures Portuaires",
    domainId: "management-eco",
    domainName: "Management & Économie",
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
    domainId: "sciences-tech",
    domainName: "Sciences & Technologies",
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
    domainId: "sciences-tech",
    domainName: "Sciences & Technologies",
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
    domainId: "management-finance",
    domainName: "Management & Finance",
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
    domainId: "droit",
    domainName: "Droit & Sciences Politiques",
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
    domainId: "management-eco",
    domainName: "Management & Économie",
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
    domainId: "sciences-tech",
    domainName: "Sciences & Technologies",
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
    domainId: "management-finance",
    domainName: "Management & Finance",
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
    domainId: "droit",
    domainName: "Droit & Sciences Politiques",
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
    domainId: "arts-comm",
    domainName: "Arts, Communication & Design",
    level: "Licence (Bac+3)",
    type: "degree",
    duration: "3 ans — 6 semestres",
    modality: "Présentiel + Atelier Média Studio",
    tuition: "[TARIF À FOURNIR]",
    prerequisites: "Baccalauréat toutes séries",
    objectives: "Former des stratèges de la communication capables de piloter l'image de marque et les campagnes digitales.",
    skills: ["Stratégie de marque", "Community Management", "Production audiovisuelle", "Relations presse"],
    careers: ["Responsable communication", "Social Media Manager", "Attaché de presse", "Concepteur de campagnes"]
  }
];

// ---- FAQ OFFICIELLE ----
export const FAQ = [
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
    image: "/assets/student_female.jpeg",
    tag: "Sciences & Technologies"
  },
  {
    id: "s2",
    author: "Ibrahim T.",
    role: "Certifié — Transit Douane",
    quote: "La formation en transit douane m'a ouvert les portes d'un grand cabinet agréé. Apprendre sur des cas concrets maliens fait toute la différence.",
    image: "/assets/student_grad.jpeg",
    tag: "Formation Accélérée"
  },
  {
    id: "s3",
    author: "Promotion Horizon",
    role: "Cérémonie Officielle de Diplômes",
    quote: "Voir nos camarades intégrés dans les institutions financières et technologiques du pays donne tout son sens à « Bâtissez votre avenir dans l'Excellence ».",
    image: "/assets/graduates.jpeg",
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
