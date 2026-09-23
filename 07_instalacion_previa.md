# Preparación previa y logística — Seminario «Del chat al agente: qué es un harness y cómo se usa»

Este documento tiene **tres partes** y cada una es para un público distinto:

- **Parte A** — Mensaje listo para copiar y enviar a los alumnos 3-5 días antes.
- **Parte B** — Guía de instalación paso a paso, para tener a mano durante el seminario.
- **Parte C** — Lista de comprobación del instructor (día anterior y día del seminario).

La herramienta del seminario es **DeepSeek Harness** (`dsh`), un *harness* de agentes de DeepSeek AI.
Un **harness** es la pieza que convierte un chat en un agente: le da herramientas, permisos, memoria y una carpeta de trabajo.
Está en fase **developer preview**: funciona, pero es software experimental y cambia a menudo.

---

# Parte A — Mensaje para enviar a los alumnos (3-5 días antes)

## Asunto

**Seminario «Del chat al agente»: trae el portátil listo (unos 15 minutos de preparación)**

## Cuerpo del mensaje

Hola:

El **[día]** hacemos el seminario **«Del chat al agente: qué es un harness y cómo se usa»**, de 2-3 horas, en **[lugar]**.
Vamos a pasar de usar la IA como un chat que solo responde texto a usarla como un **agente** que trabaja dentro de una carpeta de tu ordenador: lee archivos, los modifica y ejecuta comandos.
No hace falta saber programar: todo se hace desde una interfaz web, como una página del navegador.
Te pedimos que llegues con la preparación hecha, porque son unos 15 minutos y así los dedicamos a practicar en vez de a instalar cosas.

### 1. Requisitos previos (hazlo antes de venir)

Vas a necesitar dos cosas: **Node.js** instalado y una **clave de API de DeepSeek**.
Node.js es el programa que hace falta para poder arrancar la herramienta.

**En Windows:**

1. Entra en la web oficial de Node.js y descarga el instalador para Windows.
2. Elige la versión marcada como **LTS** (es la versión estable y recomendada; evita la que pone «Current»).
3. Ejecuta el instalador y ve dándole a **Siguiente** con las opciones que vienen por defecto.
4. Abre el **menú Inicio**, escribe `PowerShell` o `Terminal` y ábrelo.
5. Escribe `node -v` y pulsa **Intro**. Si aparece un número de versión, está bien instalado.

**En macOS:**

1. Entra en la web oficial de Node.js y descarga el instalador para macOS.
2. Elige la versión marcada como **LTS** (la estable; no la «Current»).
3. Abre el archivo descargado y completa el instalador con las opciones por defecto.
4. Pulsa **Cmd + Espacio**, escribe `Terminal` y ábrelo.
5. Escribe `node -v` y pulsa **Intro**. Si aparece un número de versión, está bien instalado.

**Si el paso 5 no muestra ninguna versión**, cierra la terminal, ábrela otra vez y repite. Si sigue sin funcionar, escríbeme antes del seminario.

### 2. Consigue tu clave de API de DeepSeek

1. Entra en https://platform.deepseek.com/ y **regístrate** con tu correo.
2. Crea una **clave de API** desde tu cuenta y cópiala en un sitio seguro.
3. Ten en cuenta que el uso de la API **tiene coste** (suele ser pequeño para una práctica, pero es de pago, no es gratis).
4. Hazlo **con antelación**: a veces la plataforma pide verificar la cuenta y eso puede tardar un rato.

> Una **clave de API** es como una contraseña larga que identifica tu cuenta. No la compartas con nadie ni la subas a internet.

### 3. Comprobación final: arranca el harness y ciérralo

Hazlo tú solo antes de venir. Sirve para confirmar que todo está en su sitio y para que no sea la primera vez delante del grupo.

1. Abre la terminal (los pasos de arriba).
2. Escribe este comando y pulsa **Intro**:

   ```
   npx @deepseek-ai/dsh web
   ```

3. La primera vez tardará un poco: está **descargando** la herramienta. Es normal.
4. Cuando termine, **la interfaz se abre sola en tu navegador**, en la dirección **http://127.0.0.1:3080**.
5. Si no se abre sola, copia esa dirección en el navegador y pulsa Intro.
6. **Para parar el servidor**, cierra la ventana de la terminal o pulsa **Ctrl + C** en la terminal.
   Si cierras solo la pestaña del navegador, el servidor **sigue funcionando** en segundo plano.

### Qué traer

- **Portátil con su cargador** (el seminario es práctico, no hay equipos de sobra).
- **Permisos de administrador** en el portátil, por si hay que instalar algo.
- **Una carpeta con archivos de ejemplo** con los que practicar: notas, textos, hojas de cálculo, algún PDF… lo que uses normalmente.
- **Sin datos confidenciales** en esa carpeta. Nada de documentos de clientes, nóminas, historiales médicos ni cosas parecidas.
- **La clave de API a mano**, para no perder tiempo buscándola.
- Si puedes, **una copia de seguridad** de la carpeta de práctica (una copia en el pendrive o en la nube).

### Si algo no funciona

- **Respira: es lo más normal del mundo.** Un mensaje de error en la terminal casi nunca significa que hayas roto nada; significa que falta un paso o que hay que repetirlo.
- **Casi todo se arregla cerrando la terminal y volviendo a abrirla.** Si el comando no se reconoce, suele ser que Node.js no quedó bien instalado o que la terminal es la de antes de instalarlo.
- **El primer arranque tarda.** Si parece que no pasa nada, espera un poco antes de tocar nada. La primera vez tiene que descargar la herramienta.
- **No te quedes atascado en silencio.** Escríbeme antes del seminario con lo que ves en pantalla (una foto o el texto del error vale) y lo miramos entre los dos. Es mucho mejor resolverlo por correo que perder la primera media hora del taller.

### Aviso importante sobre seguridad (léelo, en serio)

La herramienta es **software experimental, en fase de desarrollo**. Eso tiene consecuencias prácticas:

- El agente **va a poder leer y modificar archivos de la carpeta de trabajo** que le indiques.
- También **va a poder ejecutar comandos** en tu ordenador, dentro de los límites que le pongamos.
- Hay opciones de **permisos**: se puede limitar a solo leer, a escribir únicamente en la carpeta de trabajo, o darle acceso total; y por defecto **te pregunta antes** de hacer cosas sensibles. Lo veremos en el seminario.
- Aun así, **esas barreras reducen el riesgo, pero no lo eliminan**. No son una garantía de aislamiento.
- Por eso: **haz copia de seguridad de todo lo que uses en la práctica** y **no uses documentos confidenciales ni datos de clientes**.

Nos vemos el **[día]**. Si tienes cualquier duda, escríbeme sin problema.

Un saludo,
**[nombre del instructor]**

---

# Parte B — Guía de instalación paso a paso

Para usar durante el seminario. Sigue los pasos en orden. Si algo falla, no pasa nada: repite el paso y, si sigue fallando, avisa.

## Paso 0. Qué es «la terminal» (en una frase)

La **terminal** es una ventana donde escribes órdenes en texto en lugar de hacer clic en botones. Se usa porque muchas herramientas se arrancan escribiendo un comando. No hay que saber nada más que lo que pone aquí.

## Paso 1. Abrir la terminal

**En Windows:**

1. Pulsa la tecla **Windows** o haz clic en **Inicio**.
2. Escribe `PowerShell` (o `Terminal`).
3. Haz clic en el resultado para abrirla.
4. Se abre una ventana con fondo oscuro y un texto que acaba en `>`. Ese texto se llama **indicador** y significa «escríbeme».

**En macOS:**

1. Pulsa **Cmd + Espacio** para abrir Spotlight.
2. Escribe `Terminal`.
3. Pulsa **Intro** para abrirla.
4. Se abre una ventana con fondo blanco o negro y un texto que acaba en `$` o `%`.

## Paso 2. Comprobar que Node.js está instalado

1. En la terminal, escribe:

   ```
   node -v
   ```

   Pulsa **Intro**.
2. Debe aparecer un número de versión (algo como `v22.` seguido de más números). **Si aparece el número, Node.js está listo.**
3. Si en su lugar sale un mensaje diciendo que el comando no se reconoce o no se encuentra, Node.js **no está instalado** o la terminal es antigua:
   - Cierra la terminal.
   - Instala Node.js desde la web oficial eligiendo la versión **LTS**.
   - Vuelve a abrir la terminal y repite `node -v`.

## Paso 3. Arrancar el harness

1. Decide desde qué **carpeta** vas a lanzarlo. Esa carpeta será el **espacio de trabajo propuesto** por defecto, así que lo más cómodo es situarse en la carpeta de práctica.
2. Escribe el comando:

   ```
   npx @deepseek-ai/dsh web
   ```

3. Pulsa **Intro**.
4. **La primera vez tarda**: está descargando la herramienta. Verás movimiento en pantalla. Espera.
5. Cuando termina, **se abre sola una pestaña del navegador** con la interfaz.

## Paso 4. Elegir el espacio de trabajo (el primer tropiezo)

Este es el punto donde casi todo el mundo se atasca, así que ve con calma.

1. En la interfaz, busca el botón **«Elegir espacio de trabajo»** (Choose workspace).
2. Pulsa **añadir** y selecciona la **carpeta del proyecto** con la que quieras trabajar.
3. Selecciona esa carpeta para dejarla activa.
4. **Importante:** hasta que no elijas un espacio de trabajo, **el cuadro donde se escriben los mensajes está deshabilitado**. No es un fallo: es que el agente todavía no sabe en qué carpeta trabajar.

## Paso 5. Configurar el modelo y la clave de API

1. Abre **Ajustes** (Settings).
2. Entra en **Modelos** (Models).
3. Introduce tu **clave de API de DeepSeek**.
4. **Guarda**.
5. No hace falta reiniciar nada: queda usable al momento.

## Paso 6. Primer mensaje de prueba

1. Comprueba que el **cuadro de mensajes está habilitado** (si no lo está, vuelve al Paso 4).
2. Escribe algo sencillo y sin riesgo, por ejemplo: *«Dime qué archivos hay en esta carpeta y resúmelos»*.
3. Envía y observa qué pasa. Si el agente pide permiso para algo, decide tú si lo autorizas.

## Paso 7. Parar el harness

- **Opción 1:** cierra la ventana de la terminal.
- **Opción 2:** haz clic en la terminal y pulsa **Ctrl + C**.

Cerrar solo la pestaña del navegador **no** para el servidor.

## Paso 8. Volver a arrancarlo si se cerró

1. Abre la terminal.
2. Vuelve a escribir:

   ```
   npx @deepseek-ai/dsh web
   ```

3. Pulsa **Intro**. La segunda vez arranca mucho más rápido, porque ya está descargado.
4. Si el navegador no se abre solo, entra en **http://127.0.0.1:3080**.

## Cómo saber que está funcionando

- En la terminal aparece la **dirección local** (`127.0.0.1:3080`).
- El navegador muestra la **interfaz** del harness.
- Puedes **escribir en el cuadro de mensajes** (después de elegir espacio de trabajo).
- Si el agente responde, el modelo está bien configurado.

Con esos cuatro puntos, todo está en orden.

## Qué significa lo que ves en pantalla

Al arrancar aparecen varias líneas que asustan a quien no está acostumbrado. Traducción al lenguaje llano:

| Lo que ves | Qué significa de verdad |
|---|---|
| Líneas que van apareciendo al principio | Está **descargando** la herramienta porque es la primera vez. Es normal, solo pasa la primera vez. |
| Avisos y mensajes de advertencia | Suelen ser **informativos**. No son errores y no hay que hacer nada. |
| La dirección `http://127.0.0.1:3080` | Es la **dirección local**: `127.0.0.1` significa «este mismo ordenador». Es la página que acabas de abrir. |
| La terminal se queda «parada», sin devolverte el indicador | Es lo correcto: el servidor está **funcionando** y ocupando esa ventana. |
| Aparece un texto en rojo | Puede ser un error real, pero normalmente dice **qué falta**. Cópialo y avisa. |

**Idea clave:** mientras la terminal esté ocupada con el servidor, no puedes escribir otros comandos ahí. Abre otra ventana de terminal si necesitas una.

## Alternativa: instalación permanente

En lugar de usar `npx` cada vez, puedes instalar la herramienta en el ordenador:

1. Escribe:

   ```
   npm install -g @deepseek-ai/dsh
   ```

2. Pulsa **Intro** y espera a que termine.
3. A partir de ahí, para arrancar basta con:

   ```
   dsh web
   ```

**Diferencias entre las dos formas:**

- Con **`npx @deepseek-ai/dsh web`** no instalas nada de forma permanente: se descarga y se ejecuta cuando lo pides. Es lo recomendado para el seminario, porque no toca tu sistema.
- Con **`npm install -g`** la instalación se queda en el ordenador, así que arrancar después es más rápido y el comando es más corto (`dsh web`). A cambio, actualizarla luego es cosa tuya.
- En un equipo **ajeno o prestado**, usa `npx`.

## Verificación final antes de seguir

Confirma estos seis puntos antes de continuar con la práctica:

- [ ] **Node.js presente**: `node -v` muestra un número de versión.
- [ ] **Servidor arrancado**: el comando ha terminado y la terminal está ocupada con el servidor.
- [ ] **Interfaz abierta**: ves la interfaz en el navegador, en http://127.0.0.1:3080.
- [ ] **Clave de API guardada**: Ajustes → Modelos, con la clave introducida y guardada.
- [ ] **Espacio de trabajo elegido**: has añadido y seleccionado tu carpeta.
- [ ] **Cuadro de mensajes habilitado**: puedes escribir y enviar.

Si los seis están marcados, estás listo. Si falla el quinto, es el tropiezo habitual: vuelve al Paso 4.

---

# Parte C — Lista de comprobación del instructor

## El día anterior

| Tarea | Hecho | Notas |
|---|---|---|
| Confirmar asistentes y la versión de sistema operativo de cada uno (Windows o macOS) | ☐ | Saber cuántos son de cada sistema cambia las explicaciones. |
| Enviar el mensaje de la Parte A a todos los asistentes | ☐ | Idealmente 3-5 días antes; nunca más tarde del día anterior. |
| Preparar una carpeta de práctica de ejemplo, con archivos de prueba y sin datos sensibles | ☐ | Textos, notas y algún documento sin información real. |
| Hacer una copia de seguridad de esa carpeta | ☐ | Es la red de seguridad si el agente modifica algo en la demo. |
| Comprobar la red de la sala y si hay proxy o cortafuegos corporativo | ☐ | Un proxy puede impedir la descarga inicial de la herramienta. |
| Reservar y probar el puerto **3080** en el equipo del instructor | ☐ | Si está ocupado por otro programa, el arranque falla. |
| Tener una clave de API propia de reserva para las demos | ☐ | Evita que una demo dependa de la clave de un alumno. |
| Preparar el plan B sin conexión: capturas de pantalla o un vídeo corto | ☐ | Cubre el caso de que la red de la sala falle. |
| Preparar la encuesta de satisfacción (enlace o papel) | ☐ | Mejor tenerla lista que improvisarla al final. |

## El día del seminario

| Tarea | Hecho | Notas |
|---|---|---|
| Probar la demo completa de principio a fin en el equipo que se va a usar | ☐ | Con la clave de reserva, no con la tuya personal. |
| Llevar alargadores y regletas | ☐ | Los portátiles no aguantan 3 horas sin corriente. |
| Comprobar el proyector y el tamaño de letra | ☐ | Sube el tamaño: en la terminal pequeña nadie lee nada. |
| Tener el material y los ejercicios en la nube o en un pendrive | ☐ | Dos vías, no una. |
| Decidir qué hacer con quien no consiga arrancar: emparejarlo con alguien que sí | ☐ | No dejar a nadie parado media hora mirando la pantalla. |

## Plan B: si la sala se cae

Ordenado de menos a más grave. Se aplica el primero que resuelva el problema:

1. **Un alumno no arranca, los demás sí.** Se le empareja con un compañero que ya lo tiene funcionando y sigue mirando por encima del hombro. Tú no te paras.
2. **La red de la sala falla o va muy lenta.** Se pasa a **demo guiada por el instructor**: tú haces los pasos en tu equipo y el grupo sigue y pregunta; la práctica se hace después en casa.
3. **Nadie consigue arrancar** (red caída, proxy, cortafuegos). Se usa el **plan B sin conexión**: capturas o el vídeo preparado, y se dedica el tiempo a entender **qué es un harness**, sus permisos, sus herramientas y el MCP.
4. **Fallo total** (sin proyector, sin red, sin equipos). Se convierte en **sesión de conceptos**: qué cambia entre un chat y un agente, qué son los permisos y los modos de sandbox, y qué se conecta con MCP. La instalación y la práctica quedan como **tarea para casa**, con el mensaje de la Parte A y esta guía.
