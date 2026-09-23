# Apuntes del alumno — Del chat al agente

**Seminario:** Del chat al agente: qué es un harness y cómo se usa.
**Qué necesitas para seguir estos apuntes:** haber usado alguna vez un chat de IA. Nada más.

Estos apuntes están escritos para que los entiendas **sin el instructor delante**. Si algo no te cuadra mientras los lees en casa, es que falta un ejemplo: pídelo.

---

## 1. De qué va todo esto, en cinco líneas

Has usado chats de IA: escribes una pregunta, te llega una respuesta de texto, y el trabajo lo haces tú. Un **agente** es distinto. Además de responderte, **puede actuar**: leer tus archivos, escribir archivos nuevos, ejecutar cosas en tu ordenador. Y el **harness** es el programa que hace posible esa parte: el que le da las manos, le pone los límites y te deja ver lo que hace.

La buena noticia: hace mucho más que un chat.
La noticia que hay que tomarse en serio: **hace mucho más que un chat, en tu ordenador, a toda velocidad.** Estos apuntes van sobre todo de eso.

---

## 2. Del chat al agente

### 2.1 Lo que ya sabes hacer

Con un chat normal: preguntas, te responde, y después tú copias, pegas, abres el archivo y cambias el dato. **El chat aconseja; el trabajo lo pones tú.**

### 2.2 La idea que hay que llevarse

> **Un chat es un consultor por teléfono: te dice qué hacer y lo haces tú.**
> **Un agente es un becario con acceso a tu ordenador: lo hace y tú revisas.**

Si al final del seminario recuerdas una sola frase, que sea esta.

### 2.3 Las tres diferencias, y solo tres

| | Un chat | Un agente |
|---|---|---|
| **Qué puede hacer** | Escribir texto | Escribir texto **y usar herramientas** |
| **Cómo trabaja** | Una respuesta y se calla | **En bucle**: paso, mira el resultado, siguiente paso |
| **Qué deja detrás** | Nada. Cero efectos. | **Archivos cambiados, cosas instaladas, trabajo hecho** |

La tercera es la importante. Cuando terminas de hablar con un agente, **en tu ordenador ha pasado algo**. Eso es exactamente lo que lo hace útil y lo que obliga a ponerle frenos.

### 2.4 El motor y el coche

La palabra del título, explicada de una vez:

> **El modelo es el motor. El harness es el coche completo: el volante, los frenos, el salpicadero y las ruedas.**

El modelo es lo que «piensa». Pero un motor suelto sobre el suelo no te lleva a ningún sitio. El harness es todo lo demás: la parte que le da manos, la que decide qué puede tocar, la que te enseña por dónde va.

Fíjate en un detalle: **un chat también es un coche, pero muy sencillo.** Motor, un volante y nada más. Un agente es un coche con frenos, espejos y cinturón. Esa es toda la diferencia.

### 2.5 El mismo encargo, de dos maneras

Tienes un informe de veinte páginas en una carpeta.

**Con un chat:**
1. Abres el documento.
2. Copias todo el texto.
3. Lo pegas en el chat.
4. Escribes «resúmeme esto».
5. Esperas.
6. Copias el resumen.
7. Lo pegas en un archivo nuevo.

**Con un agente:**
1. Escribes: *«Resume el informe que está en esta carpeta y guárdame el resumen al lado, en un archivo nuevo.»*
2. El agente abre el archivo, lo lee, escribe el resumen y te dice dónde lo ha dejado.

**Cero pasos tuyos, y un archivo que antes no existía.**

### 2.6 La consecuencia incómoda

Esto hay que decirlo claro, porque es la base de todo lo demás:

> **Un agente es como un becario muy motivado: trabaja a gran velocidad y no sabe lo que no sabe.**

Va a hacer lo que le pidas **con una seguridad total**, aunque se esté equivocando. Va a tocar archivos en segundos. Y si le has pedido algo mal, hará mal la cosa mala, rapidísimo, sin dudar. No te va a avisar de que no estaba seguro.

De ahí salen los frenos. Y por eso la parte más importante de estos apuntes es la de permisos.

---

## 3. Las piezas de un harness

Seis piezas. No hace falta memorizarlas, hace falta reconocerlas en la pantalla.

| Pieza | Qué es, en palabras llanas |
|---|---|
| **Modelo** | El motor. El que piensa y decide. |
| **Herramientas** | Las manos. Lo que puede hacer de verdad. |
| **Bucle** | El ritmo de trabajo: piensa, actúa, mira el resultado, repite. |
| **Contexto** | La mesa de trabajo. Todo lo que tiene delante ahora mismo. |
| **Permisos** | Los frenos. Qué puede hacer sin preguntar y qué no. |
| **Interfaz** | El salpicadero. Donde tú ves lo que está pasando. |

### 3.1 El bucle: piensa, actúa, observa, repite

```
   ┌──────────────────────────────────────────┐
   │                                          │
   ▼                                          │
PIENSA ──► ACTÚA ──► OBSERVA ──► (¿ya está?) ─┘
(el modelo  (el harness  (el harness
 decide)     ejecuta)     devuelve
                          el resultado)
```

**El detalle que casi nadie sabe: el modelo no ejecuta nada. El modelo propone.**

El modelo piensa «para resumir esto tengo que leer el archivo» y **pide** que se lea. El harness lo lee y le devuelve el contenido. El modelo lo mira, piensa el resumen y **pide** que se escriba un archivo. El harness lo escribe. Y así, cien veces si hace falta.

¿Por qué te importa esto? Porque significa que **el harness está en medio de todo**: es quien decide qué se le permite al modelo y es quien ejecuta de verdad. El modelo nunca toca tu disco directamente: solo ve lo que el harness le enseña.

### 3.2 Las herramientas: las manos

No hace falta memorizar la lista. Lo que hace falta es saber **que existe y que puedes mirarla**:

- **Leer archivos** de la carpeta de trabajo.
- **Escribir y modificar archivos.**
- **Ejecutar comandos** en la terminal. ← **la más potente de todas**.
- **Buscar y leer en internet.**
- **Lanzar tareas en segundo plano** mientras sigue con otra cosa.
- **Preguntarte a ti** cuando necesita que decidas algo.
- **Delegar** una parte del trabajo en otro agente.
- **Llevar una lista de tareas** y marcar lo que va terminando.

> ⚠️ **La herramienta de terminal merece un respeto especial.** Es la que permite instalar programas, mover cosas y cambiar el sistema. Con ella, el agente puede hacer mucho bien y también mucho daño en muy poco tiempo. Cuando la use, mira más despacio que cuando simplemente lee un archivo.

### 3.3 El contexto: la mesa de trabajo

> **Imagina una mesa. Todo lo que el agente sabe en este momento está encima de la mesa:** tu petición, los archivos que ha leído, lo que ha ido averiguando.

La mesa tiene un tamaño limitado. Cuando se llena de papeles, alguien tiene que recoger: se resume lo importante y se tira el resto.

**Consecuencia práctica: en tareas muy largas, el agente puede «olvidar» cosas que le dijiste al principio.** No es que sea tonto: es que eso ya no está encima de la mesa.

**Señales de que la mesa se ha llenado:**
- Repite cosas que ya había hecho.
- Olvida instrucciones que le diste al principio.
- Da vueltas sobre el mismo problema sin avanzar.
- Las respuestas se vuelven más vagas.

**Qué hacer:** cerrar y abrir una conversación nueva, diciéndole en el primer mensaje **qué ya está hecho y dónde**. Es más rápido que insistir. Y no arrastres una conversación larga para una tarea nueva y distinta: **cada tarea, su conversación.**

### 3.4 Los permisos: los frenos

Tienen sección propia, la 4. Es la más importante.

### 3.5 La interfaz: el salpicadero

**La interfaz no te enseña solo la respuesta final: te enseña los pasos.** Cada vez que el agente usa una herramienta, lo ves pasar.

Eso es tu ventana para darte cuenta **a tiempo** de que va por donde no debe. Y de ahí una advertencia:

> **Si no miras los pasos, te enteras de los errores cuando ya están hechos.**

---

## 4. Permisos: la parte que de verdad importa

Si solo pudieras leer un capítulo de estos apuntes, sería este.

### 4.1 Tres cosas distintas que la gente mezcla

| Concepto | Qué es | En una frase |
|---|---|---|
| **Sandbox** | La zona donde el agente puede moverse. Normalmente, la carpeta de trabajo que tú elegiste. | **La sala donde trabaja el becario.** |
| **Política de permisos** | El ajuste general: qué está permitido sin preguntar y qué no. | **El reglamento de la sala.** |
| **Aprobación** | El aviso puntual que aparece cuando algo se sale de lo permitido. | **El «¿seguro?» en la puerta.** |

Y la frase que lo resume todo:

> **Dentro de la sala, el becario hace lo que quiera. Para salir de la sala, te pide permiso.**

### 4.2 La decisión más importante que vas a tomar

Casi nadie lo espera, y es lo más útil de todo:

> **Tú eliges el tamaño de la sala.**

Cuanto más pequeña y más específica sea la carpeta de trabajo, **menos avisos y menos riesgo**. Si le das el escritorio entero, la sala es tu escritorio entero. Si le das una carpeta con cinco archivos, la sala son esos cinco archivos.

Esa decisión es tuya, la tomas antes de empezar, y es la que más te protege.

### 4.3 «Permitir una vez» significa una vez

Cuando aparece un aviso, una de las opciones es permitir. Y aquí está el malentendido más habitual:

> **«Permitir una vez» es permitir esa vez. No vale para siempre. La próxima, te vuelve a preguntar.**

Es incómodo **a propósito**. Ese pequeño fastidio es justo lo que te obliga a pensar si de verdad quieres que el agente salga de la sala. Un permiso que se concediera «para siempre» con un clic sería mucho más cómodo y mucho más peligroso.

### 4.4 Los dos malos hábitos

**1. Aprobar por inercia.**
Después del aviso número veinte, empiezas a pulsar «permitir» sin leer. En ese momento el aviso ha dejado de protegerte: estás firmando sin leer. Si te descubres haciéndolo, para.

**2. Subir el nivel de permiso para que deje de preguntar.**
Es como quitar el freno porque el coche hace ruido al frenar.

Y aquí está la solución de verdad:

> **Si una tarea te obliga a aprobar cien avisos, el problema no es el agente: es dónde está trabajando. Mueve el trabajo dentro de la carpeta de trabajo y los avisos desaparecen solos.**

### 4.5 La regla de oro

> **Si no entiendes qué te está pidiendo, no lo apruebes.**

Y no hace falta saberlo todo: **pídele que te lo explique con palabras**, o que te diga exactamente qué archivos va a tocar antes de tocarlos. Preguntar es gratis; aprobar, no siempre.

### 4.6 Lo que el sandbox NO hace

Esto es importante y se suele dar por hecho:

> **El sandbox reduce el riesgo, no lo elimina.**

Todo lo que está **dentro** de la sala autorizada, el agente lo puede tocar. No hay freno ahí dentro. Si dentro de la carpeta hay algo que no debería tocarse, el problema no es el agente: **es lo que hay en la carpeta.**

Y una regla aburrida que por eso mismo se salta todo el mundo:

> **Si no tienes copia de seguridad de algo, no lo pongas en la carpeta de trabajo.**

---

## 5. Contexto y memoria: qué sobrevive

### 5.1 Dos niveles

| | Duración | Qué es |
|---|---|---|
| **La conversación** | Se acaba | Lo que está en la mesa ahora mismo. Si cierras y abres otra, el agente no se acuerda de nada. |
| **Lo permanente** | Sobrevive | Lo que has dejado escrito: notas y procedimientos guardados. |

### 5.2 Las notas: `AGENTS.md`

> **`AGENTS.md` son las notas que dejas al becario antes de que empiece.**

Si tienes una preferencia que se repite — «responde en español», «no toques la carpeta de facturas», «los informes van siempre en la carpeta `informes`» — **no la repitas cada día: escríbela una vez.**

Hay dos sitios donde ponerlas:
- **Notas globales:** valen para todos tus proyectos. Para tus manías de siempre.
- **Notas por proyecto:** van en la carpeta del proyecto. Para lo que solo vale ahí.

### 5.3 Los procedimientos guardados: las skills

> **Las skills son procedimientos guardados, como recetas de cocina.**

Cuando repites una tarea siempre igual — el informe mensual, el mismo análisis, la misma limpieza de datos — la escribes una vez con sus pasos, y a partir de ahí el agente la sigue cuando le dices «hazme el informe mensual». Ya no tienes que explicárselo cada vez.

### 5.4 La lección

> **Si te descubres explicando lo mismo por tercera vez, el problema no es el agente: es que no le has dejado notas.**

---

## 6. Conectar herramientas que ya existen (MCP)

**MCP es un enchufe estándar, como el USB.**

Existen muchísimos programas que ya saben hacer cosas: GitHub, bases de datos, gestores de incidencias, servicios que guardan notas. Ese enchufe común permite conectarlos al agente, y entonces **sus funciones aparecen como herramientas nuevas**: el agente puede consultar tu base de datos o mirar tus incidencias como antes leía un archivo.

**Cuándo merece la pena:** cuando la información que necesitas **no está en archivos, sino en otro programa**.

> ⚠️ **Cada enchufe es una conexión nueva a tus cosas.** Conectar un servidor o instalar un plugin es una decisión de confianza, igual que instalar un programa en tu ordenador. Si vas a conectar algo que toca datos reales de tu empresa, consúltalo antes con quien corresponda.

---

## 7. Cómo pedir bien

Un buen encargo tiene cuatro partes. Cópialas, funcionan:

> **1. Qué quiero** — el objetivo, con un resultado concreto.
> **2. Dónde** — la carpeta exacta.
> **3. Qué NO tocar** — los límites, dichos explícitamente.
> **4. Cómo sabré que está bien** — tu criterio de éxito.

**Comparación real:**

| ❌ Así no | ✅ Así sí |
|---|---|
| «Ordena mis archivos» | «En la carpeta `practica/informes` hay archivos sueltos. Muévelos a subcarpetas por año. **No borres nada** y dime cuántos has movido.» |
| «Resume esto» | «Lee los cinco archivos de esta carpeta y créame `resumen.md` con una tabla: tema, conclusión, urgencia. **No modifiques los originales.**» |

**El cuarto punto es el que todo el mundo se salta y es el más útil.** Si tú no sabes cómo vas a comprobar que el resultado está bien, el agente tampoco.

---

## 8. Verificar: tu trabajo no acaba cuando el agente termina

Cuando el agente dice «hecho», **no está hecho**. Está *propuesto*.

> **El agente no firma su trabajo. Lo firmas tú cuando dices que está bien.**

Y ojo con esto, porque es una trampa real: el resultado llega **bien escrito, bien maquetado y con tono seguro**. Eso no significa que sea correcto. Un agente puede equivocarse con una seguridad perfecta.

**Cómo verificar en dos minutos:**
- Abre el archivo y **míralo**. No «tiene buena pinta»: ábrelo.
- **Cuenta:** ¿están todos los elementos? ¿las filas que debería?
- **Comprueba que lo que no debía tocarse sigue intacto.**
- Pregúntale al agente **qué ha hecho y qué archivos ha tocado**. Te lo dirá, y a veces la respuesta te sorprende.

---

## 9. Límites, dichos con honestidad

Esto no es para asustarte: es para que no te lleves un susto.

- **Es software experimental.** Está en fase de vistas previas de desarrollo, cambia rápido y habrá novedades que rompan lo anterior. No construyas nada crítico encima sin un plan B.
- **No ha pasado una auditoría de seguridad.** No está diseñado para ser seguro de fábrica.
- **El sandbox y las aprobaciones reducen el riesgo, pero no garantizan aislamiento**, y no deberían ser tu único control de seguridad. Si el trabajo es delicado, lo recomendable es usar una máquina virtual o un entorno dedicado y desechable.
- **La responsabilidad de revisar es tuya.** Es la contrapartida de la comodidad.

**Lo que sí está en tu mano:**
- Trabajar con **el mínimo privilegio necesario**. Ni uno más.
- Tener **copias de seguridad** de todo lo que el agente puede tocar.
- **No exponer credenciales** ni datos sensibles.
- **Revisar plugins y comandos** antes de permitirlos.

---

## 10. Las cuatro reglas para el lunes

1. **Copia de seguridad** de la carpeta antes de empezar.
2. **Una carpeta específica** para cada trabajo. Ni el escritorio entero ni, mucho menos, todo el disco.
3. **Nada confidencial** en la carpeta de trabajo, salvo que aceptes el riesgo a conciencia.
4. **Revisa antes de aprobar y verifica al terminar.** Las dos cosas, siempre.

---

## 11. Resumen de una página

**El cambio de fondo**
- Chat: te dice qué hacer y lo haces tú.
- Agente: un becario con acceso a tu ordenador. Lo hace y tú revisas.
- Modelo = motor. Harness = el coche completo.

**Las piezas**
- Herramientas (las manos), bucle (piensa-actúa-observa), contexto (la mesa de trabajo), permisos (los frenos), interfaz (el salpicadero).

**Los permisos**
- Dentro de la sala, libertad. Para salir, te pide permiso.
- Tú eliges el tamaño de la sala. Cuanto más pequeña, mejor.
- «Permitir una vez» = una vez.
- Si no lo entiendes, no lo apruebes.
- El sandbox reduce el riesgo; no lo elimina.

**El trabajo diario**
- Un buen encargo dice: qué, dónde, qué no tocar, y cómo se comprueba.
- Verifica siempre. El agente no firma su trabajo.
- Si repites una explicación por tercera vez, escríbela (`AGENTS.md` o una skill).
- Si la conversación se degrada, abre una nueva y resume lo hecho.

**Las cuatro reglas**
1. Copia de seguridad.
2. Una carpeta específica por trabajo.
3. Nada confidencial dentro.
4. Revisa antes de aprobar; verifica al terminar.

> **Hoy no has aprendido a usar un programa. Has aprendido a dirigir a alguien que trabaja muy rápido, que no sabe lo que no sabe, y que tiene acceso a tus archivos. La herramienta te va a servir; los frenos te van a proteger.**
