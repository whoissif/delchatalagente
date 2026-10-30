# Antes de empezar: prepara tu ordenador

Unos 15 minutos. Hazlo antes del Módulo 2: las prácticas usan un agente de verdad en tu ordenador, **opencode**, y sin esta preparación no podrás arrancarlo. Los módulos 1 y 3 y la evaluación se pueden seguir sin instalar nada.

## Qué vas a necesitar

| QUÉ | PARA QUÉ | CUESTA |
|---|---|---|
| Un ordenador con Windows o macOS en el que puedas instalar programas | Ejecutar el agente | — |
| **Node.js** | Es el programa con el que se instala opencode | Gratis |
| **opencode** | El harness del curso: un agente de código abierto con interfaz web en español | Gratis |
| Los **modelos gratuitos** de opencode | Es lo que permite al agente «pensar». Vienen incluidos: **no necesitas cuenta ni clave de API** | Gratis |
| La **carpeta de práctica** del curso | Trabajar con archivos ficticios, nunca con los tuyos | Gratis |

> **Gratis no quiere decir privado.** Lo que el agente lee de tu carpeta se envía al proveedor del modelo para que lo procese, y algunos modelos gratuitos usan esos datos para mejorar. En la Práctica 1 verás cuál elegir. Usa solo la carpeta de práctica, nunca datos reales, de clientes ni confidenciales.

## Paso 1. Abre la terminal

La **terminal** es una ventana donde escribes órdenes en texto en lugar de hacer clic en botones. No hace falta saber nada más que lo que pone aquí.

- **Windows:** pulsa la tecla Windows, escribe `PowerShell` (o `Terminal`) y ábrelo. Verás un texto que acaba en `>`: significa «escríbeme».
- **macOS:** pulsa **Cmd + Espacio**, escribe `Terminal` y pulsa Intro. El texto acaba en `$` o `%`.

## Paso 2. Instala Node.js

1. Escribe `node -v` en la terminal y pulsa Intro.
2. Si aparece un número (por ejemplo `v24.11.0`; sirve la versión 22 o superior), ya lo tienes: pasa al paso 3.
3. Si dice que `node` no se reconoce, entra en la web oficial, [nodejs.org](https://nodejs.org/), y descarga la versión marcada como **LTS** (la estable, no la «Current»).
4. Instálala con las opciones por defecto.
5. **Cierra la terminal y ábrela otra vez** (si no, no se entera de la instalación) y repite `node -v`.

## Paso 3. Instala opencode

1. En la terminal, escribe y pulsa Intro:

   ```
   npm install -g opencode-ai
   ```

2. Espera a que termine (unos segundos o un par de minutos). Verás un mensaje como `added 3 packages`.
3. **Cierra la terminal y ábrela otra vez.**
4. Comprueba que está instalado:

   ```
   opencode --version
   ```

   Debe aparecer un número de versión, por ejemplo `1.19.5`.

> `npm` viene con Node.js. La orden instala opencode **en tu usuario**, de forma permanente; para quitarlo más adelante, `npm uninstall -g opencode-ai`.

## Paso 4. Descarga la carpeta de práctica

1. Ve a la página [Entorno de práctica](../practica_ejemplo/LEEME.html) y descarga `descarga_entorno.zip`.
2. Descomprímelo en **Documentos** y llama a la carpeta `practica_agente`.
3. Guarda el ZIP aparte: es tu copia limpia para empezar de nuevo si algo sale mal.

## Paso 5. Prueba que arranca (y apágalo)

1. Entra en la carpeta de práctica y arranca opencode:

   ```
   cd Documents\practica_agente
   opencode web
   ```

   (En macOS: `cd ~/Documents/practica_agente` y después `opencode web`.)
2. Se abrirá sola una página en tu navegador con la interfaz de opencode. Si no, copia la dirección que aparece en la terminal (algo como `http://127.0.0.1:4096`) y pégala en el navegador.
3. Si ves la interfaz, está todo listo. **No hace falta configurar nada más**: la carpeta se abre en la Práctica 1.
4. Para apagarlo, haz clic en la terminal y pulsa **Ctrl + C** (o cierra la ventana). Cerrar solo la pestaña del navegador no lo apaga.

## Si algo no funciona

- **Un error casi nunca significa que hayas roto algo**: suele faltar un paso. Cerrar la terminal y volver a abrirla arregla la mayoría.
- **«npm», «node» u «opencode» no se reconoce:** falta instalar algo o la terminal se abrió antes de instalarlo. Vuelve al paso 2 o al 3.
- **En Windows sale un error rojo sobre «ejecución de scripts deshabilitada»:** usa la terminal **Símbolo del sistema** (`cmd`) en lugar de PowerShell para estas órdenes.
- **La página no carga:** comprueba que la terminal sigue abierta y copia exactamente la dirección que aparece en ella.
- **No tienes permisos para instalar** (ordenador del trabajo): pide ayuda a tu departamento de informática o usa un ordenador personal.
- **Te has atascado más de diez minutos:** no te quedes ahí. Copia el texto del error y búscalo en la [documentación oficial de opencode](https://opencode.ai/docs/) o pregunta en su comunidad (en *Recursos oficiales*, al final del menú).

## Antes de seguir, comprueba

- [ ] `node -v` muestra un número de versión.
- [ ] `opencode --version` muestra un número de versión.
- [ ] Tienes la carpeta `practica_agente` en Documentos y el ZIP guardado aparte.
- [ ] `opencode web` abre la interfaz en el navegador.

Con los cuatro marcados, puedes seguir con el Módulo 1.
