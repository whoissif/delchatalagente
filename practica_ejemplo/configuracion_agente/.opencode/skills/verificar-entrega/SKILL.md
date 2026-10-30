---
name: verificar-entrega
description: Comprueba, con huellas de los archivos, qué se ha creado, modificado o borrado durante una tarea, y repasa la entrega antes de darla por buena. Úsala al empezar y al terminar cualquier encargo que toque archivos, o cuando pidan verificar, revisar o comprobar un resultado.
---

# Verificar una entrega

**Al empezar la tarea:** `python .opencode/skills/verificar-entrega/scripts/huellas.py foto`

**Al terminar:**

1. `python .opencode/skills/verificar-entrega/scripts/huellas.py comprobar`
   - Si salen archivos **MODIFICADOS** o **BORRADOS** que no se pidieron tocar, dilo lo primero.
2. Abre cada archivo **NUEVO** y comprueba:
   - que tiene lo pedido (cuenta filas o elementos frente al criterio de éxito del encargo);
   - que cada cifra cita su archivo de origen;
   - que hechos e hipótesis van separados.
3. Repite **un** cálculo clave por un camino independiente (otra fórmula, otro script o a mano).
4. Termina con una lista breve: archivos tocados, comprobaciones hechas y lo que **no** has podido comprobar.
