/* Motor del curso: navegación, progreso, búsqueda, tema y cuestionarios.
   Se inserta en línea en el HTML final. No usa red ni dependencias externas. */
(function () {
  'use strict';

  var DATOS = window.__CURSO__;
  var CLAVE = 'seminario-harness-v1';

  var estado = {
    hechas: {},          // id de leccion -> true
    tema: 'claro',
    respuestas: {},      // id de pregunta -> indice elegido
    notaFinal: null
  };

  // ---------- Utilidades ----------
  function guardar() {
    try { localStorage.setItem(CLAVE, JSON.stringify(estado)); } catch (e) { /* modo privado */ }
  }
  function cargar() {
    try {
      var bruto = localStorage.getItem(CLAVE);
      if (bruto) {
        var o = JSON.parse(bruto);
        if (o && typeof o === 'object') {
          estado.hechas = o.hechas || {};
          estado.tema = o.tema === 'oscuro' ? 'oscuro' : 'claro';
          estado.respuestas = o.respuestas || {};
          estado.notaFinal = typeof o.notaFinal === 'number' ? o.notaFinal : null;
        }
      }
    } catch (e) { /* sin persistencia */ }
  }
  function sinTildes(s) {
    return (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
  function el(tag, clase, texto) {
    var n = document.createElement(tag);
    if (clase) n.className = clase;
    if (texto !== undefined && texto !== null) n.textContent = texto;
    return n;
  }

  var lecciones = DATOS.lecciones;
  var indice = {};
  lecciones.forEach(function (l, i) { l._i = i; indice[l.id] = l; });

  var actual = null;

  // ---------- Navegación lateral ----------
  function pintarNav(filtro) {
    var nav = document.getElementById('nav');
    nav.textContent = '';
    var q = sinTildes(filtro || '');
    var visibles = 0;

    DATOS.grupos.forEach(function (g) {
      var dentro = lecciones.filter(function (l) {
        if (l.grupo !== g.id) return false;
        if (!q) return true;
        return sinTildes(l.titulo).indexOf(q) >= 0 || sinTildes(l.texto).indexOf(q) >= 0;
      });
      if (!dentro.length) return;
      visibles += dentro.length;

      var caja = el('div', 'grupo');
      caja.appendChild(el('div', 'grupo-titulo', g.titulo));
      dentro.forEach(function (l) {
        var b = el('button');
        b.type = 'button';
        b.setAttribute('data-id', l.id);
        if (actual && actual.id === l.id) b.setAttribute('aria-current', 'true');
        if (estado.hechas[l.id]) b.className = 'hecho';

        var num = el('span', 'num');
        num.textContent = l.tipo === 'quiz' ? '?' : (l._i + 1);
        b.appendChild(num);
        b.appendChild(el('span', 'texto', l.titulo));
        b.appendChild(el('span', 'marca-ok', '\u2713'));
        b.addEventListener('click', function () {
          ir(l.id);
          cerrarMenu();
        });
        caja.appendChild(b);
      });
      nav.appendChild(caja);
    });

    if (!visibles) {
      var v = el('div', 'vacio');
      v.appendChild(el('b', null, 'Sin resultados'));
      v.appendChild(el('span', null, 'Prueba con otra palabra.'));
      nav.appendChild(v);
    }
  }

  // ---------- Medidor de progreso ----------
  function actualizarMedidor() {
    var total = lecciones.length;
    var hechas = lecciones.filter(function (l) { return estado.hechas[l.id]; }).length;
    var pct = total ? Math.round((hechas / total) * 100) : 0;
    document.getElementById('relleno').style.width = pct + '%';
    document.getElementById('pct').textContent = pct + '%';
    document.getElementById('cuenta').textContent = hechas + ' de ' + total + ' completadas';
  }

  // ---------- Cuestionarios ----------
  function pintarCuestionario(contenedor, l) {
    var esFinal = l.quiz === 'final';
    var preguntas = esFinal ? DATOS.final : DATOS.diagnostico;

    var caja = el('div', 'cuestionario');
    var cab = el('div', 'cabecera');
    cab.appendChild(el('h1', null, l.titulo));
    var intro = el('p');
    intro.innerHTML = esFinal
      ? 'Marca <b>una sola</b> opción en cada pregunta. Verás la explicación al responder. No es un examen: sirve para comprobar qué se ha quedado.'
      : 'Responde con lo que creas <b>ahora</b>. No se puntúa: sirve para saber de dónde partes y ajustar el ritmo.';
    cab.appendChild(intro);
    caja.appendChild(cab);

    var contador = el('p');
    contador.style.fontSize = '.85rem';
    contador.style.color = 'var(--texto-tenue)';
    caja.appendChild(contador);

    preguntas.forEach(function (p, i) {
      var bloque = el('div', 'pregunta');
      bloque.setAttribute('data-pid', p.id);

      var enun = el('div', 'enunciado');
      var num = el('span', 'num', p.id);
      enun.appendChild(num);
      enun.appendChild(el('span', null, p.pregunta));
      bloque.appendChild(enun);

      var yaElegida = estado.respuestas[p.id];

      p.opciones.forEach(function (texto, j) {
        var b = el('button', 'opcion');
        b.type = 'button';
        b.appendChild(el('span', 'letra', 'ABCD'[j]));
        b.appendChild(el('span', null, texto));
        if (yaElegida !== undefined) {
          b.disabled = true;
          if (j === yaElegida) b.className += (j === p.correcta ? ' acierto' : ' fallo');
          if (j === p.correcta && j !== yaElegida) b.className += ' acierto';
        }
        b.addEventListener('click', function () {
          if (estado.respuestas[p.id] !== undefined) return;
          estado.respuestas[p.id] = j;
          guardar();
          pintarLeccion(actual);
          if (esFinal) comprobarNota();
        });
        bloque.appendChild(b);
      });

      if (yaElegida !== undefined) {
        var ex = el('div', 'explica ' + (yaElegida === p.correcta ? 'bien' : 'mal'));
        ex.innerHTML = (yaElegida === p.correcta ? '<b>Correcto.</b> ' : '<b>No exactamente.</b> ') + p.porque;
        bloque.appendChild(ex);
      }

      caja.appendChild(bloque);
    });

    if (esFinal) {
      var res = el('div', 'resultado');
      res.id = 'resultado';
      caja.appendChild(res);
      var acc = el('div', 'acciones');
      var btnReiniciar = el('button', 'boton secundario', 'Volver a empezar');
      btnReiniciar.type = 'button';
      btnReiniciar.addEventListener('click', function () {
        preguntas.forEach(function (p) { delete estado.respuestas[p.id]; });
        estado.notaFinal = null;
        guardar();
        pintarLeccion(actual);
      });
      acc.appendChild(btnReiniciar);
      caja.appendChild(acc);
    }

    contenedor.appendChild(caja);
    if (esFinal) comprobarNota();
    else actualizarContador(contenedor, preguntas);
  }

  function actualizarContador(raiz, preguntas) {
    var hechas = preguntas.filter(function (p) { return estado.respuestas[p.id] !== undefined; }).length;
    var c = raiz.querySelector('.cuestionario > p');
    if (c) c.textContent = hechas + ' de ' + preguntas.length + ' respondidas';
  }

  function comprobarNota() {
    var cont = document.getElementById('resultado');
    if (!cont) return;
    var respondidas = DATOS.final.filter(function (p) { return estado.respuestas[p.id] !== undefined; });
    var acertadas = DATOS.final.filter(function (p) { return estado.respuestas[p.id] === p.correcta; }).length;

    if (respondidas.length < DATOS.final.length) {
      cont.innerHTML = '<div class="texto">Llevas <b>' + respondidas.length + ' de ' + DATOS.final.length +
        '</b> respondidas. Al terminar verás tu resultado y qué conviene repasar.</div>';
      estado.notaFinal = null;
      return;
    }

    var banda = DATOS.bandas[0];
    for (var i = 0; i < DATOS.bandas.length; i++) {
      if (acertadas >= DATOS.bandas[i].min) { banda = DATOS.bandas[i]; break; }
    }
    cont.innerHTML =
      '<div class="nota">' + acertadas + ' / ' + DATOS.final.length + '</div>' +
      '<div class="titulo">' + banda.titulo + '</div>' +
      '<div class="texto">' + banda.texto + '</div>' +
      '<div class="texto" style="margin-top:12px">Doce preguntas no miden dominio: solo orientan. ' +
      'Lo que de verdad importa es que sepas qué aprobar y qué revisar.</div>';

    if (estado.notaFinal !== acertadas) {
      estado.notaFinal = acertadas;
      guardar();
    }
  }

  // ---------- Lección ----------
  function pintarLeccion(l) {
    actual = l;
    var hoja = document.getElementById('hoja');
    hoja.textContent = '';

    // Migas de pan
    var g = DATOS.grupos.filter(function (x) { return x.id === l.grupo; })[0];
    document.getElementById('migas').innerHTML =
      '<b>' + (g ? g.titulo : '') + '</b> \u203A ' + l.titulo;
    document.title = l.titulo + ' \u2014 ' + DATOS.titulo;

    if (l.tipo === 'quiz') {
      pintarCuestionario(hoja, l);
    } else {
      var art = el('article', 'contenido');
      art.innerHTML = l.html;
      hoja.appendChild(art);

      var marca = el('div', 'marcar' + (estado.hechas[l.id] ? ' hecho' : ''));
      var lab = el('label');
      var chk = document.createElement('input');
      chk.type = 'checkbox';
      chk.checked = !!estado.hechas[l.id];
      chk.addEventListener('change', function () {
        estado.hechas[l.id] = chk.checked;
        guardar();
        marca.className = 'marcar' + (chk.checked ? ' hecho' : '');
        pintarNav(document.getElementById('buscar').value);
        actualizarMedidor();
      });
      lab.appendChild(chk);
      lab.appendChild(el('span', null, 'He leído y entendido esta sección'));
      marca.appendChild(lab);

      var btn = el('button', 'boton secundario', 'Marcar y seguir');
      btn.type = 'button';
      btn.style.fontSize = '.82rem';
      btn.style.padding = '8px 14px';
      btn.addEventListener('click', function () {
        estado.hechas[l.id] = true;
        guardar();
        var sig = lecciones[l._i + 1];
        if (sig) ir(sig.id); else { pintarLeccion(actual); }
        actualizarMedidor();
      });
      marca.appendChild(btn);
      hoja.appendChild(marca);
    }

    // Navegación anterior / siguiente
    var nav = el('div', 'navegacion');
    var ant = lecciones[l._i - 1], sig = lecciones[l._i + 1];

    var bAnt = document.createElement('button');
    bAnt.innerHTML = '<span class="etq">Anterior</span><b>' + (ant ? ant.titulo : '\u2014') + '</b>';
    bAnt.disabled = !ant;
    bAnt.addEventListener('click', function () { if (ant) ir(ant.id); });

    var bSig = el('button', 'siguiente');
    bSig.innerHTML = '<span class="etq">Siguiente</span><b>' + (sig ? sig.titulo : '\u2014') + '</b>';
    bSig.disabled = !sig;
    bSig.addEventListener('click', function () { if (sig) ir(sig.id); });

    nav.appendChild(bAnt);
    nav.appendChild(bSig);
    hoja.appendChild(nav);

    pintarNav(document.getElementById('buscar').value);
    window.scrollTo(0, 0);
    document.getElementById('lienzo').scrollTop = 0;
  }

  function ir(id) {
    var l = indice[id];
    if (!l) l = lecciones[0];
    if (location.hash !== '#' + l.id) {
      history.replaceState(null, '', '#' + l.id);
    }
    pintarLeccion(l);
  }

  // ---------- Menú móvil ----------
  function cerrarMenu() {
    document.getElementById('lateral').classList.remove('abierto');
    document.getElementById('velo').classList.remove('visible');
  }

  // ---------- Tema ----------
  function aplicarTema() {
    document.documentElement.setAttribute('data-tema', estado.tema);
    document.getElementById('btn-tema').textContent = estado.tema === 'oscuro' ? '\u2600' : '\u263D';
    document.getElementById('btn-tema').title =
      estado.tema === 'oscuro' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
  }

  // ---------- Arranque ----------
  function init() {
    cargar();
    aplicarTema();
    actualizarMedidor();
    pintarNav('');

    document.getElementById('btn-tema').addEventListener('click', function () {
      estado.tema = estado.tema === 'oscuro' ? 'claro' : 'oscuro';
      guardar();
      aplicarTema();
    });

    var buscador = document.getElementById('buscar');
    buscador.addEventListener('input', function () { pintarNav(buscador.value); });

    document.getElementById('btn-menu').addEventListener('click', function () {
      document.getElementById('lateral').classList.add('abierto');
      document.getElementById('velo').classList.add('visible');
    });
    document.getElementById('velo').addEventListener('click', cerrarMenu);

    document.getElementById('btn-print').addEventListener('click', function () { window.print(); });

    document.addEventListener('keydown', function (e) {
      var enCampo = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
      if (e.key === '/' && !enCampo) { e.preventDefault(); buscador.focus(); return; }
      if (e.key === 'Escape' && document.activeElement === buscador) { buscador.blur(); return; }
      if (enCampo) return;
      if (e.key === 'ArrowRight' && actual && lecciones[actual._i + 1]) ir(lecciones[actual._i + 1].id);
      if (e.key === 'ArrowLeft' && actual && lecciones[actual._i - 1]) ir(lecciones[actual._i - 1].id);
    });

    window.addEventListener('hashchange', function () {
      var id = location.hash.replace('#', '');
      if (id && indice[id] && (!actual || actual.id !== id)) pintarLeccion(indice[id]);
    });

    var inicial = location.hash.replace('#', '');
    ir(indice[inicial] ? inicial : lecciones[0].id);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
