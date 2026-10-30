# Preparación previa y logística — Seminario «Del chat al agente: qué es un harness y cómo se usa»

Este documento tiene **tres partes** y cada una es para un público distinto:

- **Parte A** — Mensaje listo para copiar y enviar a los alumnos 3-5 días antes.
- **Parte B** — Guía de instalación paso a paso, para tener a mano durante el seminario.
- **Parte C** — Lista de comprobación del instructor (día anterior y día del seminario).

La herramienta del seminario es **opencode**, un agente de código abierto con interfaz web en español. Funciona con **modelos gratuitos incluidos**: no hace falta cuenta ni clave de API.
Un **harness** es la pieza que convierte un chat en un agente: le da herramientas, permisos, memoria y una carpeta de trabajo.
Quien ya paga Claude Code o Codex puede usarlos en su lugar (carril B, ver `carriles_alumno.md`); este documento sigue el carril A, el gratuito.

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

Vas a necesitar **Node.js** instalado. Es el programa con el que se instala la herramienta.
**No necesitas cuenta ni clave de API**: los modelos gratuitos vienen incluidos.

**En Windows:**

1. Entra en la web oficial de Node.js, [nodejs.org](https://nodejs.org/), y descarga el instalador para Windows.
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

### 2. Instala opencode

1. En la terminal, escribe este comando y pulsa **Intro**:

   ```
   npm install -g opencode-ai@1.19.5
   ```

2. Espera a que termine (unos segundos o un par de minutos).
3. Cierra la terminal, ábrela otra vez y escribe `opencode --version`. Debe aparecer un número de versión.
4. **Si en Windows sale un error rojo** sobre la ejecución de scripts, usa el **Símbolo del sistema** (`cmd`), la terminal clásica de Windows. En un ordenador personal, PowerShell trae bloqueados de serie scripts como el que instala opencode, y `cmd` no los necesita. **Si es un equipo gestionado por tu empresa o universidad** y te impide instalar o ejecutar programas, no intentes saltarte esa restricción: consulta con soporte informático, usa un equipo personal o sigue las prácticas en pareja.

> Los modelos gratuitos **no son privados**: lo que el agente lee de tu carpeta se envía al proveedor del modelo, y algunos usan esos datos para mejorar. Por eso solo trabajaremos con archivos de práctica, nunca con datos reales.

### 3. Comprobación final: arranca opencode y ciérralo

Hazlo tú solo antes de venir. Sirve para confirmar que todo está en su sitio y para que no sea la primera vez delante del grupo.

1. Abre la terminal (los pasos de arriba).
2. Escribe este comando y pulsa **Intro**:

   ```
   opencode web
   ```

3. **La interfaz se abre sola en tu navegador.**
4. Si no se abre sola, copia en el navegador la dirección que aparece en la terminal (algo como **http://127.0.0.1:4096**) y pulsa Intro.
5. **Para apagarlo**, pulsa **Ctrl + C** en la terminal. Si cierras la ventana de la terminal, el agente también se apaga.
   Si cierras solo la pestaña del navegador, opencode **sigue funcionando** en segundo plano.

### Qué traer

- **Portátil con su cargador** (el seminario es práctico, no hay equipos de sobra).
- **Permisos de administrador** en el portátil, por si hay que instalar algo.
- **Una carpeta con archivos de ejemplo** con los que practicar: notas, textos, hojas de cálculo, algún PDF… con contenido ficticio o sin importancia.
- **Sin datos confidenciales** en esa carpeta. Nada de documentos de clientes, nóminas, historiales médicos ni cosas parecidas.
- Si puedes, **una copia de seguridad** de la carpeta de práctica (una copia en el pendrive o en la nube).

### Si algo no funciona

- **Respira: es lo más normal del mundo.** Un mensaje de error en la terminal casi nunca significa que hayas roto nada; significa que falta un paso o que hay que repetirlo.
- **Casi todo se arregla cerrando la terminal y volviendo a abrirla.** Si `node`, `npm` u `opencode` no se reconocen, suele ser que no quedaron bien instalados o que la terminal es la de antes de instalarlos.
- **La página no carga:** comprueba que la terminal sigue abierta y copia exactamente la dirección que aparece en ella.
- **No te quedes atascado en silencio.** Escríbeme antes del seminario con lo que ves en pantalla (una foto o el texto del error vale) y lo miramos entre los dos. Es mucho mejor resolverlo por correo que perder la primera media hora del taller.

### Aviso importante sobre seguridad (léelo, en serio)

El agente es una herramienta nueva y potente. Eso tiene consecuencias prácticas:

- El agente **va a poder leer y modificar archivos de la carpeta de trabajo** que le indiques.
- También **va a poder ejecutar comandos** en tu ordenador.
- Hay **permisos**: de serie, dentro del proyecto puede actuar sin preguntar, y fuera del proyecto **te pregunta antes**. Se pueden endurecer en un archivo de configuración. Lo veremos en el seminario.
- Aun así, **opencode no tiene sandbox**: los permisos reducen el riesgo, pero no aíslan el agente del resto del ordenador.
- **Gratis no es privado**: los modelos gratuitos reciben el contenido que el agente lee.
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
2. Debe aparecer un número de versión (algo como `v24.` seguido de más números; sirve cualquier versión 22 o superior). **Si aparece el número, Node.js está listo.**
3. Si en su lugar sale un mensaje diciendo que el comando no se reconoce o no se encuentra, Node.js **no está instalado** o la terminal es antigua:
   - Cierra la terminal.
   - Instala Node.js desde [nodejs.org](https://nodejs.org/) eligiendo la versión **LTS**.
   - Vuelve a abrir la terminal y repite `node -v`.

## Paso 3. Instalar opencode

1. Escribe el comando:

   ```
   npm install -g opencode-ai@1.19.5
   ```

2. Pulsa **Intro** y espera a que termine.
3. Cierra la terminal y ábrela otra vez.
4. Comprueba la instalación:

   ```
   opencode --version
   ```

   Debe aparecer un número de versión (por ejemplo `1.19.5`).
5. Si en Windows PowerShell bloquea la ejecución de scripts, usa **cmd** (Símbolo del sistema). En un equipo gestionado que lo impida, no lo esquives: consulta con soporte informático.

## Paso 4. Arrancar opencode

1. Sitúate en la **carpeta de práctica** (por ejemplo, `cd Documents\practica_agente`; en macOS, `cd ~/Documents/practica_agente`).
2. Escribe el comando:

   ```
   opencode web
   ```

3. Pulsa **Intro**.
4. **Se abre sola una pestaña del navegador** con la interfaz. Si no, copia la dirección que aparece en la terminal (algo como `http://127.0.0.1:4096`).

## Paso 5. Añadir el proyecto y abrir una sesión

Este es el punto donde conviene ir con calma.

1. En la interfaz, pulsa **«Añadir proyecto»**.
2. Escribe `Documents/practica_agente` y confirma.
3. Pulsa **«Nueva sesión»**.
4. No hay clave que introducir ni ajustes que tocar: la herramienta ya trae modelos gratuitos.

## Paso 6. Elegir un modelo gratuito

1. Bajo el cuadro de mensajes, pulsa el modelo y elige **«Seleccionar modelo»**.
2. Los gratuitos aparecen marcados como **«Gratis»**.
3. Recomendados: **GLM-5.3-Flash** o **DeepSeek V4.1 Flash**, que no guardan los datos.
4. **Big Pickle, MiMo, Nemotron y Flint** pueden usar los datos para mejorar sus modelos: evítalos o úsalos solo con datos que no importen.
5. Los modelos gratuitos son **por tiempo limitado** y cambian: puede que la lista no coincida con esta.

## Paso 7. Primer mensaje de prueba

1. Escribe algo sencillo y sin riesgo, por ejemplo: *«Dime qué archivos hay en esta carpeta y resúmelos»*.
2. Envía y observa qué pasa.
3. Si aparece **«Permiso requerido»**, decide tú: **Denegar**, **Permitir siempre** o **Permitir una vez**. Si dudas, **Permitir una vez**.

## Paso 8. Apagar opencode

- **Opción 1:** haz clic en la terminal y pulsa **Ctrl + C**.
- **Opción 2:** cierra la ventana de la terminal (el agente se apaga).

Cerrar solo la pestaña del navegador **no** lo apaga.

## Paso 9. Volver a arrancarlo si se cerró

1. Abre la terminal y entra en la carpeta de práctica.
2. Escribe de nuevo `opencode web` y pulsa **Intro**.
3. Si el navegador no se abre solo, copia la dirección que aparece en la terminal.

## Cómo saber que está funcionando

- En la terminal aparece la **dirección local** (por ejemplo `127.0.0.1:4096`).
- El navegador muestra la **interfaz** de opencode.
- Tienes el proyecto añadido y puedes **escribir en el cuadro de mensajes**.
- Si el agente responde, el modelo funciona.

Con esos cuatro puntos, todo está en orden.

## Qué significa lo que ves en pantalla

Al arrancar aparecen líneas que asustan a quien no está acostumbrado. Traducción al lenguaje llano:

| Lo que ves | Qué significa de verdad |
|---|---|
| Líneas que van apareciendo durante `npm install` | Está **instalando** la herramienta. Es normal, solo pasa una vez. |
| Avisos y mensajes de advertencia | Suelen ser **informativos**. No son errores y no hay que hacer nada. |
| La dirección `http://127.0.0.1:4096` | Es la **dirección local**: `127.0.0.1` significa «este mismo ordenador». Es la página que acabas de abrir. |
| La terminal se queda «parada», sin devolverte el indicador | Es lo correcto: el servidor está **funcionando** y ocupando esa ventana. |
| Aparece un texto en rojo | Puede ser un error real, pero normalmente dice **qué falta**. Cópialo y avisa. |
| Un cuadro «Permiso requerido» | El agente quiere hacer algo fuera de lo permitido de serie. Tú decides. |

**Idea clave:** mientras la terminal esté ocupada con el servidor, no puedes escribir otros comandos ahí. Abre otra ventana de terminal si necesitas una.

## Configuración que conviene conocer

- **Permisos.** De serie, dentro del proyecto todo está permitido sin preguntar; fuera del proyecto pregunta. Se cambia en `opencode.json`, en la raíz del proyecto, con `permission.edit`, `bash` y `external_directory` (valores `allow`, `ask` o `deny`). **Se lee al arrancar**: hay que reiniciar opencode tras cambiarlo.
- **Skills (procedimientos guardados).** Van en `.opencode/skills/<nombre>/SKILL.md` y se cargan al arrancar.
- **Configuración global.** En Windows, `C:\Users\<usuario>\.config\opencode`.
- **Sin sandbox.** opencode no aísla al agente del resto del ordenador.
- **Documentación:** https://opencode.ai/docs (también /docs/permissions, /docs/web, /docs/zen y /docs/skills). Código: https://github.com/anomalyco/opencode.

Para quitar opencode más adelante: `npm uninstall -g opencode-ai`.

## Verificación final antes de seguir

Confirma estos puntos antes de continuar con la práctica:

- [ ] **Node.js presente**: `node -v` muestra un número de versión.
- [ ] **opencode instalado**: `opencode --version` muestra un número de versión.
- [ ] **Servidor arrancado**: `opencode web` ha abierto la interfaz en el navegador y la terminal está ocupada.
- [ ] **Proyecto añadido**: `Documents/practica_agente` aparece en «Añadir proyecto» y tienes una sesión nueva.
- [ ] **Modelo gratuito elegido**: uno marcado «Gratis», de preferencia GLM-5.3-Flash o DeepSeek V4.1 Flash.
- [ ] **El agente responde** a un primer mensaje.

Si los seis están marcados, estás listo. Si falla el cuarto, vuelve al Paso 5.

---

# Parte C — Lista de comprobación del instructor

## El día anterior

| Tarea | Hecho | Notas |
|---|---|---|
| Confirmar asistentes y la versión de sistema operativo de cada uno (Windows o macOS) | ☐ | Saber cuántos son de cada sistema cambia las explicaciones. |
| Enviar el mensaje de la Parte A a todos los asistentes | ☐ | Idealmente 3-5 días antes; nunca más tarde del día anterior. |
| Preparar una carpeta de práctica de ejemplo, con archivos de prueba y sin datos sensibles | ☐ | Textos, notas y algún documento sin información real. |
| Hacer una copia de seguridad de esa carpeta | ☐ | Es la red de seguridad si el agente modifica algo en la demo. |
| Comprobar la red de la sala y si hay proxy o cortafuegos corporativo | ☐ | Un proxy puede impedir `npm install` y la conexión con los modelos. |
| Probar `opencode web` en el equipo del instructor y anotar la dirección que muestra | ☐ | Si el arranque falla, reinicia o revisa la dirección que aparece en la terminal. |
| Comprobar que los modelos gratuitos recomendados siguen disponibles | ☐ | Son «por tiempo limitado» y cambian: la lista puede haber variado desde que se escribió el material. |
| Preparar el plan B sin conexión: capturas de pantalla o un vídeo corto | ☐ | Cubre el caso de que la red de la sala falle. |
| Preparar la encuesta de satisfacción (enlace o papel) | ☐ | Mejor tenerla lista que improvisarla al final. |

## El día del seminario

| Tarea | Hecho | Notas |
|---|---|---|
| Probar la demo completa de principio a fin en el equipo que se va a usar | ☐ | Con un modelo gratuito que no guarde datos, y con la carpeta de práctica. |
| Llevar alargadores y regletas | ☐ | Los portátiles no aguantan 3 horas sin corriente. |
| Comprobar el proyector y el tamaño de letra | ☐ | Sube el tamaño: en la terminal pequeña nadie lee nada. |
| Tener el material y los ejercicios en la nube o en un pendrive | ☐ | Dos vías, no una. |
| Decidir qué hacer con quien no consiga arrancar: emparejarlo con alguien que sí | ☐ | No dejar a nadie parado media hora mirando la pantalla. |
| Recordar al grupo que «gratis no es privado» | ☐ | Solo datos de práctica; modelos que no guardan datos. |

## Plan B: si la sala se cae

Ordenado de menos a más grave. Se aplica el primero que resuelva el problema:

1. **Un alumno no arranca, los demás sí.** Se le empareja con un compañero que ya lo tiene funcionando y sigue mirando por encima del hombro. Tú no te paras.
2. **La red de la sala falla o va muy lenta.** Se pasa a **demo guiada por el instructor**: tú haces los pasos en tu equipo y el grupo sigue y pregunta; la práctica se hace después en casa.
3. **Nadie consigue arrancar** (red caída, proxy, cortafuegos). Se usa el **plan B sin conexión**: capturas o el vídeo preparado, y se dedica el tiempo a entender **qué es un harness**, sus permisos y sus herramientas.
4. **Fallo total** (sin proyector, sin red, sin equipos). Se convierte en **sesión de conceptos**: qué cambia entre un chat y un agente, qué son los permisos y por qué opencode no tiene sandbox. La instalación y la práctica quedan como **tarea para casa**, con el mensaje de la Parte A y esta guía.
