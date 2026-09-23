# Soluciones y errores frecuentes

Documento de apoyo para el instructor del seminario **"Del chat al agente: qué es un harness y cómo se usa"**.

Herramienta: **DeepSeek Harness (`dsh`)**, el harness de agentes de DeepSeek AI.
Audiencia: ingenieros industriales que ya usan la IA como chat o bot. No se requiere experiencia previa en programación.

## Cómo usar este documento

- Tenlo abierto en una segunda ventana mientras la clase practica.
- Localiza la práctica en la que esté el grupo y busca en la tabla la fila que coincida con lo que ves en su pantalla.
- Las señales de "salió bien" sirven para confirmar en voz alta que el alumno va por buen camino: dilo, refuerza.
- Si el problema aparece en varios portátiles a la vez, ve directamente a **Problemas técnicos de sala**.
- Si te quedas sin palabras delante de la clase, usa las **Frases de rescate**.
- Recuerda las dos ideas que se repiten: **el sandbox es la zona de trabajo delimitada** y **la aprobación es el "¿seguro?"**.

**Recordatorio de arranque**

- Sin instalar nada: `npx @deepseek-ai/dsh web`
- Con instalación global: `npm install -g @deepseek-ai/dsh` y después `dsh web`
- La interfaz se abre en **http://127.0.0.1:3080**. La opción `--no-open` arranca sin abrir el navegador.

---

## Práctica 1 — Primer arranque y primer encargo

**Objetivo:** arrancar el harness, conectar el modelo, elegir espacio de trabajo y conseguir que el agente lea una carpeta propia y la resuma.

**Qué debería pasar**

- El alumno lanza el harness desde la terminal y se abre la interfaz web en el navegador.
- Configura su clave de API y el modelo queda usable al momento, sin reiniciar el servidor.
- Elige una carpeta como espacio de trabajo; el cuadro de escribir mensajes se habilita.
- Escribe una petición y el agente lee archivos reales de esa carpeta y responde con un resumen.

**Cómo saber que salió bien**

- La interfaz carga en **http://127.0.0.1:3080** y se ve el panel de conversación.
- El cuadro de escribir mensajes está **habilitado**. Si está gris, no hay espacio de trabajo seleccionado.
- En Ajustes → Modelos aparece la clave guardada y el agente responde sin reiniciar nada.
- El resumen menciona **nombres de archivos reales** de la carpeta elegida: ha leído, no ha inventado.

**Solución de referencia**

Petición del alumno:

> Mira la carpeta que he elegido y dime qué hay dentro. Después hazme un resumen de una página con los temas principales de los documentos que encuentres, en español y en viñetas.

Qué haría el agente:

1. Lista el contenido de la carpeta del espacio de trabajo.
2. Abre los archivos de texto que encuentra.
3. Devuelve un resumen en viñetas, en español, y menciona qué archivos ha leído y cuáles ha ignorado.
4. Si algún archivo queda fuera del espacio de trabajo, pide aprobación antes de leerlo.

**Errores frecuentes**

| Lo que se ve | Qué está pasando | Qué hacer |
|---|---|---|
| El cuadro de mensajes está gris y no deja escribir | No hay espacio de trabajo seleccionado: es el primer tropiezo habitual | Pulsar **Elegir espacio de trabajo**, añadir la carpeta y seleccionarla; el cuadro se habilita al momento |
| El alumno escribe en la terminal y no pasa nada | La terminal solo arranca el servidor; el trabajo se hace en el navegador | Explicar que la terminal es el motor encendido y el navegador es el volante |
| El agente contesta en inglés o de forma muy genérica | No ha leído nada, solo ha conversado; o no se le pidió el idioma | Pedir explícitamente "en español" y "mira los archivos de la carpeta" |
| "No puedo acceder a esa carpeta" | La carpeta elegida no es la que el alumno cree | Comprobar la ruta en **Elegir espacio de trabajo** y repetir la petición |
| El agente ha usado una carpeta distinta de la esperada | Al lanzar `dsh` desde una carpeta, esa carpeta es el espacio de trabajo por defecto propuesto | Elegir la carpeta correcta antes de pedir nada |
| Error al enviar el mensaje o respuesta vacía | Falta la clave de API o no está guardada | Ajustes → Modelos → introducir o volver a guardar la clave de **https://platform.deepseek.com/** |

**Plan B si no sale**

- Si no arranca nada, comprueba Node.js y vuelve a lanzar el comando en una terminal nueva.
- Si no consigue configurar la clave, pásale a un compañero que ya lo tenga funcionando y siga la práctica por parejas.
- Mientras se arregla, pídele que escriba en papel qué carpeta quiere resumir y qué le va a pedir al agente.

**Si alguien va muy rápido**

- Que elija una carpeta con subcarpetas y pida un resumen por subcarpeta.
- Que pida al agente que, a partir de los documentos, proponga una lista de tareas pendientes.

---

## Práctica 2 — Provocar una aprobación

**Objetivo:** entender qué es el sandbox, qué queda fuera de él y qué significa el aviso de aprobación.

**Qué debería pasar**

- El alumno pide al agente que lea o cree algo **fuera** de la zona de trabajo delimitada (por ejemplo, en su escritorio).
- La operación no se ejecuta sola: aparece el **aviso de aprobación** en la interfaz.
- El agente se queda esperando la decisión del alumno.
- El alumno decide: permitir una vez, o denegar. Y entiende qué acaba de pasar.

**Cómo saber que salió bien**

- Aparece el aviso de aprobación y el agente **se detiene** en vez de actuar.
- El aviso indica qué operación quiere hacer y sobre qué carpeta o archivo.
- El alumno sabe explicar en una frase qué es el sandbox y qué es la aprobación.
- Al aprobar, la operación se completa; al denegar, el agente lo acepta y propone otra vía o te lo dice.

**Solución de referencia**

Petición del alumno:

> Crea un archivo llamado `prueba.txt` en mi escritorio con el texto "hola desde el agente".

Qué haría el agente:

1. Detecta que el escritorio está **fuera** del espacio de trabajo.
2. Muestra el aviso de aprobación indicando la ruta exacta que quiere escribir.
3. Espera. No escribe nada hasta que el alumno decide.
4. Con "Permitir una vez", escribe el archivo y termina. Si se deniega, explica que no puede y propone hacerlo dentro del espacio de trabajo.

**Errores frecuentes**

| Lo que se ve | Qué está pasando | Qué hacer |
|---|---|---|
| El agente crea el archivo sin preguntar nada | La carpeta de destino está dentro del espacio de trabajo, o la política es más permisiva de lo previsto | Elegir una ruta claramente externa (escritorio, carpeta personal) y revisar la política de permisos |
| No aparece ningún aviso y el agente dice "no puedo" | La política de permisos deniega directamente en vez de preguntar | Es un resultado válido: hay modos de sandbox y política de aprobaciones; en ese modo no se pregunta, se niega |
| El alumno aprueba a ciegas sin leer el aviso | No ha entendido la práctica | Parar y leer el aviso en voz alta: qué operación, qué ruta, qué riesgo |
| Aparecen varios avisos seguidos y el alumno se agobia | El encargo toca varias cosas de golpe | Recordar que **"Permitir una vez" es solo esa vez**; simplificar la petición a una sola acción |
| Después de aprobar, la operación falla igualmente | Permisos del sistema operativo o antivirus bloqueando esa carpeta | Probar con otra carpeta del usuario y revisar el antivirus |

**Plan B si no sale**

- Si el agente no pide permiso nunca, cambia la política a un modo más restrictivo y repite la petición.
- Si el aviso no aparece porque el encargo es ambiguo, escribe tú la petición en la pizarra y que la copien.
- Aprovecha para la explicación teórica: el aviso incómodo es el objetivo, no un fallo.

**Si alguien va muy rápido**

- Que **deniegue** el permiso y observe cómo reacciona el agente. Es la mitad de la lección y casi nadie la hace.
- Que intente lo mismo con dos rutas distintas y compare qué aviso aparece en cada caso.

---

## Práctica 3 — Cambiar de política

**Objetivo:** comprobar que la misma tarea deja de pedir permiso cuando se hace **dentro** del espacio de trabajo, y entender qué cambia cada modo de permisos.

**Qué debería pasar**

- El alumno repite una tarea equivalente a la de la Práctica 2, pero apuntando a una carpeta **dentro** del espacio de trabajo.
- El agente la ejecuta sin mostrar el aviso de aprobación.
- Después se revisa la opción de política de permisos y, si procede, se cambia de modo para ver la diferencia.
- El alumno sale sabiendo que los permisos son un dial, no un interruptor.

**Cómo saber que salió bien**

- La operación se completa **sin aviso de aprobación**.
- El archivo o el resultado aparece realmente en la carpeta indicada.
- El alumno explica la diferencia entre las dos prácticas: fuera → aviso; dentro → sin aviso.
- Al cambiar la política, el comportamiento cambia en consecuencia de forma observable.

**Solución de referencia**

Petición del alumno:

> Dentro de la carpeta que te he dado, crea una subcarpeta llamada `notas` y dentro un archivo `resumen.md` con los tres puntos principales del resumen de antes.

Qué haría el agente:

1. Comprueba que la ruta está dentro del espacio de trabajo.
2. Crea la subcarpeta y el archivo sin pedir aprobación.
3. Confirma la ruta final y resume lo que ha escrito.
4. Si el alumno ha cambiado la política a solo lectura, se niega y lo explica: ese es el aprendizaje.

**Errores frecuentes**

| Lo que se ve | Qué está pasando | Qué hacer |
|---|---|---|
| Sigue pidiendo permiso aunque la ruta sea interna | La carpeta elegida no es la que se cree, o hay un acceso directo a otra ubicación | Comprobar la ruta del espacio de trabajo y evitar enlaces, accesos directos y unidades de red |
| El alumno no encuentra el archivo creado | Lo ha creado en otra subcarpeta del espacio de trabajo | Pedir al agente la **ruta completa** del archivo y abrirla |
| Tras cambiar la política, ya nada funciona | Se ha pasado a un modo demasiado restrictivo (por ejemplo, solo lectura) | Volver al modo anterior y explicar que la política se puede ajustar |
| El alumno cambia la política sin saber qué modo elige | No ha leído las opciones | Leer juntos la opción de política de permisos antes de tocarla |
| El agente pide permiso para escribir **y** para ejecutar | Son operaciones distintas, cada una con su aviso | Explicar que cada tipo de acción se evalúa por separado |

**Plan B si no sale**

- Vuelve a la Práctica 2 y compara las dos pantallas, una al lado de la otra.
- Si el espacio de trabajo es una unidad de red o una carpeta sincronizada, cambia a una carpeta local sencilla.
- Si el grupo va perdido, escribe en la pizarra las tres ideas: dentro, fuera, aviso.

**Si alguien va muy rápido**

- Que haga la misma tarea tres veces cambiando el modo de permisos y anote en una tabla qué pasa en cada caso.
- Aprovecha para introducir el **mínimo privilegio**: el modo más abierto no es el mejor, es el más arriesgado.

---

## Práctica 4 — Enseñarle un procedimiento

**Objetivo:** dejar instrucciones permanentes (notas en el **AGENTS.md** o una **skill** guardada) y comprobar que el agente las respeta en una **sesión nueva**.

**Qué debería pasar**

- El alumno escribe las instrucciones una sola vez: o bien como notas permanentes en el AGENTS.md, o como skill con su procedimiento.
- El agente propone dónde guardarlas y muestra el texto que va a escribir.
- El alumno abre una **conversación nueva** y pide la tarea.
- El agente aplica el procedimiento sin que se lo repitan.

**Cómo saber que salió bien**

- El AGENTS.md existe: el global en la carpeta de configuración del usuario (`C:\Users\Usuario\.dsh`), o el del proyecto en la raíz del proyecto.
- En una sesión nueva, el agente sigue el formato o los pasos acordados **sin recordatorio**.
- Si se usa una skill, existe `.dsh/skills/<nombre>/SKILL.md` dentro del proyecto.
- El alumno compara: antes había que explicarlo cada vez, ahora no.

**Solución de referencia**

Petición del alumno:

> A partir de ahora, siempre que hagas un resumen, escríbelo en un archivo `.md` dentro de una carpeta llamada `resumenes`, con el título en negrita, tres secciones fijas (Contexto, Puntos clave, Próximos pasos) y sin más de 300 palabras. Guárdalo como instrucción permanente.

Qué haría el agente:

1. Propone escribir esa instrucción en el **AGENTS.md** correspondiente, o crear una skill con el procedimiento.
2. Muestra el texto exacto que va a guardar: son "las notas que se dejan al becario antes de que empiece".
3. En una **sesión nueva**, al pedir un resumen, aplica el formato y guarda el archivo donde toca.
4. Si algo no encaja, lo dice y propone corregir la instrucción, no improvisar cada vez.

**Errores frecuentes**

| Lo que se ve | Qué está pasando | Qué hacer |
|---|---|---|
| En la sesión nueva el agente ignora las instrucciones | Se guardaron en un AGENTS.md que no corresponde al proyecto activo, o no se llegaron a guardar | Revisar si es el global o el del proyecto, y la raíz del proyecto en uso |
| El alumno cree que el agente "recuerda" la conversación anterior | Cada sesión es independiente; lo permanente vive en el AGENTS.md o en la skill | Explicar la diferencia entre memoria permanente y contexto de la conversación |
| Instrucciones contradictorias y resultado raro | Hay reglas viejas que chocan con las nuevas | Leer el archivo y limpiar: menos reglas y más claras |
| La skill no se usa nunca | Ruta o nombre incorrectos: debe estar en `.dsh/skills/<nombre>/SKILL.md` dentro del proyecto | Comparar con el ejemplo ya existente `.dsh/skills/precios-gasolineras/SKILL.md` |
| El agente guarda las notas en un sitio raro | No se le indicó la ruta y eligió una carpeta del espacio de trabajo | Indicar explícitamente la carpeta de configuración del usuario o la raíz del proyecto |

**Plan B si no sale**

- Si la escritura del AGENTS.md se atasca, que dicte las instrucciones en voz alta y las guarde a mano en un archivo de texto.
- Si no se atreve con skills, quédate con el AGENTS.md: cubre el mismo objetivo.
- Si el grupo no tiene proyecto propio, usa la carpeta de ejemplo del seminario.

**Si alguien va muy rápido**

- Que convierta un procedimiento largo ("cómo preparo el informe semanal") en una skill con nombre propio y la pruebe en una sesión nueva desde cero.
- Que escriba dos instrucciones y compruebe cuál gana cuando se contradicen: enseña a priorizar.

---

## Práctica 5 — Encargo integrador

**Objetivo:** realizar un encargo real de principio a fin, con **varias acciones encadenadas**, y verificar el resultado por parte del alumno.

**Qué debería pasar**

- El alumno pide algo que requiere varios pasos: buscar información en los archivos, crear una carpeta y escribir uno o varios documentos.
- El agente encadena las acciones y pide aprobación solo si sale de la zona delimitada.
- Al terminar, el agente resume qué ha leído y qué ha escrito, con rutas.
- El alumno **abre los archivos y comprueba** que el contenido se corresponde con lo pedido.

**Cómo saber que salió bien**

- El agente ha hecho **más de una acción** sin que se lo repitan paso a paso.
- El alumno abre los archivos generados y el contenido encaja con lo pedido.
- Hay un cierre del agente que lista qué archivos ha tocado y con qué resultado.
- Si hubo avisos de aprobación, el alumno sabe decir por qué aparecieron.

**Solución de referencia**

Petición del alumno:

> En la carpeta del proyecto que te he dado: mira todos los documentos, crea una carpeta `informe` y dentro escribe un `informe.md` de dos páginas con un índice, los puntos clave, las contradicciones que encuentres entre documentos y una lista de 5 tareas pendientes. Al terminar, dime exactamente qué archivos has creado y qué has leído.

Qué haría el agente:

1. Lista y lee los documentos del espacio de trabajo.
2. Crea la carpeta `informe`.
3. Escribe el archivo con la estructura pedida.
4. Devuelve un resumen: archivos leídos, archivo creado, ruta completa y qué partes son interpretación suya.
5. Verificación del alumno: abrir el archivo, comprobar el índice y leer al menos las contradicciones señaladas.

**Errores frecuentes**

| Lo que se ve | Qué está pasando | Qué hacer |
|---|---|---|
| El alumno acepta el resultado sin abrir nada | Confunde "el agente dice que lo ha hecho" con "está hecho" | Regla de la sala: **el que revisa es el humano**; abrir siempre el archivo |
| El informe incluye datos que no existen | El agente ha rellenado huecos; hay que verificar cada afirmación frente a la fuente | Pedir que cite de qué archivo sale cada punto, corregir y repetir |
| El encargo no avanza y el agente da vueltas | El encargo es demasiado amplio o ambiguo para una sola petición | Partirlo en dos encargos y decir formato, extensión y carpeta de destino |
| Se disparan avisos de aprobación en cadena | El encargo sale del espacio de trabajo (escritorio, carpeta personal, unidad de red) | Mover el trabajo **dentro** del espacio de trabajo: la solución no es aprobar cien avisos |
| El resultado empeora hacia el final | La mesa de trabajo (el contexto) se ha llenado de papeles | Empezar una **sesión nueva** y dejar por escrito lo esencial en el AGENTS.md o en una skill |

**Plan B si no sale**

- Reduce el encargo a dos pasos y déjalo ahí: es mejor terminar algo pequeño que no terminar nada.
- Si el agente se pierde, que el alumno pida primero el índice y luego el contenido.
- Si no hay tiempo, hazlo tú en pantalla grande mientras ellos dictan las instrucciones.

**Si alguien va muy rápido**

- Que añada un paso de verificación: pedir al agente que revise su propio informe y señale sus tres puntos más débiles.
- Después, contrastar esa autocrítica con el archivo real: enseña que el agente se equivoca y se corrige.

---

## Problemas técnicos de sala

| Síntoma | Causa probable | Solución |
|---|---|---|
| Al arrancar dice que el puerto 3080 está ocupado | Ya hay un harness u otro programa usando ese puerto | Cerrar la otra instancia; si no la encuentras, reiniciar el equipo y volver a arrancar |
| `node` no se reconoce, o da errores de versión | Node.js no está instalado o es demasiado antiguo | Instalar o actualizar Node.js y **abrir una terminal nueva** para que tome el PATH |
| `npx` no se reconoce como comando | Instalación de Node.js incompleta, o terminal sin reiniciar | Reinstalar Node.js completo, cerrar y abrir la terminal |
| La interfaz no carga en el navegador | Se abrió una dirección equivocada, o el navegador está desactualizado | Escribir a mano **http://127.0.0.1:3080**; probar con otro navegador |
| El navegador no se abre solo | Se arrancó con la opción de no abrir el navegador | Abrir la dirección a mano; para que se abra sola, arrancar sin `--no-open` |
| Error de modelo o respuesta vacía al enviar | Falta la clave de API | Ajustes → Modelos → introducir la clave de **https://platform.deepseek.com/** y guardar |
| "Clave inválida" o error de cuota | Clave mal copiada, caducada o **sin saldo** | Volver a copiar la clave completa y revisar el saldo en la plataforma |
| No aparece el cuadro para escribir mensajes | No hay espacio de trabajo seleccionado | **Elegir espacio de trabajo** → añadir la carpeta → seleccionarla |
| El agente parece colgado o tarda mucho | Está pensando, esperando una aprobación o la red va lenta | Mirar si hay un aviso de aprobación pendiente; esperar; si sigue igual, abrir una sesión nueva |
| Errores de conexión, certificados o "proxy" | Red corporativa o proxy que filtra la salida a internet | Probar con otra red o con el móvil como punto de acceso; pedir al informático la configuración del proxy |
| El firewall o el antivirus bloquean el programa | Bloqueo de ejecución o de conexión local | Añadir una excepción para Node.js y para la dirección local; si no se puede, usar otro portátil |
| "Permiso denegado" al leer o escribir una carpeta | Permisos del sistema operativo, carpeta sincronizada o de solo lectura | Usar una carpeta propia y sencilla del usuario; evitar carpetas sincronizadas en la nube |
| El agente dice que no puede escribir el archivo | La ruta está fuera del espacio de trabajo o el modo de permisos no lo permite | Mover la tarea dentro del espacio de trabajo y revisar la política de permisos |
| Las respuestas empeoran o se vuelven repetitivas | El contexto se ha llenado: la mesa está llena de papeles | Abrir una **sesión nueva** y guardar lo importante en el AGENTS.md o en una skill |
| El alumno cierra la terminal y el servidor se para | El servidor vive en esa terminal: cerrarla lo apaga | Volver a arrancarlo con `npx @deepseek-ai/dsh web`, o `dsh web` si está instalado globalmente |
| Un alumno no puede instalar nada | Portátil corporativo o usuario restringido | Usar el arranque sin instalar (`npx @deepseek-ai/dsh web`); si tampoco, práctica por parejas |

---

## Frases de rescate para el instructor

Sirven para decir en voz alta cuando algo falla delante de la clase.

1. "Esto es exactamente lo que veníamos a ver: por esto existe el «¿seguro?» antes de salir de la sala."
2. "Tranquilo, esto le pasa a la mitad de la sala. Vamos a mirarlo entre los dos."
3. "Fallar aquí no es un problema tuyo, es información: acabamos de aprender qué límite tiene el agente."
4. "Mientras arreglamos esto, fíjate en lo que ya ha ido bien: ha leído tu carpeta."
5. "Vamos a leer juntos el mensaje. Casi siempre dice lo que pasa."
6. "Si en dos minutos no sale, seguimos con el compañero y volvemos a esto después."
7. "El agente se equivoca y se corrige; la responsabilidad de revisar es nuestra."
8. "No hace falta saber programar para esto, solo hace falta leer lo que te pide."
9. "Guarda una captura del error: es un buen apunte para tu cuaderno."
10. "Vamos al plan B: lo hacemos dentro del espacio de trabajo y lo vemos funcionando."

---

## Criterios de evaluación de las prácticas

Se evalúa el criterio, no la velocidad. Nadie tiene que terminar todas las prácticas.

| Nivel | Qué se observa |
|---|---|
| **No lo consigue** | No arranca el harness o no llega a enviar una petición. No distingue el chat del agente. Necesita que el instructor haga clic por él. |
| **Lo consigue con ayuda** | Completa la práctica con pistas del instructor. Reconoce el aviso de aprobación pero no explica qué lo provoca. Confunde el espacio de trabajo con la carpeta de configuración. |
| **Lo consigue solo** | Arranca, elige espacio de trabajo, formula la petición y verifica el resultado. Explica sandbox, aprobación y memoria permanente con sus propias palabras. Sabe qué hacer cuando algo falla. |
| **Va más allá** | Cambia la política de permisos a propósito y explica el efecto. Guarda un procedimiento en el AGENTS.md o como skill y lo prueba en sesión nueva. Razona sobre mínimo privilegio y datos sensibles. |

**Qué mirar en cada práctica**

- **Práctica 1:** ¿el cuadro de mensajes está habilitado? ¿el resumen menciona archivos reales de su carpeta?
- **Práctica 2:** ¿aparece el aviso y el agente espera? ¿el alumno sabe qué está aprobando y por qué?
- **Práctica 3:** ¿la misma tarea dentro del espacio de trabajo ya no pide permiso? ¿sabe explicar la diferencia?
- **Práctica 4:** ¿las instrucciones están guardadas donde toca? ¿se respetan en una sesión nueva?
- **Práctica 5:** ¿el alumno abre el archivo y verifica? ¿distingue lo que el agente ha leído de lo que ha interpretado?

---

## Qué NO debe hacer el instructor

1. **No aprobar permisos en el portátil de un alumno sin explicarlo.** Si lo haces tú, le enseñas a aprobar a ciegas. Lee el aviso en voz alta y deja que decida él.
2. **No prometer que el agente nunca se equivoca.** Es "developer preview", itera rápido y habrá cambios que rompan compatibilidad. La revisión humana es parte del método.
3. **No usar datos reales sensibles en las demostraciones.** Ni nóminas, ni datos de salud, ni credenciales, ni contratos. Prepara una carpeta de ejemplo aburrida.
4. **No culpar al alumno delante del grupo.** Un "esto le pasa a muchos" desatasca más que un "te has saltado un paso".
5. **No improvisar con datos de alumnos en pantalla compartida.** Nada de abrir su carpeta personal, su correo o sus archivos por muy rápido que sea.
6. **No presentar el sandbox y las aprobaciones como una garantía.** Reducen el riesgo, no garantizan aislamiento y no deben ser el único control de seguridad. Recomienda mínimo privilegio, máquina virtual o contenedor desechable, copias de seguridad y revisar plugins y comandos antes de permitirlos.
7. **No meter credenciales propias en el portátil de un alumno.** Que cada uno use su clave de API y su propia cuenta.
