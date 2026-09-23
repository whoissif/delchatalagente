---
marp: true
theme: default
paginate: true
size: 16:9
header: 'Del chat al agente'
---

<!-- _class: lead -->

# Del chat al agente
## Qué es un harness y cómo se usa

**Seminario práctico · 150 minutos**

Instructor/a: ______________________

<!--
PORTADA — minuto 0 (1 min)
Presentarse en un minuto y decir a qué te dedicas con los agentes. Que se note que lo usas, no que lo has leído.
Decir en voz alta: «Hoy no vamos a programar. Vamos a aprender a dirigir a alguien que trabaja muy rápido.»
Logística antes de empezar: regletas y alargadores repartidos, y recordar que cada alumno trabaja en su portátil.
-->

---

# Agenda

| # | Bloque | Min. |
|---|---|---|
| 0 | Bienvenida, diagnóstico y promesa | 8 |
| 1 | Del chat al agente | 17 |
| 2 | Anatomía de un harness | 20 |
| 3 | Práctica 1 — Primer arranque y primer encargo | 20 |
| — | **Descanso** | 10 |
| 4 | Permisos, sandbox y aprobaciones | 30 |
| 5 | Herramientas, contexto y memoria | 22 |
| 6 | Práctica 5 — Encargo integrador | 13 |
| 7 | Cierre, límites y evaluación | 10 |

<!--
AGENDA (2 min, dentro del bloque 0)
Recorrer la tabla de un vistazo, sin explicar cada bloque.
Decir: «El bloque 4 es el corazón del seminario. Si vamos mal de tiempo, recorto de cualquier sitio menos de ahí.»
Avisar del descanso a mitad de camino para que nadie se organice mal.
-->

---

# Datos verificados

**Requisito previo:** Node.js instalado.

**Arranque:** `npx @deepseek-ai/dsh web`

**Alternativa instalada:** `npm install -g @deepseek-ai/dsh` y luego `dsh web`

**Interfaz web:** `http://127.0.0.1:3080` — con `--no-open` arranca sin abrir el navegador.

**Modelo:** Ajustes (Settings) → Modelos (Models) → clave de API de DeepSeek (se obtiene en https://platform.deepseek.com/) → guardar.

**Espacio de trabajo:** botón «Elegir espacio de trabajo» (Choose workspace).

<!--
FICHA DE REFERENCIA — consultar cuando haga falta
Esta diapositiva se puede recuperar en cualquier momento con las flechas del teclado. Es la chuleta de los cuatro datos que todo el mundo va a necesitar.
No dictar la URL entera: está proyectada y en el documento del laboratorio, `03_laboratorio.md`.
Insistir en una sola cosa aquí: la clave de API se obtiene en la web de DeepSeek y se guarda en Ajustes, no se escribe en el cuadro de mensajes.
-->

---

<!-- _class: lead -->

# Bloque 0
## Bienvenida, diagnóstico y promesa

**8 minutos · charla**

<!--
SECCIÓN. Objetivo del bloque: bajar la ansiedad, saber de dónde parte el grupo y dejar claro qué se llevan.
-->

---

# Diagnóstico: tres preguntas

A mano alzada, rápidas, sin comentar las respuestas:

1. ¿Quién usa un chat de IA a diario?
2. ¿Quién ha pedido algo y ha acabado haciéndolo él mismo porque el chat solo te decía cómo?
3. ¿Quién ha oído hablar de agentes y no tiene claro qué son?

**La tercera levanta casi todas las manos.**

<!--
BLOQUE 0 — (2 min)
Lanzar las tres preguntas seguidas, sin dejar que se alargue la conversación.
Cuando se levanten casi todas las manos en la tercera, decir literalmente: «Perfecto. Ese es exactamente el punto de partida de hoy, y en tres horas esto va a estar claro.»
No corregir a nadie ni entrar en definiciones: eso es el bloque 1.
-->

---

# La promesa

Al terminar el seminario:

1. Sabrás **qué es un harness**.
2. Lo habrás **arrancado en tu propio portátil**.
3. Sabrás **qué permisos estás dando y por qué**.
4. Sabrás **qué no conviene dejarle hacer**.

<!--
BLOQUE 0 — (2 min)
Enumerar los cuatro puntos despacio y decir: «Esto es lo que os lleváis. Si al final del día sabéis decir estas cuatro cosas, el seminario ha funcionado.»
El punto 3 es el que más valor tiene: anticipa el bloque 4 sin explicarlo todavía.
-->

---

# Lo que NO vamos a hacer

- No vamos a programar.
- No vamos a entrenar modelos.
- No hace falta saber nada de informática más allá de usar el navegador y crear una carpeta.

**Reparto del cuestionario inicial (`06_evaluacion.md`).** No se puntúa.

<!--
BLOQUE 0 — (3 min, incluye el cuestionario)
Decir literalmente: «Esto no es un examen, es para que yo sepa por dónde empezar. Si no sabes una respuesta, escribe "no lo sé" y ya está.»
Repartir el cuestionario y dar tres minutos. Mientras rellenan, circular y mirar por encima: las respuestas te dicen por dónde arrancar el bloque 1.
-->

---

# Regla de la sala

**«Si te atascas más de tres minutos, levanta la mano. No hay nada que me haga perder más tiempo que diez personas atascadas en silencio.»**

✅ Señal de que ha funcionado: alguien dice en voz alta que no entiende la diferencia entre chat y agente.

<!--
BLOQUE 0 — (1 min)
Decir la regla casi literal, es la norma más útil de toda la sesión.
Si nadie formula la duda de chat frente a agente, provocarla tú: «¿Alguien me sabe decir la diferencia?» y usar la respuesta para abrir el bloque 1.
-->

---

<!-- _class: lead -->

# Bloque 1
## Del chat al agente

**17 minutos · charla**

<!--
SECCIÓN. Objetivo del bloque: que entiendan el cambio de fondo, no la jerga.
-->

---

# Punto de partida: lo que ya sabéis hacer

Escribes una pregunta, te llega una respuesta de texto.

Y **tú** haces lo que haga falta con ella: copias, pegas, abres el archivo, cambias el dato.

**El chat aconseja; el trabajo lo pones tú.**

<!--
BLOQUE 1 — (2 min)
Empezar por lo que ya saben, para que nadie se sienta fuera de lugar.
Frase de cierre de la diapositiva, despacio: «El chat aconseja; el trabajo lo ponen ustedes.»
-->

---

# La analogía que sostiene todo el seminario

**Un chat es un consultor por teléfono: te dice qué hacer y lo haces tú.**

**Un agente es un becario con acceso a tu ordenador: lo hace y tú revisas.**

Ambas frases quedan escritas en la pizarra.

<!--
BLOQUE 1 — (2 min) MOMENTO CLAVE
Di las dos mitades despacio y déjalas escritas en la pizarra. Vas a volver a esta frase cuatro veces más a lo largo del día.
Si alguien pregunta por qué «becario»: porque hay que revisarle el trabajo. Esa es exactamente la idea.
-->

---

# Tres diferencias, y solo tres

1. **Tiene herramientas.** Lee y escribe archivos, ejecuta comandos, busca en internet. No solo habla: toca cosas.
2. **Trabaja en bucle.** Da un paso, mira qué ha pasado, decide el siguiente. Diez pasos, cincuenta, los que hagan falta.
3. **Produce efectos reales.** Al terminar hay archivos cambiados en tu ordenador. No es una conversación, es un trabajo hecho.

<!--
BLOQUE 1 — (3 min)
La tercera diferencia es la importante y la peligrosa: subrayarla con la voz, no con más texto.
Comprobación de comprensión: preguntar a una persona concreta, no al aire: «Si le pido a un agente que me organice las fotos del móvil, ¿qué hace exactamente?»
Buscar que diga: mira los archivos, decide, mueve cosas. Si responde «me explica cómo hacerlo», volver a la analogía del teléfono.
-->

---

# El modelo y el harness

**El modelo es el motor.**

**El harness es el coche completo: el volante, los frenos, el salpicadero y las ruedas.**

El motor solo no te lleva a ningún sitio.

<!--
BLOQUE 1 — (3 min)
Aquí está la palabra del título del seminario. Decirla y dejar que repose: «El motor solo no te lleva a ningún sitio.»
Anticipar la consecuencia: un chat también es un coche, pero uno muy sencillo, motor y un volante, y nada más. Un agente es un coche con frenos, espejos y cinturón.
-->

---

# El informe de veinte páginas

| Con un chat | Con un agente |
|---|---|
| Abres el documento y copias el texto | «Resume el informe que está en esta carpeta» |
| Lo pegas en el chat: «resúmeme esto» | Abre el archivo y lo lee |
| Copias el resumen | Escribe el resumen en un archivo nuevo |
| Lo pegas en otro archivo | Te dice dónde lo ha dejado |
| **Cuatro pasos tuyos** | **Cero pasos tuyos, y un archivo nuevo** |

<!--
BLOQUE 1 — (3 min)
Pedir al grupo que imaginen un informe de veinte páginas en su escritorio antes de leer la tabla.
Recorrer la columna de la izquierda contando los pasos con los dedos. Luego la derecha, y callarse dos segundos.
-->

---

# La consecuencia incómoda

**Un agente es como un becario muy motivado que trabaja a gran velocidad y no sabe lo que no sabe.**

⚠️ Hará lo que le pidas con una seguridad total, aunque se esté equivocando. Y si le has pedido algo mal, hará mal la cosa mala, rapidísimo.

De ahí salen los frenos. De ahí sale el bloque más importante de hoy.

<!--
BLOQUE 1 — (2 min)
No endulzar esto. Es la bisagra que justifica todo el bloque 4.
Si alguien pregunta «¿y si se equivoca?», responder: «Exacto. Guarda esa pregunta, la contesto dentro de veinte minutos y es la parte más útil del seminario.»
-->

---

<!-- _class: lead -->

# Bloque 2
## Anatomía de un harness

**20 minutos · charla + demo**

<!--
SECCIÓN. Objetivo: que sepan nombrar las piezas. Sin esto, los permisos del bloque 4 son magia.
-->

---

# Las seis piezas

| Pieza | Qué es, en palabras llanas |
|---|---|
| **Modelo** | El motor. El que «piensa» y decide. |
| **Herramientas** | Las manos. Lo que puede hacer de verdad. |
| **Bucle** | El ritmo de trabajo: piensa, actúa, mira el resultado, repite. |
| **Contexto** | La mesa de trabajo. Todo lo que tiene delante ahora mismo. |
| **Permisos** | Los frenos. Qué puede hacer sin preguntar y qué no. |
| **Interfaz** | El salpicadero. Donde tú ves lo que está pasando. |

<!--
BLOQUE 2 — (4 min)
Decir: «Un harness tiene seis piezas. Las vais a reconocer todas en la pantalla dentro de un rato.»
No explicar cada una aquí: el bloque desarrolla las cuatro que más importan.
-->

---

# El bucle, despacio

**Piensa, actúa, observa, repite.** Cien veces si hace falta.

**El modelo no ejecuta nada. El modelo propone.**

Piensa «para resumir este informe tengo que leerlo» y pide al harness que lea el archivo. El harness lo lee y le devuelve el contenido. El modelo piensa el resumen y pide que se escriba un archivo nuevo.

<!--
BLOQUE 2 — (4 min). Es lo que más se malinterpreta: ir despacio.
Recorrer el ejemplo con las manos: el modelo propone, el harness ejecuta, el resultado vuelve al modelo.
-->

---

# El harness está en medio de todo

Es quien decide **qué se le permite** al modelo.

Y es quien **ejecuta**.

El modelo no es el que toca tu ordenador: el que toca tu ordenador es el harness, siguiendo las órdenes de un modelo que nunca ve tu disco, salvo por lo que el harness le enseña.

<!--
BLOQUE 2 — (3 min)
Frase para verbalizar: «El que toca vuestro ordenador es el harness, no el modelo. Por eso el harness es lo que configuráis vosotros.»
Esta idea es la que hace comprensibles los permisos del bloque 4.
-->

---

# Las herramientas

No hace falta memorizar la lista. Hace falta saber que existe y saber mirarla.

- Leer archivos del espacio de trabajo.
- Escribir y modificar archivos.
- Ejecutar comandos en la terminal.
- Buscar y leer en internet.
- Lanzar tareas en segundo plano, preguntarte a ti, delegar en otro agente, llevar una lista de tareas.

<!--
BLOQUE 2 — (3 min)
Adelantar aquí, en una frase, que la terminal es la herramienta más potente y la que más respeto merece. Se desarrolla en el bloque 5.
-->

---

# El contexto: la mesa de trabajo

Imagina una mesa. Todo lo que el agente sabe ahora mismo está encima: tu petición, los archivos que ha leído, lo que ha averiguado.

La mesa tiene un tamaño limitado. Cuando se llena, se resume lo importante y se tira el resto.

⚠️ En tareas muy largas, el agente puede «olvidar» detalles del principio. No es que sea tonto: ya no están en la mesa.

<!--
BLOQUE 2 — (3 min)
Usar la imagen física: si tienes una mesa o una pila de papeles a mano, mejor.
Consecuencia práctica que deben llevarse: una tarea larga y enrevesada es mejor partirla en dos sesiones que forzarla en una.
-->

---

# Los permisos, solo el titular

**El becario trabaja dentro de una sala. Dentro hace lo que quiera. Para salir de la sala, te pide permiso.**

Eso es todo por ahora.

Lo vais a provocar vosotros en el bloque 4.

<!--
BLOQUE 2 — (1 min)
No ampliar aquí. Es un titular a propósito: la sala del becario vuelve en el bloque 4, que es el más importante del seminario.
-->

---

# La interfaz: te enseña los pasos

**La interfaz no te enseña solo la respuesta final: te enseña los pasos.**

Cada vez que el agente usa una herramienta, lo ves.

⚠️ Si no miras los pasos, te enteras de los errores cuando ya están hechos.

<!--
BLOQUE 2 — (2 min)
Insistir: es donde más se aprovecha la herramienta. El panel de pasos es tu ventana para darte cuenta de que va por donde no debe.
-->

---

# Demo del instructor

1. Abre el harness en la carpeta de práctica de ejemplo.
2. Pide: «Mira qué hay en esta carpeta y hazme un índice de los archivos, agrupados por tipo, en un archivo llamado `INDICE.md`.»
3. Mientras trabaja, ve señalando: «está mirando qué hay», «ahora está escribiendo el archivo», «está comprobando que se ha escrito bien».
4. Abre el `INDICE.md` delante de todos.

**«Nadie ha copiado ni pegado nada. Mirad la carpeta.»**

<!--
BLOQUE 2 — demo (6-7 min)
Hazlo tú, en pantalla grande, narrando. No lo expliques antes: que lo vean y luego lo comentáis.
Proyector con letra grande: la mitad del grupo no verá una terminal a tamaño normal.
Al terminar, ese es el momento «ajá» del bloque: un archivo que antes no existía.
Señal de que ha funcionado: preguntan por qué usó esa herramienta y no otra. Anota la duda y respóndela en el bloque 5.
-->

---

<!-- _class: lead -->

# Bloque 3
## Práctica 1 — Primer arranque y primer encargo

**20 minutos · práctica**

<!--
SECCIÓN. Objetivo: que cada alumno tenga el harness funcionando y haya completado un encargo de principio a fin.
Ten delante `03_laboratorio.md` y reparte el documento o pide que lo abran.
-->

---

# La secuencia

1. **Demuestra el arranque completo (4 min),** narrando cada paso: abrir la terminal, comprobar Node con `node -v`, arrancar con `npx @deepseek-ai/dsh web`, ver la dirección, abrir el navegador, configurar el modelo en Ajustes → Modelos con la clave de API, elegir el espacio de trabajo, escribir el primer mensaje.
2. **Todos a la vez (12 min).** Tú circulas.
3. **Puesta en común (4 min).** «¿Qué herramientas ha usado vuestro agente para hacer el resumen?»

<!--
BLOQUE 3 — (20 min)
En el paso 2, no te quedes con el primero que levante la mano: los que ya lo tienen, que ayuden al de al lado. Un alumno que explica arranca dos aprendizajes.
En la puesta en común, que nombren ellos las herramientas. Si las dices tú, se pierde el bloque.
Señal de éxito: todos tienen una sesión con al menos un encargo terminado y un archivo nuevo en su carpeta.
-->

---

# Los dos tropiezos que vas a ver seguro

⚠️ **El cuadro de escribir mensajes está deshabilitado.** Casi siempre es que no han elegido espacio de trabajo. Hasta que no eliges espacio de trabajo, el agente no tiene dónde trabajar y no te deja escribir.

**No hay clave de API o no es válida.** Ten la tuya de reserva. **La clave es como la tarjeta del motor: sin ella no arranca, y el uso se paga.**

<!--
BLOQUE 3 — mientras circulas
Antes de tocar nada, pregunta: «¿Has elegido una carpeta de trabajo?»
Ten tu propia clave de API de reserva por si algún alumno no la consigue.
-->

---

# Mientras circulas

Nada de resolver por ellos con las manos en su teclado.

**Señala el botón y deja que lo pulse el alumno.**

**El objetivo es que sepan hacerlo sin ti el lunes.**

<!--
BLOQUE 3 — cierre
Repetir esta frase si te descubres escribiendo tú: «Señalo, no tecleo.»
Si alguien se queda atrás, sigue la chuleta de emergencia: «Sigue conmigo sin arrancar, ahora paso y lo vemos. Mientras, apunta en qué paso se ha quedado.»
-->

---

<!-- _class: lead -->

# Descanso

## 10 minutos

**«Al volver vemos lo más importante de todo: los frenos. Y los vais a tocar vosotros.»**

<!--
DESCANSO (10 min)
Avisa antes de salir: que nadie se vaya pensando que lo bueno ya ha pasado.
Al volver, arrancar el bloque 4 sin repetir el bloque 3.
-->

---

<!-- _class: lead -->

# Bloque 4
## Permisos, sandbox y aprobaciones

**30 minutos · práctica**

<!--
SECCIÓN — EL BLOQUE MÁS IMPORTANTE DEL SEMINARIO
Objetivo: que entiendan, y hayan sentido, qué se le permite al agente y quién decide.
Este bloque es la razón por la que el seminario existe. Los alumnos ya saben que un agente puede hacer cosas. Ahora tienen que aprender a dormir tranquilos mientras las hace.
Si vas mal de tiempo: recorta de cualquier sitio menos de aquí.
-->

---

# Tres conceptos que la gente mezcla

| Concepto | Qué es | Analogía |
|---|---|---|
| **Sandbox** | La zona donde el agente puede moverse: normalmente, la carpeta de trabajo que elegiste. | **La sala donde trabaja el becario.** |
| **Política de permisos** | El ajuste general: qué se permite sin preguntar y qué no. | **El reglamento de la sala.** |
| **Aprobación** | El aviso puntual que aparece cuando algo se sale de lo permitido. | **El «¿seguro?» en la puerta.** |

<!--
BLOQUE 4, parte 1 — (8 min)
Son tres cosas distintas que la gente mezcla siempre. Escríbelas separadas en la pizarra, no solo proyectadas.
Niveles de sandbox que deben reconocer: lectura; escritura limitada al espacio de trabajo; acceso total. Política de aprobaciones por defecto: preguntar.
-->

---

# Tú eliges el tamaño de la sala

**Dentro de la sala, el becario hace lo que quiera. Para salir de la sala, te pide permiso.**

Y la pieza que casi nadie espera: **tú puedes elegir el tamaño de la sala.**

Cuanto más pequeña y más específica sea la carpeta de trabajo, menos avisos y menos riesgo.

🔑 Esa decisión es tuya, y es la más importante que vas a tomar hoy.

<!--
BLOQUE 4, parte 1 — cierre
Repetir la frase de la sala dos veces: es la columna vertebral del bloque.
-->

---

# Práctica 2 — Provocar una aprobación

Que lo hagan todos a la vez, con las instrucciones exactas del laboratorio.

1. Pide al agente algo que se salga de la carpeta de trabajo.
2. Espera el aviso. **No lo apruebes rápido.**
3. Lée el aviso en voz alta.

**El objetivo es ver el aviso y entender qué está pidiendo.**

<!--
BLOQUE 4, parte 2 — (10 min) PRÁCTICA DESTACADA
Cuando aparezca el aviso, para la clase entera y léelo tú en voz alta, antes de que nadie pulse nada.
No dejes que nadie apruebe por curiosidad mientras explicas: primero se entiende, después se decide.
-->

---

# Las tres preguntas

1. **«¿Qué os está pidiendo exactamente?»** Leer un archivo de fuera de la carpeta. Escribir en el escritorio. Ejecutar un comando. Que lo digan con sus palabras.
2. **«¿Qué pasaría si decís que sí?»** Se hace, de verdad, ahora. No es una simulación ni una confirmación de cortesía.
3. **«¿Se puede acotar?»** Casi siempre sí: pedirle que trabaje solo en tal carpeta, o que te enseñe antes lo que va a hacer.

<!--
BLOQUE 4, parte 2
Lanzar las tres preguntas al grupo, no responderlas tú. La segunda es la que de verdad se queda.
-->

---

# «Permitir una vez» es solo esa vez

> **«Permitir una vez es permitir esa vez. La próxima te vuelve a preguntar. Es incómodo a propósito: ese pequeño fastidio es lo que te obliga a pensar si de verdad quieres que salga de la sala.»**

No es un permiso permanente y no se recuerda.

<!--
BLOQUE 4, parte 2 — EL MOMENTO CLAVE
Di la frase completa, literal y despacio. Es la frase que se llevan del seminario.
Preguntar después: «¿Por qué creéis que está diseñado para ser incómodo?»
-->

---

# Aprobar por inercia

Si te descubres pulsando «permitir» sin leer, para.

⚠️ Estás firmando sin leer.

El aviso se convierte en un clic automático y deja de protegerte.

<!--
BLOQUE 4, parte 2
Aquí aparecen dos comportamientos que hay que desactivar ya. Este es el primero.
Chuleta de emergencia si ves a alguien aprobando sin leer: «Para. Léelo en voz alta. ¿Qué le estás dejando hacer?»
-->

---

# Subir el nivel de permiso

**Subir el nivel de permiso para que deje de preguntar es como quitar el freno porque el coche hace ruido al frenar.**

Si algo se repite mucho, la solución no es aprobar cien avisos: **es mover el trabajo dentro de la carpeta de trabajo**, donde no hace falta permiso.

<!--
BLOQUE 4, parte 2 — segundo comportamiento a desactivar
Retoma la analogía del coche del bloque 1: por eso el harness es un coche con frenos.
Si alguien propone subir permisos al máximo, responder: «Antes de eso, dime qué tarea es. Casi siempre se arregla moviendo la carpeta.»
-->

---

# Regla de oro

**Si no entiendes qué te está pidiendo, no lo apruebes.**

Pídele que te lo explique con palabras, o que te diga qué va a tocar antes de tocarlo.

Que la copien.

<!--
BLOQUE 4, parte 2 — cierre
Regla de oro, y que la copien en su cuaderno o en sus notas. Es la única frase del bloque que deberían escribir.
-->

---

# Práctica 3 — Cambiar de política

La misma tarea que antes, pero hecha **dentro de la carpeta de trabajo**.

1. Repetid la misma petición.
2. Observad qué pasa.
3. Anotad la diferencia con la Práctica 2.

**Ya no pregunta nada.**

<!--
BLOQUE 4, parte 3 — (8 min) PRÁCTICA DESTACADA
Todos la repiten y observan. No digas la conclusión: que la saquen ellos.
Lo importante es que sientan en los dedos la diferencia entre fuera y dentro de la sala.
-->

---

# Lo que acaba de pasar

Que saquen ellos la conclusión. Si no sale, dila tú:

> **«El agente no es más listo ni más tonto. Habéis cambiado dónde trabaja, y con eso han desaparecido los avisos y ha bajado el riesgo. Diseñar bien la carpeta es la mitad del trabajo seguro.»**

<!--
BLOQUE 4, parte 3 — cierre
Preguntar primero: «¿Por qué ya no pregunta?» Dar diez segundos de silencio antes de responder.
-->

---

# Tres ideas para que se queden

- **El sandbox reduce el riesgo, no lo elimina.** Si dentro de la sala hay algo que no debería tocarse, el problema es lo que hay en la sala, no el agente.
- **La aprobación es tuya, no del sistema.** El aviso no decide: te informa. La responsabilidad es de quien pulsa.
- **Copia de seguridad antes de empezar.** La regla es aburrida y por eso se salta: si no tienes copia de algo, no lo pongas en la carpeta de trabajo.

<!--
BLOQUE 4, parte 4 — cierre del bloque (4 min)
Señal de que ha funcionado: sabrán decirte, sin mirar, la diferencia entre sandbox y aprobación, y por qué «permitir una vez» no vale para siempre.
Preguntar a dos personas al azar antes de pasar al bloque 5.
-->

---

<!-- _class: lead -->

# Bloque 5
## Herramientas, contexto y memoria

**22 minutos · práctica**

<!--
SECCIÓN. Objetivo: que sepan qué puede hacer su agente, qué hacer cuando la conversación se degrada, y cómo no repetirse.
-->

---

# Las herramientas, con calma

Vuelve a la lista del bloque 2, ahora mirando la pantalla real: dónde se ve qué herramientas hay disponibles y qué está usando en cada paso.

**La conclusión: no hace falta memorizar nada, hace falta mirar los pasos.**

⚠️ La herramienta de terminal es la más potente de todas. Instala, mueve y deshace con la misma facilidad con la que rompe.

<!--
BLOQUE 5, parte 1 — (5 min)
Cuando el agente use la terminal, mira más despacio que cuando lee un archivo. Repetirlo.
-->

---

# El contexto, en la práctica

Señales de que la mesa se está llenando:

- Repite cosas que ya hizo.
- Olvida instrucciones que le diste al principio.
- Da vueltas sobre el mismo problema.

Qué se hace:

- **Cerrar y abrir una conversación nueva**, diciendo en el primer mensaje lo que ya está hecho y dónde.
- **Dividir el trabajo** en trozos con un resultado claro cada uno.
- **No arrastrar** una conversación larga para una tarea nueva y distinta. Cada tarea, su conversación.

<!--
BLOQUE 5, parte 2 — (5 min)
Retoma la mesa de trabajo del bloque 2: la misma imagen, ahora con síntomas concretos.
Frase: «Es más rápido empezar de nuevo que insistir.»
-->

---

# Memoria: lo que sobrevive

**La conversación** — se acaba. Si cierras y abres otra, el agente no se acuerda de nada.

**Lo permanente** — sobrevive a todo. Dos formas:

- Las **notas**: archivo `AGENTS.md`.
- Los **procedimientos guardados**: skills.

<!--
BLOQUE 5, parte 3 — (5 min)
La diferencia entre los dos niveles importa y es la que se salta todo el mundo.
-->

---

# `AGENTS.md`: las notas al becario

**`AGENTS.md` son las notas que dejas al becario antes de que empiece.**

Si tienes una preferencia que se repite — «responde en español», «no toques la carpeta de facturas», «los informes van siempre en la carpeta `informes`» — no la repitas cada día: escríbela una vez.

Hay notas **globales** (para todos tus proyectos) y notas **por proyecto**.

<!--
BLOQUE 5, parte 3
Ejemplos de preferencia que se repiten: usar los del guion, son los que el grupo reconoce.
-->

---

# Skills: recetas de cocina

**Las skills son procedimientos guardados, como recetas de cocina.**

Cuando repites una tarea siempre igual, la escribes una vez con sus pasos y el agente la sigue cuando le dices «hazme el informe mensual».

Se guardan en `.dsh/skills/<nombre>/SKILL.md`.

En este ordenador ya hay una de ejemplo: la de precios de gasolineras.

<!--
BLOQUE 5, parte 3 — cierre
Lección para que se la lleven: «Si te descubres explicando lo mismo por tercera vez, el problema no es el agente: es que no le has dejado notas.»
-->

---

# Práctica 4 — Enseñarle un procedimiento

1. Deja una instrucción permanente: una nota o una skill sencilla.
2. Abre una **conversación nueva**.
3. Comprueba que se respeta.

🔑 Hay que probarlo en una conversación nueva: en la misma no demuestra nada, porque se acuerda por el contexto.

<!--
BLOQUE 5, parte 4 — (5 min) PRÁCTICA
El detalle que hay que subrayar es el paso 2. Si lo prueban en la misma conversación, la práctica no vale y hay que repetirla.
-->

---

# MCP: un enchufe estándar, como el USB

**MCP es un enchufe estándar, como el USB.** Muchísimos programas que ya saben hacer cosas — GitHub, bases de datos, gestores de incidencias, servicios de memoria — se conectan por ese enchufe y aparecen como herramientas nuevas.

**Cuándo merece la pena:** cuando la información que necesitas no está en archivos, sino en otro programa.

⚠️ **Cada enchufe es una conexión nueva a tus cosas.** Instalar un plugin o conectar un servidor es una decisión de confianza, igual que instalar un programa.

<!--
BLOQUE 5, parte 5 — (2-3 min)
Solo el concepto, sin tecnicismos. Si vas mal de tiempo, esta diapositiva y una frase: es el primer elemento del orden de recorte.
NO omitir el aviso de seguridad aunque vayas con retraso. Si vas a conectar algo que toca datos reales de la empresa, consúltalo antes.
-->

---

<!-- _class: lead -->

# Bloque 6
## Práctica 5 — Encargo integrador

**13 minutos · práctica**

<!--
SECCIÓN. Objetivo: que hagan solos un encargo completo, y sobre todo que VERIFIQUEN.
-->

---

# El patrón de un buen encargo

Escríbelo en la pizarra y que lo copien.

| Parte | Qué escribir |
|---|---|
| **1. Qué quiero** | El objetivo, con un resultado concreto. |
| **2. Dónde** | La carpeta exacta. |
| **3. Qué NO tocar** | Los límites, dichos explícitamente. |
| **4. Cómo sabré que está bien** | Tu criterio de éxito. |

<!--
BLOQUE 6 — (5 min)
Es lo más útil que se llevan hoy, junto con la regla de oro del bloque 4. Que lo copien de verdad, no que lo miren.
Decir: «Aquí ya no hay instrucciones mías. Piensa en una tarea pequeña y real tuya, que tenga que ver con archivos, y que puedas comprobar en dos minutos.»
-->

---

# Ejemplo completo

> «En la carpeta `practica/informes` hay cinco informes en texto. Léelos y créame `resumen_general.md` con una tabla de tres columnas: tema, conclusión y nivel de urgencia. **No modifiques ninguno de los cinco archivos originales.** Al terminar, dime qué archivos has leído y cuántas filas tiene la tabla.»

Señala las cuatro partes del patrón dentro del ejemplo.

<!--
BLOQUE 6 — (3 min)
Leer el ejemplo en voz alta y marcar con el dedo cada una de las cuatro partes: qué, dónde, qué no tocar, cómo sabré que está bien.
-->

---

# Verificación obligatoria

**Y ahora la parte que la gente se salta: abrid el resultado y comprobadlo.**

No vale «tiene buena pinta». Cuenta las filas, mira si los cinco informes están, comprueba que los originales siguen intactos.

> **«El agente no firma su trabajo. Lo firmas tú cuando dices que está bien.»**

<!--
BLOQUE 6 — cierre de la práctica (5 min)
Recalcar la frase final: es una de las tres que se llevan del día.
Puesta en común si vas sobrado (hasta 180): tres voluntarios, un minuto cada uno: qué pidieron, qué les devolvió el agente y QUÉ COMPROBARON. Insiste en la tercera parte: lo interesante es lo que revisaron, no lo que pidieron.
-->

---

<!-- _class: lead -->

# Bloque 7
## Cierre, límites y evaluación

**10 minutos · charla**

<!--
SECCIÓN. Cierre del día: errores típicos, límites dichos con honestidad, reglas para el lunes y evaluación.
-->

---

# Los tres errores que va a cometer todo el mundo

1. **Aprobar por inercia.** El aviso se convierte en un clic automático y deja de protegerte.
2. **Confiar sin verificar.** El resultado llega bien maquetado y con seguridad en el tono. Eso no es prueba de que sea correcto.
3. **Darle lo que no debería ver.** Si arrastras una carpeta con datos de clientes «para probar», ya está dentro de la sala.

<!--
BLOQUE 7 — (3 min)
Los tres errores conectan con lo ya visto: el 1 con el bloque 4, el 2 con el bloque 6, el 3 con la sala del becario.
-->

---

# Límites, dichos con honestidad

- ⚠️ **Es software experimental, en fase de vistas previas de desarrollo.** Cambia rápido y habrá novedades que rompan lo anterior. No construyas nada crítico encima sin plan B.
- **No ha pasado una auditoría de seguridad.** No está pensado para ser seguro de serie.
- **El sandbox y las aprobaciones reducen el riesgo, pero no garantizan aislamiento** y no deben ser tu único control de seguridad. Si el trabajo es delicado, la recomendación oficial es usar una máquina virtual o un entorno dedicado y desechable.

<!--
BLOQUE 7 — (3 min)
No endulces esto. Es información que protege a la gente. Decirlo con tono neutro y sin alarmismo.
-->

---

# Lo que sí está en tu mano

- Trabajar con el **mínimo privilegio necesario**.
- Tener **copias de seguridad** de lo que el agente puede tocar.
- **No exponer credenciales.**
- **Revisar plugins y comandos** antes de permitirlos.

**Las cuatro reglas para el lunes:**

1. Copia de seguridad de la carpeta antes de empezar.
2. Una carpeta específica para cada trabajo. Ni el escritorio entero ni, mucho menos, todo el disco.
3. Nada confidencial ni sensible en la carpeta de trabajo, salvo que aceptes el riesgo conscientemente.
4. Revisa antes de aprobar y verifica al terminar. Siempre. Las dos veces.

<!--
BLOQUE 7 — (2 min)
Las cuatro reglas para el lunes son lo que se llevan a casa. Decirlas numeradas, despacio, y dejarlas proyectadas mientras se cierra el bloque.
-->

---

# Evaluación y para seguir

Reparte el cuestionario final de `06_evaluacion.md` y la encuesta de satisfacción.

✅ Recuerda que no es un examen.

Material para seguir:

- El manual interactivo de DSH.
- El glosario y la chuleta de `05_glosario_chuleta.md`.
- La documentación oficial del proyecto.

<!--
BLOQUE 7 — (3-4 min)
Repartir, dar tres minutos y recoger. Si alguien pregunta algo que no sabes: «No lo sé, lo apunto y te lo contesto.» Apúntalo de verdad.
-->

---

<!-- _class: lead -->

# Cierre

> **«Hoy no habéis aprendido a usar un programa. Habéis aprendido a dirigir a alguien que trabaja muy rápido, que no sabe lo que no sabe, y que tiene acceso a vuestros archivos. La herramienta os va a servir; los frenos os van a proteger.»**

<!--
CIERRE — última diapositiva
Leer la frase entera, despacio, sin añadir nada después. Dejarla proyectada mientras la gente recoge.
Antes de leerla, recordar: los cuatro puntos de la promesa del bloque 0 ya están cumplidos. Que lo comprueben ellos.
-->
