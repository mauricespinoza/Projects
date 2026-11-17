/*
 * Escribe pages/world.json: el mapa del mundo de la sección de visitas, un
 * trayecto SVG por país con su código ISO 3166-1 alfa-2 (el que entrega
 * GoatCounter) y su nombre en castellano. Proyección Natural Earth en un
 * lienzo de 960 × 470, sin la Antártica. Se corre una vez; el JSON queda en el
 * repositorio y la página no carga ninguna librería.
 *
 *   npm i --no-save world-atlas@2.0.2 d3-geo@3.1.1 topojson-client@3.1.0 i18n-iso-countries@7.11.3
 *   node tools/make-world-map.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import countries from 'i18n-iso-countries';

const require = createRequire(import.meta.url);
countries.registerLocale(require('i18n-iso-countries/langs/es.json'));
const topo = JSON.parse(readFileSync(require.resolve('world-atlas/countries-110m.json'), 'utf8'));
const fc = feature(topo, topo.objects.countries);
fc.features = fc.features.filter((f) => f.id !== '010'); // Antártica

const W = 960, H = 470;
const projection = geoNaturalEarth1().fitExtent([[4, 4], [W - 4, H - 4]], fc);
const path = geoPath(projection).digits(1);

const out = { width: W, height: H, countries: {} };
for (const f of fc.features) {
  const a2 = f.id ? countries.numericToAlpha2(f.id) : null;
  const d = path(f);
  if (!d) continue;
  // Kosovo y el norte de Chipre no tienen código numérico en world-atlas.
  const id = a2 || { Kosovo: 'XK', 'N. Cyprus': 'CY' }[f.properties.name];
  if (!id) continue;
  const prev = out.countries[id];
  out.countries[id] = [countries.getName(id, 'es') || f.properties.name, prev ? prev[1] + d : d];
}
writeFileSync(new URL('../pages/world.json', import.meta.url), JSON.stringify(out));
console.log(Object.keys(out.countries).length, 'países');
