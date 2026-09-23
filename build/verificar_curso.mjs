// Comprobación del curso interactivo sin navegador.
//
//   node verificar_curso.mjs
//
// Carga curso/index.html en un DOM simulado, ejecuta su JavaScript y comprueba
// que la navegación, la búsqueda, el progreso y el cuestionario funcionan.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM, VirtualConsole } from 'jsdom';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(AQUI, '..');
const ARCHIVO = path.join(RAIZ, 'curso', 'index.html');

let fallos = 0;
let pruebas = 0;

function comprobar(descripcion, condicion, detalle = '') {
  pruebas++;
  if (condicion) {
    console.log(`  OK   ${descripcion}`);
  } else {
    fallos++;
    console.log(`  FALLO ${descripcion}${detalle ? ' — ' + detalle : ''}`);
  }
}

if (!fs.existsSync(ARCHIVO)) {
  console.error('No existe curso/index.html. Ejecuta antes: node build/build.mjs');
  process.exit(1);
}

const html = fs.readFileSync(ARCHIVO, 'utf8');

// jsdom no implementa scrollTo: se silencia ese aviso concreto.
const consola = new VirtualConsole();
const avisosIgnorados = [];
consola.on('jsdomError', (e) => {
  const m = String(e && e.message);
  if (m.includes('scrollTo') || m.includes('Not implemented')) {
    avisosIgnorados.push(m);
    return;
  }
  console.error('  error de jsdom:', m);
  fallos++;
});
consola.on('error', (m) => avisosIgnorados.push(String(m)));

const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  url: 'http://localhost/curso/',
  pretendToBeVisual: true,
  virtualConsole: consola,
});

const { window } = dom;
const doc = window.document;

await new Promise((r) => setTimeout(r, 250));

console.log('\n1. Carga y estructura');
const datos = window.__CURSO__;
comprobar('El curso expone sus datos', !!datos);
comprobar('Hay 28 lecciones', datos && datos.lecciones.length === 28, datos ? `son ${datos.lecciones.length}` : '');
comprobar('Hay 9 grupos', datos && datos.grupos.length === 9, datos ? `son ${datos.grupos.length}` : '');
comprobar('El cuestionario final tiene 12 preguntas', datos && datos.final.length === 12);
comprobar('El diagnóstico tiene 4 preguntas', datos && datos.diagnostico.length === 4);
comprobar(
  'Todas las claves del cuestionario apuntan a una opción válida',
  datos && datos.final.every((p) => p.correcta >= 0 && p.correcta < p.opciones.length)
);

console.log('\n2. Menú lateral');
const botones = () => Array.from(doc.querySelectorAll('#nav button'));
comprobar('Se pintan los 28 botones de lección', botones().length === 28, `hay ${botones().length}`);
comprobar('El menú muestra los títulos de grupo', doc.querySelectorAll('#nav .grupo-titulo').length === 9);

console.log('\n3. Portada');
const hoja = doc.getElementById('hoja');
comprobar('La portada muestra el título del curso', hoja.textContent.includes('Del chat al agente'));
comprobar('La portada muestra las tarjetas de cifras', doc.querySelectorAll('#hoja .tarjeta').length === 4);
comprobar('Las migas de pan indican la sección', doc.getElementById('migas').textContent.trim().length > 0);

console.log('\n4. Navegación entre lecciones');
function irA(id) {
  const b = doc.querySelector(`#nav button[data-id="${id}"]`);
  if (!b) return false;
  b.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
  return true;
}
const idPermisos = '02-permisos-la-parte-que-de-verdad-importa';
comprobar('Existe la lección de permisos', !!doc.querySelector(`#nav button[data-id="${idPermisos}"]`));
irA(idPermisos);
comprobar(
  'Al pulsarla se carga su contenido',
  doc.getElementById('hoja').textContent.includes('Dentro de la sala'),
  doc.getElementById('hoja').textContent.slice(0, 80)
);
comprobar('La URL refleja la lección', window.location.hash === '#' + idPermisos, window.location.hash);
comprobar('El botón queda marcado como actual', !!doc.querySelector(`#nav button[aria-current="true"]`));

console.log('\n5. Progreso');
const pctAntes = doc.getElementById('pct').textContent;
const chk = doc.querySelector('#hoja .marcar input[type=checkbox]');
comprobar('La lección tiene casilla de "leído"', !!chk);
if (chk) {
  chk.checked = true;
  chk.dispatchEvent(new window.Event('change', { bubbles: true }));
}
comprobar('El porcentaje sube al marcarla', doc.getElementById('pct').textContent !== pctAntes,
  `${pctAntes} -> ${doc.getElementById('pct').textContent}`);
comprobar('La cuenta de completadas se actualiza', doc.getElementById('cuenta').textContent.includes('1 de 28'),
  doc.getElementById('cuenta').textContent);

console.log('\n6. Búsqueda');
const buscar = doc.getElementById('buscar');
buscar.value = 'sandbox';
buscar.dispatchEvent(new window.Event('input', { bubbles: true }));
const tras = botones().length;
comprobar('Buscar "sandbox" filtra el menú', tras > 0 && tras < 27, `quedan ${tras}`);
buscar.value = 'zzzznoexiste';
buscar.dispatchEvent(new window.Event('input', { bubbles: true }));
comprobar('Una búsqueda sin resultados muestra aviso', !!doc.querySelector('#nav .vacio'));
buscar.value = '';
buscar.dispatchEvent(new window.Event('input', { bubbles: true }));
comprobar('Al vaciar la búsqueda vuelven las 28', botones().length === 28, `hay ${botones().length}`);

console.log('\n7. Cuestionario final');
irA('quiz-final');
let preguntas = doc.querySelectorAll('#hoja .pregunta');
comprobar('Se pintan las 12 preguntas', preguntas.length === 12, `hay ${preguntas.length}`);
const primeraPregunta = doc.querySelector('#hoja .pregunta');
comprobar('Hay 4 opciones por pregunta', primeraPregunta && primeraPregunta.querySelectorAll('.opcion').length === 4,
  primeraPregunta ? `hay ${primeraPregunta.querySelectorAll('.opcion').length}` : 'sin preguntas');

// Responder todas correctamente, reconsultando el DOM tras cada repintado.
for (const p of datos.final) {
  const bloque = doc.querySelector(`#hoja .pregunta[data-pid="${p.id}"]`);
  if (!bloque) { console.log(`  FALLO no se encontró la pregunta ${p.id}`); fallos++; continue; }
  const opciones = bloque.querySelectorAll('.opcion');
  opciones[p.correcta].dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
}

const resultado = doc.getElementById('resultado');
comprobar('Aparece el bloque de resultado', !!resultado);
comprobar('La nota es 12 / 12', resultado && resultado.textContent.includes('12 / 12'),
  resultado ? resultado.textContent.slice(0, 60) : '');
comprobar('Se muestra la banda de interpretación', resultado && resultado.textContent.includes('Conceptos sólidos'));
comprobar('Se explica una respuesta acertada', !!doc.querySelector('#hoja .explica.bien'));

console.log('\n8. Respuesta incorrecta');
irA('quiz-diagnostico');
const primeraDiag = datos.diagnostico[0];
const bloqueDiag = doc.querySelector(`#hoja .pregunta[data-pid="${primeraDiag.id}"]`);
const mala = (primeraDiag.correcta + 1) % primeraDiag.opciones.length;
bloqueDiag.querySelectorAll('.opcion')[mala].dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
comprobar('Se marca la opción fallada', !!doc.querySelector('#hoja .opcion.fallo'));
comprobar('Se marca además la correcta', !!doc.querySelector('#hoja .opcion.acierto'));
comprobar('Se explica el error', !!doc.querySelector('#hoja .explica.mal'));

console.log('\n9. Persistencia');
comprobar('Se guarda el progreso en localStorage', !!window.localStorage.getItem('seminario-harness-v1'));
const guardado = JSON.parse(window.localStorage.getItem('seminario-harness-v1') || '{}');
comprobar('El estado guardado contiene la lección marcada', !!(guardado.hechas && guardado.hechas[idPermisos]));
comprobar('El estado guardado contiene las respuestas', !!guardado.respuestas && Object.keys(guardado.respuestas).length >= 12);

console.log('\n10. Diseño, ilustraciones y enlaces');
irA('portada');
comprobar('La portada tiene un bloque hero', !!doc.querySelector('#hoja .hero'));
comprobar('El hero lleva una ilustración SVG', !!doc.querySelector('#hoja .hero svg'),
  doc.querySelectorAll('#hoja .hero svg').length + ' svg');
comprobar('Hay 6 tarjetas de módulo', doc.querySelectorAll('#hoja .modulos .modulo').length === 6,
  `hay ${doc.querySelectorAll('#hoja .modulos .modulo').length}`);
comprobar('Las tarjetas enlazan a lecciones (#id)',
  Array.from(doc.querySelectorAll('#hoja .modulos .modulo')).every((m) => /^#/.test(m.getAttribute('href'))));

irA('recursos');
comprobar('La lección de recursos lista enlaces', doc.querySelectorAll('#hoja .recursos .recurso').length === 6,
  `hay ${doc.querySelectorAll('#hoja .recursos .recurso').length}`);
comprobar('Todos los enlaces son externos y se abren en pestaña nueva',
  Array.from(doc.querySelectorAll('#hoja .recursos .recurso')).every((a) =>
    /^https:\/\//.test(a.getAttribute('href')) && a.getAttribute('target') === '_blank' && a.getAttribute('rel') === 'noopener'
  ));

irA('02-del-chat-al-agente');
comprobar('La lección «Del chat al agente» lleva una figura', doc.querySelectorAll('#hoja .figura svg').length >= 1);
comprobar('Las lecciones muestran el tiempo de lectura',
  doc.querySelector('#hoja .leccion-meta') && /min de lectura/.test(doc.querySelector('#hoja .leccion-meta').textContent));
irA('02-las-piezas-de-un-harness');
comprobar('La lección del bucle lleva su diagrama', doc.querySelectorAll('#hoja .figura svg').length >= 1);
irA('02-permisos-la-parte-que-de-verdad-importa');
comprobar('La lección de permisos lleva su ilustración', doc.querySelectorAll('#hoja .figura svg').length >= 1);

console.log('\n11. Regresión: Node.js en la Práctica 1');
const botonP1 = Array.from(doc.querySelectorAll('#nav button')).find((b) => /Pr\u00e1ctica 1/.test(b.textContent));
comprobar('Existe la lección de Práctica 1', !!botonP1);
if (botonP1) {
  botonP1.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
  const textoP1 = doc.getElementById('hoja').textContent;
  comprobar('La Práctica 1 menciona Node.js', textoP1.includes('Node.js'));
  comprobar('La Práctica 1 enseña a comprobar con node -v', textoP1.includes('node -v'));
}

console.log(`\n${pruebas - fallos} de ${pruebas} comprobaciones correctas.`);
if (avisosIgnorados.length) {
  console.log(`(${avisosIgnorados.length} avisos de jsdom ignorados: scrollTo y similares)`);
}
if (fallos) {
  console.log(`${fallos} FALLOS.`);
  process.exitCode = 1;
} else {
  console.log('El curso funciona: navegación, búsqueda, progreso y evaluación.');
}
