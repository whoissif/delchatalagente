# Configuración de ejemplo: la sala del becario, ya montada

Esta carpeta es una configuración lista para copiar en tu carpeta de trabajo `practica_agente` **después** de hacer las prácticas 1 a 5. No la uses antes: en la Práctica 4 tienes que escribir tú las notas y la primera skill.

Sirve para **opencode**, el agente de las prácticas, y para **Claude Code**. El formato `SKILL.md` es el mismo en los dos; cada uno lee las skills de su carpeta.

## Qué contiene

| Archivo | Para qué sirve |
|---|---|
| `AGENTS.md` | Notas permanentes, ya sin la ambigüedad de la versión de la Práctica 4: dicen cuándo crear archivos y cuáles son los originales. Las leen los dos agentes. |
| `opencode.json` | Permisos de opencode: **pregunta antes de editar cualquier archivo** y **antes de ejecutar cualquier orden**, y **prohíbe salir de la carpeta** (ni siquiera te lo pregunta). |
| `.opencode/skills/` | Cuatro skills para opencode: `resumen-informes`, `analisis-energia-mensual`, `propuesta-reposicion` y `verificar-entrega`. Las tres últimas hacen los cálculos con un script, no «de cabeza». |
| `.claude/settings.json` | Permisos de Claude Code: **modo manual** (te pregunta), **modo Auto desactivado**, lectura libre dentro de la carpeta, escritura solo en `informes/` y `analisis/`, y prohibido editar los originales, borrar, mover, instalar o subir nada. |
| `.claude/hooks/solo_en_carpeta.py` | **Hook** de Claude Code que bloquea cualquier escritura fuera de la carpeta, aunque un permiso o el modo Auto la dejaran pasar. Si el propio hook falla, bloquea. |
| `.claude/skills/` | Las mismas cuatro skills, con las rutas adaptadas a Claude Code. |

## Cómo instalarla

1. Copia **el contenido** de esta carpeta (incluidas las carpetas ocultas `.opencode` y `.claude`) en la raíz de `practica_agente`. Si ya tienes un `AGENTS.md` o un `opencode.json`, compáralos antes de sustituirlos.
2. Comprueba que tienes Python: los scripts de las skills (y el hook de Claude Code) lo necesitan (`python --version`).
3. **opencode:** apágalo (Ctrl + C) y vuelve a arrancarlo con `opencode web` dentro de `practica_agente`. La configuración y las skills solo se leen al arrancar.
4. **Claude Code:** abre una sesión **nueva** en la carpeta `practica_agente`.

## Tres pruebas para comprobar que funciona

| Pídele | Debe pasar |
|---|---|
| «Crea un archivo `prueba.txt` en mi escritorio» | opencode lo rechaza sin preguntarte (salir de la carpeta está prohibido). En Claude Code, el hook lo bloquea y te explica por qué. |
| «Corrige el valor del 10 de mayo en `lecturas_energia_diarias.csv`» | Te pide permiso antes de editar: **deniégalo**, es un original. Debería proponerte hacer la corrección en el script. (Claude Code lo deniega solo.) |
| «Hazme el análisis de energía del mes» | Usa la skill `analisis-energia-mensual`, te pide permiso antes de cada orden y te da el total de control (32.400 kWh, «CUADRA»). |

## Antes de usarla con datos reales

- **Revísala entera.** Es un ejemplo para un expediente ficticio: las rutas, los nombres de archivo y los permisos son los de esta práctica.
- Ni opencode ni Claude Code en **Windows** tienen sandbox: estos permisos (y, en Claude Code, el hook) son tu sala.
- En opencode, esta política **no protege los originales por sí sola**: te pregunta antes de cada edición y eres tú quien debe denegarla.
- Un permiso o un hook reducen el riesgo, **no lo eliminan**. La revisión sigue siendo tuya.
