# Glosario y chuleta — «Del chat al agente: qué es un harness y cómo se usa»

Seminario práctico con **DeepSeek Harness** (`dsh`). La **Parte 1** es el glosario; la **Parte 2**, la chuleta para tener al lado del portátil.

## Parte 1 — Glosario

Términos en orden alfabético, explicados en lenguaje llano y con un ejemplo corto. Cuando un concepto se apoya en otro, aparece marcado como **(ver …)**.

**Acceso total** — El nivel de sandbox más permisivo: el agente puede leer y escribir en todo el ordenador. Se elige a conciencia, nunca por comodidad.
*En la práctica:* tiene sentido en una máquina de pruebas o desechable; en tu ordenador de diario, casi nunca.

**Agente** — Programa que, además de responderte, puede hacer cosas por su cuenta en tu ordenador: leer y escribir archivos, ejecutar comandos, buscar en internet.
*En la práctica:* le dices «ordena las facturas de esta carpeta» y las ordena él; tú revisas el resultado después.

**AGENTS.md** — Archivo de texto con las normas que quieres que el agente siga siempre. Puede ser global (en tu carpeta de configuración) o de un proyecto concreto (en la raíz del proyecto).
*En la práctica:* «no borres archivos nunca; avísame antes de instalar nada».

**Alucinación** — Cuando el modelo se inventa un dato, una cita o un comando con total seguridad. No miente a propósito: rellena huecos.
*En la práctica:* te da un enlace que no existe. Por eso se piden fuentes y se comprueba todo (ver **Verificación**).

**API** — La puerta que usan los programas para hablar con un servicio por internet, sin pasar por una web ni por una persona.
*En la práctica:* el harness usa la API de DeepSeek para pedirle respuestas al modelo.

**Aprobación** — El aviso que aparece cuando el agente quiere hacer algo que no tiene permitido hacer solo, para que tú digas sí o no antes de que lo haga.
*En la práctica:* quiere escribir en una carpeta que está fuera de su zona y te pide permiso (ver **Sandbox**).

**Bucle agéntico** — El ciclo de trabajo del agente: piensa un paso, usa una herramienta, mira el resultado y repite hasta acabar.
*En la práctica:* buscar → leer → corregir → volver a buscar. Por eso tarda y da varios pasos aunque tú escribas una sola frase.

**Chat** — Conversación en la que el modelo solo escribe texto y el trabajo lo haces tú después. Es un consultor por teléfono.
*En la práctica:* te explica cómo ordenar tus fotos; las ordenas tú.

**Clave de API** — Contraseña larga que identifica tu cuenta y autoriza el uso del servicio. Se guarda en Ajustes → Modelos y no se comparte con nadie.
*En la práctica:* se obtiene en https://platform.deepseek.com/ y funciona como la llave de tu casa: quien la tenga, entra.

**Comando** — Orden que se le da al ordenador escribiéndola, casi siempre en la terminal.
*En la práctica:* `npx @deepseek-ai/dsh web` es un comando. Se copia, se pega y se pulsa Intro.

**Contenedor** — Entorno aislado y desechable donde puedes ejecutar el agente sin tocar tu ordenador de verdad.
*En la práctica:* si algo se rompe dentro, tu equipo no se entera. Es una de las formas recomendadas de probar.

**Contexto** — Todo lo que el agente tiene delante en ese momento: tu petición, la conversación, los archivos que ha leído y las respuestas de las herramientas. Es su mesa de trabajo.
*En la práctica:* si la mesa se llena de papeles, se pierde; conviene empezar una sesión nueva (ver **Sesión**).

**Copia de seguridad** — Duplicado de tus archivos, guardado aparte, para poder volver atrás si algo sale mal.
*En la práctica:* antes de dejar que el agente toque 200 archivos, haz una copia. Es tu red de seguridad.

**Credencial** — Cualquier dato que da acceso a algo tuyo: contraseñas, claves de API, tokens de acceso, datos de tarjeta.
*En la práctica:* no las pegues en una petición si no son imprescindibles. Lo que escribes viaja al servicio.

**DeepSeek Harness (dsh)** — El programa de este seminario: la aplicación que convierte un modelo en un agente, con interfaz web, herramientas y permisos. Se arranca con `npx @deepseek-ai/dsh web`.
*En la práctica:* es el coche completo; el modelo es solo el motor (ver **Harness**, ver **LLM**).

**Delegación** — Pedirle al agente que encargue una parte del trabajo a otro agente y te devuelva el resultado.
*En la práctica:* «que otro agente revise estos 40 archivos y me traiga un resumen». Tú sigues hablando con el primero.

**Detener (interrumpir)** — Cortar el trabajo que el agente está haciendo ahora mismo. Lo que ya ha hecho se queda hecho.
*En la práctica:* tras detenerlo, pídele la lista de archivos que ha tocado y revísalos.

**Espacio de trabajo (workspace)** — La carpeta que le entregas al agente como su zona de trabajo. Lo que haga dentro es lo normal; lo de fuera pide permiso.
*En la práctica:* si abres el harness desde la carpeta del proyecto, esa carpeta es la que se te propone como espacio de trabajo.

**Esfuerzo de razonamiento** — Cuánto «piensa» el modelo antes de responder. Más esfuerzo suele dar mejores respuestas en tareas difíciles, pero tarda más y consume más.
*En la práctica:* poco esfuerzo para un resumen rápido; más esfuerzo para revisar un contrato o comparar cifras.

**Harness** — La aplicación que envuelve al modelo y le da manos, normas y mandos: herramientas, permisos, memoria e interfaz donde hablar con él.
*En la práctica:* el modelo es el motor; el harness es el coche completo, con volante, frenos y salpicadero.

**Herramienta** — Cada una de las capacidades que el agente puede usar para actuar: leer archivos, escribir o modificar archivos, ejecutar comandos en la terminal, buscar y leer en internet, lanzar tareas en segundo plano, preguntarte algo, delegar en otro agente, mantener una lista de tareas o abrir el modo plan.
*En la práctica:* cuando el agente «abre» un archivo, está usando la herramienta de lectura.

**Interfaz web** — La página del navegador donde escribes al agente y ves lo que va haciendo. En este harness se sirve en http://127.0.0.1:3080 y solo existe mientras el servidor está arrancado.
*En la práctica:* si cierras la terminal donde arrancaste `dsh`, esa página deja de responder.

**Iteración** — Cada vuelta del trabajo: probar, ver qué sale, corregir y volver a probar. El agente trabaja así, no de un tirón.
*En la práctica:* escribe un borrador, lo lee, lo mejora. Por eso su primer resultado no siempre es el bueno.

**LLM (modelo)** — El programa entrenado con muchísimo texto que sabe redactar y predecir lenguaje. Solo texto: no ve tus archivos ni ejecuta nada por sí mismo.
*En la práctica:* ChatGPT, DeepSeek o Gemini son modelos (o servicios construidos alrededor de uno).

**Máquina virtual** — Ordenador simulado dentro del tuyo, con sus propios archivos, que puedes borrar sin consecuencias.
*En la práctica:* es el sitio recomendado para dejar trabajar a un agente en fase de pruebas.

**MCP** — Estándar que permite conectar herramientas que ya existen (GitHub, bases de datos, gestores de incidencias, servicios de memoria) para que aparezcan como herramientas nuevas del agente.
*En la práctica:* es un enchufe estándar, tipo USB: si la herramienta trae ese enchufe, el agente la puede usar.

**Memoria** — Lo que el agente conserva entre sesiones, normalmente porque está escrito en un archivo que vuelve a leer al empezar.
*En la práctica:* lo que pongas en AGENTS.md sigue ahí mañana; lo hablado en el chat, no (ver **Contexto**).

**Modo plan (plan)** — Forma de trabajar en la que el agente primero te cuenta qué piensa hacer y no toca nada hasta que le das el visto bueno.
*En la práctica:* imprescindible antes de dejarle modificar 200 archivos.

**Node.js** — Programa que hay que tener instalado en el ordenador para poder arrancar el harness. Es el requisito previo.
*En la práctica:* si el comando de arranque se queja de que no encuentra Node, es justo esto lo que falta.

**Permiso** — La regla que decide qué puede hacer el agente sin preguntar y qué no. Lo que queda fuera de lo permitido dispara un aviso de aprobación.
*En la práctica:* puede leer en toda la carpeta de trabajo, pero escribir solo en una parte.

**Plugin** — Pieza que se añade al harness para darle capacidades nuevas, a veces conectando servicios externos.
*En la práctica:* un plugin puede añadir una herramienta que no venía de serie. No es lo mismo que el harness (ver **Harness**).

**Política de permisos** — El conjunto de ajustes que fija hasta dónde llega el agente y cuándo tiene que preguntar. Por defecto, pregunta.
*En la práctica:* combina el nivel de acceso del sandbox con la política de aprobaciones (por defecto: preguntar).

**Prompt** — El texto que le escribes al agente: tu petición, el encargo. Cuanto más claro el encargo, mejor el resultado.
*En la práctica:* «resume este PDF en cinco puntos» funciona mucho mejor que «mírame esto».

**Proveedor** — La empresa o servicio que pone el modelo a disposición de los programas.
*En la práctica:* en este seminario, DeepSeek: te registras, sacas tu clave de API y el harness usa sus modelos.

**Ruta (ruta de archivo)** — La dirección que indica dónde está un archivo o una carpeta dentro del ordenador.
*En la práctica:* `C:\Users\Usuario\.dsh` es una ruta: la carpeta de configuración del usuario en Windows.

**Sandbox** — Zona de trabajo delimitada donde el agente puede moverse. Hay niveles: solo lectura; escritura limitada al espacio de trabajo; acceso total.
*En la práctica:* dentro de la zona trabaja sin molestarte; fuera, salta el «¿seguro?».

**Sesión** — Cada conversación con el agente, con su propio hilo y su propio contexto. Se guardan y puedes volver a ellas.
*En la práctica:* si el contexto se llena, abres una sesión nueva y arrastras solo lo importante.

**Skill** — Procedimiento guardado que el agente puede repetir cuando se lo pides. Vive en la carpeta `.dsh/skills/<nombre>/SKILL.md` dentro del proyecto.
*En la práctica:* son recetas de cocina: los pasos ya escritos, para no explicarlos cada vez. En el proyecto del seminario ya existe `.dsh/skills/precios-gasolineras/SKILL.md`.

**Tarea en segundo plano** — Trabajo largo que el agente lanza y deja corriendo mientras sigue hablando contigo. Te avisa cuando termina.
*En la práctica:* procesar 300 archivos mientras tú preparas el siguiente encargo.

**Terminal** — La ventana de texto donde se le dan órdenes al ordenador escribiendo, en vez de haciendo clic. Es donde se arranca el harness.
*En la práctica:* ahí escribes `npx @deepseek-ai/dsh web` y pulsas Intro.

**Token** — Trozo pequeño de texto (una palabra, media palabra, un signo) con el que el modelo cuenta y procesa. El precio y los límites se miden en tokens.
*En la práctica:* «gasolineras» puede ser dos o tres tokens. No son letras ni palabras exactas.

**Ventana de contexto** — El tamaño máximo de contexto que cabe de una vez. Cuando se supera, lo más antiguo se cae o se resume.
*En la práctica:* hilos muy largos con muchos archivos pegados acaban empujando fuera lo del principio.

**Verificación** — Comprobar el resultado en lugar de creértelo: abrir el archivo, mirar la fuente, contar las filas, repetir el cálculo.
*En la práctica:* el agente dice «he actualizado 12 filas»; tú abres el archivo y las cuentas.

### Palabras que se confunden

Se parecen, pero no son lo mismo. Una frase para cada pareja:

**Modelo vs. harness** — El modelo es el motor que redacta; el harness es el coche entero, con volante, frenos y salpicadero.

**Chat vs. agente** — El chat es un consultor por teléfono (te dice qué hacer y lo haces tú); el agente es un becario con acceso a tu ordenador (lo hace y tú revisas).

**Contexto vs. memoria** — El contexto es lo que tiene delante ahora mismo (la mesa de trabajo); la memoria es lo que queda guardado para la próxima vez.

**Permiso vs. aprobación** — El permiso es la regla escrita; la aprobación es el «¿seguro?» que te llega cuando algo se sale de esa regla.

**Harness vs. plugin** — El harness es la aplicación completa; un plugin es una pieza que le añades para darle una capacidad nueva.

**Sandbox vs. espacio de trabajo** — El sandbox es el nivel de libertad (leer, escribir, acceso total); el espacio de trabajo es la carpeta concreta donde ese nivel se aplica.

## Parte 2 — Chuleta de una página

### Antes de empezar (cinco minutos)

- **Node.js instalado.** Es el único requisito previo; sin él, el arranque falla.
- **Decide la carpeta de trabajo** y comprueba que tiene dentro lo que necesitas. No trabajes sobre tu carpeta personal entera.
- **Ten a mano la clave de API** de DeepSeek (https://platform.deepseek.com/).
- **Haz una copia de seguridad** de lo que el agente vaya a tocar.
- **Asume que esto es developer preview:** cambiará y no ha pasado auditoría de seguridad.

### Puesta en marcha (5 pasos)

1. **Instala Node.js** si no lo tienes. Es el único requisito previo.
2. **Abre la terminal en la carpeta que quieras usar como espacio de trabajo** y arranca: `npx @deepseek-ai/dsh web`. Así no instalas nada de forma permanente.
3. **Espera a que se abra el navegador** en http://127.0.0.1:3080. Si no se abre solo, escribe esa dirección a mano. Con `--no-open` arranca sin abrir el navegador.
4. **Configura el modelo:** Ajustes (Settings) → Modelos (Models) → pega tu clave de API de DeepSeek (se obtiene en https://platform.deepseek.com/) → guardar. Queda usable al momento, sin reiniciar el servidor.
5. **Elige el espacio de trabajo:** botón «Elegir espacio de trabajo» (Choose workspace) → añade la carpeta → selecciónala. Hasta que no lo hagas, el cuadro de escribir mensajes está deshabilitado.

*Alternativa con instalación global:* `npm install -g @deepseek-ai/dsh` y después `dsh web`.

*La carpeta desde la que lanzas `dsh` es el espacio de trabajo que se te propone por defecto.*

### Cómo pedir bien

Una petición vaga se convierte en una petición con **objetivo**, **alcance** y **criterio de éxito**.

| En vez de esto | Pide esto | Por qué |
|---|---|---|
| «Resúmeme esto» | «Lee los tres PDF de la carpeta *facturas* y hazme una tabla con fecha, proveedor e importe total» | Le das el objetivo, dónde mirar y en qué formato quieres la respuesta. |
| «Arréglame la web» | «En la carpeta *web*, dime primero qué enlaces del menú están rotos. No cambies nada todavía» | Separas el diagnóstico del cambio: primero información, luego decisiones. |
| «Ordena mis archivos» | «Mueve los `.jpg` de *Descargas* a *Fotos*, no borres nada y dime cuántos has movido» | Alcance cerrado y un número al final que puedes comprobar. |
| «Hazme un informe de ventas» | «Con `ventas.csv`, escribe un informe de una página con tres conclusiones. No modifiques el csv» | Queda claro qué debe entregar y qué no debe tocar. |
| «Busca información sobre MCP» | «Busca en internet qué es MCP y dame tres enlaces con la fecha de cada uno» | Pides fuentes: así puedes verificar de dónde sale cada dato. |
| «Limpia este código» | «Revisa el archivo y propón tres mejoras. Espera mi OK antes de editar» | Si el trabajo toca lo tuyo, mejor ver el plan antes de que actúe. |
| «Hazlo rápido y bien» | «Antes de empezar, resúmeme en cinco líneas qué vas a hacer y qué necesitas de mí» | Un plan corto evita media hora de trabajo en la dirección equivocada. |
| «Revisa la hoja de cálculo» | «Comprueba si el total de cada fila cuadra con sus importes y dime en qué filas no cuadra» | Le das un criterio de éxito comprobable, no una opinión. |
| «Cada semana quiero lo mismo» | «Guarda este procedimiento como skill y repítelo tal cual cuando te lo pida» | Lo que se repite se escribe una vez y se reutiliza (ver **Skill**). |
| «No sé, haz algo con esta carpeta» | «Dime qué hay en la carpeta y tres cosas útiles que se podrían hacer. No cambies nada» | Explorar primero, decidir después. |

### Frases que puedes copiar tal cual

- «Antes de tocar nada, dime qué has entendido y qué piensas hacer.»
- «Trabaja solo dentro de esta carpeta. Si necesitas algo de fuera, pídemelo.»
- «No borres ni sobrescribas nada sin avisarme antes.»
- «Cuando termines, dime exactamente qué archivos has creado o modificado.»
- «Cita la fuente de cada dato que me des.»
- «Si algo no lo sabes con seguridad, dilo en vez de inventártelo.»
- «Termina con un resumen de cinco líneas: qué has hecho y qué queda pendiente.»

### Qué hacer cuando pasa esto

| Situación | Qué significa | Qué haces |
|---|---|---|
| Aparece un aviso de aprobación | El agente quiere hacer algo que su política de permisos no le deja hacer solo. «Permitir una vez» es **solo esa vez**: no concede permiso permanente. | Lee con calma qué te pide. Si lo entiendes y tiene sentido, permite; si no, deniega y pídele otra vía. Es incómodo a propósito. |
| Quiere escribir fuera de la carpeta | Su escritura está limitada al espacio de trabajo y ha intentado salirse. | Mueve o copia lo necesario dentro de la carpeta de trabajo, o cambia de espacio de trabajo. No le des acceso total por comodidad. |
| El cuadro de mensajes está deshabilitado | Todavía no hay espacio de trabajo elegido, así que el agente no sabe dónde trabajar. | Botón «Elegir espacio de trabajo» (Choose workspace) → añade la carpeta → selecciónala. |
| El agente lleva mucho rato | Está encadenando pasos, esperando una aprobación tuya o tiene una tarea en segundo plano en marcha. | Pídele un resumen de en qué punto está. Si no avanza, deténlo y parte la tarea en trozos más pequeños. |
| Se equivoca y va a peor | Está iterando sobre un error y cada intento toca más cosas. | Deténlo ya. Pídele que explique qué ha cambiado y cómo deshacerlo, y restaura desde tu copia de seguridad si hace falta. |
| Quieres pararlo | Se corta el trabajo en curso, pero lo que ya ha hecho se queda hecho. | Usa el control de detener de la interfaz. Si no lo encuentras, escríbele «para» y espera a que termine el paso actual. Luego revisa lo que haya tocado. |
| Quieres que recuerde algo para siempre | El contexto de la conversación no se conserva entre sesiones; la memoria escrita sí. | Escríbelo en AGENTS.md: el global (en tu carpeta de configuración del usuario) vale para todo; el de la raíz del proyecto, solo para ese proyecto. |
| Quieres que repita una tarea igual cada semana | Necesitas un procedimiento guardado, no volver a explicarlo cada vez. | Conviértelo en skill: `.dsh/skills/<nombre>/SKILL.md` dentro del proyecto. Después pídeselo por su nombre. |
| El resultado parece correcto, pero quieres comprobarlo | «Parece» no es «está»: el agente puede equivocarse con total seguridad. | Pídele las fuentes, el archivo exacto que ha tocado o el comando que ha usado, y compruébalo tú: abre el archivo y cuenta. |
| Te preocupa la privacidad de unos datos | El agente trabaja con lo que le des y con las herramientas que tengas conectadas. | No pegues credenciales ni datos personales si no hacen falta: usa datos de ejemplo o trabaja en local. Revisa qué servicios tienes conectados antes de empezar. |

### Checklist de 30 segundos antes de aprobar

1. ¿Entiendo **qué** quiere hacer exactamente?
2. ¿Sobre **qué carpeta o archivo** lo va a hacer, y está dentro de mi espacio de trabajo?
3. ¿Podría **deshacerlo** si sale mal? ¿Tengo copia?
4. ¿Hay **credenciales o datos personales** de por medio?
5. Si dudo: **deniego** y le pido otra vía. «Permitir una vez» es solo esa vez.

### Las 7 reglas de oro

1. **Trabaja dentro de tu espacio de trabajo.** Lo de fuera es la excepción, no la norma.
2. **No apruebes lo que no entiendes.** El aviso de aprobación existe para que lo leas.
3. **Pide el plan antes del cambio** cuando vaya a tocar tus archivos (modo plan).
4. **Copia de seguridad antes** de cualquier cambio masivo. Sin copia no hay marcha atrás.
5. **Exige pruebas:** fuente, archivo tocado y cómo comprobarlo. Y compruébalo tú.
6. **Permiso mínimo:** ni acceso total ni credenciales que no hagan falta.
7. **La última palabra es tuya.** Revisa el resultado antes de darlo por bueno.

### Límites que conviene recordar

- El agente **se equivoca con seguridad** y puede **actuar rápido sobre cosas reales**: archivos de verdad, carpetas de verdad, datos de verdad.
- El **sandbox y las aprobaciones reducen el riesgo, pero no lo eliminan**: no garantizan aislamiento y no deben ser tu único control de seguridad.
- El proyecto está en **developer preview**: itera rápido, habrá cambios que rompan compatibilidad y **no ha pasado auditoría de seguridad**.
- Por eso: **mínimo privilegio**, mejor una **máquina virtual o un contenedor desechable**, **copias de seguridad**, **nada de credenciales a la vista** y **revisar plugins y comandos antes de permitirlos**.
- Y recuerda: **la responsabilidad de revisar es tuya**, no del agente.

### Datos de referencia

- Arranque sin instalar nada: `npx @deepseek-ai/dsh web`
- Instalación global: `npm install -g @deepseek-ai/dsh` y después `dsh web`
- Interfaz web: http://127.0.0.1:3080 (`--no-open` arranca sin abrir el navegador)
- Configuración del usuario en Windows: `C:\Users\Usuario\.dsh` (variable de entorno `DSH_HOME`), con las sesiones, los perfiles y el AGENTS.md global
- Memoria permanente: AGENTS.md global en la carpeta de configuración del usuario y AGENTS.md en la raíz del proyecto
- Skills del proyecto: `.dsh/skills/<nombre>/SKILL.md` (ejemplo: `.dsh/skills/precios-gasolineras/SKILL.md`)
