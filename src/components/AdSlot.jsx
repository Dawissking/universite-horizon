import React, { useEffect } from 'react';

/**
 * ============================================================
 *  Emplacement publicitaire — inactif par défaut
 * ============================================================
 *
 *  Ce composant n'affiche RIEN tant qu'aucun identifiant AdSense
 *  n'est défini dans la variable d'environnement VITE_ADSENSE_ID.
 *
 *  Pourquoi rester inactif
 *  ----------------------
 *  1. Google AdSense exige un compte approuve avant d'afficher quoi que
 *     ce soit : sans identifiant valide, le script ne sert a rien.
 *  2. Un compte AdSense ne doit jamais etre present sur les pages qui
 *     collectent des donnees sensibles : /admissions (televersement
 *     d'actes de naissance, cartes d'identite, passeports) et les
 *     portails Etudiant, Enseignant et Administration. Ces pages
 *     doivent rester vierges de tout traceur tiers.
 *
 *  Mise en service ulterieure
 *  --------------------------
 *  1. Creer un compte sur adsense.google.com et faire approuver le site.
 *  2. Definir VITE_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX dans les variables
 *     GitHub Actions (Settings > Secrets and variables > Actions).
 *  3. Definir VITE_ADSENSE_SLOT=1234567890 pour un bloc responsive.
 *  4. Utiliser <AdSlot /> uniquement sur les pages de contenu public.
 */

const ADSENSE_ID = import.meta.env.VITE_ADSENSE_ID;
const ADSENSE_SLOT = import.meta.env.VITE_ADSENSE_SLOT;

/** Le composant reste totalement inactif tant que l'ID est absent. */
const ENABLED = Boolean(ADSENSE_ID);

/**
 * Charge le script AdSense une seule fois pour toute l'application.
 */
function useAdSenseScript() {
  useEffect(() => {
    if (!ENABLED || document.getElementById('adsense-script')) return;

    const script = document.createElement('script');
    script.id = 'adsense-script';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`;
    document.head.appendChild(script);
  }, []);
}

/**
 * Emplacement publicitaire responsive.
 *
 * @param {string}  label  Texte alternatif, utilise en mode developpement
 * @param {boolean} responsive  Format grand bloc (true) ou bandeau (false)
 */
export const AdSlot = ({ label = 'Espace publicitaire', responsive = false }) => {
  useAdSenseScript();

  // Aucun rendu tant que la regie n'est pas configuree.
  if (!ENABLED) return null;

  const slotClass = responsive ? 'ad-slot ad-slot--responsive' : 'ad-slot';

  return (
    <aside className={slotClass} aria-label={label}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_ID}
        data-ad-slot={ADSENSE_SLOT || ''}
        data-ad-format={responsive ? 'auto' : 'horizontal'}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </aside>
  );
};

export default AdSlot;