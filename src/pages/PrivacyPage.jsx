import React from 'react';
import { Link } from 'react-router-dom';
import { LegalPage } from '../components/LegalPage';
import { INSTITUTION } from '../data/horizonData';
import { Database, ShieldCheck, FileText, EyeOff, Clock, Server } from 'lucide-react';
import Icon from '../components/Icon';

const DATA_CATEGORIES = [
  {
    icon: 'users',
    title: 'Données de candidature',
    body: "Lors d'une candidature en ligne, nous collectons vos nom, prénom, date et lieu de naissance, nationalité, adresse postale, adresse e-mail, numéro de téléphone, dernier diplôme obtenu, série du Baccalauréat, établissement de provenance et, si vous le saisissez, votre motivation.",
  },
  {
    icon: 'folder',
    title: 'Pièces justificatives',
    body: "Vous téléversez des documents d'identité et des diplômes : attestation du Baccalauréat ou dernier diplôme, extrait d'acte de naissance, pièce d'identité ou passeport, et photo d'identité. Ces fichiers sont conservés de façon confidentielle et ne sont jamais publiés.",
  },
  {
    icon: 'graduation',
    title: 'Données de compte et portails',
    body: "Lorsque vous utilisez un portail Étudiant, Enseignant ou Administration, nous enregistrons votre identifiant, votre rôle, votre matricule, votre adresse e-mail, votre nom, la date de votre dernière connexion et, pour les enseignants, les notes que vous saisissez.",
  },
  {
    icon: 'check',
    title: 'Messages et demandes',
    body: "Le formulaire de contact enregistre votre nom, votre e-mail, votre téléphone, le service concerné et le contenu de votre message.",
  },
];

const PURPOSES = [
  "Instruction des dossiers de candidature et décision de la commission d'admission",
  "Communication avec les candidats et les familles au sujet de leur dossier",
  "Gestion des inscriptions, de la scolarité et des notes",
  "Sécurité du site, prévention de la fraude et des abus",
  "Respect de nos obligations légales et réglementaires",
];

const RETENTION = [
  { label: 'Dossier de candidature non retenu', value: "3 ans après la clôture de la campagne d'admission, sauf obligation légale contraire" },
  { label: 'Dossier accepté (candidat devenu étudiant)', value: "Durée du parcours académique puis conservation des pièces d'inscription selon les obligations universitaires" },
  { label: 'Messages du formulaire de contact', value: '2 ans à compter du dernier échange' },
  { label: 'Journaux de connexion des portails', value: '12 mois' },
  { label: 'Cookies et mesure d\'audience', value: '13 mois maximum' },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      eyebrow="Données personnelles"
      description="Comment l'Université Horizon collecte, utilise, protège et conserve vos données personnelles dans le cadre du site et de ses portails numériques."
      image="/assets/campus_students.jpeg"
      updated="1er octobre 2026"
    >
      <p>
        L'Université Horizon attache une grande importance à la protection de vos données
        personnelles. La présente politique décrit quelles informations sont collectées
        lorsque vous utilisez ce site, pourquoi elles sont collectées, combien de temps
        elles sont conservées et quels sont vos droits.
      </p>

      <h2>1. Responsable du traitement</h2>
      <p>
        Le responsable du traitement des données est {INSTITUTION.name}, établissement
        d'enseignement supérieur situé à Bamako, Mali.
      </p>
      <ul className="legal-contact-list">
        <li>Adresse : {INSTITUTION.campuses[0].address}</li>
        <li>Téléphone : {INSTITUTION.contacts.phones[0]}</li>
        <li>Courriel : <a href={`mailto:${INSTITUTION.contacts.email}`}>{INSTITUTION.contacts.email}</a></li>
      </ul>

      <h2>2. Données collectées</h2>
      <div className="legal-cards">
        {DATA_CATEGORIES.map((cat) => (
          <div key={cat.title} className="legal-card">
            <Icon name={cat.icon} size={22} />
            <h3>{cat.title}</h3>
            <p>{cat.body}</p>
          </div>
        ))}
      </div>

      <h2>3. Finalités et bases légales</h2>
      <p>Vos données sont utilisées exclusivement aux fins suivantes :</p>
      <ul>
        {PURPOSES.map((purpose) => (
          <li key={purpose}>{purpose}</li>
        ))}
      </ul>
      <p>
        Le traitement repose sur votre consentement pour la candidature en ligne, sur
        l'exécution de la relation contractuelle pour les dossiers d'inscription, et sur
        l'intérêt légitime de l'établissement pour la sécurité du service et la prévention
        des abus.
      </p>

      <h2>4. Sécurité et confidentialité</h2>
      <p>
        Les échanges entre votre navigateur et nos serveurs sont chiffrés par HTTPS. Les
        mots de passe sont enregistrés sous forme d'empreintes numériques non
        réversibles et ne peuvent jamais être lus, y compris par notre personnel.
      </p>
      <p>
        Les pièces justificatives que vous téléversez sont enregistrées sous un nom
        aléatoire et ne sont pas accessibles depuis une adresse web. Seul un
        agent autorisé du service des admissions peut les consulter, et chaque
        téléchargement est tracé. Les fichiers déposés ne peuvent jamais être exécutés.
      </p>
      <div className="legal-callout">
        <ShieldCheck size={20} />
        <span>
          Nous ne vendons, ne louons et ne cédons à aucun tiers vos données personnelles,
          vos pièces d'identité ou les notes de votre parcours.
        </span>
      </div>

      <h2>5. Durée de conservation</h2>
      <table className="legal-table">
        <thead>
          <tr>
            <th>Type de donnée</th>
            <th>Durée</th>
          </tr>
        </thead>
        <tbody>
          {RETENTION.map((row) => (
            <tr key={row.label}>
              <td>{row.label}</td>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>6. Vos droits</h2>
      <p>Conformément à la réglementation applicable, vous disposez des droits suivants :</p>
      <ul>
        <li><strong>Accès</strong> : obtenir une copie des données que nous détenons sur vous.</li>
        <li><strong>Rectification</strong> : faire corriger des données inexactes ou incomplètes.</li>
        <li><strong>Suppression</strong> : demander l'effacement de vos données lorsque la loi le permet.</li>
        <li><strong>Opposition et limitation</strong> : pour motif légitime, dans les conditions prévues par la loi.</li>
        <li><strong>Portabilité</strong> : recevoir vos données dans un format exploitable.</li>
      </ul>
      <p>
        Pour exercer l'un de ces droits, écrivez à{' '}
        <a href={`mailto:${INSTITUTION.contacts.email}`}>{INSTITUTION.contacts.email}</a> en
        précisant votre identité et votre demande. Nous y répondons dans un délai
        raisonnable.
      </p>

      <h2>7. Partage avec des tiers</h2>
      <p>
        Vos données ne sont transmises à des tiers que dans les cas suivants, strictement
        nécessaires au service :
      </p>
      <ul>
        <li>prestataires techniques d'hébergement nécessaires au fonctionnement du site</li>
        <li>services de mesure d'audience, uniquement sous forme agrégée</li>
        <li>autorités administratives ou judiciaires en cas d'obligation légale</li>
      </ul>

      <h2>8. Cookies et mesure d'audience</h2>
      <p>
        Le site utilise un cookie strictement nécessaire pour mémoriser votre choix de
        thème clair ou sombre. Aucun cookie publicitaire ni traceur tiers n'est déposé à
        ce jour. Si une régie publicitaire était ultérieurement ajoutée, cette politique
        serait mise à jour et un module de consentement serait mis en place avant tout
        dépôt de traceur.
      </p>

      <h2>9. Sécurité du site</h2>
      <p>
        Nous appliquons des mesures techniques et organisationnelles adaptées pour
        protéger vos données contre la perte, l'accès non autorisé et la divulgation.
        En cas de violation de données susceptible de porter atteinte à vos droits, nous
        vous en informerions dans les meilleurs délais.
      </p>

      <h2>10. Modification de la politique</h2>
      <p>
        Cette politique peut être mise à jour. La date de dernière révision figure en
        haut de cette page. Toute modification substantielle vous sera signalée lors de
        votre prochaine visite.
      </p>

      <p>
        Pour toute question, voir la{' '}
        <Link to="/contact">page de contact</Link>.
      </p>
    </LegalPage>
  );
}