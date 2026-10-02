/**
 * Répare les guillemets JSX corrompus dans HomePage.jsx.
 *
 * L'ancien script de réparation a produit deux variantes de corruption :
 *   1. className='"animate-fadeInUp delay-100"'   guillemets simples + double accolade
 *   2. background: ""var(--bg-card)""             guillemets doubles doublés
 *
 * Règle générale : une valeur de chaîne est toujours entourée d'un seul
 * jeu de guillemets, sans espace avant la valeur.
 * Le script est idempotent.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const target = resolve(__dirname, '..', 'src', 'pages', 'HomePage.jsx');

let src = readFileSync(target, 'utf8');
const before = src;

const rules = [
  // className='"x"'   ->  className='x'    (|="x"' 2e accolade)
  [/className='"([^"]*)""/g, "className='$1'"],
  // className=""x""   ->  className="x"
  [/className=""([^"]*)""/g, 'className="$1"'],

  // prop='="x""'  ->  prop="x"   (guillemets simples contenant un guillemet double)
  [/='"\s*([^"]*?)\s*""/g, '="$1"'],
  // prop='="x",'   ->  prop="x",  (guillemets simples contenant un guillemet double)
  [/='"\s*([^"]*?)\s*"([,])/g, '="$1"$2'],
  // prop=""x""      ->  prop="x"   (guillemets simples contenant un guillemet double)
  [/='"\s*([^"]*?)\s*"/g, '="$1"'],

  // prop: ""x"",     ->  prop: "x",
  [/:\s*""\s*([^"]*?)\s*"",/g, ': "$1",'],
  // prop: ""x"        ->  prop: "x"
  [/:\s*""\s*([^"]*?)\s*"/g, ': "$1"'],
  // prop: '"x"',      ->  prop: "x",
  [/:\s*'"\s*([^"]*?)\s*"',/g, ': "$1",'],
  // prop: '"x"        ->  prop: "x"
  [/:\s*'"\s*([^"]*?)\s*"/g, ': "$1"'],

  // ? "x"  et  : "x"  (ternaires)
  [/\?\s*'"\s*([^"]*?)\s*""/g, '? "$1"'],
  [/\?\s*'"\s*([^"]*?)\s*"/g, '? "$1"'],
  [/\?\s*""\s*([^"]*?)\s*"/g, '? "$1"'],
];

for (const [pattern, replacement] of rules) {
  src = src.replace(pattern, replacement);
}

// Motif résiduel : un guillemet simple isolé après un guillemet double
src = src.replace(/"'/g, '"');

// Motif final : guillemet fermant doublé, ex. "var(--shadow-sm)""
// Aucun guillemet double vide légitime n'existe dans ce fichier,
// le remplacement est donc sans risque.
src = src.replace(/"([^"\n]*)""/g, '"$1"');

// Nettoyage des espaces introduits : prop= "x"  ->  prop="x"
src = src.replace(/(\w[A-Za-z0-9]*)=\s+"/g, '$1="');

if (src === before) {
  console.log('[fix-quotes] aucune correction necessaire');
} else {
  writeFileSync(target, src, 'utf8');
  console.log('[fix-quotes] HomePage.jsx corrige');
}
