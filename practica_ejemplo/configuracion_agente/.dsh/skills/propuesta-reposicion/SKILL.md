---
name: propuesta-reposicion
description: Prepara un borrador de propuesta de reposición de material cruzando el inventario con los proveedores y con los informes de mantenimiento y pedidos. Úsala cuando pidan qué material reponer, qué está bajo mínimo o una propuesta de compra.
---

# Propuesta de reposición (borrador)

1. Ejecuta el cálculo (no lo hagas a mano):
   `python .dsh/skills/propuesta-reposicion/scripts/bajo_minimo.py --inventario inventario_material.csv --proveedores contactos_proveedores.csv`
2. Lee `informes/informe_05_pedidos_*.txt` y `informes/informe_03_mantenimiento_*.txt` y busca menciones de los códigos que salgan. Cita el archivo de cada mención.
3. Guarda `informes/propuesta_reposicion.md` con:
   - la salida del script (tablas tal cual);
   - una columna o nota de **riesgo** solo con lo que diga un informe, citando la fuente;
   - una sección **Hipótesis (no comprobadas)** para cualquier relación que deduzcas y ningún documento afirme (por ejemplo, «la junta cambiada podría ser la J-18»);
   - los siguientes pasos, marcados como pendientes de aprobación.
4. **Nunca** envíes pedidos ni escribas a proveedores, ni copies sus correos en el documento.
5. El déficit es lo que falta para llegar al mínimo, no la cantidad a pedir: dilo.
6. Al terminar, indica qué archivos has leído y cuál has creado.
