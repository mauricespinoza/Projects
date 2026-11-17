# ClaudeCoding
pruebas de codigos

🌐 **Sitio en vivo:** https://mauricespinoza.github.io/Projects/ — portada con todas las web apps de geología estructural (StructuralSketcher, FieldDraw, GISDrawer, GeoPhoto Studio, MapTeaching, MineGeology) y los proyectos docentes ExplorAR y ANDES 3D. Para editarla: [`pages/index.html`](pages/index.html) (fotos en [`pages/img/`](pages/img)).

## Apps

- [`app/`](app) — gestor de tareas académico (proyectos, tareas, notas, reuniones).
- [`chess/`](chess) — Ajedrez de Batalla 3D: ajedrez completo en 3D con piezas
  animadas que combaten entre sí, jugable con el dedo en tablet o con ratón en PC.
  Ver [`chess/README.md`](chess/README.md).
- [`structuralsketcher/`](structuralsketcher) — StructuralSketcher: editor vectorial de
  secciones geológicas estructurales (horizontes, fallas con simbología, regla con
  ángulos, cortes y balance por unidad). Ver [`structuralsketcher/README.md`](structuralsketcher/README.md).
- [`geophoto/`](geophoto) — GeoPhoto Studio: fotos geolocalizadas sobre un mapa,
  exportación a Google Earth (KML/KMZ) y editor vectorial de anotaciones con rótulos
  de rumbo. Ver [`geophoto/README.md`](geophoto/README.md).

## Contador de visitas

La portada muestra las visitas totales, las de cada app y un mapa por país, con
[GoatCounter](https://www.goatcounter.com/) (anónimo, sin cookies). Un solo sitio
de GoatCounter, `mauricespinoza`, cuenta todo `mauricespinoza.github.io`: cada app
carga el mismo `count.js` y las rutas se pasan a minúsculas.

Para activarlo, una vez:

1. Crear la cuenta en goatcounter.com con el código `mauricespinoza` (si se usa
   otro, cambiar `mauricespinoza.goatcounter.com` en `pages/index.html`, en el
   workflow y en el `<head>` de cada app).
2. En Settings, marcar «Allow adding visitor counts on your website»: las cifras
   de la portada salen del contador público.
3. En User → API, crear un token con el permiso «Read statistics» y guardarlo en
   este repositorio como secreto de Actions `GOATCOUNTER_TOKEN`. El workflow de
   Pages lo usa cada seis horas para escribir `stats.json` (visitas por país).
4. Pegar en el `<head>` de las apps de otros repositorios (FieldDraw, GISDraw,
   MapTeaching, StructuralSketcher):

   ```html
   <script>window.goatcounter = { path: function (p) { return p.toLowerCase(); } };</script>
   <script data-goatcounter="https://mauricespinoza.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>
   ```

El mapa (`pages/world.json`) lo escribe `tools/make-world-map.mjs`.
