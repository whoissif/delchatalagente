// Hoja de estilos del curso y de los documentos imprimibles.
// Se inserta en línea en el HTML final: el resultado funciona sin conexión.

export const tema = String.raw`
:root{
  --fondo:#f6f7fb;
  --fondo-2:#eef0f7;
  --superficie:#ffffff;
  --superficie-2:#f1f3f9;
  --borde:#e3e6ef;
  --borde-fuerte:#c9d0e0;
  --texto:#1a2133;
  --texto-suave:#5a6478;
  --texto-tenue:#8b94a8;
  --primario:#2f4bd8;
  --primario-2:#1e3aa8;
  --primario-suave:#e9edff;
  --acento:#0f8a7e;
  --acento-suave:#e3f5f1;
  --aviso:#b45309;
  --aviso-suave:#fdf3e3;
  --peligro:#b3261e;
  --peligro-suave:#fdecea;
  --ok:#15803d;
  --ok-suave:#e8f6ed;
  --sombra:0 1px 2px rgba(20,26,45,.05), 0 12px 32px -18px rgba(20,26,45,.28);
  --sombra-fuerte:0 10px 40px -12px rgba(20,26,45,.35);
  --radio:16px;
  --radio-sm:10px;
  --lateral:316px;
  --sans:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;
  --mono:ui-monospace,SFMono-Regular,'Cascadia Code',Consolas,'Liberation Mono',monospace;
}
html[data-tema="oscuro"]{
  --fondo:#0d1017;
  --fondo-2:#12161f;
  --superficie:#161b26;
  --superficie-2:#1d2330;
  --borde:#252c3c;
  --borde-fuerte:#333c4e;
  --texto:#e7eaf2;
  --texto-suave:#a6aec2;
  --texto-tenue:#7b859c;
  --primario:#8fa4ff;
  --primario-2:#aabaff;
  --primario-suave:#1b2440;
  --acento:#4ecdc0;
  --acento-suave:#122f2a;
  --aviso:#f0b45e;
  --aviso-suave:#322611;
  --peligro:#f08a82;
  --peligro-suave:#381b18;
  --ok:#6ddc95;
  --ok-suave:#10291b;
  --sombra:0 1px 2px rgba(0,0,0,.4), 0 12px 34px -18px rgba(0,0,0,.75);
  --sombra-fuerte:0 12px 44px -14px rgba(0,0,0,.8);
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{
  margin:0;background:
    radial-gradient(1100px 500px at 85% -10%, var(--primario-suave), transparent 60%),
    radial-gradient(900px 460px at -10% 12%, var(--acento-suave), transparent 55%),
    var(--fondo);
  color:var(--texto);font-family:var(--sans);font-size:16.5px;line-height:1.7;
  -webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;
}
::selection{background:var(--primario);color:#fff}

.app{display:flex;min-height:100vh}
.lateral{
  width:var(--lateral);flex:0 0 var(--lateral);background:color-mix(in srgb,var(--superficie) 92%,transparent);
  backdrop-filter:blur(8px);border-right:1px solid var(--borde);
  position:sticky;top:0;height:100vh;display:flex;flex-direction:column;
}
.marca{padding:24px 22px 18px;border-bottom:1px solid var(--borde)}
.marca .logo{
  width:40px;height:40px;border-radius:12px;margin-bottom:12px;
  background:linear-gradient(135deg,var(--primario),var(--acento));color:#fff;
  display:grid;place-items:center;box-shadow:var(--sombra);
}
.marca .logo svg{width:22px;height:22px}
.marca h1{margin:0;font-size:1.05rem;letter-spacing:-.01em;line-height:1.3}
.marca p{margin:5px 0 0;font-size:.76rem;color:var(--texto-tenue);text-transform:uppercase;letter-spacing:.09em}

.buscador{padding:14px 16px;border-bottom:1px solid var(--borde);position:relative}
.buscador input{
  width:100%;padding:10px 13px 10px 35px;border:1px solid var(--borde-fuerte);
  border-radius:11px;background:var(--superficie-2);color:var(--texto);
  font-size:.88rem;font-family:inherit;transition:box-shadow .15s,border-color .15s;
}
.buscador input:focus{outline:none;border-color:var(--primario);box-shadow:0 0 0 3px var(--primario-suave);background:var(--superficie)}
.buscador svg{position:absolute;left:27px;top:24px;width:15px;height:15px;stroke:var(--texto-tenue);fill:none;stroke-width:2}
.buscador kbd{
  position:absolute;right:26px;top:23px;font-size:.66rem;font-family:var(--mono);
  color:var(--texto-tenue);border:1px solid var(--borde-fuerte);border-radius:5px;padding:1px 6px;background:var(--superficie);
}

nav{overflow-y:auto;padding:10px 10px 26px;flex:1}
nav .grupo{margin-bottom:4px}
nav .grupo-titulo{
  font-size:.68rem;text-transform:uppercase;letter-spacing:.1em;color:var(--texto-tenue);
  padding:15px 12px 6px;font-weight:700;
}
nav button{
  display:flex;align-items:center;gap:10px;width:100%;text-align:left;
  padding:9px 11px;border:0;border-radius:11px;background:transparent;
  color:var(--texto-suave);font:inherit;font-size:.885rem;cursor:pointer;line-height:1.35;
  transition:background .13s,color .13s;
}
nav button:hover{background:var(--superficie-2);color:var(--texto)}
nav button[aria-current="true"]{background:var(--primario-suave);color:var(--primario);font-weight:640}
nav button .num{
  flex:0 0 22px;height:22px;border-radius:7px;background:var(--superficie-2);
  display:grid;place-items:center;font-size:.68rem;font-family:var(--mono);color:var(--texto-tenue);
  transition:background .13s,color .13s;
}
nav button[aria-current="true"] .num{background:var(--primario);color:#fff}
nav button .marca-ok{margin-left:auto;color:var(--ok);font-size:.85rem;opacity:0;transition:opacity .15s}
nav button.hecho .marca-ok{opacity:1}
nav button.hecho{color:var(--texto-tenue)}
.lateral-pie{padding:13px 16px;border-top:1px solid var(--borde);font-size:.74rem;color:var(--texto-tenue)}

.principal{flex:1;min-width:0;display:flex;flex-direction:column}
.barra{
  position:sticky;top:0;z-index:20;background:color-mix(in srgb,var(--fondo) 82%,transparent);
  backdrop-filter:blur(12px);border-bottom:1px solid var(--borde);
  padding:11px 30px;display:flex;align-items:center;gap:18px;
}
.barra .migas{font-size:.82rem;color:var(--texto-tenue);flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.barra .migas b{color:var(--texto-suave);font-weight:600}
.barra-acciones{display:flex;align-items:center;gap:8px}
.medidor{display:flex;align-items:center;gap:9px;font-size:.76rem;color:var(--texto-suave);font-variant-numeric:tabular-nums}
.medidor .pista{width:100px;height:7px;border-radius:99px;background:var(--superficie-2);overflow:hidden}
.medidor .relleno{height:100%;width:0;background:linear-gradient(90deg,var(--primario),var(--acento));border-radius:99px;transition:width .35s cubic-bezier(.4,0,.2,1)}
.icono{
  width:36px;height:36px;border-radius:10px;border:1px solid var(--borde-fuerte);
  background:var(--superficie);color:var(--texto-suave);cursor:pointer;
  display:grid;place-items:center;font-size:1rem;transition:background .13s,color .13s,transform .1s;
}
.icono:hover{background:var(--superficie-2);color:var(--texto)}
.icono:active{transform:scale(.96)}
.lienzo{flex:1;padding:34px 30px 96px;display:flex;justify-content:center}
.hoja{width:100%;max-width:860px}

/* ---------- Tipografía del contenido ---------- */
.contenido{font-size:1.01rem}
.contenido h1{font-size:2.1rem;line-height:1.15;letter-spacing:-.024em;margin:0 0 8px;font-weight:800}
.contenido h1 + p{color:var(--texto-suave);font-size:1.06rem;margin-top:0}
.contenido h2{
  font-size:1.44rem;letter-spacing:-.016em;margin:2.7em 0 .5em;padding-top:.7em;
  border-top:1px solid var(--borde);font-weight:750;scroll-margin-top:84px;line-height:1.25;
}
.contenido h2:first-of-type{border-top:0;padding-top:0;margin-top:1.5em}
.contenido h3{font-size:1.14rem;margin:2em 0 .4em;font-weight:680;scroll-margin-top:84px;letter-spacing:-.01em}
.contenido h4{font-size:.99rem;margin:1.6em 0 .3em;font-weight:670;color:var(--texto-suave)}
.contenido p{margin:.9em 0}
.contenido a{color:var(--primario);text-decoration:none;border-bottom:1px solid color-mix(in srgb,var(--primario) 35%,transparent)}
.contenido a:hover{border-bottom-color:var(--primario)}
.contenido strong{font-weight:690;color:var(--texto)}
.contenido hr{border:0;border-top:1px solid var(--borde);margin:2.4em 0}
.contenido ul,.contenido ol{margin:.8em 0;padding-left:1.4em}
.contenido li{margin:.4em 0}
.contenido li::marker{color:var(--primario)}
.contenido code{
  font-family:var(--mono);font-size:.855em;background:var(--superficie-2);
  border:1px solid var(--borde);border-radius:6px;padding:.12em .38em;color:var(--texto);
}
.contenido pre{
  background:var(--superficie);border:1px solid var(--borde);border-radius:var(--radio);
  padding:16px 18px;overflow-x:auto;box-shadow:var(--sombra);margin:1.2em 0;
}
.contenido pre code{background:none;border:0;padding:0;font-size:.84rem;line-height:1.62}

.contenido blockquote{
  margin:1.4em 0;padding:15px 19px 15px 52px;border-radius:var(--radio);position:relative;
  background:var(--primario-suave);border:1px solid color-mix(in srgb,var(--primario) 22%,transparent);
}
.contenido blockquote::before{
  content:'\201C';position:absolute;left:15px;top:6px;font-size:2.4rem;line-height:1;
  color:var(--primario);font-family:Georgia,serif;opacity:.6;
}
.contenido blockquote p{margin:.3em 0}
.contenido blockquote p:first-child{margin-top:0}
.contenido blockquote p:last-child{margin-bottom:0}

.contenido table{
  width:100%;border-collapse:separate;border-spacing:0;margin:1.4em 0;font-size:.9rem;
  border:1px solid var(--borde);border-radius:var(--radio);overflow:hidden;display:block;overflow-x:auto;
  box-shadow:var(--sombra);
}
.contenido thead th{
  text-align:left;background:var(--superficie-2);font-weight:690;font-size:.77rem;
  text-transform:uppercase;letter-spacing:.05em;color:var(--texto-suave);
  padding:11px 14px;border-bottom:1px solid var(--borde-fuerte);white-space:nowrap;
}
.contenido tbody td{padding:11px 14px;border-bottom:1px solid var(--borde);vertical-align:top}
.contenido tbody tr:nth-child(even){background:var(--superficie-2)}
.contenido tbody tr:last-child td{border-bottom:0}
.contenido table input[type=checkbox]{accent-color:var(--ok)}

/* ---------- Portada ---------- */
.portada .hero{
  display:grid;grid-template-columns:1.05fr 1fr;gap:26px;align-items:center;
  background:linear-gradient(130deg,#0f1733 0%,#1c2f6b 52%,#0d5a52 100%);
  border-radius:24px;padding:38px 38px 34px;color:#fff;overflow:hidden;
  box-shadow:var(--sombra-fuerte);position:relative;
}
.portada .hero::after{
  content:'';position:absolute;inset:0;pointer-events:none;opacity:.5;
  background-image:radial-gradient(circle at 15% 20%, rgba(255,255,255,.10) 0, transparent 40%),
    radial-gradient(circle at 90% 90%, rgba(127,227,214,.14) 0, transparent 42%);
}
.portada .hero>*{position:relative;z-index:1}
.hero-etq{
  display:inline-flex;align-items:center;gap:7px;font-size:.72rem;letter-spacing:.11em;
  text-transform:uppercase;font-weight:700;color:#a9e7dd;background:rgba(127,227,214,.14);
  border:1px solid rgba(127,227,214,.3);padding:5px 12px;border-radius:99px;
}
.portada .hero h1{font-size:2.75rem;margin:16px 0 10px;letter-spacing:-.032em;line-height:1.05;font-weight:800;color:#fff}
.hero-sub{font-size:1.13rem;line-height:1.55;color:#c6d0ec;max-width:44ch;margin:0}
.hero-cta{display:flex;gap:12px;margin-top:24px;flex-wrap:wrap}
.boton-cta{
  display:inline-flex;align-items:center;gap:9px;padding:12px 20px;border-radius:12px;
  background:#fff;color:#14204a;font-weight:680;font-size:.95rem;text-decoration:none;
  border:1px solid transparent;transition:transform .13s,box-shadow .13s;
}
.boton-cta:hover{transform:translateY(-2px);box-shadow:0 10px 26px -10px rgba(0,0,0,.45)}
.boton-cta svg{width:16px;height:16px}
.boton-cta.secundario{background:rgba(255,255,255,.12);color:#fff;border-color:rgba(255,255,255,.25)}
.boton-cta.secundario:hover{background:rgba(255,255,255,.2)}
.hero-figura .figura{margin:0;background:#0f1733;border-color:rgba(255,255,255,.14)}
.hero-figura .figura figcaption{color:#8fa0c8}

.rejilla{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin:26px 0 8px}
.tarjeta{
  background:var(--superficie);border:1px solid var(--borde);border-radius:var(--radio);
  padding:18px 20px;box-shadow:var(--sombra);
}
.tarjeta .cifra{font-size:1.85rem;font-weight:800;letter-spacing:-.02em;color:var(--primario);line-height:1.05}
.tarjeta .titulo{font-size:.92rem;font-weight:680;margin-top:6px}
.tarjeta .detalle{font-size:.82rem;color:var(--texto-tenue);margin-top:3px;line-height:1.5}

.seccion-titulo{font-size:1.28rem;letter-spacing:-.014em;margin:36px 0 16px;font-weight:750}
.modulos{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;margin:0 0 10px}
.modulo{
  display:flex;flex-direction:column;gap:8px;padding:20px 20px;border:1px solid var(--borde);
  border-radius:var(--radio);background:var(--superficie);text-decoration:none;color:inherit;
  box-shadow:var(--sombra);transition:transform .15s,border-color .15s,box-shadow .15s;
}
.modulo:hover{transform:translateY(-4px);border-color:var(--primario);box-shadow:var(--sombra-fuerte)}
.modulo-icono{
  width:42px;height:42px;border-radius:12px;background:var(--primario-suave);color:var(--primario);
  display:grid;place-items:center;margin-bottom:6px;
}
.modulo-icono svg{width:21px;height:21px}
.modulo h3{margin:0;font-size:1.02rem;letter-spacing:-.01em}
.modulo p{margin:0;font-size:.86rem;color:var(--texto-suave);line-height:1.5}
.modulo .num-lecciones{font-size:.74rem;color:var(--texto-tenue);margin-top:auto;padding-top:8px;font-variant-numeric:tabular-nums}

.pista{color:var(--texto-tenue);font-size:.9rem;margin:14px 0 0}
.pista kbd{font-family:var(--mono);font-size:.8em;background:var(--superficie-2);border:1px solid var(--borde);border-radius:5px;padding:1px 6px}

/* ---------- Metadatos y figuras de lección ---------- */
.leccion-meta{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:0 0 18px}
.chip{
  display:inline-flex;align-items:center;gap:6px;font-size:.74rem;font-weight:600;
  padding:4px 11px;border-radius:99px;background:var(--superficie-2);
  color:var(--texto-suave);border:1px solid var(--borde);
}
.chip svg{width:12px;height:12px}
.chip.modulo{background:var(--primario-suave);color:var(--primario);border-color:transparent}

.figura{
  background:#f7f9ff;border:1px solid var(--borde);border-radius:18px;padding:12px;margin:1.6em 0;
  box-shadow:var(--sombra);
}
html[data-tema="oscuro"] .figura{background:#131722}
.figura svg{width:100%;height:auto;display:block;border-radius:10px;aspect-ratio:var(--ar,16/9)}
.figura figcaption{font-size:.82rem;color:var(--texto-tenue);padding:10px 8px 2px;text-align:center;line-height:1.5}

/* ---------- Recursos ---------- */
.recursos{display:grid;grid-template-columns:repeat(auto-fit,minmax(272px,1fr));gap:13px;margin:1.6em 0}
.recurso{
  display:flex;align-items:flex-start;gap:13px;padding:17px 18px;border:1px solid var(--borde);
  border-radius:var(--radio);background:var(--superficie);text-decoration:none;color:inherit;
  box-shadow:var(--sombra);transition:transform .15s,border-color .15s,box-shadow .15s;
}
.recurso:hover{transform:translateY(-3px);border-color:var(--primario);box-shadow:var(--sombra-fuerte)}
.recurso-icono{
  flex:0 0 38px;height:38px;border-radius:11px;background:var(--acento-suave);color:var(--acento);
  display:grid;place-items:center;
}
.recurso-icono svg{width:18px;height:18px}
.recurso-cuerpo{display:flex;flex-direction:column;gap:3px;min-width:0}
.recurso-etq{font-size:.66rem;text-transform:uppercase;letter-spacing:.08em;color:var(--texto-tenue);font-weight:700}
.recurso-titulo{font-size:.95rem;font-weight:680;color:var(--texto)}
.recurso-detalle{font-size:.82rem;color:var(--texto-suave);line-height:1.5}
.recurso-abrir{margin-left:auto;color:var(--texto-tenue);font-size:1.05rem}

/* ---------- Piezas interactivas ---------- */
.marcar{
  display:flex;align-items:center;gap:11px;margin:2.8em 0 0;padding:16px 19px;
  background:var(--superficie);border:1px solid var(--borde);border-radius:var(--radio);box-shadow:var(--sombra);
}
.marcar label{display:flex;align-items:center;gap:10px;cursor:pointer;font-size:.92rem;color:var(--texto-suave);flex:1}
.marcar input{width:19px;height:19px;accent-color:var(--ok);cursor:pointer;flex:0 0 auto}
.marcar.hecho{background:var(--ok-suave);border-color:color-mix(in srgb,var(--ok) 40%,transparent)}
.marcar.hecho label{color:var(--ok);font-weight:640}
.navegacion{display:flex;gap:12px;margin:32px 0 0;padding-top:22px;border-top:1px solid var(--borde)}
.navegacion button{
  flex:1;padding:14px 17px;border:1px solid var(--borde);background:var(--superficie);
  border-radius:var(--radio);cursor:pointer;font:inherit;font-size:.87rem;color:var(--texto-suave);
  text-align:left;transition:border-color .13s,box-shadow .13s,transform .13s;
}
.navegacion button:hover:not(:disabled){border-color:var(--primario);box-shadow:var(--sombra);transform:translateY(-2px)}
.navegacion button:disabled{opacity:.4;cursor:default}
.navegacion button b{display:block;color:var(--texto);font-size:.94rem;margin-top:2px;font-weight:660}
.navegacion button.siguiente{text-align:right}
.navegacion .etq{font-size:.7rem;text-transform:uppercase;letter-spacing:.08em;color:var(--texto-tenue);font-weight:700}

/* ---------- Cuestionario ---------- */
.cuestionario{max-width:780px}
.cuestionario .cabecera{margin-bottom:26px}
.cuestionario .cabecera h1{font-size:2rem}
.opcion{
  display:flex;gap:13px;align-items:flex-start;width:100%;text-align:left;
  padding:14px 17px;margin:9px 0;border:1px solid var(--borde);border-radius:var(--radio);
  background:var(--superficie);cursor:pointer;font:inherit;font-size:.94rem;color:var(--texto);
  transition:border-color .13s,background .13s,transform .1s,box-shadow .13s;
}
.opcion:hover:not(:disabled){border-color:var(--primario);transform:translateX(3px);box-shadow:var(--sombra)}
.opcion:disabled{cursor:default}
.opcion .letra{
  flex:0 0 28px;height:28px;border-radius:8px;background:var(--superficie-2);
  display:grid;place-items:center;font-size:.8rem;font-weight:720;font-family:var(--mono);color:var(--texto-suave);
}
.opcion.elegida{border-color:var(--primario);background:var(--primario-suave)}
.opcion.elegida .letra{background:var(--primario);color:#fff}
.opcion.acierto{border-color:var(--ok);background:var(--ok-suave)}
.opcion.acierto .letra{background:var(--ok);color:#fff}
.opcion.fallo{border-color:var(--peligro);background:var(--peligro-suave)}
.opcion.fallo .letra{background:var(--peligro);color:#fff}
.explica{
  margin:6px 0 22px;padding:14px 17px;border-radius:var(--radio);font-size:.88rem;
  background:var(--superficie-2);border-left:3px solid var(--texto-tenue);color:var(--texto-suave);line-height:1.55;
}
.explica.bien{border-left-color:var(--ok);background:var(--ok-suave);color:var(--texto)}
.explica.mal{border-left-color:var(--peligro);background:var(--peligro-suave);color:var(--texto)}
.pregunta{margin:0 0 30px}
.pregunta .enunciado{font-size:1.03rem;font-weight:650;margin:0 0 13px;display:flex;gap:12px}
.pregunta .enunciado .num{
  flex:0 0 30px;color:var(--primario);font-family:var(--mono);font-size:.86rem;font-weight:700;padding-top:2px;
}
.resultado{
  padding:24px 26px;border-radius:var(--radio);background:linear-gradient(135deg,var(--primario-suave),var(--superficie));
  border:1px solid var(--borde);box-shadow:var(--sombra);margin:28px 0;
}
.resultado .nota{font-size:2.6rem;font-weight:800;letter-spacing:-.03em;line-height:1;color:var(--primario)}
.resultado .titulo{font-size:1.08rem;font-weight:700;margin-top:8px}
.resultado .texto{font-size:.9rem;color:var(--texto-suave);margin-top:5px;line-height:1.55}
.boton{
  padding:12px 21px;border-radius:11px;border:1px solid var(--primario);
  background:var(--primario);color:#fff;font:inherit;font-size:.9rem;font-weight:650;
  cursor:pointer;transition:filter .13s,transform .13s;box-shadow:var(--sombra);
}
.boton:hover{filter:brightness(1.08);transform:translateY(-1px)}
.boton.secundario{background:var(--superficie);color:var(--texto-suave);border-color:var(--borde-fuerte)}
.acciones{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-top:14px}

.vacio{padding:70px 20px;text-align:center;color:var(--texto-tenue)}
.vacio b{display:block;font-size:1.1rem;color:var(--texto-suave);margin-bottom:6px}

/* ---------- Móvil ---------- */
.abrir-menu{display:none}
@media (max-width:920px){
  :root{--lateral:288px}
  .lateral{position:fixed;z-index:60;transform:translateX(-100%);transition:transform .22s ease;box-shadow:var(--sombra-fuerte)}
  .lateral.abierto{transform:none}
  .abrir-menu{display:grid}
  .barra{padding:10px 16px}
  .lienzo{padding:22px 16px 88px}
  .contenido h1{font-size:1.72rem}
  .portada .hero{grid-template-columns:1fr;padding:26px 24px}
  .portada .hero h1{font-size:2.1rem}
  .hero-figura{display:none}
  .velo{position:fixed;inset:0;background:rgba(8,11,20,.5);z-index:55;display:none;backdrop-filter:blur(2px)}
  .velo.visible{display:block}
}

/* ---------- Impresión ---------- */
@media print{
  .lateral,.barra,.navegacion,.marcar,.abrir-menu,.velo,.acciones,.hero-cta,.leccion-meta{display:none!important}
  body{background:#fff;font-size:10.5pt;line-height:1.5}
  .lienzo{padding:0}
  .hoja{max-width:none}
  .contenido h1{font-size:19pt}
  .contenido h2{font-size:14pt;page-break-after:avoid;break-after:avoid}
  .contenido h3{font-size:11.5pt;page-break-after:avoid;break-after:avoid}
  .contenido pre,.contenido table,.contenido blockquote,.figura{page-break-inside:avoid;break-inside:avoid;box-shadow:none}
  .contenido a{color:inherit;border:0}
  .contenido tbody tr:nth-child(even){background:none}
}
`;
