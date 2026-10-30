# Configuración de ejemplo: la sala del becario, ya montada

Esta carpeta es una configuración lista para copiar en tu carpeta de trabajo `practica_agente` **después** de hacer las prácticas 1 a 5. No la uses antes: en la Práctica 4 tienes que escribir tú las notas y la primera skill.

Está pensada para **Claude Code** y lleva una copia de las skills para **DeepSeek Harness**. El formato `SKILL.md` es el mismo en los dos.

## Qué contiene

| Archivo | Para qué sirve |
|---|---|
| `AGENTS.md` | Notas permanentes, ya sin la ambigüedad de la versión de la Práctica 4: dicen cuándo crear archivos y cuáles son los originales. |
| `.claude/settings.json` | Permisos de Claude Code: **modo manual** (te pregunta), **modo Auto desactivado**, lectura libre dentro de la carpeta, escritura solo en `informes/` y `analisis/`, y prohibido editar los originales, borrar, mover, instalar o subir nada. |
| `.claude/hooks/solo_en_carpeta.py` | **Hook** que bloquea cualquier escritura fuera de la carpeta, aunque un permiso o el modo Auto la dejaran pasar. Si el propio hook falla, bloquea. |
| `.claude/skills/` | Cuatro skills: `resumen-informes`, `analisis-energia-mensual`, `propuesta-reposicion` y `verificar-entrega`. Las tres últimas hacen los cálculos con un script, no «de cabeza». |
| `.dsh/skills/` | Las mismas skills, con las rutas adaptadas a DeepSeek Harness. |

## Cómo instalarla

1. Copia **el contenido** de esta carpeta (incluidas las carpetas ocultas `.claude` y `.dsh`) en la raíz de `practica_agente`. Si ya tienes un `AGENTS.md`, compáralo antes de sustituirlo.
2. Comprueba que tienes Python: el hook y los scripts lo necesitan (`python --version`).
3. Abre una sesión **nueva** de Claude Code en la carpeta `practica_agente`. La configuración solo se carga en sesiones abiertas en esa carpeta.

## Tres pruebas para comprobar que funciona

| Pídele | Debe pasar |
|---|---|
| «Crea un archivo `prueba.txt` en mi escritorio» | El hook lo bloquea y te explica por qué. |
| «Corrige el valor del 10 de mayo en `lecturas_energia_diarias.csv`» | Lo deniega: es un original. Debería proponerte hacer la corrección en el script. |
| «Hazme el análisis de energía del mes» | Usa la skill `analisis-energia-mensual`, te pide permiso antes de cada paso y te da el total de control (32.400 kWh, «CUADRA»). |

## Antes de usarla con datos reales

- **Revísala entera.** Es un ejemplo para un expediente ficticio: las rutas, los nombres de archivo y los permisos son los de esta práctica.
- En **Windows**, Claude Code no tiene sandbox: estos permisos y el hook son tu sala.
- Un permiso o un hook reducen el riesgo, **no lo eliminan**. La revisión sigue siendo tuya.
