// Genera la baraja de diapositivas a partir de slides/slides.md (formato Marp).
//
//   node build_slides.mjs
//
// Produce slides/diapositivas.html: una baraja autocontenida, sin red y sin dependencias,
// con navegación por teclado, notas del presentador y una diapositiva por página al imprimir.
//
// El archivo slides.md sigue siendo la fuente y se puede abrir también con Marp
// (extensión de VS Code) o con marp-cli.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(AQUI, '..');
const ENTRADA = path.join(RAIZ, 'slides', 'slides.md');
const SALIDA = path.join(RAIZ, 'slides', 'diapositivas.html');

if (!fs.existsSync(ENTRADA)) {
  console.error('No se encuentra slides/slides.md');
  process.exit(1);
}

marked.use({ gfm: true, breaks: false });

const crudo = fs.readFileSync(ENTRADA, 'utf8');
const lineas = crudo.split(/\r?\n/);

// ---------------------------------------------------------------- front-matter

const meta = {};
let i = 0;
if (lineas[0] && lineas[0].trim() === '---') {
  i = 1;
  while (i < lineas.length && lineas[i].trim() !== '---') {
    const m = lineas[i].match(/^([\w-]+):\s*(.*)$/);
    if (m) meta[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
    i++;
  }
  i++; // salta el cierre
}

// ---------------------------------------------------------------- separación en diapositivas

const brutas = [];
let acumuladas = [];
let cercado = false;

for (; i < lineas.length; i++) {
  const linea = lineas[i];
  if (/^\s*(```|~~~)/.test(linea)) cercado = !cercado;
  if (!cercado && linea.trim() === '---') {
    brutas.push(acumuladas.join('\n'));
    acumuladas = [];
  } else {
    acumuladas.push(linea);
  }
}
if (acumuladas.join('\n').trim()) brutas.push(acumuladas.join('\n'));

// ---------------------------------------------------------------- render de cada diapositiva

function escapar(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Convierte las notas del presentador (comentarios HTML) en Markdown sencillo. */
async function notasAHtml(texto) {
  const limpio = texto.trim();
  if (!limpio) return '';
  const html = await marked.parse(limpio);
  return html;
}

const diapositivas = [];
let esPortada = true;
let claseHeredada = '';

for (const bruta of brutas) {
  if (!bruta.trim()) continue;

  // Comentarios: directivas o notas del presentador
  const comentarios = [];
  const sinComentarios = bruta.replace(/<!--([\s\S]*?)-->/g, (_t, interior) => {
    const c = interior.trim();
    const directiva = c.match(/^_?(class|paginate|header|footer|backgroundColor|color)\s*:\s*(.+)$/);
    if (directiva) {
      if (directiva[1] === 'class') {
        if (/_class/.test(c)) claseHeredada = directiva[2].trim();
      }
      return '';
    }
    comentarios.push(c);
    return '';
  });

  // Directivas de clase escritas como comentario con guion bajo
  const claseSuelta = bruta.match(/<!--\s*_class:\s*([\w-]+)\s*-->/);
  const clase = claseSuelta ? claseSuelta[1] : '';
  if (claseSuelta) claseHeredada = '';

  const cuerpo = await marked.parse(sinComentarios.trim());
  const notas = await notasAHtml(comentarios.join('\n\n'));

  diapositivas.push({
    html: cuerpo,
    notas,
    clase: clase || (esPortada ? 'lead' : ''),
    portada: esPortada,
  });
  esPortada = false;
}

// ---------------------------------------------------------------- plantilla

const cabecera = meta.header || 'Del chat al agente';

const paginas = diapositivas
  .map((d, n) => {
    const clases = ['diapo'];
    if (d.clase) clases.push(d.clase);
    if (d.portada) clases.push('portada');
    return `<section class="${clases.join(' ')}" data-notas="${escapar(d.notas)}" data-n="${n + 1}">
${d.html.trim()}
</section>`;
  })
  .join('\n');

const script = fs.readFileSync(path.join(AQUI, 'deck_cliente.js'), 'utf8');

const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Seminario «Del chat al agente» — diapositivas</title>
<style>
:root{
  --tinta:#12172a; --tinta-suave:#4d5670; --tenue:#8b93a8;
  --papel:#ffffff; --fondo:#0d1017; --linea:#e4e8f0;
  --azul:#2f4bd8; --azul-claro:#eef1ff; --turquesa:#0f8a7e;
  --ambar:#b45309; --ambar-claro:#fdf4e6;
  --sans:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;
  --mono:ui-monospace,SFMono-Regular,'Cascadia Code',Consolas,monospace;
}
*{box-sizing:border-box}
html,body{margin:0;height:100%}
body{
  background:var(--fondo);font-family:var(--sans);color:var(--tinta);
  display:flex;flex-direction:column;overflow:hidden;
}
.barra{
  flex:0 0 auto;display:flex;align-items:center;gap:14px;padding:9px 16px;
  background:#141926;color:#c9d0e0;font-size:.8rem;border-bottom:1px solid #232a3d;
}
.barra .titulo{font-weight:600;color:#fff;font-size:.84rem}
.barra .pista{color:#78829a}
.barra .derecha{margin-left:auto;display:flex;align-items:center;gap:8px}
.barra button{
  background:#1e2434;border:1px solid #2f3850;color:#c9d0e0;border-radius:7px;
  padding:5px 10px;font:inherit;font-size:.76rem;cursor:pointer;
}
.barra button:hover{background:#28304a;color:#fff}
.barra kbd{
  font-family:var(--mono);font-size:.7rem;background:#232a3d;border-radius:4px;
  padding:1px 5px;color:#8f99b3;
}
.progreso{flex:0 0 auto;height:3px;background:#1b2130}
.progreso span{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--azul),var(--turquesa));transition:width .2s}

/* Escenario de 1280x720 escalado: idéntico en pantalla y en papel */
.escenario{
  flex:1;display:grid;place-items:center;position:relative;overflow:hidden;
  --esc:1;
}
.pila{
  width:1280px;height:720px;position:relative;
  transform:scale(var(--esc));transform-origin:center center;
}
.diapo{
  position:absolute;inset:0;background:var(--papel);
  padding:64px 76px;display:none;flex-direction:column;justify-content:flex-start;
  overflow:hidden;
}
.diapo.visible{display:flex}
.diapo::after{
  content:'${escapar(cabecera)}';
  position:absolute;bottom:24px;right:34px;font-size:.76rem;color:#aeb6c8;letter-spacing:.04em;
}

/* Tipografía de las diapositivas */
.diapo h1{font-size:2.9rem;line-height:1.12;letter-spacing:-.03em;margin:.1em 0 .45em;font-weight:750}
.diapo h2{font-size:2.15rem;line-height:1.16;letter-spacing:-.026em;margin:.1em 0 .5em;font-weight:730}
.diapo h3{font-size:1.5rem;margin:.2em 0 .5em;font-weight:680;letter-spacing:-.014em}
.diapo p{font-size:1.32rem;line-height:1.5;margin:.5em 0;color:var(--tinta-suave)}
.diapo strong{color:var(--tinta);font-weight:690}
.diapo em{color:var(--tinta-suave)}
.diapo ul,.diapo ol{margin:.55em 0;padding-left:1.5em}
.diapo li{font-size:1.3rem;line-height:1.5;margin:.42em 0;color:var(--tinta-suave)}
.diapo li::marker{color:var(--azul)}
.diapo li strong{color:var(--tinta)}
.diapo code{
  font-family:var(--mono);font-size:.82em;background:#f2f4f9;border:1px solid var(--linea);
  border-radius:6px;padding:.1em .36em;color:#1d2540;
}
.diapo pre{
  background:#f7f8fc;border:1px solid var(--linea);border-radius:12px;padding:18px 20px;
  margin:.7em 0;overflow:hidden;
}
.diapo pre code{background:none;border:0;font-size:1rem;line-height:1.55}
.diapo blockquote{
  margin:.6em 0;padding:16px 20px;background:var(--azul-claro);
  border-left:4px solid var(--azul);border-radius:0 12px 12px 0;
}
.diapo blockquote p{margin:.2em 0;color:var(--tinta)}
.diapo hr{border:0;border-top:1px solid var(--linea);margin:1.1em 0}
.diapo table{
  width:100%;border-collapse:collapse;margin:.7em 0;font-size:1.06rem;
}
.diapo thead th{
  text-align:left;background:#f2f4f9;color:#39415a;font-size:.82rem;font-weight:680;
  text-transform:uppercase;letter-spacing:.05em;padding:11px 14px;border-bottom:1px solid #d8deeb;
}
.diapo tbody td{padding:11px 14px;border-bottom:1px solid var(--linea);color:var(--tinta-suave);vertical-align:top}
.diapo tbody td:first-child{color:var(--tinta);font-weight:560}
.diapo tbody tr:last-child td{border-bottom:0}
.diapo a{color:var(--azul);text-decoration:none}

/* Portada y diapositivas de sección */
.diapo.lead{justify-content:center;align-items:flex-start;background:linear-gradient(135deg,#101a3a 0%,#1d2f6b 55%,#0f5f57 100%)}
.diapo.lead h1,.diapo.lead h2,.diapo.lead h3{color:#fff}
.diapo.lead p,.diapo.lead li{color:#c3cde6}
.diapo.lead strong{color:#fff}
.diapo.lead code{background:#ffffff22;border-color:#ffffff33;color:#eaf0ff}
.diapo.lead::after{color:#8fa0c8}
.diapo.lead blockquote{background:#ffffff14;border-left-color:#7fe3d6}
.diapo.lead blockquote p{color:#e6ecfa}

/* Panel de notas del presentador */
.notas{
  flex:0 0 auto;max-height:0;overflow:hidden;background:#f7f8fb;border-top:1px solid var(--linea);
  transition:max-height .2s ease;padding:0 26px;
}
.notas.visible{max-height:190px;overflow-y:auto;padding:15px 26px 18px}
.notas h4{
  margin:0 0 6px;font-size:.72rem;text-transform:uppercase;letter-spacing:.1em;color:var(--tenue);
  font-weight:680;
}
.notas .cuerpo{font-size:.92rem;line-height:1.55;color:#39415a}
.notas .cuerpo p{margin:.3em 0}
.notas .cuerpo ul{margin:.3em 0;padding-left:1.2em}
.notas .cuerpo li{margin:.15em 0}
.notas .cuerpo strong{color:var(--tinta)}
.notas .cuerpo em{color:var(--tenue)}

@media (max-width:820px){
  .barra .pista{display:none}
  .notas.visible{max-height:230px}
}

/* ---------- Impresión: una diapositiva por página, en apaisado ---------- */
@page{size:1280px 720px;margin:0}
@media print{
  html,body{height:auto;overflow:visible;background:#fff}
  .barra,.progreso,.notas{display:none!important}
  .escenario{display:block;overflow:visible}
  .pila{width:auto;height:auto;transform:none}
  .diapo{
    display:flex!important;position:relative;width:1280px;height:720px;
    page-break-after:always;break-after:page;page-break-inside:avoid;break-inside:avoid;
  }
  .diapo:last-child{page-break-after:auto;break-after:auto}
}
</style>
</head>
<body>
<div class="barra">
  <span class="titulo">Del chat al agente · diapositivas</span>
  <span class="pista"><kbd>←</kbd> <kbd>→</kbd> navegar · <kbd>N</kbd> notas · <kbd>F</kbd> pantalla completa · <kbd>P</kbd> imprimir</span>
  <span class="derecha">
    <span id="contador">1 / ${diapositivas.length}</span>
    <button id="btn-ant" type="button">Anterior</button>
    <button id="btn-sig" type="button">Siguiente</button>
    <button id="btn-notas" type="button">Notas</button>
    <button id="btn-pantalla" type="button">Pantalla completa</button>
    <button id="btn-print" type="button">PDF</button>
  </span>
</div>
<div class="progreso"><span id="relleno"></span></div>
<div class="escenario" id="escenario">
  <div class="pila">
${paginas}
  </div>
</div>
<div class="notas" id="notas">
  <h4>Notas del presentador</h4>
  <div class="cuerpo" id="notas-texto"></div>
</div>
<script>${script}</script>
</body>
</html>
`;

fs.writeFileSync(SALIDA, html, 'utf8');

const conNotas = diapositivas.filter((d) => d.notas).length;
console.log(`Diapositivas: ${diapositivas.length} (${conNotas} con notas del presentador)`);
console.log(`Escritas en: ${path.relative(RAIZ, SALIDA)} (${(Buffer.byteLength(html) / 1024).toFixed(0)} KB)`);
