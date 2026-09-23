// Ilustraciones SVG propias y lista de recursos externos verificados.
// Son cadenas SVG en línea: no pesan, se ven nítidas en cualquier pantalla
// y no necesitan conexión. Los enlaces de RECURSOS apuntan a fuentes oficiales.

const FUENTE = "ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif";

// ------------------------------------------------------------------ iconos

const trazo = (interior) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${interior}</svg>`;

export const ICONOS = {
  inicio: trazo('<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>'),
  concepto: trazo('<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 1 3.6 10.8c-.8.7-1.1 1.2-1.1 2.2h-5c0-1-.3-1.5-1.1-2.2A6 6 0 0 1 12 3z"/>'),
  practicas: trazo('<path d="M8 5.5v13l11-6.5z"/>'),
  avanzado: trazo('<path d="M12 3 3 8l9 5 9-5z"/><path d="M3 12l9 5 9-5"/><path d="M3 16l9 5 9-5"/>'),
  evaluacion: trazo('<circle cx="12" cy="12" r="9"/><path d="M8.5 12.3l2.4 2.4 4.8-5"/>'),
  consulta: trazo('<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5V5.5"/><path d="M8.5 8h7M8.5 12h7"/>'),
  instructor: trazo('<circle cx="9" cy="8" r="3.2"/><path d="M3.5 19c.6-3 2.7-4.6 5.5-4.6s4.9 1.6 5.5 4.6"/><path d="M16 4.5a3.2 3.2 0 0 1 0 6.2"/><path d="M17.5 14.7c1.9.7 3.1 2.1 3.5 4.3"/>'),
  recursos: trazo('<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a13.5 13.5 0 0 1 0 18 13.5 13.5 0 0 1 0-18z"/>'),
  escudo: trazo('<path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z"/><path d="M9.2 12l2 2 3.8-4"/>'),
  flecha: trazo('<path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>'),
  documento: trazo('<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/>'),
  reloj: trazo('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
};

// ------------------------------------------------------------------ ilustraciones

function panel(svg, ancho, alto, etiqueta) {
  const etq = etiqueta ? `<figcaption>${etiqueta}</figcaption>` : '';
  return `<figure class="figura" style="--ar:${ancho}/${alto}">${svg}${etq}</figure>`;
}

/** Portada: el harness como puente entre el modelo y las herramientas, con freno. */
export function hero() {
  const svg = `<svg viewBox="0 0 640 290" role="img" aria-label="El harness conecta el modelo con las herramientas y añade permisos">
<rect width="640" height="290" rx="20" fill="#f4f6fd"/>
<defs>
<marker id="fA" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#9aa3bd"/></marker>
</defs>
<!-- modelo -->
<rect x="52" y="96" width="148" height="98" rx="18" fill="#0f8a7e"/>
<circle cx="126" cy="130" r="24" fill="#ffffff22"/>
<path d="M118 124l8 6 12-13" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<text x="126" y="172" text-anchor="middle" fill="#ffffff" font-family="${FUENTE}" font-size="17" font-weight="700">Modelo</text>
<text x="126" y="188" text-anchor="middle" fill="#ffffff" opacity=".75" font-family="${FUENTE}" font-size="12">el motor</text>
<!-- hub -->
<rect x="262" y="104" width="130" height="82" rx="18" fill="#2f4bd8"/>
<text x="327" y="140" text-anchor="middle" fill="#ffffff" font-family="${FUENTE}" font-size="17" font-weight="700">HARNESS</text>
<text x="327" y="162" text-anchor="middle" fill="#ffffff" opacity=".78" font-family="${FUENTE}" font-size="12">el coche completo</text>
<!-- herramientas -->
<g font-family="${FUENTE}" font-size="12.5" text-anchor="middle">
<rect x="452" y="40" width="118" height="40" rx="11" fill="#ffffff" stroke="#dbe1f0"/>
<text x="511" y="65" fill="#33406b" font-weight="600">Archivos</text>
<rect x="452" y="96" width="118" height="40" rx="11" fill="#ffffff" stroke="#dbe1f0"/>
<text x="511" y="121" fill="#33406b" font-weight="600">Terminal</text>
<rect x="452" y="152" width="118" height="40" rx="11" fill="#ffffff" stroke="#dbe1f0"/>
<text x="511" y="177" fill="#33406b" font-weight="600">Web</text>
<rect x="452" y="208" width="118" height="40" rx="11" fill="#ffffff" stroke="#dbe1f0"/>
<text x="511" y="233" fill="#33406b" font-weight="600">Chat</text>
</g>
<!-- escudo / permisos -->
<g transform="translate(96 214)">
<path d="M46 4 18 14v14c0 14 12 20 28 24 16-4 28-10 28-24V14z" fill="#0f8a7e"/>
<path d="M32 30l10 10 18-20" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<text x="156" y="214" fill="#0f8a7e" font-family="${FUENTE}" font-size="13" font-weight="700">Permisos</text>
<!-- flechas -->
<line x1="200" y1="145" x2="262" y2="145" stroke="#9aa3bd" stroke-width="2.4" marker-end="url(#fA)"/>
<line x1="392" y1="122" x2="452" y2="80" stroke="#9aa3bd" stroke-width="2" marker-end="url(#fA)"/>
<line x1="392" y1="137" x2="452" y2="121" stroke="#9aa3bd" stroke-width="2" marker-end="url(#fA)"/>
<line x1="392" y1="152" x2="452" y2="174" stroke="#9aa3bd" stroke-width="2" marker-end="url(#fA)"/>
<line x1="392" y1="167" x2="452" y2="227" stroke="#9aa3bd" stroke-width="2" marker-end="url(#fA)"/>
</svg>`;
  return panel(svg, 640, 290, 'El modelo piensa; el harness ejecuta, conecta herramientas y pone los frenos.');
}

/** El bucle agéntico: piensa, actúa, observa. */
export function bucleAgentico() {
  const svg = `<svg viewBox="0 0 560 250" role="img" aria-label="Bucle del agente: piensa, actúa, observa y repite">
<rect width="560" height="250" rx="20" fill="#f4f6fd"/>
<defs>
<marker id="fB" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#8a93ac"/></marker>
</defs>
<g font-family="${FUENTE}" text-anchor="middle">
<rect x="200" y="26" width="160" height="62" rx="14" fill="#2f4bd8"/>
<text x="280" y="52" fill="#fff" font-size="16" font-weight="700">PIENSA</text>
<text x="280" y="72" fill="#fff" opacity=".75" font-size="11.5">el modelo decide</text>
<rect x="36" y="168" width="160" height="62" rx="14" fill="#0f8a7e"/>
<text x="116" y="194" fill="#fff" font-size="16" font-weight="700">ACTÚA</text>
<text x="116" y="214" fill="#fff" opacity=".75" font-size="11.5">el harness ejecuta</text>
<rect x="364" y="168" width="160" height="62" rx="14" fill="#0f8a7e"/>
<text x="444" y="194" fill="#fff" font-size="16" font-weight="700">OBSERVA</text>
<text x="444" y="214" fill="#fff" opacity=".75" font-size="11.5">lee el resultado</text>
</g>
<path d="M280 88 C 280 130, 140 130, 116 168" fill="none" stroke="#8a93ac" stroke-width="2.4" marker-end="url(#fB)"/>
<path d="M276 88 C 420 110, 440 130, 444 168" fill="none" stroke="#8a93ac" stroke-width="2.4" marker-end="url(#fB)"/>
<path d="M196 199 C 80 220, 120 88, 224 62" fill="none" stroke="#8a93ac" stroke-width="2.4" marker-end="url(#fB)"/>
</svg>`;
  return panel(svg, 560, 250, 'El bucle se repite hasta terminar: el modelo nunca ejecuta nada por sí mismo.');
}

/** Motor y coche: qué aporta el harness. */
export function motorCoche() {
  const svg = `<svg viewBox="0 0 640 230" role="img" aria-label="El modelo es el motor; el harness es el coche completo">
<rect width="640" height="230" rx="20" fill="#f4f6fd"/>
<g font-family="${FUENTE}">
<!-- motor -->
<rect x="40" y="72" width="120" height="86" rx="14" fill="#dfe4f4"/>
<rect x="62" y="52" width="76" height="26" rx="9" fill="#8a93ac"/>
<circle cx="80" cy="108" r="13" fill="#5b6579"/><circle cx="120" cy="108" r="13" fill="#5b6579"/>
<circle cx="80" cy="144" r="13" fill="#5b6579"/><circle cx="120" cy="144" r="13" fill="#5b6579"/>
<text x="100" y="184" text-anchor="middle" fill="#33406b" font-size="14" font-weight="700">El modelo</text>
<text x="100" y="200" text-anchor="middle" fill="#6a7388" font-size="12">es solo el motor</text>
<!-- flecha -->
<path d="M172 115 h44" stroke="#8a93ac" stroke-width="2.6" marker-end="url(#fB2)"/>
<defs><marker id="fB2" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#8a93ac"/></marker></defs>
<!-- coche -->
<g transform="translate(232 96)">
<path d="M28 60 C14 60 10 50 10 40 L10 26 C10 14 22 10 46 10 L150 10 C180 10 190 20 192 32 L196 52 C198 60 194 64 186 64 L184 64 C178 64 174 60 174 52 L174 44 L34 44 L34 52 C34 60 30 64 24 64 Z" fill="#2f4bd8"/>
<rect x="26" y="14" width="48" height="14" rx="7" fill="#ffffff" opacity=".35"/>
<rect x="80" y="14" width="64" height="14" rx="7" fill="#ffffff" opacity=".35"/>
<circle cx="56" cy="64" r="12" fill="#1b2233"/><circle cx="56" cy="64" r="5" fill="#ffffff"/>
<circle cx="146" cy="64" r="12" fill="#1b2233"/><circle cx="146" cy="64" r="5" fill="#ffffff"/>
<rect x="34" y="44" width="30" height="9" rx="4.5" fill="#0f8a7e"/>
<rect x="144" y="44" width="30" height="9" rx="4.5" fill="#e0a23a"/>
</g>
<text x="340" y="182" text-anchor="middle" fill="#33406b" font-size="14" font-weight="700">El harness</text>
<text x="340" y="199" text-anchor="middle" fill="#6a7388" font-size="12">es el coche completo: volante, frenos y salpicadero</text>
</g>
</svg>`;
  return panel(svg, 640, 230, 'Un chat también es un coche, pero muy sencillo: motor, un volante y nada más.');
}

/** La sala del becario: dentro, libertad; fuera, hay que pedir permiso. */
export function sala() {
  const svg = `<svg viewBox="0 0 560 250" role="img" aria-label="El sandbox es la sala donde trabaja el becario; salir pide permiso">
<rect width="560" height="250" rx="20" fill="#f4f6fd"/>
<g font-family="${FUENTE}">
<rect x="34" y="42" width="360" height="180" rx="16" fill="#e7f5f2" stroke="#0f8a7e" stroke-width="2"/>
<text x="214" y="70" text-anchor="middle" fill="#0f8a7e" font-size="15" font-weight="700">SALA DEL BECARIO</text>
<text x="214" y="88" text-anchor="middle" fill="#4a7d76" font-size="11.5">dentro: hace lo que quiera</text>
<!-- becario -->
<circle cx="150" cy="136" r="20" fill="#0f8a7e"/>
<rect x="126" y="156" width="48" height="34" rx="12" fill="#0f8a7e"/>
<!-- mesa -->
<rect x="120" y="172" width="110" height="8" rx="4" fill="#0f8a7e" opacity=".4"/>
<rect x="244" y="132" width="82" height="60" rx="10" fill="#ffffff" stroke="#bfe3dd"/>
<text x="285" y="156" text-anchor="middle" fill="#0f8a7e" font-size="11">archivos</text>
<text x="285" y="172" text-anchor="middle" fill="#0f8a7e" font-size="11">de trabajo</text>
<!-- puerta -->
<rect x="372" y="150" width="34" height="72" rx="6" fill="#ffffff" stroke="#0f8a7e" stroke-width="2"/>
<circle cx="398" cy="188" r="3" fill="#0f8a7e"/>
<!-- fuera: aprobación -->
<path d="M430 150 h70" stroke="#8a93ac" stroke-width="2.4" marker-end="url(#fC)"/>
<defs><marker id="fC" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#8a93ac"/></marker></defs>
<rect x="452" y="150" width="74" height="56" rx="12" fill="#fdf3e3" stroke="#e0a23a" stroke-width="2"/>
<text x="489" y="174" text-anchor="middle" fill="#a96d1a" font-size="17" font-weight="700">¿Seguro?</text>
<text x="489" y="192" text-anchor="middle" fill="#a96d1a" font-size="11">aprobación</text>
<text x="214" y="236" text-anchor="middle" fill="#6a7388" font-size="12">fuera de la sala: te pide permiso antes de tocar nada</text>
</g>
</svg>`;
  return panel(svg, 560, 250, 'El sandbox delimita la sala; la aprobación es el «¿seguro?» al salir.');
}

// ------------------------------------------------------------------ recursos

export const RECURSOS = [
  {
    titulo: 'Documentación oficial',
    url: 'https://deepseek-harness.github.io/deepseek-harness/',
    detalle: 'Guías de usuario y del desarrollador del proyecto.',
    etiqueta: 'Docs',
  },
  {
    titulo: 'Repositorio en GitHub',
    url: 'https://github.com/deepseek-ai/deepseek-harness',
    detalle: 'Código, novedades y el aviso de que está en developer preview.',
    etiqueta: 'GitHub',
  },
  {
    titulo: 'Aviso de seguridad',
    url: 'https://github.com/deepseek-ai/DeepSeek-Harness/blob/master/SAFETY.md',
    detalle: 'Límites del sandbox y recomendaciones de uso responsable.',
    etiqueta: 'Seguridad',
  },
  {
    titulo: 'Guía rápida de la interfaz web',
    url: 'https://github.com/deepseek-ai/DeepSeek-Harness/blob/master/docs/user/guide/index.md',
    detalle: 'Configurar el modelo y elegir el espacio de trabajo, paso a paso.',
    etiqueta: 'Guía',
  },
  {
    titulo: 'Plataforma de la API de DeepSeek',
    url: 'https://platform.deepseek.com/',
    detalle: 'Donde se crea la clave de API que necesita el agente.',
    etiqueta: 'API',
  },
  {
    titulo: 'Comunidad en Discord',
    url: 'https://discord.gg/Ycq5dCaS4',
    detalle: 'Ayuda y novedades de la comunidad (enlace del README oficial).',
    etiqueta: 'Comunidad',
  },
];

export function tarjetasRecursos() {
  return `<div class="recursos">
${RECURSOS.map(
  (r) => `<a class="recurso" href="${r.url}" target="_blank" rel="noopener">
  <span class="recurso-icono">${ICONOS.flecha}</span>
  <span class="recurso-cuerpo">
    <span class="recurso-etq">${r.etiqueta}</span>
    <span class="recurso-titulo">${r.titulo}</span>
    <span class="recurso-detalle">${r.detalle}</span>
  </span>
  <span class="recurso-abrir">↗</span>
</a>`
).join('\n')}
</div>`;
}
