// Comprobación de la baraja de diapositivas sin navegador.
//
//   node verificar_slides.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM, VirtualConsole } from 'jsdom';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(AQUI, '..');
const ARCHIVO = path.join(RAIZ, 'slides', 'diapositivas.html');

let fallos = 0;
let pruebas = 0;

function comprobar(descripcion, condicion, detalle = '') {
  pruebas++;
  if (condicion) console.log(`  OK   ${descripcion}`);
  else { fallos++; console.log(`  FALLO ${descripcion}${detalle ? ' — ' + detalle : ''}`); }
}

if (!fs.existsSync(ARCHIVO)) {
  console.error('No existe slides/diapositivas.html. Ejecuta: node build/build_slides.mjs');
  process.exit(1);
}

const html = fs.readFileSync(ARCHIVO, 'utf8');
const consola = new VirtualConsole();
consola.on('jsdomError', () => {});
consola.on('error', () => {});

const dom = new JSDOM(html, { runScripts: 'dangerously', url: 'http://localhost/', pretendToBeVisual: true, virtualConsole: consola });
const { window } = dom;
const doc = window.document;
await new Promise((r) => setTimeout(r, 200));

console.log('\n1. Estructura');
const diapos = () => Array.from(doc.querySelectorAll('.diapo'));
comprobar('Hay 59 diapositivas', diapos().length === 59, `hay ${diapos().length}`);
comprobar('Solo una está visible al empezar', diapos().filter((d) => d.classList.contains('visible')).length === 1);
comprobar('La primera es la portada', diapos()[0].classList.contains('portada'));
comprobar('La portada es de tipo lead', diapos()[0].classList.contains('lead'));
comprobar('Hay diapositivas de sección (lead)', diapos().filter((d) => d.classList.contains('lead')).length >= 8,
  `hay ${diapos().filter((d) => d.classList.contains('lead')).length}`);

console.log('\n2. Notas del presentador');
const conNotas = diapos().filter((d) => (d.getAttribute('data-notas') || '').length > 20);
comprobar('Todas las diapositivas llevan notas', conNotas.length === 59, `llevan ${conNotas.length}`);
comprobar('Las notas citan el tiempo asignado', diapos().some((d) => /min/i.test(d.getAttribute('data-notas') || '')));

console.log('\n3. Contenido');
const texto = doc.body.textContent;
comprobar('Aparece el título del seminario', texto.includes('Del chat al agente'));
comprobar('Aparecen las analogías canónicas', texto.includes('becario') && texto.includes('motor'));
comprobar('Se explica «Permitir una vez»', texto.includes('Permitir una vez'));
comprobar('Aparecen los datos de arranque verificados', texto.includes('npx @deepseek-ai/dsh web'));
comprobar('Aparece la dirección de la interfaz', texto.includes('127.0.0.1:3080'));
comprobar('Aparecen las prácticas 2 y 3', texto.includes('Provocar una aprobación') && texto.includes('Cambiar de política'));
comprobar('No hay tablas vacías', doc.querySelectorAll('.diapo table').length >= 4,
  `hay ${doc.querySelectorAll('.diapo table').length} tablas`);

console.log('\n4. Navegación');
const visibles = () => diapos().findIndex((d) => d.classList.contains('visible'));
comprobar('Empieza en la diapositiva 1', visibles() === 0);
const irA = (n) => window.document.dispatchEvent(new window.KeyboardEvent('keydown', { key: n, bubbles: true }));
irA('ArrowRight');
comprobar('La flecha derecha avanza', visibles() === 1, `está en ${visibles() + 1}`);
irA('ArrowLeft');
comprobar('La flecha izquierda retrocede', visibles() === 0);
irA('End');
comprobar('Fin va a la última', visibles() === 58, `está en ${visibles() + 1}`);
comprobar('El contador refleja la posición', doc.getElementById('contador').textContent.trim() === '59 / 59',
  doc.getElementById('contador').textContent);
irA('Home');
comprobar('Inicio vuelve a la primera', visibles() === 0);
irA('ArrowLeft');
comprobar('No se pasa de la primera', visibles() === 0);

console.log('\n5. Notas en pantalla y progreso');
irA('n');
comprobar('La tecla N muestra el panel de notas', doc.getElementById('notas').classList.contains('visible'));
comprobar('El panel tiene texto', doc.getElementById('notas-texto').textContent.trim().length > 20);
irA('n');
comprobar('La tecla N lo vuelve a ocultar', !doc.getElementById('notas').classList.contains('visible'));
irA('End');
comprobar('La barra de progreso avanza', doc.getElementById('relleno').style.width === '100%',
  doc.getElementById('relleno').style.width);

console.log(`\n${pruebas - fallos} de ${pruebas} comprobaciones correctas.`);
if (fallos) { console.log(`${fallos} FALLOS.`); process.exitCode = 1; }
else console.log('La baraja funciona: navegación, notas y progreso.');
