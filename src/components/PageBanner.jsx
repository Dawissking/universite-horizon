import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Bannière d'en-tête de page.
 * Utilise une image de fond adaptative (couverte) avec voile dégradé pour
 * garantir la lisibilité du texte quelle que soit la résolution d'écran.
 * Si l'image est absente, un dégradé bleu institutionnel prend le relais.
 */
export const PageBanner = ({
  image,
  eyebrow = '',
  title,
  highlight = '',
  description = '',
  breadcrumb = '',
  height = 'clamp(16rem, 42vh, 26rem)',
  children
}) => {
  const style = image
    ? {
        backgroundImage: `linear-gradient(180deg, rgba(7,21,38,0.72) 0%, rgba(13,34,64,0.86) 55%, rgba(13,34,64,0.95) 100%), url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll'
      }
    : { background: 'linear-gradient(135deg,#0D2240,#15315B)' };

  return (
    <section className="page-banner" style={{ ...style, minHeight: height, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      {/* Voile de sécurité : garantit le contraste même si l'image est très claire */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(7,21,38,0.55) 0%, rgba(13,34,64,0.35) 40%, rgba(13,34,64,0.85) 100%)',
        pointerEvents: 'none'
      }} />

      {/* Grille décorative */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none'
      }} />

      <div className="hz-container" style={{ position: 'relative', zIndex: 1, paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="animate-fadeInUp">
          {breadcrumb && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              <Link to='/' style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>Accueil</Link>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
              <span style={{ color: 'var(--hz-gold-400)', fontSize: '0.875rem', fontWeight: '600' }}>{breadcrumb}</span>
            </div>
          )}

          {eyebrow && (
            <span className="section-tag" style={{ marginBottom: '1rem' }}>{eyebrow}</span>
          )}

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: '#fff',
            marginBottom: '1rem',
            textWrap: 'balance',
            textShadow: '0 2px 18px rgba(0,0,0,0.45)'
          }}>
            {title}{' '}
            {highlight && <span style={{ color: 'var(--hz-gold-400)' }}>{highlight}</span>}
          </h1>

          {description && (
            <p style={{
              fontSize: 'clamp(1rem, 1.6vw, 1.1875rem)',
              color: 'rgba(255,255,255,0.85)',
              maxWidth: '46rem',
              lineHeight: 1.7,
              textShadow: '0 1px 12px rgba(0,0,0,0.4)'
            }}>
              {description}
            </p>
          )}

          {children}
        </div>
      </div>
    </section>
  );
};

export default PageBanner;