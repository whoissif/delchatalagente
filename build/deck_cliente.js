/* Motor de la baraja de diapositivas.
   Navegación con teclado, notas del presentador y ajuste automático a la pantalla.
   Se inserta en línea en el HTML final: funciona sin conexión. */
(function () {
  'use strict';

  var DIAPOS = Array.prototype.slice.call(document.querySelectorAll('.diapo'));
  var TOTAL = DIAPOS.length;
  var actual = 0;
  var notasVisibles = false;

  var escenario = document.getElementById('escenario');
  var contador = document.getElementById('contador');
  var relleno = document.getElementById('relleno');
  var panelNotas = document.getElementById('notas');
  var textoNotas = document.getElementById('notas-texto');

  function ajustar() {
    var ancho = window.innerWidth;
    var alto = window.innerHeight - (notasVisibles ? 190 : 0);
    var escala = Math.min(ancho / 1280, alto / 720);
    escenario.style.setProperty('--esc', escala);
  }

  function pintar() {
    DIAPOS.forEach(function (d, i) {
      d.classList.toggle('visible', i === actual);
    });
    contador.textContent = (actual + 1) + ' / ' + TOTAL;
    relleno.style.width = ((actual + 1) / TOTAL) * 100 + '%';

    var n = DIAPOS[actual].getAttribute('data-notas') || '';
    textoNotas.innerHTML = n
      ? n
      : '<em>Esta diapositiva no lleva notas del presentador.</em>';

    if (location.hash !== '#' + (actual + 1)) {
      history.replaceState(null, '', '#' + (actual + 1));
    }
    ajustar();
  }

  function ir(i) {
    if (i < 0 || i >= TOTAL) return;
    actual = i;
    pintar();
  }

  function alternarNotas() {
    notasVisibles = !notasVisibles;
    panelNotas.classList.toggle('visible', notasVisibles);
    document.body.classList.toggle('con-notas', notasVisibles);
    ajustar();
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ' || e.key === 'Enter') {
      e.preventDefault(); ir(actual + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault(); ir(actual - 1);
    } else if (e.key === 'Home') { e.preventDefault(); ir(0); }
    else if (e.key === 'End') { e.preventDefault(); ir(TOTAL - 1); }
    else if (e.key === 'n' || e.key === 'N') { e.preventDefault(); alternarNotas(); }
    else if (e.key === 'f' || e.key === 'F') {
      e.preventDefault();
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen();
    }
    else if (e.key === 'p' || e.key === 'P') { e.preventDefault(); window.print(); }
  });

  document.getElementById('btn-ant').addEventListener('click', function () { ir(actual - 1); });
  document.getElementById('btn-sig').addEventListener('click', function () { ir(actual + 1); });
  document.getElementById('btn-notas').addEventListener('click', alternarNotas);
  document.getElementById('btn-pantalla').addEventListener('click', function () {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen();
  });
  document.getElementById('btn-print').addEventListener('click', function () { window.print(); });

  window.addEventListener('resize', ajustar);
  window.addEventListener('hashchange', function () {
    var n = parseInt(location.hash.replace('#', ''), 10);
    if (n >= 1 && n <= TOTAL && n - 1 !== actual) ir(n - 1);
  });

  var inicial = parseInt(location.hash.replace('#', ''), 10);
  if (inicial >= 1 && inicial <= TOTAL) actual = inicial - 1;
  pintar();
})();
