# Elige tu carril

Este curso se puede hacer **entero sin pagar nada**: con opencode y sus modelos gratuitos. Si ya pagas una suscripción a Claude o a ChatGPT, también puedes hacerlo con su agente. Lo que aprendes es lo mismo en los dos casos: la carpeta, los permisos, las notas, los procedimientos guardados y la verificación existen en todos los agentes.

> **No necesitas una suscripción para este curso. Si ya tienes una, aprovéchala.**

## La escalera: sube un peldaño

No hace falta llegar arriba del todo. El objetivo es que salgas del curso **un peldaño por encima** de donde estás hoy.

| Peldaño | Qué cambia | Sin pagar | Con suscripción |
|---|---|---|---|
| 1. Chat con instrucciones fijas | Dejas de repetir tus reglas en cada conversación | Proyectos o instrucciones personalizadas del chat gratuito | Proyectos de Claude, GPT personalizados |
| 2. El chat ejecuta código | La IA calcula con un programa en vez de «leer» tu tabla | Limitado en las versiones gratuitas | Análisis de archivos en Claude o ChatGPT |
| 3. Un agente en tu carpeta | Trabaja sobre tus archivos y tú apruebas | **opencode con modelos gratuitos** | Claude Code (Claude Pro o Max), Codex (ChatGPT Plus o Pro) |
| 4. Un agente con método | Notas, procedimientos, política de permisos y verificación | opencode | Los mismos |

Si en tu ordenador del trabajo no puedes instalar nada, no intentes saltarte esa restricción: haz las prácticas en un equipo personal, síguelas en pareja con alguien que sí pueda instalar, o quédate en los peldaños 1 y 2. Con unas buenas instrucciones fijas ya habrás avanzado.

## Carril A — Sin suscripción: opencode (el del curso)

Es el carril por defecto y el que siguen todas las instrucciones. Lo dejaste instalado en «Prepara tu ordenador» y se arranca con doble clic en `2_arrancar_opencode`, sin escribir órdenes. No necesitas cuenta ni clave.

**¿Por qué no la aplicación de escritorio de opencode?** Existe (opencode Desktop), pero a 3 de noviembre de 2026 trae un motor nuevo todavía en pruebas, se actualiza sola y, en nuestras pruebas, con su configuración de serie escribió fuera de la carpeta de trabajo sin preguntar. Para aprender permisos necesitamos que el freno funcione como se describe, así que usamos la versión 1.19.5 con los lanzadores de doble clic.

## Carril B — Ya tengo suscripción

Puedes usar el agente que incluye tu plan, **desde su aplicación de escritorio, sin terminal**. Las prácticas son las mismas; en las prácticas 1 a 4 verás recuadros **«Si usas Claude Code o Codex»** con lo poco que cambia.

| | Claude Code | Codex |
|---|---|---|
| Plan que lo incluye | Claude Pro o Max | ChatGPT Plus o Pro (y planes de empresa o educación) |
| Sin terminal (recomendado) | Aplicación de escritorio de **Claude** (Windows y macOS), pestaña **Code** | Aplicación de escritorio **Codex** de OpenAI (Windows y macOS) |
| Descarga | [claude.com/download](https://claude.com/download) | [openai.com/codex](https://openai.com/codex/) (en Windows, también en la Microsoft Store) |
| Arranque | Pestaña Code → **Local** → selecciona la carpeta `practica_agente`, e inicias sesión con tu cuenta | Abre la carpeta `practica_agente` desde la app Codex, e inicias sesión con tu cuenta de ChatGPT |
| Requisito extra | En Windows, **Git for Windows** (la app te lo pide la primera vez; descárgalo de [git-scm.com](https://git-scm.com/downloads/win)) | — |
| Con terminal (alternativa) | `claude` dentro de tu carpeta | `npm install -g @openai/codex` y `codex` dentro de tu carpeta |
| Notas permanentes | `CLAUDE.md` (puede apuntar a tu `AGENTS.md`) | `AGENTS.md` |
| Procedimientos (skills) | `.claude/skills/<nombre>/SKILL.md` | `.agents/skills/<nombre>/SKILL.md` |
| Política de permisos | `.claude/settings.json`, o modos con Mayús + Tab | Orden `/permissions` dentro de Codex |

*(Datos a 3 de noviembre de 2026, de la documentación oficial; las aplicaciones de escritorio del carril B no se han probado con este curso. Estos programas cambian casi cada semana: si algo no coincide, mira su documentación.)*

En los dos casos, **Python** te sirve igual: estos agentes también escriben y ejecutan scripts de Python en tu carpeta (Práctica 6).

**¿Y DeepSeek?** Su chat es gratuito, pero su suscripción no incluye un agente. Si tienes saldo en su API, puedes conectarla en opencode; para el curso no hace falta.

## Lo que te llevas, sea cual sea tu carril

- **`AGENTS.md` y `SKILL.md` son formatos abiertos.** Las notas y los procedimientos que escribas en opencode te sirven después en Claude Code o en Codex, casi sin cambios.
- **Las preguntas son las mismas en todas partes:** ¿dónde trabaja?, ¿qué puede hacer sin preguntarme?, ¿qué datos salen de mi ordenador?, ¿cómo compruebo el resultado?
- **Ningún carril te ahorra verificar.** Un modelo de pago se equivoca menos a menudo, pero también se equivoca.

## Mide lo que ganas

En la hoja de registro del cuaderno de laboratorio hay dos columnas nuevas: **minutos con chat** y **minutos con agente**. Apunta cuánto tardarías en hacer cada tarea copiando y pegando en un chat, y cuánto has tardado con el agente. Esa diferencia, con una tarea tuya de verdad, es el mejor motivo para seguir.
