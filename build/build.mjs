// Generador del paquete didáctico.
//
//   node build.mjs
//
// Produce:
//   pdf/<documento>.html   -> una página imprimible por documento (para el paso a PDF)
//   pdf/completo.html      -> todo el paquete en un solo documento
//   curso/index.html       -> curso interactivo autocontenido (sin red, sin dependencias)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';
import { tema } from './tema.mjs';
import { diagnostico, final as quizFinal, bandas } from './quiz.mjs';
import { ICONOS, hero, bucleAgentico, motorCoche, sala, tarjetasRecursos } from './ilustraciones.mjs';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(AQUI, '..');
const HOY = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

marked.use({ gfm: true, breaks: false, pedantic: false });

// ---------------------------------------------------------------- documentos

const DOCUMENTOS = [
  { id: '00', archivo: '00_LEEME.md', titulo: 'Guía del paquete', corto: 'Guía', publico: 'instructor' },
  { id: '01', archivo: '01_guion_instructor.md', titulo: 'Guion del instructor', corto: 'Guion', publico: 'instructor' },
  { id: '02', archivo: '02_apuntes_alumno.md', titulo: 'Apuntes del alumno', corto: 'Apuntes', publico: 'alumno' },
  { id: '03', archivo: '03_laboratorio.md', titulo: 'Cuaderno de laboratorio', corto: 'Laboratorio', publico: 'alumno' },
  { id: '04', archivo: '04_soluciones_y_errores.md', titulo: 'Soluciones y errores frecuentes', corto: 'Soluciones', publico: 'instructor' },
  { id: '05', archivo: '05_glosario_chuleta.md', titulo: 'Glosario y chuleta', corto: 'Glosario', publico: 'alumno' },
  { id: '06', archivo: '06_evaluacion.md', titulo: 'Evaluación', corto: 'Evaluación', publico: 'instructor' },
  { id: '07', archivo: '07_instalacion_previa.md', titulo: 'Preparación previa', corto: 'Preparación', publico: 'alumno' },
];

function escapar(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function sinMarcas(s) {
  return String(s).replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
}

function aId(s) {
  return sinMarcas(s)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60);
}

/** Quita la numeración inicial de un título: «1. Del chat al agente» -> «Del chat al agente». */
function limpiarTitulo(t) {
  return String(t).replace(/^\d+(\.\d+)*\.?\s+/, '').trim();
}

/** Convierte Markdown a HTML y añade identificadores a los encabezados. */
async function aHtml(md) {
  const bruto = await marked.parse(md);
  const usados = new Map();
  return bruto.replace(/<h([1-4])>([\s\S]*?)<\/h\1>/g, (_todo, nivel, interior) => {
    let id = aId(interior) || 'seccion';
    const veces = usados.get(id) || 0;
    usados.set(id, veces + 1);
    if (veces) id = `${id}-${veces}`;
    return `<h${nivel} id="${id}">${interior}</h${nivel}>`;
  });
}

/** Divide un documento en su entradilla y sus secciones de nivel 2. */
function dividir(md) {
  const lineas = md.split(/\r?\n/);
  const entradilla = [];
  const secciones = [];
  let actual = null;
  let cercado = false;

  for (const linea of lineas) {
    if (/^\s*(```|~~~)/.test(linea)) cercado = !cercado;
    const esH2 = !cercado && /^##\s+\S/.test(linea);
    if (esH2) {
      actual = { titulo: linea.replace(/^##\s+/, '').trim(), lineas: [linea] };
      secciones.push(actual);
    } else if (actual) {
      actual.lineas.push(linea);
    } else {
      entradilla.push(linea);
    }
  }
  return {
    entradilla: entradilla.join('\n').trim(),
    secciones: secciones.map((s) => ({
      titulo: s.titulo,
      limpio: limpiarTitulo(s.titulo),
      md: s.lineas.join('\n').trim(),
    })),
  };
}

// ---------------------------------------------------------------- lectura

const docs = new Map();

for (const d of DOCUMENTOS) {
  const ruta = path.join(RAIZ, d.archivo);
  if (!fs.existsSync(ruta)) {
    console.error(`AVISO: falta el documento ${d.archivo}; se omite.`);
    continue;
  }
  const md = fs.readFileSync(ruta, 'utf8');
  const { entradilla, secciones } = dividir(md);
  docs.set(d.id, {
    ...d,
    md,
    entradillaHtml: await aHtml(entradilla),
    html: await aHtml(md),
    secciones: await Promise.all(
      secciones.map(async (s) => ({ titulo: s.titulo, limpio: s.limpio, html: await aHtml(s.md) }))
    ),
  });
}

// ---------------------------------------------------------------- plantilla HTML

function pagina({ titulo, cuerpo, claseBody, extraCss, scripts }) {
  return `<!DOCTYPE html>
<html lang="es" data-tema="claro">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="Curso y seminario sobre qué es un harness de IA y cómo usar un agente, para usuarios de chat sin conocimientos de programación.">
<title>${escapar(titulo)}</title>
<style>${tema}${extraCss || ''}</style>
</head>
<body class="${claseBody || ''}">
${cuerpo}
${scripts ? `<script>${scripts}</script>` : ''}
</body>
</html>
`;
}

// ---------------------------------------------------------------- HTML imprimible

const CSS_DOC = `
.doc{max-width:900px;margin:0 auto;padding:0 0 60px}
.doc-cabeza{border-bottom:2px solid var(--primario);padding:46px 0 20px;margin-bottom:26px}
.doc-cabeza .serie{font-size:.74rem;letter-spacing:.14em;text-transform:uppercase;color:var(--texto-tenue);font-weight:700}
.doc-cabeza h1{font-size:2.3rem;margin:12px 0 8px;letter-spacing:-.028em;line-height:1.12}
.doc-cabeza .meta{font-size:.86rem;color:var(--texto-suave)}
.doc-cabeza .meta b{color:var(--texto)}
.doc-nota{margin:24px 0 6px;padding:15px 18px;background:var(--superficie-2);border:1px solid var(--borde);border-radius:var(--radio);font-size:.86rem;color:var(--texto-suave)}
.doc-pie{margin-top:52px;padding-top:18px;border-top:1px solid var(--borde);font-size:.8rem;color:var(--texto-tenue);display:flex;justify-content:space-between;gap:14px;flex-wrap:wrap}
.separador-doc{height:0;border-top:3px double var(--borde-fuerte);margin:64px 0}
@media print{.doc{padding:0}.doc-cabeza{padding-top:0}.doc-cabeza h1{font-size:22pt}.doc-pie{page-break-before:avoid}}
`;

function documentoPdf(d, { conCabeza = true } = {}) {
  const cabeza = conCabeza
    ? `<header class="doc-cabeza">
      <div class="serie">Seminario «Del chat al agente» · Documento ${escapar(d.id)}</div>
      <h1>${escapar(d.titulo)}</h1>
      <div class="meta">Para: <b>${d.publico === 'alumno' ? 'alumnos' : 'instructor'}</b> · Herramienta: <b>DeepSeek Harness</b> (<code>dsh</code>) · Generado el ${escapar(HOY)}</div>
    </header>`
    : '';
  return `<div class="doc" id="doc-${escapar(d.id)}">
${cabeza}
<article class="contenido">${d.html}</article>
<div class="doc-pie"><span>Seminario «Del chat al agente: qué es un harness y cómo se usa»</span><span>Documento ${escapar(d.id)} · ${escapar(d.titulo)}</span></div>
</div>`;
}

// ---------------------------------------------------------------- curso

const MODULOS = {
  modulo1: { icono: 'concepto', titulo: 'Del chat al agente', detalle: 'Qué cambia respecto a un chat y las piezas del harness.' },
  modulo2: { icono: 'practicas', titulo: 'Manos a la obra', detalle: 'Cinco prácticas con un agente de verdad, en tu portátil.' },
  modulo3: { icono: 'avanzado', titulo: 'Trabajar sin sustos', detalle: 'Pedir bien, verificar y conocer los límites.' },
  modulo4: { icono: 'documento', titulo: 'Antes de venir', detalle: 'Instalación y preparación previa, paso a paso.' },
  evaluacion: { icono: 'evaluacion', titulo: 'Evaluación', detalle: 'Diagnóstico y evaluación final con corrección al momento.' },
  recursos: { icono: 'recursos', titulo: 'Recursos oficiales', detalle: 'Documentación, seguridad y comunidad del proyecto.' },
};

const ORDEN_MODULOS_PORTA = ['modulo1', 'modulo2', 'modulo3', 'modulo4', 'evaluacion', 'recursos'];

/** Portada del curso, con hero, cifras y tarjetas de módulos enlazadas. */
function cursoPortada(primeroPorGrupo) {
  const tarjetas = ORDEN_MODULOS_PORTA.map((m) => {
    const meta = MODULOS[m];
    const enlace = primeroPorGrupo[m];
    const n = (primeroPorGrupo[`${m}__n`] != null ? ` · ${primeroPorGrupo[`${m}__n`]} lecciones` : '');
    return `<a class="modulo" href="#${enlace}">
      <span class="modulo-icono">${ICONOS[meta.icono]}</span>
      <h3>${meta.titulo}</h3>
      <p>${meta.detalle}</p>
      <span class="num-lecciones">${n}</span>
    </a>`;
  }).join('\n');

  return `<div class="portada">
  <div class="hero">
    <div class="hero-texto">
      <span class="hero-etq">${ICONOS.inicio} Curso interactivo · 150 minutos</span>
      <h1>Del chat al agente</h1>
      <p class="hero-sub">Qué es un <b style="color:#fff">harness</b>, cómo se usa un agente de IA y, sobre todo,
      <b style="color:#fff">qué permisos le das y por qué</b>. Pensado para quien ya usa un chat de IA y nunca ha programado.</p>
      <div class="hero-cta">
        <a class="boton-cta" href="#${primeroPorGrupo.modulo1}">Empezar el curso ${ICONOS.flecha}</a>
        <a class="boton-cta secundario" href="#${primeroPorGrupo.recursos}">Ver recursos</a>
      </div>
    </div>
    <div class="hero-figura">${hero()}</div>
  </div>

  <div class="rejilla">
    <div class="tarjeta"><div class="cifra">4</div><div class="titulo">Módulos</div><div class="detalle">De los conceptos a un encargo real.</div></div>
    <div class="tarjeta"><div class="cifra">5</div><div class="titulo">Prácticas guiadas</div><div class="detalle">Con un agente de verdad, en tu portátil.</div></div>
    <div class="tarjeta"><div class="cifra">16</div><div class="titulo">Preguntas con clave</div><div class="detalle">Diagnóstico y evaluación comentados.</div></div>
    <div class="tarjeta"><div class="cifra">Offline</div><div class="titulo">Sin conexión</div><div class="detalle">Un solo archivo; puedes publicarlo donde quieras.</div></div>
  </div>

  <h2 class="seccion-titulo">Empieza por aquí</h2>
  <div class="modulos">${tarjetas}</div>

  <p class="pista">Muévete con el menú de la izquierda. Tu progreso se guarda <b>en este navegador</b> y nada sale de tu ordenador.
  Pulsa <kbd>/</kbd> para buscar y <kbd>←</kbd> <kbd>→</kbd> para pasar de sección. Cuando termines una sección, márcala como leída y el medidor de arriba avanzará.</p>
</div>`;
}

/** Ilustraciones que acompañan a lecciones concretas. */
const FIGURAS = {
  '02-del-chat-al-agente': motorCoche,
  '02-las-piezas-de-un-harness': bucleAgentico,
  '02-permisos-la-parte-que-de-verdad-importa': sala,
};

function minutosDeLectura(html) {
  const palabras = sinMarcas(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(palabras / 190));
}

/** Orden del curso: cada entrada es un documento completo o una sección concreta. */
const GUION_CURSO = [
  { id: 'inicio', titulo: 'Empezar', lecciones: [{ especial: 'portada', titulo: 'Presentación del curso' }] },
  {
    id: 'modulo1',
    titulo: 'Módulo 1 · Del chat al agente',
    lecciones: [
      { doc: '02', sec: 'De qué va todo esto' },
      { doc: '02', sec: 'Del chat al agente' },
      { doc: '02', sec: 'Las piezas de un harness' },
      { doc: '02', sec: 'Permisos: la parte que de verdad importa' },
      { doc: '02', sec: 'Contexto y memoria' },
      { doc: '02', sec: 'Conectar herramientas que ya existen' },
    ],
  },
  {
    id: 'modulo2',
    titulo: 'Módulo 2 · Manos a la obra',
    lecciones: [
      { doc: '03', sec: 'Antes de empezar' },
      { doc: '03', sec: 'Práctica 1' },
      { doc: '03', sec: 'Práctica 2' },
      { doc: '03', sec: 'Práctica 3' },
      { doc: '03', sec: 'Práctica 4' },
      { doc: '03', sec: 'Práctica 5' },
      { doc: '03', sec: 'Hoja de registro' },
    ],
  },
  {
    id: 'modulo3',
    titulo: 'Módulo 3 · Trabajar sin sustos',
    lecciones: [
      { doc: '02', sec: 'Cómo pedir bien' },
      { doc: '02', sec: 'Verificar: tu trabajo' },
      { doc: '02', sec: 'Límites, dichos con honestidad' },
      { doc: '02', sec: 'Las cuatro reglas para el lunes' },
      { doc: '02', sec: 'Resumen de una página' },
    ],
  },
  {
    id: 'modulo4',
    titulo: 'Módulo 4 · Antes de venir',
    lecciones: [{ doc: '07', completo: true }],
  },
  {
    id: 'evaluacion',
    titulo: 'Evaluación',
    lecciones: [
      { especial: 'quiz', quiz: 'diagnostico', titulo: 'Diagnóstico inicial' },
      { especial: 'quiz', quiz: 'final', titulo: 'Evaluación final' },
    ],
  },
  {
    id: 'recursos',
    titulo: 'Recursos oficiales',
    lecciones: [{ especial: 'recursos', titulo: 'Recursos y enlaces oficiales' }],
  },
  {
    id: 'consulta',
    titulo: 'Material de consulta',
    lecciones: [
      { doc: '05', completo: true },
      { doc: '00', completo: true },
    ],
  },
  {
    id: 'instructor',
    titulo: 'Para el instructor',
    lecciones: [
      { doc: '01', completo: true },
      { doc: '04', completo: true },
      { doc: '06', completo: true },
    ],
  },
];

function leccionRecursosHtml() {
  return `<h1>Recursos y enlaces oficiales</h1>
<p>Para profundizar, estas son las fuentes del propio proyecto. El resto del curso es material de elaboración propia,
pero aquí está siempre la verdad de referencia, sobre todo porque la herramienta está en <strong>developer preview</strong> y cambia rápido.</p>
${tarjetasRecursos()}
<p class="pista">Todos los enlaces se abren en una pestaña nueva. Si algo del curso ya no coincide con lo que ves en la herramienta,
mira primero aquí: la documentación oficial manda.</p>`;
}

function construirLecciones() {
  const lecciones = [];
  const grupos = [];
  const fallos = [];
  const usadas = new Set();
  const primeroPorGrupo = {};
  const cuentaPorGrupo = {};

  for (const g of GUION_CURSO) {
    grupos.push({ id: g.id, titulo: g.titulo });

    for (const it of g.lecciones) {
      if (it.especial === 'portada') {
        lecciones.push({ id: 'portada', grupo: g.id, titulo: it.titulo, tipo: 'doc', html: '', texto: '' });
        continue;
      }
      if (it.especial === 'quiz') {
        lecciones.push({ id: `quiz-${it.quiz}`, grupo: g.id, titulo: it.titulo, tipo: 'quiz', quiz: it.quiz, html: '', texto: it.titulo });
        continue;
      }
      if (it.especial === 'recursos') {
        const html = leccionRecursosHtml();
        lecciones.push({ id: 'recursos', grupo: g.id, titulo: it.titulo, tipo: 'doc', html, texto: sinMarcas(html) });
        continue;
      }

      const d = docs.get(it.doc);
      if (!d) { fallos.push(`documento ${it.doc} no encontrado`); continue; }

      let id, titulo, html;
      if (it.completo) {
        id = `doc-${d.id}`;
        titulo = d.titulo;
        html = d.html;
      } else {
        const tituloBuscado = it.sec.toLowerCase();
        const k = d.secciones.findIndex(
          (s, i) => !usadas.has(`${d.id}#${i}`) && s.limpio.toLowerCase().indexOf(tituloBuscado) === 0
        );
        if (k < 0) { fallos.push(`en ${d.archivo} no se encontró la sección «${it.sec}»`); continue; }
        const esPrimera = ![...usadas].some((u) => u.startsWith(`${d.id}#`));
        usadas.add(`${d.id}#${k}`);
        const sec = d.secciones[k];
        const previo = esPrimera && d.entradillaHtml ? d.entradillaHtml : '';
        id = `${d.id}-${aId(sec.limpio)}`;
        titulo = sec.limpio;
        html = `${previo}${sec.html}`;
      }

      // Ilustración para determinadas lecciones
      const figura = FIGURAS[id];
      if (figura) html = `${figura()}${html}`;

      // Metadatos: módulo, fuente y tiempo de lectura
      const modulo = MODULOS[g.id];
      const minutos = minutosDeLectura(html);
      const metaBar = `<div class="leccion-meta">
        ${modulo ? `<span class="chip modulo">${ICONOS[modulo.icono]} ${modulo.titulo}</span>` : ''}
        <span class="chip">${ICONOS.reloj} ${minutos} min de lectura</span>
        <span class="chip">${ICONOS.documento} Documento ${d.id}</span>
      </div>`;
      html = `${metaBar}${html}`;

      const leccion = { id, grupo: g.id, titulo, tipo: 'doc', html, texto: sinMarcas(html) };
      lecciones.push(leccion);

      cuentaPorGrupo[g.id] = (cuentaPorGrupo[g.id] || 0) + 1;
      if (!primeroPorGrupo[g.id]) primeroPorGrupo[g.id] = id;
    }
  }

  // La portada se construye al final, cuando ya se conocen los enlaces de cada módulo.
  for (const g of GUION_CURSO) {
    primeroPorGrupo[`${g.id}__n`] = cuentaPorGrupo[g.id] || 0;
  }
  const portada = cursoPortada(primeroPorGrupo);
  const iPortada = lecciones.findIndex((l) => l.id === 'portada');
  lecciones[iPortada].html = portada;
  lecciones[iPortada].texto = sinMarcas(portada);

  return { lecciones, grupos, fallos };
}

// ---------------------------------------------------------------- escritura

const salida = { pdf: [], curso: null, avisos: [] };

function asegurarCarpeta(p) {
  fs.mkdirSync(p, { recursive: true });
}

const dirPdf = path.join(RAIZ, 'pdf');
const dirCurso = path.join(RAIZ, 'curso');
asegurarCarpeta(dirPdf);
asegurarCarpeta(dirCurso);

for (const d of docs.values()) {
  const nombre = `${d.id}_${aId(d.titulo)}.html`;
  const html = pagina({
    titulo: `${d.titulo} — Seminario «Del chat al agente»`,
    cuerpo: documentoPdf(d),
    claseBody: 'solo-doc',
    extraCss: CSS_DOC + '.solo-doc .lienzo{padding:0 30px}.solo-doc{background:var(--superficie)}' + '.solo-doc .doc{padding:24px 0 60px}',
  });
  fs.writeFileSync(path.join(dirPdf, nombre), html, 'utf8');
  salida.pdf.push(nombre);
}

{
  const partes = [...docs.values()].map((d, i) => (i ? '<div class="separador-doc"></div>' : '') + documentoPdf(d)).join('\n');
  const html = pagina({
    titulo: 'Seminario «Del chat al agente» — paquete completo',
    cuerpo: `<div class="doc">
      <header class="doc-cabeza">
        <div class="serie">Paquete completo · 8 documentos</div>
        <h1>Seminario «Del chat al agente: qué es un harness y cómo se usa»</h1>
        <div class="meta">Audiencia: <b>usuarios corrientes de chat/bot</b> · Duración: <b>150 minutos</b> · Herramienta: <b>DeepSeek Harness</b> (<code>dsh</code>) · Generado el ${escapar(HOY)}</div>
      </header>
      <div class="doc-nota">Este volumen reúne los ocho documentos del paquete: guía, guion del instructor, apuntes, laboratorio, soluciones, glosario, evaluación y preparación previa. Para imprimir solo una parte, usa los PDF individuales.</div>
    </div>
    ${partes}`,
    claseBody: 'solo-doc',
    extraCss: CSS_DOC,
  });
  fs.writeFileSync(path.join(dirPdf, 'completo.html'), html, 'utf8');
  salida.pdf.push('completo.html');
}

{
  const { lecciones, grupos, fallos } = construirLecciones();
  salida.avisos.push(...fallos);

  const datos = {
    titulo: 'Del chat al agente',
    subtitulo: 'Curso sobre harness y agentes de IA',
    grupos,
    lecciones,
    diagnostico,
    final: quizFinal,
    bandas,
  };
  const app = fs.readFileSync(path.join(AQUI, 'app_cliente.js'), 'utf8');

  const datosJson = JSON.stringify(datos)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

  const cuerpo = `<div class="velo" id="velo"></div>
<div class="app">
  <aside class="lateral" id="lateral">
    <div class="marca">
      <div class="logo">${ICONOS.escudo}</div>
      <h1>Del chat al agente</h1>
      <p>Curso interactivo</p>
    </div>
    <div class="buscador">
      <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
      <input id="buscar" type="search" placeholder="Buscar en el curso" autocomplete="off" aria-label="Buscar">
      <kbd>/</kbd>
    </div>
    <nav id="nav"></nav>
    <div class="lateral-pie" id="cuenta">0 de 0 completadas</div>
  </aside>
  <div class="principal">
    <div class="barra">
      <button class="icono abrir-menu" id="btn-menu" title="Abrir menú" aria-label="Abrir menú">\u2261</button>
      <div class="migas" id="migas"></div>
      <div class="barra-acciones">
        <div class="medidor"><span id="pct">0%</span><span class="pista"><span class="relleno" id="relleno"></span></span></div>
        <button class="icono" id="btn-print" title="Imprimir esta sección" aria-label="Imprimir">\u2399</button>
        <button class="icono" id="btn-tema" title="Cambiar de tema" aria-label="Cambiar de tema">\u263D</button>
      </div>
    </div>
    <main class="lienzo" id="lienzo"><div class="hoja" id="hoja"></div></main>
  </div>
</div>`;

  const html = pagina({
    titulo: 'Del chat al agente — Curso interactivo',
    cuerpo,
    claseBody: 'curso',
    scripts: `window.__CURSO__ = ${datosJson};\n${app}`,
  });

  fs.writeFileSync(path.join(dirCurso, 'index.html'), html, 'utf8');
  salida.curso = { lecciones: lecciones.length, grupos: grupos.length, bytes: Buffer.byteLength(html) };
}

// ---------------------------------------------------------------- informe

console.log('Documentos procesados:', docs.size);
console.log('HTML imprimibles:', salida.pdf.length, '->', salida.pdf.join(', '));
if (salida.curso) {
  console.log(`Curso: ${salida.curso.lecciones} lecciones en ${salida.curso.grupos} grupos · ${(salida.curso.bytes / 1024).toFixed(0)} KB`);
}
if (salida.avisos.length) {
  console.log('\nAVISOS (revisar el guion del curso):');
  salida.avisos.forEach((a) => console.log('  -', a));
  process.exitCode = 2;
} else {
  console.log('Sin avisos: todas las secciones del curso se resolvieron.');
}
