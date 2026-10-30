# Seminario «Del chat al agente» — Paquete de material didáctico

**Título:** Del chat al agente: qué es un harness y cómo se usa.
**Duración:** 150 minutos de núcleo, ampliable a 180.
**Audiencia:** profesionales que ya usan chats o bots de IA. No se requiere experiencia previa en programación.
**Formato:** sesión práctica, con el portátil delante. Cada alumno arranca el harness y lo usa.
**Herramienta:** opencode con modelos gratuitos (sin clave ni cuenta). Quien ya tenga suscripción puede usar Claude Code o Codex.

---

## Qué hay en esta carpeta

El paquete tiene **tres capas**: los documentos fuente, los formatos para usarlos en clase y las herramientas para regenerarlos.

### 1. Los documentos (Markdown, la fuente de todo)

| Archivo | Para quién | Para qué sirve |
|---|---|---|
| `01_guion_instructor.md` | Instructor | El guion de la sesión, minuto a minuto: qué decir, qué demostrar, qué recortar si vas con retraso y qué hacer si algo falla en directo. |
| `02_apuntes_alumno.md` | Alumno | Los apuntes que se lleva. Escritos para entenderse **sin** el instructor delante. |
| `03_laboratorio.md` | Alumno | El cuaderno de prácticas: cinco prácticas paso a paso y una sexta, opcional, de análisis de datos y modelos, con comprobaciones y una hoja de registro. |
| `04_soluciones_y_errores.md` | Instructor | Qué debería pasar en cada práctica, errores frecuentes con su solución, problemas técnicos de sala y frases de rescate. |
| `05_glosario_chuleta.md` | Alumno | Glosario de unos 30 términos en lenguaje llano y una chuleta de una página para imprimir. |
| `06_evaluacion.md` | Instructor | Cuestionario inicial de diagnóstico, cuestionario final con clave, rúbrica y encuesta de satisfacción. |
| `07_instalacion_previa.md` | Instructor y alumno | El mensaje para enviar antes del seminario, la guía de instalación paso a paso y la lista de comprobación del instructor. |
| `preparacion_alumno.md` | Alumno | Lección del curso online «Prepara tu ordenador»: instalar Node.js y opencode, descargar la carpeta de práctica y comprobar que arranca. |
| `carriles_alumno.md` | Alumno | Lección del curso online «Elige tu carril»: carril A gratis con opencode; carril B con Claude Code o Codex para quien ya tiene suscripción. |

**Orden de lectura rápido:** si solo tienes diez minutos para prepararte, lee el archivo `01` y la tabla de problemas técnicos del `04`.

### 2. Los formatos (lo que se usa en clase)

| Formato | Dónde | Para qué |
|---|---|---|
| **Página de entrada** | `index.html` | Punto de partida: enlaza el curso, las diapositivas, los PDF y la carpeta de práctica. Se abre con doble clic. |
| **Curso interactivo** | `curso/index.html` | Los documentos organizados en 3 módulos, una preparación previa y 28 lecciones, con búsqueda, progreso guardado en el navegador y los dos cuestionarios corregidos al momento. Sin servidor y sin conexión. |
| **Diapositivas** | `slides/diapositivas.html` y `slides/diapositivas.pdf` | 64 diapositivas para proyectar, con **notas del presentador** en todas ellas (tecla `N`). El PDF imprime una diapositiva por página. |
| **PDF imprimibles** | `pdf/` | Un PDF por documento, más `completo.pdf` con los ocho en un volumen de 85 páginas. |
| **Entorno de práctica** | `practica_ejemplo/LEEME.html` | Expediente ficticio de una empresa de ejemplo; descarga el ZIP y usa una copia como espacio de trabajo. |
| **Configuración de ejemplo** | `practica_ejemplo/configuracion_agente/` y su ZIP | Para opencode (`opencode.json` y `.opencode/skills`) y para Claude Code (`.claude/`): permisos que preguntan antes de editar o ejecutar, prohibición de salir de la carpeta, un hook de Claude Code que bloquea escrituras fuera de ella y cuatro skills con scripts. Se usa después de las prácticas. |
| **Fuente Marp** | `slides/slides.md` | La presentación en Markdown de Marp, por si prefieres editarla en VS Code con la extensión Marp o exportarla con `marp-cli`. |

### 3. Las herramientas (`build/`)

| Script | Qué hace |
|---|---|
| `build/build.mjs` | Genera el curso y los HTML imprimibles a partir de los Markdown. |
| `build/build_slides.mjs` | Genera la baraja de diapositivas a partir de `slides.md`. |
| `build/hacer_pdf.py` | Genera los 10 PDF con fpdf2, sin navegador. |
| `build/verificar_curso.mjs` | 57 comprobaciones del curso en un DOM simulado. |
| `build/verificar_slides.mjs` | 26 comprobaciones de las diapositivas. |
| `build/verificar_pdf.py` | Comprueba páginas, texto extraíble, tildes y frases del original en cada PDF. |

Las dependencias ya están instaladas dentro de `build/`, así que todo se regenera **sin conexión**.

---

## Cómo se usa el paquete

### Antes del seminario (3-5 días antes)

1. Lee `01_guion_instructor.md` entero una vez, de principio a fin. Es el único imprescindible.
2. Envía a los alumnos la Parte A de `07_instalacion_previa.md`. **Esto no es opcional:** si la mitad del grupo llega sin Node.js ni opencode instalados, el primer bloque práctico se convierte en una clase de instalación y se pierde el seminario.
3. Trabaja la Parte C del `07`: la lista de comprobación del día anterior.
4. Ten pensado un plan B por si los modelos gratuitos de opencode van saturados el día del seminario: elegir otro modelo gratuito de la lista o, si el alumno ya tiene suscripción, usar el carril B (Claude Code o Codex).
5. Descarga el expediente ficticio de `practica_ejemplo/`, extrae una copia de trabajo y conserva el ZIP original como respaldo.

### Durante el seminario

- Guion en pantalla o impreso (archivo `01`).
- `04_soluciones_y_errores.md` abierto en otra ventana: es tu red de seguridad cuando alguien levanta la mano.
- Reparte `02_apuntes_alumno.md` y `03_laboratorio.md` al empezar, o pide que los abran en el portátil.
- `06_evaluacion.md` al principio (diagnóstico) y al final (evaluación y encuesta).
- `05_glosario_chuleta.md` al final, como material de consulta para llevar.

### Después

- Envía por correo el paquete completo, incluida la chuleta.
- Revisa las encuestas antes de la siguiente edición: el archivo `06` incluye una tabla de duración por bloque para que ajustes el ritmo.

---

## Las analogías del paquete (no las cambies a la ligera)

Todo el material usa **las mismas ocho comparaciones** a propósito. Un alumno que solo ha usado chatbots necesita una imagen estable en la cabeza; si cada bloque usa una metáfora distinta, se pierde. Si adaptas el material, mantén estas:

| Idea | Comparación |
|---|---|
| Modelo y harness | **El modelo es el motor; el harness es el coche completo.** |
| Chat frente a agente | **El chat es un consultor por teléfono; el agente es un becario con acceso a tu ordenador.** |
| Sandbox | **La sala donde trabaja el becario.** |
| Aprobaciones | **El «¿seguro?» en la puerta.** |
| MCP | **Un enchufe estándar, como el USB.** |
| Skills | **Procedimientos guardados, como recetas de cocina.** |
| Contexto | **La mesa de trabajo: si se llena de papeles, hay que recoger.** |
| `AGENTS.md` | **Las notas que dejas al becario antes de que empiece.** |

**La frase que resume el seminario** y con la que conviene cerrar:

> Hoy no has aprendido a usar un programa. Has aprendido a dirigir a alguien que trabaja muy rápido, que no sabe lo que no sabe, y que tiene acceso a tus archivos. La herramienta te va a servir; los frenos te van a proteger.

---

## Las prácticas

El laboratorio gira alrededor de cinco prácticas, más una sexta opcional, siempre con el mismo nombre en todos los documentos:

| # | Práctica | Qué demuestra |
|---|---|---|
| 1 | Primer arranque y primer encargo | Que funciona y que produce efectos reales. |
| 2 | Provocar una aprobación | Que hay un freno, y que lo decides tú. |
| 3 | Cambiar de política | Que tú eliges el tamaño de la sala. |
| 4 | Enseñarle un procedimiento | Que la memoria permanente existe y se prueba en conversación nueva. |
| 5 | Encargo integrador | Que el trabajo no acaba cuando el agente dice «hecho». |
| 6 | Datos y modelo (opcional) | Que en análisis de datos se revisa el programa, no solo el número, y que un modelo señala anomalías pero no explica causas. |

**La práctica 2 y la 3 son el corazón del seminario**, y su pareja es deliberada: la primera provoca el aviso, la segunda lo elimina cambiando **dónde** trabaja el agente. Esa comparación es la que se llevan a casa.

---

## El enfoque didáctico, en cuatro decisiones

1. **Los frenos antes que las capacidades.** La mayoría de materiales empiezan por lo que el agente puede hacer. Aquí el bloque más largo es el de permisos, porque es lo que decide si la persona usa esto con tranquilidad o se lleva un susto.
2. **Cero jerga sin traducir.** Cada término técnico aparece con su explicación en la misma frase. El glosario (`05`) usa el mismo lenguaje llano.
3. **Verificar se enseña como una destreza, no como un consejo.** La práctica 5 obliga a abrir el resultado y contarlo. No basta con decir «revisa lo que hace».
4. **Los límites se dicen enteros.** El material explica sin adornos que opencode cambia muy rápido, que de serie confía mucho en el agente, que no tiene sandbox y que gratis no quiere decir privado. Un seminario que oculta esto deja a los alumnos peor preparados que antes de venir.

---

## Material complementario que ya tienes

- **Documentación de opencode** (https://opencode.ai/docs): referencia oficial de la interfaz, los permisos, las skills y los modelos. Es el material de continuación natural para quien salga del seminario con ganas de más. Este paquete no lo duplica: es la capa de impartición, más corta y orientada a la sesión.
- **La configuración de ejemplo** (`practica_ejemplo/configuracion_agente/`): `opencode.json`, `AGENTS.md` y cuatro skills reales en `.opencode/skills/` (y su versión para Claude Code en `.claude/`). Sirve para enseñar una skill de verdad en lugar de una inventada para la práctica 4.

---

## Antes de dar el seminario: personaliza esto

El material está escrito para ser usado tal cual, pero hay cuatro cosas que conviene adaptar:

1. **El correo de preparación** (`07`, Parte A): pon tu nombre, la fecha, el lugar y un medio de contacto para dudas previas.
2. **El plan B de modelos:** ya no hace falta clave. Si el modelo gratuito que usas en las demos está saturado, ten anotado otro gratuito; y si algún alumno ya tiene suscripción, puede usar el carril B.
3. **El ejemplo de la demostración** (`01`, bloque 2): cámbialo por algo del sector de tu audiencia. Funciona mucho mejor con archivos que reconozcan.
4. **La encuesta y el cuestionario:** añade o quita preguntas según lo que te interese medir.

---

## Advertencia de seguridad que conviene repetir

opencode **cambia muy rápido**: habrá novedades que rompan lo anterior, así que repasa su documentación antes de cada edición. De serie **confía mucho en el agente**: dentro de la carpeta de trabajo lee, escribe y ejecuta órdenes sin preguntar. **No tiene sandbox** (en Windows tampoco lo tiene Claude Code), y lo que lee se envía al proveedor del modelo. **Gratis no quiere decir privado**: algunos modelos gratuitos usan esos datos para mejorar.

**Durante un seminario esto se traduce en tres reglas de sala:**

1. Los alumnos practican con **archivos de ejemplo**, nunca con documentos reales de trabajo ni datos de clientes.
2. El instructor **no aprueba permisos en el portátil de un alumno**. Se explica el aviso y decide el alumno.
3. Los permisos y las aprobaciones **reducen el riesgo, no lo eliminan**, y no deben presentarse como una garantía de aislamiento.
