# Antes de empezar: prepara tu ordenador

Unos 15 minutos. Hazlo antes del Módulo 2: las prácticas usan un agente de verdad en tu ordenador, **opencode**, y sin esta preparación no podrás arrancarlo. Los módulos 1 y 3 y la evaluación se pueden seguir sin instalar nada.

**No hace falta escribir órdenes en una terminal.** Instalas dos programas con su instalador de siempre y, después, todo se hace con **doble clic** en dos archivos que vienen en la carpeta de práctica.

## Qué vas a necesitar

| QUÉ | PARA QUÉ | CUESTA |
|---|---|---|
| Un ordenador con Windows o macOS en el que puedas instalar programas | Ejecutar el agente | — |
| **Node.js** | Es el programa con el que se instala opencode | Gratis |
| **Python** | El lenguaje en el que el agente escribe sus programas de cálculo (Práctica 6) | Gratis |
| **opencode** | El harness del curso: un agente de código abierto con interfaz web en español | Gratis |
| Los **modelos gratuitos** de opencode | Es lo que permite al agente «pensar». Vienen incluidos: **no necesitas cuenta ni clave de API** | Gratis |
| La **carpeta de práctica** del curso | Trabajar con archivos ficticios, nunca con los tuyos | Gratis |

> **Gratis no quiere decir privado.** Lo que el agente lee de tu carpeta se envía al proveedor del modelo para que lo procese, y algunos modelos gratuitos usan esos datos para mejorar. En la Práctica 1 verás cuál elegir. Usa solo la carpeta de práctica, nunca datos reales, de clientes ni confidenciales.

## Paso 1. Instala Node.js

1. Entra en la web oficial, [nodejs.org](https://nodejs.org/), y descarga la versión marcada como **LTS** (la estable, no la «Current»).
2. Abre el archivo descargado e instálalo con las opciones por defecto (**Siguiente**, **Siguiente**…).

Si ya lo tenías instalado (versión 22 o superior), no hace falta repetirlo: el paso 4 lo comprueba.

## Paso 2. Instala Python

1. Entra en la web oficial, [python.org/downloads](https://www.python.org/downloads/), y pulsa el botón amarillo **Download Python**.
2. Abre el archivo descargado.
   - **Windows:** en la primera pantalla, **marca la casilla «Add python.exe to PATH»** antes de pulsar **Install Now**. Si se te olvida, el agente no encontrará Python: vuelve a ejecutar el instalador, elige **Modify** y márcala.
   - **macOS:** sigue el instalador con las opciones por defecto.

Si ya lo tenías (versión 3.10 o superior), no hace falta repetirlo.

## Paso 3. Descarga la carpeta de práctica

1. Ve a la página [Entorno de práctica](../practica_ejemplo/LEEME.html) y descarga `descarga_entorno.zip`.
2. Descomprímelo en **Documentos** y llama a la carpeta `practica_agente`.
3. Guarda el ZIP aparte: es tu copia limpia para empezar de nuevo si algo sale mal.

Dentro verás, además de los documentos del expediente, cuatro archivos para arrancar: `1_instalar_opencode` y `2_arrancar_opencode`, en versión `.bat` (Windows) y `.command` (macOS).

## Paso 4. Doble clic en el instalador

Abre la carpeta `practica_agente` y haz doble clic en **`1_instalar_opencode.bat`** (en macOS, `1_instalar_opencode.command`). Se abre una ventana que:

1. Comprueba que tienes Node.js.
2. Instala **opencode 1.19.5**, la versión probada en este curso.
3. Comprueba que tienes Python e instala dos librerías para analizar datos y hacer gráficos (`pandas` y `matplotlib`).

Cada línea que acaba bien empieza por **[OK]**. Si alguna dice **[FALTA]**, te indica qué instalar: hazlo y vuelve a hacer doble clic. Al final verás **«Todo listo»**.

> **La primera vez, tu sistema te avisará** porque el archivo viene de internet. Es normal: el archivo es un texto que puedes abrir con el Bloc de notas para ver qué hace.
> - **Windows:** si aparece *«Windows protegió su PC»*, pulsa **Más información** y **Ejecutar de todas formas**. Si aparece *«¿Desea ejecutar este archivo?»*, pulsa **Ejecutar**.
> - **macOS:** si dice que no se puede abrir, ve a **Ajustes del Sistema → Privacidad y seguridad**, baja hasta el aviso del archivo y pulsa **Abrir igualmente**.
>
> **Si es un equipo gestionado por tu empresa o universidad** y no te deja ejecutarlo, no intentes saltarte esa restricción: consulta con soporte informático, usa un equipo personal o sigue las prácticas en pareja.

Instalamos la **versión 1.19.5** porque opencode cambia casi cada semana y una versión más nueva puede cambiar cómo funcionan los permisos. opencode queda instalado **en tu usuario**; para quitarlo más adelante, `npm uninstall -g opencode-ai`.

## Paso 5. Prueba que arranca (y apágalo)

1. Haz doble clic en **`2_arrancar_opencode.bat`** (en macOS, `2_arrancar_opencode.command`).
2. Se abre una ventana negra que indica la carpeta de trabajo y la versión, y **después se abre sola una página en tu navegador** con la interfaz de opencode. Si no se abre, copia la dirección que aparece en la ventana (algo como `http://127.0.0.1:4096`) y pégala en el navegador.
3. Si ves la interfaz, está todo listo. **No hace falta configurar nada más**: la carpeta se abre en la Práctica 1.
4. Para apagarlo, **cierra la ventana negra**. Cerrar solo la pestaña del navegador no lo apaga.

> **¿Prefieres la terminal?** Puedes hacer lo mismo escribiendo órdenes: `npm install -g opencode-ai@1.19.5` para instalar y, dentro de la carpeta, `opencode web` para arrancar. En Windows, usa el **Símbolo del sistema** (`cmd`) en lugar de PowerShell, que bloquea de serie el script de opencode.

## ¿Y una aplicación de escritorio?

opencode tiene también una aplicación de escritorio, **opencode Desktop**, pero **en este curso no la usamos**. A 3 de noviembre de 2026 trae un motor nuevo (la versión 2, todavía en pruebas), se actualiza sola y, en nuestras pruebas, con su configuración de serie escribió fuera de la carpeta de trabajo sin preguntar. Las prácticas de permisos no saldrían como se describen. Si en el futuro se estabiliza, la recomendaremos.

Si tienes una suscripción a Claude o a ChatGPT, sus aplicaciones de escritorio sí permiten trabajar sin terminal: lo verás en **Elige tu carril**.

## Si algo no funciona

- **Un error casi nunca significa que hayas roto algo**: suele faltar un paso. Lee la línea **[FALTA]** o **[ERROR]**: dice qué hacer.
- **[FALTA] Node.js justo después de instalarlo:** cierra la ventana, reinicia el ordenador y vuelve a hacer doble clic.
- **[FALTA] Python en Windows, aunque lo instalaste:** faltó marcar *Add python.exe to PATH*. Ejecuta otra vez el instalador de Python, elige **Modify**, sigue hasta **Advanced Options**, marca *Add Python to environment variables* y termina.
- **La página no carga:** comprueba que la ventana negra de `2_arrancar_opencode` sigue abierta y copia exactamente la dirección que aparece en ella.
- **No tienes permisos para instalar** (ordenador del trabajo): pide ayuda a tu departamento de informática o usa un ordenador personal.
- **Te has atascado más de diez minutos:** no te quedes ahí. Copia el texto del error y búscalo en la [documentación oficial de opencode](https://opencode.ai/docs/) o pregunta en su comunidad (en *Recursos oficiales*, al final del menú).

## Antes de seguir, comprueba

- [ ] `1_instalar_opencode` termina con **«Todo listo»** y muestra **[OK]** en Node.js, opencode 1.19.5 y Python.
- [ ] Tienes la carpeta `practica_agente` en Documentos y el ZIP guardado aparte.
- [ ] `2_arrancar_opencode` abre la interfaz en el navegador.
- [ ] Sabes apagarlo cerrando la ventana negra.

Con los cuatro marcados, puedes seguir con el Módulo 1.
