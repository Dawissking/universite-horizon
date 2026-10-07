import React from 'react';
import { Link } from 'react-router-dom';
import { LegalPage } from '../components/LegalPage';
import { INSTITUTION, DOMAINS, INSTITUTE, HEALTH_COURSES } from '../data/horizonData';
import { Compass, Handshake, ShieldCheck, Globe, Target, Award } from 'lucide-react';
import Icon from '../components/Icon';

const VALUES = [
  { icon: 'star', title: 'Excellence', text: "Des programmes exigeants, des enseignants chercheurs et des praticiens en activité, pour un niveau de préparation qui ouvre l'accès aux meilleures opportunités." },
  { icon: 'shield', title: 'Intégrité', text: "Transparence des décisions, honnêteté académique et respect du règlement intérieur, dans toutes les circonstances." },
  { icon: 'bulb', title: 'Innovation', text: "Laboratoires équipés, projets digitaux transversaux et initiation aux outils numériques pour toutes nos filières." },
  { icon: 'handshake', title: 'Solidarité', text: "Un accompagnement rapproché, une vie associative active et un réseau alumni qui soutient chaque carrière Horizon." },
];

const PILLARS = [
  { icon: Compass, title: 'Une orientation éclairée', text: "Un outil d'orientation aide chaque candidat à identifier la filière qui correspond à son projet et à son profil." },
  { icon: Handshake, title: 'Un encadrement rapproché', text: "Petits groupes, tuteurs dédiés et disponibilité permanente des enseignants tout au long du parcours." },
  { icon: ShieldCheck, title: 'Une démarche fiable', text: "Candidature en ligne sécurisée, suivi transparent de chaque dossier et information continue des candidats." },
  { icon: Globe, title: 'Une ouverture internationale', text: "Anglais professionnel intégré, études de cas mondiales et préparation aux certifications internationales." },
];

export default function AboutPage() {
  return (
    <LegalPage
      title="À propos"
      eyebrow="L'institution"
      description="Présentation de l'Université Horizon, de sa mission, de ses valeurs, de ses filières et de son projet pédagogique."
      image="/assets/Infrastructures.jpeg"
    >
      <h2>Notre institution</h2>
      <p>
        {INSTITUTION.name} est un établissement d'enseignement supérieur basé à Bamako, au
        Mali. Il propose des Licences et Masters LMD ainsi que des Certificats Métiers accélérés conçus
        autour de trois exigences : la maîtrise académique, la pratique professionnelle
        et l'employabilité durable de ses diplômés.
      </p>
      <p>
        L'établissement compte deux campus, un campus principal à Bamako et le campus
        Baco Djicoroni Golf, tous deux équipés d'amphithéâtres climatisés, de laboratoires
        informatiques, d'une bibliothèque numérique et d'un espace de vie étudiante.
      </p>

      <h2>Notre mission</h2>
      <p>
        Délivrer une formation d'excellence articulée autour de l'encadrement rapproché,
        de la pratique professionnelle et de l'employabilité durable de nos diplômés.
      </p>

      <h2>Nos valeurs</h2>
      <div className="legal-cards">
        {VALUES.map((value) => (
          <div key={value.title} className="legal-card">
            <Icon name={value.icon} size={22} />
            <h3>{value.title}</h3>
            <p>{value.text}</p>
          </div>
        ))}
      </div>

      <h2>Nos engagements</h2>
      <div className="legal-cards">
        {PILLARS.map((pillar) => (
          <div key={pillar.title} className="legal-card">
            <pillar.icon size={22} color="var(--hz-gold-primary)" />
            <h3>{pillar.title}</h3>
            <p>{pillar.text}</p>
          </div>
        ))}
      </div>

      <h2>Nos domaines de formation</h2>
      <p>
        L'établissement couvre aujourd'hui {DOMAINS.length} domaines de formation :</p>
      <ul>
        {DOMAINS.map((domain) => (
          <li key={domain.id}>{domain.name}</li>
        ))}
      </ul>
      <p>
        Le catalogue complet des licences, des masters et des certificats est consultable sur la{' '}
        <Link to="/formations">page des formations</Link>.
      </p>

      <h2>L'Institut d'Excellence en Sciences de la Santé Horizon</h2>
      <p>
        Le pôle Sciences de la Santé est porté par l'Institut d'Excellence en Sciences de la
        Santé Horizon, qui accueille sa première rentrée. Il regroupe {HEALTH_COURSES.length} formations
        professionnelles (Licence et Master) — infirmier obstétricien, Sage femme, Santé Publique, Biologie médicale
        et Labo pharmacie — ainsi que {INSTITUTE.keyDomains.length} domaines cliniques, des laboratoires
        et des conventions avec des structures de soins.
      </p>
      <p>
        <Link to="/institut-sante">Découvrir l'Institut d'Excellence en Sciences de la Santé</Link>.
      </p>

      <h2>Notre campus</h2>
      <p>
        La vie étudiante s'organise autour d'une association active, de clubs thématiques,
        d'un Pôle Carrières et d'un programme annuel de compétitions et de conférences.
        L'ensemble des services est décrit sur la <Link to="/campus">page campus</Link>.
      </p>

      <h2>Nous rejoindre</h2>
      <p>
        Les candidatures sont ouvertes chaque année. La procédure complète, les pièces
        demandées et le suivi de dossier sont détaillés sur la{' '}
        <Link to="/admissions">page admissions</Link>.
      </p>
      <p>
        Pour toute question, écrivez à{' '}
        <a href={`mailto:${INSTITUTION.contacts.email}`}>{INSTITUTION.contacts.email}</a>
        {' '}ou appelez le {INSTITUTION.contacts.phones[0]}.
      </p>
    </LegalPage>
  );
}