import React from 'react';
import { Link } from 'react-router-dom';
import { LegalPage } from '../components/LegalPage';
import { INSTITUTION } from '../data/horizonData';
import { Scale, Ban, GraduationCap, Wallet, Gavel, AlertTriangle } from 'lucide-react';

export default function TermsPage() {
  return (
    <LegalPage
      title="Conditions générales"
      eyebrow="Utilisation du site"
      description="Règles d'utilisation du site officiel de l'Université Horizon : accès au contenu, candidature en ligne, comptes portails et responsabilité des utilisateurs."
      image="/assets/hero_students.jpeg"
      updated="1er octobre 2026"
    >
      <p>
        L'utilisation du site {INSTITUTION.name} et de ses services numériques, y compris
        la candidature en ligne et les portails Étudiant, Enseignant et Administration,
        implique l'acceptation sans réserve des présentes conditions.
      </p>

      <h2>1. Objet du site</h2>
      <p>
        Ce site a pour objet de présenter l'établissement, ses formations et ses services,
        de permettre le dépôt d'un dossier de candidature, le suivi de son instruction et
        l'accès aux espaces numériques réservés à ses utilisateurs.
      </p>

      <h2>2. Accès et comptes</h2>
      <div className="legal-cards">
        <div className="legal-card">
          <Ban size={22} color="var(--hz-red-600)" />
          <h3>Interdiction d'accès non autorisé</h3>
          <p>
            Les identifiants des portails sont personnels et confidentiels. Toute tentative
            d'accès à un espace Restreint sans autorisation, toute usurpation d'identité
            et tout contournement des dispositifs de sécurité sont interdits et peuvent
            donner lieu à des poursuites.
          </p>
        </div>
        <div className="legal-card">
          <AlertTriangle size={22} color="#B45309" />
          <h3>Responsabilité de l'utilisateur</h3>
          <p>
            Le titulaire d'un compte est seul responsable des actes accomplis depuis
            celui-ci. Toute activité illicite, toute tentative de piratage et tout usage
            portant atteinte à l'intégrité du service ou à la vie privée d'autrui sont
            interdits.
          </p>
        </div>
      </div>

      <h2>3. Candidature en ligne</h2>
      <p>
        Le dépôt d'un dossier de candidature est gratuit. Les informations demandées
        doivent être exactes, complètes et sincere. Un dossier ne peut être déposé qu'une
        seule fois par adresse électronique dans un délai de trente jours.
      </p>
      <ul>
        <li>Les formats acceptés sont le PDF, le JPEG et le PNG, dans la limite de taille précisée pour chaque pièce.</li>
        <li>Les documents téléversés doivent être lisibles, non expirés et conformes à l'original.</li>
        <li>La soumission du dossier ne vaut pas admission : seule la décision de la commission fait foi.</li>
      </ul>

      <div className="legal-callout">
        <Gavel size={20} />
        <span>
          Toute fausse déclaration, tout document falsifié ou toute usurpation d'identité
          entraîne l'annulation immédiate du dossier et peut donner lieu à des poursuites
          judiciaires, sans préjudice de l'exclusion définitive de l'établissement.
        </span>
      </div>

      <h2>4. Frais et payment</h2>
      <p>
        Les frais d'inscription éventuels sont indiqués sur la{' '}
        <Link to="/formations">page des formations</Link> et ne sont jamais exigés au
        moment du dépôt du dossier de candidature. Aucun paiement n'est demandé par
        l'intermédiaire de ce site.
      </p>

      <h2>5. Propriété intellectuelle</h2>
      <p>
        L'ensemble des contenus présents sur ce site, y compris les textes, photographies,
        logos, graphismes et supports pédagogiques, est la propriété exclusive de{' '}
        {INSTITUTION.name} ou fait l'objet d'une autorisation d'utilisation. Toute
        reproduction, représentation ou diffusion, totale ou partielle, sans autorisation
        écrite préalable est interdite.
      </p>

      <h2>6. Disponibilité du service</h2>
      <p>
        Nous nous efforçons d'assurer la continuité du service, mais ne garantissons pas
        l'absence d'interruptions liées à la maintenance, aux réseaux ou à des cas de
        force majeure. Les données saisies dans un formulaire ne sont garanties que
        jusqu'à leur transmission réussie au serveur.
      </p>

      <h2>7. Conformité des informations</h2>
      <p>
        Les contenus publiés reflètent l'état des connaissances et des Regulations en
        vigueur. Ils peuvent faire l'objet de mises à jour. En cas de divergence entre
        l'information affichée sur le site et une communication officielle, cette dernière
        prévaut.
      </p>

      <h2>8. Limitation de responsabilité</h2>
      <p>
        L'établissement s'efforce de garantir l'exactitude des informations publiées. Sa
        responsabilité ne saurait toutefois être engagée pour les conséquences liées à
        l'utilisation des contenus du site, à la décision d'admission prise par la
        commission, ou à une interruption de service.
      </p>

      <h2>9. Protection des données</h2>
      <p>
        Le traitement de vos données personnelles est décrit dans notre{' '}
        <Link to="/confidentialite">politique de confidentialité</Link>, qui fait partie
        intégrante des présentes conditions.
      </p>

      <h2>10. Droit applicable</h2>
      <p>
        Les présentes conditions sont soumises au droit malien. À défaut de résolution
        amiable, tout différend relève de la compétence des tribunaux de Bamako.
      </p>

      <p>
        Pour toute question relative à ces conditions, contactez{' '}
        <a href={`mailto:${INSTITUTION.contacts.email}`}>{INSTITUTION.contacts.email}</a>.
      </p>
    </LegalPage>
  );
}