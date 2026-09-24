# Cuaderno de laboratorio — Del chat al agente

**Seminario:** Del chat al agente: qué es un harness y cómo se usa.
**Qué es esto:** tu cuaderno de prácticas. Lo vas a usar con el portátil delante, escribiendo de verdad.
**Cuánto dura:** unas dos horas repartidas en cinco prácticas.

> **Regla de la sala:** si te atascas más de tres minutos, levanta la mano. No hay nada que haga perder más tiempo que diez personas atascadas en silencio.

---

## Antes de empezar: la carpeta de práctica

Vas a trabajar **siempre dentro de una copia de la carpeta de práctica**. Eso no es un capricho: es tu principal medida de seguridad. Usaremos un expediente ficticio de una empresa de ejemplo, preparado para el curso.

1. Descarga `descarga_entorno.zip` desde la página **Entorno de práctica** del curso y descomprímelo en un lugar fácil de encontrar, como Documentos.
2. Cambia el nombre de la carpeta extraída a `practica_agente`.
3. Conserva aparte el ZIP original como copia limpia para empezar de nuevo si hace falta.
4. Comprueba que dentro de `practica_agente` hay una carpeta `informes`, dos archivos CSV y los documentos de configuración y reunión.
5. **No uses la carpeta original del repositorio como espacio de trabajo.** El agente puede modificar archivos; elige la copia `practica_agente`.

> ⚠️ **Por qué insistimos con la copia de seguridad:** el agente va a poder leer y modificar los archivos de esta carpeta, y va a ejecutar acciones de verdad. No es una simulación. Si prefieres practicar con algo que no te importe perder, mejor.

**Qué necesitas tener a mano:**
- Tu clave de API de DeepSeek (la del correo de preparación).
- El portátil con el cargador enchufado.

---

## Práctica 1 — Primer arranque y primer encargo

**Tiempo:** unos 20 minutos.
**Objetivo:** tener el harness funcionando y haber completado un encargo de principio a fin.

### Paso 1 — Abre una terminal

- **Windows:** menú Inicio → escribe `PowerShell` o `Terminal` → ábrelo.
- **macOS:** `Cmd + Espacio` → escribe `Terminal` → Enter.

Es una ventana negra o azul donde se escriben órdenes. No pasa nada, no vas a romper nada.

### Paso 2 — Comprueba que tienes Node.js

El harness necesita un programa que se llama **Node.js**. Seguramente lo dejaste instalado al hacer la preparación previa; compruébalo en un segundo escribiendo esto y pulsando Enter:

```
node -v
```

- **Si aparece un número** (por ejemplo `v22.14.0`), todo bien: pasa al siguiente paso.
- **Si no aparece nada, o dice que `node` no se reconoce**, hay que instalarlo:
  1. Entra en la web oficial de Node.js y descarga el instalador.
  2. Elige la versión marcada como **LTS** (la estable; no la que pone «Current»).
  3. Instala con las opciones por defecto.
  4. **Cierra la terminal y ábrela otra vez**, y repite `node -v`.

> La orden `npx`, que usaremos en el paso siguiente, viene **incluida con Node.js**. Por eso, si `node -v` funciona, lo demás ya está listo.

### Paso 3 — Arranca el harness

Escribe esta orden y pulsa Enter:

```
npx @deepseek-ai/dsh web
```

La primera vez puede tardar un poco: está descargando lo que necesita. Verás varias líneas pasando por la pantalla. **Es normal.**

Cuando termine, se abrirá **sola** una página en tu navegador. Si no se abre, ábrela tú y escribe esta dirección:

```
http://127.0.0.1:3080
```

**No cierres la ventana de la terminal.** Si la cierras, se apaga el agente.

### Paso 4 — Configura el modelo

Sin esto, el agente no puede pensar.

1. Busca **Ajustes** (o *Settings*).
2. Entra en **Modelos** (o *Models*).
3. Pega tu **clave de API** de DeepSeek.
4. Guarda.

Se aplica al momento, **no hace falta reiniciar nada**.

### Paso 5 — Elige tu espacio de trabajo

1. Pulsa el botón **Elegir espacio de trabajo** (o *Choose workspace*).
2. Añade la carpeta `practica_agente` que has extraído y renombrado.
3. Selecciónala.

> 🔎 **Si el cuadro donde se escriben los mensajes está deshabilitado y no te deja escribir nada, es casi seguro esto: no has elegido espacio de trabajo.** El agente no sabe dónde trabajar, así que no te deja empezar. Vuelve al paso 5.

### Paso 6 — Tu primer encargo

Escribe esto tal cual, cambiando lo que haga falta para que encaje con tu carpeta:

> Mira qué hay en la carpeta `informes` y hazme un índice de los archivos, agrupados por tipo, en un archivo nuevo llamado `INDICE.md`. No modifiques ningún archivo original.

### Qué deberías ver

- Que el agente **no responde de golpe**: va dando pasos.
- Que cada paso aparece en pantalla, indicando qué está haciendo.
- Que al final te dice **dónde ha dejado** el archivo nuevo.

### ✅ Comprobación

- [ ] Hay un archivo nuevo, `INDICE.md`, dentro de tu carpeta.
- [ ] Lo has abierto y el contenido tiene sentido.
- [ ] Los archivos originales siguen ahí, intactos.
- [ ] Sabrías decir **qué herramientas** ha usado el agente para hacerlo (mirar la carpeta, leer, escribir...).

### Si algo falla

| Lo que ves | Qué hacer |
|---|---|
| «`npx` no se reconoce como una orden» | Node.js no está instalado o la terminal se abrió antes de instalarlo. Cierra la terminal, ábrela otra vez. Si sigue, revisa la guía de instalación previa. |
| La página no carga | Comprueba que la terminal sigue abierta y que la dirección es exactamente `http://127.0.0.1:3080`. |
| El cuadro de mensajes está gris | No has elegido espacio de trabajo. Paso 5. |
| Dice que la clave no es válida | Revisa que has copiado la clave entera, sin espacios, y que la cuenta tiene saldo. |
| El agente tarda mucho | Está trabajando. Mira el panel de pasos: si avanza, déjalo. |

---

## Práctica 2 — Provocar una aprobación

**Tiempo:** unos 10 minutos.
**Objetivo:** ver con tus ojos qué pasa cuando el agente intenta salir de su zona, y entender qué te está pidiendo exactamente.

Esta es la práctica más importante del seminario. Léela entera antes de empezar.

### Paso 1 — Pídele algo que está fuera de su zona

**Asegúrate de que tienes la carpeta `practica_agente` seleccionada como espacio de trabajo.** Ahora pídele algo que ocurra **fuera** de ella, por ejemplo en el escritorio:

> Crea un archivo llamado `prueba_agente.txt` en el escritorio de mi usuario, con el texto «prueba».

### Paso 2 — Para y mira

**No apruebes nada todavía.** Va a aparecer un **aviso de aprobación**. Lee el aviso entero, despacio, antes de tocar nada.

### Paso 3 — Hazte las tres preguntas

Antes de decidir, contesta por escrito:

1. **¿Qué me está pidiendo exactamente?**
   (¿leer un archivo? ¿escribir uno nuevo? ¿ejecutar una orden? ¿dónde?)
   ________________________________________________________________

2. **¿Qué pasaría si digo que sí?**
   (Piensa en algo concreto: qué archivo aparecería, dónde, y qué cambiaría en tu ordenador.)
   ________________________________________________________________

3. **¿Puedo acotarlo?**
   (¿Podrías pedirle que lo haga dentro de la carpeta de trabajo en vez de en el escritorio?)
   ________________________________________________________________

### Paso 4 — Decide, conscientemente

Ahora sí: **permite una vez**. Y observa lo que pasa.

### Paso 5 — El detalle que hay que entender

Repite la petición otra vez:

> Crea un archivo llamado `prueba_agente2.txt` en el escritorio.

**Te va a volver a preguntar.**

> **«Permitir una vez» es permitir esa vez. No vale para siempre.**

Es incómodo **a propósito**: ese pequeño fastidio es lo que te obliga a pensar si de verdad quieres que el agente salga de su zona. Un permiso que se diera «para siempre» con un clic sería más cómodo y mucho más peligroso.

### Paso 6 — Limpia

Borra los archivos de prueba que hayas creado en el escritorio. Se llaman `prueba_agente.txt` y `prueba_agente2.txt`.

### ✅ Comprobación

- [ ] He visto aparecer un aviso de aprobación.
- [ ] He leído el aviso **antes** de aprobarlo.
- [ ] Sé explicar con mis palabras qué me estaba pidiendo.
- [ ] He comprobado que al repetir la petición **vuelve a preguntar**.
- [ ] He borrado los archivos de prueba.

### Los dos malos hábitos que ya puedes reconocer

- **Aprobar por inercia:** después del aviso número veinte, pulsas «permitir» sin leer. En ese momento el aviso ha dejado de protegerte.
- **Subir el nivel de permiso para que deje de preguntar:** es como quitar el freno porque el coche hace ruido al frenar.

> **Regla de oro:** si no entiendes qué te está pidiendo, **no lo apruebes**. Pídele que te lo explique con palabras o que te diga qué va a tocar antes de tocarlo.

---

## Práctica 3 — Cambiar de política

**Tiempo:** unos 8 minutos.
**Objetivo:** comprobar que tú decides el tamaño de la sala, y que eso cambia las reglas del juego.

### Paso 1 — La misma tarea, pero dentro

Pide lo mismo que antes, esta vez **dentro** de tu carpeta de trabajo:

> Crea un archivo llamado `prueba_dentro.txt` en la carpeta `practica_agente`, con el texto «prueba».

### Paso 2 — Observa

**No ha preguntado nada.** Lo ha hecho y punto.

### Paso 3 — Saca la conclusión

> **El agente no es más listo ni más tonto. Has cambiado dónde trabaja.**

Al mover el trabajo dentro de la carpeta de trabajo:
- **Desaparecen los avisos**, porque ya no necesita salir de su zona.
- **Baja el riesgo**, porque está trabajando en un sitio acotado que tú controlas.

Por eso, cuando una tarea te obligue a aprobar cien avisos, **la solución no es aprobarlos todos**:

> **Si una tarea te obliga a aprobar cien avisos, el problema no es el agente: es dónde está trabajando. Mueve el trabajo dentro de la carpeta y los avisos desaparecen solos.**

### ✅ Comprobación

- [ ] El archivo `prueba_dentro.txt` existe dentro de `practica_agente`.
- [ ] **No ha pedido ninguna aprobación.**
- [ ] Sé explicar la diferencia con la Práctica 2 en una frase.

### Y no lo olvides

> **El sandbox reduce el riesgo, no lo elimina.** Todo lo que está **dentro** de la carpeta autorizada, el agente lo puede tocar sin preguntar. Si dentro hay algo que no debería tocarse, el problema es lo que hay en la carpeta.

---

## Práctica 4 — Enseñarle un procedimiento

**Tiempo:** unos 5 minutos (más si te animas).
**Objetivo:** dejar una instrucción permanente y comprobar que sobrevive a cerrar la conversación.

### La idea

Hasta ahora, cada vez que quieres algo tienes que explicárselo. Si tienes una preferencia que se repite, **no la repitas cada día: escríbela una vez.**

> **`AGENTS.md` son las notas que dejas al becario antes de que empiece.**

### Paso 1 — Pide que cree sus propias notas

Lo más fácil es pedírselo al propio agente:

> Crea en la raíz de esta carpeta de trabajo un archivo `AGENTS.md` con estas instrucciones para ti:
> - Responde siempre en español.
> - Cuando crees un informe, guárdalo siempre en la carpeta `informes`.
> - Nunca modifiques ni borres los archivos originales: si necesitas cambiarlos, crea una copia.
> - Al terminar cualquier tarea, dime qué archivos has tocado.

*(Si prefieres escribirlo tú a mano, crea el archivo `AGENTS.md` en la raíz de la carpeta de trabajo y pega esas mismas líneas.)*

### Paso 2 — El detalle que hace que esto sea una prueba de verdad

**Abre una conversación nueva.** No sigas en la misma.

En la misma conversación no demuestra nada: el agente se acuerda de lo que le has dicho porque lo tiene delante, en su mesa de trabajo. **La prueba de verdad es empezar de cero.**

### Paso 3 — Comprueba que las respeta

En la conversación nueva, pídele algo normal, por ejemplo:

> Hazme un resumen de los archivos de la carpeta `informes`.

Y observa si cumple las notas: ¿responde en español?, ¿guarda el resultado en `informes`?, ¿te dice qué archivos ha tocado?

### ✅ Comprobación

- [ ] Existe el archivo `AGENTS.md` en la raíz de mi carpeta de trabajo.
- [ ] He abierto una **conversación nueva**.
- [ ] El agente ha respetado las instrucciones **sin que se las repita**.
- [ ] Sé explicar la diferencia entre lo que dura una conversación y lo que es permanente.

### Si te sobra tiempo: un procedimiento guardado (skill)

Las notas son preferencias. Los **procedimientos guardados** (skills) son para tareas que repites siempre igual:

> **Las skills son procedimientos guardados, como recetas de cocina.**

Pídele al agente que te cree una:

> Crea una skill llamada `resumen-informes` que consista en: leer todos los archivos de la carpeta `informes`, crear un archivo `resumen_general.md` con una tabla de tres columnas (archivo, tema, conclusión) y no modificar los originales.

Después, en una conversación nueva, pídele «hazme el resumen de informes» y comprueba que sigue la receta.

### La lección, para llevártela

> **Si te descubres explicando lo mismo por tercera vez, el problema no es el agente: es que no le has dejado notas.**

---

## Práctica 5 — Encargo integrador

**Tiempo:** unos 13 minutos.
**Objetivo:** hacer un encargo completo tú solo, y **verificarlo**. Aquí ya no hay instrucciones que copiar.

### Paso 1 — Piensa una tarea real tuya

Pequeña, que tenga que ver con archivos, y que puedas comprobar en dos minutos. Por ejemplo: ordenar archivos por tipo, sacar un listado, resumir varios documentos, extraer datos repetidos, unificar notas sueltas.

### Paso 2 — Redacta el encargo con las cuatro partes

Este patrón es lo más útil que te llevas hoy. Cópialo de aquí en adelante:

> **1. Qué quiero** — el objetivo, con un resultado concreto.
> **2. Dónde** — la carpeta exacta.
> **3. Qué NO tocar** — los límites, dichos explícitamente.
> **4. Cómo sabré que está bien** — tu criterio de éxito.

**Ejemplo completo:**

> «En la carpeta `practica_agente/informes` hay cinco informes en texto. Léelos y créame `resumen_general.md` con una tabla de tres columnas: tema, conclusión y nivel de urgencia.
> **No modifiques ninguno de los cinco archivos originales.**
> Al terminar, dime qué archivos has leído y cuántas filas tiene la tabla.»

**Mi encargo:**
```
1. Qué quiero: ______________________________________________
2. Dónde: ___________________________________________________
3. Qué NO tocar: ____________________________________________
4. Cómo lo comprobaré: ______________________________________
```

### Paso 3 — Lánzalo y mira los pasos

No te vayas a por un café. **Mira cómo trabaja.** Cada paso te dice qué herramienta está usando. Ahí es donde te darás cuenta si va por donde no debe.

### Paso 4 — Verifica. Esta es la parte importante

Cuando diga «hecho», **no está hecho: está propuesto.**

> **El agente no firma su trabajo. Lo firmas tú cuando dices que está bien.**

- [ ] He **abierto** el archivo resultante (no vale «tiene buena pinta»).
- [ ] He **contado**: ¿están todos los elementos?, ¿las filas que debería?
- [ ] He comprobado que **los archivos que no debía tocar siguen intactos**.
- [ ] Le he preguntado **qué archivos ha tocado**, y la respuesta cuadra con lo que veo.

### ✅ Comprobación

- [ ] He escrito un encargo con las cuatro partes.
- [ ] El agente ha producido un resultado.
- [ ] He verificado el resultado abriéndolo y contando.
- [ ] He comprobado que lo que no debía tocarse no se ha tocado.
- [ ] Sé decir **una cosa que revisaría mejor la próxima vez**.

> ⚠️ **Cuidado con esta trampa:** el resultado llega **bien escrito, bien maquetado y con tono seguro**. Eso no significa que sea correcto. Un agente puede equivocarse con una seguridad perfecta.

---

## Hoja de registro

Rellénala sobre la marcha. Te sirve para el cuestionario final y para acordarte de lo que has hecho.

| Práctica | Qué pedí | Qué pasó | Qué comprobé |
|---|---|---|---|
| 1 — Primer arranque | | | |
| 2 — Provocar una aprobación | | | |
| 3 — Cambiar de política | | | |
| 4 — Enseñarle un procedimiento | | | |
| 5 — Encargo integrador | | | |

**Lo que me ha sorprendido:**
________________________________________________________________

**Lo que no dejaría que hiciera sin mirar:**
________________________________________________________________

**La primera tarea que le voy a encargar el lunes:**
________________________________________________________________

---

## Recordatorio final: las cuatro reglas

1. **Copia de seguridad** de la carpeta antes de empezar.
2. **Una carpeta específica** para cada trabajo. Ni el escritorio entero ni, mucho menos, todo el disco.
3. **Nada confidencial** dentro de la carpeta de trabajo, salvo que aceptes el riesgo a conciencia.
4. **Revisa antes de aprobar y verifica al terminar.** Las dos cosas, siempre.

> **Hoy no has aprendido a usar un programa. Has aprendido a dirigir a alguien que trabaja muy rápido, que no sabe lo que no sabe, y que tiene acceso a tus archivos. La herramienta te va a servir; los frenos te van a proteger.**
