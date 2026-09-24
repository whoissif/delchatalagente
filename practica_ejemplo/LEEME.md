# Entorno de práctica: Empresa Bruma

## Un expediente profesional, completamente ficticio

Esta carpeta reúne documentos de una empresa ficticia de ejemplo de bombas profesionales. Incluye informes de producción, calidad, mantenimiento y energía, además de inventario, proveedores, notas de reunión y un acta. Los archivos contienen cifras de ejemplo; los nombres y las direcciones usan dominios reservados como `ejemplo.test`.

**[Descargar el expediente completo (ZIP)](descarga_entorno.zip)** para extraerlo y usar una copia como espacio de trabajo.

Puedes usar el conjunto para probar tareas habituales de análisis y documentación profesional: cruzar cifras entre informes, priorizar una incidencia, resumir una reunión, revisar existencias o preparar un informe para el equipo. No es un modelo de datos de producción ni sustituye procedimientos técnicos o de seguridad reales.

## Empezar de forma segura

1. Descarga o copia esta carpeta completa a un directorio de trabajo personal.
2. Conserva intacta esta carpeta original y selecciona la copia como espacio de trabajo del agente.
3. Pídele primero que **lea y proponga**; revisa los pasos antes de autorizar cambios. El agente puede modificar archivos de su espacio de trabajo.
4. No añadas datos reales, credenciales, información de clientes ni procedimientos de seguridad de tu empresa.

No necesitas programación para las prácticas iniciales. El agente puede leer los archivos de muestra y generar nuevos documentos; tú decides qué cambios aceptar y verificas el resultado.

## Contenido del expediente

### Informes de planta

- [Producción de mayo](informes/informe_01_produccion_mayo.txt): plan y resultado por turno, paradas y unidades producidas.
- [No conformidades de calidad](informes/informe_02_calidad_mayo.txt): unidades inspeccionadas, defectos y retrabajos.
- [Mantenimiento de la línea 2](informes/informe_03_mantenimiento_linea_2.txt): incidencias, duración y acciones pendientes.
- [Consumo energético](informes/informe_04_energia_mayo.txt): consumo por semana y turno, con una observación para investigar.
- [Demanda y entregas](informes/informe_05_pedidos_mayo.txt): compromisos de entrega y riesgo de componentes.

### Datos y actas

- [Inventario de componentes](inventario_material.csv): existencias, mínimos de reposición y proveedor asignado.
- [Proveedores de mantenimiento](contactos_proveedores.csv): especialidad y plazo orientativo de respuesta.
- [Configuración del ejemplo](configuracion_ejemplo.json): parámetros ficticios de planta y criterios para los informes.
- [Notas de coordinación](notas_reunion.txt): apuntes informales sobre las prioridades de la semana.
- [Acta de operaciones](acta_constitucion.md): acuerdos, responsables y fechas de seguimiento.

## Encargos de ejemplo

Empieza con una petición que no cambie nada:

> Lee los cinco informes de `informes` y crea un índice que indique el tema, el periodo y los archivos relacionados. No modifiques los originales.

Después puedes probar:

- **Producción:** resume el cumplimiento del plan por turno y explica qué datos respaldan cada conclusión.
- **Calidad:** calcula la tasa de no conformidad con los datos del informe y señala cualquier límite de interpretación.
- **Mantenimiento:** ordena las incidencias por impacto y distingue los hechos registrados de las recomendaciones.
- **Inventario:** compara las existencias con los mínimos y prepara una lista de reposición propuesta; no envíes pedidos.
- **Síntesis:** compara informes y actas, identifica discrepancias y guarda un borrador nuevo en `informes`.

En todos los casos pide que cite el nombre del archivo y la sección o dato utilizado. Comprueba los cálculos y el resultado antes de compartirlo o tomar decisiones.
