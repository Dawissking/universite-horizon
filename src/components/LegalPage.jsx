import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageBanner from './PageBanner';
import { INSTITUTION } from '../data/horizonData';

/**
 * Sitemap des pages légales et institutionnelles.
 * Utilisé par /confidentialite, /conditions et /a-propos.
 */
export const LEGAL_LINKS = [
  { to: '/a-propos', label: "À propos" },
  { to: '/confidentialite', label: 'Politique de confidentialité' },
  { to: '/conditions', label: 'Conditions générales' },
];

/**
 * Met à jour les balises title et meta description de la page,
 * afin que chaque page légale soit indexable de façon distincte.
 */
export function usePageMeta(title, description) {
  useEffect(() => {
    const previousTitle = document.title;

    const findOrCreate = (selector, attrs) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
        document.head.appendChild(el);
      }
      return el;
    };

    document.title = title;

    const metaDescription = findOrCreate('meta[name="description"]', { name: 'description' });
    const previousDescription = metaDescription.getAttribute('content');
    metaDescription.setAttribute('content', description);

    const canonical = findOrCreate('link[rel="canonical"]', { rel: 'canonical' });
    const previousCanonical = canonical.getAttribute('href');
    const base = document.querySelector('link[rel="canonical"]')?.dataset.base;
    const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://universite-horizon.ml').replace(/\/+$/, '');
    canonical.setAttribute('href', `${siteUrl}${base || ''}`);

    return () => {
      document.title = previousTitle;
      if (previousDescription !== null) metaDescription.setAttribute('content', previousDescription);
      if (previousCanonical !== null) canonical.setAttribute('href', previousCanonical);
    };
  }, [title, description]);
}

/**
 * Gabarit commun des pages légales : bannière, contenu structuré
 * et navigation de retour vers le reste du site.
 */
export const LegalPage = ({ title, eyebrow, description, image, updated, children }) => {
  usePageMeta(`${title} | Université Horizon`, description);

  return (
    <div className="page-enter">
      <PageBanner
        image={image}
        breadcrumb={title}
        title={title}
        description={description}
        height="clamp(13rem, 32vh, 20rem)"
      />

      <section className="hz-section" style={{ background: 'var(--bg-page)' }}>
        <div className="hz-container">
          <div className="legal-content">
            {updated && (
              <p className="legal-updated">
                Dernière mise à jour : {updated}
              </p>
            )}
            {children}
          </div>

          <nav className="legal-nav" aria-label="Pages légales">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.to} to={link.to} className="btn btn-outline btn-sm">
                {link.label}
              </Link>
            ))}
            <Link to="/contact" className="btn btn-gold btn-sm">
              Nous contacter
            </Link>
          </nav>

          <p className="legal-contact">
            Pour toute question relative à ce document, écrivez à{' '}
            <a href={`mailto:${INSTITUTION.contacts.email}`}>{INSTITUTION.contacts.email}</a>
            {' '}ou appelez le {INSTITUTION.contacts.phones[0]}.
          </p>
        </div>
      </section>
    </div>
  );
};

export default LegalPage;