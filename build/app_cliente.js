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
    notaFinal: null,
    fin: null            // fecha (AAAA-MM-DD) en que se completó todo el curso
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
          estado.fin = typeof o.fin === 'string' ? o.fin : null;
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
        if (estado.hechas[l.id]) {
          var ok = el('span', 'marca-ok', '\u2713');
          ok.setAttribute('aria-label', 'completada');
          b.appendChild(ok);
        }
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
    if (total && hechas === total && !estado.fin) {
      estado.fin = new Date().toISOString().slice(0, 10);
      guardar();
    }
  }

  // Una lección se da por leída al pasar a la siguiente; los cuestionarios, al responderlos todos.
  function marcarLeida(l) {
    if (!l || l.tipo === 'quiz' || estado.hechas[l.id]) return;
    estado.hechas[l.id] = true;
    guardar();
    actualizarMedidor();
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
          if (preguntas.every(function (q) { return estado.respuestas[q.id] !== undefined; })) {
            estado.hechas[l.id] = true;
          }
          guardar();
          actualizarMedidor();
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
        delete estado.hechas[l.id];
        estado.notaFinal = null;
        estado.fin = null;
        guardar();
        actualizarMedidor();
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
      '<div class="texto" style="margin-top:12px">Unas pocas preguntas no miden dominio: solo orientan. ' +
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
      prepararEncargos(art);
      if (l.id !== 'doc-05' && l.id !== 'portada') enlazarGlosario(art);
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
      marca.appendChild(el('span', 'marcar-nota', 'Se marca sola al pulsar «Siguiente».'));
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
    bSig.innerHTML = sig
      ? '<span class="etq">Siguiente</span><b>' + sig.titulo + '</b>'
      : '<span class="etq">Has llegado al final</span><b>Terminar el curso</b>';
    bSig.addEventListener('click', function () {
      marcarLeida(l);
      if (sig) ir(sig.id); else ir('resumen');
    });

    nav.appendChild(bAnt);
    nav.appendChild(bSig);
    hoja.appendChild(nav);

    pintarNav(document.getElementById('buscar').value);
    window.scrollTo(0, 0);
    document.getElementById('lienzo').scrollTop = 0;
  }

  // Cada lección es una entrada del historial, para que «Atrás» del navegador vuelva a la anterior.
  // El cambio de dirección al retroceder lo recoge el evento hashchange (ver init).
  function ir(id, sustituir) {
    var destino = id === 'resumen' ? 'resumen' : (indice[id] || lecciones[0]).id;
    if (location.hash !== '#' + destino) {
      if (sustituir) history.replaceState(null, '', '#' + destino);
      else history.pushState(null, '', '#' + destino);
    }
    if (destino === 'resumen') pintarResumen(); else pintarLeccion(indice[destino]);
  }

  // ---------- Encargos con botón «Copiar» ----------
  function textoDe(nodo) {
    var partes = [];
    Array.prototype.forEach.call(nodo.children, function (h) {
      if (h.tagName === 'OL' || h.tagName === 'UL') {
        Array.prototype.forEach.call(h.children, function (li, i) {
          partes.push((h.tagName === 'OL' ? (i + 1) + '. ' : '- ') + li.textContent.trim());
        });
      } else if (!h.classList.contains('copiar')) {
        partes.push(h.textContent.trim());
      }
    });
    return partes.join('\n').replace(/^\s*«/, '').replace(/»\s*$/, '').trim();
  }
  function copiar(texto, alTerminar) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texto).then(alTerminar, function () { copiarViejo(texto); alTerminar(); });
    } else { copiarViejo(texto); alTerminar(); }
  }
  function copiarViejo(texto) {
    var t = el('textarea');
    t.value = texto;
    t.setAttribute('readonly', '');
    t.style.position = 'fixed';
    t.style.opacity = '0';
    document.body.appendChild(t);
    t.select();
    try { document.execCommand('copy'); } catch (e) { /* sin portapapeles */ }
    document.body.removeChild(t);
  }
  function prepararEncargos(art) {
    Array.prototype.forEach.call(art.querySelectorAll('blockquote.encargo'), function (bq) {
      var b = el('button', 'copiar', 'Copiar encargo');
      b.type = 'button';
      b.setAttribute('aria-label', 'Copiar el encargo al portapapeles');
      b.addEventListener('click', function () {
        copiar(textoDe(bq), function () {
          b.textContent = '✓ Copiado';
          setTimeout(function () { b.textContent = 'Copiar encargo'; }, 2000);
        });
      });
      bq.appendChild(b);
    });
  }

  // ---------- Glosario desde las lecciones ----------
  var patronesGlosario = (DATOS.glosario || []).map(function (g) {
    var alt = g.formas.map(function (f) { return f.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }).join('|');
    return { g: g, re: new RegExp('(^|[^\\p{L}\\p{N}_])(' + alt + ')(?![\\p{L}\\p{N}_])', 'iu') };
  });
  function enlazarGlosario(art) {
    // Solo la primera aparición de cada término en la lección, fuera de código, enlaces y títulos.
    patronesGlosario.forEach(function (p) {
      var paseo = document.createTreeWalker(art, NodeFilter.SHOW_TEXT, null);
      var nodo;
      while ((nodo = paseo.nextNode())) {
        if (nodo.parentNode.closest('a, code, pre, h1, h2, h3, h4, button, .figura, .leccion-meta')) continue;
        var m = p.re.exec(nodo.nodeValue);
        if (!m) continue;
        var inicio = m.index + m[1].length;
        var resto = nodo.splitText(inicio);
        resto.splitText(m[2].length);
        var b = el('button', 'termino', resto.nodeValue);
        b.type = 'button';
        b.title = 'Ver la definición';
        b.addEventListener('click', function () { mostrarDefinicion(p.g); });
        resto.parentNode.replaceChild(b, resto);
        break;
      }
    });
  }
  function mostrarDefinicion(g) {
    var panel = document.getElementById('definicion');
    if (!panel) {
      panel = el('aside', 'definicion');
      panel.id = 'definicion';
      panel.setAttribute('role', 'dialog');
      panel.setAttribute('aria-label', 'Definición del glosario');
      document.body.appendChild(panel);
    }
    panel.textContent = '';
    var cerrar = el('button', 'cerrar', '×');
    cerrar.type = 'button';
    cerrar.setAttribute('aria-label', 'Cerrar la definición');
    cerrar.addEventListener('click', cerrarDefinicion);
    panel.appendChild(cerrar);
    panel.appendChild(el('b', null, g.t));
    panel.appendChild(el('p', null, g.d));
    var ver = el('button', 'enlace', 'Ver el glosario completo');
    ver.type = 'button';
    ver.addEventListener('click', function () { cerrarDefinicion(); ir('doc-05'); });
    panel.appendChild(ver);
    panel.classList.add('visible');
    cerrar.focus();
  }
  function cerrarDefinicion() {
    var panel = document.getElementById('definicion');
    if (panel) panel.classList.remove('visible');
  }

  // ---------- Resumen y cierre del curso ----------
  function pintarResumen() {
    actual = null;
    cerrarDefinicion();
    var hoja = document.getElementById('hoja');
    hoja.textContent = '';
    document.getElementById('migas').innerHTML = '<b>Mi resumen</b>';
    document.title = 'Mi resumen — ' + DATOS.titulo;

    var hechas = lecciones.filter(function (l) { return estado.hechas[l.id]; }).length;
    var completo = hechas === lecciones.length;
    var caja = el('div', 'cierre');
    caja.appendChild(el('h1', null, completo ? 'Has terminado el curso' : 'Tu progreso en el curso'));
    caja.appendChild(el('p', 'sub', DATOS.titulo + ' · ' + DATOS.subtitulo));

    var datos = el('div', 'cifras');
    function cifra(valor, texto) {
      var c = el('div', 'cifra');
      c.appendChild(el('b', null, valor));
      c.appendChild(el('span', null, texto));
      datos.appendChild(c);
    }
    cifra(hechas + ' / ' + lecciones.length, 'secciones completadas');
    if (estado.notaFinal !== null) {
      var banda = DATOS.bandas[DATOS.bandas.length - 1];
      for (var i = 0; i < DATOS.bandas.length; i++) {
        if (estado.notaFinal >= DATOS.bandas[i].min) { banda = DATOS.bandas[i]; break; }
      }
      cifra(estado.notaFinal + ' / ' + DATOS.final.length, 'evaluación final · ' + banda.titulo);
    } else {
      cifra('—', 'evaluación final sin terminar');
    }
    cifra(estado.fin ? estado.fin.split('-').reverse().join('/') : '—', completo ? 'fecha de finalización' : 'aún sin terminar');
    caja.appendChild(datos);

    if (!completo) {
      caja.appendChild(el('p', null, 'Te quedan estas secciones; pulsa una para ir a ella:'));
    }
    DATOS.grupos.forEach(function (g) {
      var dentro = lecciones.filter(function (l) { return l.grupo === g.id; });
      var bloque = el('div', 'cierre-grupo');
      bloque.appendChild(el('h2', null, g.titulo));
      var lista = el('ul');
      dentro.forEach(function (l) {
        var li = el('li', estado.hechas[l.id] ? 'hecha' : 'pendiente');
        li.appendChild(el('span', 'senal', estado.hechas[l.id] ? '✓' : '○'));
        if (estado.hechas[l.id]) {
          li.appendChild(el('span', null, l.titulo));
        } else {
          var b = el('button', 'enlace', l.titulo);
          b.type = 'button';
          b.addEventListener('click', function () { ir(l.id); });
          li.appendChild(b);
        }
        lista.appendChild(li);
      });
      bloque.appendChild(lista);
      caja.appendChild(bloque);
    });

    var acc = el('div', 'acciones');
    var imp = el('button', 'boton', 'Imprimir o guardar en PDF');
    imp.type = 'button';
    imp.addEventListener('click', function () { window.print(); });
    acc.appendChild(imp);
    var volver = el('button', 'boton secundario', 'Volver al curso');
    volver.type = 'button';
    volver.addEventListener('click', function () { ir(lecciones[0].id); });
    acc.appendChild(volver);
    caja.appendChild(acc);
    hoja.appendChild(caja);

    pintarNav(document.getElementById('buscar').value);
    window.scrollTo(0, 0);
    document.getElementById('lienzo').scrollTop = 0;
  }

  // ---------- Exportar y reiniciar el progreso ----------
  function exportarProgreso() {
    var datos = JSON.stringify({ curso: DATOS.titulo, exportado: new Date().toISOString(), progreso: estado }, null, 2);
    var a = el('a');
    a.href = URL.createObjectURL(new Blob([datos], { type: 'application/json' }));
    a.download = 'progreso-del-chat-al-agente.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  function reiniciarProgreso() {
    if (!window.confirm('¿Borrar todo tu progreso? Se desmarcan todas las secciones y se borran las respuestas de los cuestionarios. No se puede deshacer.')) return;
    estado.hechas = {};
    estado.respuestas = {};
    estado.notaFinal = null;
    estado.fin = null;
    guardar();
    actualizarMedidor();
    ir(lecciones[0].id);
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
    document.getElementById('btn-resumen').addEventListener('click', function () { ir('resumen'); cerrarMenu(); });
    document.getElementById('btn-exportar').addEventListener('click', exportarProgreso);
    document.getElementById('btn-reiniciar').addEventListener('click', reiniciarProgreso);

    document.addEventListener('keydown', function (e) {
      var enCampo = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
      if (e.key === '/' && !enCampo) { e.preventDefault(); buscador.focus(); return; }
      if (e.key === 'Escape' && document.activeElement === buscador) { buscador.blur(); return; }
      if (e.key === 'Escape') { cerrarDefinicion(); return; }
      if (enCampo) return;
      if (e.key === 'ArrowRight' && actual && lecciones[actual._i + 1]) { marcarLeida(actual); ir(lecciones[actual._i + 1].id); }
      if (e.key === 'ArrowLeft' && actual && lecciones[actual._i - 1]) ir(lecciones[actual._i - 1].id);
    });

    window.addEventListener('hashchange', function () {
      var id = location.hash.replace('#', '') || lecciones[0].id;
      if (id === 'resumen') { if (actual) pintarResumen(); return; }
      if (indice[id] && (!actual || actual.id !== id)) pintarLeccion(indice[id]);
    });

    var inicial = location.hash.replace('#', '');
    ir(indice[inicial] || inicial === 'resumen' ? inicial : lecciones[0].id, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
