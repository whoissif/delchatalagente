# Evaluación del seminario «Del chat al agente: qué es un harness y cómo se usa»

## 1. Cómo usar esta evaluación

Este documento tiene dos partes que se usan en momentos distintos. El **cuestionario inicial** se rellena en los primeros cinco minutos y **no se puntúa**: sirve para saber de dónde parte el grupo y para que el instructor ajuste el ritmo, los ejemplos y el tiempo de cada práctica. El **cuestionario final** se rellena al terminar y sirve para comprobar qué se ha aprendido, **no para suspender a nadie**.

Reparte el inicial en papel (o compártelo antes de empezar) y guarda el final junto con la encuesta de satisfacción para comentar los resultados en los últimos diez minutos. Compara lo que respondió cada persona al principio con lo que responde al final: ese salto es la información más útil del seminario.

---

## 2. Cuestionario inicial (diagnóstico)

**Para el alumno:** responde con lo que creas **ahora**, sin buscar información y sin mirar el de tu compañero. No hay respuestas malas y esto no se puntúa: solo sirve para que el seminario se adapte a ti. **Tiempo: 5 minutos.**

| Nombre y apellidos | Fecha |
|---|---|
|  |  |

### Opción múltiple (marca una sola)

**I1.** Cuando hablamos del «modelo» y del «harness», ¿cómo lo describirías?

- **A)** Son lo mismo: el programa que instalas y la inteligencia que responde.
- **B)** El modelo piensa y escribe; el harness es el programa que lo rodea y le da herramientas.
- **C)** El modelo es la interfaz web; el harness es el servidor donde se ejecuta.
- **D)** El modelo es de pago y el harness es gratis.

**I2.** ¿Qué crees que puede hacer un agente que un chat normal no hace?

- **A)** Escribir textos más largos y con mejor estilo.
- **B)** Actuar sobre tu ordenador: leer y modificar archivos, ejecutar comandos, y tú revisas.
- **C)** Contestarte sin conexión a internet.
- **D)** Saber ya todo lo que hay en tu ordenador sin que se lo indiques.

**I3.** Cuando el agente te pide un permiso, ¿qué crees que está pasando?

- **A)** Va a hacer algo fuera de la zona delimitada y te pregunta antes de tocarlo.
- **B)** Se ha quedado sin saldo en tu cuenta.
- **C)** Ha encontrado un problema de seguridad en tu ordenador.
- **D)** Te está pidiendo que escribas tú el comando en la terminal.

**I4.** Si el agente se equivoca y cambia algo que no querías, ¿qué crees que ocurre?

- **A)** El harness lo revierte solo: no hay nada de lo que preocuparse.
- **B)** Los cambios pueden ser difíciles de recuperar; conviene trabajar con copias de seguridad y permisos limitados.
- **C)** Con la política de aprobaciones que viene por defecto es imposible que pase.
- **D)** El agente detecta el error y lo corrige sin avisarte.

### Preguntas abiertas cortas (una o dos líneas)

**I5.** ¿Qué te gustaría automatizar o quitarte de encima con un agente?

> Respuesta:

**I6.** ¿Qué te da miedo que el agente toque o cambie?

> Respuesta:

### Nota para el instructor: qué patrones observar y qué indican

| Patrón en las respuestas | Qué indica | Qué hacer en la sesión |
|---|---|---|
| Confunde el modelo con el producto («DeepSeek es la aplicación») | No tiene separados el motor y el coche | Reforzar la analogía **motor / coche completo** al presentar el harness |
| Elige I2-D («ya sabe lo que hay en mi ordenador») | Confunde memoria del modelo con leer archivos | Insistir: el agente solo ve lo que lee con herramientas y con permisos |
| Cree que aprobar una vez vale para siempre | No ha visto el coste real de las aprobaciones | Dar tiempo a la **práctica 2** y a la **práctica 3** |
| Cree que el harness deshace los errores (I4-A) | Falsa red de seguridad | Hablar de copias de seguridad y de **mínimo privilegio** antes de la práctica 5 |
| Miedo difuso a «que toque todo» (I6) | Buen punto de partida, sin vocabulario | Responder con el sandbox y la política de aprobaciones, en concreto |
| En I5 no se le ocurre ninguna tarea | Todavía no ha pensado en tareas delegables | Dar ejemplos genéricos de tareas repetitivas de oficina y pedir uno propio |
| Acierta I1–I4 con soltura | Puede ayudar a otros sin aburrirse | Proponerle hacer de apoyo durante las prácticas |
| Respuestas muy largas en I5 e I6 | Expectativas altas o miedo alto | Aterrizar el alcance real y recordar los límites del developer preview |

**Respuestas esperadas en el inicial (referencia, no se puntúa):** I1-B, I2-B, I3-A, I4-B.

**No corrijas en voz alta** el cuestionario inicial antes de explicar los conceptos: se comparan al final, y el contraste es parte del aprendizaje.

---

## 3. Cuestionario final

**Para el alumno:** marca **una sola** opción en cada pregunta de la Parte A y responde con tus palabras en la Parte B. Si dudas, elige lo que harías de verdad, no lo que suene mejor. **Tiempo: 15 minutos.**

| Nombre y apellidos | Fecha | Aciertos en la Parte A (solo para ti) |
|---|---|---|
|  |  |  |

### Parte A — Opción múltiple (12 preguntas)

**F1.** ¿Qué aporta el harness frente al modelo por sí solo?

- **A)** Un modelo más potente y más rápido que el que usa el chat.
- **B)** Un programa que rodea al modelo y le da herramientas, permisos, memoria y control sobre lo que hace.
- **C)** Un traductor que pasa tus mensajes a un idioma que el modelo entiende.
- **D)** Un intermediario que responde por el modelo cuando no hay conexión.

**F2.** El agente trabaja en un bucle de pensar, actuar y observar. ¿Qué significa «observar»?

- **A)** Que te pregunta a ti si el resultado le parece bien.
- **B)** Que lee el resultado de lo que acaba de hacer y decide el siguiente paso.
- **C)** Que guarda la conversación para que no se te olvide nada.
- **D)** Que comprueba si tiene permiso de administrador en tu ordenador.

**F3.** ¿Qué es una «herramienta» para el agente?

- **A)** Un complemento que hay que comprar aparte.
- **B)** Una capacidad concreta que puede usar: leer archivos, escribir archivos, ejecutar comandos, buscar en internet.
- **C)** Un atajo de teclado de la interfaz web.
- **D)** El menú de Ajustes donde se configura la clave de API.

**F4.** El contexto es la mesa de trabajo del agente. ¿Qué pasa cuando se llena de papeles?

- **A)** Nada: el contexto no tiene límite.
- **B)** El agente se para y hay que reiniciar la aplicación.
- **C)** Pierde precisión y olvida detalles anteriores; conviene resumir, dividir la tarea o empezar de nuevo.
- **D)** Se borran los archivos que ya había creado en el espacio de trabajo.

**F5.** Ante un aviso de aprobación eliges **«Permitir una vez»**. ¿Qué implica?

- **A)** Que autorizas esa acción concreta ahora; la próxima vez volverá a preguntar.
- **B)** Que autorizas esa acción para siempre en este proyecto.
- **C)** Que autorizas todas las acciones del agente durante el resto de la sesión.
- **D)** Que el agente ya no necesita permisos para nada.

**F6.** Sobre el sandbox, ¿qué afirmación es correcta?

- **A)** Garantiza un aislamiento total: nada de lo que haga el agente puede afectar a tu ordenador.
- **B)** Delimita dónde puede trabajar el agente y reduce el riesgo, pero no garantiza aislamiento.
- **C)** Es una copia de seguridad automática de tus archivos.
- **D)** Solo hace falta si trabajas con datos muy sensibles.

**F7.** ¿Qué es una skill y para qué sirve?

- **A)** Un procedimiento guardado que el agente sigue cuando la tarea encaja, como una receta de cocina.
- **B)** Un permiso permanente que le das al agente.
- **C)** Un modelo más rápido y más barato que el habitual.
- **D)** Una carpeta donde el agente va dejando los resultados.

**F8.** ¿Para qué sirve el archivo AGENTS.md?

- **A)** Para guardar las conversaciones anteriores y poder volver a ellas.
- **B)** Para indicar qué modelo y qué clave de API debe usar el agente.
- **C)** Para dejarle por escrito lo que debe saber siempre: cómo trabajas, tus normas y las rutas importantes.
- **D)** Para declarar qué herramientas de terceros tiene permitidas.

**F9.** ¿Qué es MCP?

- **A)** Un modelo de lenguaje especializado en programación.
- **B)** Un estándar que permite conectar herramientas que ya existen (GitHub, bases de datos, gestores de incidencias) para que aparezcan como herramientas nuevas del agente.
- **C)** Un modo de seguridad que bloquea la conexión a internet.
- **D)** El formato de los documentos que el agente puede leer.

**F10.** El agente se equivoca, lo corriges y empeora. ¿Qué es lo más sensato?

- **A)** Insistir con la misma instrucción y subir el tono.
- **B)** Parar, revisar qué ha hecho, y si hace falta volver atrás o replantear la tarea en trozos más pequeños y con más contexto.
- **C)** Darle acceso total para que se arregle solo.
- **D)** Cerrar la aplicación: significa que el agente no sirve para esto.

**F11.** Vas a instalar un plugin de terceros. ¿Cuál es el riesgo principal?

- **A)** Que ocupe mucho espacio en el disco.
- **B)** Que cambie el idioma de la interfaz.
- **C)** Que ejecute código con los mismos permisos que el agente y llegue a tus datos o a tus credenciales.
- **D)** Que solo funcione con la versión de pago del modelo.

**F12.** El proyecto está en «developer preview». ¿Qué significa para ti?

- **A)** Que es una versión en desarrollo: cambia rápido, puede romper compatibilidad y no hay auditoría de seguridad.
- **B)** Que es gratis, pero con publicidad.
- **C)** Que solo pueden usarlo programadores profesionales.
- **D)** Que ya está terminado y estable, solo le faltan detalles estéticos.

### Parte B — Preguntas abiertas (3)

**F13.** Explica con tus palabras la diferencia entre un chat y un agente.

> Respuesta (3-5 líneas):

**F14.** Describe un aviso de aprobación que hayas visto durante las prácticas y por qué apareció.

> Respuesta (2-4 líneas):

**F15.** Propón una tarea de tu trabajo que le encargarías al agente y explica cómo comprobarías que el resultado es correcto.

> Respuesta (3-5 líneas):

---

## 4. Clave de respuestas y explicaciones

### Parte A — Clave (cuestionario final)

| Pregunta | Respuesta correcta | Por qué |
|---|---|---|
| **F1.** Qué aporta el harness frente al modelo | **B** | El modelo es el motor; el harness es el coche completo: volante, frenos y salpicadero. La opción A es tentadora porque el modelo es lo único que «se ve» en un chat, pero el modelo no tiene herramientas, permisos ni memoria de proyecto. |
| **F2.** Qué significa «observar» | **B** | El bucle es pensar, actuar y mirar el resultado para decidir el paso siguiente. La A es tentadora porque el agente a veces pregunta al usuario, pero eso es otra herramienta, no el paso de observar. |
| **F3.** Qué es una herramienta | **B** | Las herramientas son capacidades concretas que el agente puede invocar. La D es tentadora por confundir «herramienta» con la configuración, y la A porque muchos complementos de otros programas se pagan aparte. |
| **F4.** Qué pasa cuando el contexto se llena | **C** | El contexto es la mesa de trabajo: si se llena de papeles, hay que recoger, resumir o empezar una tarea nueva. La A es tentadora porque el chat parece recordar siempre, pero se le escapan los detalles. |
| **F5.** Qué significa «permitir una vez» | **A** | Vale solo para esa vez: no concede permiso permanente, y esa incomodidad es intencionada. La B es el error más típico: creer que aprobar una vez vale para siempre. |
| **F6.** Qué hace y qué no hace el sandbox | **B** | El sandbox delimita la zona de trabajo y las aprobaciones son el «¿seguro?» antes de salir de ella, pero eso reduce el riesgo, no garantiza aislamiento. La A es tentadora porque suena a «modo seguro» y no lo es. |
| **F7.** Qué es una skill | **A** | Las skills son procedimientos guardados, como recetas: se escriben una vez y se reutilizan. La B la confunde con los permisos y la D con la carpeta de resultados. |
| **F8.** Para qué sirve AGENTS.md | **C** | AGENTS.md son las notas que dejas al becario antes de que empiece; hay uno global y otro por proyecto. La A lo confunde con el historial de sesiones y la B con los ajustes de modelo. |
| **F9.** Qué es MCP | **B** | MCP es un enchufe estándar, tipo USB, para conectar herramientas que ya existen sin escribir nada nuevo. La A lo confunde con un modelo y la D con un formato de archivo. |
| **F10.** Qué hacer cuando el agente se equivoca y empeora | **B** | Parar, revisar lo hecho y replantear la tarea en trozos pequeños suele resolverlo. La C es tentadora porque parece que más permisos dan más capacidad, pero normalmente agrandan el problema; la A solo repite el error. |
| **F11.** Riesgo de un plugin de terceros | **C** | Un plugin corre con los permisos del agente, así que puede llegar a lo mismo que él. La A es tentadora porque es el riesgo fácil de imaginar, pero el daño real no es el espacio en disco. |
| **F12.** Qué significa developer preview | **A** | Es una versión en desarrollo: iteración rápida, cambios que rompen compatibilidad y sin auditoría de seguridad. La D es tentadora porque la herramienta funciona bien en la demo, pero «funciona» no es «estable». |

### Clave del cuestionario inicial (solo para el instructor, no se puntúa)

| Pregunta | Respuesta esperada | Lectura rápida |
|---|---|---|
| I1 | **B** | Distingue modelo de harness; si falla, insistir en motor y coche. |
| I2 | **B** | Entiende que el agente actúa sobre el ordenador. |
| I3 | **A** | Entiende la aprobación como control de salida de la zona delimitada. |
| I4 | **B** | Asume que los errores tienen consecuencias reales. |

### Criterios de corrección de las preguntas abiertas (F13, F14, F15)

No hay una única respuesta válida: valora si aparecen las ideas clave.

**F13. Diferencia entre un chat y un agente**

- **Debe aparecer:** que el chat solo conversa y te dice qué hacer, mientras que el agente actúa sobre tu ordenador y tú revisas; mención de herramientas, permisos o revisión del resultado.
- **Buena:** «El chat es como un consultor por teléfono: te explica qué hacer y lo haces tú. El agente es como un becario con acceso a mi ordenador: lo hace él, con las herramientas y permisos que le doy, y yo reviso lo que ha hecho».
- **Regular:** «El agente es un chat más avanzado que puede hacer cosas». Recoge la idea de acción, pero sin herramientas, permisos ni revisión.
- **Floja:** «Son lo mismo, pero el agente responde mejor» o «el agente es el de pago».

**F14. Un aviso de aprobación visto en las prácticas**

- **Debe aparecer:** una acción concreta (por ejemplo, escribir o ejecutar un comando fuera del espacio de trabajo), el motivo de que apareciera y qué eligió.
- **Buena:** «Intentó crear un archivo en mi Escritorio, fuera de la carpeta de trabajo, y salió el aviso. Elegí "Permitir una vez" porque era justo lo que quería; si me lo pidiera cada vez, movería el trabajo dentro de la carpeta del proyecto».
- **Regular:** «Salió un aviso y le di a permitir». Identifica el aviso, pero no explica por qué apareció.
- **Floja:** «No vi ninguno» o confundir el aviso con un error de la aplicación.

**F15. Tarea propia y cómo comprobar el resultado**

- **Debe aparecer:** una tarea concreta y verificable, y un criterio de comprobación realista (leer el resultado, compararlo con el original, revisar los cambios antes de aceptarlos, pedir una lista de lo que ha tocado).
- **Buena:** «Le pediría renombrar y clasificar las facturas de un trimestre en carpetas por mes. Lo comprobaría abriendo la carpeta, contando que están todas y revisando que ningún nombre se ha quedado raro».
- **Regular:** tarea adecuada, pero comprobación vaga («lo miraría por encima»).
- **Floja:** tarea sin criterio de comprobación («que lo haga todo y ya está») o algo que no se puede verificar.

**Preguntas que suelen fallar más.** Si al terminar hay que repasar algo en grupo, empieza por **F5** (creer que aprobar una vez vale para siempre), **F6** (creer que el sandbox aísla del todo) y **F10** (responder al error dando más permisos). Son los tres malentendidos que más problemas causan después, cuando la persona trabaja sola en su ordenador.

---

## 5. Interpretación de resultados

Cuenta los aciertos de las 12 preguntas de la Parte A y lee la banda correspondiente. Las abiertas y la encuesta se leen aparte, en positivo.

| Aciertos | Lectura | Qué hacer |
|---|---|---|
| **10-12** | Conceptos sólidos, incluidos permisos y límites | Recomendar profundizar en MCP y skills, y probar un encargo real en su trabajo esta semana |
| **7-9** | Base correcta, con algún punto flojo | Repasar los fallos concretos: suele ser F5 (permitir una vez), F6 (sandbox) o F10 (qué hacer cuando empeora) |
| **4-6** | Se han captado las ideas generales, no los detalles | Repetir las prácticas 2 y 3 con más calma y volver a explicar la analogía motor/coche |
| **0-3** | La sesión no ha llegado a asentarse | Sugerir repetir el seminario o empezar por un caso muy pequeño y guiado, sin culpar a nadie: el ritmo, no la persona, es lo que hay que ajustar |

**Advertencia importante:** 12 preguntas **no miden dominio**, solo orientan. Una persona puede fallar dos y usar el agente con criterio, y otra acertar once y no saber qué hacer el lunes. Usa el resultado como pista para seguir acompañando, nunca como nota ni como etiqueta.

Si comparas el inicial con el final, fíjate sobre todo en **I3 frente a F5** y en **I4 frente a F6**: ahí está el cambio de mentalidad que buscamos (los permisos y los límites importan).

### Hoja de registro del instructor

| Alumno | Patrón detectado en el inicial | Aciertos en el final (Parte A) | Seguimiento sugerido |
|---|---|---|---|
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

---

## 6. Encuesta de satisfacción breve

Marca de 1 a 5, donde **1 = nada / muy en desacuerdo** y **5 = mucho / muy de acuerdo**.

| Nº | Pregunta | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| 1 | El seminario me ha ayudado a entender qué es un harness y en qué se diferencia de un chat | ☐ | ☐ | ☐ | ☐ | ☐ |
| 2 | Me siento capaz de arrancar el harness y dejarlo listo (modelo y espacio de trabajo) por mi cuenta | ☐ | ☐ | ☐ | ☐ | ☐ |
| 3 | He entendido para qué sirven los permisos y las aprobaciones | ☐ | ☐ | ☐ | ☐ | ☐ |
| 4 | El ritmo de la sesión ha sido el adecuado para mí | ☐ | ☐ | ☐ | ☐ | ☐ |
| 5 | Recomendaría este seminario a un compañero | ☐ | ☐ | ☐ | ☐ | ☐ |

**Duración de los bloques** (para ajustar la próxima edición). Marca una casilla por bloque:

| Bloque | Se hizo largo | Estuvo bien | Se hizo corto |
|---|---|---|---|
| Conceptos: qué es un harness y qué es un agente | ☐ | ☐ | ☐ |
| Configuración: modelo y espacio de trabajo | ☐ | ☐ | ☐ |
| Práctica 1 — Primer arranque y primer encargo | ☐ | ☐ | ☐ |
| Práctica 2 — Provocar una aprobación | ☐ | ☐ | ☐ |
| Práctica 3 — Cambiar de política | ☐ | ☐ | ☐ |
| Práctica 4 — Enseñarle un procedimiento | ☐ | ☐ | ☐ |
| Práctica 5 — Encargo integrador | ☐ | ☐ | ☐ |

### Preguntas abiertas

**S1.** ¿Qué te ha servido más de la sesión?

> Respuesta:

**S2.** ¿Qué falta o qué sobra?

> Respuesta:

### Notas del instructor (para la próxima edición)

- Qué bloque hubo que recortar:
- Qué bloque hubo que ampliar:
- Qué ejemplo funcionó mejor:
- Qué duda se repitió más:
- Cambio concreto para la próxima edición:
